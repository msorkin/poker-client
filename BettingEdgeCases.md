# Poker Betting Edge Cases Checklist

## Preflop Betting
- [ ] Basic minimum raise (2x BB)
- [ ] Multiple raises in sequence
- [ ] Player attempts to raise less than minimum
- [ ] Player attempts to raise more than their stack
- [ ] Small blind completing to big blind
- [ ] All-in less than minimum raise
- [ ] All-in more than minimum raise

## Post-Flop Betting
- [ ] First to act bet sizing
- [ ] Minimum raise after a bet
- [ ] Re-raise calculations
- [ ] All-in less than minimum raise, next player's minimum raise amount
- [ ] Multiple all-ins in sequence

## Short Stack Scenarios
- [ ] Player has less than big blind
- [ ] Player has exactly big blind
- [ ] Player has between BB and min-raise
- [ ] Multiple short stacks in same hand

## All-In Scenarios
- [ ] Single all-in below minimum raise
- [ ] Multiple all-ins below minimum raise
- [ ] All-in reopening action
- [ ] All-in not reopening action
- [ ] Side pot calculations with multiple all-ins

## Raise Sizing Edge Cases
- [ ] Raise after short all-in
- [ ] Raise after multiple short all-ins
- [ ] Maximum raise (all-in) calculations
- [ ] Raise calculations after incomplete raise

## Multi-Way Pot Scenarios
- [ ] Multiple callers then raise
- [ ] Multiple raises then all-in
- [ ] Mixed full raises and short all-ins
- [ ] Action reopening with multiple players

## Side Pot Scenarios
- [ ] Basic two-way side pot
- [ ] Multiple side pots
- [ ] Side pots with remaining action
- [ ] All-in player in multiple side pots

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
