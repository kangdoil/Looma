import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function isValidHttpUrl(value: string) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function isTemplateValue(value: string) {
  return value.startsWith("your-");
}

// This check can be removed, it is just for tutorial purposes
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ?? "";

export const hasEnvVars =
  supabaseUrl.length > 0 &&
  supabasePublishableKey.length > 0 &&
  !isTemplateValue(supabaseUrl) &&
  !isTemplateValue(supabasePublishableKey) &&
  isValidHttpUrl(supabaseUrl);
