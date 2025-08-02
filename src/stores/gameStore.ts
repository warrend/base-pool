import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export interface Player {
  id: string;
  name: string;
  score: number;
}

export interface Game {
  id: string;
  player1: Player;
  player2: Player;
  raceToNumber: number;
  gameType: '8-ball' | '9-ball' | '10-ball';
  isActive: boolean;
  winner?: string;
  startTime: Date;
  endTime?: Date;
}

interface GameState {
  // Current game
  currentGame: Game | null;

  // Game history
  gameHistory: Game[];

  // Actions
  startNewGame: (
    player1Name: string,
    player2Name: string,
    raceToNumber: number,
    gameType: '8-ball' | '9-ball' | '10-ball'
  ) => void;
  updatePlayerScore: (playerId: string, increment: boolean) => void;
  endGame: () => void;
  loadGame: (gameId: string) => void;
  clearHistory: () => void;
}

const createNewGame = (
  player1Name: string,
  player2Name: string,
  raceToNumber: number,
  gameType: '8-ball' | '9-ball' | '10-ball'
): Game => ({
  id: generateId(),
  player1: {
    id: 'player1',
    name: player1Name,
    score: 0,
  },
  player2: {
    id: 'player2',
    name: player2Name,
    score: 0,
  },
  raceToNumber,
  gameType,
  isActive: true,
  startTime: new Date(),
});

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      currentGame: null,
      gameHistory: [],

      startNewGame: (
        player1Name: string,
        player2Name: string,
        raceToNumber: number,
        gameType: '8-ball' | '9-ball' | '10-ball'
      ) => {
        const newGame = createNewGame(
          player1Name,
          player2Name,
          raceToNumber,
          gameType
        );
        set({ currentGame: newGame });
      },

      updatePlayerScore: (playerId: string, increment: boolean) => {
        const { currentGame } = get();
        if (!currentGame || !currentGame.isActive) return;

        const updatedGame = { ...currentGame };

        if (playerId === 'player1') {
          updatedGame.player1 = {
            ...updatedGame.player1,
            score: Math.max(
              0,
              updatedGame.player1.score + (increment ? 1 : -1)
            ),
          };
        } else if (playerId === 'player2') {
          updatedGame.player2 = {
            ...updatedGame.player2,
            score: Math.max(
              0,
              updatedGame.player2.score + (increment ? 1 : -1)
            ),
          };
        }

        // Check for winner
        if (updatedGame.player1.score >= updatedGame.raceToNumber) {
          updatedGame.isActive = false;
          updatedGame.winner = updatedGame.player1.name;
          updatedGame.endTime = new Date();
        } else if (updatedGame.player2.score >= updatedGame.raceToNumber) {
          updatedGame.isActive = false;
          updatedGame.winner = updatedGame.player2.name;
          updatedGame.endTime = new Date();
        }

        set({ currentGame: updatedGame });

        // If game is finished, add to history but keep currentGame for modal
        if (!updatedGame.isActive) {
          const { gameHistory } = get();
          set({
            gameHistory: [...gameHistory, updatedGame],
          });
        }
      },

      endGame: () => {
        set({ currentGame: null });
      },

      loadGame: (gameId: string) => {
        const { gameHistory } = get();
        const game = gameHistory.find((g) => g.id === gameId);
        if (game) {
          set({ currentGame: { ...game, isActive: true } });
        }
      },

      clearHistory: () => {
        set({ gameHistory: [] });
      },
    }),
    {
      name: 'billiards-game-storage',
    }
  )
);
