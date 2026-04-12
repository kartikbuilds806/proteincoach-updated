"use client";

import { UserProvider, useUser } from "@/lib/user-context";
import { OnboardingFlow } from "@/components/onboarding";
import { Dashboard } from "@/components/dashboard";

function HomeContent() {
  const { isOnboarded } = useUser();

  if (!isOnboarded) {
    return <OnboardingFlow />;
  }

  return <Dashboard />;
}

export function ClientHome() {
  return (
    <UserProvider>
      <HomeContent />
    </UserProvider>
  );
}
