import { Lesson, p, ul, ol, rule, tip, warn, mnemonic, exam, table, facts, sec, q } from "../types";

export const lesson10: Lesson = {
  n: 10,
  title: "Food Establishment Design",
  blurb: "Equipment, refrigeration, dishwashing and sanitizing methods and concentrations, wiping cloths, cutting boards, hand sinks, toilets and hot water.",
  minutes: 75,
  keyPoints: [
    "Three compartment sink: scrape, wash (110 to 120°F), rinse, sanitize, air dry.",
    "Sanitize with 170°F water for 30 seconds, or 50 ppm chlorine at 75°F or warmer for at least 1 minute.",
    "High temperature dishwasher final rinse: 170°F to 195°F.",
    "Fixed equipment sanitizer: 100 ppm chlorine (1 ounce of bleach per gallon).",
    "Wiping cloth bucket: 50 ppm (1/2 ounce of bleach per gallon), replace at least every 2 hours.",
    "Hand wash water not over 115°F. Patron toilets if more than 19 seats.",
  ],
  sections: [
    sec(
      "equipment-layout",
      "Equipment and layout",
      ul(
        "NSF International standards are recommended for equipment.",
        "Separate areas for raw and finished food reduce cross-contamination. A separate prep sink for washing raw fruits and vegetables is suggested.",
        "Color-code or label cutting boards for specific uses.",
        "Food storage and preparation areas must be separate from sleeping and living areas.",
        "Food on display must be protected by wrapping, sneeze guards, display cases or other effective means.",
        "Frozen dessert scoops belong in dipper wells with running water. Otherwise store dispensing utensils in the food with the handle out.",
        "Do not locate equipment, including ice makers and ice bins, under exposed sewer lines, condensation lines, open stairwells or other sources of contamination.",
        "Mount equipment on wheels where possible. Floor-mounted equipment must be sealed to the floor around the perimeter or raised at least 6 inches on legs. Leave enough space between and behind equipment to clean.",
      ),
    ),
    sec(
      "hot-cold-equipment",
      "Hot holding, reheating and refrigeration equipment",
      ul(
        "Hot holding equipment must keep potentially hazardous food at 140°F or above.",
        "Reheating equipment must raise food to at least 165°F within 2 hours.",
        "Use metal stem-type, numerically scaled thermometers accurate to plus or minus 2°F.",
        "A cooling device that can bring food from 140°F to 41°F within 4 hours is recommended.",
        "Rapid cooling capacity should handle 140°F to 70°F in 2 hours and 70°F to 41°F in 4 hours.",
        "Refrigeration units need numerically scaled thermometers accurate to plus or minus 2°F, with the sensor in the warmest part of the unit measuring air temperature.",
        "Walk-ins need shatterproof light bulbs and condensation lines draining through an air break outside the unit.",
      ),
    ),
    sec(
      "three-comp",
      "Washing dishes: the three compartment sink",
      p("The steps are scrape, pre-rinse, wash, rinse, sanitize, drain."),
      ol(
        "Scrape and pre-rinse all dishes and utensils with warm water from a spray nozzle before food dries on.",
        "Wash in the first compartment with warm water at 110°F to 120°F, good detergent and a brush. Detergent does not sanitize.",
        "Rinse in the second compartment, in clean warm water. Make sure detergent is gone. Change the rinse water often.",
        "Sanitize in the third compartment, with hot water or a chemical sanitizer.",
        "Drain and air dry. Do not towel dry, which recontaminates. Store glasses and cups upside down in a clean dry place.",
      ),
      table(
        ["Sanitizing method", "Requirement"],
        [
          ["Hot water (manual)", "Immerse in a basket for at least 30 seconds in water at least 170°F. Use a booster heater or a burner under the sink to reach 170°F."],
          ["Chlorine (manual)", "Submerge at least 1 minute in solution of at least 50 ppm chlorine at least 75°F. Check with a test kit."],
        ],
      ),
    ),
    sec(
      "machine",
      "Mechanical dishwashers",
      table(
        ["Machine", "Requirement"],
        [
          ["High temperature", "Follow manufacturer specifications. Final rinse must bring dishes to 170°F but must not exceed 195°F, because water vaporizes before sanitizing."],
          ["Low temperature (chemical)", "Chemical is dispensed automatically. Final rinse 75°F to 140°F or per manufacturer. Sanitizer at 50 ppm, checked with a test kit."],
        ],
      ),
      tip("To test, dip a test strip into the final rinse water, then compare the color change with the comparator."),
      p("Chemical sanitizing with a three compartment sink uses warm water of about 75°F with bleach at 50 ppm. Measure it with a test kit."),
    ),
    sec(
      "bar-glasses",
      "Washing bar glasses",
      table(
        ["Method", "How"],
        [
          ["Mechanical dishwasher", "As above."],
          ["Three compartment sink", "Detergent and a stationary brush in compartment 1, rinse in 2, sanitize with sanitizing tablets in 3. Air dry. Test kit to confirm 50 ppm."],
          ["Two compartment sink", "Electric brush with combination detergent sanitizer in compartment 1, same chemical at 50 ppm in compartment 2. Air dry. Test kit to confirm."],
        ],
      ),
    ),
    sec(
      "cloths-fixed",
      "Wiping cloths and fixed equipment",
      ul(
        "Use separate cloths for food contact surfaces (boards, slicers) and non-food contact surfaces (counters, tables).",
        "Between uses, store cloths in a sanitizing solution of 50 ppm. Replace when dirty.",
        "Mix 1/2 ounce of household bleach per gallon of warm water for 50 ppm.",
        "Strength drops fast with frequent use, so change often. When not in use, replace at least every 2 hours.",
      ),
      p("Equipment too heavy to move or too large for a sink is cleaned in place: disconnect from power, remove removable parts and wash, rinse and sanitize them in a sink. Wash remaining food contact surfaces with a cloth and soapy water, rinse and sanitize with 100 ppm chlorine (double the 50 ppm used for dishes), which is about 1 ounce of household bleach per gallon. Air dry and cover the food contact surfaces when not in use."),
      table(
        ["Solution", "Strength", "Mix"],
        [
          ["Dishes, wiping cloths", "50 ppm", "1/2 ounce bleach per gallon"],
          ["Fixed equipment", "100 ppm", "1 ounce bleach per gallon"],
        ],
      ),
    ),
    sec(
      "pots-drying-boards",
      "Pot sinks, drying and cutting boards",
      ul(
        "A two compartment sink can be used for pots and pans, but not for dishes. Dishes require the three step process.",
        "Provide drain boards or easily movable dish tables that meet NSF standards, with separate ones for soiled and clean utensils.",
        "Drain boards should be pitched at least 1/8 inch per foot, drained to a sink, generally 36 to 48 inches long and 30 inches wide.",
        "Cutting boards: food grade plastic or hard wood, non-toxic, no odor or taste transfer. Sand to remove knife marks and gouges. Use color coded boards for raw and cooked. Wash, rinse and sanitize between each use.",
      ),
    ),
    sec(
      "handsinks-toilets",
      "Hand sinks and toilet facilities",
      ul(
        "A separate hand sink with soap, hand drying device or paper towels and a waste receptacle for each food prep area, utensil washing area and toilet room.",
        "No common sink may be used for hand washing and for food or utensils.",
        "Hot and cold running water, preferably tempered with a mixing valve or combination faucet.",
        "Employee toilets are required for every food service establishment. They must be enclosed, with tight fitting, self closing, solid doors, and ventilated with an exhaust fan or window.",
        "Covered garbage container in female or unisex toilets. A hand sink with hot and cold water, liquid soap, paper towels or dryer, and a hand wash sign inside or near the toilet.",
        "Patron toilets are required if there are more than 19 seats. They may be shared with employees, but patrons may never pass through or near food preparation or storage areas to reach them.",
      ),
    ),
    sec(
      "water-heating",
      "Gas water heaters and hot water",
      ul(
        "Gas-fired water heaters produce carbon monoxide, so they must be vented outside with a rigid vent pipe installed at an upward slope.",
        "The flame should burn blue. Test for back draft at the wind diverter, since a severe back draft can blow out the pilot light and cause gas buildup and explosion. A blockage can cause carbon monoxide to build up.",
      ),
      table(
        ["Use", "Water temperature"],
        [
          ["Hand washing", "Not over 115°F"],
          ["Mechanical dishwashing: wash", "140°F to 165°F"],
          ["Mechanical dishwashing: sanitize", "180°F"],
          ["Manual hot water sanitizing", "At least 170°F"],
        ],
      ),
      p("The hot water supply must cover both continuous and peak demand."),
    ),
  ],
  quiz: [
    q("What is the correct order for dishwashing in a three compartment sink?", ["Sanitize, wash, rinse", "Wash, rinse, sanitize, air dry", "Rinse, wash, dry", "Wash, dry, sanitize"], 1, "Scrape and pre-rinse first, then wash, rinse, sanitize and air dry."),
    q("What wash water temperature is recommended in compartment 1?", ["70°F", "110°F to 120°F", "140°F", "170°F"], 1, "Warm water with detergent and a brush."),
    q("Hot water sanitizing requires immersion for at least:", ["10 seconds", "30 seconds at 170°F", "1 minute at 100°F", "2 minutes at 140°F"], 1, "At least 170°F for 30 seconds in a basket."),
    q("Chlorine sanitizing for dishes requires:", ["10 ppm for 10 seconds", "50 ppm at least 75°F for at least 1 minute", "200 ppm for 5 seconds", "100 ppm cold for 1 hour"], 1, "Measure with a test kit."),
    q("Final rinse in a high temperature dishwasher must not exceed:", ["170°F", "180°F", "195°F", "212°F"], 2, "Water vaporizes above 195°F before sanitizing is achieved."),
    q("Fixed equipment food contact surfaces use how much chlorine?", ["25 ppm", "50 ppm", "100 ppm", "500 ppm"], 2, "Double the dish strength. About 1 ounce of bleach per gallon."),
    q("How much household bleach makes 50 ppm in a gallon of water?", ["1/2 ounce", "1 ounce", "1 cup", "1 gallon"], 0, "1/2 ounce per gallon for dishes and cloths. 1 ounce per gallon for 100 ppm."),
    q("How often should a wiping cloth sanitizing solution be replaced when not in use?", ["Every 15 minutes", "At least every 2 hours", "Once a day", "Once a week"], 1, "Strength fades with use."),
    q("A two compartment sink is acceptable for:", ["Washing dishes", "Washing pots and pans", "Hand washing", "Washing vegetables"], 1, "Dishes need three steps and a three compartment sink."),
    q("Toilets for patrons are required when seating is above:", ["10 seats", "19 seats", "50 seats", "100 seats"], 1, "More than 19 seats requires patron toilets."),
    q("Maximum hot water temperature for hand washing is:", ["95°F", "115°F", "140°F", "170°F"], 1, "Keeps hands from being scalded."),
    q("Floor mounted equipment must be sealed to the floor or raised at least how high?", ["1 inch", "3 inches", "6 inches", "12 inches"], 2, "At least 6 inches clearance, for cleaning."),
    q("Which gas does a gas-fired water heater produce that must be vented outside?", ["Nitrogen", "Carbon monoxide", "Carbon dioxide only", "Oxygen"], 1, "Carbon monoxide can be fatal."),
    q("Drain boards should be pitched at least:", ["1/8 inch per foot", "1/2 inch per foot", "1 inch per foot", "No pitch"], 0, "So water drains into the sink."),
    q("Dishes should be dried how?", ["Towel dry", "Air dry", "Wipe on apron", "Heat lamp only"], 1, "Towels re-contaminate."),
    q("What do you use to check chemical sanitizer strength?", ["Smell", "A test kit or test strip", "A thermometer", "A scale"], 1, "Dip the strip and compare the color."),
  ],
};
