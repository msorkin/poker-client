import { Player } from './Player';
import { PokerGame } from './POkerGame';
import { Card } from './Card';

////////////////////////////////////////////////////////////

// Game Logic

// Step 1: Create 6 players
const players: Player[] = [
    new Player('1', 'Alice', 1000),
    new Player('2', 'Bob', 1000),
    new Player('3', 'Charlie', 1000),
    new Player('4', 'Diana', 1000),
    new Player('5', 'Eddie', 1000),
    new Player('6', 'Fiona', 1000),
  ];
  
  // Step 2: Initialize the game with all 6 players
  const game = new PokerGame(players);
  
  // Step 3: Start the hand
  game.startHand();
  
  // Step 4: Show hole cards for all players
  players.forEach((player) => {
    const hand = player.holeCards.map((c: any) => c.toString()).join(' ');
    console.log(`${player.name}'s hand: ${hand}`);
  });
  
  // Step 5: Run the full game
  game.bettingRound("Preflop");
  
  game.dealFlop();
  game.bettingRound("Flop");
  
  game.dealTurn();
  game.bettingRound("Turn");
  
  game.dealRiver();
  game.bettingRound("River");
  
  game.showdown();


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
