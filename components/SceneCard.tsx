import React from 'react';
import { Scene } from '../types';

interface SceneCardProps {
  scene: Scene;
  isSelected: boolean;
  onSelect: (scene: Scene) => void;
}

const SceneCard: React.FC<SceneCardProps> = ({ scene, isSelected, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(scene)}
      className={`relative group overflow-hidden rounded-2xl p-6 text-left transition-all duration-300 w-full h-40 flex flex-col justify-between
        ${isSelected 
          ? `bg-gradient-to-br ${scene.color} ring-4 ring-white shadow-xl scale-105 z-10` 
          : 'bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-500'
        }
      `}
    >
      <div className="flex justify-between items-start">
        <span className="text-4xl filter drop-shadow-md">{scene.icon}</span>
        {isSelected && (
          <div className="bg-white text-black rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
        )}
      </div>
      
      <div>
        <h3 className={`font-bold text-lg leading-tight mb-1 ${isSelected ? 'text-white' : 'text-slate-100'}`}>
          {scene.title}
        </h3>
        <p className={`text-xs ${isSelected ? 'text-white/90' : 'text-slate-400'}`}>
          {scene.description}
        </p>
      </div>
    </button>
  );
};

export default SceneCard;
