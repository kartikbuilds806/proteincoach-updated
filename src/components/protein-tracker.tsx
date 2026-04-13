"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/lib/user-context";
import { getRecommendedRecipes } from "@/lib/data";
import { addLog, getTodayTotal } from "@/lib/logs";
import { getStreak } from "@/lib/streaks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Plus,
  RotateCcw,
  TrendingUp,
  Flame,
  Utensils,
  Trophy,
} from "lucide-react";

export function ProteinTracker() {
  const { profile, userId } = useUser();
  const [customAmount, setCustomAmount] = useState("");
  const [localConsumed, setLocalConsumed] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function loadData() {
      if (!userId || !profile) return;
      try {
        const [total, currentStreak] = await Promise.all([
          getTodayTotal(userId),
          getStreak(userId, profile.dailyProteinGoal)
        ]);
        if (mounted) {
          setLocalConsumed(total);
          setStreak(currentStreak);
        }
      } catch (err) {
        console.error("Error loading total:", err);
      }
    }
    loadData();
    return () => { mounted = false; };
  }, [userId, profile]);

  if (!profile) return null;

  const handleAddProtein = async (amount: number) => {
    if (!userId || isAdding) return;
    setIsAdding(true);
    // Optimistic UI update
    setLocalConsumed(prev => prev + amount);
    try {
      await addLog(userId, { protein_g: amount, food_name: 'Tracker Add', logged_at: new Date().toISOString() });
      const [actualTotal, newStreak] = await Promise.all([
        getTodayTotal(userId),
        getStreak(userId, profile.dailyProteinGoal)
      ]);
      setLocalConsumed(actualTotal);
      setStreak(newStreak);
    } catch (e) {
      console.error("Failed to add log", e);
      // Rollback
      setLocalConsumed(prev => prev - amount);
    } finally {
      setIsAdding(false);
    }
  };

  const progress = Math.min((localConsumed / profile.dailyProteinGoal) * 100, 100);
  const remaining = Math.max(profile.dailyProteinGoal - localConsumed, 0);
  const topRecipes = getRecommendedRecipes(profile).slice(0, 4);
  const quickAdds = [10, 20, 25, 30, 40, 50];

  // Colors for SVG ring
  const circleColor = progress >= 100 
    ? "text-yellow-400" 
    : progress > 0 
      ? "text-green-500" 
      : "text-gray-200";

  // Motivations based on progress
  const getMotivation = () => {
    if (progress === 0) return "Let's get started! 💪";
    if (progress < 50) return "Good start, keep going! 🚀";
    if (progress < 100) return "Almost there! 🔥";
    return "Goal crushed! 🏆";
  };

  const todayStr = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date());

  return (
    <div className="space-y-6">
      {/* Daily Summary Card */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-100">
        <CardContent className="p-6">
          <p className="text-sm text-green-700 font-medium mb-1">{todayStr}</p>
          <h2 className="text-2xl font-bold text-gray-900">{getMotivation()}</h2>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Progress Ring Card */}
        <Card className="flex flex-col justify-center border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-center text-lg font-semibold text-foreground">
              Today's Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-6">
            <div className="relative flex items-center justify-center">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="84"
                  className="stroke-muted fill-none stroke-[12px]"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="84"
                  className={`fill-none stroke-[12px] stroke-current transition-all duration-1000 ease-out ${circleColor}`}
                  strokeDasharray="527.78"
                  strokeDashoffset={527.78 - (progress / 100) * 527.78}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-extrabold text-foreground tracking-tight">
                  {localConsumed}g
                </span>
                <span className="text-sm font-medium text-muted-foreground mt-1">
                  of {profile.dailyProteinGoal}g goal
                </span>
              </div>
            </div>

            <div className="w-full">
              <p className="text-sm font-medium mb-3 text-center">Quick Add Protein</p>
              <div className="flex flex-wrap justify-center gap-2">
                {quickAdds.map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    size="sm"
                    className="hover:border-green-500 hover:text-green-600 transition-colors"
                    onClick={() => handleAddProtein(amount)}
                    disabled={isAdding}
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    {amount}g
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 w-full max-w-xs mx-auto">
              <Input
                type="number"
                placeholder="Custom (g)"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="flex-1 focus-visible:ring-green-500"
              />
              <Button
                className="bg-green-500 hover:bg-green-600"
                onClick={() => {
                  if (customAmount && parseInt(customAmount) > 0) {
                    handleAddProtein(parseInt(customAmount));
                    setCustomAmount("");
                  }
                }}
                disabled={!customAmount || parseInt(customAmount) <= 0 || isAdding}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Info Cards Column */}
        <div className="space-y-6">
          {/* Streak Card */}
          <Card className="bg-orange-50/50 border-orange-100 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-10">
              <Flame className="w-32 h-32 text-orange-500" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base text-orange-800">
                <Flame className="w-5 h-5 text-orange-500" />
                Current Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="text-5xl font-black text-orange-500">{streak}</div>
                <div className="flex flex-col">
                  {streak > 0 ? (
                    <>
                      <span className="font-semibold text-orange-900">Keep it up!</span>
                      <span className="text-sm text-orange-700/80">You're doing amazing!</span>
                    </>
                  ) : (
                    <>
                      <span className="font-semibold text-orange-900">Start your streak today!</span>
                      <span className="text-sm text-orange-700/80">Hit your goal to begin.</span>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Breakdown */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Today's Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-3xl font-bold tracking-tight text-foreground">{localConsumed}g</p>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <Target className="w-3 h-3 inline mr-1" /> Consumed
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold tracking-tight text-orange-500">{remaining}g</p>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <TrendingUp className="w-3 h-3 inline mr-1" /> Remaining
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Profile Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Trophy className="w-5 h-5 text-primary" />
                Your Program
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="p-2 rounded-md bg-accent/50 text-center">
                  <p className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider mb-1">Target</p>
                  <p className="font-semibold text-xs">{profile.targetWeight} kg</p>
                </div>
                <div className="p-2 rounded-md bg-accent/50 text-center">
                  <p className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider mb-1">Goal</p>
                  <p className="font-semibold text-xs capitalize">{profile.goal}</p>
                </div>
                <div className="p-2 rounded-md bg-accent/50 text-center">
                  <p className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider mb-1">Routine</p>
                  <p className="font-semibold text-xs capitalize">{profile.workoutRoutine}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Top Recipe Picks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Utensils className="w-5 h-5 text-primary" />
            Top Picks For You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {topRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="p-3 rounded-xl border border-border bg-accent/30 hover:bg-accent/60 transition-colors flex justify-between items-start"
              >
                <div>
                  <p className="font-semibold text-sm">{recipe.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 flex items-center">
                    {recipe.proteinSource} <span className="mx-1.5">•</span> {recipe.prepTime} min
                  </p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="bg-white border hover:bg-white">{recipe.protein}g protein</Badge>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center justify-end font-medium">
                    <Flame className="w-3 h-3 text-orange-500 mr-1" />
                    {recipe.calories} cal
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
