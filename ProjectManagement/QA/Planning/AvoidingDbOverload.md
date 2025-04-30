When a player checks, bets, calls, folds, etc., if the server crashes right after, the system must know the last action.
Otherwise, you have:

Phantom bets

Stuck games

Incorrect pot size

Huge player disputes (this is fatal for real-money games)

🧠 How real poker sites solve the "too frequent DB writes" problem
They split it into two layers:


Layer	Purpose	Example
1. Event Log (Write-Ahead Log)	Capture every single player action (very lightweight write)	Player 4 checks on turn — append a log line
2. State Snapshots	Save full game state periodically (heavier, but less frequent write)	After end of betting round, or every X seconds
🔥 Why they do this
Event logs are tiny: just 20-100 bytes per action (e.g., {handId: 1234, playerId: 567, action: 'check', timestamp: '...'})

Snapshots are heavier (cards, pot size, stacks), so you don't want to save a full snapshot every micro-action.

Instead:

On crash → replay the event log from last snapshot to reconstruct state

On normal flow → only snapshot every N hands, or on critical points (like showdown)

🏗️ How you could build it
Step 1: Action Logging

Every time a player acts (bet, call, fold, etc.):

✅ Write a small Action record into the DB:

json
Copy
Edit
{ "gameId": 123, "handId": 456, "playerId": "p1", "action": "call", "amount": 100, "timestamp": "..." }
Step 2: Periodic State Snapshots

At key points (for example):

End of a hand

End of a street (flop, turn, river)

Every N actions (e.g., every 5 actions)

✅ Write a HandSnapshot or update the Hand record with full state:

Player stacks

Pot size

Community cards

Whose turn it is

Current bet

Step 3: On Crash Recovery

✅ Load the last full snapshot
✅ Replay any missing Actions sequentially to rebuild live state

📈 How this avoids overload

Approach	Benefit
Tiny action writes every move	Keeps DB writes small, fast
Full snapshot only at strategic points	Reduces DB load dramatically
Async/batched writes	Don't block game flow for DB writes
Production servers (at PokerStars, GG, etc.) even batch up writes:

Write to in-memory log first

Flush batched inserts every 0.5s, 1s, etc.

Confirm receipt to players once flushed

(But you don’t need batching yet — simple synchronous tiny writes are fine at small scale.)

🚨 Critical Details to Keep in Mind
Transaction consistency: When a player action modifies memory state, make sure DB insert succeeds before sending updated game state to other players.

Replay correctness: Your event logs must be fully deterministic. Replaying them must recreate exactly the same state.

Conflict handling: Two players shouldn't be able to act at once. Your server logic must serialize valid player turns even during lag or reconnects.

💬 Final summary for you
✅ You should save every action.

✅ You should not save the entire full game state after every tiny action.

✅ You should:

Save small Action records per move

Save HandSnapshot or game state only periodically (e.g., after a betting round or at showdown)

✅ You can (later) optimize with batching writes if needed, but at first synchronous DB writes per action are acceptable.

⚡ Bonus Tip
If you design your Action log schema well right now,
it will automatically make game auditing, hand replays, and fraud detection easier later.
(Sites like PokerStars literally replay hands from action logs for security investigations.)