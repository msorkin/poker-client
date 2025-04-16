import { Player } from './Player';
import { CLIPokerGame } from './CLIPokerGame';
import { hookConsoleLog } from './logger';
import { PokerGame } from './POkerGame';
import { PokerGameController } from './PokerGameController';
//import { Card } from './Card'; *only if you want to force cards for debugging*
hookConsoleLog();

class DebugPokerGame extends PokerGame {
    protected async requestPlayerAction(player: Player, options: string[]): Promise<string> {
      console.log(`DEBUG: Autoselecting "${options[0]}" for ${player.name}`);
      return options[0]; // always picks the first option
    }
  }

////////////////////////////////////////////////////////////

// Game Logic

// Step 1: Create 6 players
// Create 6 players with 1000 chips each
const players: Player[] = [
    new Player('1', 'Alice', 1000),
    new Player('2', 'Bob', 1000),
    new Player('3', 'Charlie', 1000),
    new Player('4', 'Diana', 45),
    new Player('5', 'Eddie', 1000),
    new Player('6', 'Fiona', 45),
  ];

  const game = new CLIPokerGame(players, 5, 10);
  //const game = new DebugPokerGame(players, 5, 10);
  
  (async () => {
    const controller = new PokerGameController(game, 7);
    await controller.run();
  })();
////////////////////////////////////////////////////////////

/* TEST: One Pair + kicker tiebreaker
const player1 = new Player('1', 'Alice', 1000);
const player2 = new Player('2', 'Bob', 1000);

player1.holeCards = [
  new Card('♠', 'A'),
  new Card('♣', '5')
];

player2.holeCards = [
  new Card('♦', 'A'),
  new Card('♥', '4')
];

const game = new PokerGame([player1, player2]);

(game as any).communityCards = [
  new Card('♣', 'A'),
  new Card('♠', '7'),
  new Card('♥', '10'),
  new Card('♣', '3'),
  new Card('♦', '2'),
];

console.log(`${player1.name}'s hand: ${player1.holeCards.map(c => c.toString()).join(' ')}`);
console.log(`${player2.name}'s hand: ${player2.holeCards.map(c => c.toString()).join(' ')}`);
console.log("Community cards:", (game as any).communityCards.map((c: Card) => c.toString()).join(' '));

game.showdown();
*/

////////////////////////////////////////////////////////////

// Trips vs Trips test

/*
const player1 = new Player('1', 'Alice', 1000);
const player2 = new Player('2', 'Bob', 1000);

player1.holeCards = [
  new Card('♠', '7'),
  new Card('♦', '7')
];

player2.holeCards = [
  new Card('♠', 'Q'),
  new Card('♦', 'Q')
];

const game = new PokerGame([player1, player2]);

// @ts-ignore: override community cards
(game as any).communityCards = [
  new Card('♣', 'Q'),
  new Card('♥', '7'),
  new Card('♣', '2'),
  new Card('♠', '3'),
  new Card('♦', '9'),
];

console.log(`${player1.name}'s hand: ${player1.holeCards.map(c => c.toString()).join(' ')}`);
console.log(`${player2.name}'s hand: ${player2.holeCards.map(c => c.toString()).join(' ')}`);
console.log("Community cards:", (game as any).communityCards.map((c: Card) => c.toString()).join(' '));

game.showdown();
*/

////////////////////////////////////////////////////////////

/*
// Full House vs Full House test
const player1 = new Player('1', 'Alice', 1000);
const player2 = new Player('2', 'Bob', 1000);

player1.holeCards = [
  new Card('♠', 'K'),
  new Card('♦', '3')
];

player2.holeCards = [
  new Card('♥', '9'),
  new Card('♠', '9')
];

const game = new PokerGame([player1, player2]);

// @ts-ignore override community cards
(game as any).communityCards = [
  new Card('♣', 'K'),
  new Card('♦', 'K'),
  new Card('♦', '9'),
  new Card('♠', '3'),
  new Card('♣', '4'),
];

console.log(`${player1.name}'s hand: ${player1.holeCards.map(c => c.toString()).join(' ')}`);
console.log(`${player2.name}'s hand: ${player2.holeCards.map(c => c.toString()).join(' ')}`);
console.log("Community cards:", (game as any).communityCards.map((c: Card) => c.toString()).join(' '));

game.showdown();
*/

////////////////////////////////////////////////////////////
