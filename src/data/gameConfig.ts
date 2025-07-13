import { Species, TreeNodeData } from '../types/game';
import { marineSpecies, treeNodes } from './gameData'; // adjust path if needed

// Configuration object that makes it easy to modify the game
export const gameConfig = {
  // Game metadata
  gameTitle: "Ocean Family Tree",
  gameDescription: "Discover the evolutionary relationships of marine life!",
  educationalContent: "This phylogenetic tree shows the evolutionary relationships between different marine organisms. Each branch represents a common ancestor, and organisms that share more recent common ancestors are more closely related. Understanding these relationships helps marine biologists study biodiversity, evolution, and ecosystem dynamics in our oceans.",

  // Scoring system
  scoring: {
    correctPlacement: 10,
    incorrectPlacement: -2
  },

  // Tree configuration
  // Tree configuration
  treeConfig: {
    width: 400,
    height: 600,
    branches: [] as Array<{ x1: number, y1: number, x2: number, y2: number }>
  },


  // Species data
   marineSpecies,
  // Tree nodes configuration
  treeNodes: [
  {
    id: '1',
    // // label: '1',
    x: 28,
    y: 10,
    correctSpecies: ['dugong']
  },
  {
    id: '2',
    // label: '2',
    x: 22,
    y: 20,
    correctSpecies: ['primate']
  },
  {
    id: '3',
    // label: '3',
    x: 16,
    y: 29,
    correctSpecies: ['dolphin']
  },
  {
    id: '4',
    // label: '4',
    x: 24,
    y: 38,
    correctSpecies: ['whale']
  },
  {
    id: '5',
    // label: '5',
    x: 35,
    y: 36.5,
    correctSpecies: ['bony-fish']
  },
  {
    id: '6',
    // label: '6',
    x: 30,
    y: 47,
    correctSpecies: ['sea-cucumber']
  },
  {
    id: '7',
    // label: '7',
    x: 25,
    y: 57,
    correctSpecies: ['sea-star']
  },
  {
    id: '8',
    // label: '8',
    x: 30,
    y: 68,
    correctSpecies: ['sea-urchin']
  },
  {
    id: '9',
    // label: '9',
    x: 66,
    y: 83,
    correctSpecies: ['jelly-fish']
  },
  {
    id: '10',
    // label: '10',
    x: 74.5,
    y: 78,
    correctSpecies: ['sea-anemone']
  },
  {
    id: '11',
    // label: '11',
    x: 74,
    y: 68,
    correctSpecies: ['coral']
  },
  {
    id: '12',
    // label: '12',
    x: 72,
    y: 58,
    correctSpecies: ['clam']
  },
  {
    id: '13',
    // label: '13',
    x: 80,
    y: 52,
    correctSpecies: ['octopus']
  },
  {
    id: '14',
    // label: '14',
    x: 77,
    y: 43,
    correctSpecies: ['slug']
  },
  {
    id: '15',
    // label: '15',
    x: 73,
    y: 38,
    correctSpecies: ['crab']
  },
  {
    id: '16',
    // label: '16',
    x: 66,
    y: 32,
    correctSpecies: ['lobster']
  },
  {
    id: '17',
    // label: '17',
    x: 58,
    y:33,
    correctSpecies: ['shrimp']
  },
  {
    id: '18',
    // label: '18',
    x: 51,
    y: 40,
    correctSpecies: ['shark']
  },
  {
    id: '19',
    // label: '19',
    x: 65,
    y: 21,
    correctSpecies: ['sea-snake']
  },
  {
    id: '20',
    // label: '20',
    x: 58,
    y: 13,
    correctSpecies: ['sea-turtle']
  },
  {
    id: '21',
    // label: '21',
    x: 48,
    y: 15,
    correctSpecies: ['sea-bird']
  },
  {
    id: '22',
    // label: '22',
    x: 40,
    y: 9,
    correctSpecies: ['manatte']
  },
  
  
] as TreeNodeData[],

  // Validation logic - easily modifiable
  validatePlacement: (nodeId: string, speciesId: string): boolean => {
    const node = gameConfig.treeNodes.find(n => n.id === nodeId);
    return node ? node.correctSpecies.includes(speciesId) : false;
  },

  // Educational information for each correct placement
  getEducationalInfo: (speciesId: string, nodeId: string): string | null => {
    const educationalMap: Record<string, Record<string, string>> = {
      'jellyfish': {
        'cnidaria': 'Jellyfish are cnidarians with specialized stinging cells called nematocysts!'
      },
      'octopus': {
        'mollusca': 'Octopuses are highly intelligent mollusks with complex problem-solving abilities!'
      },
      'whale': {
        'mammalia': 'Whales are marine mammals that evolved from land animals millions of years ago!'
      },
      'shark': {
        'fish': 'Sharks are cartilaginous fish that have remained virtually unchanged for 400 million years!'
      },
      'sea-star': {
        'echinodermata': 'Sea stars can regenerate lost arms and have a unique water vascular system!'
      }
    };

    return educationalMap[speciesId]?.[nodeId] || null;
  }
};

// Helper function to easily add new species
export const addSpecies = (newSpecies: Species[]): void => {
  gameConfig.marineSpecies.push(...newSpecies);
};

// Helper function to easily modify tree structure
export const updateTreeNodes = (newNodes: TreeNodeData[]): void => {
  gameConfig.treeNodes.length = 0;
  gameConfig.treeNodes.push(...newNodes);
};

// Helper function to add new tree branches
export const addTreeBranches = (newBranches: Array<{x1: number, y1: number, x2: number, y2: number}>): void => {
  gameConfig.treeConfig.branches.push(...newBranches);
};