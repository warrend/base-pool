import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export function PracticeSetupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const handleStart = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    navigate('/practice/session', { state: { name: trimmed } });
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Start Practice</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                autoFocus
              />
              <Button className="w-full" onClick={handleStart}>
                Start
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
