"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, calculateDailyProtein } from "./data";

interface UserContextType {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
  updateProteinConsumed: (amount: number) => void;
  resetDailyProtein: () => void;
  isOnboarded: boolean;
  clearProfile: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const STORAGE_KEY = "protein-coach-profile";

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfileState] = useState<UserProfile | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setProfileState(JSON.parse(stored));
      } catch {}
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded && profile) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    }
  }, [profile, loaded]);

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
    localStorage.removeItem(STORAGE_KEY);
    setProfileState(null);
  };

  if (!loaded) {
    return null;
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
