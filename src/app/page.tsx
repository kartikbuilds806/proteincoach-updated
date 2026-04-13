import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { UserProvider } from "@/lib/user-context";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // The UserProvider mounts and fetches the profile. 
  // It conditionally renders OnboardingFlow or Dashboard based on the fetched profile completeness.
  return <UserProvider />;
}
