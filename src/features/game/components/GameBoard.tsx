import { PlayerCard } from './PlayerCard';
import type { Game } from '@/stores/gameStore';

interface GameBoardProps {
  currentGame: Game;
  isGameFinished: boolean;
  onPlayerScore: (playerId: string, increment: boolean) => void;
}

export function GameBoard({
  currentGame,
  isGameFinished,
  onPlayerScore,
}: GameBoardProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Player 1 - Top Half */}
      <PlayerCard
        player={currentGame.player1}
        isWinner={currentGame.winner === currentGame.player1.name}
        isGameFinished={isGameFinished}
        position="top"
        onScoreChange={onPlayerScore}
      />

      {/* Player 2 - Bottom Half */}
      <PlayerCard
        player={currentGame.player2}
        isWinner={currentGame.winner === currentGame.player2.name}
        isGameFinished={isGameFinished}
        position="bottom"
        onScoreChange={onPlayerScore}
      />
    </div>
  );
}
