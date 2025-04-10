import { Card } from './Card';

const RANK_ORDER: string[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

function rankToValue(rank: string): number {
  return RANK_ORDER.indexOf(rank);
}

function getCombinations<T>(array: T[], size: number): T[][] {
  const results: T[][] = [];
  function combine(start: number, combo: T[]) {
    if (combo.length === size) {
      results.push([...combo]);
      return;
    }
    for (let i = start; i < array.length; i++) {
      combine(i + 1, [...combo, array[i]]);
    }
  }
  combine(0, []);
  return results;
}

export type HandResult = {
  strength: number;         // Hand category: 0 = High Card, 8 = Straight Flush
  name: string;             // e.g., "Two Pair"
  cards: Card[];            // The best 5 cards
  score: number[];          // For tie-breakers (like kickers, pair value, etc.)
};

export class HandEvaluator {
  static evaluateBestHand(cards: Card[]): HandResult {
    const combos = getCombinations(cards, 5);
    const evaluated = combos.map(this.evaluateHand);
    return evaluated.sort((a, b) => HandEvaluator.compareScores(b.score, a.score))[0];
  }

  static compareScores(a: number[], b: number[]): number {
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      const diff = (a[i] || 0) - (b[i] || 0);
      if (diff !== 0) return diff;
    }
    return 0;
  }

  static compareHands(a: HandResult, b: HandResult): number {
    return this.compareScores(b.score, a.score);
  }

  static evaluateHand(cards: Card[]): HandResult {
    const suits = new Map<string, Card[]>();
    const rankMap = new Map<number, Card[]>();
    const rankCount = new Map<number, number>();

    const ranks: number[] = [];

    for (const card of cards) {
      const rank = rankToValue(card.rank);
      ranks.push(rank);

      // Track suits
      if (!suits.has(card.suit)) suits.set(card.suit, []);
      suits.get(card.suit)!.push(card);

      // Track ranks
      if (!rankMap.has(rank)) rankMap.set(rank, []);
      rankMap.get(rank)!.push(card);

      rankCount.set(rank, (rankCount.get(rank) || 0) + 1);
    }

    // Sort high to low
    const sortedRanks = Array.from(new Set(ranks)).sort((a, b) => b - a);
    const rankGroups = [...rankCount.entries()].sort((a, b) => {
      if (b[1] === a[1]) return b[0] - a[0]; // tie: higher rank wins
      return b[1] - a[1]; // group size first
    });

    // Check for flush
    const flushSuit = [...suits.entries()].find(([_, cards]) => cards.length >= 5);
    const flushCards = flushSuit ? flushSuit[1].sort((a, b) => rankToValue(b.rank) - rankToValue(a.rank)).slice(0, 5) : [];

    // Check for straight
    const straight = HandEvaluator.getStraight(sortedRanks);

    const straightFlush = flushCards.length >= 5 ? HandEvaluator.getStraight(flushCards.map(c => rankToValue(c.rank))) : null;


    // Build result

    //Straight
    if (straightFlush) return { strength: 8, name: 'Straight Flush', cards, score: [8, ...straightFlush] };

    //Four of a Kind
    if (rankGroups[0][1] === 4) return { strength: 7, name: 'Four of a Kind', cards, score: [7, rankGroups[0][0], rankGroups[1][0]] };
    
    //Full House
    if (
        rankGroups[0][1] === 3 &&                // first group is trips
        rankGroups.length > 1 &&                 // there's at least a second group
        rankGroups[1][1] >= 2 &&                 // second group is at least a pair
        rankGroups[0][0] !== rankGroups[1][0]    // not using same rank for trips and pair
      ) {
        return {
          strength: 6,
          name: 'Full House',
          cards, // still returning full set of 5 (the best combo is already chosen above)
          score: [6, rankGroups[0][0], rankGroups[1][0]] // trip rank first, then pair rank
        };
      }

    // Flush  
    if (flushCards.length === 5) return { strength: 5, name: 'Flush', cards: flushCards, score: [5, ...flushCards.map(c => rankToValue(c.rank))] };
    
    // Straight
    if (straight) return { strength: 4, name: 'Straight', cards, score: [4, ...straight] };

    // Three of a Kind
    if (rankGroups[0][1] === 3) return { strength: 3, name: 'Three of a Kind', cards, score: [3, rankGroups[0][0], rankGroups[1][0], rankGroups[2][0]] };

    // Two Pair
    if (rankGroups[0][1] === 2 && rankGroups[1][1] === 2) return { strength: 2, name: 'Two Pair', cards, score: [2, rankGroups[0][0], rankGroups[1][0], rankGroups[2][0]] };
    
    // One Pair
    if (rankGroups[0][1] === 2) return { strength: 1, name: 'One Pair', cards, score: [1, rankGroups[0][0], rankGroups[1][0], rankGroups[2][0], rankGroups[3][0]] };

    // High Card
    return { strength: 0, name: 'High Card', cards, score: [0, ...sortedRanks] };
  }

  private static getStraight(ranks: number[]): number[] | null {
    const unique = Array.from(new Set(ranks)).sort((a, b) => b - a);

    // Handle Ace-low straight (A-2-3-4-5)
    if (unique.includes(12) && unique.includes(0) && unique.includes(1) && unique.includes(2) && unique.includes(3)) {
      return [3, 2, 1, 0, 12]; // 5-high straight
    }

    for (let i = 0; i <= unique.length - 5; i++) {
      const slice = unique.slice(i, i + 5);
      if (slice[0] - slice[4] === 4) return slice;
    }

    return null;
  }
}

export function describeHand(hand: HandResult): string {
    return `${hand.name} (${hand.cards.map(c => c.toString()).join(' ')})`;
  }