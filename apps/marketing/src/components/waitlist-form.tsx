"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import { joinWaitlistAction } from "@/app/actions/join-waitlist";
import type { WaitlistState } from "@/app/actions/join-waitlist";

export function WaitlistForm() {
  const initialState: WaitlistState = { status: "idle", message: "" };
  const [state, formAction] = useActionState(joinWaitlistAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const inputId = useId();

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-3 rounded-2xl border border-soft-gray bg-white/80 p-3 shadow-sm backdrop-blur"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex-1">
          <label htmlFor={`email-${inputId}`} className="sr-only">
            Email address
          </label>
          <input
            id={`email-${inputId}`}
            name="email"
            type="email"
            required
            placeholder="Enter your email"
            className="w-full rounded-xl border border-soft-gray/70 px-4 py-3 text-base text-navy placeholder:text-navy/40 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-xl bg-teal px-6 py-3 text-base font-semibold text-white transition hover:bg-teal-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
        >
          Join the waitlist
        </button>
      </div>
      <p
        className={`text-sm ${
          state.status === "error" ? "text-red-600" : "text-navy/70"
        }`}
      >
        {state.message ||
          "No spam. We’ll reach out when Google grants full API access."}
      </p>
    </form>
  );
}

