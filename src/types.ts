export interface Report {
  id: string;
  reporterType: 'self' | 'someone_else' | 'student';
  abuseType: 'physical' | 'sexual' | 'emotional' | 'neglect' | 'unknown';
  description: string;
  symptoms: string[];
  isAnonymous: boolean;
  contactName?: string;
  contactPhone?: string;
  location?: string;
  schoolName?: string;
  status: 'received' | 'under_review' | 'case_worker_assigned' | 'resolved';
  timestamp: string;
}

export interface QuizQuestion {
  id: string;
  scenario: string;
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
  audience: 'child' | 'adult';
}

export interface AbuseDetail {
  title: string;
  description: string;
  childFriendlyDescription: string;
  causes: string[];
  forms: {
    name: string;
    description: string;
    illustration?: string;
  }[];
  signs: string[];
  reassurance: string;
}
