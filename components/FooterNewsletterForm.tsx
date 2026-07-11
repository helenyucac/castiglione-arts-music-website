"use client";

import { useId, useState, type FormEvent } from "react";

type SubscriptionStatus = "idle" | "submitting" | "success" | "already-subscribed" | "invalid" | "error";

type FooterNewsletterFormProps = {
  placeholder: string;
};

function statusMessage(status: SubscriptionStatus) {
  if (status === "submitting") {
    return "SUBSCRIBING...";
  }

  if (status === "success") {
    return "Thank you for subscribing.";
  }

  if (status === "already-subscribed") {
    return "You’re already subscribed.";
  }

  if (status === "invalid") {
    return "Please enter a valid email address.";
  }

  if (status === "error") {
    return "Something went wrong. Please try again.";
  }

  return "";
}

export function FooterNewsletterForm({ placeholder }: FooterNewsletterFormProps) {
  const statusId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubscriptionStatus>("idle");
  const isSubmitting = status === "submitting";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const trimmedEmail = email.trim();

    setStatus("submitting");

    try {
      const formData = new FormData(event.currentTarget);
      const honeypot = String(formData.get("company") ?? "");
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: trimmedEmail,
          company: honeypot,
        }),
      });
      const result = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        alreadySubscribed?: boolean;
      };

      if (response.ok && result.success) {
        setEmail("");
        setStatus(result.alreadySubscribed ? "already-subscribed" : "success");
        return;
      }

      setStatus(response.status === 400 ? "invalid" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      className="mt-12 flex w-full max-w-2xl flex-col gap-4 border-b border-white/25 pb-4 sm:flex-row sm:items-end sm:gap-8"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="hidden" aria-hidden="true">
        <label htmlFor="footer-company">Company</label>
        <input
          id="footer-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <label className="sr-only" htmlFor="footer-email">
          Email address
        </label>
        <input
          id="footer-email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          aria-label="Email address"
          aria-describedby={statusId}
          disabled={isSubmitting}
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status !== "idle") {
              setStatus("idle");
            }
          }}
          placeholder={placeholder}
          className="min-h-10 flex-1 bg-transparent text-left text-[17px] leading-none text-white outline-none placeholder:text-white/40 disabled:cursor-wait disabled:opacity-70"
          style={{ fontFamily: "Inter, sans-serif" }}
        />
        <p
          id={statusId}
          aria-live="polite"
          className="mt-3 min-h-[18px] text-left text-[13px] font-normal leading-[18px] tracking-normal text-white/65 antialiased"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {statusMessage(status)}
        </p>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex min-h-10 flex-col items-start justify-center text-left text-[11px] font-semibold uppercase leading-none tracking-[0.28em] text-white transition-opacity duration-150 hover:opacity-70 disabled:cursor-wait disabled:opacity-50 sm:items-center sm:text-center"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <span>SUBSCRIBE</span>
        <span className="mt-2 text-base leading-none">→</span>
      </button>
    </form>
  );
}
