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

// New: Practice session support
export interface PracticeSession {
  id: string;
  playerName: string;
  makes: number;
  misses: number;
  isActive: boolean;
  startTime: Date;
  endTime?: Date;
  // Track history of shots to support undo
  shots?: Array<'make' | 'miss'>;
}

interface GameState {
  // Current game
  currentGame: Game | null;
  // New: current practice session
  currentPractice: PracticeSession | null;

  // Game history
  gameHistory: Game[];
  // New: practice history
  practiceHistory: PracticeSession[];

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

  // New: Practice actions
  startPractice: (playerName: string) => void;
  recordPracticeShot: (made: boolean) => void;
  // Undo last recorded practice shot
  undoPracticeShot: () => void;
  endPractice: () => void;
  clearPracticeHistory: () => void;
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
      currentPractice: null,
      gameHistory: [],
      practiceHistory: [],

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

      // Practice actions
      startPractice: (playerName: string) => {
        const session: PracticeSession = {
          id: generateId(),
          playerName,
          makes: 0,
          misses: 0,
          isActive: true,
          startTime: new Date(),
          // Initialize shots history
          shots: [],
        };
        set({ currentPractice: session });
      },

      recordPracticeShot: (made: boolean) => {
        const { currentPractice } = get();
        if (!currentPractice || !currentPractice.isActive) return;
        const updated: PracticeSession = {
          ...currentPractice,
          makes: currentPractice.makes + (made ? 1 : 0),
          misses: currentPractice.misses + (!made ? 1 : 0),
          shots: [...(currentPractice.shots ?? []), made ? 'make' : 'miss'],
        };
        set({ currentPractice: updated });
      },

      // Undo the last recorded shot in practice mode
      undoPracticeShot: () => {
        const { currentPractice } = get();
        if (!currentPractice || !currentPractice.isActive) return;
        const shots = [...(currentPractice.shots ?? [])];
        const last = shots.pop();
        if (!last) return;
        const updated: PracticeSession = {
          ...currentPractice,
          makes: Math.max(0, currentPractice.makes - (last === 'make' ? 1 : 0)),
          misses: Math.max(
            0,
            currentPractice.misses - (last === 'miss' ? 1 : 0)
          ),
          shots,
        };
        set({ currentPractice: updated });
      },

      endPractice: () => {
        const { currentPractice, practiceHistory } = get();
        if (!currentPractice) return;
        const finished: PracticeSession = {
          ...currentPractice,
          isActive: false,
          endTime: new Date(),
        };
        set({
          currentPractice: null,
          practiceHistory: [...practiceHistory, finished],
        });
      },

      clearPracticeHistory: () => {
        set({ practiceHistory: [] });
      },
    }),
    {
      name: 'billiards-game-storage',
    }
  )
);
