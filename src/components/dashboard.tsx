"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/lib/user-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProteinTracker } from "@/components/protein-tracker";
import { RecipeBrowser } from "@/components/recipe-browser";
import { WorkoutMeals } from "@/components/workout-meals";
import { SupplementGuide } from "@/components/supplement-guide";
import { getStreak } from "@/lib/streaks";
import {
  Zap,
  ChefHat,
  Dumbbell,
  Pill,
  BarChart3,
  LogOut,
} from "lucide-react";

const TABS = [
  { id: "tracker", label: "Tracker", icon: BarChart3 },
  { id: "recipes", label: "Recipes", icon: ChefHat },
  { id: "meals", label: "Meals", icon: Dumbbell },
  { id: "supplements", label: "Supplements", icon: Pill },
];

export function Dashboard() {
  const { profile, userId, clearProfile } = useUser();
  const [activeTab, setActiveTab] = useState("tracker");
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (userId && profile) {
      getStreak(userId, profile.dailyProteinGoal).then(setStreak);
    }
  }, [userId, profile]);

  if (!profile) return null;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning ☀️";
    if (hour < 18) return "Good Afternoon 🌤️";
    return "Good Evening 🌙";
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Nav */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg hidden sm:inline-block">ProteinCoach</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground hidden sm:block">
              {getGreeting()}, {profile.name}!
            </span>
            <Badge variant="outline" className="hidden sm:flex border-orange-200 text-orange-600 bg-orange-50 font-medium">
               🔥 {streak}
            </Badge>
            <Badge variant="secondary" className="hidden sm:flex">
              {profile.goal === "bulking"
                ? "Bulking"
                : profile.goal === "losing"
                ? "Cutting"
                : profile.goal === "muscle"
                ? "Muscle Building"
                : "Stay Fit"}{" "}
              Mode
            </Badge>
            <Button variant="ghost" size="icon" onClick={clearProfile} title="Logout">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Desktop Tab Navigation */}
      <div className="border-b border-border bg-card/30 hidden md:block">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="flex gap-4 overflow-x-auto py-2 -mb-px">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    active
                      ? "bg-green-100 text-green-700"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto px-4 py-6 w-full pb-24 md:pb-6">
        {activeTab === "tracker" && <ProteinTracker />}
        {activeTab === "recipes" && <RecipeBrowser />}
        {activeTab === "meals" && <WorkoutMeals />}
        {activeTab === "supplements" && <SupplementGuide />}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-background pb-safe z-50">
        <nav className="flex justify-around items-center h-16">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                  active ? "text-green-600" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? "fill-green-100 text-green-600" : ""}`} />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
