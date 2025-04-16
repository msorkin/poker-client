import readlineSync from 'readline-sync';
import { PokerGame } from './POkerGame';
import { Player } from './Player';

export class CLIPokerGame extends PokerGame {
  // Request action: fold, call, raise, etc.
  protected async requestPlayerAction(player: Player, options: string[]): Promise<string> {
    console.log(`${player.name}'s turn. Options: ${options.join(', ')}`);
    let action = readlineSync.question('Choose action: ').toLowerCase();

    while (!options.includes(action)) {
      action = readlineSync.question('Invalid action. Choose again: ').toLowerCase();
    }

    return action;
  }

  // Request numeric amount (e.g., raise to X)
  protected async requestPlayerAmount(player: Player, prompt: string, min: number, max: number): Promise<number> {
    let amount = parseInt(readlineSync.question(`${player.name}: ${prompt} (min: ${min}, max: ${max}): `), 10);

    while (isNaN(amount) || amount < min || amount > max) {
      amount = parseInt(readlineSync.question(`Invalid amount. ${prompt} (min: ${min}, max: ${max}): `), 10);
    }

    return amount;
  }
}