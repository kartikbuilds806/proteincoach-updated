"use client";

import { useState } from "react";
import { useUser } from "@/lib/user-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProteinTracker } from "@/components/protein-tracker";
import { RecipeBrowser } from "@/components/recipe-browser";
import { WorkoutMeals } from "@/components/workout-meals";
import { SupplementGuide } from "@/components/supplement-guide";
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
  { id: "meals", label: "Pre/Post Workout", icon: Dumbbell },
  { id: "supplements", label: "Supplements", icon: Pill },
];

export function Dashboard() {
  const { profile, clearProfile } = useUser();
  const [activeTab, setActiveTab] = useState("tracker");

  if (!profile) return null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Nav */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">ProteinCoach</span>
          </div>
          <div className="flex items-center gap-3">
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
            <span className="text-sm text-muted-foreground hidden sm:block">
              Hey, {profile.name}
            </span>
            <Button variant="ghost" size="icon-sm" onClick={clearProfile} title="Reset Profile">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="border-b border-border bg-card/30">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="flex gap-1 overflow-x-auto py-2 -mb-px">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    active
                      ? "bg-primary text-primary-foreground"
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
      <main className="flex-1 max-w-5xl mx-auto px-4 py-6 w-full">
        {activeTab === "tracker" && <ProteinTracker />}
        {activeTab === "recipes" && <RecipeBrowser />}
        {activeTab === "meals" && <WorkoutMeals />}
        {activeTab === "supplements" && <SupplementGuide />}
      </main>
    </div>
  );
}
