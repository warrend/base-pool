import { Button } from '@/components/ui/button';

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
          <h1 className="text-lg font-bold text-white">
            {gameType} - Race to {raceToNumber}
          </h1>
          {isGameFinished && (
            <p className="text-yellow-300 text-sm font-semibold">
              🏆 {winner} Wins!
            </p>
          )}
        </div>

        {/* End game button only shows when game is active */}
        {!isGameFinished ? (
          <Button
            onClick={onEndGame}
            variant="destructive"
            size="sm"
            className="text-xs"
          >
            End
          </Button>
        ) : (
          <div className="w-12 h-8" /> // Placeholder to maintain layout
        )}
      </div>
    </div>
  );
}
