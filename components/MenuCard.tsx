import React from 'react';
import { DinnerRecommendation } from '../types';

interface MenuCardProps {
  data: DinnerRecommendation;
}

export const MenuCard: React.FC<MenuCardProps> = ({ data }) => {
  return (
    <div className="w-full h-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-blue-50 transform transition-all duration-500 animate-fade-in-up flex flex-col">
      {/* Top Section: Category & Calories */}
      <div className="flex justify-between items-center mb-4 shrink-0">
        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase tracking-wider">
          {data.category}
        </span>
        <span className="text-slate-400 text-xs font-medium">
          {data.calories}
        </span>
      </div>
      
      {/* Middle Section: Main Content (Grows to fill space) */}
      <div className="flex-grow flex flex-col justify-center items-center text-center my-2">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-800 mb-5 leading-tight break-keep">
          {data.name}
        </h2>
        <div className="h-1 w-16 bg-blue-500 mx-auto rounded-full mb-6 opacity-80"></div>
        <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed break-keep px-2">
          {data.description}
        </p>
      </div>

      {/* Bottom Section: Tags */}
      <div className="flex flex-wrap justify-center gap-2 mt-4 shrink-0">
        {data.tags && data.tags.map((tag, index) => (
          <span 
            key={index}
            className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs sm:text-sm font-bold border border-slate-200 shadow-sm"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};