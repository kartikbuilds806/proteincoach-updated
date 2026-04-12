import { createClient } from "@/lib/supabase/client";
import { ProfileRow } from "@/types/database";

export async function getProfile(userId: string): Promise<ProfileRow | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // No rows found
    throw error;
  }
  return data as ProfileRow;
}

export async function saveProfile(userId: string, profileData: Partial<ProfileRow>): Promise<ProfileRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('profiles')
    .upsert({ id: userId, ...profileData })
    .select()
    .single();
    
  if (error) throw error;
  return data as ProfileRow;
}

export async function hasCompletedOnboarding(userId: string): Promise<boolean> {
  try {
    const profile = await getProfile(userId);
    if (!profile) return false;
    
    // Check if core fields exist
    return !!(profile.age && profile.weight_kg && profile.height_cm && profile.goal);
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    return false;
  }
}
