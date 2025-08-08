import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useGameStore } from '@/stores/gameStore';

export function PracticeSessionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const name = (location.state as { name?: string })?.name;
  const { currentPractice, startPractice, recordPracticeShot, endPractice } =
    useGameStore();

  useEffect(() => {
    if (!name) {
      navigate('/practice');
      return;
    }
    if (!currentPractice) {
      startPractice(name);
    }
  }, [name, currentPractice, startPractice, navigate]);

  if (!name) return null;

  const makes = currentPractice?.makes ?? 0;
  const misses = currentPractice?.misses ?? 0;
  const total = makes + misses;

  const handleEnd = () => {
    endPractice();
    navigate('/');
  };

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Top controls */}
      <div className="absolute top-4 right-4 z-10">
        <Button variant="destructive" size="sm" onClick={handleEnd}>
          End
        </Button>
      </div>
      {/* Centered total shots */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-green-500 font-semibold">
        {total} shots
      </div>

      {/* Main content */}
      <div className="flex flex-col h-full">
        {/* Top section: Make */}
        <div
          className="flex-1 bg-white/5 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors border-b border-white/10"
          onClick={() => recordPracticeShot(true)}
        >
          <div className="text-center">
            <div className="text-2xl font-semibold text-slate-200 mb-2">
              Make
            </div>
            <div className="text-6xl font-bold text-white">{makes}</div>
          </div>
        </div>

        {/* Bottom section: Miss */}
        <div
          className="flex-1 bg-white/5 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors"
          onClick={() => recordPracticeShot(false)}
        >
          <div className="text-center">
            <div className="text-2xl font-semibold text-slate-200 mb-2">
              Miss
            </div>
            <div className="text-6xl font-bold text-white">{misses}</div>
          </div>
        </div>
      </div>

      {/* Footer stats */}
      <div className="absolute inset-x-0 bottom-4 text-center text-slate-400">
        <div className="text-sm">{name}</div>
        <div className="text-lg font-semibold text-slate-100">
          {total > 0 ? `${makes} for ${total}` : '0 for 0'}
        </div>
        <div className="text-xs">Total shots: {total}</div>
      </div>
    </div>
  );
}
