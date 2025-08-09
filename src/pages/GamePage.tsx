import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@/stores/gameStore';
import {
  GameHeader,
  GameBoard,
  GameOverModal,
} from '@/features/game/components';

export function GamePage() {
  const navigate = useNavigate();
  const { currentGame, updatePlayerScore, endGame } = useGameStore();

  useEffect(() => {
    if (!currentGame) {
      navigate('/');
    }
  }, [currentGame, navigate]);

  if (!currentGame) {
    return null;
  }

  const handlePlayerScore = (playerId: string, increment: boolean) => {
    updatePlayerScore(playerId, increment);
  };

  const handleEndGame = () => {
    endGame();
    navigate('/');
  };

  const handleWinnerModalOk = () => {
    endGame();
    navigate('/');
  };

  const handleNavigateHome = () => navigate('/');

  const isGameFinished = !currentGame.isActive;

  return (
    <div className="fixed inset-0 overflow-hidden">
      <GameHeader
        raceToNumber={currentGame.raceToNumber}
        gameType={currentGame.gameType}
        isGameFinished={isGameFinished}
        winner={currentGame.winner}
        onNavigateHome={handleNavigateHome}
        onEndGame={handleEndGame}
      />

      <GameBoard
        currentGame={currentGame}
        isGameFinished={isGameFinished}
        onPlayerScore={handlePlayerScore}
      />

      {isGameFinished && currentGame.winner && (
        <GameOverModal
          winner={currentGame.winner}
          onNavigateHome={handleWinnerModalOk}
          onViewHistory={() => {}}
        />
      )}
    </div>
  );
}
