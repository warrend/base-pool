import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@/stores/gameStore';
import { MenuHeader, MainMenu, NewGameForm } from '@/features/menu/components';

export function HomePage() {
  const navigate = useNavigate();
  const { startNewGame, gameHistory } = useGameStore();

  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [raceToNumber, setRaceToNumber] = useState(5);
  const [gameType, setGameType] = useState<'8-ball' | '9-ball' | '10-ball'>(
    '8-ball'
  );
  const [showNewGameForm, setShowNewGameForm] = useState(false);

  const handleStartGame = () => {
    console.log('handleStartGame called');
    console.log('Form values:', {
      player1Name,
      player2Name,
      raceToNumber,
      gameType,
    });
    console.log('Form validation:', {
      player1Valid: player1Name.trim(),
      player2Valid: player2Name.trim(),
      raceToValid: raceToNumber > 0,
    });

    if (player1Name.trim() && player2Name.trim() && raceToNumber > 0) {
      console.log('Starting new game...');
      startNewGame(
        player1Name.trim(),
        player2Name.trim(),
        raceToNumber,
        gameType
      );
      console.log('Navigating to game...');
      navigate('/game');
    } else {
      console.log('Form validation failed');
    }
  };

  const handleNewGameClick = () => setShowNewGameForm(true);
  const handleHistoryClick = () => navigate('/history');

  const resetForm = () => {
    setPlayer1Name('');
    setPlayer2Name('');
    setRaceToNumber(5);
    setGameType('8-ball');
    setShowNewGameForm(false);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto pt-8">
        <MenuHeader />

        {!showNewGameForm ? (
          <MainMenu
            gameHistoryCount={gameHistory.length}
            onNewGameClick={handleNewGameClick}
            onHistoryClick={handleHistoryClick}
          />
        ) : (
          <NewGameForm
            player1Name={player1Name}
            player2Name={player2Name}
            raceToNumber={raceToNumber}
            gameType={gameType}
            onPlayer1NameChange={setPlayer1Name}
            onPlayer2NameChange={setPlayer2Name}
            onRaceToNumberChange={setRaceToNumber}
            onGameTypeChange={setGameType}
            onStartGame={handleStartGame}
            onCancel={resetForm}
          />
        )}
      </div>
    </div>
  );
}
