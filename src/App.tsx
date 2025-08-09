import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GamePage } from '@/pages/GamePage';
import { HistoryPage } from '@/pages/HistoryPage';
import { PracticeSetupPage } from '@/pages/PracticeSetupPage';
import { PracticeSessionPage } from '@/pages/PracticeSessionPage';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-slate-100">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HistoryPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/practice" element={<PracticeSetupPage />} />
          <Route path="/practice/session" element={<PracticeSessionPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
