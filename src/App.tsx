import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './index.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center">
      <div className="flex gap-8 mb-8">
        <a href="https://vite.dev" target="_blank" className="block">
          <img
            src={viteLogo}
            className="h-24 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa] hover:animate-spin"
            alt="Vite logo"
          />
        </a>
        <a href="https://react.dev" target="_blank" className="block">
          <img
            src={reactLogo}
            className="h-24 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] animate-spin"
            alt="React logo"
          />
        </a>
      </div>

      <h1 className="text-4xl font-bold dark:text-red-500 mb-8">
        Vite + React
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 mb-4"
        >
          count is {count}
        </button>
        <p className="text-gray-600 dark:text-gray-300 text-center">
          Edit{' '}
          <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm font-mono">
            src/App.tsx
          </code>{' '}
          and save to test HMR
        </p>
      </div>

      <p className="text-gray-500 dark:text-gray-400 mt-8 text-center max-w-md">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
