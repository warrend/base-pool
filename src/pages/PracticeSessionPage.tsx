import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useGameStore } from '@/stores/gameStore';
import { Undo2 } from 'lucide-react';

export function PracticeSessionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const name = (location.state as { name?: string })?.name;
  const {
    currentPractice,
    startPractice,
    recordPracticeShot,
    endPractice,
    undoPracticeShot,
  } = useGameStore();

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

      {/* Top stats (moved from footer) */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-center text-gray-400">
        <div className="text-sm">{name}</div>
        <div className="text-lg font-semibold text-gray-100">
          {total > 0 ? `${makes} for ${total}` : '0 for 0'}
        </div>
        <div className="text-xs text-gray-500">Total shots: {total}</div>
      </div>

      {/* Main content */}
      <div className="flex flex-col h-full">
        {/* Top section: Make */}
        <div
          className="flex-1 bg-white/5 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors border-b border-white/10"
          onClick={() => recordPracticeShot(true)}
        >
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-200 mb-2">
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
            <div className="text-2xl font-semibold text-gray-200 mb-2">
              Miss
            </div>
            <div className="text-6xl font-bold text-white">{misses}</div>
          </div>
        </div>
      </div>

      {/* Floating Undo button */}
      <Button
        onClick={() => undoPracticeShot()}
        variant="outline"
        size="icon"
        className="absolute bottom-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 border-white/20 hover:bg-white/20 text-white"
        disabled={total === 0}
        aria-label="Undo last shot"
      >
        <Undo2 size={16} className="text-gray-400" />
      </Button>
    </div>
  );
}
