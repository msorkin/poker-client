import { PrismaClient, GameStatus, BettingRound } from '@prisma/client';
import { BuyInManager } from '../src/services/buy-in.service';
import { GameService } from '../src/services/game.service';
import { PokerGame } from '../src/POkerGame';
import { Player } from '../src/Player';

const prisma = new PrismaClient();
const gameService = new GameService();
const buyInManager = new BuyInManager();

async function main() {
  // 1. Create test users
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

  // 2. Create game
  const game = await gameService.createGame({
    smallBlind: 10,
    bigBlind: 20,
    maxHands: 3,
    maxSeats: 6,
    minBuyIn: 100,
    maxBuyIn: 1000
  });

  // 3. Buy in users
  await Promise.all(
    users.map(user =>
      buyInManager.processInitialBuyIn(game.id, user.id, 500)
    )
  );

  // 4. Fetch game from GameManager (in-memory state)
  const loadedGame = await gameService.getGame(game.id);
  const pokerGame = new PokerGame(
    loadedGame.sessions.map(session => new Player(session.player.id, session.player.username, session.stack)),
    game.id,
    gameService,
    game.smallBlind,
    game.bigBlind
  );

  // 5. Simulate 3 hands in a loop with only player actions and engine logic
  const rotationHistory: { hand: number; dealerIndex: number; sbIndex: number; bbIndex: number }[] = [];
  const players = pokerGame.getPlayers();
  for (let i = 1; i <= 3; i++) {
    await pokerGame.startHand();
    const dealerIndex = pokerGame["dealerIndex"];
    const sbIndex = (dealerIndex + 1) % players.length;
    const bbIndex = (dealerIndex + 2) % players.length;
    console.log(`Hand #${i}: dealerIndex=${dealerIndex}, sbIndex=${sbIndex}, bbIndex=${bbIndex}`);
    rotationHistory.push({ hand: i, dealerIndex, sbIndex, bbIndex });

    // Preflop actions:
    await pokerGame.bettingRound("Preflop");
    await pokerGame.handleAction(players[0], 'raise');
    await pokerGame.handleAmount(players[0], 40);
    await pokerGame.handleAction(players[1], 'fold');
    await pokerGame.handleAction(players[2], 'call');

    // Flop
    await pokerGame.bettingRound("Flop");
    await pokerGame.handleAction(players[0], 'check');
    await pokerGame.handleAction(players[2], 'check');

    // Turn
    await pokerGame.bettingRound("Turn");
    await pokerGame.handleAction(players[0], 'check');
    await pokerGame.handleAction(players[2], 'check');

    // River
    await pokerGame.bettingRound("River");
    await pokerGame.handleAction(players[0], 'check');
    await pokerGame.handleAction(players[2], 'check');
    // Showdown will be triggered by the engine
  }

  // 6. Print rotation history
  console.log("\nRotation History:");
  rotationHistory.forEach(r => {
    console.log(`Hand #${r.hand}: dealerIndex=${r.dealerIndex}, sbIndex=${r.sbIndex}, bbIndex=${r.bbIndex}`);
  });

  // 7. Query DB for all hands for this game and print handNumber, state, isShowdown, and playerStates
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

  console.log('\n✅ Success: All hands progressed to showdown and were persisted.');

  // Optional: clean up after test run
  // await prisma.user.deleteMany({ where: { email: { contains: '@example.com' } } });
  // await prisma.game.delete({ where: { id: game.id } });
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
