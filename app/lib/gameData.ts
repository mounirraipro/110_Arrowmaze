export interface GameLevel {
  id: number;
  title: string;
  gridSize: string;
  gridCols: number;
  gridRows: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert' | 'Master';
  imageKeyword: string;
  imageThumbnail: string;
}

export interface GameCategory {
  slug: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  longDescription: string;
  levels: GameLevel[];
}

const categorySeed: Array<Omit<GameCategory, 'levels'>> = [
  {
    slug: 'beginner',
    name: 'Beginner',
    icon: '01',
    color: '#ef4444',
    description: 'Quick, friendly levels for relaxed browser play.',
    longDescription: 'Arrowmaze beginner levels are designed for fast starts, clear goals, and casual sessions.',
  },
  {
    slug: 'classic',
    name: 'Classic',
    icon: '02',
    color: '#22c55e',
    description: 'Balanced levels with familiar pacing and steady challenge.',
    longDescription: 'Arrowmaze classic levels give players a balanced route through the core game experience.',
  },
  {
    slug: 'challenge',
    name: 'Challenge',
    icon: '03',
    color: '#6c5ce7',
    description: 'Harder levels for players who want more focus.',
    longDescription: 'Arrowmaze challenge levels are built for players who enjoy tougher decisions and longer sessions.',
  },
  {
    slug: 'expert',
    name: 'Expert',
    icon: '04',
    color: '#e17055',
    description: 'Advanced levels for confident players.',
    longDescription: 'Arrowmaze expert levels collect the most demanding scenarios for experienced players.',
  },
];

const difficulties: GameLevel['difficulty'][] = ['Easy', 'Medium', 'Hard', 'Expert', 'Master'];

function createLevels(categoryName: string, startId: number): GameLevel[] {
  return difficulties.map((difficulty, index) => ({
    id: startId + index,
    title: `${categoryName} ${difficulty}`,
    gridSize: '3x3',
    gridCols: 3,
    gridRows: 3,
    difficulty,
    imageKeyword: `${categoryName.toLowerCase()}-${difficulty.toLowerCase()}`,
    imageThumbnail: '',
  }));
}

export const categories: GameCategory[] = categorySeed.map((category, index) => ({
  ...category,
  levels: createLevels(category.name, index * difficulties.length + 1),
}));

export function getCategoryBySlug(slug: string): GameCategory | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getLevelById(id: number): { category: GameCategory; level: GameLevel } | undefined {
  for (const category of categories) {
    const level = category.levels.find((item) => item.id === id);
    if (level) return { category, level };
  }
  return undefined;
}

export function getAllLevels(): { category: GameCategory; level: GameLevel }[] {
  return categories.flatMap((category) => category.levels.map((level) => ({ category, level })));
}
