# Google Apps Script Setup for Partnership Enquiries

This is the final email delivery path for the Partnership form.

The website keeps the form UI unchanged. The Next.js API route reads recipients from Wix CMS, then sends the submission to a Google Apps Script Web App. The Apps Script sends the email with `MailApp.sendEmail` as:

```text
helen.y@castiglione.com.au
```

No Resend, SMTP, Gmail password, App Password, Gmail API OAuth client, DNS verification, or Google Apps Script secret in source code is required.

## 1. Open Google Apps Script

1. Go to [script.google.com](https://script.google.com/).
2. Sign in as:

```text
helen.y@castiglione.com.au
```

3. Create a new standalone Apps Script project.
4. Name it something clear, for example:

```text
Castiglione Partnership Enquiry Email
```

## 2. Add the Web App Code

1. Open `scripts/google-apps-script-partnership-enquiry.gs` from this repository.
2. Copy the full file contents.
3. Paste it into the Apps Script editor, replacing the starter code.
4. Save the project.

## 3. Add the Shared Secret

Do not put the secret directly in the `.gs` source file.

1. In Apps Script, open **Project Settings**.
2. Find **Script Properties**.
3. Add a property:

```text
PARTNERSHIP_GOOGLE_SCRIPT_SECRET
```

4. Set the value to a long random secret.
5. Save it.

The exact same value must also be stored in Vercel as:

```text
PARTNERSHIP_GOOGLE_SCRIPT_SECRET
```

## 4. Deploy the Web App

1. Click **Deploy**.
2. Choose **New deployment**.
3. Select type: **Web app**.
4. Set **Execute as**:

```text
Me
```

5. Set **Who has access**:

```text
Anyone
```

6. Click **Deploy**.
7. Google will ask you to authorize access.
8. Authorize `MailApp` access as `helen.y@castiglione.com.au`.
9. Copy the deployed Web App URL.

Use only the deployed `/exec` URL in Vercel.

Do not use the `/dev` test URL in Vercel.

## 5. Add Vercel Environment Variables

Add these to the Vercel Preview and Production environments:

```env
PARTNERSHIP_GOOGLE_SCRIPT_URL=
PARTNERSHIP_GOOGLE_SCRIPT_SECRET=
WIX_PARTNERSHIP_PAGE_KEY=partnership-main
```

Optional emergency fallback if Wix recipients are unavailable:

```env
PARTNERSHIP_EMAIL_TO=
```

The preferred recipient list still comes from Wix CMS:

```text
PartnershipPage.recipientEmails
```

Accepted recipient formats:

```text
fintan.hocking@castiglione.com.au
anna.x@castiglione.com.au
```

or:

```text
fintan.hocking@castiglione.com.au, anna.x@castiglione.com.au
```

## 6. Redeploy Vercel

After adding or changing environment variables:

1. Redeploy the Vercel Preview.
2. Open the Partnership page.
3. Submit a real test enquiry with an attachment.
4. Confirm:
   - the email arrives from `helen.y@castiglione.com.au`
   - Reply-To is the visitor email
   - every Wix CMS recipient receives the email
   - the attachment arrives correctly
   - no recipient addresses appear in the browser response

## 7. Updating Apps Script Later

If `scripts/google-apps-script-partnership-enquiry.gs` changes in the future:

1. Copy the updated file into Apps Script.
2. Save.
3. Click **Deploy**.
4. Choose **Manage deployments**.
5. Edit the existing Web App deployment.
6. Select **New version**.
7. Deploy.
8. Keep using the same `/exec` URL unless Google provides a new one.

## Troubleshooting

- If the website returns a controlled error, confirm `PARTNERSHIP_GOOGLE_SCRIPT_URL` and `PARTNERSHIP_GOOGLE_SCRIPT_SECRET` are set in Vercel.
- If Apps Script returns unauthorized, confirm the Script Property secret exactly matches the Vercel secret.
- If no recipients receive the email, confirm Wix `PartnershipPage` has `pageKey = partnership-main` and a valid `recipientEmails` value.
- If attachments are missing, test with a PDF under 10 MB and keep total upload size under 20 MB.
