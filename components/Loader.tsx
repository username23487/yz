import React from 'react';

const Loader: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-6">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-indigo-500/30 rounded-full animate-pulse"></div>
        <div className="absolute inset-2 border-4 border-t-purple-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl animate-bounce">⏳</span>
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Traveling Through Time...
        </h3>
        <p className="text-slate-400 mt-2 text-sm">{text}</p>
      </div>
    </div>
  );
};

export default Loader;
