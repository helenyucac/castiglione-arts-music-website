"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { formLabels } from "@/data/siteSettings";

const interFont = {
  fontFamily: "Inter, sans-serif",
};

const displayFont = {
  fontFamily: 'Fraunces, "Cormorant Garamond", serif',
};

const inputClass =
  "mt-5 w-full border-0 border-b border-[rgba(17,17,17,0.22)] bg-transparent px-0 pb-4 pt-0 text-[16px] font-normal leading-[24px] text-[#111111] outline-none transition-colors focus:border-[#111111]";

const labelClass =
  "m-0 block text-[11px] font-semibold uppercase leading-[16.5px] tracking-[2.75px] text-[rgba(17,17,17,0.48)] antialiased";

const enquiryTypes = [
  "Artists & Producers",
  "IP & Exhibitions",
  "Brands & Sponsors",
  "Venues & Institutions",
];

export function PartnershipForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedType, setSelectedType] = useState(enquiryTypes[0]);
  const [fileName, setFileName] = useState<string>(formLabels.noFileChosen);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitted(true);
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files ?? []);

    if (selectedFiles.length === 0) {
      setFileName(formLabels.noFileChosen);
      return;
    }

    if (selectedFiles.length === 1) {
      setFileName(selectedFiles[0].name);
      return;
    }

    setFileName(`${selectedFiles.length} ${formLabels.filesSelected}`);
  }

  function handleFileButtonClick() {
    fileInputRef.current?.click();
  }

  return (
    <section className="bg-[#f5f1ea] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[980px] px-4 sm:px-6 lg:px-10">
        <p
          className="m-0 mb-6 p-0 text-[11px] font-semibold uppercase leading-[16.5px] tracking-[2.75px] text-[rgb(217,74,40)] antialiased"
          style={interFont}
        >
          Enquiry
        </p>
        <h2
          className="m-0 max-w-[1036px] text-[48px] font-medium leading-[48px] tracking-[-0.96px] text-[rgb(17,17,17)] antialiased"
          style={displayFont}
        >
          Let&apos;s build something together.
        </h2>
        <p
          className="mt-5 max-w-4xl text-[15px] font-normal leading-[24.375px] text-[rgba(17,17,17,0.75)] antialiased"
          style={interFont}
        >
          Tell us about your project, partnership or idea. Our team will be in
          touch shortly. For direct enquiries, contact
          partnerships@castiglione.art.
        </p>

        <form className="mt-12" onSubmit={handleSubmit}>
          <div className="grid gap-x-10 gap-y-10 md:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="partner-full-name" style={interFont}>
                Full Name
              </label>
              <input
                id="partner-full-name"
                name="fullName"
                required
                autoComplete="name"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="partner-organisation" style={interFont}>
                Organisation
              </label>
              <input
                id="partner-organisation"
                name="organisation"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="partner-email" style={interFont}>
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
              <label className={labelClass} htmlFor="partner-website" style={interFont}>
                Website
              </label>
              <input id="partner-website" name="website" type="url" className={inputClass} />
            </div>

            <div>
              <label className={labelClass} htmlFor="partner-region" style={interFont}>
                Country / Region
              </label>
              <input id="partner-region" name="region" className={inputClass} />
            </div>
          </div>

          <fieldset className="mt-10">
            <legend className={labelClass} style={interFont}>
              Enquiry Type
            </legend>
            <div className="mt-4 flex flex-wrap gap-3">
              {enquiryTypes.map((type) => {
                const isSelected = type === selectedType;

                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedType(type)}
                    className={`min-h-10 border px-5 text-[11px] font-semibold uppercase leading-none tracking-[2.2px] antialiased transition-colors ${
                      isSelected
                        ? "border-[#111111] bg-[#111111] text-white"
                        : "border-[rgba(17,17,17,0.22)] bg-transparent text-[#111111] hover:border-[#111111]"
                    }`}
                    style={interFont}
                    aria-pressed={isSelected}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
            <input type="hidden" name="enquiryType" value={selectedType} />
          </fieldset>

          <div className="mt-10">
            <label className={labelClass} htmlFor="partner-project" style={interFont}>
              Tell us about your project
            </label>
            <textarea
              id="partner-project"
              name="project"
              rows={5}
              placeholder="What are you working on? Include your project, timeline, territory and goals."
              className="mt-4 w-full resize-y border-0 border-b border-[rgba(17,17,17,0.22)] bg-transparent px-0 pb-5 pt-0 text-[15px] font-normal leading-[24.375px] text-[#111111] outline-none placeholder:text-[rgba(17,17,17,0.45)] focus:border-[#111111]"
              style={interFont}
            />
          </div>

          <div className="mt-10">
            <p className={labelClass} style={interFont}>
              Supporting Materials
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handleFileButtonClick}
                className="inline-flex min-h-10 cursor-pointer items-center border border-[rgba(17,17,17,0.22)] bg-white px-5 text-[13px] font-semibold text-[#111111] transition-colors hover:border-[#111111]"
                style={interFont}
              >
                {formLabels.fileUploadButton}
              </button>
              <span
                className="text-[13px] font-normal leading-[21px] text-[rgba(17,17,17,0.58)]"
                style={interFont}
              >
                {fileName}
              </span>
              <input
                ref={fileInputRef}
                id="partner-materials"
                name="materials"
                type="file"
                hidden
                multiple
                onChange={handleFileChange}
              />
            </div>
            <p
              className="mt-4 text-[13px] font-normal leading-[21px] text-[rgba(17,17,17,0.58)]"
              style={interFont}
            >
              Upload a pitch deck, brochure, project overview or technical
              information.
            </p>
          </div>

          <button
            type="submit"
            className="mt-12 inline-flex min-h-14 items-center bg-[#111111] px-9 text-[11px] font-semibold uppercase leading-none tracking-[2.75px] text-white antialiased transition-opacity hover:opacity-80"
            style={interFont}
          >
            Start the conversation →
          </button>

          {isSubmitted ? (
            <p
              className="mt-6 border-l border-[#111111] pl-4 text-[14px] font-normal leading-[22px] text-[rgba(17,17,17,0.75)]"
              style={interFont}
            >
              Thank you. Your partnership enquiry has been received in this
              front-end preview.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
