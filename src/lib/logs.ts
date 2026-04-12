import { createClient } from "@/lib/supabase/client";
import { ProteinLogRow } from "@/types/database";

export async function getTodayLogs(userId: string): Promise<ProteinLogRow[]> {
  const supabase = createClient();
  
  // Create boundaries for today in local time
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startOfDay = today.toISOString();
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const endOfDay = tomorrow.toISOString();

  const { data, error } = await supabase
    .from('protein_logs')
    .select('*')
    .eq('user_id', userId)
    .gte('logged_at', startOfDay)
    .lt('logged_at', endOfDay)
    .order('logged_at', { ascending: false });

  if (error) throw error;
  return data as ProteinLogRow[];
}

export async function addLog(userId: string, logData: Partial<ProteinLogRow>): Promise<ProteinLogRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('protein_logs')
    .insert([{ user_id: userId, ...logData }])
    .select()
    .single();
    
  if (error) throw error;
  return data as ProteinLogRow;
}

export async function deleteLog(logId: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from('protein_logs')
    .delete()
    .eq('id', logId);
    
  if (error) throw error;
}

export async function getTodayTotal(userId: string): Promise<number> {
  try {
    const logs = await getTodayLogs(userId);
    return logs.reduce((total, log) => total + (log.protein_g || 0), 0);
  } catch (error) {
    console.error("Error calculating today's total:", error);
    return 0;
  }
}
