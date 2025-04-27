import { useEffect, useState } from "react";

const Preloader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-navy-dark flex flex-col justify-center items-center z-[9999]">
      <div className="mb-8">
        <div className="inline-block relative w-20 h-20">
          <div className="absolute top-[33px] w-3 h-3 rounded-full bg-gold animate-[loader1_0.6s_cubic-bezier(0,1,1,0)_infinite] left-2"></div>
          <div className="absolute top-[33px] w-3 h-3 rounded-full bg-gold animate-[loader2_0.6s_cubic-bezier(0,1,1,0)_infinite] left-2"></div>
          <div className="absolute top-[33px] w-3 h-3 rounded-full bg-gold animate-[loader2_0.6s_cubic-bezier(0,1,1,0)_infinite] left-8"></div>
          <div className="absolute top-[33px] w-3 h-3 rounded-full bg-gold animate-[loader3_0.6s_cubic-bezier(0,1,1,0)_infinite] left-14"></div>
        </div>
      </div>
      
      <div className="w-64 h-1 bg-navy-light rounded-full overflow-hidden">
        <div 
          className="h-full bg-gold rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <p className="text-gold font-mono mt-4 text-sm">
        {Math.round(progress)}%
      </p>
    </div>
  );
};

export default Preloader;
