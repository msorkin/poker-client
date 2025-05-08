export class GameError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GameError';
  }
}

export class GameNotFoundError extends GameError {
  constructor(gameId: string) {
    super(`Game with ID ${gameId} not found`);
    this.name = 'GameNotFoundError';
  }
}

export class PlayerNotFoundError extends GameError {
  constructor(playerId: string, gameId: string) {
    super(`Player ${playerId} not found in game ${gameId}`);
    this.name = 'PlayerNotFoundError';
  }
}

export class InvalidGameStateError extends GameError {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidGameStateError';
  }
} 