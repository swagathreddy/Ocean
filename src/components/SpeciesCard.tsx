import React, { useRef } from 'react';
import { Species } from '../types/game';

interface SpeciesCardProps {
  species: Species;
  isDragging: boolean;
  onDragStart: (species: Species) => void;
}

export const SpeciesCard: React.FC<SpeciesCardProps> = ({
  species,
  isDragging,
  onDragStart,
}) => {
  const touchRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('application/json', JSON.stringify(species));
    onDragStart(species);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault(); // Prevent scroll
    onDragStart(species); // Acts like selection
  };

  return (
    <div
      ref={touchRef}
      draggable
      onDragStart={handleDragStart}
      onTouchStart={handleTouchStart}
      className={`relative flex flex-col items-center w-20 h-24 sm:w-24 sm:h-28 md:w-28 md:h-32 
        cursor-move transition-transform duration-200 
        ${isDragging ? 'opacity-40 scale-95' : 'opacity-100 hover:scale-105'}`}
    >
      <div className="w-full h-full rounded-full overflow-hidden border-2 border-white shadow-md">
        <img
          src={species.image}
          alt={species.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mt-1 text-[10px] sm:text-xs md:text-sm text-center font-medium text-gray-800 bg-white px-2 py-0.5 rounded shadow-sm">
        {species.name}
      </div>
    </div>
  );
};
