"use client";

import { useState } from "react";
import { useUser } from "@/lib/user-context";
import { recipes, Recipe } from "@/lib/data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  IndianRupee,
  Flame,
  ChevronDown,
  ChevronUp,
  Plus,
  Filter,
} from "lucide-react";

export function RecipeBrowser() {
  const { profile, updateProteinConsumed } = useUser();
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"protein" | "time" | "cost">("protein");
  const [expandedRecipe, setExpandedRecipe] = useState<string | null>(null);

  const categories = [
    { value: "all", label: "All" },
    { value: "veg", label: "Veg" },
    { value: "non-veg", label: "Non-Veg" },
    { value: "vegan", label: "Vegan" },
  ];

  let filtered = [...recipes];

  // Apply user preference first
  if (profile?.proteinPreference && profile.proteinPreference !== "all") {
    if (profile.proteinPreference === "veg") {
      filtered = filtered.filter(
        (r) => r.category === "veg" || r.category === "vegan"
      );
    } else if (profile.proteinPreference === "vegan") {
      filtered = filtered.filter((r) => r.category === "vegan");
    } else if (profile.proteinPreference === "non-veg") {
      filtered = filtered.filter((r) => r.category === "non-veg");
    }
  }

  // Then apply manual filter
  if (categoryFilter !== "all") {
    if (categoryFilter === "veg") {
      filtered = filtered.filter(
        (r) => r.category === "veg" || r.category === "vegan"
      );
    } else {
      filtered = filtered.filter((r) => r.category === categoryFilter);
    }
  }

  // Sort
  filtered.sort((a, b) => {
    if (sortBy === "protein") return b.protein - a.protein;
    if (sortBy === "time") return a.prepTime - b.prepTime;
    return a.cost - b.cost;
  });

  const categoryColor = (cat: string) => {
    switch (cat) {
      case "veg":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "non-veg":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "vegan":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card className="py-4">
        <CardContent className="px-4 py-0">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <div className="flex gap-1.5">
                {categories.map((cat) => (
                  <Button
                    key={cat.value}
                    variant={
                      categoryFilter === cat.value ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setCategoryFilter(cat.value)}
                  >
                    {cat.label}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex gap-1.5">
              {(["protein", "time", "cost"] as const).map((s) => (
                <Button
                  key={s}
                  variant={sortBy === s ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy(s)}
                >
                  {s === "protein"
                    ? "High Protein"
                    : s === "time"
                    ? "Quick"
                    : "Budget"}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <p className="text-sm text-muted-foreground">
        {filtered.length} recipes found
      </p>

      {/* Recipe Cards */}
      <div className="space-y-3">
        {filtered.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            expanded={expandedRecipe === recipe.id}
            onToggle={() =>
              setExpandedRecipe(
                expandedRecipe === recipe.id ? null : recipe.id
              )
            }
            categoryColor={categoryColor}
            onAddProtein={() => updateProteinConsumed(recipe.protein)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              No recipes match your filters. Try adjusting them.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function RecipeCard({
  recipe,
  expanded,
  onToggle,
  categoryColor,
  onAddProtein,
}: {
  recipe: Recipe;
  expanded: boolean;
  onToggle: () => void;
  categoryColor: (cat: string) => string;
  onAddProtein: () => void;
}) {
  return (
    <Card className="overflow-hidden">
      <div
        className="p-4 cursor-pointer hover:bg-accent/30 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="font-semibold text-sm">{recipe.name}</h3>
              <span
                className={`text-xs px-2 py-0.5 rounded-full border ${categoryColor(
                  recipe.category
                )}`}
              >
                {recipe.category}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {recipe.proteinSource} &middot; Serves {recipe.servings}
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="font-bold text-primary text-sm">
                  {recipe.protein}g
                </span>{" "}
                protein
              </span>
              <span className="flex items-center gap-1">
                <Flame className="w-3 h-3" />
                {recipe.calories} cal
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {recipe.prepTime} min
              </span>
              <span className="flex items-center gap-1">
                <IndianRupee className="w-3 h-3" />
                {recipe.cost}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onAddProtein();
              }}
              title="Log this meal"
            >
              <Plus className="w-3 h-3 mr-1" />
              Log
            </Button>
            {expanded ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-border px-4 py-4 space-y-4 bg-accent/10">
          <div>
            <h4 className="text-sm font-semibold mb-2">Ingredients</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <span className="text-primary mt-0.5">&#8226;</span>
                  {ing}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2">How to Make</h4>
            <ol className="space-y-1.5">
              {recipe.steps.map((step, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2">Pro Tips</h4>
            <div className="flex flex-wrap gap-2">
              {recipe.tips.map((tip, i) => (
                <Badge key={i} variant="secondary" className="text-xs font-normal">
                  {tip}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {recipe.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
