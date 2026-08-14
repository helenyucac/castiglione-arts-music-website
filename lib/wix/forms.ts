import { getWixClientConfig, isWixConfigured } from "@/lib/wix/client";
import type { WixRecordFields } from "@/lib/wix/types";

const WIX_FORMS_NAMESPACE = "wix.form_app.form";
const WIX_FORM_SCHEMA_API_BASE_URL = "https://www.wixapis.com/form-schema-service/v4/forms";
const WIX_FORM_SUBMISSION_API_URL =
  "https://www.wixapis.com/form-submission-service/v4/submissions";
const WHAT_SHOW_NEXT_FORM_NAME = "What show next?";
const FORM_NOT_FOUND_STATUS = 404;

export type WixSurveyFieldOption = {
  label: string;
  value: string;
};

export type WixSurveyField = {
  id: string;
  key: string;
  label: string;
  type: string;
  required: boolean;
  hidden: boolean;
  options: WixSurveyFieldOption[];
};

export type WixSurveyForm = {
  id: string;
  name: string;
  fields: WixSurveyField[];
};

export type WixSurveySubmissionValue = string | string[] | boolean;

class WixFormsApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "WixFormsApiError";
    this.status = status;
  }
}

let cachedWhatShowNextFormId: string | null = null;
let pendingWhatShowNextFormIdLookup: Promise<string | null> | null = null;

function isRecord(value: unknown): value is WixRecordFields {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function textValue(value: unknown) {
  if (typeof value === "string") {
    return value.trim();
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value).trim();
  }

  return "";
}

function booleanValue(value: unknown, fallback = false) {
  return typeof value === "boolean" ? value : fallback;
}

function normalizeLookupText(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function flattenRecord(value: unknown): WixRecordFields {
  if (!isRecord(value)) {
    return {};
  }

  return {
    ...value,
    ...(isRecord(value.data) ? value.data : {}),
    ...(isRecord(value.fieldData) ? value.fieldData : {}),
    ...(isRecord(value.properties) ? value.properties : {}),
  };
}

async function wixFormsFetch(path: string, init: RequestInit = {}) {
  const config = getWixClientConfig();
  const response = await fetch(path, {
    ...init,
    headers: {
      Authorization: config.apiKey,
      "Content-Type": "application/json",
      "wix-site-id": config.siteId,
      ...init.headers,
    },
    cache: "no-store",
  });
  const responseText = await response.text();

  if (!response.ok) {
    throw new WixFormsApiError(
      `Wix Forms API request failed: ${response.status} ${response.statusText}${
        responseText ? ` ${responseText.slice(0, 500)}` : ""
      }`,
      response.status,
    );
  }

  return responseText ? (JSON.parse(responseText) as unknown) : {};
}

function getFormsArray(value: unknown) {
  if (!isRecord(value)) {
    return [];
  }

  return Array.isArray(value.forms) ? value.forms : [];
}

function getFormId(value: unknown) {
  const fields = flattenRecord(value);
  return textValue(fields.id ?? fields._id);
}

function getFormName(value: unknown) {
  const fields = flattenRecord(value);
  return textValue(fields.name ?? fields.displayName ?? fields.title);
}

function getFieldOptions(value: WixRecordFields): WixSurveyFieldOption[] {
  const optionSources = [
    value.options,
    (value.view as WixRecordFields | undefined)?.options,
    (value.fieldTypeData as WixRecordFields | undefined)?.options,
  ];
  const options = optionSources.find(Array.isArray);

  if (!Array.isArray(options)) {
    return [];
  }

  return options
    .map((option) => {
      const fields = flattenRecord(option);
      const label = textValue(fields.label ?? fields.text ?? fields.name ?? fields.value);
      const optionValue = textValue(fields.value ?? fields.id ?? label);

      return label && optionValue ? { label, value: optionValue } : null;
    })
    .filter((option): option is WixSurveyFieldOption => Boolean(option));
}

function normalizeFieldType(value: string) {
  const type = value.toUpperCase().replace(/[^A-Z0-9]+/g, "_");

  if (type.includes("EMAIL")) {
    return "EMAIL";
  }

  if (type.includes("PHONE")) {
    return "PHONE";
  }

  if (type.includes("LONG") || type.includes("TEXT_AREA") || type.includes("TEXTAREA")) {
    return "LONG_TEXT";
  }

  if (type.includes("MULTIPLE") || type.includes("CHECKBOX_GROUP")) {
    return "MULTIPLE_CHOICE";
  }

  if (type.includes("DROPDOWN") || type.includes("SELECT")) {
    return "DROPDOWN";
  }

  if (type.includes("RADIO") || type.includes("SINGLE")) {
    return "SINGLE_CHOICE";
  }

  if (type.includes("CHECKBOX") || type.includes("BOOLEAN")) {
    return "BOOLEAN";
  }

  if (type.includes("DATE")) {
    return "DATE";
  }

  if (type.includes("NUMBER")) {
    return "NUMBER";
  }

  return type || "STRING";
}

function normalizeSurveyField(value: unknown): WixSurveyField | null {
  const fields = flattenRecord(value);
  const view = flattenRecord(fields.view);
  const validation = flattenRecord(fields.validation);
  const predefined = flattenRecord(validation.predefined);
  const key = textValue(
    fields.target ??
      fields.key ??
      fields.fieldKey ??
      fields.name ??
      fields.id,
  );
  const id = textValue(fields.id ?? key);
  const label = textValue(fields.label ?? view.label ?? fields.title ?? key);
  const type = normalizeFieldType(
    textValue(fields.type ?? fields.fieldType ?? view.type ?? predefined.format),
  );

  if (!id || !key || !label) {
    return null;
  }

  return {
    id,
    key,
    label,
    type,
    required: booleanValue(fields.required ?? validation.required ?? validation.mandatory),
    hidden: booleanValue(fields.hidden ?? view.hidden),
    options: getFieldOptions(fields),
  };
}

function getFormFieldArray(value: unknown): unknown[] {
  const fields = flattenRecord(value);

  for (const candidate of [fields.fields, fields.formFields]) {
    if (Array.isArray(candidate)) {
      return candidate;
    }
  }

  return [];
}

function normalizeSurveyForm(value: unknown, summary?: unknown): WixSurveyForm | null {
  const id = getFormId(value) || getFormId(summary);
  const name = getFormName(value) || getFormName(summary) || WHAT_SHOW_NEXT_FORM_NAME;
  const summaryFields = getFormFieldArray(summary);
  const formFields = getFormFieldArray(value);
  const fields = (summaryFields.length > 0 ? summaryFields : formFields)
    .map(normalizeSurveyField)
    .filter((field): field is WixSurveyField => Boolean(field))
    .filter((field) => !field.hidden);

  if (!id) {
    return null;
  }

  return {
    id,
    name,
    fields,
  };
}

async function listWixForms() {
  const url = new URL(WIX_FORM_SCHEMA_API_BASE_URL);
  url.searchParams.set("namespace", WIX_FORMS_NAMESPACE);
  url.searchParams.set("paging.limit", "100");
  url.searchParams.set("enabled", "true");

  return getFormsArray(await wixFormsFetch(url.toString()));
}

async function queryWixFormsByName(name: string) {
  const payload = await wixFormsFetch(`${WIX_FORM_SCHEMA_API_BASE_URL}/query`, {
    method: "POST",
    body: JSON.stringify({
      namespace: WIX_FORMS_NAMESPACE,
      query: {
        filter: {
          name: {
            $eq: name,
          },
          namespace: {
            $eq: WIX_FORMS_NAMESPACE,
          },
        },
        paging: {
          limit: 100,
        },
      },
    }),
  });

  return getFormsArray(payload);
}

async function getWixFormSummary(formId: string) {
  const payload = await wixFormsFetch(`${WIX_FORM_SCHEMA_API_BASE_URL}/${formId}/summary`);

  if (!isRecord(payload)) {
    return null;
  }

  return payload.formSummary ?? payload.summary ?? null;
}

async function resolveWhatShowNextFormId(forceRefresh = false) {
  if (!isWixConfigured()) {
    return null;
  }

  if (!forceRefresh && cachedWhatShowNextFormId) {
    return cachedWhatShowNextFormId;
  }

  if (!forceRefresh && pendingWhatShowNextFormIdLookup) {
    return pendingWhatShowNextFormIdLookup;
  }

  if (forceRefresh) {
    cachedWhatShowNextFormId = null;
    pendingWhatShowNextFormIdLookup = null;
  }

  const normalizedTargetName = normalizeLookupText(WHAT_SHOW_NEXT_FORM_NAME);
  pendingWhatShowNextFormIdLookup = queryWixFormsByName(WHAT_SHOW_NEXT_FORM_NAME)
    .catch(() => listWixForms())
    .then((forms) => {
      const matchingForm = forms.find(
        (form) => normalizeLookupText(getFormName(form)) === normalizedTargetName,
      );
      const formId = matchingForm ? getFormId(matchingForm) : "";

      cachedWhatShowNextFormId = formId || null;
      return cachedWhatShowNextFormId;
    })
    .finally(() => {
      pendingWhatShowNextFormIdLookup = null;
    });

  return pendingWhatShowNextFormIdLookup;
}

async function getWhatShowNextFormById(formId: string) {
  const summary = await getWixFormSummary(formId).catch(() => null);

  return normalizeSurveyForm(
    {
      id: formId,
      name: WHAT_SHOW_NEXT_FORM_NAME,
    },
    summary,
  );
}

export async function getWhatShowNextForm() {
  const formId = await resolveWhatShowNextFormId();

  if (!formId) {
    return null;
  }

  return getWhatShowNextFormById(formId);
}

function buildSubmissionValues(form: WixSurveyForm, values: Record<string, WixSurveySubmissionValue>) {
  const allowedKeys = new Set(form.fields.map((field) => field.key));

  const submissions = Object.fromEntries(
    Object.entries(values)
      .filter(([key]) => allowedKeys.has(key))
      .filter(([, value]) => {
        if (Array.isArray(value)) {
          return value.some((item) => textValue(item));
        }

        if (typeof value === "boolean") {
          return true;
        }

        return Boolean(textValue(value));
      }),
  );

  for (const field of form.fields) {
    if (!field.required) {
      continue;
    }

    const value = submissions[field.key];
    const hasValue = Array.isArray(value) ? value.length > 0 : Boolean(textValue(value));

    if (!hasValue) {
      throw new Error(`Missing required Wix form field: ${field.key}`);
    }
  }

  return submissions;
}

function isFormNotFoundError(error: unknown) {
  return error instanceof WixFormsApiError && error.status === FORM_NOT_FOUND_STATUS;
}

async function submitToWixForm(form: WixSurveyForm, values: Record<string, WixSurveySubmissionValue>) {
  const submissions = buildSubmissionValues(form, values);

  await wixFormsFetch(WIX_FORM_SUBMISSION_API_URL, {
    method: "POST",
    body: JSON.stringify({
      submission: {
        formId: form.id,
        submissions,
      },
    }),
  });

  return form.id;
}

export async function submitWhatShowNextForm(values: Record<string, WixSurveySubmissionValue>) {
  const form = await getWhatShowNextForm();

  if (!form || form.fields.length === 0) {
    throw new Error("The What show next? Wix form could not be found or has no fields.");
  }

  try {
    const formId = await submitToWixForm(form, values);

    return {
      success: true,
      formId,
    };
  } catch (error) {
    if (!isFormNotFoundError(error)) {
      throw error;
    }

    const refreshedFormId = await resolveWhatShowNextFormId(true);
    const refreshedForm = refreshedFormId ? await getWhatShowNextFormById(refreshedFormId) : null;

    if (!refreshedForm || refreshedForm.fields.length === 0) {
      throw error;
    }

    const formId = await submitToWixForm(refreshedForm, values);

    return {
      success: true,
      formId,
    };
  }
}
