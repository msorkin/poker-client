import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Player {
  username: string;
}

interface Session {
  seatIndex: number;
  player: Player;
}

interface Game {
  id: string;
  smallBlind: number;
  bigBlind: number;
  minBuyIn: number;
  maxBuyIn: number;
  maxSeats: number;
  sessions: Session[];
}

const TableView = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`http://localhost:3001/games/${gameId}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Game not found');
          }
          throw new Error('Failed to fetch game');
        }
        const data = await response.json();
        setGame(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch game');
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [gameId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl">🃏 Loading Table...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="text-2xl text-red-500 mb-4">Error: {error}</div>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Back to Lobby
        </button>
      </div>
    );
  }

  if (!game) return null;

  // Create array of seats with player info
  const seats = Array.from({ length: game.maxSeats }, (_, index) => {
    const session = game.sessions.find(s => s.seatIndex === index);
    return {
      index,
      player: session?.player.username || null
    };
  });

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <button
          onClick={() => navigate('/')}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors mb-4"
        >
          ← Back to Lobby
        </button>
        
        <h1 className="text-2xl font-bold mb-4">Table {game.id}</h1>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-100 p-4 rounded">
            <h2 className="font-semibold mb-2">Game Details</h2>
            <p>Blinds: ${game.smallBlind} / ${game.bigBlind}</p>
            <p>Buy-in: ${game.minBuyIn} - ${game.maxBuyIn}</p>
            <p>Max Seats: {game.maxSeats}</p>
          </div>
        </div>
      </div>

      {/* Table Layout */}
      <div className="relative w-full max-w-4xl mx-auto">
        {/* Table */}
        <div className="bg-green-800 rounded-full aspect-[2/1] flex items-center justify-center mb-8">
          <div className="text-white text-xl">Poker Table</div>
        </div>

        {/* Seats */}
        <div className="absolute inset-0">
          {seats.map((seat, index) => {
            // Calculate position based on seat index
            const angle = (index * (360 / game.maxSeats)) * (Math.PI / 180);
            const radius = 200; // Adjust based on your table size
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <div
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                }}
              >
                <div className="bg-gray-200 rounded-lg p-2 text-center min-w-[100px]">
                  {seat.player ? (
                    <div className="text-sm">{seat.player}</div>
                  ) : (
                    <button className="text-2xl text-gray-500 hover:text-gray-700">
                      +
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TableView; 