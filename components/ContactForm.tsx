"use client";

import { FormEvent, useState } from "react";

const inputClass =
  "mt-2 w-full border border-black bg-white px-4 py-4 text-base font-semibold outline-none transition-colors focus:bg-[#fdf9ee]";

const contactEmail = "partnerships@castiglione.art";

function getFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function createMailtoHref(subject: string, body: string) {
  return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const body = [
      `Name: ${getFormValue(formData, "name")}`,
      `Email: ${getFormValue(formData, "email")}`,
      `Join mailing list: ${formData.get("mailingList") ? "Yes" : "No"}`,
      "",
      "Message:",
      getFormValue(formData, "message") || "Not provided",
    ].join("\n");

    setIsSubmitted(true);
    window.location.href = createMailtoHref("Castiglione contact enquiry", body);
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label className="text-sm font-black uppercase tracking-normal" htmlFor="name">
          Name
        </label>
        <input id="name" name="name" required autoComplete="name" className={inputClass} />
      </div>

      <div>
        <label className="text-sm font-black uppercase tracking-normal" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClass}
        />
      </div>

      <div>
        <label className="text-sm font-black uppercase tracking-normal" htmlFor="message">
          Message
        </label>
        <textarea id="message" name="message" rows={7} className={inputClass} />
      </div>

      <label className="flex gap-3 text-sm font-bold leading-6">
        <input
          type="checkbox"
          name="mailingList"
          className="mt-1 size-5 shrink-0 accent-black"
        />
        <span>
          I agree to join the Castiglione mail list for news, marketing and
          exclusive season discounts
        </span>
      </label>

      <button
        type="submit"
        className="border border-black bg-black px-6 py-4 text-sm font-black uppercase tracking-normal text-white transition-colors hover:bg-[#fdf9ee] hover:text-black"
      >
        Submit
      </button>

      {isSubmitted ? (
        <p className="border-l-4 border-black bg-[#fdf9ee] px-4 py-3 text-sm font-bold">
          Your email client should open with this message. Please send the draft
          email to {contactEmail}.
        </p>
      ) : null}
    </form>
  );
}
