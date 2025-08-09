import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Undo2 } from 'lucide-react';
import type { Player } from '@/stores/gameStore';

interface PlayerCardProps {
  player: Player;
  isWinner: boolean;
  isGameFinished: boolean;
  position: 'top' | 'bottom';
  onScoreChange: (playerId: string, increment: boolean) => void;
}

export function PlayerCard({
  player,
  isWinner,
  isGameFinished,
  position,
  onScoreChange,
}: PlayerCardProps) {
  const borderClass =
    position === 'top' ? 'border-b-2 border-slate-800/50' : '';

  return (
    <Card
      className={`flex-1 rounded-none border-0 ${borderClass} ${
        isGameFinished
          ? 'opacity-80'
          : 'cursor-pointer hover:bg-white/5 transition-colors'
      } ${isWinner ? 'bg-yellow-400/10 border-yellow-400/50' : 'bg-white/5'}`}
      onClick={() => !isGameFinished && onScoreChange(player.id, true)}
    >
      <CardContent className="h-full flex flex-col justify-center items-center p-8 relative">
        <CardTitle className="text-2xl font-semibold text-slate-200 mb-4">
          {player.name}
        </CardTitle>
        <div className="text-9xl font-bold text-slate-400 mb-6">
          {player.score}
        </div>
        {!isGameFinished && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onScoreChange(player.id, false);
            }}
            variant="outline"
            size="icon"
            className="absolute bottom-0 right-4 w-10 h-10 rounded-full bg-white/10 border-white/20 hover:bg-white/20 text-white"
            disabled={player.score === 0}
          >
            <Undo2 size={16} className="text-slate-400" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
