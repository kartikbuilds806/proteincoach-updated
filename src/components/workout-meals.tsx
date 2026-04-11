"use client";

import { useState } from "react";
import { useUser } from "@/lib/user-context";
import { getWorkoutMeals, WorkoutMeal } from "@/lib/data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Clock, Flame, Zap, Battery } from "lucide-react";

export function WorkoutMeals() {
  const { profile, updateProteinConsumed } = useUser();
  const [tab, setTab] = useState<"pre-workout" | "post-workout">("pre-workout");

  if (!profile) return null;

  const meals = getWorkoutMeals(profile, tab);

  return (
    <div className="space-y-4">
      {/* Tab Switch */}
      <div className="flex gap-2">
        <Button
          variant={tab === "pre-workout" ? "default" : "outline"}
          onClick={() => setTab("pre-workout")}
          className="flex-1 sm:flex-none"
        >
          <Zap className="w-4 h-4 mr-1.5" />
          Pre-Workout
        </Button>
        <Button
          variant={tab === "post-workout" ? "default" : "outline"}
          onClick={() => setTab("post-workout")}
          className="flex-1 sm:flex-none"
        >
          <Battery className="w-4 h-4 mr-1.5" />
          Post-Workout
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        {tab === "pre-workout"
          ? "Fuel your workout with the right nutrition. Eat these before hitting the gym."
          : "Recovery starts right after your workout. These meals help repair and grow muscle."}
      </p>

      {/* Meal Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {meals.map((meal) => (
          <MealCard
            key={meal.id}
            meal={meal}
            onAddProtein={() => updateProteinConsumed(meal.protein)}
          />
        ))}
      </div>

      {meals.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              No meals match your preference. Try changing your protein preference in settings.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function MealCard({
  meal,
  onAddProtein,
}: {
  meal: WorkoutMeal;
  onAddProtein: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  const categoryColor =
    meal.category === "veg"
      ? "bg-green-500/20 text-green-400 border-green-500/30"
      : meal.category === "vegan"
      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      : "bg-red-500/20 text-red-400 border-red-500/30";

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-sm">{meal.name}</CardTitle>
            <CardDescription className="text-xs mt-1">
              {meal.description}
            </CardDescription>
          </div>
          <span
            className={`text-xs px-2 py-0.5 rounded-full border shrink-0 ${categoryColor}`}
          >
            {meal.category}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="font-bold text-primary text-sm">{meal.protein}g</span>{" "}
            protein
          </span>
          <span className="flex items-center gap-1">
            <Flame className="w-3 h-3" />
            {meal.calories} cal
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {meal.timing}
          </span>
        </div>

        {expanded && (
          <div className="space-y-3 pt-2 border-t border-border">
            <div>
              <p className="text-xs font-semibold mb-1">Ingredients</p>
              <ul className="space-y-0.5">
                {meal.ingredients.map((ing, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <span className="text-primary">&#8226;</span>
                    {ing}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold mb-1">Benefits</p>
              <div className="flex flex-wrap gap-1.5">
                {meal.benefits.map((b, i) => (
                  <Badge key={i} variant="secondary" className="text-xs font-normal">
                    {b}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Less" : "Details"}
          </Button>
          <Button size="sm" onClick={onAddProtein}>
            <Plus className="w-3 h-3 mr-1" />
            Log {meal.protein}g
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
