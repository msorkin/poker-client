import { PrismaClient } from '@prisma/client';
import { BuyInManager } from '../src/services/buy-in.service';
import { GameService } from '../src/services/game.service';
import { PokerGame } from '../src/POkerGame';
import { Player } from '../src/Player';
import seedrandom from 'seedrandom';

const rng = seedrandom(Date.now().toString()); // or use a fixed string for predictable results

const prisma = new PrismaClient();
const gameService = new GameService();
const buyInManager = new BuyInManager();

async function main() {
  console.log('🌱 Starting integration test...');
  const users = await Promise.all(
    ['Idiot', 'Clown', 'BB'].map(name =>
      prisma.user.create({
        data: {
          username: `${name.toLowerCase()}_${Math.floor(Math.random() * 100000)}`,
          email: `${name.toLowerCase()}_${Math.floor(Math.random() * 100000)}@example.com`,
          passwordHash: 'hashed',
          balance: 5000,
        },
      })
    )
  );

  const game = await gameService.createGame({
    smallBlind: 10,
    bigBlind: 20,
    maxHands: 3,
    maxSeats: 6,
    minBuyIn: 100,
    maxBuyIn: 1000,
  });

  await Promise.all(
    users.map(user =>
      buyInManager.processInitialBuyIn(game.id, user.id, 500)
    )
  );

  const loadedGame = await gameService.getGame(game.id);
  const players = loadedGame.sessions.map(
    session => new Player(session.player.id, session.player.username, session.stack)
  );

  const pokerGame = new PokerGame(players, game.id, gameService, game.smallBlind, game.bigBlind);

  pokerGame['requestPlayerAction'] = async function (player: Player, options: string[]) {
    const filtered = options.filter(o => o !== 'bet'); // skip unimplemented
    const choice = filtered[Math.floor(rng() * filtered.length)];
    console.log(`🤖 ${player.name} chooses to ${choice}`);
    return choice;
  };
  
  pokerGame['requestPlayerAmount'] = async function (player: Player, _prompt: string, _min: number, _max: number) {
    // Force an amount that's higher than the player's stack to test cappedRaiseAmount logic
    const forcedAmount = player.stack * 2;
    console.log(`💰 ${player.name} attempts illegal raise amount ${forcedAmount}`);
    return forcedAmount;
  };
  

  const rotationHistory: { hand: number; dealerIndex: number; sbIndex: number; bbIndex: number }[] = [];

  for (let i = 1; i <= 3; i++) {
    await pokerGame.startHand();
    const dealerIndex = pokerGame['dealerIndex'];
    const sbIndex = (dealerIndex + 1) % players.length;
    const bbIndex = (dealerIndex + 2) % players.length;
    console.log(`\n💥 Starting Hand #${i}`);
    rotationHistory.push({ hand: i, dealerIndex, sbIndex, bbIndex });

    await pokerGame.bettingRound("Preflop");
    if (pokerGame.getActivePlayers().length > 1) {
      await pokerGame.dealFlop();
      await pokerGame.bettingRound("Flop");
    }
    if (pokerGame.getActivePlayers().length > 1) {
      await pokerGame.dealTurn();
      await pokerGame.bettingRound("Turn");
    }
    if (pokerGame.getActivePlayers().length > 1) {
      await pokerGame.dealRiver();
      await pokerGame.bettingRound("River");
    }

    await pokerGame.showdown();
  }

  // ✅ Results
  console.log("\nRotation History:");
  rotationHistory.forEach(r => {
    console.log(`Hand #${r.hand}: dealerIndex=${r.dealerIndex}, sbIndex=${r.sbIndex}, bbIndex=${r.bbIndex}`);
  });

  const hands = await prisma.hand.findMany({
    where: { gameId: game.id },
    orderBy: { handNumber: 'asc' },
    select: { handNumber: true, state: true, isShowdown: true, playerStates: true }
  });

  console.log("\nHand records from DB:");
  hands.forEach(h => {
    console.log(`Hand #${h.handNumber}: state=${h.state}, isShowdown=${h.isShowdown}`);
    const states = JSON.parse(h.playerStates);
    states.forEach((ps: any) => {
      console.log(`  Player ${ps.name}: stack=${ps.stack}, totalContributed=${ps.totalContributed}, folded=${ps.folded}`);
    });
  });

  console.log('\n✅ Success: All hands completed and saved.');
}

main()
  .then(() => {
    console.log('✅ Test script complete.');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Test failed:', err);
    process.exit(1);
  });
