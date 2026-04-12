"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, calculateDailyProtein } from "./data";
import { createClient } from "@/lib/supabase/client";
import { getProfile } from "@/lib/profile";

interface UserContextType {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
  updateProteinConsumed: (amount: number) => void;
  resetDailyProtein: () => void;
  isOnboarded: boolean;
  clearProfile: () => void;
  userId: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfileState] = useState<UserProfile | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchUserAndProfile = async () => {
      const supabase = createClient();
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (!user || error) {
        if (mounted) setLoaded(true);
        return;
      }
      
      if (mounted) setUserId(user.id);
      
      try {
        const dbProfile = await getProfile(user.id);
        if (mounted && dbProfile && dbProfile.age) {
           const mappedProfile: UserProfile = {
             name: dbProfile.name || '',
             age: dbProfile.age,
             weight: dbProfile.weight_kg!,
             targetWeight: dbProfile.target_weight_kg!,
             height: dbProfile.height_cm!,
             goal: dbProfile.goal as UserProfile['goal'],
             budget: dbProfile.budget as UserProfile['budget'],
             workoutRoutine: dbProfile.routine as UserProfile['workoutRoutine'],
             proteinPreference: dbProfile.protein_preference as UserProfile['proteinPreference'],
             dailyProteinGoal: dbProfile.daily_protein_goal || 0,
             proteinConsumedToday: 0 // Tracked locally by protein-tracker via DB
           };
           setProfileState(mappedProfile);
        }
      } catch (err) {
        console.error("Failed to load DB profile", err);
      } finally {
        if (mounted) setLoaded(true);
      }
    };
    
    fetchUserAndProfile();
    return () => { mounted = false; };
  }, []);

  const setProfile = (p: UserProfile) => {
    const dailyProteinGoal = calculateDailyProtein(p);
    setProfileState({ ...p, dailyProteinGoal, proteinConsumedToday: p.proteinConsumedToday || 0 });
  };

  const updateProteinConsumed = (amount: number) => {
    if (profile) {
      setProfileState({
        ...profile,
        proteinConsumedToday: profile.proteinConsumedToday + amount,
      });
    }
  };

  const resetDailyProtein = () => {
    if (profile) {
      setProfileState({ ...profile, proteinConsumedToday: 0 });
    }
  };

  const clearProfile = () => {
    setProfileState(null);
    setUserId(null);
  };

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <UserContext.Provider
      value={{
        profile,
        setProfile,
        updateProteinConsumed,
        resetDailyProtein,
        isOnboarded: !!profile,
        clearProfile,
        userId
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
