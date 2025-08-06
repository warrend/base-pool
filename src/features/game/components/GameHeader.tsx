import { Button } from '@/components/ui/button';
import { X, Play } from 'lucide-react';
import { useState } from 'react';

interface GameHeaderProps {
  raceToNumber: number;
  gameType: '8-ball' | '9-ball' | '10-ball';
  isGameFinished: boolean;
  winner?: string;
  onNavigateHome: () => void;
  onEndGame: () => void;
}

export function GameHeader({
  raceToNumber,
  gameType,
  isGameFinished,
  winner,
  onNavigateHome,
  onEndGame,
}: GameHeaderProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleEndGameClick = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmEnd = () => {
    setShowConfirmDialog(false);
    onEndGame();
  };

  const handleCancelEnd = () => {
    setShowConfirmDialog(false);
  };

  return (
    <div className="absolute top-4 left-0 right-0 z-10 px-4">
      <div className="flex justify-between items-center">
        {/* Back button only shows when game is finished */}
        {isGameFinished ? (
          <Button
            onClick={onNavigateHome}
            variant="outline"
            size="icon"
            className="rounded-full w-10 h-10 bg-white/10 border-white/20 hover:bg-white/20"
          >
            ←
          </Button>
        ) : (
          <div className="w-10 h-10" /> // Placeholder to maintain layout
        )}

        <div className="text-center">
          <h1 className="text-lg font-bold text-slate-600 flex items-center justify-center gap-2">
            {gameType}
            <Play size={18} />
            <span>Race to {raceToNumber}</span>
          </h1>
          {isGameFinished && (
            <p className="text-yellow-300 text-sm font-semibold">
              🏆 {winner} Wins!
            </p>
          )}
        </div>

        {/* End game button only shows when game is active */}
        {!isGameFinished ? (
          <div
            onClick={handleEndGameClick}
            className="w-10 h-10 flex items-center justify-center cursor-pointer hover:opacity-70 active:opacity-50 transition-opacity touch-manipulation"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleEndGameClick();
              }
            }}
          >
            <X size={24} className="text-orange-800" />
          </div>
        ) : (
          <div className="w-10 h-10" /> // Placeholder to maintain layout
        )}
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-lg p-6 max-w-sm w-full">
            <p className="text-slate-600 text-center mb-6">
              Are you sure? The game will be deleted.
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                onClick={handleCancelEnd}
                variant="outline"
                className="bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </Button>
              <Button onClick={handleConfirmEnd} variant="destructive">
                Okay
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
