import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GameOverModalProps {
  winner: string;
  onNavigateHome: () => void;
  onViewHistory: () => void;
}

export function GameOverModal({ winner, onNavigateHome }: GameOverModalProps) {
  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
      <Card className="mx-4 max-w-sm w-full">
        <CardHeader>
          <CardTitle className="text-center text-xl">🏆</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-lg font-semibold">{winner} wins!</p>
          <Button onClick={onNavigateHome} className="w-full">
            OK
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
