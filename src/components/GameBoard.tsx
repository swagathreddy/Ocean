import React, { useState, useRef } from 'react';
import { TreeNode } from './TreeNode';
import { SpeciesCard } from './SpeciesCard';
import { Species, GameState } from '../types/game';
import { gameConfig } from '../data/gameConfig';

export const GameBoard: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    nodes: gameConfig.treeNodes,
    availableSpecies: gameConfig.marineSpecies,
    score: 0,
    correctPlacements: 0,
    totalPlacements: 0
  });

  const [draggedSpecies, setDraggedSpecies] = useState<Species | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [feedbackType, setFeedbackType] = useState<'success' | 'error' | ''>('');
  const treeRef = useRef<HTMLDivElement>(null);

  const handleDrop = (nodeId: string, species: Species) => {
    const node = gameState.nodes.find(n => n.id === nodeId);
    if (!node || node.placedSpecies) return;

    const isCorrect = gameConfig.validatePlacement(nodeId, species.id);

    setGameState(prev => ({
      ...prev,
      nodes: prev.nodes.map(n =>
        n.id === nodeId
          ? { ...n, placedSpecies: species, isCorrect }
          : n
      ),
      availableSpecies: prev.availableSpecies.filter(s => s.id !== species.id),
      score: prev.score + (isCorrect ? gameConfig.scoring.correctPlacement : gameConfig.scoring.incorrectPlacement),
      correctPlacements: prev.correctPlacements + (isCorrect ? 1 : 0),
      totalPlacements: prev.totalPlacements + 1
    }));

    if (isCorrect) {
      setFeedback(`✅ Excellent!`);
      setFeedbackType('success');

      const educationalInfo = gameConfig.getEducationalInfo(species.id, nodeId);
      if (educationalInfo) {
        setTimeout(() => {
          setFeedback(`🌊 ${educationalInfo}`);
        }, 2000);
      }
    } else {
      setFeedback(`❌ Not quite right! ${species.name} doesn't belong in ${node.label}. Think about its characteristics and try again!`);
      setFeedbackType('error');

      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          nodes: prev.nodes.map(n =>
            n.id === nodeId
              ? { ...n, placedSpecies: undefined, isCorrect: undefined }
              : n
          ),
          availableSpecies: [...prev.availableSpecies, species].sort((a, b) => a.name.localeCompare(b.name))
        }));
      }, 3000);
    }

    setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 4000);
  };

  const handleDragStart = (species: Species) => {
    setDraggedSpecies(species);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleNodeClick = (nodeId: string) => {
  if (window.innerWidth > 768 || !draggedSpecies) return; // Only allow on mobile and when species is selected

  handleDrop(nodeId, draggedSpecies); // Reuse same drop logic
  setDraggedSpecies(null); // Clear selected species
};


  const resetGame = () => {
    setGameState({
      nodes: gameConfig.treeNodes.map(node => ({
        ...node,
        placedSpecies: undefined,
        isCorrect: undefined
      })),
      availableSpecies: gameConfig.marineSpecies,
      score: 0,
      correctPlacements: 0,
      totalPlacements: 0
    });
    setFeedback('');
    setFeedbackType('');
  };

  const completedNodes = gameState.nodes.filter(n => n.placedSpecies && n.isCorrect).length;
  const totalNodes = gameState.nodes.filter(n => n.correctSpecies.length > 0).length;
  const progressPercentage = (completedNodes / totalNodes) * 100;
  const totalSpecies = gameConfig.marineSpecies.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">{gameConfig.gameTitle}</h1>
          <p className="text-blue-700 text-lg">{gameConfig.gameDescription}</p>
        </div>

        {/* Game Stats */}
        
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
    <div className="flex flex-wrap justify-center gap-6">
      <StatBox label="Score" value={gameState.score} color="blue" />
      <StatBox label="Correct" value={gameState.correctPlacements} color="green" />
      <StatBox label="Incorrect" value={gameState.totalPlacements - gameState.correctPlacements} color="red" />
      <StatBox label="Completed" value={`${gameState.correctPlacements}/${totalSpecies}`} color="orange" />

    </div>
    
    <div className="flex items-center space-x-4 self-center md:self-auto">
      <div className="w-28 bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <button
        onClick={resetGame}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Reset Game
      </button>
    </div>
  </div>
</div>


        {/* Feedback */}
        {feedback && (
          <div className={`border-l-4 p-4 mb-6 rounded-r-lg shadow-md ${
            feedbackType === 'success'
              ? 'bg-green-50 border-green-500 text-green-800'
              : feedbackType === 'error'
              ? 'bg-red-50 border-red-500 text-red-800'
              : 'bg-blue-50 border-blue-500 text-blue-800'
          }`}>
            <p className="font-medium">{feedback}</p>
          </div>
        )}

        {/* Tree Area */}
        <p className="text-sm text-blue-700 text-center mb-2 md:hidden">
          🔍 Scroll left and right to explore the full tree on smaller screens.
        </p>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
  <div className="w-full overflow-x-auto">
    <div
      ref={treeRef}
      className="w-[600px] h-[600px] relative mx-auto bg-gradient-to-b from-sky-50 to-blue-50 rounded-lg border-2 border-blue-200"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23bfdbfe' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        overflow: 'hidden'
      }}
      onDragOver={handleDragOver}
    >
  


              <div
                className="absolute inset-0 w-full h-full bg-contain bg-center bg-no-repeat opacity-100"
                style={{
                  backgroundImage: `url("/tree.png")`
                }}
              />
              {gameState.nodes.map((node) => (
               <TreeNode
                  key={node.id}
                  node={node}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  isEmpty={!node.placedSpecies}
                  onClick={() => handleNodeClick(node.id)}
                />

              ))}
            </div>
          </div>
        </div>

        {/* Species Collection */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Marine Species Collection ({gameState.availableSpecies.length} remaining)
          </h3>
          <p className="text-sm text-blue-700 mb-2 block md:hidden text-center">
            📱 Tap a species to select, then tap a circle on the tree to place it.
          </p>
          <p className="text-sm text-blue-700 mb-2 hidden md:block text-center">
            🖱️ Drag and drop each species onto the correct location on the tree.
          </p>

          <div className="grid grid-cols-4 sm:grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 justify-items-center">
            {gameState.availableSpecies.map((species) => (
              <SpeciesCard
                key={species.id}
                species={species}
                onDragStart={handleDragStart}
                isDragging={draggedSpecies?.id === species.id}
              />
            ))}
          </div>
          {gameState.availableSpecies.length === 0 && (
            <div className="text-center py-8">
              <div className="text-2xl font-bold text-green-600 mb-2">🎉 Congratulations!</div>
              <p className="text-gray-600">You've successfully classified all marine species!</p>
              <p className="text-sm text-gray-500 mt-2">
                Final Score: {gameState.score} points ({gameState.correctPlacements}/{gameState.totalPlacements} correct)
              </p>
            </div>
          )}
        </div>

        {/* Educational Info */}
        <div className="mt-6 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">🌊 Learn About Marine Taxonomy</h3>
          <p className="text-blue-800 text-sm leading-relaxed">
            {gameConfig.educationalContent}
          </p>
        </div>
      </div>
    </div>
  );
};

const StatBox = ({ label, value, color }: { label: string, value: React.ReactNode, color: string }) => (
  <div className="text-center">
    <div className={`text-2xl font-bold text-${color}-600`}>{value}</div>
    <div className="text-sm text-gray-600">{label}</div>
  </div>
);
