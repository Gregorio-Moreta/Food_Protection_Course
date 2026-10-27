import { Lesson, p, ul, ol, rule, tip, warn, mnemonic, exam, table, facts, sec, q } from "../types";

export const lesson11: Lesson = {
  n: 11,
  title: "Plumbing",
  blurb: "Cross-connections, backflow, air gaps and air breaks, vacuum breakers, indirect waste, sewage backup and grease interceptors.",
  minutes: 45,
  keyPoints: [
    "An air gap is the only completely reliable backflow prevention device.",
    "Air gap and air break distance: twice the pipe diameter, never less than 1 inch.",
    "Air gap protects clean water coming in. Air break protects equipment from waste going out.",
    "Hose-bib vacuum breakers go on faucets with hoses. Atmospheric vacuum breakers go on ice and coffee machines. Double-vented check valves go on soda carbonators.",
    "Sewage in food areas can mean immediate closure.",
  ],
  sections: [
    sec(
      "cross-connection",
      "Protecting the water supply",
      p("Plumbing must be sized and installed to code. A cross-connection is any plumbing connection through which contaminants from drains, sewers or waste pipes could enter the drinking water supply. It is a public health hazard, and outbreaks have been traced to cross-connections."),
      ul(
        "A direct cross-connection links a drinking water system directly to a drain, sewer or non-potable water supply.",
        "Where non-potable water is allowed, for example for air conditioning or fire protection, it must never touch food, potable water, or anything that touches food or utensils.",
        "Non-potable piping must be clearly identified.",
        "Non-potable and sewer pipes are not permitted above food preparation or food storage areas.",
      ),
      table(
        ["Type of backflow", "What happens"],
        [
          ["Back-pressure", "Pressure rises in the non-potable pipes and pushes dirty water into the potable lines."],
          ["Back-siphonage", "Pressure drops on the potable lines and dirty water is sucked in."],
        ],
      ),
    ),
    sec(
      "backflow-devices",
      "Backflow prevention devices",
      rule("An air gap is the only completely reliable backflow prevention device. It is an unobstructed vertical space through the air between the end of a potable water inlet and the flood level rim of a possibly contaminated source. It must be at least twice the diameter of the inlet pipe, and never less than 1 inch."),
      p("On a culinary sink, the air gap is simply the distance from the faucet end to the sink's flood-level rim. When there is no air gap, backflow prevention devices called vacuum breakers must protect every fixture and piece of equipment."),
      table(
        ["Device", "Where it goes", "Notes"],
        [
          ["Air gap", "Faucets and inlets", "Only completely reliable device. 2 times diameter or 1 inch, whichever is greater."],
          ["Hose-bib vacuum breaker", "Faucet with a hose", "Screws onto the threaded faucet. Hoses at sinks must never be submerged in water."],
          ["Atmospheric vacuum breaker", "Ice machines, coffee machines, equipment connected directly to potable lines", "Prevents backpressure and backsiphonage."],
          ["Double-vented check valve", "Soda carbonators", "Carbonated water is acidic and can erode the metal pipes, causing metal poisoning. The valve lets carbon dioxide escape to the air during backflow. Must be available for inspection."],
        ],
      ),
      p("Fixtures and equipment that need backflow (backsiphonage) prevention: sinks, steam tables, water closets (toilets), potato peelers, dishwashers, ice machines, urinals and garbage grinders."),
    ),
    sec(
      "sewage",
      "Protecting sinks from sewage backup",
      p("A sewage backup in a food preparation or storage area is a serious public health hazard. Sewage on floors, fixtures or food can lead to immediate closure. At the first sign of slow draining waste lines, call a plumber before a backup happens."),
      p("To keep sewage from reaching equipment, there must be no direct connection between the sewage system and any drain from equipment that holds food or utensils. An air break, which makes an indirect waste connection, prevents this. An air break does not stop sewage from backing up, but if it does, the sewage falls to the floor and does not reach equipment."),
      rule("An air break is an unobstructed vertical space between food-related equipment and a waste or sewer pipe. It must be twice the diameter of the discharge opening or 1 inch, whichever is greater. Install an air break at each culinary or equipment sink. An air break is not required at hand wash sinks."),
      ul(
        "Check valves and similar one way devices are not acceptable in place of an air break.",
        "Indirect sewer connections should be within 2 feet of the equipment and on the inlet side of the grease interceptor.",
      ),
      table(
        ["Needs indirect waste (air break)"],
        [
          ["Food preparation and ware washing sinks"],
          ["Refrigerators and freezers"],
          ["Ice makers and ice storage bins"],
          ["Steam tables and kettles"],
          ["Dipper wells"],
        ],
      ),
      mnemonic("Air GAP is for water coming IN (protects the clean supply). Air BREAK is for waste going OUT (protects the equipment)."),
    ),
    sec(
      "grease",
      "Grease interceptors",
      p("Fats, oils and grease (FOG) may not be discharged into the public sewer, because they block pipes and cause backups. Grease interceptors must be installed in waste lines that may receive grease, including those from pot wash sinks, woks, soup or stock kettles, food scrap sinks, scullery sinks, meat, poultry and fish prep sinks, floor drains, automatic dishwashers and scraper sinks."),
      ul(
        "Interceptors should remove an average of at least 90 percent of grease.",
        "They must meet NYC Department of Environmental Protection requirements, be sized under Title 15 of the Rules of the City of New York (section 19-11), and conform to PDI G101, ASME A112.14.3 or ASME A112.14.4.",
        "How they work: greasy water passes a vented flow control fitting, then separator baffles. Fats, oils and grease float to the top and collect until they are removed by hand. The water continues out to the sewer.",
        "Maintenance: install, operate and clean them routinely, removing grease as needed.",
        "Any carter that picks up fats, oils and grease must hold a trade waste removal license from the City's Business Integrity Commission. Check the list of licensed carters or call 311.",
      ),
    ),
  ],
  quiz: [
    q("What is the only completely reliable backflow prevention device?", ["Check valve", "Air gap", "Hose-bib breaker", "Atmospheric breaker"], 1, "An air gap."),
    q("How large must an air gap or air break be?", ["Exactly 1/2 inch", "Twice the pipe diameter, but not less than 1 inch", "6 inches", "Equal to the pipe diameter"], 1, "Twice the diameter or 1 inch, whichever is greater."),
    q("Which device protects ice and coffee machines?", ["Double-vented check valve", "Atmospheric vacuum breaker", "Hose-bib breaker", "Grease trap"], 1, "Atmospheric vacuum breaker."),
    q("Which device protects soda carbonators?", ["Air break", "Double-vented check valve", "Check valve", "None needed"], 1, "It lets carbon dioxide escape during backflow."),
    q("A hose attached to a faucet requires:", ["Hose-bib vacuum breaker", "Air break", "Grease interceptor", "Check valve"], 0, "And the hose may never be submerged in water."),
    q("Backflow caused by pressure dropping in the potable lines is called:", ["Back-pressure", "Back-siphonage", "Cross-flow", "Air break"], 1, "Back-pressure is the other type, pushing dirty water in."),
    q("An air break is required at:", ["Hand wash sinks only", "Each culinary or equipment sink", "Nowhere", "Only the dishwasher"], 1, "Not at hand wash sinks."),
    q("What does an air break prevent?", ["Water entering the supply", "Sewage reaching equipment", "Low water pressure", "Noise"], 1, "It makes an indirect waste connection."),
    q("Where should indirect sewer connections be located?", ["Anywhere", "Within 2 feet of equipment and on the inlet side of the grease interceptor", "10 feet from equipment", "Behind the wall"], 1, "To protect the equipment."),
    q("Which fixture needs indirect waste?", ["Hand sink", "Ice maker", "Floor mat", "Window"], 1, "Refrigerators, ice makers, steam tables, dipper wells and prep sinks need it."),
    q("Grease interceptors remove at least what share of grease on average?", ["50%", "75%", "90%", "100%"], 2, "At least 90 percent."),
    q("Who must the carter have a license from?", ["Fire Department", "Business Integrity Commission", "DEP only", "Health Academy"], 1, "Trade waste removal license from the City of New York Business Integrity Commission."),
    q("Sewage on the floor of a food area can result in:", ["A warning only", "Immediate closure", "Nothing", "A new menu"], 1, "A faulty sewage system is a reason for immediate closure."),
    q("Non-potable pipes may not run:", ["Over food preparation or storage areas", "In basements", "Outdoors", "Under floors"], 0, "That includes sewer pipes."),
  ],
};
