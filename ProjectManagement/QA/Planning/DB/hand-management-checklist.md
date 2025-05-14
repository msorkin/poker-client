
## ✅ **4. Hand Management (Phase 2)**

### 🧩 Core Hand Table Integration
- [ ] Refactor hand creation to write to the `Hand` table via Prisma
  - [x] Store metadata:
    - [x] `handNumber`
    - [x] `state` (e.g., `PREFLOP`, `FLOP`, `TURN`, `RIVER`, `SHOWDOWN`)
    - [x] `createdAt`
    - [x] `gameId`
  - [x] Track blind positions:
    - [x] `dealerIndex`
    - [x] `sbIndex`
    - [x] `bbIndex`
  - [ ] Snapshot seating state at start of hand:
    - [ ] Active player IDs
    - [ ] Starting stacks (for side pot calculation)
    - [ ] Seat indices (optional but useful)
  - [ ] Link to related `TableSession`s
- [ ] Add rake calculation and tracking **(Post-MVP)**

### 📜 Action History + Replay Support
- [ ] Add action history recording
  - [ ] Create `HandAction` model or inline JSON
  - [ ] Track per-action data:
    - [ ] `playerId`
    - [ ] `actionType` (fold, call, bet, etc.)
    - [ ] `amount`
    - [ ] `timestamp`
    - [ ] `stage` (preflop, flop, etc.)
  - [ ] Update `currentTurn` on each action

### 🗃️ HandHistory System
- [ ] Create HandHistory system
  - [ ] Implement `HandHistory` model and DB relations
  - [ ] Add personal hole card tracking
    - [ ] Store playerId + holeCards (private to them)
  - [ ] Add hand strength calculation (e.g., “top pair”, “set”, etc.)
  - [ ] Implement winner tracking
    - [ ] Store winner(s), amount won, showdown result

### 🔍 Query & Listing Features
- [ ] Refactor hand lookup and listing to use Prisma queries
  - [ ] Get hand list by game
  - [ ] Get full hand detail by handId
  - [ ] Filter by player or result (optional MVP+)

### 🔁 Hand Replay (Basic)
- [ ] Add hand replay functionality
  - [ ] Build replay data from stored `Hand` + `HandAction`
  - [ ] Reconstruct streets and actions in order
  - [ ] Support show/hide hole cards per player

### ✅ Testing
- [ ] Test hand tracking and history thoroughly
  - [ ] `Hand` creation at hand start
  - [ ] Action logging throughout betting
  - [ ] Accurate recording of winner and pot
  - [ ] Proper rollback or error behavior
  - [ ] Verify personal hole cards and action visibility are correct
