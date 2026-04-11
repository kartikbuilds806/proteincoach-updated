"use client";

import { useUser } from "@/lib/user-context";
import { OnboardingFlow } from "@/components/onboarding";
import { Dashboard } from "@/components/dashboard";

export default function Home() {
  const { isOnboarded } = useUser();

  if (!isOnboarded) {
    return <OnboardingFlow />;
  }

  return <Dashboard />;
}
