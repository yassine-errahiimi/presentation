
import React, { useState, useEffect } from 'react';
import { generateSlideImage } from '../services/geminiService';

interface BraceletImageProps {
  prompt: string;
  id: number;
}

const BraceletImage: React.FC<BraceletImageProps> = ({ prompt, id }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchImage = async () => {
      setLoading(true);
      setError(false);
      try {
        const url = await generateSlideImage(prompt);
        if (isMounted) {
          if (url) {
            setImageUrl(url);
          } else {
            setError(true);
          }
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(true);
          setLoading(false);
        }
      }
    };

    fetchImage();
    return () => { isMounted = false; };
  }, [prompt, id]);

  if (loading) {
    return (
      <div className="w-full h-64 md:h-full bg-stone-200 animate-pulse flex items-center justify-center rounded-2xl overflow-hidden">
        <div className="text-stone-400 flex flex-col items-center">
          <svg className="w-12 h-12 mb-2 animate-spin" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-sm font-medium">جاري إنشاء الصورة...</span>
        </div>
      </div>
    );
  }

  if (error || !imageUrl) {
    return (
      <div className="w-full h-64 md:h-full bg-stone-100 flex items-center justify-center rounded-2xl overflow-hidden border border-stone-200">
        <img 
          src={`https://picsum.photos/seed/${id}/800/450`} 
          alt="Placeholder" 
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-64 md:h-full rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 hover:scale-[1.02]">
      <img src={imageUrl} alt="Bracelet Visual" className="w-full h-full object-cover" />
    </div>
  );
};

export default BraceletImage;
