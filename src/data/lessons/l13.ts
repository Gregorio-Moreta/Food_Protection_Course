import { Lesson, p, ul, ol, rule, tip, warn, mnemonic, exam, table, facts, sec, q } from "../types";

export const lesson13: Lesson = {
  n: 13,
  title: "HACCP: A Food Protection System",
  blurb: "The seven HACCP steps, frequently found hazards, and food flow charts for fried chicken and tuna salad.",
  minutes: 45,
  keyPoints: [
    "HACCP was pioneered by the Pillsbury Company in the 1960s for the space program.",
    "Seven steps: hazards, critical control points, critical limits, monitor, corrective action, verify, record keeping.",
    "A critical control point is a step where action MUST be taken to prevent, reduce or eliminate a hazard.",
    "Cooking, hot holding, cooling and reheating are critical control points for fried chicken.",
    "Staff must be trained and have written procedures.",
  ],
  sections: [
    sec(
      "what",
      "What HACCP is",
      p("Hazard Analysis Critical Control Point (HACCP) was developed by the Pillsbury Company in the 1960s, when the space program needed safe food for astronauts. It follows food through every step, from raw products arriving to the finished product reaching the customer. By watching each step, you can find problems and prevent them before they occur."),
      table(
        ["Word", "Meaning"],
        [
          ["Hazard", "Any condition in which microorganisms, foreign matter or chemicals contaminate food, or in which microorganisms are allowed to grow or survive."],
          ["Analysis", "Studying a food item to learn what problems are likely and how to prevent them. It covers ingredients, equipment, staff and the people being served."],
          ["Critical Control Point (CCP)", "The step where action must be taken to prevent, reduce or eliminate a hazard. Failure at this point makes the food unfit to eat. CCPs vary with ingredients, method and whether the food is hot or cold."],
        ],
      ),
    ),
    sec(
      "frequent-hazards",
      "Frequently found hazards",
      table(
        ["Problem", "Examples"],
        [
          ["Microorganisms allowed to GROW", "Improper cooling (not 140°F to 70°F in 2 hours and 70°F to 41°F in 4 more). Inadequate hot holding (below 140°F). Inadequate reheating (not to 165°F within 2 hours on a stove or oven)."],
          ["Microorganisms allowed to SURVIVE", "Inadequate cooking. Improper sanitization of dishes, utensils and equipment."],
          ["Contamination by microorganisms, chemicals and foreign matter", "Poor personal hygiene. Ill food workers. Cross-contamination. Contaminated food or ingredients (shellfish from unapproved sources, uninspected meat). Acidic foods in metal containers such as barbecue sauce in galvanized containers."],
        ],
      ),
    ),
    sec(
      "seven-steps",
      "The seven steps",
      ol(
        "Identify hazards and assess their severity and risk. Review recipes, make a flow chart, and find hazards at each step.",
        "Determine critical control points, the steps where action must be taken.",
        "Establish control measures and criteria, also called critical limits. Decide what must be done to prevent, reduce or eliminate each hazard.",
        "Monitor critical control points and record data.",
        "Take corrective action when monitoring shows the criteria are not met.",
        "Verify that the system is working as planned.",
        "Keep records, so managers can review the plan and verify the system.",
      ),
      mnemonic("Hazards, CCPs, Limits, Monitor, Correct, Verify, Record. H C L M C V R."),
    ),
    sec(
      "chicken-flow",
      "Food flow: fried chicken",
      table(
        ["Step", "Hazards", "CCP?", "Criteria and action"],
        [
          ["Receiving", "Unapproved source, Salmonella, wrong temperature", "No", "Inspect source and stamp, 41°F, no foreign matter. Return or discard if it fails."],
          ["Storage", "Not enough refrigeration, wrong temperature, raw over cooked", "No", "Thermometers, date products, FIFO, cooked over raw. If between 41°F and 70°F for more than 2 hours, or at 70°F or higher, discard. If under 2 hours, cool rapidly."],
          ["Preparation", "Too much chicken out at once, contaminated equipment", "No", "Batch preparation, sanitized equipment, 41°F, only what can be processed within 2 hours. Discard if over 41°F more than 2 hours or at 70°F or higher."],
          ["Cooking", "Required temperature not reached, Salmonella survives", "Yes", "Uninterrupted cooking to 165°F, measured at the thickest part. Keep cooking until 165°F."],
          ["Hot holding (same day)", "Not enough equipment, wrong temperature, patron contamination", "Yes", "Food at 140°F. Sneeze guards and utensils. Check every hour. Below 140°F for over 2 hours, discard. Under 2 hours, reheat to 165°F."],
          ["Cooling (leftovers)", "Slow cooling lets organisms grow", "Yes", "140°F to 70°F in 2 hours, then below 41°F in 4 more. Small portions, shallow containers, check hourly, uncovered. Discard if either limit is exceeded."],
          ["Reheating", "Wrong equipment, slow heating", "Yes", "165°F within 2 hours using a stove or oven, check hourly. If under 165°F, continue. Discard if never reheated to 165°F and more than 2 hours have passed."],
        ],
      ),
    ),
    sec(
      "tuna-flow",
      "Food flow: tuna salad",
      table(
        ["Step", "Hazards", "CCP?", "Criteria and action"],
        [
          ["Receiving cans and mayonnaise", "Unapproved source, defective cans, home prepared", "No", "Inspect source, no home canned, check cans for defects. Return or discard."],
          ["Storage", "Under sewer lines", "No", "Keep away from sewer lines. Discard if affected."],
          ["Preparation", "Warm ingredients, bare hands, ill workers, contaminated equipment", "Yes", "No bare hand contact (gloves or utensils), cold food at 41°F or below, pre-chilled ingredients, sanitized equipment, send ill workers home. Discard if between 41°F and 70°F more than 2 hours, or at 70°F or higher, or if bare hands touched it."],
          ["Cold holding (same day)", "Food above 41°F, ineffective refrigeration, patron contamination", "Yes", "Keep at 41°F. Sneeze guards and utensils. Check temperature hourly. Discard if over 41°F more than 2 hours or at 70°F or higher."],
        ],
      ),
      p("A food flow chart and HACCP evaluation can be applied to any potentially hazardous food. CCPs vary with ingredients, method and hot or cold service."),
      exam("For fried chicken, the CCPs are cooking, hot holding, cooling and reheating. For tuna salad, they are preparation and cold holding."),
    ),
    sec(
      "success",
      "Making HACCP work",
      ul(
        "It works when management and staff cooperate.",
        "Health Department inspectors know HACCP and are willing to guide you.",
        "Provide enough appropriate equipment and train workers to use it.",
        "Train staff to identify hazards and give them written procedures to prevent, reduce or eliminate them.",
        "Review procedures periodically and update them when needed.",
      ),
    ),
  ],
  quiz: [
    q("Which company pioneered HACCP?", ["NASA", "The Pillsbury Company", "The FDA", "Kraft"], 1, "In the 1960s for the space program."),
    q("What is a critical control point?", ["Any step in the process", "A step where action must be taken to prevent, reduce or eliminate a hazard", "A temperature log", "The receiving door"], 1, "Failure at a CCP makes food unfit."),
    q("How many steps does HACCP have?", ["3", "5", "7", "10"], 2, "Seven."),
    q("Which is step 1 of HACCP?", ["Record keeping", "Identify hazards and assess risks", "Take corrective action", "Verify"], 1, "Review recipes, flow chart, find hazards."),
    q("Which step is record keeping?", ["First", "Fourth", "Sixth", "Seventh"], 3, "The last step."),
    q("Which fried chicken step is a CCP?", ["Receiving", "Storage", "Cooking", "Preparation"], 2, "Cooking to 165°F is a CCP."),
    q("Which tuna salad step is a CCP?", ["Receiving", "Storage", "Preparation", "Delivery"], 2, "Preparation and cold holding."),
    q("What should be done if hot held food was below 140°F for less than 2 hours?", ["Discard", "Reheat to 165°F", "Serve", "Refrigerate"], 1, "Over 2 hours means discard."),
    q("Corrective action is taken when:", ["Everything is fine", "Monitoring shows criteria are not met", "Annually", "A customer complains only"], 1, "Step 5."),
    q("Which is an example of microorganisms allowed to survive?", ["Inadequate cooking", "Slow cooling", "Poor hygiene", "Cross-contamination"], 0, "Also improper sanitization."),
    q("Which is an example of microorganisms allowed to grow?", ["Improper cooling", "Poor hygiene", "Unapproved source", "Ill worker"], 0, "Inadequate hot holding and inadequate reheating too."),
    q("How often is hot holding temperature checked in the chicken example?", ["Every hour", "Every 4 hours", "Daily", "Never"], 0, "Hourly."),
    q("What must staff have for HACCP to work?", ["Training and written procedures", "A new menu", "More staff", "A larger kitchen"], 0, "And procedures reviewed periodically."),
    q("Storing barbecue sauce in galvanized containers is an example of:", ["Hazard from acid reacting with metal", "Good practice", "Safe storage", "Hot holding"], 0, "Acidic foods must not be stored in galvanized metal."),
  ],
};
