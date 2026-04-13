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

function mapProfileValues(data: any) {
  const goalMap: Record<string, string> = {
    bulking: 'build_muscle',
    muscle: 'build_muscle', 
    muscle_gain: 'build_muscle',
    build_muscle: 'build_muscle',
    losing: 'lose_fat',
    lose_weight: 'lose_fat',
    lose_fat: 'lose_fat',
    weight_loss: 'lose_fat',
    maintain: 'maintain',
    stay_fit: 'maintain',
    general_fitness: 'maintain',
  };
  
  const budgetMap: Record<string, string> = {
    low: 'low',
    budget_friendly: 'low',
    medium: 'medium',
    moderate: 'medium',
    high: 'high',
    premium: 'high',
  };
  
  const routineMap: Record<string, string> = {
    beginner: 'light',
    intermediate: 'moderate',
    advanced: 'active',
    sedentary: 'sedentary',
    light: 'light',
    moderate: 'moderate',
    active: 'active',
    very_active: 'very_active',
  };
  
  const prefMap: Record<string, string> = {
    both: 'all',
    all: 'all',
    all_categories: 'all',
    veg: 'veg',
    vegetarian: 'veg',
    vegan: 'vegan',
    non_veg: 'non-veg',
    'non-veg': 'non-veg',
    non_vegetarian: 'non-veg',
  };
  
  const result = { ...data };
  if ('goal' in data && data.goal) {
    result.goal = goalMap[data.goal.toLowerCase().replace(/[\s-]/g, '_')] || 'maintain';
  }
  if ('budget' in data && data.budget) {
    result.budget = budgetMap[data.budget.toLowerCase().replace(/[\s-]/g, '_')] || 'medium';
  }
  if ('routine' in data && data.routine) {
    result.routine = routineMap[data.routine.toLowerCase().replace(/[\s-]/g, '_')] || 'moderate';
  }
  if ('protein_preference' in data && data.protein_preference) {
    result.protein_preference = prefMap[data.protein_preference.toLowerCase().replace(/[\s-]/g, '_')] || 'all';
  }
  
  return result;
}

export async function saveProfile(userId: string, data: Partial<ProfileRow>): Promise<ProfileRow> {
  const supabase = createClient();
  
  const payload = mapProfileValues(data);

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
