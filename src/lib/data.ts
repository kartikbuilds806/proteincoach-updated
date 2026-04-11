export interface Recipe {
  id: string;
  name: string;
  category: "veg" | "non-veg" | "vegan";
  proteinSource: string;
  protein: number; // grams
  calories: number;
  prepTime: number; // minutes
  cost: number; // INR approx
  servings: number;
  ingredients: string[];
  steps: string[];
  tips: string[];
  tags: string[];
}

export interface Supplement {
  id: string;
  name: string;
  type: string;
  description: string;
  proteinPerServing: number;
  costPerMonth: number; // INR approx
  pros: string[];
  cons: string[];
  whoShouldTake: string[];
  whoShouldNot: string[];
  bestTime: string;
  rating: number;
}

export interface WorkoutMeal {
  id: string;
  name: string;
  type: "pre-workout" | "post-workout";
  description: string;
  protein: number;
  calories: number;
  timing: string;
  ingredients: string[];
  benefits: string[];
  category: "veg" | "non-veg" | "vegan";
}

export interface UserProfile {
  name: string;
  age: number;
  weight: number; // kg
  targetWeight: number; // kg
  height: number; // cm
  goal: "fit" | "bulking" | "losing" | "muscle";
  budget: "low" | "medium" | "high";
  workoutRoutine: "beginner" | "intermediate" | "advanced";
  proteinPreference: "all" | "veg" | "non-veg" | "vegan";
  dailyProteinGoal: number; // grams
  proteinConsumedToday: number;
}

export const recipes: Recipe[] = [
  {
    id: "r1",
    name: "Spicy Soya Chunk Stir Fry",
    category: "veg",
    proteinSource: "Soya Chunks",
    protein: 52,
    calories: 340,
    prepTime: 15,
    cost: 40,
    servings: 2,
    ingredients: [
      "1 cup soya chunks",
      "1 onion, sliced",
      "2 green chilies",
      "1 tsp ginger-garlic paste",
      "1/2 tsp turmeric",
      "1 tsp red chili powder",
      "1 tsp garam masala",
      "Salt to taste",
      "1 tbsp oil",
      "Fresh coriander",
    ],
    steps: [
      "Boil soya chunks in salted water for 5 min, squeeze out water",
      "Heat oil, add onions and green chilies, saute 2 min",
      "Add ginger-garlic paste, cook 1 min",
      "Add spices: turmeric, red chili, garam masala",
      "Toss in soya chunks, stir fry on high heat 3-4 min",
      "Garnish with coriander and serve hot",
    ],
    tips: [
      "Squeeze soya chunks well to remove excess water",
      "High heat gives a nice char and better texture",
      "Add lemon juice for extra tang",
    ],
    tags: ["budget", "quick", "high-protein", "spicy"],
  },
  {
    id: "r2",
    name: "Butter Paneer Bhurji",
    category: "veg",
    proteinSource: "Paneer",
    protein: 36,
    calories: 420,
    prepTime: 12,
    cost: 80,
    servings: 2,
    ingredients: [
      "200g paneer, crumbled",
      "1 onion, finely chopped",
      "2 tomatoes, chopped",
      "1 tsp butter",
      "1/2 tsp cumin seeds",
      "1 tsp red chili powder",
      "1/2 tsp turmeric",
      "Salt to taste",
      "Fresh coriander",
    ],
    steps: [
      "Heat butter, add cumin seeds until they splutter",
      "Add onions, saute until golden",
      "Add tomatoes, cook until soft",
      "Add spices and mix well",
      "Add crumbled paneer, stir for 3-4 minutes",
      "Garnish with coriander, serve with roti",
    ],
    tips: [
      "Don't overcook paneer - it gets rubbery",
      "Add cream for extra richness",
      "Great with whole wheat roti for muscle gain",
    ],
    tags: ["medium-budget", "quick", "high-protein", "tasty"],
  },
  {
    id: "r3",
    name: "Chicken Breast Tikka",
    category: "non-veg",
    proteinSource: "Chicken",
    protein: 62,
    calories: 350,
    prepTime: 25,
    cost: 120,
    servings: 2,
    ingredients: [
      "300g chicken breast, cubed",
      "1/2 cup yogurt",
      "1 tbsp tikka masala",
      "1 tsp red chili powder",
      "1 tsp ginger-garlic paste",
      "1/2 tsp turmeric",
      "1 tbsp lemon juice",
      "Salt to taste",
      "1 tbsp oil",
    ],
    steps: [
      "Marinate chicken with yogurt, spices, lemon for 15 min",
      "Heat a pan or grill on high heat",
      "Cook chicken pieces 4-5 min each side",
      "Ensure internal temp is cooked through",
      "Serve with mint chutney and salad",
    ],
    tips: [
      "Marinate overnight for best flavor",
      "Don't overcook - chicken breast dries out fast",
      "Pair with brown rice for a complete meal",
    ],
    tags: ["high-protein", "gym-favorite", "tasty"],
  },
  {
    id: "r4",
    name: "Egg White Omelette with Veggies",
    category: "non-veg",
    proteinSource: "Eggs",
    protein: 30,
    calories: 180,
    prepTime: 8,
    cost: 30,
    servings: 1,
    ingredients: [
      "5 egg whites",
      "1 whole egg",
      "1/4 cup bell peppers, diced",
      "1/4 cup onions, diced",
      "Handful spinach",
      "Salt and pepper",
      "1 tsp oil or butter",
    ],
    steps: [
      "Whisk egg whites and whole egg together",
      "Heat oil in non-stick pan",
      "Add veggies, saute 1 min",
      "Pour egg mixture over veggies",
      "Cook on medium heat 2-3 min, flip, cook 1 min more",
      "Serve with whole wheat toast",
    ],
    tips: [
      "Adding 1 whole egg gives better flavor and healthy fats",
      "Don't skip spinach - adds iron and vitamins",
      "Perfect post-workout breakfast",
    ],
    tags: ["budget", "quick", "high-protein", "breakfast"],
  },
  {
    id: "r5",
    name: "Moong Dal Chilla (Protein Crepes)",
    category: "vegan",
    proteinSource: "Moong Dal",
    protein: 28,
    calories: 250,
    prepTime: 20,
    cost: 25,
    servings: 2,
    ingredients: [
      "1 cup moong dal, soaked 4 hours",
      "1 green chili",
      "1/2 inch ginger",
      "1/4 cup onion, finely chopped",
      "Salt to taste",
      "1/4 tsp turmeric",
      "Water as needed",
      "1 tsp oil per chilla",
    ],
    steps: [
      "Grind soaked dal with ginger, chili into smooth batter",
      "Add salt, turmeric, mix well - batter should be pourable",
      "Heat a non-stick pan, pour batter like a dosa",
      "Add chopped onions on top",
      "Cook 2 min, flip, cook 1 min more",
      "Serve with green chutney",
    ],
    tips: [
      "Soak dal for at least 4 hours for smooth batter",
      "Add grated paneer for extra protein",
      "Great for breakfast or snack",
    ],
    tags: ["budget", "vegan", "high-protein", "breakfast"],
  },
  {
    id: "r6",
    name: "Grilled Fish with Lemon Herb",
    category: "non-veg",
    proteinSource: "Fish",
    protein: 45,
    calories: 280,
    prepTime: 18,
    cost: 150,
    servings: 2,
    ingredients: [
      "2 fish fillets (rohu/basa)",
      "2 tbsp lemon juice",
      "1 tsp garlic powder",
      "1 tsp dried herbs (oregano/thyme)",
      "Salt and pepper",
      "1 tbsp olive oil",
      "Lemon wedges for serving",
    ],
    steps: [
      "Pat fish dry, season with salt, pepper, garlic powder",
      "Drizzle lemon juice and olive oil",
      "Sprinkle dried herbs evenly",
      "Grill or pan-sear 4 min each side",
      "Serve with lemon wedges and salad",
    ],
    tips: [
      "Fish should flake easily when done",
      "Don't move fish too much while cooking",
      "Omega-3 in fish is great for recovery",
    ],
    tags: ["high-protein", "healthy", "omega-3"],
  },
  {
    id: "r7",
    name: "Tofu Scramble Power Bowl",
    category: "vegan",
    proteinSource: "Tofu",
    protein: 32,
    calories: 300,
    prepTime: 12,
    cost: 60,
    servings: 2,
    ingredients: [
      "200g firm tofu, crumbled",
      "1/2 cup black beans",
      "1/2 cup bell peppers",
      "1 tsp turmeric",
      "1 tsp cumin powder",
      "1/2 tsp black salt (kala namak)",
      "Spinach handful",
      "1 tbsp oil",
    ],
    steps: [
      "Heat oil, crumble tofu into the pan",
      "Add turmeric, cumin, black salt - stir well",
      "Add bell peppers, cook 2 min",
      "Add black beans and spinach",
      "Cook 3-4 min until heated through",
      "Serve in a bowl with avocado or toast",
    ],
    tips: [
      "Black salt gives an eggy flavor",
      "Press tofu before cooking to remove water",
      "Add nutritional yeast for extra B12",
    ],
    tags: ["vegan", "high-protein", "quick", "breakfast"],
  },
  {
    id: "r8",
    name: "Chickpea Salad Bowl",
    category: "vegan",
    proteinSource: "Chickpeas",
    protein: 26,
    calories: 320,
    prepTime: 10,
    cost: 35,
    servings: 2,
    ingredients: [
      "1 can chickpeas (400g), drained",
      "1 cucumber, diced",
      "1 tomato, diced",
      "1/2 onion, finely sliced",
      "1 tbsp olive oil",
      "1 tbsp lemon juice",
      "1 tsp cumin powder",
      "Salt, pepper, chaat masala",
      "Fresh coriander",
    ],
    steps: [
      "Drain and rinse chickpeas",
      "Combine all chopped veggies in a bowl",
      "Add chickpeas and toss",
      "Dress with olive oil, lemon juice, cumin",
      "Season with salt, pepper, chaat masala",
      "Garnish with coriander and serve",
    ],
    tips: [
      "Roast chickpeas in oven for crunchy texture",
      "Add boiled eggs for non-veg protein boost",
      "Great meal prep option - lasts 2 days in fridge",
    ],
    tags: ["budget", "quick", "vegan", "no-cook"],
  },
  {
    id: "r9",
    name: "Keema Matar (Minced Chicken with Peas)",
    category: "non-veg",
    proteinSource: "Chicken Mince",
    protein: 48,
    calories: 380,
    prepTime: 20,
    cost: 100,
    servings: 2,
    ingredients: [
      "250g chicken mince",
      "1/2 cup green peas",
      "1 onion, finely chopped",
      "2 tomatoes, pureed",
      "1 tsp ginger-garlic paste",
      "1 tsp cumin powder",
      "1 tsp coriander powder",
      "1/2 tsp garam masala",
      "1 tbsp oil",
      "Salt to taste",
    ],
    steps: [
      "Heat oil, saute onions until golden",
      "Add ginger-garlic paste, cook 1 min",
      "Add chicken mince, break up and cook 5 min",
      "Add tomato puree and spices",
      "Cook 5 min, add peas",
      "Simmer 5 min until peas are tender",
      "Garnish with coriander, serve with roti",
    ],
    tips: [
      "Break mince well for even cooking",
      "Add a splash of cream for richness",
      "Freezes well for meal prep",
    ],
    tags: ["high-protein", "tasty", "meal-prep"],
  },
  {
    id: "r10",
    name: "Peanut Butter Protein Smoothie",
    category: "veg",
    proteinSource: "Peanut Butter + Milk",
    protein: 28,
    calories: 380,
    prepTime: 5,
    cost: 45,
    servings: 1,
    ingredients: [
      "2 tbsp peanut butter",
      "1 banana",
      "1 cup milk",
      "1 tbsp honey",
      "1 tbsp oats",
      "Ice cubes",
    ],
    steps: [
      "Add all ingredients to a blender",
      "Blend until smooth",
      "Pour into a glass, serve immediately",
    ],
    tips: [
      "Use natural peanut butter without added sugar",
      "Add a scoop of protein powder for 50g+ protein",
      "Freeze banana for thicker smoothie",
    ],
    tags: ["quick", "budget", "smoothie", "post-workout"],
  },
  {
    id: "r11",
    name: "Dal Tadka with Brown Rice",
    category: "vegan",
    proteinSource: "Toor Dal",
    protein: 24,
    calories: 400,
    prepTime: 25,
    cost: 30,
    servings: 2,
    ingredients: [
      "1 cup toor dal",
      "1/2 tsp turmeric",
      "Salt to taste",
      "2 tbsp ghee/oil",
      "1 tsp cumin seeds",
      "2 dried red chilies",
      "4 garlic cloves, sliced",
      "1 onion, sliced",
      "1 tomato, chopped",
      "1 cup cooked brown rice",
    ],
    steps: [
      "Pressure cook dal with turmeric and salt - 3 whistles",
      "Heat ghee, add cumin, red chilies, garlic",
      "Add onions, cook until golden",
      "Add tomatoes, cook 2 min",
      "Pour tadka into cooked dal, mix well",
      "Serve hot with brown rice",
    ],
    tips: [
      "Brown rice has more fiber than white rice",
      "Add spinach to dal for iron boost",
      "Classic Indian muscle-building meal",
    ],
    tags: ["budget", "vegan", "staple", "high-protein"],
  },
  {
    id: "r12",
    name: "Paneer Tikka Wrap",
    category: "veg",
    proteinSource: "Paneer",
    protein: 34,
    calories: 450,
    prepTime: 20,
    cost: 90,
    servings: 2,
    ingredients: [
      "200g paneer, cubed",
      "2 whole wheat tortillas/roti",
      "1/2 cup yogurt",
      "1 tbsp tikka masala",
      "1/2 cup bell peppers",
      "1/2 cup onions, sliced",
      "Lettuce leaves",
      "Mint chutney",
    ],
    steps: [
      "Marinate paneer in yogurt and tikka masala 10 min",
      "Grill or pan-fry paneer and veggies",
      "Warm the tortillas/roti",
      "Spread mint chutney, add lettuce",
      "Fill with grilled paneer and veggies",
      "Roll tightly and serve",
    ],
    tips: [
      "Grill paneer on high heat for smoky flavor",
      "Add sprouts for extra protein and crunch",
      "Great grab-and-go gym meal",
    ],
    tags: ["medium-budget", "tasty", "portable", "high-protein"],
  },
];

export const supplements: Supplement[] = [
  {
    id: "s1",
    name: "Whey Protein Isolate",
    type: "Protein Powder",
    description:
      "Fast-absorbing protein derived from milk. Best for post-workout recovery. Contains all essential amino acids.",
    proteinPerServing: 25,
    costPerMonth: 2500,
    pros: [
      "Fast absorption - ideal post-workout",
      "Complete amino acid profile",
      "Supports muscle recovery and growth",
      "Easy to mix and consume",
      "Wide variety of flavors available",
    ],
    cons: [
      "Can cause bloating in lactose-intolerant people",
      "Expensive compared to natural protein sources",
      "Some brands have added sugars and fillers",
      "Not suitable for vegans",
      "Dependency if used as primary protein source",
    ],
    whoShouldTake: [
      "People who can't meet protein goals from food alone",
      "Advanced gym-goers with high protein needs (1.5g+/kg)",
      "People with busy schedules needing quick protein",
      "Athletes in intense training phases",
    ],
    whoShouldNot: [
      "People with kidney disease or kidney problems",
      "Lactose intolerant individuals (use isolate or plant-based)",
      "Beginners who can meet goals from food",
      "People under 16 years of age",
      "Pregnant or nursing women (consult doctor first)",
    ],
    bestTime: "Within 30 minutes after workout",
    rating: 4.5,
  },
  {
    id: "s2",
    name: "Creatine Monohydrate",
    type: "Performance",
    description:
      "Most researched supplement in sports nutrition. Increases strength, power, and muscle cell hydration.",
    proteinPerServing: 0,
    costPerMonth: 600,
    pros: [
      "Most researched and proven supplement",
      "Increases strength and power output by 5-15%",
      "Supports muscle hydration and growth",
      "Very affordable",
      "Safe for long-term use",
    ],
    cons: [
      "Initial water retention (1-2 kg)",
      "May cause stomach discomfort if taken without water",
      "Results take 2-4 weeks to show",
      "Non-responders exist (about 20% of people)",
      "Need to stay well hydrated",
    ],
    whoShouldTake: [
      "Anyone doing resistance training regularly",
      "People looking to increase strength",
      "Athletes in power sports",
      "Vegetarians (naturally lower creatine stores)",
    ],
    whoShouldNot: [
      "People with kidney disease",
      "Those under 18 (limited research)",
      "People not drinking enough water daily",
      "Those with liver problems",
    ],
    bestTime: "3-5g daily, any time (consistency matters more)",
    rating: 4.8,
  },
  {
    id: "s3",
    name: "BCAA (Branched Chain Amino Acids)",
    type: "Amino Acids",
    description:
      "Three essential amino acids (leucine, isoleucine, valine) that support muscle protein synthesis.",
    proteinPerServing: 7,
    costPerMonth: 1200,
    pros: [
      "Reduces muscle soreness after workout",
      "Can be consumed during workout",
      "Helps preserve muscle during cutting",
      "Good taste - encourages hydration",
      "Low calorie",
    ],
    cons: [
      "Expensive for what it provides",
      "Not necessary if protein intake is adequate",
      "Less effective than complete protein sources",
      "Many products have artificial sweeteners",
      "Limited benefit for those eating enough protein",
    ],
    whoShouldTake: [
      "People training fasted (morning workouts)",
      "Those in aggressive calorie deficit",
      "Endurance athletes with long sessions",
      "People who struggle to eat enough protein",
    ],
    whoShouldNot: [
      "People already meeting daily protein goals",
      "Those on a tight budget (whey protein is better value)",
      "People with maple syrup urine disease",
      "Beginners with normal protein intake",
    ],
    bestTime: "During or immediately after workout",
    rating: 3.5,
  },
  {
    id: "s4",
    name: "Plant-Based Protein (Pea + Rice)",
    type: "Protein Powder",
    description:
      "Vegan-friendly protein blend combining pea and rice protein for a complete amino acid profile.",
    proteinPerServing: 22,
    costPerMonth: 2000,
    pros: [
      "100% vegan and plant-based",
      "No lactose or dairy allergens",
      "Complete amino acid profile when blended",
      "Easy to digest",
      "Sustainable and environmentally friendly",
    ],
    cons: [
      "Slightly lower leucine than whey",
      "Can have earthy or chalky taste",
      "May need larger serving for same protein",
      "Some brands have high heavy metal content",
      "More expensive than basic whey",
    ],
    whoShouldTake: [
      "Vegans and vegetarians",
      "Lactose intolerant individuals",
      "People with dairy allergies",
      "Those who prefer plant-based nutrition",
    ],
    whoShouldNot: [
      "People allergic to peas or legumes",
      "Those who prefer taste (whey tastes better generally)",
      "People with soy allergies (check label)",
    ],
    bestTime: "Post-workout or as a meal replacement shake",
    rating: 4.0,
  },
  {
    id: "s5",
    name: "Fish Oil (Omega-3)",
    type: "Health & Recovery",
    description:
      "Essential fatty acids EPA and DHA that support heart health, reduce inflammation, and aid recovery.",
    proteinPerServing: 0,
    costPerMonth: 500,
    pros: [
      "Reduces exercise-induced inflammation",
      "Supports heart and brain health",
      "Improves joint mobility",
      "Can improve body composition",
      "Affordable and widely available",
    ],
    cons: [
      "Fishy burps if low quality",
      "Can thin blood (caution with blood thinners)",
      "Takes weeks to show effects",
      "Quality varies greatly between brands",
      "Vegans need algae-based alternative",
    ],
    whoShouldTake: [
      "Anyone not eating fish 2-3 times per week",
      "People with joint pain or inflammation",
      "Those in intense training programs",
      "People focused on overall health",
    ],
    whoShouldNot: [
      "People on blood-thinning medication (consult doctor)",
      "Those allergic to fish",
      "People already eating fish regularly",
      "Those with fish oil allergy",
    ],
    bestTime: "With a meal containing fat for better absorption",
    rating: 4.3,
  },
  {
    id: "s6",
    name: "Multivitamin for Athletes",
    type: "Vitamins & Minerals",
    description:
      "Comprehensive vitamin and mineral formula designed for active individuals with higher micronutrient needs.",
    proteinPerServing: 0,
    costPerMonth: 400,
    pros: [
      "Fills nutritional gaps in diet",
      "Supports immune function during training",
      "Improves energy and recovery",
      "Convenient one-pill solution",
      "Affordable insurance policy for health",
    ],
    cons: [
      "Not a substitute for a balanced diet",
      "Some nutrients may not absorb well together",
      "Can cause nausea if taken on empty stomach",
      "Expensive brands not necessarily better",
      "Excess water-soluble vitamins are simply excreted",
    ],
    whoShouldTake: [
      "People in caloric deficit (cutting phase)",
      "Those with limited diet variety",
      "Athletes with high training volume",
      "Vegetarians (often lack B12, iron, zinc)",
    ],
    whoShouldNot: [
      "People already eating a varied, balanced diet",
      "Those taking specific vitamin supplements already",
      "People with conditions affected by certain vitamins (consult doctor)",
    ],
    bestTime: "With breakfast for best absorption",
    rating: 4.0,
  },
  {
    id: "s7",
    name: "Pre-Workout (Caffeine Based)",
    type: "Performance",
    description:
      "Energy and focus blend typically containing caffeine, beta-alanine, and citrulline for enhanced workout performance.",
    proteinPerServing: 0,
    costPerMonth: 1500,
    pros: [
      "Increases energy and focus for intense workouts",
      "Improves endurance and power output",
      "Can help push through plateaus",
      "Better mind-muscle connection",
      "Measurable performance improvement",
    ],
    cons: [
      "Can cause jitters and anxiety",
      "Sleep disruption if taken late",
      "Tolerance builds up quickly",
      "Some contain proprietary blends (hidden doses)",
      "Crash after effects wear off",
      "Can increase heart rate and blood pressure",
    ],
    whoShouldTake: [
      "Experienced lifters hitting plateaus",
      "People training early morning who need energy",
      "Those with 6+ months gym experience",
      "People who tolerate caffeine well",
    ],
    whoShouldNot: [
      "People sensitive to caffeine",
      "Those with heart conditions or high blood pressure",
      "Beginners (build natural work capacity first)",
      "People under 18",
      "Those who train in the evening (sleep disruption)",
      "Pregnant or nursing women",
    ],
    bestTime: "20-30 minutes before workout",
    rating: 3.8,
  },
  {
    id: "s8",
    name: "Glutamine",
    type: "Amino Acids",
    description:
      "Most abundant amino acid in the body. Supports gut health, immune function, and muscle recovery.",
    proteinPerServing: 5,
    costPerMonth: 800,
    pros: [
      "Supports immune system during heavy training",
      "Aids gut health and digestion",
      "May reduce muscle soreness",
      "Helps with recovery during overtraining",
      "No significant side effects",
    ],
    cons: [
      "Limited evidence for muscle-building benefits",
      "Body produces it naturally in adequate amounts",
      "Better alternatives exist for the price",
      "Effects are subtle and hard to notice",
      "Not essential if protein intake is adequate",
    ],
    whoShouldTake: [
      "People in extreme training phases (2+ hours daily)",
      "Those with digestive issues",
      "People frequently getting sick during training",
      "Athletes in competition prep",
    ],
    whoShouldNot: [
      "Casual gym-goers",
      "People with adequate protein intake",
      "Those on a tight budget",
      "Beginners",
    ],
    bestTime: "Post-workout or before bed",
    rating: 3.2,
  },
];

export const workoutMeals: WorkoutMeal[] = [
  {
    id: "wm1",
    name: "Banana + Peanut Butter Toast",
    type: "pre-workout",
    description:
      "Quick energy from banana carbs + sustained energy from peanut butter fats and protein.",
    protein: 10,
    calories: 280,
    timing: "30-45 minutes before workout",
    ingredients: [
      "1 banana",
      "2 tbsp peanut butter",
      "1 slice whole wheat bread",
    ],
    benefits: [
      "Quick and sustained energy",
      "Easy to digest",
      "Good carb-protein balance",
      "No bloating during workout",
    ],
    category: "veg",
  },
  {
    id: "wm2",
    name: "Oats with Whey Protein",
    type: "pre-workout",
    description:
      "Slow-release carbs from oats combined with fast-absorbing whey protein for sustained energy.",
    protein: 30,
    calories: 350,
    timing: "45-60 minutes before workout",
    ingredients: [
      "1/2 cup oats",
      "1 scoop whey protein",
      "1 cup milk or water",
      "Honey (optional)",
    ],
    benefits: [
      "Sustained energy throughout workout",
      "High protein for muscle preservation",
      "Prevents muscle breakdown during training",
      "Keeps you full without heaviness",
    ],
    category: "veg",
  },
  {
    id: "wm3",
    name: "Black Coffee + Boiled Eggs",
    type: "pre-workout",
    description:
      "Natural caffeine boost with clean protein. The ultimate simple pre-workout combo.",
    protein: 18,
    calories: 160,
    timing: "30 minutes before workout",
    ingredients: [
      "1 cup black coffee",
      "3 boiled eggs (2 whole + 1 white)",
    ],
    benefits: [
      "Natural caffeine for energy and focus",
      "High-quality protein",
      "Low calorie, high energy",
      "Boosts metabolism",
    ],
    category: "non-veg",
  },
  {
    id: "wm4",
    name: "Sweet Potato + Chicken",
    type: "pre-workout",
    description:
      "Complex carbs from sweet potato with lean chicken protein. Perfect for heavy training days.",
    protein: 35,
    calories: 400,
    timing: "60-90 minutes before workout",
    ingredients: [
      "1 medium sweet potato, boiled",
      "150g grilled chicken breast",
      "Pinch of salt and pepper",
    ],
    benefits: [
      "Complex carbs for long-lasting energy",
      "High protein for muscle support",
      "Rich in vitamins and minerals",
      "Ideal for heavy lifting sessions",
    ],
    category: "non-veg",
  },
  {
    id: "wm5",
    name: "Dates + Almonds Energy Bites",
    type: "pre-workout",
    description:
      "Natural sugar for quick energy + healthy fats and protein from almonds.",
    protein: 8,
    calories: 220,
    timing: "15-20 minutes before workout",
    ingredients: [
      "4-5 dates, pitted",
      "10 almonds",
      "1 tbsp coconut flakes (optional)",
    ],
    benefits: [
      "Instant natural energy",
      "Easy to carry to gym",
      "No preparation needed",
      "Rich in iron and potassium",
    ],
    category: "vegan",
  },
  {
    id: "wm6",
    name: "Protein Shake + Banana",
    type: "post-workout",
    description:
      "Fast-absorbing protein with simple carbs to spike insulin and drive nutrients to muscles.",
    protein: 30,
    calories: 320,
    timing: "Within 30 minutes after workout",
    ingredients: [
      "1 scoop whey/plant protein",
      "1 banana",
      "1 cup milk or water",
      "Ice cubes",
    ],
    benefits: [
      "Fast protein delivery to muscles",
      "Replenishes glycogen stores",
      "Reduces muscle breakdown",
      "Convenient and quick",
    ],
    category: "veg",
  },
  {
    id: "wm7",
    name: "Chicken Breast + Rice",
    type: "post-workout",
    description:
      "The classic bodybuilder post-workout meal. High protein with carbs for recovery.",
    protein: 45,
    calories: 500,
    timing: "Within 1 hour after workout",
    ingredients: [
      "200g grilled chicken breast",
      "1 cup cooked white/brown rice",
      "Steamed broccoli",
      "Light seasoning",
    ],
    benefits: [
      "Complete protein with all amino acids",
      "Carbs replenish muscle glycogen",
      "Broccoli adds fiber and vitamins",
      "Proven muscle-building combination",
    ],
    category: "non-veg",
  },
  {
    id: "wm8",
    name: "Paneer Bhurji + Roti",
    type: "post-workout",
    description:
      "High protein vegetarian post-workout meal with quality paneer protein and carbs from roti.",
    protein: 32,
    calories: 450,
    timing: "Within 1 hour after workout",
    ingredients: [
      "150g paneer, crumbled",
      "2 whole wheat roti",
      "Onion, tomato, spices",
      "1 tsp butter",
    ],
    benefits: [
      "Rich in casein protein (slow-release)",
      "Good for overnight muscle recovery",
      "Tasty and satisfying",
      "Complete meal in one",
    ],
    category: "veg",
  },
  {
    id: "wm9",
    name: "Soya Chunk Rice Bowl",
    type: "post-workout",
    description:
      "Budget-friendly protein powerhouse. Soya chunks pack 52g protein per 100g dry weight.",
    protein: 40,
    calories: 420,
    timing: "Within 1 hour after workout",
    ingredients: [
      "1 cup soya chunks, cooked",
      "1 cup rice",
      "Soy sauce, veggies",
      "Sesame oil",
    ],
    benefits: [
      "Extremely budget-friendly",
      "Very high protein content",
      "Complete meal",
      "Great for vegetarian bodybuilders",
    ],
    category: "veg",
  },
  {
    id: "wm10",
    name: "Greek Yogurt with Nuts & Honey",
    type: "post-workout",
    description:
      "Protein-rich yogurt with healthy fats from nuts and quick carbs from honey for recovery.",
    protein: 20,
    calories: 300,
    timing: "Within 30 minutes after workout",
    ingredients: [
      "1 cup Greek yogurt",
      "Mixed nuts (almonds, walnuts)",
      "1 tbsp honey",
      "Chia seeds (optional)",
    ],
    benefits: [
      "Casein and whey protein blend",
      "Healthy fats for hormone production",
      "Probiotics for gut health",
      "Quick to prepare",
    ],
    category: "veg",
  },
];

export function calculateDailyProtein(profile: Partial<UserProfile>): number {
  const weight = profile.weight || 70;
  const goal = profile.goal || "fit";

  switch (goal) {
    case "bulking":
      return Math.round(weight * 2.0);
    case "muscle":
      return Math.round(weight * 1.8);
    case "losing":
      return Math.round(weight * 1.6);
    case "fit":
    default:
      return Math.round(weight * 1.4);
  }
}

export function getRecommendedRecipes(profile: Partial<UserProfile>): Recipe[] {
  let filtered = [...recipes];

  if (profile.proteinPreference && profile.proteinPreference !== "all") {
    if (profile.proteinPreference === "veg") {
      filtered = filtered.filter((r) => r.category === "veg" || r.category === "vegan");
    } else if (profile.proteinPreference === "vegan") {
      filtered = filtered.filter((r) => r.category === "vegan");
    } else {
      filtered = filtered.filter((r) => r.category === "non-veg");
    }
  }

  if (profile.budget) {
    if (profile.budget === "low") {
      filtered = filtered.filter((r) => r.cost <= 50);
    } else if (profile.budget === "medium") {
      filtered = filtered.filter((r) => r.cost <= 100);
    }
  }

  return filtered.sort((a, b) => b.protein - a.protein);
}

export function getRecommendedSupplements(
  profile: Partial<UserProfile>
): Supplement[] {
  let filtered = [...supplements];

  if (profile.budget === "low") {
    filtered = filtered.filter((s) => s.costPerMonth <= 800);
  } else if (profile.budget === "medium") {
    filtered = filtered.filter((s) => s.costPerMonth <= 2000);
  }

  if (profile.proteinPreference === "vegan") {
    filtered = filtered.filter(
      (s) => s.id !== "s1" && s.id !== "s5"
    );
  }

  return filtered.sort((a, b) => b.rating - a.rating);
}

export function getWorkoutMeals(
  profile: Partial<UserProfile>,
  type: "pre-workout" | "post-workout"
): WorkoutMeal[] {
  let filtered = workoutMeals.filter((m) => m.type === type);

  if (profile.proteinPreference && profile.proteinPreference !== "all") {
    if (profile.proteinPreference === "veg") {
      filtered = filtered.filter(
        (m) => m.category === "veg" || m.category === "vegan"
      );
    } else if (profile.proteinPreference === "vegan") {
      filtered = filtered.filter((m) => m.category === "vegan");
    }
  }

  return filtered;
}
