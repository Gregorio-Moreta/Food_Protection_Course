export type CheatSection = {
  id: string;
  title: string;
  lesson: number;
  module: string;
  rows: { label: string; value: string; note?: string }[];
};

// Module ids match data/lessons/index.ts
export const cheatSections: CheatSection[] = [
  {
    id: "temps-core", title: "Core temperatures", lesson: 2, module: "m1",
    rows: [
      { label: "Cold holding", value: "41°F or below" },
      { label: "Hot holding", value: "140°F or above" },
      { label: "Temperature danger zone", value: "41°F to 140°F" },
      { label: "Frozen storage", value: "0°F or below" },
      { label: "Smoked fish", value: "38°F or below" },
      { label: "Shell eggs, ambient", value: "45°F" },
      { label: "Fresh fish on receipt", value: "32°F to 41°F, on ice" },
      { label: "Dry storage", value: "70°F or less, humidity 50% or less" },
    ],
  },
  {
    id: "thermometers", title: "Thermometers", lesson: 2, module: "m1",
    rows: [
      { label: "Boiling point calibration", value: "212°F" },
      { label: "Ice point calibration", value: "32°F (50/50 slush)" },
      { label: "Accuracy required", value: "Plus or minus 2°F" },
      { label: "Probe placement", value: "Thickest part or center, wait about 15 seconds" },
      { label: "Bi-metallic stem range", value: "0°F to 220°F" },
    ],
  },
  {
    id: "receiving", title: "Receiving", lesson: 2, module: "m1",
    rows: [
      { label: "Fresh meat, poultry, dairy", value: "41°F or below" },
      { label: "Frozen food", value: "0°F or below, no signs of thaw and refreeze" },
      { label: "Shellfish tags", value: "Keep with product, then 90 days after use" },
      { label: "Pasteurized milk expiry", value: "9 calendar days from pasteurization" },
      { label: "Ultra-pasteurized expiry", value: "45 days" },
      { label: "Cans", value: "Reject: dented seams, rust, leaks, swollen ends" },
      { label: "Never receive", value: "Home canned or home prepared food" },
      { label: "USDA stamp", value: "Inspection stamp matters, grade stamp is only quality" },
    ],
  },
  {
    id: "storage", title: "Storage", lesson: 3, module: "m1",
    rows: [
      { label: "Rotation", value: "FIFO, date everything" },
      { label: "Off the floor", value: "At least 6 inches" },
      { label: "Raw vs cooked", value: "Raw below and away from cooked" },
      { label: "Refreezing", value: "Never" },
      { label: "Cooling hot food", value: "Never in the freezer" },
      { label: "Prohibited containers", value: "Copper, brass, tin, galvanized" },
      { label: "Chemicals", value: "Never in food storage areas" },
    ],
  },
  {
    id: "inspections", title: "Inspections and grades", lesson: 1, module: "m1",
    rows: [
      { label: "Grade A", value: "0 to 13 points" },
      { label: "Grade B", value: "14 to 27 points" },
      { label: "Grade C", value: "28 or more points" },
      { label: "Hot holding violation", value: "7 points (41°F to 140°F)" },
      { label: "Grade card", value: "Within 5 feet of entrance, 4 to 6 feet off the ground" },
      { label: "Announced inspection", value: "Only the pre-permit inspection" },
      { label: "Closure triggers", value: "No permit, 3 failed inspections, hazards, obstruction" },
      { label: "Certificate holder", value: "On premises during all hours of operation" },
      { label: "Final exam", value: "50 questions, 1 hour, 70% to pass" },
    ],
  },
  {
    id: "hazards", title: "Hazards and allergens", lesson: 4, module: "m2",
    rows: [
      { label: "Three hazards", value: "Physical, chemical, biological" },
      { label: "Major allergens", value: "Fish, Peanuts, Wheat, Soy, Tree nuts, Eggs, Milk, Shellfish", note: "Food Problems Will Send The EMS" },
      { label: "Sulfites", value: "Cannot be added in a food service establishment" },
      { label: "MSG", value: "Allowed in moderation, disclose on menu" },
      { label: "Toxins that survive cooking", value: "Ciguatoxin, histamine" },
    ],
  },
  {
    id: "growth", title: "Bacterial growth", lesson: 5, module: "m2",
    rows: [
      { label: "FATTOM", value: "Food, Acidity, Temperature, Time, Oxygen, Moisture" },
      { label: "Doubling time", value: "Every 20 to 30 minutes" },
      { label: "Too acidic to grow", value: "pH 4.6 or below" },
      { label: "Too dry to grow", value: "Water activity 0.85 or less" },
      { label: "Pasteurization", value: "145°F for 30 min, or 161°F for 15 sec" },
      { label: "Most popular sanitizer", value: "Chlorine" },
      { label: "Cold and freezing", value: "Slow or stop growth, do not kill" },
    ],
  },
  {
    id: "other-micro", title: "Other microorganisms", lesson: 6, module: "m2",
    rows: [
      { label: "Viruses", value: "Cannot multiply in food. Hepatitis A, Norovirus" },
      { label: "Parasites", value: "Trichinella (pork), Anisakis (fish)" },
      { label: "Raw fish freezing", value: "Minus 31°F for 15 hours" },
      { label: "Molds", value: "Grow in refrigerators, reproduce by spores" },
      { label: "Yeasts", value: "Need air, reproduce by budding" },
    ],
  },
  {
    id: "illness-onset", title: "Illness onset times", lesson: 7, module: "m2",
    rows: [
      { label: "Infection", value: "6 to 48 hours" },
      { label: "Intoxication", value: "Within 6 hours, toxins survive heat" },
      { label: "Staph aureus", value: "1 to 6 hours" },
      { label: "Salmonella", value: "6 to 48 hours" },
      { label: "Botulism", value: "12 to 36 hours" },
      { label: "E. coli O157:H7", value: "12 to 72 hours" },
      { label: "Norovirus", value: "24 to 48 hours" },
      { label: "Hepatitis A", value: "15 to 50 days" },
      { label: "Trichinosis", value: "4 to 28 days" },
    ],
  },
  {
    id: "cooking", title: "Cooking temperatures (15 seconds)", lesson: 8, module: "m3",
    rows: [
      { label: "Poultry, stuffing, stuffed meat", value: "165°F" },
      { label: "Ground meat", value: "158°F" },
      { label: "Pork", value: "150°F" },
      { label: "Shell eggs", value: "145°F" },
      { label: "Other meat and fish", value: "140°F" },
      { label: "Microwave", value: "Add 25°F, stand 2 minutes" },
      { label: "Microwave reheat", value: "190°F, covered, stand 2 minutes" },
    ],
  },
  {
    id: "cooling-reheating", title: "Cooling, reheating, holding", lesson: 8, module: "m3",
    rows: [
      { label: "Cooling stage 1", value: "140°F to 70°F in 2 hours" },
      { label: "Cooling stage 2", value: "70°F to 41°F in 4 more hours" },
      { label: "Hour 1 checkpoint", value: "90°F or lower" },
      { label: "Pan depth", value: "4 inches max, food 1 to 2 inches" },
      { label: "Large meat pieces", value: "6 pounds or less" },
      { label: "Reheating", value: "165°F for 15 seconds within 2 hours, then 140°F" },
      { label: "Time as public health control, hot", value: "4 hours, then serve or discard" },
      { label: "Time as public health control, cold", value: "4 hours, check under 70°F, 2 more hours" },
      { label: "Thawing under water", value: "No more than 2 hours, cold running" },
    ],
  },
  {
    id: "hygiene", title: "Hygiene", lesson: 9, module: "m3",
    rows: [
      { label: "Hand washing", value: "20 seconds, hot and cold water, soap" },
      { label: "Five steps", value: "Water, soap, rub, rinse, dry" },
      { label: "Hand sink distance", value: "Within 25 feet of prep, service, ware washing" },
      { label: "Jewelry", value: "Plain wedding band only" },
      { label: "Hand sanitizer", value: "Never instead of washing" },
    ],
  },
  {
    id: "sanitizing", title: "Cleaning and sanitizing", lesson: 10, module: "m4",
    rows: [
      { label: "Wash compartment", value: "110°F to 120°F" },
      { label: "Hot water sanitize", value: "170°F for 30 seconds" },
      { label: "Chlorine sanitize", value: "50 ppm, 75°F or warmer, at least 1 minute" },
      { label: "High temp dishwasher rinse", value: "170°F to 195°F" },
      { label: "Low temp dishwasher", value: "50 ppm, rinse 75°F to 140°F" },
      { label: "Fixed equipment", value: "100 ppm (1 oz bleach per gallon)" },
      { label: "Wiping cloth bucket", value: "50 ppm (1/2 oz per gallon), change every 2 hours" },
      { label: "Hot water for mechanical wash", value: "140°F to 165°F, sanitize at 180°F" },
      { label: "Hand wash water", value: "No more than 115°F" },
      { label: "Patron toilets", value: "More than 19 seats" },
    ],
  },
  {
    id: "plumbing", title: "Plumbing", lesson: 11, module: "m4",
    rows: [
      { label: "Air gap", value: "Twice the pipe diameter, at least 1 inch. Only fully reliable device" },
      { label: "Air break", value: "Same size rule. Protects equipment from sewage" },
      { label: "Hose faucet", value: "Hose-bib vacuum breaker" },
      { label: "Ice and coffee machines", value: "Atmospheric vacuum breaker" },
      { label: "Soda carbonator", value: "Double-vented check valve" },
      { label: "Grease interceptor", value: "Removes at least 90% of grease" },
    ],
  },
  {
    id: "pests", title: "Pest control", lesson: 12, module: "m4",
    rows: [
      { label: "IPM", value: "Starve, build out, destroy" },
      { label: "Pesticides", value: "Licensed applicator only, no exceptions" },
      { label: "Fly zappers", value: "Prohibited" },
      { label: "Door gaps", value: "Less than 1/8 inch" },
      { label: "Professional visits", value: "At least monthly, DEC licensed" },
      { label: "Window screens", value: "18 mesh" },
      { label: "Tracking powder", value: "Banned" },
      { label: "Most common NYC rodent", value: "Norway rat" },
    ],
  },
  {
    id: "haccp", title: "HACCP", lesson: 13, module: "m5",
    rows: [
      { label: "Steps", value: "1 Hazards, 2 CCPs, 3 Limits, 4 Monitor, 5 Correct, 6 Verify, 7 Records" },
      { label: "Fried chicken CCPs", value: "Cooking, hot holding, cooling, reheating" },
      { label: "Tuna salad CCPs", value: "Preparation, cold holding" },
    ],
  },
  {
    id: "signs-laws", title: "Postings and local laws", lesson: 15, module: "m5",
    rows: [
      { label: "Smoke-Free Air Act", value: "Local Law 47. Fines $200 to $400, $500 to $1,000, $1,000 to $2,000" },
      { label: "Tobacco vending", value: "Taverns only, 25 feet from entrance (Local Law 67)" },
      { label: "Tobacco sales", value: "18 and older, photo ID (Local Law 83)" },
      { label: "CPR equipment", value: "Adult mask, pediatric mask, 2 pairs latex gloves, sign (Local Law 12)" },
      { label: "Trans fat", value: "Less than 0.5 g per serving" },
      { label: "Calorie posting", value: "Chains of 15 or more" },
      { label: "Sodium icon", value: "2,300 mg or more" },
      { label: "Required signs", value: "Choking poster, alcohol and pregnancy, How Are We Doing, hand wash, no smoking" },
    ],
  },
];
