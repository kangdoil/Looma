import { createClient } from "@/lib/supabase/server";
import type { ProfileUpdate } from "./database.types";

/** 현재 로그인한 사용자의 프로필 조회 */
export async function getMyProfile() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) return { data: null, error: authError };

  return supabase.from("profiles").select("*").eq("id", user.id).single();
}

/** id로 특정 사용자 프로필 조회 */
export async function getProfileById(userId: string) {
  const supabase = await createClient();

  return supabase.from("profiles").select("*").eq("id", userId).single();
}

/** 현재 로그인한 사용자의 프로필 수정 */
export async function updateMyProfile(updates: Omit<ProfileUpdate, "id">) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) return { data: null, error: authError };

  return supabase.from("profiles").update(updates).eq("id", user.id).select().single();
}
