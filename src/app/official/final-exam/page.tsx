import Link from "next/link";

export const metadata = { title: "About the in-person final exam | Food Protection Prep" };

const SOURCES = {
  coursePage: "https://www.nyc.gov/site/doh/business/health-academy/food-protection-online-free.page",
  courseDetail: "https://a816-healthpsi.nyc.gov/prjFPC/F2964_CourseDetail.aspx",
  courseFaq: "https://a816-healthpsi.nyc.gov/prjFPC/F2968_Faq.aspx",
  faqPdf: "https://www.nyc.gov/assets/doh/downloads/pdf/hany/food-protection-course-faq.pdf",
  studyGuide: "https://www.nyc.gov/assets/doh/downloads/pdf/rii/study-guide.pdf",
  manual: "https://www.nyc.gov/assets/doh/downloads/pdf/rii/fpc-manual.pdf",
  business: "https://ko.nyc-business.nyc.gov/nycbusiness/description/food-protection-certificate",
};

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="font-semibold text-accent underline underline-offset-2">
      {children}
    </a>
  );
}

const confirmed: { fact: string; source: React.ReactNode }[] = [
  {
    fact: "The final exam is taken in person, after you finish all 15 online lessons. You schedule it from your student page once the course is complete.",
    source: <Ext href={SOURCES.coursePage}>NYC Health: Food Protection Online Course</Ext>,
  },
  {
    fact: "The exam fee is $24. Paying by credit or debit card adds a small convenience fee ($0.60 at the Health Academy). Paying by eCheck adds no fee.",
    source: <Ext href={SOURCES.coursePage}>NYC Health course page</Ext>,
  },
  {
    fact: "Exam sites: NYC Health Academy, Riverside Health Center, 160 West 100th Street, Third Floor, Manhattan, and the College of Staten Island, 2800 Victory Boulevard. (The older course FAQ still says second floor; the current Health Department page and the student page say third floor.)",
    source: <Ext href={SOURCES.coursePage}>NYC Health course page</Ext>,
  },
  {
    fact: "Bring a government issued photo ID and the printout of your exam confirmation page. The confirmation page cannot be reprinted, but you can log in to see your exam date and time.",
    source: <Ext href={SOURCES.courseFaq}>Online course FAQ</Ext>,
  },
  {
    fact: "The study guide and the exam are offered in English and 36 other languages.",
    source: <Ext href={SOURCES.coursePage}>NYC Health course page</Ext>,
  },
  {
    fact: "There is no limit on how many times you can take the exam, but you pay the fee for each attempt.",
    source: <Ext href={SOURCES.courseFaq}>Online course FAQ</Ext>,
  },
  {
    fact: "If you pass, the Food Protection Certificate is mailed to you, usually 2 to 6 weeks after the exam date.",
    source: <Ext href={SOURCES.courseFaq}>Online course FAQ</Ext>,
  },
];

const studyGuide: { day: string; points: string[] }[] = [
  {
    day: "Day 1: Permits, receiving and storage",
    points: [
      "A current Health Department permit is required, and a Food Protection Certificate holder must supervise.",
      "Temperature Danger Zone: 41°F to 140°F. Cold food at 41°F or below; smoked fish at 38°F or below.",
      "Approved thermometers: bimetallic stem (0°F to 220°F), thermocouple and thermistor. Glass thermometers are not allowed.",
      "Keep shellfish tags on file for 90 days after the product is used up.",
      "Store food at least 6 inches off the floor, raw food below cooked food, and never under waste water lines.",
      "Ice for eating cannot be used to chill cans or bottles; drain ice that food sits in.",
      "Vacuum packaging needs special Health Department authorization.",
    ],
  },
  {
    day: "Day 2: Hazards, microbiology and hygiene",
    points: [
      "Three hazards: physical, chemical and biological. Contaminated food often looks, smells and tastes normal.",
      "Bacteria can double every 20 to 30 minutes. Growth factors: FAT TOM (food, acidity, temperature, time, oxygen, moisture).",
      "Pork to 150°F (trichinosis). Ground meat to 158°F (E. coli O157:H7).",
      "Botulism: home canned foods, smoked fish, garlic in oil, any food without oxygen. Scombroid: tuna, mackerel and similar fish that were temperature abused.",
      "Staphylococcus aureus comes from people: no bare hand contact with ready-to-eat food.",
      "Handwash sinks within 25 feet of food prep areas, with soap, hot and cold water, towels or a dryer, and a Wash Hands sign.",
    ],
  },
  {
    day: "Day 3: Thawing, cooking, cooling, reheating and plumbing",
    points: [
      "Thaw in the refrigerator, under cold running water, or in the microwave if cooking right away.",
      "Cook poultry, stuffing and stuffed meats to 165°F; ground meat 158°F; pork 150°F; shell eggs 145°F; fish, beef and other meats 140°F.",
      "Hot holding at 140°F or above. Reheat to 165°F on a stove or in an oven, never in a hot holding unit.",
      "Rapid cooling: ice water bath while stirring, shallow pans 1 to 2 inches deep (4 inch pans), rapid chill units, solid pieces 6 pounds or less. Cover only after the food reaches 41°F.",
      "Culinary and pot sinks need air breaks. Vacuum breakers go on equipment connected to drinking water and on hose bibs.",
    ],
  },
  {
    day: "Day 4: Washing, sanitizing and pests",
    points: [
      "Manual dishwashing order: wash, rinse, sanitize, air dry.",
      "Hot water sanitizing: 170°F for at least 30 seconds.",
      "Chlorine: 50 ppm (half ounce of bleach per gallon) for immersion of at least 1 minute and for wiping cloths; 100 ppm (1 ounce per gallon) for wiping, spraying or pouring. Check with a test kit.",
      "Customer restrooms are required with 20 or more seats.",
      "Pest control: starve them, build them out, destroy them. Rats can enter through quarter size openings. Fresh rat droppings are a critical violation. Only licensed pest control operators may apply pesticides.",
    ],
  },
  {
    day: "Day 5: HACCP and workplace safety",
    points: [
      "Seven HACCP principles: hazard analysis, identify critical control points, set critical limits, monitor, corrective action, verify, keep records.",
      "Potentially hazardous food in the danger zone for more than 2 hours must be thrown out.",
      "Pre-chill ingredients for cold salads such as tuna.",
      "Artificial trans fat is banned in restaurant food.",
      "Common worker injuries: slips, trips and falls; cuts; burns; strains and sprains. Wear slip resistant shoes.",
    ],
  },
];

export default function FinalExamInfo() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-14 pt-8">
      <Link href="/official" className="text-sm font-semibold text-accent">
        All official quizzes
      </Link>
      <div className="mt-4 inline-block rounded-full bg-accentsoft px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent">Research</div>
      <h1 className="font-display mt-3 text-4xl font-semibold leading-tight">The in-person final exam: what is official</h1>
      <p className="mt-3 text-lg text-muted">Researched November 2, 2026 from Health Department sources.</p>

      <section className="mt-8 rounded-2xl border-2 border-accent bg-accentsoft p-6">
        <h2 className="font-display text-2xl font-semibold">The short answer</h2>
        <p className="mt-2 leading-7">
          The Health Department does not publish the final exam or an official practice version of it. No official full test is available
          online. The closest official material is:
        </p>
        <ol className="mt-3 list-decimal space-y-2 pl-6 leading-7">
          <li>
            The 15 lesson quizzes from the online course, now on this site in the{" "}
            <Link href="/official" className="font-semibold text-accent underline underline-offset-2">
              official section
            </Link>
            .
          </li>
          <li>
            The official <Ext href={SOURCES.studyGuide}>Food Protection Course study guide</Ext> (an eight page Day 1 to Day 5 review). Its key
            points are summarized below.
          </li>
          <li>
            The official <Ext href={SOURCES.manual}>Food Protection Training Manual</Ext>, which includes short &quot;Quick Review&quot; question
            sets at the end of its chapters. The manual does not print the answers.
          </li>
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Confirmed by the Health Department</h2>
        <ul className="mt-4 space-y-3">
          {confirmed.map((c) => (
            <li key={c.fact} className="rounded-2xl border border-line bg-surface p-5">
              <p className="leading-7">{c.fact}</p>
              <p className="mt-1 text-sm text-muted">Source: {c.source}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 rounded-2xl border border-line bg-surface p-6">
        <h2 className="font-display text-2xl font-semibold">Not published by the Health Department</h2>
        <p className="mt-2 leading-7">
          None of the official pages (the course page, the course details, the FAQ, the study guide or the NYC Business page) state how many
          questions the exam has, the passing score or the time limit. Unofficial prep sites commonly describe it as 50 multiple choice
          questions with 70 percent needed to pass, and the practice exams on this site use that format, but treat those numbers as
          unconfirmed. Ask the Health Academy when you schedule if you want to be sure.
        </p>
        <h3 className="font-display mt-6 text-xl font-semibold">About &quot;final exam&quot; question sets online</h3>
        <p className="mt-2 leading-7">
          Sites such as Quizlet, Docsity and GoTestPrep sell or share lists titled &quot;NYC Food Protection final exam questions.&quot; They
          are not from the Health Department. Many simply repeat the lesson quiz questions above, and some contain wrong answers. Use them
          with care, and trust the official answers in this section when they disagree.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Official study guide, key points</h2>
        <p className="mt-2 text-sm text-muted">
          Summarized in our own words from the Health Department <Ext href={SOURCES.studyGuide}>study guide PDF</Ext>. Check the PDF for the
          exact wording.
        </p>
        <div className="mt-4 space-y-4">
          {studyGuide.map((d) => (
            <div key={d.day} className="rounded-2xl border border-line bg-surface p-5">
              <h3 className="font-display text-lg font-semibold">{d.day}</h3>
              <ul className="mt-2 space-y-1.5">
                {d.points.map((p) => (
                  <li key={p} className="flex gap-3 leading-7">
                    <span className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-line bg-surface p-6">
        <h2 className="font-display text-2xl font-semibold">Official links</h2>
        <ul className="mt-3 space-y-2 leading-7">
          <li><Ext href={SOURCES.coursePage}>Food Protection Online Course (NYC Health)</Ext></li>
          <li><Ext href={SOURCES.courseDetail}>Online course details and exam registration</Ext></li>
          <li><Ext href={SOURCES.courseFaq}>Online course FAQ</Ext> and the <Ext href={SOURCES.faqPdf}>FAQ PDF</Ext></li>
          <li><Ext href={SOURCES.studyGuide}>Study guide (PDF)</Ext></li>
          <li><Ext href={SOURCES.manual}>Food Protection Training Manual (PDF)</Ext></li>
          <li><Ext href={SOURCES.business}>Food Protection Certificate on NYC Business</Ext></li>
        </ul>
      </section>
    </div>
  );
}
