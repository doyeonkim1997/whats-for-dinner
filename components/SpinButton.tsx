import React from 'react';

interface SpinButtonProps {
  onClick: () => void;
  isLoading: boolean;
  hasData: boolean;
}

export const SpinButton: React.FC<SpinButtonProps> = ({ onClick, isLoading, hasData }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`
        relative overflow-hidden group w-full py-5 px-8 rounded-2xl 
        font-bold text-xl shadow-lg transition-all duration-300 transform
        ${isLoading 
          ? 'bg-slate-300 cursor-not-allowed scale-95' 
          : 'bg-blue-600 hover:bg-blue-500 hover:shadow-blue-500/30 active:scale-95'
        }
        text-white
      `}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            메뉴 고르는 중...
          </>
        ) : (
          '추첨 시작'
        )}
      </span>
      
      {/* Button Shine Effect */}
      {!isLoading && (
        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
      )}
    </button>
  );
};