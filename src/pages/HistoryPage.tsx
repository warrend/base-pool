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
import { Trophy } from 'lucide-react';

export function HistoryPage() {
  const navigate = useNavigate();
  const { gameHistory, clearHistory } = useGameStore();

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDuration = (startTime: Date, endTime?: Date) => {
    if (!endTime) return 'In progress';

    const duration =
      new Date(endTime).getTime() - new Date(startTime).getTime();
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);

    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-md mx-auto">
        {/* Navigation */}
        <div className="mb-6 flex justify-between">
          <Button onClick={() => navigate('/')} variant="outline">
            ←
          </Button>
          {gameHistory.length > 0 && (
            <Button onClick={clearHistory} variant="destructive" size="sm">
              Clear History
            </Button>
          )}
        </div>

        {/* History List */}
        {gameHistory.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500 mb-4">No games played yet</p>
              <Button onClick={() => navigate('/')}>
                Start Your First Game
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <div className="mb-2 font-bold">
              <small className="text-slate-700">
                {gameHistory.length} game{gameHistory.length !== 1 ? 's' : ''}{' '}
                played
              </small>
            </div>
            {gameHistory
              .sort(
                (a, b) =>
                  new Date(b.startTime).getTime() -
                  new Date(a.startTime).getTime()
              )
              .map((game) => (
                <Card key={game.id} className="relative">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-sm text-teal-600">
                          {game.gameType} - Race to {game.raceToNumber}
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                          {formatDate(game.startTime)}
                        </CardDescription>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        {formatDuration(game.startTime, game.endTime)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {/* Score display */}
                      <div className="flex justify-between items-center">
                        <div className="text-center flex-1">
                          <div className="font-semibold text-slate-300">
                            {game.player1.name}
                          </div>
                          <div
                            className={`text-2xl font-bold ${
                              game.winner === game.player1.name
                                ? 'text-green-600'
                                : ''
                            }`}
                          >
                            {game.player1.score}
                          </div>
                        </div>

                        <div className="text-gray-400 font-bold text-lg px-4">
                          <Trophy />
                        </div>

                        <div className="text-center flex-1">
                          <div className="font-semibold text-slate-300">
                            {game.player2.name}
                          </div>
                          <div
                            className={`text-2xl font-bold ${
                              game.winner === game.player2.name
                                ? 'text-green-600'
                                : ''
                            }`}
                          >
                            {game.player2.score}
                          </div>
                        </div>
                      </div>

                      {/* Game status */}
                      {!game.winner && game.isActive && (
                        <div className="text-center text-blue-600 text-sm font-medium">
                          Game in progress
                        </div>
                      )}
                      {!game.winner && !game.isActive && (
                        <div className="text-center text-gray-500 text-sm">
                          Game ended
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}

        {/* Summary Stats */}
        {gameHistory.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">
                    {gameHistory.filter((g) => g.winner).length}
                  </div>
                  <div className="text-sm text-gray-500">Completed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {Math.round(
                      gameHistory
                        .filter((g) => g.endTime)
                        .reduce((acc, g) => {
                          const duration =
                            new Date(g.endTime!).getTime() -
                            new Date(g.startTime).getTime();
                          return acc + duration;
                        }, 0) /
                        gameHistory.filter((g) => g.endTime).length /
                        60000
                    ) || 0}
                  </div>
                  <div className="text-sm text-gray-500">Avg Minutes</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
