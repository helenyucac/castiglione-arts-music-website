"use client";

import { useMemo, useState, type FormEvent } from "react";

type RegisterInterestFormProps = {
  eventSlug: string;
  eventTitle: string;
  cityOptions: string[];
};

type RegisterInterestApiResponse = {
  success?: boolean;
  alreadyRegistered?: boolean;
  error?: string;
};

type SubmissionStatus = "idle" | "submitting" | "success" | "already-registered" | "error";

const interFont = {
  fontFamily: "Inter, sans-serif",
};

const inputClass =
  "mt-3 w-full border-0 border-b border-[rgba(17,17,17,0.22)] bg-transparent px-0 pb-4 pt-0 text-[16px] font-normal leading-[24px] text-[#111111] outline-none transition-colors focus:border-[#111111] disabled:cursor-wait disabled:opacity-60";
const labelClass =
  "m-0 block text-[11px] font-semibold uppercase leading-[16.5px] tracking-[2.75px] text-[rgba(17,17,17,0.48)] antialiased";

function getStatusMessage(status: SubmissionStatus, errorMessage: string) {
  if (status === "submitting") {
    return "Submitting...";
  }

  if (status === "success") {
    return "Thank you. We will keep you updated.";
  }

  if (status === "already-registered") {
    return "You are already registered for this city.";
  }

  if (status === "error") {
    return errorMessage || "Something went wrong. Please try again.";
  }

  return "";
}

export function RegisterInterestForm({
  eventSlug,
  eventTitle,
  cityOptions,
}: RegisterInterestFormProps) {
  const normalizedCityOptions = useMemo(
    () => Array.from(new Set(cityOptions.map((city) => city.trim()).filter(Boolean))),
    [cityOptions],
  );
  const [email, setEmail] = useState("");
  const [city, setCity] = useState(normalizedCityOptions[0] ?? "");
  const [customCity, setCustomCity] = useState("");
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const isSubmitting = status === "submitting";
  const statusMessage = getStatusMessage(status, errorMessage);
  const hasCityOptions = normalizedCityOptions.length > 0;
  const selectedCity = hasCityOptions ? city : customCity;

  function resetStatus() {
    if (status !== "idle") {
      setStatus("idle");
      setErrorMessage("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const website = String(formData.get("website") ?? "");

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/register-interest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          eventSlug,
          eventTitle,
          city: selectedCity.trim(),
          website,
        }),
      });
      const body = (await response.json().catch(() => ({}))) as RegisterInterestApiResponse;

      if (!response.ok || body.success !== true) {
        setErrorMessage(body.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setEmail("");
      if (!hasCityOptions) {
        setCustomCity("");
      }
      setStatus(body.alreadyRegistered ? "already-registered" : "success");
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <form className="grid gap-10" onSubmit={handleSubmit} noValidate>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div>
        <label className={labelClass} htmlFor="register-interest-event" style={interFont}>
          Event
        </label>
        <input
          id="register-interest-event"
          type="text"
          value={eventTitle}
          disabled
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="register-interest-city" style={interFont}>
          City *
        </label>
        {hasCityOptions ? (
          <select
            id="register-interest-city"
            name="city"
            required
            disabled={isSubmitting}
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
              resetStatus();
            }}
            className={inputClass}
          >
            {normalizedCityOptions.map((cityOption) => (
              <option key={cityOption} value={cityOption}>
                {cityOption}
              </option>
            ))}
          </select>
        ) : (
          <input
            id="register-interest-city"
            name="city"
            type="text"
            required
            disabled={isSubmitting}
            value={customCity}
            onChange={(event) => {
              setCustomCity(event.target.value);
              resetStatus();
            }}
            className={inputClass}
          />
        )}
      </div>

      <div>
        <label className={labelClass} htmlFor="register-interest-email" style={interFont}>
          Email *
        </label>
        <input
          id="register-interest-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          maxLength={254}
          disabled={isSubmitting}
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            resetStatus();
          }}
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-fit items-center justify-center bg-[#111111] px-6 py-4 text-[11px] font-semibold uppercase leading-none tracking-[2.2px] text-white antialiased transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60"
        style={interFont}
      >
        {isSubmitting ? "Submitting..." : "Register Interest"}
      </button>

      {statusMessage ? (
        <p
          className="m-0 min-h-[21px] text-[13px] font-normal leading-[21px] text-[rgba(17,17,17,0.68)]"
          style={interFont}
          aria-live="polite"
        >
          {statusMessage}
        </p>
      ) : null}
    </form>
  );
}
