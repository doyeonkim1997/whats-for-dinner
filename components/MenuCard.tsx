import React from 'react';
import { DinnerRecommendation } from '../types';

interface MenuCardProps {
  data: DinnerRecommendation;
}

export const MenuCard: React.FC<MenuCardProps> = ({ data }) => {
  return (
    <div className="w-full bg-white rounded-3xl p-8 shadow-2xl border border-blue-50 transform transition-all duration-500 hover:scale-[1.02] animate-fade-in-up">
      <div className="flex justify-between items-center mb-4">
        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase tracking-wider">
          {data.category}
        </span>
        <span className="text-slate-400 text-xs font-medium">
          {data.calories}
        </span>
      </div>
      
      <div className="text-center my-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4 leading-tight break-keep">
          {data.name}
        </h2>
        <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full mb-6"></div>
        <p className="text-slate-600 text-lg font-medium leading-relaxed break-keep">
          {data.description}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mt-6">
        {data.tags && data.tags.map((tag, index) => (
          <span 
            key={index}
            className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 text-sm font-bold border border-slate-200 shadow-sm"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};