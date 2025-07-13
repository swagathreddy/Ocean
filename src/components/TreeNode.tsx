import React from 'react';
import { TreeNodeData, Species } from '../types/game';

interface TreeNodeProps {
  node: TreeNodeData;
  onDrop: (nodeId: string, species: Species) => void;
  onDragOver: (e: React.DragEvent) => void;
  isEmpty: boolean;
  onClick?: () => void;
  
}

export const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  onDrop,
  onDragOver,
  isEmpty,
   onClick 
}) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const speciesData = e.dataTransfer.getData('application/json');
    if (!speciesData) return;
    const species: Species = JSON.parse(speciesData);
    onDrop(node.id, species);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    onDragOver(e);
  };

  const getNodeStyle = () => {
    if (isEmpty) {
      return 'border-blue-300 bg-blue-50 hover:border-blue-400 hover:bg-blue-100';
    }
    if (node.isCorrect === true) {
      return 'border-green-500 bg-green-100 animate-pulse';
    }
    if (node.isCorrect === false) {
      return 'border-red-500 bg-red-100 animate-bounce';
    }
    return 'border-gray-300 bg-gray-50';
  };

  return (
    <div
    onClick={onClick} 
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={`relative w-14 h-14 rounded-full border-2 border-dashed transition-all duration-300 ${getNodeStyle()}`}
      style={{
        position: 'absolute',
        left: `${node.x}%`,
        top: `${node.y}%`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      {/* Placed species image */}
      {node.placedSpecies && (
        <div className="w-full h-full rounded-full overflow-hidden">
          <img
            src={node.placedSpecies.image}
            alt={node.placedSpecies.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Pulsing dot for empty */}
      {isEmpty && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        </div>
      )}

      {/* ❌ Incorrect */}
      {node.isCorrect === false && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">✕</span>
        </div>
      )}

      {/* ✅ Correct */}
      {node.isCorrect === true && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">✓</span>
        </div>
      )}

      {/* Node label */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 whitespace-nowrap">
        {node.label}
      </div>
    </div>
  );
};
