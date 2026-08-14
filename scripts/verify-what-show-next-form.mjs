import assert from "node:assert/strict";

const { normalizeSurveyForm } = await import("../lib/wix/forms.ts");

const form = {
  id: "what-show-next-form",
  name: "What show next?",
  fields: [
    {
      id: "shows-field",
      inputOptions: {
        target: "chooseYourNextLiveExperience",
        label: {
          text: "Choose your next live experience (Select all that apply)",
        },
        inputType: "CHECKBOX_GROUP",
        required: true,
        checkboxGroupOptions: {
          options: [
            {
              label: "My Hero Academia in Concert",
              value: "my-hero-academia-in-concert",
            },
            {
              label: "Jujutsu Kaisen in Concert",
              value: "jujutsu-kaisen-in-concert",
            },
            {
              label: "One Piece Music Symphony - Brand New Production",
              value: "one-piece-music-symphony-brand-new-production",
            },
          ],
        },
      },
    },
    {
      id: "email-field",
      inputOptions: {
        target: "email",
        label: {
          text: "Email",
        },
        inputType: "EMAIL",
        required: true,
      },
    },
    {
      id: "name-field",
      inputOptions: {
        target: "name",
        label: {
          text: "Name",
        },
        inputType: "TEXT",
      },
    },
    {
      id: "hidden-email-field",
      hidden: true,
      inputOptions: {
        target: "emailAddress",
        label: {
          text: "Email Address",
        },
        inputType: "EMAIL",
      },
    },
    {
      id: "submit-button",
      identifier: "SUBMIT_BUTTON",
      inputOptions: {
        target: "submit",
        label: {
          text: "Submit",
        },
        inputType: "SUBMIT",
      },
    },
  ],
  layout: {
    items: [
      {
        fieldId: "shows-field",
      },
      {
        fieldId: "email-field",
      },
    ],
  },
};

const summary = {
  id: "what-show-next-form",
  name: "What show next?",
  fields: [
    {
      id: "shows-field",
      key: "chooseYourNextLiveExperience",
      label: "Choose your next live experience (Select all that apply)",
      type: "TEXT",
      required: true,
    },
    {
      id: "email-field",
      key: "email",
      label: "Email",
      type: "EMAIL",
      required: true,
    },
    {
      id: "name-field",
      key: "name",
      label: "Name",
      type: "TEXT",
    },
  ],
};

const normalized = normalizeSurveyForm(form, summary);

assert.ok(normalized, "form normalizes");
assert.equal(normalized.id, "what-show-next-form");
assert.deepEqual(
  normalized.fields.map((field) => field.key),
  ["chooseYourNextLiveExperience", "email"],
);

const checkboxField = normalized.fields[0];
assert.equal(checkboxField.type, "MULTIPLE_CHOICE");
assert.equal(checkboxField.required, true);
assert.equal(checkboxField.options.length, 3);
assert.deepEqual(
  checkboxField.options.map((option) => option.label),
  [
    "My Hero Academia in Concert",
    "Jujutsu Kaisen in Concert",
    "One Piece Music Symphony - Brand New Production",
  ],
);
assert.deepEqual(
  checkboxField.options.map((option) => option.value),
  [
    "my-hero-academia-in-concert",
    "jujutsu-kaisen-in-concert",
    "one-piece-music-symphony-brand-new-production",
  ],
);

const emailFields = normalized.fields.filter((field) => field.type === "EMAIL");
assert.equal(emailFields.length, 1);
assert.equal(emailFields[0].key, "email");
assert.equal(normalized.fields.some((field) => field.key === "name"), false);
assert.equal(normalized.fields.some((field) => field.key === "emailAddress"), false);
assert.equal(normalized.fields.some((field) => field.key === "submit"), false);

const submittedValues = {
  [checkboxField.key]: [
    checkboxField.options[0].value,
    checkboxField.options[1].value,
  ],
  [emailFields[0].key]: "audience@example.com",
};

assert.ok(Array.isArray(submittedValues.chooseYourNextLiveExperience));
assert.deepEqual(submittedValues.chooseYourNextLiveExperience, [
  "my-hero-academia-in-concert",
  "jujutsu-kaisen-in-concert",
]);

console.log("What Show Next form verification passed", {
  fields: normalized.fields.map((field) => ({
    key: field.key,
    type: field.type,
    optionCount: field.options.length,
  })),
});
