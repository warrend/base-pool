import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface NewGameFormProps {
  player1Name: string;
  player2Name: string;
  raceToNumber: number;
  gameType: '8-ball' | '9-ball' | '10-ball';
  onPlayer1NameChange: (name: string) => void;
  onPlayer2NameChange: (name: string) => void;
  onRaceToNumberChange: (number: number) => void;
  onGameTypeChange: (gameType: '8-ball' | '9-ball' | '10-ball') => void;
  onStartGame: () => void;
  onCancel: () => void;
}

export function NewGameForm({
  player1Name,
  player2Name,
  raceToNumber,
  gameType,
  onPlayer1NameChange,
  onPlayer2NameChange,
  onRaceToNumberChange,
  onGameTypeChange,
  onStartGame,
  onCancel,
}: NewGameFormProps) {
  const isFormValid = player1Name.trim() && player2Name.trim();

  const handleStartGameClick = () => {
    onStartGame();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Game Setup</CardTitle>
        <CardDescription className="text-slate-400">
          Enter player names and race-to number
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="player1">Player 1 Name</Label>
          <Input
            id="player1"
            value={player1Name}
            onChange={(e) => onPlayer1NameChange(e.target.value)}
            placeholder="Enter player 1 name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="player2">Player 2 Name</Label>
          <Input
            id="player2"
            value={player2Name}
            onChange={(e) => onPlayer2NameChange(e.target.value)}
            placeholder="Enter player 2 name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="raceTo">Race to</Label>
          <Select
            value={raceToNumber.toString()}
            onValueChange={(value) => onRaceToNumberChange(parseInt(value))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select race to number" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="7">7</SelectItem>
              <SelectItem value="9">9</SelectItem>
              <SelectItem value="11">11</SelectItem>
              <SelectItem value="15">15</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="gameType">Game Type</Label>
          <Select
            value={gameType}
            onValueChange={(value) =>
              onGameTypeChange(value as '8-ball' | '9-ball' | '10-ball')
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select game type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="8-ball">8-ball</SelectItem>
              <SelectItem value="9-ball">9-ball</SelectItem>
              <SelectItem value="10-ball">10-ball</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex space-x-2 pt-4">
          <Button
            onClick={handleStartGameClick}
            disabled={!isFormValid}
            className="flex-1"
          >
            Start Game
          </Button>
          <Button onClick={onCancel} variant="outline" className="flex-1">
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
