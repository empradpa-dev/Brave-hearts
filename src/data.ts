import { AbuseDetail, QuizQuestion } from './types';

export const UGANDA_STATS = [
  { indicator: 'Physical Violence (Boys)', rate: 68, source: 'UNICEF Uganda', info: '68% of boys in Uganda have experienced physical violence threating their development.' },
  { indicator: 'Physical Violence (Girls)', rate: 59, source: 'UNICEF Uganda', info: '59% of girls in Uganda have experienced severe physical violence.' },
  { indicator: 'Sexual Violence (Girls, 13-17 yrs)', rate: 25, source: 'Uganda MGLSD', info: '25% of adolescent girls experience sexual violence annually.' },
  { indicator: 'Sexual Violence (Boys, 13-17 yrs)', rate: 11, source: 'Uganda MGLSD', info: '11% of adolescent boys experience sexual violence every year.' },
  { indicator: 'Lifetime CSA Prevalence (Girls)', rate: 35, source: 'Uganda VACS 2018', info: '35% of girls experience sexual abuse in childhood.' },
  { indicator: 'Lifetime CSA Prevalence (Boys)', rate: 17, source: 'Uganda VACS 2018', info: '17% of boys experience sexual abuse in childhood.' },
  { indicator: 'Vulnerable Children', rate: 80, isCount: true, countText: '8M+', source: 'UNICEF Uganda', info: 'Over 8 million children are considered highly vulnerable to harm in Uganda.' },
  { indicator: 'Girls Defiled Daily (Average)', rate: 26, isCount: true, countText: '~26 per day', source: 'UNICEF / Police', info: 'Approximately 26 girls are defiled daily across Uganda.' }
];

export const ABUSE_TYPES_DATA: Record<string, AbuseDetail> = {
  physical: {
    title: 'Physical Abuse',
    description: 'Intentional use of physical force against a child that results in injury, pain, or physical harm.',
    childFriendlyDescription: 'When someone hits, hurts, or makes your body feel unsafe on purpose. Your body belongs to you, and it has the right to be kept safe!',
    causes: [
      'Normalizing high rates of corporal punishment in homes or schools',
      'High parental stress or economic instability',
      'Lack of knowledge about peaceful positive parenting and discipline guidance',
      'Alcohol or drug abuse in the family'
    ],
    forms: [
      { name: 'Beating or Hitting', description: 'Using hands, cane, stick, or slippers to cause bodily physical pain.', illustration: '🔨' },
      { name: 'Burning', description: 'Hurting a child with hot water, hot iron, fire, or stove on purpose.', illustration: '🔥' },
      { name: 'Slapping or Pinching', description: 'Using force to slap, kick, pinch, or shake a child aggressively.', illustration: '⚡' },
      { name: 'Throwing Objects', description: 'Hurting a child by throwing hard objects at them.', illustration: '🎯' }
    ],
    signs: [
      'Broken or painful body parts, scars, or unexplained burns',
      'Bruises, cuts, swelling, or black eyes',
      'Flinching or showing fear when adults come near or raise their hands',
      'Unwillingness to change clothes (to hide bruises or injuries)'
    ],
    reassurance: 'It is NEVER your fault if someone hurts your body. You have the right to tell a teacher or someone you trust, and they will make it stop.'
  },
  sexual: {
    title: 'Sexual Abuse',
    description: 'Involving a child in any sexual activity or exposure that they cannot comprehend, consent to, or that violates their developmental boundaries.',
    childFriendlyDescription: 'When someone tries to touch your private body parts (the areas covered by a swimsuit), asks you to touch theirs, or shows you dirty pictures. Nobody has the right to touch your private parts or make you keep secrets about it.',
    causes: [
      'Grooming behaviors by trusted relatives, neighbors, or strangers',
      'Inadequate safety measures or child supervision',
      'Cultural silence, taboos, and severe shame around discussing sexuality',
      'Exposure to harmful digital content or adult activities'
    ],
    forms: [
      { name: 'Rape or Assault', description: 'Forcing or forcing contact on a child’s private body parts.', illustration: '🛑' },
      { name: 'Non-Consensual Touching', description: 'Inappropriate or uncomfortable touching of private areas.', illustration: '⚠️' },
      { name: 'Indecent Exposure', description: 'An adult showing their private parts to a child or exposing them to pornography.', illustration: '👁️' },
      { name: 'Sexual Exploitation', description: 'Using money, gifts, food, or threats to persuade a child for sexual actions.', illustration: '🎁' }
    ],
    signs: [
      'Sudden change in behavior (becoming very quiet, scared, or angry)',
      'Difficulty walking or sitting down comfortably, or pain in private areas',
      'Preoccupation with adult sexual behaviors beyond their age',
      'Extreme fear of a specific person or refusing to go to their house'
    ],
    reassurance: 'Your body is completely yours. Nobody is allowed to touch you in a way that makes you feel bad or uncomfortable. If someone does, tell a trusted adult immediately. Even if they made you promise to keep a secret, you MUST tell.'
  },
  emotional: {
    title: 'Emotional Abuse',
    description: 'Repeated behaviors, verbal threats, rejection, or isolation that harm a child’s self-worth, mental well-being, and psychological growth.',
    childFriendlyDescription: 'When someone constantly screams hurtful words, calls you bad names, tells you that you are useless, locks you in isolation, or makes you feel completely unloved and terrified.',
    causes: [
      'Intergenerational cycle of verbal and emotional toxicity',
      'Severe parental mental health challenges',
      'Severe family conflicts and continuous domestic violence at home',
      'Rigid unrealistic expectations placed on children'
    ],
    forms: [
      { name: 'Verbal Threats & Insults', description: 'Repeatedly screaming, using bad words, or calling you "stupid," "ugly," or "dumb."', illustration: '🗣️' },
      { name: 'Persistent Isolation', description: 'Locking a child inside a room alone, or preventing them from making friends.', illustration: '🔒' },
      { name: 'Humiliation & Mocking', description: 'Making fun of the child in front of others or spreading cruel lies about them.', illustration: '🎭' },
      { name: 'Corruption & Exposure', description: 'Exposing children to violent crimes, illegal acts, or drug abuse.', illustration: '🍺' }
    ],
    signs: [
      'Deep sadness, withdrawal, or crying very frequently',
      'Severe lack of self-esteem, feeling worthless or guilty',
      'Stuttering, bed-wetting, or biting fingernails continuously',
      'Sudden aggressive behavior or hurting themselves or animals'
    ],
    reassurance: 'You are beautiful, smart, and valuable just the way you are! Words that hurt do not define who you are. You deserve to receive love and respect everywhere.'
  },
  neglect: {
    title: 'Child Neglect',
    description: 'The continuous failure to provide for a child’s basic physical, medical, emotional, or educational needs.',
    childFriendlyDescription: 'When the people who look after you do not give you food, do not buy you clothes, do not let you go to school, or leave you alone when you are very sick or too young.',
    causes: [
      'Extreme poverty, food insecurity, or lack of resources',
      'Parental illness, physical disability, or single parenting stress',
      'Lack of understanding of child developmental needs',
      'Abandonment by parents migrating for work'
    ],
    forms: [
      { name: 'Physical Neglect', description: 'Not giving enough healthy food or drink, or forcing them to wear dirty, torn clothes.', illustration: '🍲' },
      { name: 'Educational Neglect', description: 'Refusing to send the child to school or forcing them to work in gardens/markets all day.', illustration: '📝' },
      { name: 'Medical Neglect', description: 'Not taking a sick or injured child to the hospital or refusing medicines.', illustration: '🏥' },
      { name: 'Lack of Shelter & Hygiene', description: 'Leaving children to sleep in dangerous environments or without bath facilities.', illustration: '🏠' }
    ],
    signs: [
      'Looking extremely thin, weak, or constantly complaining of terrible hunger',
      'Wearing very dirty, torn, or undersized clothes in cold weather',
      'Missing school very often or dropping out to sell things',
      'Untreated wounds, head lice, or poor dental and bodily hygiene'
    ],
    reassurance: 'You have a right to eat good food, go to school, and be cared for when you are sick. Parents or guardians have a duty to keep you healthy and protected.'
  }
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    audience: 'child',
    scenario: 'Your older uncle tells you to keep a secret about a game where he touched your private parts and gives you a sweet. What should you do?',
    options: [
      { text: 'Keep the secret because he gave you a sweet.', isCorrect: false, feedback: 'Even if someone gives you gifts or sweets, they should never touch your private parts or ask you to keep secrets about it. Tell someone else!' },
      { text: 'Say "NO", walk away, and tell a trusted teacher or parent immediately.', isCorrect: true, feedback: 'Excellent! You are very brave. Secrets that make you feel bad or involve touches are bad secrets. Tell someone you trust right away.' },
      { text: 'Don’t tell anyone because you might get in trouble.', isCorrect: false, feedback: 'You will NEVER get in trouble for telling. The truth keeps you safe. Never be afraid to tell.' }
    ]
  },
  {
    id: 'q2',
    audience: 'child',
    scenario: 'A friend at school often comes to class with fresh bruises on their arms and is afraid of going home. What can you do?',
    options: [
      { text: 'Ignore it, because it is their family business.', isCorrect: false, feedback: 'No, friends protect friends. Realizing something is wrong is the first step to helping them stay safe.' },
      { text: 'Tell a teacher you trust or report it quietly in this app.', isCorrect: true, feedback: 'Wonderful! You are being a great and supportive friend. Telling a teacher helps your friend get the help their family needs.' },
      { text: 'Tease them about the marks.', isCorrect: false, feedback: 'No, teasing makes them feel sadder and more lonely. Always be kind.' }
    ]
  },
  {
    id: 'q3',
    audience: 'adult',
    scenario: 'A 9-year-old student frequently misses school on market days and appears with unwashed clothes and signs of weight loss. When asked, the parents claim they cannot afford school supplies and need her to work. How should you respond?',
    options: [
      { text: 'Accept it as a cultural norm or financial struggle beyond intervention.', isCorrect: false, feedback: 'Poverty should not validate educational and physical neglect. A balanced child abuse response must seek institutional support.' },
      { text: 'Report the concern as educational and physical neglect, and collaborate with local child protection authorities to support the family.', isCorrect: true, feedback: 'Correct! This is a typical case of neglect under the Children Act 2016. Reporting guides resources to the child while addressing parental duty.' },
      { text: 'Confront the parents aggressively and threaten them directly.', isCorrect: false, feedback: 'Aggressive confrontation might increase risks for the child. Professional reporting and guided case follow-up are always safer.' }
    ]
  },
  {
    id: 'q4',
    audience: 'adult',
    scenario: 'Under Ugandan Child Law (Children Act 2016), who has the legal duty to report suspected cases of child abuse in the community?',
    options: [
      { text: 'Only police officers and medical personnel.', isCorrect: false, feedback: 'According to Ugandan law, the duty is broader. Every citizen, particularly educators and neighbors, has a protective duty.' },
      { text: 'Any adult, teacher, neighbor, or family member who suspects harm or neglect.', isCorrect: true, feedback: 'Exactly. Section 11 of the Children Act highlights that any community member must report child abuse to local council or protection workers.' },
      { text: 'Only the child who is experiencing the abuse.', isCorrect: false, feedback: 'Children face massive structural and cognitive barriers to reporting. Adults are legally duty-bound to act on their behalf.' }
    ]
  }
];

export interface SignLanguageWord {
  word: string;
  signDescription: string;
  visualSymbols: string[];
  tipsForDeafChildren: string;
  visualDemo: string; // Dynamic vector movement or graphic hints
}

export const DEAF_DICTIONARY: SignLanguageWord[] = [
  {
    word: 'Hurt / Pain',
    signDescription: 'Bring both index fingers near each other (but not touching) and twist them in opposite directions near the place where you feel pain. Keep your face in a slight ouch expression.',
    visualSymbols: ['🤕', '⚡', '😢'],
    tipsForDeafChildren: 'Point to the exact part of your body that is hurt so people can help you feel better.',
    visualDemo: '👈 🔀 👉'
  },
  {
    word: 'Help',
    signDescription: 'Place your closed left hand (with thumb up) on top of your flat right palm, then lift both hands up together. This represents supporting another person.',
    visualSymbols: ['🤝', '🆘', '🫂'],
    tipsForDeafChildren: 'This is a very powerful sign. Show this to any teacher, parent, or nurse if you are feeling scared.',
    visualDemo: '✊ ⬆️ ✋'
  },
  {
    word: 'Safe / Comfort',
    signDescription: 'Cross both forearms over your chest with closed fists (like a warm hug or defensive shield), then pull them outwards and open your hands with your palms facing out, smiling with relief.',
    visualSymbols: ['🏡', '🦸', '🟢'],
    tipsForDeafChildren: 'You have the right to feel safe! A safe place is where your heart feels happy and peaceful.',
    visualDemo: '🙅 ➡️ 👐'
  },
  {
    word: 'Hate / Bad Touch',
    signDescription: 'Touch your thumb to your chin with fingers spread (the sign for "Mother" or "Father"), or make a pushing away hand motion towards the floor while shaking your head "NO" firmly.',
    visualSymbols: ['🛑', '🙅‍♀️', '⚠️'],
    tipsForDeafChildren: 'If someone touches your body and makes you feel sad, push your hands away like this "NO" sign. It is a BAD secret.',
    visualDemo: '✋ 🚫 👎'
  },
  {
    word: 'Teacher',
    signDescription: 'Bring both hands up near your temples with fingers pinched, double tap outwards (representing sharing knowledge), and then bring both hands down flat to represent a person.',
    visualSymbols: ['👩‍🏫', '🏫', '📚'],
    tipsForDeafChildren: 'Teachers at Ntinda and schools are your friends. They will listen to your sign language and protect you.',
    visualDemo: '🎓 👋👤'
  },
  {
    word: 'Secret (Secrets to share)',
    signDescription: 'Press your thumb against your lips (with your index finger closed) and tap twice. Then, open your hand and pull it away to show "telling the secret" or sharing the truth.',
    visualSymbols: ['🤫', '🗣️', '🔓'],
    tipsForDeafChildren: 'If a bad secret is heavy in your heart, open your hand, speak it out or sign it to a teacher. Telling is a good choice!',
    visualDemo: '🤫 🔓 🗣️'
  }
];
