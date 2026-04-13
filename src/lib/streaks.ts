import { createClient } from "@/lib/supabase/client";

export async function getStreak(userId: string, dailyGoal: number): Promise<number> {
  const supabase = createClient();
  const { data: logs, error } = await supabase
    .from('protein_logs')
    .select('protein_g, logged_at')
    .eq('user_id', userId)
    .order('logged_at', { ascending: false });

  if (error || !logs) return 0;

  const dailyTotals: Record<string, number> = {};
  logs.forEach((log: any) => {
    // using local date string to naturally align with user's day
    const d = new Date(log.logged_at).toLocaleDateString('en-CA'); // Outputs YYYY-MM-DD
    dailyTotals[d] = (dailyTotals[d] || 0) + (log.protein_g || 0);
  });

  let streak = 0;
  const checkDate = new Date();
  
  // Check if today is completed
  const todayStr = checkDate.toLocaleDateString('en-CA');
  if (dailyTotals[todayStr] && dailyTotals[todayStr] >= dailyGoal) {
    streak++;
  }

  // Go backwards day by day from yesterday
  checkDate.setDate(checkDate.getDate() - 1);
  
  while (true) {
    const dStr = checkDate.toLocaleDateString('en-CA');
    if (dailyTotals[dStr] && dailyTotals[dStr] >= dailyGoal) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
       break; // Contiguous streak broken
    }
  }

  return streak;
}
