"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { getProfile, hasCompletedOnboarding } from "@/lib/profile";
import { UserProfile, calculateDailyProtein } from "./data";
import { OnboardingFlow } from "@/components/onboarding";
import { Dashboard } from "@/components/dashboard";

interface UserContextType {
  user: any;
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
  updateProteinConsumed: (amount: number) => void;
  resetDailyProtein: () => void;
  loading: boolean;
  isOnboarded: boolean;
  clearProfile: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children?: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfileState] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(false);

  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      const supabase = createClient();
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (!session || error) {
        if (mounted) setLoading(false);
        return; // Middleware handles redirect to /login
      }
      
      if (mounted) setUser(session.user);
      
      try {
        const dbProfile = await getProfile(session.user.id);
        const onboarded = await hasCompletedOnboarding(session.user.id);
        
        if (mounted && dbProfile) {
           const mappedProfile: UserProfile = {
             name: dbProfile.name || '',
             age: dbProfile.age || 0,
             weight: dbProfile.weight_kg || 0,
             targetWeight: dbProfile.target_weight_kg || 0,
             height: dbProfile.height_cm || 0,
             goal: dbProfile.goal as any,
             budget: dbProfile.budget as any,
             workoutRoutine: dbProfile.routine as any,
             proteinPreference: dbProfile.protein_preference as any,
             dailyProteinGoal: dbProfile.daily_protein_goal || 0,
             proteinConsumedToday: 0
           };
           setProfileState(mappedProfile);
           setIsOnboarded(onboarded);
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    
    loadData();
    return () => { mounted = false; };
  }, []);

  const setProfile = (p: UserProfile) => {
    const dailyProteinGoal = calculateDailyProtein(p);
    setProfileState({ ...p, dailyProteinGoal, proteinConsumedToday: p.proteinConsumedToday || 0 });
    setIsOnboarded(true);
  };

  const updateProteinConsumed = (amount: number) => {
    if (profile) setProfileState({ ...profile, proteinConsumedToday: profile.proteinConsumedToday + amount });
  };

  const resetDailyProtein = () => {
    if (profile) setProfileState({ ...profile, proteinConsumedToday: 0 });
  };

  const clearProfile = () => {
    setProfileState(null);
    setUser(null);
    setIsOnboarded(false);
  };

  const value = {
    user,
    profile,
    setProfile,
    updateProteinConsumed,
    resetDailyProtein,
    loading,
    isOnboarded,
    clearProfile
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If session exists -> check profile completeness and return matching component
  // if children is not passed (used as the main root wrapper in Home)
  if (!children) {
    if (!user) return null; // Middleware will catch and redirect
    return (
      <UserContext.Provider value={value}>
        {isOnboarded ? <Dashboard /> : <OnboardingFlow />}
      </UserContext.Provider>
    );
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
}
