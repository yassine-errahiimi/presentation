
import React, { useState, useEffect, useCallback } from 'react';
import { SLIDES } from './data';
import { SlideContent } from './types';
import BraceletImage from './components/BraceletImage';

const App: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (currentIdx < SLIDES.length - 1) {
      setIsAnimating(true);
      setCurrentIdx(prev => prev + 1);
      setTimeout(() => setIsAnimating(false), 500);
    }
  }, [currentIdx]);

  const prevSlide = useCallback(() => {
    if (currentIdx > 0) {
      setIsAnimating(true);
      setCurrentIdx(prev => prev - 1);
      setTimeout(() => setIsAnimating(false), 500);
    }
  }, [currentIdx]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const slide = SLIDES[currentIdx];

  return (
    <div className={`min-h-screen w-full transition-colors duration-700 ${slide.color} flex flex-col items-center justify-center p-4 md:p-8 font-serif`}>
      
      {/* Header / Nav */}
      <div className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">T</div>
          <span className="text-xl font-bold tracking-tight hidden md:block">TifaouT Bracelet</span>
        </div>
        <div className="flex gap-2">
          {SLIDES.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 transition-all duration-300 rounded-full ${idx === currentIdx ? 'w-8 bg-amber-600' : 'w-2 bg-stone-300'}`}
              onClick={() => setCurrentIdx(idx)}
            />
          ))}
        </div>
        <div className="text-sm font-medium opacity-60">
          {currentIdx + 1} / {SLIDES.length}
        </div>
      </div>

      {/* Slide Container */}
      <main className={`max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center transition-all duration-500 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        
        {/* Text Content */}
        <div className="order-2 md:order-1 flex flex-col gap-6 text-right" dir="rtl">
          <div className="flex items-center gap-4">
             <span className="text-4xl md:text-6xl">{slide.emoji}</span>
             <div>
                <span className="text-amber-600 font-bold uppercase tracking-widest text-sm mb-1 block">{slide.stage}</span>
                <h1 className="text-3xl md:text-5xl font-extrabold text-stone-900 leading-tight font-serif">
                    {slide.title}
                </h1>
             </div>
          </div>
          
          {slide.subtitle && (
            <p className="text-lg md:text-xl text-stone-600 font-medium italic">
                {slide.subtitle}
            </p>
          )}

          <div className="space-y-4 mt-4">
            {slide.points.map((point, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/40 p-4 rounded-xl backdrop-blur-sm border border-white/20 shadow-sm transition-transform hover:translate-x-[-4px]">
                <div className="w-2 h-2 mt-2 rounded-full bg-amber-500 shrink-0" />
                <p className="text-lg md:text-xl text-stone-800 font-medium leading-relaxed font-sans">{point}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Image Generation Area */}
        <div className="order-1 md:order-2">
            <BraceletImage prompt={slide.imagePrompt} id={slide.id} />
        </div>
      </main>

      {/* Footer Controls */}
      <div className="fixed bottom-0 left-0 right-0 p-8 flex justify-between items-center">
        <button 
          onClick={prevSlide}
          disabled={currentIdx === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${currentIdx === 0 ? 'opacity-20 cursor-not-allowed' : 'bg-white shadow-md hover:shadow-xl hover:-translate-y-1 active:scale-95 text-stone-800'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          السابق
        </button>

        <button 
          onClick={nextSlide}
          disabled={currentIdx === SLIDES.length - 1}
          className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all ${currentIdx === SLIDES.length - 1 ? 'opacity-20 cursor-not-allowed' : 'bg-amber-600 text-white shadow-lg hover:bg-amber-700 hover:-translate-y-1 active:scale-95'}`}
        >
          التالي
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>

      {/* Bottom Hint */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 text-xs text-stone-400 font-medium hidden md:block">
        استخدم الأسهم أو المسافة (Space) للتنقل بين الشرائح
      </div>
    </div>
  );
};

export default App;
