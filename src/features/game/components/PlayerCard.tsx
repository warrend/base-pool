import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
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
  const borderClass = position === 'top' ? 'border-b-2 border-white/20' : '';

  return (
    <Card
      className={`flex-1 rounded-none border-0 ${borderClass} ${
        isGameFinished
          ? 'opacity-80'
          : 'cursor-pointer hover:bg-white/5 transition-colors'
      } ${isWinner ? 'bg-yellow-400/10 border-yellow-400/50' : 'bg-white/5'}`}
      onClick={() => !isGameFinished && onScoreChange(player.id, true)}
    >
      <CardContent className="h-full flex flex-col justify-center items-center p-8">
        <CardTitle className="text-2xl font-bold text-white mb-4">
          {player.name}
        </CardTitle>
        <div className="text-8xl font-bold text-white mb-6">{player.score}</div>
        {!isGameFinished && (
          <div className="space-x-4">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onScoreChange(player.id, true);
              }}
              size="lg"
              className="w-20 h-12 text-lg"
            >
              +1
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onScoreChange(player.id, false);
              }}
              variant="outline"
              size="lg"
              className="w-20 h-12 text-lg bg-white/10 border-white/20 hover:bg-white/20 text-white"
              disabled={player.score === 0}
            >
              -1
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
