import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Game {
  id: string;
  smallBlind: number;
  bigBlind: number;
  minBuyIn: number;
  maxBuyIn: number;
  maxSeats: number;
}

export default function Lobby() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('http://localhost:3001/games');
        if (!response.ok) throw new Error('Failed to fetch games');
        const data = await response.json();
        setGames(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch games');
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-2">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Poker Lobby</h1>
        {loading ? (
          <div className="text-center text-lg py-8">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {games.map((game) => (
              <div
                key={game.id}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xl font-bold mb-2">Table {game.id}</div>
                  <div className="text-gray-700 mb-1">
                    <span className="font-semibold">Blinds:</span> {game.smallBlind} / {game.bigBlind}
                  </div>
                  <div className="text-gray-700 mb-4">
                    <span className="font-semibold">Buy-in:</span> {game.minBuyIn} - {game.maxBuyIn}
                  </div>
                </div>
                <button
                  className="mt-4 bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-colors"
                  onClick={() => navigate(`/table/${game.id}`)}
                >
                  Join
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 