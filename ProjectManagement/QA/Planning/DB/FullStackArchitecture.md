# Poker Client Architecture Checklist
(Notes: AI = Can be implemented with AI + senior oversight, Human = Requires direct senior dev implementation)

----

## Phase 1: Core Game Logic Completion (AI)
- [x] Fix all betting round edge cases
- [x] Complete showdown logic
- [x] Implement proper side pot distribution
- [x] Add comprehensive game state validation
    - [x] Validate player stacks never go negative
    - [x] Verify bet amounts are valid (within min/max range)
    - [x] Check pot totals match player contributions
    - [x] Ensure proper betting order is maintained
    - [x] Validate hand rankings are calculated correctly
    - [x] Verify side pot allocations are accurate
    - [x] Check player action validity (can't check when facing bet)
- [ ] Implement proper error handling
    - [ ] Add custom error types for different game scenarios
    - [ ] Gracefully handle invalid player actions
    - [ ] Recover from network disconnections
    - [ ] Handle timeouts appropriately
    - [ ] Log errors with stack traces
    - [ ] Return meaningful error messages to client
- [1/2 x] Add extensive logging for debugging
    - [x] Log game lifecycle events
        - [x] Hand start, dealer, blinds, player stacks
        - [x] Community cards dealt (flop, turn, river)
        - [x] Betting round transitions
        - [x] Showdown and chip counts
        - [x] Game end and winner(s)
    - [x] Log player actions
        - [x] Every action: fold, check, call, bet, raise, all-in
        - [x] Invalid or rejected actions and reasons
        - [x] Player prompts and options
    - [x] Log betting and pot management
        - [x] Pot and side pot changes, contributions, winners
        - [x] Minimum/maximum raise calculations and logic
        - [x] All-in and short all-in handling
    - [ ] Log error and exception events
        - [x] Warnings for invalid actions or amounts
        - [ ] Uncaught exceptions and stack traces
        - [ ] Invalid game state detection (e.g., negative stack, duplicate IDs)
    - [ ] Log edge case handling
        - [ ] Explicitly log when edge cases are encountered (short all-ins, split pots, forced showdowns)
        - [ ] Add log statements for rare/complex scenarios (side pot creation, multiple all-ins)
    - [ ] Log debugging information
        - [x] Log full game state at key points (chip counts, hand evaluation)
        - [ ] Add log level control (info, warn, error, debug)
    - [ ] Log API and client interactions
        - [ ] Log incoming API requests and outgoing responses
        - [ ] Log authentication/authorization events
    - [ ] Production logging improvements
        - [x] Log to file as well as console
        - [ ] Use a structured logging library (e.g., winston, pino)
        - [ ] Add unique hand/game IDs to logs for traceability

-----

## Phase 2: Database Architecture (Start Here)

> **Note:** Database foundations must come before security. Security features (like authentication, sessions, and access control) depend on having persistent data structures (users, games, hands, sessions) to protect. You can't secure what doesn't exist yet!

**Stack:**
- **Database:** Supabase (managed PostgreSQL)
- **ORM/Query Tool:** Prisma (for TypeScript projects, beginner-friendly, auto-generates types)

**Step-by-step checklist for minimal DB schema with Supabase:**
- [x] Create a free account at [supabase.com](https://supabase.com) and start a new project
- [x] Wait for your Supabase database to initialize (can take a few minutes)
- [x] In the Supabase dashboard, go to Project Settings → Database → Connection string
- [x] Copy the `postgresql://...` connection string
- [x] In your project, add Prisma (`npm install prisma @prisma/client`)
- [x] Initialize Prisma (`npx prisma init`)
- [x] In your project root, open `.env` and set `DATABASE_URL` to your Supabase connection string
- [x] In `prisma/schema.prisma`, set the provider to `postgresql`
- [x] Define minimal schema in `prisma/schema.prisma`:
    - [x] `User` table (id, username, email, passwordHash, createdAt)
    - [x] `Game` table (id, createdAt, status)
    - [x] `Hand` table (id, gameId, handNumber, state, createdAt)
    - [x] `TableSession` table (id, gameId, playerId, joinedAt)
- [x] Run `npx prisma migrate dev --name init` to create tables in Supabase
- [x] (Optional) Add a Prisma seed script to create test users and games
- [x] Test your DB connection:
    - [x] Use `npx prisma studio` to view/edit tables
    - [x] Or use the Supabase web UI to check your tables
    - [x] Or run a simple query from your backend using Prisma

**(Once these are done, you can start building security features that use these tables!)**

## Phase 3: Security Implementation (After DB)

> **Note:** Security features depend on the database. Complete the minimal DB setup above first.

- [ ] WebSocket Secure (WSS) Implementation (AI with Human Review)
  - [ ] Replace HTTP with WebSocket communication
  - [ ] Add SSL/TLS encryption
  - [ ] Implement heartbeat mechanism
  - [ ] Add reconnection handling

- [ ] Authentication & Session Management
  - [ ] JWT authentication (issue tokens after login/signup)
  - [ ] Password hashing (use bcrypt or argon2)
  - [ ] Session table (track active sessions in DB)
  - [ ] Secure WebSocket room assignment (users join tables by session)

- [ ] Card Security (Human)
  - [ ] Implement end-to-end encryption for hole cards
  - [ ] Add secure RNG for card dealing
  - [ ] Implement card signature verification
  - [ ] Add anti-tampering measures

- [ ] User Security (Hybrid)
  - [ ] Add JWT authentication (AI)
  - [ ] Implement session management (AI)
  - [ ] Add rate limiting (AI)
  - [ ] Implement IP-based security measures (Human)

## Phase 4: Enhanced UI/UX (AI)
- [ ] Card Animations
  - [ ] Dealing animations
  - [ ] Card flip effects
  - [ ] Pot collection animations
  - [ ] Chip movement

- [ ] Table Features (AI)
  - [ ] Chat system
  - [ ] Emotes/reactions
  - [ ] Time bank indicator
  - [ ] Action timer animations

- [ ] Player Experience (AI)
  - [ ] Hand strength indicator
  - [ ] Odds calculator
  - [ ] Previous action display
  - [ ] Player statistics display

## Phase 5: Advanced Features
- [ ] Multi-table Support (Hybrid)
  - [ ] Table switching (AI)
  - [ ] Mini-table view (AI)
  - [ ] Synchronized actions (Human)
  - [ ] Cross-table chat (AI)

- [ ] Tournament System (Hybrid)
  - [ ] Tournament lobby (AI)
  - [ ] Blind structure (AI)
  - [ ] Payout structure (Human)
  - [ ] Tournament types (AI)

- [ ] Social Features (AI)
  - [ ] Friend system
  - [ ] Player profiles
  - [ ] Achievement system
  - [ ] Leaderboards

## Technology Stack

### Frontend (AI)
- React (Current)
- TypeScript (Current)
- Additional Considerations:
  - [ ] Three.js for 3D animations
  - [ ] Framer Motion for transitions
  - [ ] Styled Components for styling
  - [ ] React Query for state management

### Backend (Hybrid)
- Node.js (Current)
- TypeScript (Current)
- Additional Needs:
  - [ ] PostgreSQL for user data (AI)
  - [ ] Redis for real-time state (Human)
  - [ ] MongoDB for game history (AI)
  - [ ] WebSocket server (AI)

### Infrastructure (Human)
- [ ] Load balancer
- [ ] Game servers
- [ ] Database servers
- [ ] Monitoring system

## Testing Strategy
- [ ] Unit Tests (AI)
  - [ ] Game logic
  - [ ] Card dealing
  - [ ] Betting logic
  - [ ] Hand evaluation

- [ ] Integration Tests (Hybrid)
  - [ ] API endpoints (AI)
  - [ ] WebSocket communication (AI)
  - [ ] Database operations (AI)
  - [ ] Authentication flow (Human)

- [ ] Load Tests (Human)
  - [ ] Concurrent games
  - [ ] Multiple tables
  - [ ] Chat system
  - [ ] Tournament system

## Monitoring and Maintenance (Human)
- [ ] Error tracking system
- [ ] Performance monitoring
- [ ] User behavior analytics
- [ ] Automated backups
- [ ] Deployment pipeline

## Future Considerations (Human Architecture, AI Implementation)
- [ ] Mobile app development
- [ ] VR/AR support
- [ ] Additional poker variants
- [ ] International support
- [ ] Cryptocurrency integration

## Compliance and Regulation (Human)
- [ ] Age verification
- [ ] KYC implementation
- [ ] Responsible gaming features
- [ ] Regional compliance
- [ ] Financial regulations

## Implementation Notes

### AI-Led Components (With Senior Review)
- Core game mechanics
- Basic UI/UX features
- Standard API implementations
- Database CRUD operations
- Basic security patterns
- Testing implementation
- Documentation

### Human-Required Components
- Security architecture design
- Financial system design
- Compliance implementation
- Infrastructure planning
- Performance optimization
- System scaling
- Critical security reviews

### Hybrid Components (AI Implementation + Human Architecture)
- WebSocket communication
- State management
- Tournament logic
- Multi-table coordination
- Authentication flow

This checklist and implementation guide will be updated as we progress and new requirements are identified.

## WebSocket Migration
- server.ts: Complete rewrite
- App.tsx: Replace polling with WebSocket
- ActionPanel.tsx: Update communication
- PokerGame.ts: Add event emitters

## Card Security
- Card.ts: Add encryption
- PokerGame.ts: 
  - Modify dealHoleCards()
  - Update showdown()
  - Change getGameState()
- CardDisplay.tsx: Add decryption

## User Security
- New files:
  - auth.ts
  - middleware.ts
  - session.ts
- Modify:
  - server.ts: Add auth routes
  - App.tsx: Add auth flow

## Anti-Tampering
- PokerGame.ts:
  - Add state validation
  - Add action verification
- New files:
  - validator.ts
  - integrity.ts
