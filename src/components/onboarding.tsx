"use client";

import { useState } from "react";
import { useUser } from "@/lib/user-context";
import { UserProfile, calculateDailyProtein } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Dumbbell,
  Target,
  Wallet,
  Utensils,
  ArrowRight,
  ArrowLeft,
  Flame,
  TrendingUp,
  TrendingDown,
  Zap,
  User,
} from "lucide-react";

const STEPS = [
  "Personal Info",
  "Body Stats",
  "Training Goal",
  "Budget & Routine",
  "Protein Preference",
];

export function OnboardingFlow() {
  const { setProfile } = useUser();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    name: "",
    age: "",
    weight: "",
    targetWeight: "",
    height: "",
    goal: "" as UserProfile["goal"] | "",
    budget: "" as UserProfile["budget"] | "",
    workoutRoutine: "" as UserProfile["workoutRoutine"] | "",
    proteinPreference: "" as UserProfile["proteinPreference"] | "",
  });

  const update = (key: string, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const canNext = () => {
    switch (step) {
      case 0:
        return data.name.trim().length > 0;
      case 1:
        return data.age && data.weight && data.height && data.targetWeight;
      case 2:
        return data.goal !== "";
      case 3:
        return data.budget !== "" && data.workoutRoutine !== "";
      case 4:
        return data.proteinPreference !== "";
      default:
        return false;
    }
  };

  const handleFinish = () => {
    const profile: UserProfile = {
      name: data.name,
      age: parseInt(data.age),
      weight: parseFloat(data.weight),
      targetWeight: parseFloat(data.targetWeight),
      height: parseFloat(data.height),
      goal: data.goal as UserProfile["goal"],
      budget: data.budget as UserProfile["budget"],
      workoutRoutine: data.workoutRoutine as UserProfile["workoutRoutine"],
      proteinPreference: data.proteinPreference as UserProfile["proteinPreference"],
      dailyProteinGoal: 0,
      proteinConsumedToday: 0,
    };
    profile.dailyProteinGoal = calculateDailyProtein(profile);
    setProfile(profile);
  };

  const goalOptions = [
    { value: "fit", label: "Stay Fit", icon: Flame, desc: "Maintain health and fitness" },
    { value: "bulking", label: "Bulking", icon: TrendingUp, desc: "Gain mass and strength" },
    { value: "losing", label: "Lose Weight", icon: TrendingDown, desc: "Cut fat, stay lean" },
    { value: "muscle", label: "Build Muscle", icon: Dumbbell, desc: "Maximize muscle growth" },
  ];

  const budgetOptions = [
    { value: "low", label: "Budget Friendly", desc: "Under Rs.50/meal" },
    { value: "medium", label: "Moderate", desc: "Rs.50-150/meal" },
    { value: "high", label: "Premium", desc: "Rs.150+/meal" },
  ];

  const routineOptions = [
    { value: "beginner", label: "Beginner", desc: "1-3 days/week" },
    { value: "intermediate", label: "Intermediate", desc: "4-5 days/week" },
    { value: "advanced", label: "Advanced", desc: "6-7 days/week" },
  ];

  const preferenceOptions = [
    { value: "all", label: "All Categories", desc: "Veg + Non-Veg + Vegan" },
    { value: "veg", label: "Vegetarian", desc: "Paneer, Soya, Dal, Eggs" },
    { value: "non-veg", label: "Non-Vegetarian", desc: "Chicken, Fish, Eggs, Meat" },
    { value: "vegan", label: "Vegan", desc: "Plant-based only" },
  ];

  const proteinPreview =
    data.weight && data.goal
      ? calculateDailyProtein({
          weight: parseFloat(data.weight),
          goal: data.goal as UserProfile["goal"],
        })
      : null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold">ProteinCoach</span>
          </div>
          <p className="text-muted-foreground text-sm">
            Step {step + 1} of {STEPS.length}: {STEPS[step]}
          </p>
          <Progress value={((step + 1) / STEPS.length) * 100} className="mt-3 h-2" />
        </div>

        {/* Step 0: Name */}
        {step === 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                What should we call you?
              </CardTitle>
              <CardDescription>Let&apos;s get to know you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={data.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="mt-1.5"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 1: Body Stats */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Your Body Stats
              </CardTitle>
              <CardDescription>
                We&apos;ll use this to calculate your protein needs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="e.g. 25"
                    value={data.age}
                    onChange={(e) => update("age", e.target.value)}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="e.g. 175"
                    value={data.height}
                    onChange={(e) => update("height", e.target.value)}
                    className="mt-1.5"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="weight">Current Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="e.g. 70"
                    value={data.weight}
                    onChange={(e) => update("weight", e.target.value)}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="targetWeight">Target Weight (kg)</Label>
                  <Input
                    id="targetWeight"
                    type="number"
                    placeholder="e.g. 75"
                    value={data.targetWeight}
                    onChange={(e) => update("targetWeight", e.target.value)}
                    className="mt-1.5"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Goal */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-primary" />
                Training Goal
              </CardTitle>
              <CardDescription>What are you training for?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {goalOptions.map((opt) => {
                  const Icon = opt.icon;
                  const selected = data.goal === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => update("goal", opt.value)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        selected
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 mb-2 ${
                          selected ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                      <div className="font-semibold text-sm">{opt.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {opt.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
              {proteinPreview && (
                <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20 text-center">
                  <p className="text-sm text-muted-foreground">
                    Recommended Daily Protein
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {proteinPreview}g
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 3: Budget & Routine */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-primary" />
                Budget & Workout Routine
              </CardTitle>
              <CardDescription>
                Helps us recommend the right meals and supplements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Meal Budget
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  {budgetOptions.map((opt) => {
                    const selected = data.budget === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => update("budget", opt.value)}
                        className={`p-3 rounded-xl border-2 text-center transition-all ${
                          selected
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="font-semibold text-sm">{opt.label}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {opt.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Workout Routine
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  {routineOptions.map((opt) => {
                    const selected = data.workoutRoutine === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => update("workoutRoutine", opt.value)}
                        className={`p-3 rounded-xl border-2 text-center transition-all ${
                          selected
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="font-semibold text-sm">{opt.label}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {opt.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Protein Preference */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-primary" />
                Protein Preference
              </CardTitle>
              <CardDescription>
                What type of protein recipes interest you?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {preferenceOptions.map((opt) => {
                  const selected = data.proteinPreference === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => update("proteinPreference", opt.value)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        selected
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="font-semibold text-sm">{opt.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {opt.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canNext()}
            >
              Next
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={handleFinish} disabled={!canNext()}>
              Start My Journey
              <Zap className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
