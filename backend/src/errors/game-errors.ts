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

export class InvalidBuyInAmountError extends GameError {
  constructor(amount: number, min: number, max: number) {
    super(`Invalid buy-in amount: ${amount}. Must be between ${min} and ${max}.`);
    this.name = 'InvalidBuyInAmountError';
  }
}

export class InsufficientBalanceError extends GameError {
  constructor(playerId: string, balance: number, required: number) {
    super(`Player ${playerId} has insufficient balance. Balance: ${balance}, Required: ${required}.`);
    this.name = 'InsufficientBalanceError';
  }
}

export class PlayerAlreadySeatedError extends GameError {
  constructor(playerId: string, gameId: string) {
    super(`Player ${playerId} is already seated in game ${gameId}.`);
    this.name = 'PlayerAlreadySeatedError';
  }
}
