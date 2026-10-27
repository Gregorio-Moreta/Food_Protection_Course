import { Lesson, p, ul, ol, rule, tip, warn, mnemonic, exam, table, facts, sec, q } from "../types";

export const lesson14: Lesson = {
  n: 14,
  title: "Required DOH Postings",
  blurb: "The signs a NYC food service establishment must post, and where they come from.",
  minutes: 20,
  keyPoints: [
    "Choking poster (Heimlich) in each dining area.",
    "Alcohol and pregnancy warning where alcohol is served (Local Law 63).",
    "How Are We Doing? restaurant inspection sign.",
    "No Smoking signs where smoking is prohibited.",
    "A hand wash sign at every hand wash sink.",
  ],
  sections: [
    sec(
      "overview",
      "Overview",
      p("Some signs must be posted at certain food service establishments. Failing to post them is a violation and can bring a fine. The signs are free from the Department of Consumer Affairs."),
    ),
    sec(
      "list",
      "The required postings",
      table(
        ["Sign", "Where and why"],
        [
          ["First Aid Choking poster", "Conspicuously in each dining area. Shows the Heimlich maneuver. About 3,000 adults die each year from inhaling instead of swallowing food."],
          ["Alcohol and Pregnancy Warning", "Conspicuously at every establishment that serves alcohol. Required by Local Law 63. Drinking during pregnancy is associated with Fetal Alcohol Syndrome, and no safe amount has been determined."],
          ["How Are We Doing?", "Displayed conspicuously. Gives a phone number to request the last inspection report of any NYC restaurant. The Department mails the most recent report for up to five restaurants at no charge. Also lists the website for searching restaurants and inspection details."],
          ["Sale of cigarettes to minors prohibited", "For taverns with a cigarette vending machine or that distribute tobacco. Red lettering on a white card. Free from the Department of Consumer Affairs."],
          ["Vending machine license sign", "Affixed to the vending machine: the dealer's cigarette license number, expiration date, place of business and phone number."],
          ["No Smoking signs", "Wherever smoking is prohibited, which includes the indoor area of all food service establishments, restaurants, bars, pool halls and bingo halls. A few rare exceptions."],
          ["Hand Wash sign", "At every hand wash sink."],
        ],
      ),
      exam("Know the sign and where it goes: choking poster in dining areas, alcohol warning where alcohol is served, vending machine and minors signs only in taverns with cigarette vending machines, hand wash sign at every hand sink."),
    ),
  ],
  quiz: [
    q("Where must the choking poster be posted?", ["The kitchen", "Each dining area", "Restroom only", "Entrance only"], 1, "It shows the Heimlich maneuver."),
    q("Which sign is required where alcohol is served?", ["Alcohol and Pregnancy Warning", "Allergy sign", "Parking sign", "Tip sign"], 0, "Local Law 63."),
    q("Where does the How Are We Doing? sign get used?", ["To report inspection information to customers", "To list prices", "To advertise", "For employees only"], 0, "It tells customers how to get inspection reports."),
    q("How many restaurants can a caller get inspection reports for at no charge?", ["1", "5", "10", "25"], 1, "Up to five."),
    q("A sign about sales of cigarettes to minors is on what color card?", ["Red lettering on a white card", "Blue on yellow", "Black on red", "Green on white"], 0, "Free from the Department of Consumer Affairs."),
    q("Where must a No Smoking sign be posted?", ["Wherever smoking is prohibited", "Only the front door", "Only the bar", "Nowhere"], 0, "That is the indoor area of food service establishments."),
    q("Every hand wash sink must have:", ["A hand wash sign", "A mop", "A towel rack only", "A timer"], 0, "As well as soap, hot and cold water and a way to dry."),
    q("Where can the free signs be obtained?", ["Department of Consumer Affairs", "A hardware store", "The IRS", "The Fire Department"], 0, "42 Broadway, 5th floor, as stated in the course."),
    q("What is the penalty for not posting required signs?", ["None", "Violation and possible fine", "Permit revoked immediately", "Public notice"], 1, "Failure is a violation and may result in a fine."),
  ],
};
