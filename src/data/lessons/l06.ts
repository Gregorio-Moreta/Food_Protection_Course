import { Lesson, p, ul, ol, rule, tip, warn, mnemonic, exam, table, facts, sec, q } from "../types";

export const lesson6: Lesson = {
  n: 6,
  title: "Other Microorganisms",
  blurb: "Viruses, parasites, yeasts and molds: how they differ from bacteria and what they mean in a kitchen.",
  minutes: 30,
  keyPoints: [
    "Viruses cannot multiply in food. Food only carries them until someone eats it.",
    "The two key food viruses are Hepatitis A and Norovirus, both tied to poor hand washing.",
    "Parasites to know: Trichinella (pork) and Anisakis (fish). Freeze fish to minus 31°F for 15 hours to control Anisakis.",
    "Yeasts need air and sugar. Molds grow even in the refrigerator.",
  ],
  sections: [
    sec(
      "viruses",
      "Viruses",
      p("Viruses are smaller than bacteria. They can pass through filters that stop bacteria and cannot be seen with an ordinary microscope, only with an electron microscope. They cause polio, smallpox, measles, mumps, encephalitis, influenza and the common cold."),
      rule("Viruses cannot reproduce in food. Food is only a carrier until it is eaten. Once inside the body, the virus uses human cells to copy itself."),
      p("Viruses in food most often mean contamination from human feces. A major cause is food workers who do not wash their hands thoroughly after using the toilet."),
      table(
        ["Virus", "Notes"],
        [
          ["Hepatitis A", "Affects the liver and can be fatal."],
          ["Norovirus (formerly Norwalk virus)", "Highly contagious and spreads quickly. Linked to outbreaks on cruise ships."],
        ],
      ),
    ),
    sec(
      "parasites",
      "Parasites",
      p("Parasites live in or on another organism, the host, without benefiting it. They cannot live independently."),
      table(
        ["Parasite", "Associated with", "Notes"],
        [
          ["Trichinella spiralis", "Pork", "Cause of trichinosis. Cook pork to 150°F for 15 seconds."],
          ["Anisakid worm (Anisakis)", "Many species of fish", "Raw marinated fish such as sushi, sashimi and ceviche raise the risk of anisakiasis."],
        ],
      ),
      rule("To control anisakiasis, fish to be eaten raw should be frozen at minus 31°F for 15 hours."),
    ),
    sec(
      "yeasts",
      "Yeasts",
      ul(
        "One-celled organisms, larger than bacteria.",
        "Need food, moisture, warmth and air. Unlike some bacteria, they must have oxygen.",
        "Need sugar but can change starch into sugar.",
        "Acting on sugar they produce alcohol and carbon dioxide. This raises bread dough, and the heat of the oven drives off the alcohol.",
        "Reproduce by budding. They are killed by alcohol at about 18 percent concentration.",
        "Usually not pathogenic. Wild yeasts that get in by accident cause spoilage of starch and sugar.",
        "Normal methods that destroy bacteria also kill yeasts.",
      ),
    ),
    sec(
      "molds",
      "Molds",
      ul(
        "Multicellular microscopic plants that become visible when enough grow. Colonies have color: white, black, green.",
        "Larger than bacteria or yeasts. Some are pathogenic and cause athlete's foot or ringworm, but moldy food usually does not cause illness.",
        "Some molds are used on purpose, such as in certain cheeses.",
        "Reproduce by spores. Need moisture and air but not warmth or much moisture, so they grow well in the refrigerator.",
        "Heat, chemicals and ultraviolet rays destroy mold and spores. Refrigeration does not stop them.",
        "Mold inhibitors such as calcium propionate keep bread mold free for about five days.",
        "Penicillium mold gave us penicillin, discovered by Dr. Alexander Fleming.",
      ),
      tip("Remember: molds are the one microorganism that thrives in the cold. Do not assume a refrigerator protects from mold."),
    ),
  ],
  quiz: [
    q("Can viruses multiply in food?", ["Yes, quickly", "No, they only multiply in a host cell", "Only when frozen", "Only in acidic food"], 1, "Food is only a carrier. Viruses reproduce inside living cells."),
    q("Which are the two most common food-industry viruses?", ["Hepatitis A and Norovirus", "Influenza and measles", "Polio and smallpox", "Rabies and mumps"], 0, "Hepatitis A and Noroviruses."),
    q("Viral contamination of food is most often tied to:", ["Pests", "Poor hand washing after using the toilet", "Old food", "Overcooking"], 1, "Human fecal contamination via unwashed hands is the main route."),
    q("Which parasite is associated with pork?", ["Anisakis", "Trichinella spiralis", "Cyclospora", "Giardia"], 1, "Trichinella spiralis causes trichinosis."),
    q("To control Anisakis in fish served raw, you should:", ["Freeze at 0°F for 1 hour", "Freeze at minus 31°F for 15 hours", "Boil it", "Chill at 41°F"], 1, "Fish to be eaten raw is frozen at minus 31°F for 15 hours."),
    q("Yeasts produce what when acting on sugar?", ["Oxygen and water", "Alcohol and carbon dioxide", "Nitrogen", "Vinegar"], 1, "That is how dough rises and wine is made."),
    q("Which microorganism reproduces by budding?", ["Bacteria", "Yeast", "Mold", "Virus"], 1, "Yeasts bud. Bacteria use binary fission. Molds use spores."),
    q("Which microorganism can grow well in a refrigerator?", ["Viruses", "Molds", "Yeast", "Parasites"], 1, "Molds do not need warmth."),
    q("Molds reproduce by:", ["Splitting", "Budding", "Spores", "Eggs"], 2, "Mold reproduces by spores."),
    q("The mold used to make penicillin is:", ["Penicillium", "Aspergillus", "Candida", "Rhizopus"], 0, "Discovered by Dr. Alexander Fleming."),
    q("Which statement about yeasts is true?", ["They need air to grow", "They need no oxygen", "They are the same as bacteria", "They are all deadly"], 0, "Yeasts must have air, unlike some bacteria."),
    q("Which virus is highly contagious and linked to cruise ship outbreaks?", ["Hepatitis B", "Norovirus", "HIV", "Rabies"], 1, "Norovirus spreads very quickly."),
  ],
};
