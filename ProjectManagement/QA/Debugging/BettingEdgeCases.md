# Poker Betting Edge Cases Checklist

## Preflop Betting
- [x] Basic minimum raise (2x BB)
- [x] Multiple raises in sequence
- [x] Player attempts to raise less than minimum
- [x] Player attempts to raise more than their stack
- [x] Small blind completing to big blind
- [x] All-in less than minimum raise
- [x] All-in more than minimum raise

## Post-Flop Betting
- [x] First to act bet sizing
- [x] Minimum raise after a bet
- [x] Re-raise calculations
- [x] All-in less than minimum raise, next player's minimum raise amount
- [x] Multiple all-ins in sequence

## Short Stack Scenarios
- [x] Player has less than big blind
- [x] Player has exactly big blind
- [x] Player has between BB and min-raise
- [x] Multiple short stacks in same hand

## All-In Scenarios
- [x] Single all-in below minimum raise
- [x] Multiple all-ins below minimum raise
- [x] All-in reopening action
- [x] All-in not reopening action
- [x] Side pot calculations with multiple all-ins

## Raise Sizing Edge Cases
- [x] Raise after short all-in
- [x] Raise after multiple short all-ins
- [x] Maximum raise (all-in) calculations
- [x] Raise calculations after incomplete raise

## Multi-Way Pot Scenarios
- [x] Multiple callers then raise
- [x] Multiple raises then all-in
- [x] Mixed full raises and short all-ins
- [x] Action reopening with multiple players

## Side Pot Scenarios
- [x] Basic two-way side pot
- [x] Multiple side pots
- [x] Side pots with remaining action
- [x] All-in player in multiple side pots

## Specific Test Cases
1. Alice raises to 20, Bob calls, Charlie raises to 60, Diana all-in for 55
   - Expected: Eddie's min-raise should be to 100 (60 + 40)

2. Alice min-raises to 20, Bob calls, Charlie raises to 50, Diana all-in for 45
   - Expected: Eddie's min-raise should be to 80 (50 + 30)

3. Eddie raises to 20, Fiona all-in for 45, Alice's min-raise
   - Expected: Alice's min-raise should be to 70 (45 + 25)

4. Multiple short all-ins in sequence:
   - Alice bets 20
   - Bob all-in for 25
   - Charlie all-in for 30
   - Diana's min-raise should be to 40

## Testing Procedure
1. Start with a fresh game for each test case
2. Document initial stacks and positions
3. Record each action and the available options
4. Verify minimum raise calculations
5. Check pot and side pot calculations
6. Confirm correct showdown distribution

## Notes
- Document any unexpected behavior
- Pay special attention to minimum raise calculations
- Verify action reopening rules
- Check side pot distributions
