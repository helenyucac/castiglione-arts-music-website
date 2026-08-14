"use client";

import { useState, type FormEvent } from "react";
import type { WixSurveyField, WixSurveySubmissionValue } from "@/lib/wix/forms";

type WhatShowNextSurveyFormProps = {
  fields: WixSurveyField[];
};

type SurveyApiResponse = {
  success?: boolean;
  error?: string;
};

const interFont = {
  fontFamily: "Inter, sans-serif",
};

const inputClass =
  "mt-3 w-full border-0 border-b border-[rgba(17,17,17,0.22)] bg-transparent px-0 pb-4 pt-0 text-[16px] font-normal leading-[24px] text-[#111111] outline-none transition-colors focus:border-[#111111]";
const labelClass =
  "m-0 block text-[11px] font-semibold uppercase leading-[16.5px] tracking-[2.75px] text-[rgba(17,17,17,0.48)] antialiased";

function getFieldInputType(field: WixSurveyField) {
  if (field.type === "EMAIL") {
    return "email";
  }

  if (field.type === "PHONE") {
    return "tel";
  }

  if (field.type === "NUMBER") {
    return "number";
  }

  if (field.type === "DATE") {
    return "date";
  }

  return "text";
}

function getFormValues(formData: FormData, fields: WixSurveyField[]) {
  const values: Record<string, WixSurveySubmissionValue> = {};

  for (const field of fields) {
    if (field.type === "MULTIPLE_CHOICE") {
      values[field.key] = formData
        .getAll(field.key)
        .filter((value): value is string => typeof value === "string")
        .map((value) => value.trim())
        .filter(Boolean);
      continue;
    }

    if (field.type === "BOOLEAN") {
      values[field.key] = formData.get(field.key) === "true";
      continue;
    }

    const value = formData.get(field.key);
    values[field.key] = typeof value === "string" ? value.trim() : "";
  }

  return values;
}

function FieldControl({ field }: { field: WixSurveyField }) {
  if (field.type === "LONG_TEXT") {
    return (
      <textarea
        id={field.id}
        name={field.key}
        required={field.required}
        rows={5}
        className={inputClass}
      />
    );
  }

  if (field.type === "DROPDOWN") {
    return (
      <select
        id={field.id}
        name={field.key}
        required={field.required}
        className={inputClass}
        defaultValue=""
      >
        <option value="" disabled>
          Select an option
        </option>
        {field.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === "SINGLE_CHOICE" || field.type === "RADIO_GROUP") {
    return (
      <div className="mt-4 grid gap-3" role="radiogroup" aria-required={field.required}>
        {field.options.map((option) => (
          <label
            key={option.value}
            className="flex items-start gap-3 text-[15px] leading-[24px] text-[rgba(17,17,17,0.78)]"
            style={interFont}
          >
            <input
              type="radio"
              name={field.key}
              value={option.value}
              required={field.required}
              className="mt-1 size-4 shrink-0 accent-[#111111]"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    );
  }

  if (field.type === "MULTIPLE_CHOICE") {
    return (
      <div className="mt-4 grid gap-3">
        {field.options.map((option) => (
          <label
            key={option.value}
            className="flex items-start gap-3 text-[15px] leading-[24px] text-[rgba(17,17,17,0.78)]"
            style={interFont}
          >
            <input
              type="checkbox"
              name={field.key}
              value={option.value}
              className="mt-1 size-4 shrink-0 accent-[#111111]"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    );
  }

  if (field.type === "BOOLEAN") {
    return (
      <label
        className="mt-4 flex items-start gap-3 text-[15px] leading-[24px] text-[rgba(17,17,17,0.78)]"
        style={interFont}
      >
        <input
          type="checkbox"
          name={field.key}
          value="true"
          required={field.required}
          className="mt-1 size-4 shrink-0 accent-[#111111]"
        />
        <span>{field.label}</span>
      </label>
    );
  }

  return (
    <input
      id={field.id}
      name={field.key}
      type={getFieldInputType(field)}
      required={field.required}
      className={inputClass}
    />
  );
}

export function WhatShowNextSurveyForm({ fields }: WhatShowNextSurveyFormProps) {
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const website = formData.get("website");

    if (typeof website === "string" && website.trim()) {
      return;
    }

    setIsSubmitting(true);
    setStatusMessage("");

    try {
      const response = await fetch("/api/what-show-next", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: getFormValues(formData, fields),
          website,
        }),
      });
      const body = (await response.json().catch(() => null)) as SurveyApiResponse | null;

      if (!response.ok || body?.success !== true) {
        setStatusMessage(body?.error ?? "Something went wrong. Please try again.");
        return;
      }

      form.reset();
      setStatusMessage("Thank you. Your response has been received.");
    } catch {
      setStatusMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="mt-12 grid gap-10" onSubmit={handleSubmit}>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      {fields.map((field) => (
        <div key={field.key}>
          {field.type === "BOOLEAN" ? null : (
            <label className={labelClass} htmlFor={field.id} style={interFont}>
              {field.label}
              {field.required ? " *" : ""}
            </label>
          )}
          <FieldControl field={field} />
        </div>
      ))}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-fit items-center justify-center bg-[#111111] px-6 py-4 text-[11px] font-semibold uppercase leading-none tracking-[2.2px] text-white antialiased transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60"
        style={interFont}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>

      {statusMessage ? (
        <p
          className="m-0 text-[13px] font-normal leading-[21px] text-[rgba(17,17,17,0.68)]"
          style={interFont}
          aria-live="polite"
        >
          {statusMessage}
        </p>
      ) : null}
    </form>
  );
}
