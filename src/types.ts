export type Niche = 'computer' | 'gold' | 'parfum' | 'heritage';

export interface Product {
  id: string;
  name: string;
  description: string;
  niche: Niche;
  price: {
    idr: number;
    usd: number;
  };
  tier: 'lead_magnet' | 'tripwire' | 'core' | 'premium';
  icon: string;
  image?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'vibe-coding-library',
    name: 'Vibe-Coding Expert Prompt Library',
    description: 'Precision instructions for building specific SaaS modules.',
    niche: 'computer',
    price: { idr: 250000, usd: 19 },
    tier: 'tripwire',
    icon: 'Terminal',
    image: 'https://picsum.photos/seed/computer/800/600'
  },
  {
    id: 'wealth-tech-dashboard',
    name: 'WealthTech Lite Dashboard',
    description: 'Real-time gold tracking and macro analysis tool.',
    niche: 'gold',
    price: { idr: 150000, usd: 12 },
    tier: 'tripwire',
    icon: 'LineChart',
    image: 'https://picsum.photos/seed/gold/800/600'
  },
  {
    id: 'bpom-automation',
    name: 'BPOM Notifkos Ready Pack',
    description: 'Automated documentation for cosmetic certification.',
    niche: 'parfum',
    price: { idr: 550000, usd: 39 },
    tier: 'core',
    icon: 'PackageCheck',
    image: 'https://picsum.photos/seed/parfum/800/600'
  },
  {
    id: 'fractal-motif-generator',
    name: 'JBatik Fractal AI Generator',
    description: 'AI-driven mathematical fractal batik motif generator.',
    niche: 'heritage',
    price: { idr: 1500000, usd: 99 },
    tier: 'core',
    icon: 'Palette',
    image: 'https://picsum.photos/seed/heritage/800/600'
  }
];
