import { PokerGame } from './POkerGame';
import { Player } from './Player';

export class PokerGameController {
  private game: PokerGame;
  private maxHands: number;

  constructor(game: PokerGame, maxHands: number = 10) {
    this.game = game;
    this.maxHands = maxHands;
  }

  // ✅ FIX: Move getUIState outside of run()
  getUIState(viewingPlayerId: string) {
    const state = this.game.getGameState();

    // Clone so we don't mutate the real state
    const safeState = JSON.parse(JSON.stringify(state));

    for (const player of safeState.players) {
      if (player.id !== viewingPlayerId && !state.showdown) {
        player.holeCards = null;
      }
    }

    return safeState;
  }

  async run() {
    for (let handNumber = 1; handNumber <= this.maxHands; handNumber++) {
      const activePlayers = this.game.getActivePlayers();
      if (activePlayers.length <= 1) {
        break;
      }

      console.log(`\n💥 Starting Hand #${handNumber} (${activePlayers.length} players)\n`);

      this.game.startHand();
      await this.game.bettingRound("Preflop");

      this.game.dealFlop();
      await this.game.bettingRound("Flop");

      this.game.dealTurn();
      await this.game.bettingRound("Turn");

      this.game.dealRiver();
      await this.game.bettingRound("River");

      this.game.showdown();
      this.game.displayChipCounts();
    }

    // Final winner(s)
    const finalPlayers = this.game.getActivePlayers();
    if (finalPlayers.length === 1) {
      console.log(`🏆 ${finalPlayers[0].name} is the winner with ${finalPlayers[0].stack} chips!`);
    } else {
      console.log(`Game ended with multiple players still in.`);
    }
  }
}