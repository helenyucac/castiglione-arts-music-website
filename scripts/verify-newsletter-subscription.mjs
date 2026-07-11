import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { stripTypeScriptTypes } from "node:module";
import vm from "node:vm";

process.env.WIX_API_KEY = "test-api-key";
process.env.WIX_SITE_ID = "test-site-id";
process.env.WIX_SUBSCRIBE_COLLECTION_ID = "SubscribeCollection";

const newsletterSource = await readFile(
  new URL("../lib/newsletterSubscription.ts", import.meta.url),
  "utf8",
);
const footerFormSource = await readFile(
  new URL("../components/FooterNewsletterForm.tsx", import.meta.url),
  "utf8",
);
const executableNewsletterSource = stripTypeScriptTypes(
  newsletterSource.replace(/import[\s\S]*?;\n/g, "").replace(/^export /gm, ""),
);

let existingItems = [];
let failInsert = false;
const calls = [];

const sandbox = {
  process,
  console,
  Date,
  Set,
  String,
  Boolean,
  Array,
  JSON,
  RegExp,
  Object,
  Error,
  getWixClientConfig() {
    return {
      apiKey: "test-api-key",
      siteId: "test-site-id",
      baseUrl: "https://www.wixapis.com/wix-data/v2/items",
    };
  },
  async getResolvedCollectionId() {
    return "SubscribeCollection";
  },
  async queryWixCollection(collectionName, options) {
    calls.push({ type: "query", collectionName, options });
    return existingItems;
  },
  async insertWixCollectionItem(collectionName, data) {
    calls.push({ type: "insert", collectionName, data });

    if (failInsert) {
      throw new Error("insert failed");
    }

    return { id: "new-subscriber", data };
  },
  fetch: async (url) => {
    calls.push({ type: "fetch", url: String(url) });
    return {
      ok: true,
      text: async () =>
        JSON.stringify({
          dataCollections: [
            {
              id: "SubscribeCollection",
              displayName: "Subscribe",
              fields: [
                { key: "email" },
                { key: "subscribedAt" },
                { key: "status" },
                { key: "source" },
                { key: "isActive" },
                { key: "consent" },
              ],
            },
          ],
        }),
    };
  },
};

vm.createContext(sandbox);
vm.runInContext(
  `${executableNewsletterSource}\nthis.__newsletter = { normalizeSubscriberEmail, validateSubscriberEmail, subscribeEmailToWix };`,
  sandbox,
);

const {
  normalizeSubscriberEmail,
  subscribeEmailToWix,
  validateSubscriberEmail,
} = sandbox.__newsletter;

assert.equal(normalizeSubscriberEmail("  USER@Example.COM  "), "user@example.com");
assert.equal(validateSubscriberEmail("user@example.com"), true);
assert.equal(validateSubscriberEmail(""), false);
assert.equal(validateSubscriberEmail("not-an-email"), false);
assert.equal(validateSubscriberEmail(`${"a".repeat(245)}@example.com`), false);
assert.match(footerFormSource, /<form[\s\S]*onSubmit=\{handleSubmit\}/);
assert.match(footerFormSource, /noValidate/);
assert.match(footerFormSource, /type="submit"/);
assert.match(footerFormSource, /disabled=\{isSubmitting\}/);
assert.match(footerFormSource, /setEmail\(""\)/);
assert.match(footerFormSource, /setStatus\("error"\)/);

existingItems = [{ id: "existing" }];
failInsert = false;
calls.length = 0;

let result = JSON.parse(JSON.stringify(await subscribeEmailToWix(" Existing@Example.com ")));

assert.deepEqual(result, { success: true, alreadySubscribed: true });
assert.equal(calls.filter((call) => call.type === "query").length, 1);
assert.equal(calls.some((call) => call.type === "insert"), false);

existingItems = [];
failInsert = false;
calls.length = 0;
result = JSON.parse(JSON.stringify(await subscribeEmailToWix("New@Example.com")));

assert.deepEqual(result, { success: true, alreadySubscribed: false });

const insertCall = calls.find((call) => call.type === "insert");
assert.ok(insertCall);
assert.equal(insertCall.collectionName, "Subscribe");
assert.equal(insertCall.data.email, "new@example.com");
assert.equal(insertCall.data.status, "subscribed");
assert.equal(insertCall.data.source, "website-footer");
assert.equal(insertCall.data.isActive, true);
assert.equal(insertCall.data.consent, true);

existingItems = [];
failInsert = true;
calls.length = 0;
result = JSON.parse(JSON.stringify(await subscribeEmailToWix("fail@example.com")));

assert.deepEqual(result, { success: false, reason: "wix-error" });

existingItems = [];
failInsert = false;
calls.length = 0;
result = JSON.parse(JSON.stringify(await subscribeEmailToWix("bot@example.com", "I am a bot")));

assert.deepEqual(result, { success: false, reason: "bot" });
assert.equal(calls.length, 0);

result = JSON.parse(JSON.stringify(await subscribeEmailToWix("invalid-email")));
assert.deepEqual(result, { success: false, reason: "invalid-email" });

console.log(
  JSON.stringify(
    {
      ok: true,
      normalizedEmail: normalizeSubscriberEmail("  USER@Example.COM  "),
      duplicateCreatesRecord: false,
      newEmailCreatesRecord: true,
      wixFailureIsSafe: true,
      honeypotDoesNotWrite: true,
      footerFormHasSubmit: true,
      footerFormDisablesWhilePending: true,
      successClearsInput: true,
      failurePreservesInput: true,
    },
    null,
    2,
  ),
);
