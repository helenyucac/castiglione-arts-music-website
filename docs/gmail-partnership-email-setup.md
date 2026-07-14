# Gmail API Setup for Partnership Enquiries

This guide connects the Partnership form to the Gmail API so submissions are sent from:

```text
Castiglione Website <helen.y@castiglione.com.au>
```

The website only needs the Gmail send permission:

```text
https://www.googleapis.com/auth/gmail.send
```

No Gmail password, App Password, DNS verification, SMTP, Resend, or Google Apps Script is used.

## 1. Create or Select a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select the Castiglione website project.
3. Confirm you are working in the correct project before continuing.

## 2. Enable the Gmail API

1. In Google Cloud Console, open **APIs & Services**.
2. Click **Enable APIs and Services**.
3. Search for **Gmail API**.
4. Click **Enable**.

## 3. Configure OAuth Consent

1. Open **APIs & Services → OAuth consent screen**.
2. Choose the appropriate user type for the Workspace account.
3. Add the app name, support email, and developer contact email.
4. Add the scope:

```text
https://www.googleapis.com/auth/gmail.send
```

5. Add `helen.y@castiglione.com.au` as a test user if the app is in testing mode.
6. Save the consent screen.

## 4. Create OAuth Client Credentials

1. Open **APIs & Services → Credentials**.
2. Click **Create Credentials → OAuth client ID**.
3. Choose **Web application**.
4. Add this authorised redirect URI:

```text
http://localhost:8787/oauth2callback
```

5. Copy the generated client ID and client secret.

## 5. Generate the Refresh Token

Run this locally with the client credentials:

```bash
GOOGLE_GMAIL_CLIENT_ID="your-client-id" \
GOOGLE_GMAIL_CLIENT_SECRET="your-client-secret" \
node scripts/create-gmail-refresh-token.mjs
```

1. Open the printed authorization URL.
2. Sign in as:

```text
helen.y@castiglione.com.au
```

3. Approve the Gmail send permission.
4. The Terminal will print:

```text
GOOGLE_GMAIL_REFRESH_TOKEN=...
```

Copy it once and store it in Vercel. Do not commit it.

## 6. Add Vercel Environment Variables

Add these variables to the Preview and Production environments:

```env
GOOGLE_GMAIL_CLIENT_ID=
GOOGLE_GMAIL_CLIENT_SECRET=
GOOGLE_GMAIL_REFRESH_TOKEN=
GOOGLE_GMAIL_SENDER_EMAIL=helen.y@castiglione.com.au
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

Accepted Wix recipient formats:

```text
fintan.hocking@castiglione.com.au
anna.x@castiglione.com.au
```

or:

```text
fintan.hocking@castiglione.com.au, anna.x@castiglione.com.au
```

## 7. Test the Preview Form

1. Redeploy the Preview branch after adding the Vercel variables.
2. Open the Partnership page.
3. Submit the form with a test file attachment.
4. Confirm:
   - the email arrives from `helen.y@castiglione.com.au`
   - Reply-To is the visitor email
   - all Wix CMS recipients receive the email
   - attachments arrive correctly
   - no recipient addresses appear in the browser response

## Troubleshooting

- If Google returns `invalid_grant`, regenerate the refresh token.
- If Google returns `insufficient permissions`, confirm the OAuth scope is exactly `https://www.googleapis.com/auth/gmail.send`.
- If the form returns a controlled error, confirm all five required Vercel variables are set.
- If recipients are missing, confirm the Wix `PartnershipPage` record has `pageKey = partnership-main` and a valid `recipientEmails` value.
