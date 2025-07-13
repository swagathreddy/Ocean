export interface Species {
  id: string;
  name: string;
  image: string;
  taxonomy: {
    kingdom: string;
    phylum: string;
    class?: string;
    order?: string;
    family?: string;
  };
  characteristics: string[];
}

export interface TreeNodeData {
  id: string;
  label: string;
  x: number; // percentage position
  y: number; // percentage position
  correctSpecies: string[]; // array of species IDs that belong here
  placedSpecies?: Species;
  isCorrect?: boolean;
}

export interface GameState {
  nodes: TreeNodeData[];
  availableSpecies: Species[];
  score: number;
  correctPlacements: number;
  totalPlacements: number;
}