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
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="max-w-md w-full flex flex-col items-center gap-6">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <div className="inline-block p-3 rounded-2xl bg-white shadow-sm mb-2">
             <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                <path d="M7 2v20" />
                <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
             </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            오늘 뭐 먹지?
          </h1>
          <p className="text-slate-500 text-sm">
            고민하지 말고 버튼 하나로<br/>
            오늘 저녁 메뉴를 결정해보세요.
          </p>
        </div>

        {/* Content Section */}
        <div className="w-full transition-all duration-300 min-h-[300px] flex items-center justify-center">
          {loadingState === LoadingState.IDLE && (
            <div className="text-center p-8 bg-white/50 rounded-3xl border-2 border-slate-200 border-dashed w-full h-full flex flex-col items-center justify-center gap-4 text-slate-400">
              <span className="text-4xl filter grayscale opacity-50">🍽️</span>
              <p className="font-medium">버튼을 눌러<br/>메뉴를 추천받으세요!</p>
            </div>
          )}

          {loadingState === LoadingState.LOADING && (
            <div className="flex flex-col items-center gap-4 animate-pulse w-full">
               <div className="w-full h-72 bg-slate-200 rounded-3xl"></div>
               <div className="w-2/3 h-4 bg-slate-200 rounded"></div>
            </div>
          )}

          {loadingState === LoadingState.SUCCESS && recommendation && (
            <MenuCard data={recommendation} />
          )}

          {loadingState === LoadingState.ERROR && (
            <div className="text-center p-8 w-full bg-red-50 rounded-3xl border border-red-100 text-red-500">
              <p className="font-bold mb-2">잠시만 기다려주세요!</p>
              <p className="text-sm leading-relaxed">
                현재 이용자가 많아 응답이 지연되고 있어요.<br/>
                잠시 후 다시 버튼을 눌러주세요. 💦
              </p>
            </div>
          )}
        </div>

        {/* Action Section */}
        <div className="w-full">
          <SpinButton 
            onClick={handleSpin} 
            isLoading={loadingState === LoadingState.LOADING}
            hasData={loadingState === LoadingState.SUCCESS}
          />
          <p className="text-center text-xs text-slate-400 mt-4">
             Powered by Google Gemini
          </p>
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
                transform: translateY(20px) scale(0.95);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default App;