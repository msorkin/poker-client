# Database Refactor Migration Plan

This plan details the step-by-step migration from in-memory data structures to a scalable, production-ready database architecture using Supabase (PostgreSQL) and Prisma. Each section is broken down into actionable, incremental subtasks with checkboxes for tracking progress.

---

## 1. User Management
- [ ] Refactor user creation to write to the `User` table via Prisma
    - [ ] Replace in-memory user creation with Prisma `create`
    - [ ] Validate uniqueness of username/email at DB level
    - [ ] Hash passwords before storing
- [ ] Refactor user lookup (login, fetch profile) to use Prisma `findUnique`
- [ ] Update all user-related logic to use DB IDs as primary keys
- [ ] Add user update and delete endpoints using Prisma
- [ ] Test user CRUD thoroughly

## 2. Authentication & Sessions
- [ ] Implement signup endpoint (writes to DB, returns JWT)
- [ ] Implement login endpoint (verifies password, returns JWT)
- [ ] Store active sessions in a `Session` table (optional, for tracking/logout)
- [ ] Middleware to validate JWT and fetch user from DB on each request
- [ ] Add password reset flow (optional, for production)
- [ ] Test authentication and session flows

## 3. Game Management
- [ ] Refactor game creation to write to the `Game` table via Prisma
    - [ ] Replace in-memory game creation with Prisma `create`
    - [ ] Store game status, createdAt, etc.
- [ ] Refactor game lookup and listing to use Prisma queries
- [ ] Update all game-related logic to use DB IDs
- [ ] Add game update and delete endpoints
- [ ] Test game CRUD thoroughly

## 4. Hand Management
- [ ] Refactor hand creation to write to the `Hand` table via Prisma
    - [ ] Store handNumber, state, createdAt, gameId
- [ ] Refactor hand lookup and listing to use Prisma queries
- [ ] Update all hand-related logic to use DB IDs
- [ ] Add hand update and delete endpoints
- [ ] Test hand CRUD thoroughly

## 5. Table Sessions (Player-Table Mapping)
- [ ] Refactor player-to-table assignment to use the `TableSession` table
    - [ ] On join, create a TableSession row
    - [ ] On leave, delete TableSession row
- [ ] Update all logic that checks which players are at which tables to use DB
- [ ] Test session join/leave flows

## 6. Game State Persistence
- [ ] Identify which parts of game state must be persisted (for recovery, analytics, etc.)
- [ ] Refactor state updates (bets, stacks, actions) to write to DB as needed
- [ ] Implement periodic or event-driven state snapshots (optional, for production)
- [ ] Add logic to restore game state from DB on server restart
- [ ] Test state persistence and recovery

## 7. API/Server Endpoints
- [ ] Refactor all endpoints to use Prisma for DB access
- [ ] Ensure all endpoints validate input and handle errors gracefully
- [ ] Add pagination and filtering for list endpoints (games, hands, users)
- [ ] Add rate limiting and logging (for production)
- [ ] Test all endpoints with real DB data

## 8. Real-Time & WebSocket Integration
- [ ] Update WebSocket logic to use DB-backed user/game/session data
- [ ] Ensure table/game rooms are mapped to DB game/session IDs
- [ ] Test real-time flows with multiple clients and DB state

## 9. Testing & Rollback
- [ ] Write unit and integration tests for all DB-backed features
- [ ] Test migration on a staging environment before production
- [ ] Document rollback steps (e.g., revert to in-memory if DB fails)
- [ ] Monitor logs and DB performance after migration

## 10. Production Readiness
- [ ] Add DB connection pooling (Prisma handles this by default)
- [ ] Set up automated DB backups (Supabase provides this)
- [ ] Add monitoring for DB errors and slow queries
- [ ] Review and optimize DB indexes for common queries
- [ ] Document all DB schema and migration steps for future devs

---

**Tip:** Migrate incrementally—start with users, then games, then hands, etc. Test each step before moving to the next. Always keep a backup and rollback plan.
