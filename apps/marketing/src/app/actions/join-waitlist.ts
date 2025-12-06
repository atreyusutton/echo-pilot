"use server";

import { getSupabaseAdminClient } from "@/lib/supabase";

export type WaitlistState = {
  status: "idle" | "success" | "error";
  message: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function joinWaitlistAction(
  _prevState: WaitlistState,
  formData: FormData
): Promise<WaitlistState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!emailRegex.test(email)) {
    return { status: "error", message: "Enter a valid email address." };
  }

  try {
    const supabase = getSupabaseAdminClient();
    const { error } = await supabase.from("waitlist_signups").insert({
      email,
    });

    if (error) {
      throw error;
    }

    return {
      status: "success",
      message: "You’re on the list. We’ll reach out soon.",
    };
  } catch (error) {
    console.error("Failed to add waitlist entry", error);
    return {
      status: "error",
      message: "Something went wrong. Try again in a moment.",
    };
  }
}

