export type Domain = 'development' | 'security' | 'deployment' | 'troubleshooting';

export interface DomainInfo {
  id: Domain;
  label: string;
  shortLabel: string;
  weight: number;
  color: string;
  icon: string;
}

export const DOMAINS: DomainInfo[] = [
  {
    id: 'development',
    label: 'Development with AWS Services',
    shortLabel: 'Development',
    weight: 32,
    color: '#ff9900',
    icon: '🛠️',
  },
  {
    id: 'security',
    label: 'Security',
    shortLabel: 'Security',
    weight: 26,
    color: '#22c55e',
    icon: '🔐',
  },
  {
    id: 'deployment',
    label: 'Deployment',
    shortLabel: 'Deployment',
    weight: 24,
    color: '#38bdf8',
    icon: '🚀',
  },
  {
    id: 'troubleshooting',
    label: 'Troubleshooting and Optimization',
    shortLabel: 'Troubleshooting',
    weight: 18,
    color: '#f472b6',
    icon: '🩺',
  },
];

export interface QuizQuestion {
  id: string;
  domain: Domain;
  question: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
}

export interface Flashcard {
  id: string;
  domain: Domain;
  front: string;
  back: string;
}

export interface CheatSheetSection {
  heading: string;
  points: string[];
}

export interface CheatSheet {
  slug: string;
  title: string;
  icon: string;
  domain: Domain;
  summary: string;
  sections: CheatSheetSection[];
}
