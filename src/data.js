// All static content for the SparkEEC 1.0 site.

export const NAV = [
  ['home', 'Home'],
  ['tracks', 'Tracks'],
  ['schedule', 'Schedule'],
  ['prizes', 'Prizes & Judging'],
  ['rules', 'Rules & FAQ'],
];

export const STATS = [
  ['27', 'Continuous hours'],
  ['7', 'Problem tracks'],
  ['20', 'Teams on the floor'],
  ['80', 'Hackers'],
  ['26K', 'NPR prize pool'],
];

export const FACTS = [
  ['When', '17th – 18th July 2026, 09:00 → 12:00 noon (NPT)'],
  ['Where', 'Everest Engineering College, Sanepa-2, Lalitpur'],
  ['Who', 'EEC students only — all programs & batches'],
  ['Format', 'Teams of 2–4 · 5 checkpoints · two-stage pitching'],
  ['Fee', 'NPR 25 per participant'],
];

// [title, focus, [sdgs]]
export const TRACK_DATA = [
  ['AI & Smart Automation', 'Intelligent assistants, computer vision, predictive analytics, generative-AI applications.', ['SDG 9', 'SDG 8']],
  ['Sustainable Cities & Mobility', 'Smart transport, road and bus safety, energy efficiency, waste management.', ['SDG 11', 'SDG 13']],
  ['AgriTech & Food Security', 'Crop monitoring, supply-chain transparency, market access for farmers.', ['SDG 2', 'SDG 12']],
  ['HealthTech & Wellbeing', 'Telemedicine, diagnostics, mental health, accessibility tools.', ['SDG 3']],
  ['EdTech & Digital Inclusion', 'Learning platforms, rural access, skills and literacy, language tools.', ['SDG 4', 'SDG 10']],
  ['FinTech & Financial Inclusion', 'Digital payments, mobile banking, credit access, fraud detection, financial literacy tools.', ['SDG 8', 'SDG 9']],
  ['Open Innovation', 'Any socially impactful solution leveraging emerging technology.', ['Multiple SDGs']],
];

// Schedule tag palette
export const TAG = {
  cp:   { bg: 'rgba(240,86,159,0.12)', fg: '#f77fb8', bd: 'rgba(240,86,159,0.35)' },
  meal: { bg: 'rgba(95,139,255,0.12)', fg: '#8fb0ff', bd: 'rgba(95,139,255,0.35)' },
  fun:  { bg: 'rgba(160,107,245,0.14)', fg: '#c5a3fa', bd: 'rgba(160,107,245,0.4)' },
  key:  { bg: 'rgba(var(--wc),0.1)', fg: 'var(--fg-strong)', bd: 'rgba(var(--wc),0.3)' },
  note: { bg: 'rgba(var(--wc),0.06)', fg: 'var(--muted2)', bd: 'rgba(var(--wc),0.14)' },
};

// [time, activity, [[label, kind], ...], big?]
export const DAY1 = [
  ['07:00 – 09:00', 'Onboarding — registration desk, ID verification, kit distribution', []],
  ['09:00 – 09:45', 'Opening ceremony & event launch', [['27-HOUR CLOCK BEGINS', 'key']], true],
  ['09:45 – 10:15', 'Theme & rules briefing, Q&A', []],
  ['10:15 – 12:00', 'Build sprint 1 + ideation', [['Track selection locks 12:00', 'note']]],
  ['12:00 – 12:30', 'Mentorship round 1 — Faculty members', [['CP-1 · push due 12:00', 'cp']]],
  ['12:30 – 13:30', 'Lunch', [['Meal', 'meal']]],
  ['13:30 – 15:30', 'Build sprint 2', []],
  ['15:30 – 16:00', 'Mentorship round 2 — External experts', [['CP-2 · push due 15:30', 'cp']]],
  ['16:00 – 18:00', 'Build sprint 3', []],
  ['18:00 – 18:30', 'Mentorship round 3 — SOCISE-EEC executives', [['CP-3 · push due 18:00', 'cp']]],
  ['18:30 – 19:30', 'Dinner', [['Meal', 'meal']]],
  ['19:30 – 21:30', 'Build sprint 4', []],
  ['21:30 – 23:00', 'Mehfil — open-air live music session', [['Live music', 'fun']]],
  ['23:00 – 23:30', 'Mentorship round 4 — Organizing Committee', [['CP-4 · push due 23:00', 'cp']]],
  ['23:30 onward', 'Overnight build (supervised) — refreshments, rest areas open', []],
];

export const DAY2 = [
  ['07:00 – 08:00', 'Breakfast, freshening up', [['Meal', 'meal']]],
  ['08:00 – 10:00', 'Build sprint 5 + checkpoint', []],
  ['10:00 – 10:30', 'Mentorship round 5 — Faculty & external experts', [['CP-5 · push due 10:00', 'cp']]],
  ['10:30 – 11:30', 'Final build sprint', []],
  ['11:30 – 12:00', 'Documentation & final touches', []],
  ['12:00', 'HARD SUBMISSION DEADLINE', [['27-HOUR CLOCK STOPS', 'key']], true],
  ['12:00 – 13:30', 'Pitching, preliminary round — booth demos to judges', []],
  ['13:30 – 14:45', 'Pitching, final round — top teams on stage', []],
  ['14:45 – 15:00', 'Judges\u2019 deliberation', []],
  ['15:00 – 16:00', 'Winner announcement & closing ceremony', []],
  ['16:00 – 16:30', 'Networking, photographs, departure', []],
];

export const PANELS = [
  {
    title: 'Panel A — Technology', weight: '45%', accent: '#f0569f', fg: '#f77fb8',
    bar: 'linear-gradient(90deg,#f0569f,#a06bf5)', delay: '0s',
    quote: '\u201cIs this well engineered, genuinely built here, and technically credible?\u201d',
    criteria: [
      ['Technical implementation & functionality', 35], ['Code quality & architecture', 20],
      ['Innovation in engineering', 15], ['Development evidence & authenticity', 15],
      ['Difficulty & completeness', 15],
    ],
  },
  {
    title: 'Panel B — Business', weight: '30%', accent: '#a06bf5', fg: '#c5a3fa',
    bar: 'linear-gradient(90deg,#a06bf5,#5f8bff)', delay: '0.1s',
    quote: '\u201cWould real users want this, and could it survive in the market?\u201d',
    criteria: [
      ['Problem–solution fit', 30], ['Business model & viability', 25],
      ['User experience & design', 20], ['Go-to-market & competition', 15],
      ['Pitch & storytelling', 10],
    ],
  },
  {
    title: 'Panel C — Investment', weight: '25%', accent: '#5f8bff', fg: '#8fb0ff',
    bar: 'linear-gradient(90deg,#5f8bff,#8fb0ff)', delay: '0.2s',
    quote: '\u201cIf this were a seed-stage pitch, would I take the next meeting?\u201d',
    criteria: [
      ['Market opportunity', 30], ['Scalability & defensibility', 25],
      ['Team capability', 20], ['Impact & SDG alignment', 15],
      ['Return & follow-on potential', 10],
    ],
  },
];

export const RULE_CARDS = [
  ['§7 · Teams', 'Teams of 2–4, locked at opening', 'No solo competitors — solo registrants are matched into teams. Composition locks at the opening ceremony.'],
  ['§10 · Fresh work', 'Built within the 27 hours', 'Research and environment setup beforehand are fine — production code, trained custom models, and solution-specific assets are not.'],
  ['§12 · AI usage', 'AI is encouraged — use it honestly', 'Coding assistants and generative AI are recommended. Disclose all significant AI assistance in your README, and be ready to explain every part of your submission.'],
  ['§17 · GitHub checkpoints', '5 mandatory pushes', 'One private repo per team in the SOCISE-SparkEEC organization. Push before each mentorship round — misses escalate: warning → 5% deduction → integrity panel.'],
  ['§16 · Submission', 'Five components before noon', 'Code in the official repo, README with AI disclosure, demo video (max 3 min), pitch deck in /docs, and the submission form. Late = not accepted.'],
  ['§21 · Code of conduct', 'Harassment-free, no exceptions', 'A respectful, inclusive experience for everyone. No harassment, no substances, no sabotage. Violations can mean disqualification and College referral.'],
];

export const FAQ_DATA = [
  ['Who can participate?', 'Only currently enrolled EEC students — any program or year, with a valid student ID at onboarding. Organizers, volunteers, mentors, and judges cannot compete.'],
  ['What if I don\u2019t have a team?', 'Register solo and you\u2019ll be matched into a team at the pre-event team-formation session. Cross-discipline and cross-batch teams are strongly encouraged.'],
  ['Can we use AI tools?', 'Yes — encouraged! Just disclose all significant AI assistance in your README and be able to explain every part of your code. Concealed use is penalized; transparent use is rewarded.'],
  ['Can we prepare before the event?', 'Research, sketches, and environment setup — yes. Production code, trained custom models, or solution-specific assets — no. Checkpoint history is audited.'],
  ['What about food and sleeping?', 'Three meals, tea/coffee, and overnight snacks are provided. The venue stays open all night under supervision, with separate rest areas from 23:30. Bring light bedding.'],
  ['Who owns what we build?', 'Your team — fully. Organizers get only a non-exclusive license to use project names, screenshots, and pitch materials for archival and promotion.'],
  ['What exactly do we submit?', 'Five things before 12:00 noon on Day 2: code in your official repo, README with AI disclosure, a demo video (max 3 min), your pitch deck in /docs, and the submission form.'],
  ['How much does it cost to join?', 'Just NPR 25 per participant — deliberately kept nominal so cost is never a barrier. It covers your meals, event kit, overnight stay, and mentorship rounds.'],
  ['Do I need to be an expert coder?', 'No. Beginners are welcome. Judges reward clear problem-solving, teamwork, and honest effort as much as raw technical skill — a strong first-year team can absolutely win.'],
  ['What should I bring?', 'Your laptop and charger, EEC student ID, any hardware your idea needs, and light bedding for the overnight. Power, internet, food, and rest areas are provided on site.'],
  ['Will there be internet and power on site?', 'Yes — Wi-Fi and power outlets are available throughout the venue. We still recommend downloading large dependencies and setting up your environment beforehand.'],
  ['How do I contact the organizers?', 'Reach the Organizing Committee through the official SOCISE-EEC channels, or ask any committee member on the floor during the event. Volunteers are on hand around the clock.'],
];

export const REG_STEPS = [
  ['Fill the official registration form', 'One form per team: team name, track, member details, GitHub usernames, and a one-paragraph problem statement.'],
  ['Idea screening', 'A lightweight review confirms eligibility and balances the tracks. No polished pitch needed — just a clear problem.'],
  ['Confirmation & fee', 'Your team leader receives confirmation. Registration completes on payment of NPR 25 per member.'],
  ['Onboard on 17 July, from 07:00', 'Bring your EEC student ID, collect your kit and workstation — the clock starts at 09:00 sharp.'],
];

export const TEAM_COL = [
  { ring: 'rgba(240,86,159,0.4)', fg: '#f77fb8' },
  { ring: 'rgba(160,107,245,0.4)', fg: '#c5a3fa' },
  { ring: 'rgba(95,139,255,0.4)', fg: '#8fb0ff' },
];

// Event Lead + Advisor are featured separately in the UI.
export const TEAM = [
  ['Neha Pal', 'Program & Logistics'],
  ['Samin Thapa', 'Sponsorship & Finance'],
  ['Piyush Chand', 'Documentation & Media'],
  ['Subash Bhatta', 'Hospitality & Volunteers'],
  ['Swornima C Tamang', 'Marketing & Outreach'],
  ['Rehan Lamichhane', 'Technical & IT'],
];

export function initials(name) {
  const parts = name.split(' ').filter(Boolean);
  return (parts[0][0] + (parts[parts.length - 1][0] || '')).toUpperCase();
}

// Countdown target: 17 July 2026, 09:00 NPT (UTC+5:45) → 18 July 16:30 NPT
export const EVENT_START = '2026-07-17T09:00:00+05:45';
export const EVENT_END = '2026-07-18T16:30:00+05:45';
