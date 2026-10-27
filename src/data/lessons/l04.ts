import { Lesson, p, ul, ol, rule, tip, warn, mnemonic, exam, table, facts, sec, q } from "../types";

export const lesson4: Lesson = {
  n: 4,
  title: "Health Hazards",
  blurb: "Physical, chemical and biological hazards, natural toxins in fish, and the eight major food allergens.",
  minutes: 40,
  keyPoints: [
    "Three hazard types: physical, chemical, biological.",
    "Biological hazards (bacteria and viruses) are the biggest threat because you cannot see them.",
    "Adding sulfites in a food service establishment is prohibited. MSG is allowed in moderation and must be disclosed on the menu.",
    "Ciguatoxin and histamine are not destroyed by cooking.",
    "Eight major allergens: Fish, Peanuts, Wheat, Soy, Tree nuts, Eggs, Milk, Shellfish.",
  ],
  sections: [
    sec(
      "overview",
      "Three kinds of hazard",
      p("Food-borne illness is caused by foreign objects, chemicals or harmful microorganisms in food. These are grouped as physical, chemical and biological hazards."),
      table(
        ["Type", "Examples"],
        [
          ["Physical", "Pebbles, glass, toothpicks, false nails, hair, jewelry, staples, rubber bands, bandages"],
          ["Chemical", "Cleaners, pesticides, toxic metals, sulfites, MSG, natural toxins"],
          ["Biological", "Bacteria, viruses, parasites, fungi"],
        ],
      ),
    ),
    sec(
      "physical",
      "Physical hazards",
      p("A physical hazard is a foreign object that can cause injury or illness. Most are accidental and come from poor handling."),
      ul(
        "Tiny pebbles among rice, dried peas and beans",
        "Broken glass in ice, caused by scooping ice with a glass instead of a plastic or metal scoop",
        "Short, un-frilled toothpicks holding a sandwich together",
        "False fingernails",
        "Strands of hair",
        "Jewelry that falls into food",
        "Rubber bands, staples and plastic bandages",
      ),
      rule("Any food that contains a physical hazard must be discarded."),
      p("Prevention: train workers, keep jewelry off hands, and use hair restraints."),
    ),
    sec(
      "chemical",
      "Chemical hazards",
      p("Chemicals can get into food by accident, on purpose, or naturally."),
      p("Accidental contamination comes from careless insecticide use, storing cleaners next to open food, and storing acidic food in metal containers. Prevent it by:"),
      ul(
        "Using an experienced, licensed exterminator for insecticides and rodenticides",
        "Storing cleaning chemicals, including personal medication, away from food, ideally in a locked cabinet",
        "Storing acidic foods in food-grade plastic",
        "Labeling all chemicals clearly and following the label directions",
      ),
      table(
        ["Additive", "Why used", "Rule"],
        [
          ["Sulfites", "Keep cut fruits and vegetables looking fresh", "Prohibited as an added ingredient in food service establishments. Factory-processed foods may contain them."],
          ["MSG", "Enhances flavor", "Allowed in moderation, and must be disclosed on the menu."],
        ],
      ),
      p("Too much of either can cause a serious allergic reaction in sensitive people."),
    ),
    sec(
      "natural-toxins",
      "Natural toxins",
      p("Some foods contain toxins on their own, from their environment, or from decay."),
      table(
        ["Source", "Toxin or illness", "Key facts"],
        [
          ["Mushrooms", "Poison", "Poisonous and safe types are hard to tell apart. Buy only from a reliable commercial source."],
          ["Puffer fish", "Tetrodotoxin", "Can be fatal when not properly prepared. Only highly skilled chefs can remove the poisonous parts."],
          ["Predatory reef fish such as barracuda", "Ciguatoxin, causing ciguatera", "Toxins from algae build up as small fish are eaten by larger fish. Cooking does not destroy it."],
          ["Tuna, mackerel, bluefish, dolphin fish, amberjack", "Scombroid poisoning (histamine)", "Histidine in the flesh turns to histamine as the fish decomposes. Histamine causes a reaction that can mimic a heart attack. Cooking does not destroy it. Gut and refrigerate soon after catch."],
          ["Contaminated waters", "Mercury, PCP and other chemicals", "Accumulate in fish and seafood from polluted habitats."],
        ],
      ),
      exam("Two toxins survive cooking: ciguatoxin and histamine. Heat is not a fix for them."),
    ),
    sec(
      "biological",
      "Biological hazards",
      p("Bacteria, viruses, parasites and fungi are the most significant hazard because they cannot easily be seen, smelled or tasted. Bacteria and viruses pose the greatest threat to food safety and are visible under a microscope. Parasites can be seen with a strong light, a process called candling. Fungi become visible once enough colonies form."),
    ),
    sec(
      "allergies",
      "Food allergies",
      p("A food allergy is a reaction to a food or ingredient that the body mistakenly treats as harmful. Millions of Americans have food allergies. Most reactions are mild, but some are severe and can be fatal. There is no cure, so avoiding allergens and recognizing reactions early is crucial."),
      table(
        ["Mild symptoms", "Severe symptoms"],
        [
          ["Itching, wheezing, hives, swelling of the face and eyes", "Loss of consciousness from airway obstruction, and death"],
        ],
      ),
      p("Eight foods cause about 90 percent of food allergy reactions. By law these, and any food containing protein from them, are called major food allergens:"),
      ul("Fish", "Peanuts", "Wheat", "Soy", "Tree nuts", "Eggs", "Milk", "Shellfish"),
      mnemonic("Food Problems Will Send The EMS: Fish, Peanuts, Wheat, Soy, Tree nuts, Eggs, Milk, Shellfish."),
      p("Additives that can trigger reactions include nitrites (added to meats for color), sulfites (added to dried and preserved produce) and MSG."),
      p("Protecting customers means full disclosure of the eight allergens:"),
      ul(
        "Describe menu items in detail.",
        "If you are not sure about an ingredient, tell the customer immediately.",
        "Make sure the customer's food never touches the allergen.",
      ),
    ),
  ],
  quiz: [
    q("Which is a physical hazard?", ["Sulfites", "Hair in food", "Salmonella", "Pesticide"], 1, "Hair, jewelry, glass and similar items are physical hazards."),
    q("What should you do with food containing a physical hazard?", ["Remove the object and serve", "Discard it", "Cook it longer", "Cover it"], 1, "Food with a physical hazard must be discarded."),
    q("Why shouldn't you scoop ice with a glass?", ["It is too slow", "Glass can break into the ice", "Glass makes ice melt", "Glass absorbs odors"], 1, "Broken glass in ice is a classic physical hazard. Use plastic or metal scoops."),
    q("Adding sulfites to food in a food service establishment is:", ["Required", "Optional", "Prohibited", "Allowed for salad bars only"], 2, "Sulfites cannot be added when preparing food in a food service establishment."),
    q("MSG may be used if:", ["It is hidden", "It is used in moderation and disclosed on the menu", "It is mixed with sulfites", "It is never disclosed"], 1, "MSG is allowed in moderation and must be disclosed."),
    q("Which toxin survives cooking?", ["Ciguatoxin", "Salmonella", "Listeria", "Trichinella"], 0, "Ciguatoxin and histamine are not destroyed by cooking."),
    q("What causes scombroid poisoning?", ["Histamine from decomposing fish", "A virus", "Pesticides", "Mold"], 0, "Histidine in tuna, mackerel and relatives turns into histamine."),
    q("How should mushrooms be sourced?", ["Picked locally", "From a reliable commercial source", "From a home garden", "From any market stall"], 1, "Poisonous and safe mushrooms are hard to tell apart."),
    q("Which are the biggest biological threats to food safety?", ["Fungi and molds", "Bacteria and viruses", "Insects", "Dust"], 1, "Bacteria and viruses pose the biggest threat."),
    q("Which of these is a major food allergen?", ["Corn", "Peanuts", "Rice", "Beef"], 1, "Peanuts are one of the eight."),
    q("The eight major allergens account for about what share of reactions?", ["10%", "50%", "90%", "100%"], 2, "Eight foods account for about 90 percent of food allergic reactions."),
    q("What should you do if unsure about an ingredient and a customer has an allergy?", ["Guess", "Tell the customer immediately", "Say nothing", "Serve it anyway"], 1, "Disclose and never guess."),
    q("Where should cleaning chemicals and personal medication be stored?", ["Next to open food", "Away from food, preferably locked", "In the refrigerator", "On the prep table"], 1, "Store them away from food, ideally locked."),
    q("Which is NOT one of the eight major allergens?", ["Soy", "Wheat", "Tree nuts", "Chicken"], 3, "Chicken is not on the list. The eight are fish, peanuts, wheat, soy, tree nuts, eggs, milk and shellfish."),
  ],
};
