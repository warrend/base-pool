import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useGameStore } from '@/stores/gameStore';
import type { Game, PracticeSession } from '@/stores/gameStore';
import { Plus } from 'lucide-react';
import { NewGameForm } from '@/features/menu/components';

export function HistoryPage() {
  const navigate = useNavigate();
  const {
    gameHistory,
    clearHistory,
    startNewGame,
    practiceHistory,
    clearPracticeHistory,
  } = useGameStore();

  const [showNewGameForm, setShowNewGameForm] = useState(false);
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [raceToNumber, setRaceToNumber] = useState(7);
  const [gameType, setGameType] = useState<'8-ball' | '9-ball' | '10-ball'>(
    '8-ball'
  );
  const [menuOpen, setMenuOpen] = useState(false);

  // Combine game and practice entries for a single timeline
  type CombinedEntry =
    | { type: 'game'; item: Game; start: number }
    | { type: 'practice'; item: PracticeSession; start: number };

  const combined: CombinedEntry[] = [
    ...gameHistory.map((g) => ({
      type: 'game' as const,
      item: g,
      start: new Date(g.startTime).getTime(),
    })),
    ...practiceHistory.map((p) => ({
      type: 'practice' as const,
      item: p,
      start: new Date(p.startTime).getTime(),
    })),
  ].sort((a, b) => b.start - a.start);

  const handlePlusClick = () => setMenuOpen((v) => !v);
  const handleStartMatch = () => {
    setMenuOpen(false);
    setShowNewGameForm(true);
  };
  const handleStartPractice = () => {
    setMenuOpen(false);
    navigate('/practice');
  };

  const handleClearAllHistory = () => {
    clearHistory();
    clearPracticeHistory();
  };

  const handleStartGame = () => {
    if (player1Name.trim() && player2Name.trim() && raceToNumber > 0) {
      startNewGame(
        player1Name.trim(),
        player2Name.trim(),
        raceToNumber,
        gameType
      );
      navigate('/game');
    } else {
      console.log('Form validation failed');
    }
  };

  const resetForm = () => {
    setPlayer1Name('');
    setPlayer2Name('');
    setRaceToNumber(7);
    setGameType('8-ball');
    setShowNewGameForm(false);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDuration = (
    startTime: unknown,
    endTime?: unknown,
    isActive?: boolean
  ) => {
    const toMs = (v: unknown): number => {
      if (typeof v === 'number') return v;
      if (v instanceof Date) return v.getTime();
      const parsed = Date.parse(String(v));
      return Number.isNaN(parsed) ? NaN : parsed;
    };

    const startMs = toMs(startTime);
    let endMs = endTime != null ? toMs(endTime) : undefined;
    if ((endMs == null || Number.isNaN(endMs)) && isActive) {
      endMs = Date.now();
    }

    if (Number.isNaN(startMs) || endMs == null || Number.isNaN(endMs)) {
      return isActive ? 'In progress' : '—';
    }

    const duration = Math.max(0, endMs - startMs);
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);

    return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-md mx-auto">
        {!showNewGameForm ? (
          <>
            {/* Navigation */}
            <div className="mb-6 flex items-center justify-between relative">
              {/* Brand */}
              <div className="text-xl leading-none select-none text-indigo-400">
                <span className="font-extrabold">base</span>
                <span className="font-thin">pool</span>
              </div>

              {/* Actions */}
              <div>
                <Button
                  onClick={handlePlusClick}
                  size="icon"
                  className="w-10 h-10 rounded-full"
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                >
                  <Plus size={20} />
                </Button>
                {menuOpen && (
                  <div className="absolute top-12 right-0 bg-gray-900 border border-gray-700 rounded-md shadow-md overflow-hidden z-10">
                    <button
                      className="block w-full text-left px-4 py-2 text-gray-200 hover:bg-gray-800"
                      onClick={handleStartMatch}
                    >
                      Match
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-gray-200 hover:bg-gray-800"
                      onClick={handleStartPractice}
                    >
                      Practice
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* History List */}
            {combined.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-gray-500 mb-4">No sessions yet</p>
                  <Button onClick={handlePlusClick}>Start</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <div className="mb-2 font-bold">
                  <small className="text-gray-500">
                    {combined.length} session{combined.length !== 1 ? 's' : ''}{' '}
                    total
                  </small>
                </div>
                {combined.map((entry) => (
                  <Card
                    key={`${entry.type}-${entry.item.id}`}
                    className="relative"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-sm text-indigo-400">
                            {entry.type === 'game'
                              ? `${entry.item.gameType} - Race to ${entry.item.raceToNumber}`
                              : 'Practice Session'}
                          </CardTitle>
                          <CardDescription className="text-gray-400">
                            {formatDate(entry.item.startTime)}
                          </CardDescription>
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          {formatDuration(
                            entry.item.startTime,
                            entry.item.endTime,
                            entry.item.isActive
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {entry.type === 'game' ? (
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="text-center flex-1">
                              <div className="font-semibold text-gray-200">
                                {entry.item.player1.name}
                              </div>
                              <div
                                className={`text-2xl font-bold ${
                                  entry.item.winner === entry.item.player1.name
                                    ? 'text-indigo-400'
                                    : ''
                                }`}
                              >
                                {entry.item.player1.score}
                              </div>
                            </div>
                            <div className="text-gray-400 font-bold text-lg px-4">
                              VS
                            </div>
                            <div className="text-center flex-1">
                              <div className="font-semibold text-gray-200">
                                {entry.item.player2.name}
                              </div>
                              <div
                                className={`text-2xl font-bold ${
                                  entry.item.winner === entry.item.player2.name
                                    ? 'text-indigo-400'
                                    : ''
                                }`}
                              >
                                {entry.item.player2.score}
                              </div>
                            </div>
                          </div>
                          {!entry.item.winner && entry.item.isActive && (
                            <div className="text-center text-blue-600 text-sm font-medium">
                              Game in progress
                            </div>
                          )}
                          {!entry.item.winner && !entry.item.isActive && (
                            <div className="text-center text-gray-500 text-sm">
                              Game ended
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="text-center flex-1">
                              <div className="font-semibold text-gray-200">
                                {entry.item.playerName}
                              </div>
                              <div className="text-xs text-gray-500">
                                Practice
                              </div>
                            </div>
                            <div className="text-center flex-1">
                              <div className="text-xl font-bold">
                                {entry.item.makes} /{' '}
                                {entry.item.makes + entry.item.misses}
                              </div>
                              <div className="text-xs text-gray-500">
                                Made / Total
                              </div>
                            </div>
                            <div className="text-center flex-1">
                              <div className="text-2xl font-bold">
                                {entry.item.misses}
                              </div>
                              <div className="text-xs text-gray-500">
                                Missed
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Clear History Button */}
            {combined.length > 0 && (
              <div className="mt-6 flex justify-center">
                <Button
                  onClick={handleClearAllHistory}
                  variant="destructive"
                  size="sm"
                >
                  Clear History
                </Button>
              </div>
            )}
          </>
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
