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

export async function saveProfile(userId: string, data: Partial<ProfileRow>): Promise<ProfileRow> {
  const supabase = createClient();
  
  const payload = { ...data };
  if (payload.goal) {
    const g = payload.goal.toString().toLowerCase();
    if (['bulking', 'muscle_gain', 'muscle'].includes(g)) {
      payload.goal = 'build_muscle';
    } else if (['losing', 'weight_loss', 'lose'].includes(g)) {
      payload.goal = 'lose_fat';
    } else {
      // Catch "fit", "stay_fit", "maintain", and ANY other stray values
      payload.goal = 'maintain';
    }
  }

  const { data: updatedData, error } = await supabase
    .from('profiles')
    .upsert({ id: userId, ...payload })
    .select()
    .single();
    
  if (error) {
    console.error('Supabase error:', error.message, error.details);
    throw new Error(error.message);
  }
  return updatedData as ProfileRow;
}

export async function hasCompletedOnboarding(userId: string): Promise<boolean> {
  try {
    const profile = await getProfile(userId);
    if (!profile) return false;
    
    // returns true if profile has name and goal
    return !!(profile.name && profile.goal);
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    return false;
  }
}
