"use client";

import { FormEvent, useState } from "react";

const inputClass =
  "mt-2 w-full border border-black bg-white px-4 py-4 text-base font-semibold outline-none transition-colors focus:bg-[#fdf9ee]";

const partnershipTypes = [
  "Venue / Presenter",
  "Sponsorship",
  "IP / Rights Holder",
  "Creative Agency",
  "Touring Partner",
  "Other",
];

export function PartnershipForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitted(true);
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="text-sm font-black uppercase tracking-normal" htmlFor="partner-first-name">
            First Name
          </label>
          <input id="partner-first-name" name="firstName" required className={inputClass} />
        </div>

        <div>
          <label className="text-sm font-black uppercase tracking-normal" htmlFor="partner-last-name">
            Last Name
          </label>
          <input id="partner-last-name" name="lastName" required className={inputClass} />
        </div>
      </div>

      <div>
        <label className="text-sm font-black uppercase tracking-normal" htmlFor="partner-company">
          Company / Organisation
        </label>
        <input id="partner-company" name="company" required className={inputClass} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="text-sm font-black uppercase tracking-normal" htmlFor="partner-email">
            Email
          </label>
          <input
            id="partner-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-sm font-black uppercase tracking-normal" htmlFor="partner-phone">
            Phone
          </label>
          <input
            id="partner-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-black uppercase tracking-normal" htmlFor="partnership-type">
          Partnership Type
        </label>
        <select
          id="partnership-type"
          name="partnershipType"
          required
          defaultValue=""
          className={inputClass}
        >
          <option value="" disabled>
            Select partnership type
          </option>
          {partnershipTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-black uppercase tracking-normal" htmlFor="partner-message">
          Message
        </label>
        <textarea id="partner-message" name="message" rows={7} className={inputClass} />
      </div>

      <button
        type="submit"
        className="border border-black bg-black px-6 py-4 text-sm font-black uppercase tracking-normal text-white transition-colors hover:bg-[#fdf9ee] hover:text-black"
      >
        Submit Enquiry
      </button>

      {isSubmitted ? (
        <p className="border-l-4 border-black bg-[#fdf9ee] px-4 py-3 text-sm font-bold">
          Thank you. Your partnership enquiry has been received in this front-end preview.
        </p>
      ) : null}
    </form>
  );
}
