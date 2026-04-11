"use client";

import { useState } from "react";
import { useUser } from "@/lib/user-context";
import { getRecommendedRecipes } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Target,
  Plus,
  RotateCcw,
  TrendingUp,
  Flame,
  Utensils,
} from "lucide-react";

export function ProteinTracker() {
  const { profile, updateProteinConsumed, resetDailyProtein } = useUser();
  const [customAmount, setCustomAmount] = useState("");

  if (!profile) return null;

  const progress = Math.min(
    (profile.proteinConsumedToday / profile.dailyProteinGoal) * 100,
    100
  );
  const remaining = Math.max(
    profile.dailyProteinGoal - profile.proteinConsumedToday,
    0
  );
  const topRecipes = getRecommendedRecipes(profile).slice(0, 4);

  const quickAdds = [10, 20, 25, 30, 40, 50];

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="py-4">
          <CardContent className="px-4 py-0 text-center">
            <p className="text-xs text-muted-foreground">Daily Goal</p>
            <p className="text-2xl font-bold text-primary">
              {profile.dailyProteinGoal}g
            </p>
          </CardContent>
        </Card>
        <Card className="py-4">
          <CardContent className="px-4 py-0 text-center">
            <p className="text-xs text-muted-foreground">Consumed</p>
            <p className="text-2xl font-bold">
              {profile.proteinConsumedToday}g
            </p>
          </CardContent>
        </Card>
        <Card className="py-4">
          <CardContent className="px-4 py-0 text-center">
            <p className="text-xs text-muted-foreground">Remaining</p>
            <p className="text-2xl font-bold text-orange-400">{remaining}g</p>
          </CardContent>
        </Card>
        <Card className="py-4">
          <CardContent className="px-4 py-0 text-center">
            <p className="text-xs text-muted-foreground">Progress</p>
            <p className="text-2xl font-bold">
              {Math.round(progress)}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Ring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Target className="w-5 h-5 text-primary" />
            Today&apos;s Protein Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>{profile.proteinConsumedToday}g consumed</span>
              <span>{profile.dailyProteinGoal}g goal</span>
            </div>
            <Progress value={progress} className="h-4" />
            {progress >= 100 && (
              <p className="text-primary text-sm font-medium mt-2">
                Goal reached! Great job!
              </p>
            )}
          </div>

          {/* Quick Add */}
          <div>
            <p className="text-sm font-medium mb-2">Quick Add Protein (g)</p>
            <div className="flex flex-wrap gap-2">
              {quickAdds.map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  size="sm"
                  onClick={() => updateProteinConsumed(amount)}
                >
                  <Plus className="w-3 h-3 mr-1" />
                  {amount}g
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Add */}
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Custom amount (g)"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={() => {
                if (customAmount && parseInt(customAmount) > 0) {
                  updateProteinConsumed(parseInt(customAmount));
                  setCustomAmount("");
                }
              }}
              disabled={!customAmount || parseInt(customAmount) <= 0}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
            <Button variant="outline" onClick={resetDailyProtein} title="Reset today">
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Profile Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="w-5 h-5 text-primary" />
            Your Profile Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            <div className="p-3 rounded-lg bg-accent/50">
              <p className="text-muted-foreground text-xs">Weight</p>
              <p className="font-semibold">{profile.weight} kg</p>
            </div>
            <div className="p-3 rounded-lg bg-accent/50">
              <p className="text-muted-foreground text-xs">Target</p>
              <p className="font-semibold">{profile.targetWeight} kg</p>
            </div>
            <div className="p-3 rounded-lg bg-accent/50">
              <p className="text-muted-foreground text-xs">Goal</p>
              <p className="font-semibold capitalize">{profile.goal}</p>
            </div>
            <div className="p-3 rounded-lg bg-accent/50">
              <p className="text-muted-foreground text-xs">Budget</p>
              <p className="font-semibold capitalize">{profile.budget}</p>
            </div>
            <div className="p-3 rounded-lg bg-accent/50">
              <p className="text-muted-foreground text-xs">Routine</p>
              <p className="font-semibold capitalize">{profile.workoutRoutine}</p>
            </div>
            <div className="p-3 rounded-lg bg-accent/50">
              <p className="text-muted-foreground text-xs">Preference</p>
              <p className="font-semibold capitalize">{profile.proteinPreference}</p>
            </div>
          </div>
        </CardContent>
      </Card>

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
                className="p-3 rounded-lg border border-border bg-accent/30 flex justify-between items-start"
              >
                <div>
                  <p className="font-semibold text-sm">{recipe.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {recipe.proteinSource} &middot; {recipe.prepTime} min
                  </p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">{recipe.protein}g protein</Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    <Flame className="w-3 h-3 inline mr-0.5" />
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
