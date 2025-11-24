import React, { useState } from 'react';
import { getDinnerRecommendation } from './services/geminiService';
import { DinnerRecommendation, LoadingState } from './types';
import { MenuCard } from './components/MenuCard';
import { SpinButton } from './components/SpinButton';

const App: React.FC = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [recommendation, setRecommendation] = useState<DinnerRecommendation | null>(null);
  
  const handleSpin = async () => {
    setLoadingState(LoadingState.LOADING);
    try {
      // Add a minimum delay for better UX (to show the loading state clearly)
      const [data] = await Promise.all([
        getDinnerRecommendation(),
        new Promise(resolve => setTimeout(resolve, 800))
      ]);
      setRecommendation(data);
      setLoadingState(LoadingState.SUCCESS);
    } catch (error) {
      console.error(error);
      setLoadingState(LoadingState.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-start justify-center pt-8 sm:pt-20 p-4 font-sans">
      <div className="max-w-md w-full flex flex-col items-center gap-4">
        
        {/* Header Section */}
        <div className="text-center space-y-1 sm:space-y-2 mb-2">
          <div className="inline-block p-2 sm:p-3 rounded-2xl bg-white shadow-sm mb-1">
             <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 sm:w-8 sm:h-8">
                <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                <path d="M7 2v20" />
                <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
             </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            오늘 뭐 먹지?
          </h1>
          <p className="text-slate-500 text-base sm:text-lg font-medium mt-1">
            고민하지 말고 버튼 하나로 오늘 저녁 메뉴를 결정해보세요.
          </p>
        </div>

        {/* Content Section - STRICT FIXED HEIGHT */}
        <div className="w-full h-[380px] sm:h-[420px] relative">
          {loadingState === LoadingState.IDLE && (
            <div className="w-full h-full text-center p-6 sm:p-8 bg-white/50 rounded-3xl border-2 border-slate-200 border-dashed flex flex-col items-center justify-center gap-6 text-slate-400">
              <span className="text-5xl sm:text-6xl filter grayscale opacity-50">🍽️</span>
              <p className="text-lg sm:text-xl font-bold text-slate-400">아래 버튼을 눌러주세요!</p>
            </div>
          )}

          {loadingState === LoadingState.LOADING && (
            <div className="w-full h-full bg-white rounded-3xl p-8 border border-blue-50 shadow-sm flex flex-col animate-pulse">
               <div className="flex justify-between w-full mb-8">
                 <div className="h-6 w-16 bg-slate-100 rounded-full"></div>
                 <div className="h-4 w-20 bg-slate-100 rounded"></div>
               </div>
               <div className="flex-grow flex flex-col justify-center items-center gap-4">
                 <div className="h-12 w-3/4 bg-slate-100 rounded-lg"></div>
                 <div className="h-1 w-12 bg-slate-100 rounded-full"></div>
                 <div className="h-4 w-full bg-slate-100 rounded"></div>
                 <div className="h-4 w-2/3 bg-slate-100 rounded"></div>
               </div>
               <div className="flex justify-center gap-2 mt-auto pt-6">
                 <div className="h-8 w-16 bg-slate-100 rounded-lg"></div>
                 <div className="h-8 w-16 bg-slate-100 rounded-lg"></div>
                 <div className="h-8 w-16 bg-slate-100 rounded-lg"></div>
               </div>
            </div>
          )}

          {loadingState === LoadingState.SUCCESS && recommendation && (
            <MenuCard data={recommendation} />
          )}

          {loadingState === LoadingState.ERROR && (
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 sm:p-8 bg-red-50 rounded-3xl border border-red-100 text-red-500">
              <div className="bg-red-100 p-3 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="font-bold mb-2 text-lg">잠시만 기다려주세요!</p>
              <p className="text-sm leading-relaxed opacity-80">
                이용자가 많아 연결이 지연되고 있어요.<br/>
                잠시 후 다시 시도해주세요.
              </p>
            </div>
          )}
        </div>

        {/* Action Section */}
        <div className="w-full mt-2">
          <SpinButton 
            onClick={handleSpin} 
            isLoading={loadingState === LoadingState.LOADING}
            hasData={loadingState === LoadingState.SUCCESS}
          />
        </div>

      </div>
      
      <style>{`
        @keyframes shine {
          100% {
            left: 125%;
          }
        }
        .animate-shine {
          animation: shine 1s;
        }
        @keyframes fade-in-up {
            0% {
                opacity: 0;
                transform: translateY(10px) scale(0.98);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default App;