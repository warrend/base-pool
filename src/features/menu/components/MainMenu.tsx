import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface MainMenuProps {
  gameHistoryCount: number;
  onNewGameClick: () => void;
  onHistoryClick: () => void;
}

export function MainMenu({
  gameHistoryCount,
  onNewGameClick,
  onHistoryClick,
}: MainMenuProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="space-y-4">
          <Button
            onClick={onNewGameClick}
            className="w-full text-lg py-6"
            size="lg"
          >
            New Game
          </Button>

          <Button
            onClick={onHistoryClick}
            variant="outline"
            className="w-full text-lg py-6"
            size="lg"
            disabled={gameHistoryCount === 0}
          >
            Game History
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
