"use client";

import { useState } from "react";
import { useUser } from "@/lib/user-context";
import { getRecommendedSupplements, Supplement } from "@/lib/data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  UserCheck,
  UserX,
  Clock,
  IndianRupee,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Shield,
} from "lucide-react";

export function SupplementGuide() {
  const { profile } = useUser();
  const [expandedSupplement, setExpandedSupplement] = useState<string | null>(
    null
  );

  if (!profile) return null;

  const recommended = getRecommendedSupplements(profile);

  return (
    <div className="space-y-4">
      {/* Info Banner */}
      <Card className="border-orange-500/30 bg-orange-500/5">
        <CardContent className="px-4 py-3 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-orange-400">
              Important Disclaimer
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Supplements are NOT replacements for real food. Always prioritize
              whole foods first. Consult a doctor before starting any supplement,
              especially if you have medical conditions.
            </p>
          </div>
        </CardContent>
      </Card>

      <p className="text-sm text-muted-foreground">
        Based on your{" "}
        <span className="text-foreground font-medium capitalize">
          {profile.budget}
        </span>{" "}
        budget and{" "}
        <span className="text-foreground font-medium capitalize">
          {profile.workoutRoutine}
        </span>{" "}
        routine, here are our supplement recommendations:
      </p>

      {/* Supplement Cards */}
      <div className="space-y-3">
        {recommended.map((supp) => (
          <SupplementCard
            key={supp.id}
            supplement={supp}
            expanded={expandedSupplement === supp.id}
            onToggle={() =>
              setExpandedSupplement(
                expandedSupplement === supp.id ? null : supp.id
              )
            }
          />
        ))}
      </div>

      {recommended.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              No supplements match your current budget. Consider increasing your
              budget or focusing on whole food protein sources.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function SupplementCard({
  supplement,
  expanded,
  onToggle,
}: {
  supplement: Supplement;
  expanded: boolean;
  onToggle: () => void;
}) {
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(supplement.rating));

  return (
    <Card className="overflow-hidden">
      <div
        className="p-4 cursor-pointer hover:bg-accent/30 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="font-semibold text-sm">{supplement.name}</h3>
              <Badge variant="outline" className="text-xs">
                {supplement.type}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {supplement.description}
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-0.5">
                {stars.map((filled, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      filled
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
                <span className="ml-1">{supplement.rating}</span>
              </span>
              {supplement.proteinPerServing > 0 && (
                <span className="text-primary font-medium">
                  {supplement.proteinPerServing}g protein/serving
                </span>
              )}
              <span className="flex items-center gap-0.5">
                <IndianRupee className="w-3 h-3" />
                {supplement.costPerMonth}/mo
              </span>
            </div>
          </div>
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
          )}
        </div>
      </div>

      {expanded && (
        <div className="border-t border-border px-4 py-4 space-y-4 bg-accent/10">
          {/* Best Time */}
          <div className="flex items-center gap-2 p-2 rounded-lg bg-primary/10 border border-primary/20">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-xs">
              <span className="font-medium">Best Time:</span>{" "}
              {supplement.bestTime}
            </span>
          </div>

          {/* Pros */}
          <div>
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
              <ThumbsUp className="w-4 h-4 text-green-400" />
              Pros
            </h4>
            <ul className="space-y-1">
              {supplement.pros.map((pro, i) => (
                <li
                  key={i}
                  className="text-xs text-muted-foreground flex items-start gap-1.5"
                >
                  <span className="text-green-400 mt-0.5">+</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div>
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
              <ThumbsDown className="w-4 h-4 text-red-400" />
              Cons
            </h4>
            <ul className="space-y-1">
              {supplement.cons.map((con, i) => (
                <li
                  key={i}
                  className="text-xs text-muted-foreground flex items-start gap-1.5"
                >
                  <span className="text-red-400 mt-0.5">-</span>
                  {con}
                </li>
              ))}
            </ul>
          </div>

          {/* Who Should Take */}
          <div>
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-primary" />
              Who Should Take This
            </h4>
            <ul className="space-y-1">
              {supplement.whoShouldTake.map((who, i) => (
                <li
                  key={i}
                  className="text-xs text-muted-foreground flex items-start gap-1.5"
                >
                  <Shield className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                  {who}
                </li>
              ))}
            </ul>
          </div>

          {/* Who Should NOT */}
          <div>
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
              <UserX className="w-4 h-4 text-destructive" />
              Who Should NOT Take This
            </h4>
            <ul className="space-y-1">
              {supplement.whoShouldNot.map((who, i) => (
                <li
                  key={i}
                  className="text-xs text-muted-foreground flex items-start gap-1.5"
                >
                  <AlertTriangle className="w-3 h-3 text-destructive shrink-0 mt-0.5" />
                  {who}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Card>
  );
}
