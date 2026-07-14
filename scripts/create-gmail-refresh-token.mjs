import http from "node:http";
import { URL } from "node:url";

const clientId = process.env.GOOGLE_GMAIL_CLIENT_ID;
const clientSecret = process.env.GOOGLE_GMAIL_CLIENT_SECRET;
const port = Number(process.env.GOOGLE_GMAIL_OAUTH_PORT ?? 8787);
const redirectUri = `http://localhost:${port}/oauth2callback`;
const scope = "https://www.googleapis.com/auth/gmail.send";

if (!clientId || !clientSecret) {
  console.error("Set GOOGLE_GMAIL_CLIENT_ID and GOOGLE_GMAIL_CLIENT_SECRET before running this script.");
  process.exit(1);
}

function buildAuthorizationUrl() {
  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", scope);
  url.searchParams.set("access_type", "offline");
  url.searchParams.set("prompt", "consent");
  url.searchParams.set("login_hint", "helen.y@castiglione.com.au");

  return url.toString();
}

async function exchangeCodeForToken(code) {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
    }),
  });
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(payload, null, 2));
  }

  return payload;
}

const server = http.createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url ?? "/", redirectUri);
    const code = requestUrl.searchParams.get("code");

    if (requestUrl.pathname !== "/oauth2callback" || !code) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    const tokenPayload = await exchangeCodeForToken(code);
    const refreshToken = tokenPayload.refresh_token;

    response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(
      refreshToken
        ? "Authorization complete. You can close this tab and copy the refresh token from Terminal."
        : "Authorization complete, but Google did not return a refresh token. Revoke the app grant and run again.",
    );

    console.log("\nGoogle returned this token payload:");
    console.log(JSON.stringify(tokenPayload, null, 2));

    if (refreshToken) {
      console.log("\nSet this in Vercel:");
      console.log(`GOOGLE_GMAIL_REFRESH_TOKEN=${refreshToken}`);
    } else {
      console.log("\nNo refresh token was returned. Run again with a new consent grant.");
    }
  } catch (error) {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Authorization failed. Check Terminal for details.");
    console.error(error);
  } finally {
    setTimeout(() => server.close(), 500);
  }
});

server.listen(port, () => {
  console.log("Open this URL and sign in as helen.y@castiglione.com.au:\n");
  console.log(buildAuthorizationUrl());
  console.log(`\nWaiting for Google OAuth callback on ${redirectUri}`);
});
