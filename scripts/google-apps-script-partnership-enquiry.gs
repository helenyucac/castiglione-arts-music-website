const SECRET_PROPERTY_KEY = "PARTNERSHIP_GOOGLE_SCRIPT_SECRET";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_RECIPIENTS = 20;
const MAX_ATTACHMENTS = 10;

function jsonResponse(payload, statusCode) {
  return ContentService
    .createTextOutput(JSON.stringify(Object.assign({ statusCode: statusCode || 200 }, payload)))
    .setMimeType(ContentService.MimeType.JSON);
}

function safeString(value, maxLength) {
  if (typeof value !== "string" && typeof value !== "number") {
    return "";
  }

  return String(value)
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .trim()
    .slice(0, maxLength || 5000);
}

function isValidEmail(value) {
  return Boolean(value && value.length <= 254 && EMAIL_PATTERN.test(value));
}

function uniqueValidEmails(values) {
  if (!Array.isArray(values)) {
    return [];
  }

  const seen = {};
  const emails = [];

  values.forEach(function (value) {
    const email = safeString(value, 254).toLowerCase();

    if (email && isValidEmail(email) && !seen[email]) {
      seen[email] = true;
      emails.push(email);
    }
  });

  return emails.slice(0, MAX_RECIPIENTS);
}

function escapeHtml(value) {
  return safeString(value, 5000)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function line(label, value) {
  return label + ": " + (value || "Not provided");
}

function formatAttachmentSummary(attachmentItems) {
  if (!attachmentItems.length) {
    return "Not provided";
  }

  const filenames = attachmentItems.map(function (attachment) {
    return attachment.filename;
  }).filter(Boolean);

  if (attachmentItems.length === 1) {
    return "1 attachment" + (filenames[0] ? ": " + filenames[0] : "");
  }

  return attachmentItems.length + " attachments"
    + (filenames.length ? ": " + filenames.join(", ") : "");
}

function buildBody(payload) {
  const lines = [
    "New Partnership Enquiry",
    "",
    line("Submitted at", new Date().toISOString()),
    line("Full name", payload.name),
    line("Organisation", payload.company),
    line("Email", payload.email),
    line("Website", payload.website),
    line("Country / Region", payload.countryRegion),
    line("Enquiry type", payload.enquiryType),
    "",
    "Project:",
    payload.projectDescription || "Not provided",
    "",
    line("Supporting materials", payload.attachmentSummary),
  ];

  return {
    text: lines.join("\n"),
    html: "<div>" + lines.map(function (item) {
      return item ? escapeHtml(item) : "";
    }).join("<br />") + "</div>",
  };
}

function toBlobAttachment(attachment) {
  const filename = safeString(attachment && attachment.filename, 255);
  const mimeType = safeString(attachment && attachment.mimeType, 120) || "application/octet-stream";
  const base64 = safeString(attachment && attachment.base64, 30000000);

  if (!filename || !base64) {
    return null;
  }

  try {
    return Utilities.newBlob(
      Utilities.base64Decode(base64),
      mimeType,
      filename
    );
  } catch (error) {
    return null;
  }
}

function getAttachmentItems(payload) {
  if (!Array.isArray(payload.attachments)) {
    return [];
  }

  return payload.attachments
    .slice(0, MAX_ATTACHMENTS)
    .map(function (attachment) {
      const filename = safeString(attachment && attachment.filename, 255);
      const blob = toBlobAttachment(attachment);

      if (!filename || !blob) {
        return null;
      }

      return {
        filename: filename,
        blob: blob,
      };
    })
    .filter(function (attachment) {
      return Boolean(attachment);
    });
}

function validatePayload(payload) {
  const recipients = uniqueValidEmails(payload.recipients);
  const name = safeString(payload.name, 200);
  const email = safeString(payload.email, 254).toLowerCase();
  const company = safeString(payload.company, 200);
  const attachmentItems = getAttachmentItems(payload);

  if (!recipients.length || !name || !company || !isValidEmail(email)) {
    return null;
  }

  return {
    recipients: recipients,
    name: name,
    email: email,
    company: company,
    website: safeString(payload.website, 300),
    countryRegion: safeString(payload.countryRegion, 200),
    enquiryType: safeString(payload.enquiryType, 200),
    projectDescription: safeString(payload.projectDescription, 5000),
    attachmentSummary: formatAttachmentSummary(attachmentItems),
    attachments: attachmentItems.map(function (attachment) {
      return attachment.blob;
    }),
  };
}

function doPost(e) {
  try {
    const expectedSecret = PropertiesService
      .getScriptProperties()
      .getProperty(SECRET_PROPERTY_KEY);

    if (!expectedSecret) {
      console.error("Partnership script secret is not configured.");
      return jsonResponse({ success: false, error: "Configuration error." }, 500);
    }

    const bodyText = e && e.postData && e.postData.contents
      ? e.postData.contents
      : "";
    let payload;

    try {
      payload = JSON.parse(bodyText);
    } catch (error) {
      return jsonResponse({ success: false, error: "Malformed request." }, 400);
    }

    if (!payload || payload.secret !== expectedSecret) {
      console.warn("Partnership script rejected a request with an invalid secret.");
      return jsonResponse({ success: false, error: "Unauthorized." }, 401);
    }

    const submission = validatePayload(payload);

    if (!submission) {
      return jsonResponse({ success: false, error: "Invalid submission." }, 400);
    }

    const body = buildBody(submission);
    const subject = "New Partnership Enquiry — "
      + (submission.enquiryType || "General")
      + " — "
      + submission.name;

    MailApp.sendEmail({
      to: submission.recipients.join(","),
      subject: subject,
      body: body.text,
      htmlBody: body.html,
      replyTo: submission.email,
      attachments: submission.attachments,
      name: "Castiglione Website",
    });

    console.log("Partnership enquiry sent.", {
      attachmentCount: submission.attachments.length,
      enquiryType: submission.enquiryType || "General",
    });

    return jsonResponse({ success: true }, 200);
  } catch (error) {
    console.error("Partnership enquiry script failed.", {
      message: error && error.message ? error.message : "Unknown error",
    });
    return jsonResponse({ success: false, error: "Send failed." }, 500);
  }
}
