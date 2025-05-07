# Database Refactor Migration Plan

This plan details the step-by-step migration from in-memory data structures to a scalable, production-ready cash game poker system using Supabase (PostgreSQL) and Prisma. Each section is broken down into incremental subtasks aligned with our phased schema implementation.

---

## 1. User Management & Financial System (Phase 1)
- [x] Refactor user creation to write to the `User` table via Prisma
    - [x] Replace in-memory user creation with Prisma `create`
    - [x] Validate uniqueness of username/email at DB level
    - [ ] Hash passwords before storing
    - [ ] Add balance field and balance management
    - [ ] Add isAdmin flag and admin permissions
- [x] Refactor user lookup (login, fetch profile) to use Prisma `findUnique`
- [x] Update all user-related logic to use DB IDs as primary keys
- [x] Add user update and delete endpoints using Prisma
- [ ] Implement transaction logging system
    - [ ] Create Transaction model and migrations
    - [ ] Add transaction recording for all balance changes
    - [ ] Implement transaction history endpoint
- [ ] Test user CRUD and financial operations thoroughly

## 2. Authentication & Sessions
- [ ] Implement signup endpoint (writes to DB, returns JWT)
- [ ] Implement login endpoint (verifies password, returns JWT)
    - [ ] Add lastLogin timestamp update
    - [ ] Track session data for admin monitoring
- [ ] Store active sessions in a `Session` table
- [ ] Middleware to validate JWT and fetch user from DB on each request
- [ ] Add admin-specific middleware for protected routes
- [ ] Test authentication flows with admin privileges

## 3. Game Management (Phase 1)
- [x] Refactor game creation to write to the `Game` table via Prisma
    - [x] Replace in-memory game creation with Prisma `create`
    - [x] Add min/max buy-in configuration
    - [x] Add player limit configuration
    - [x] Store game status, createdAt, etc.
- [ ] Implement buy-in management system
    - [x] Create BuyInManager service
    - [x] Add buy-in validation logic
    - [ ] Implement rebuy functionality // ----COME BACK TO THIS AFTER MVP---- 
        - [ ] Add `rebuy()` method to `BuyInManager`
        - [ ] Validate player is already seated
        - [ ] Ensure rebuy does not exceed `maxBuyIn`
        - [ ] Ensure player has sufficient balance
        - [ ] Update `TableSession.stack` with rebuy amount
        - [ ] Create `TransactionRecord` with type `REBUY`
- [ ] Refactor game lookup and listing to use Prisma queries
- [ ] Update all game-related logic to use DB IDs
- [ ] Add game update and delete endpoints
- [ ] Test game CRUD and buy-in flows thoroughly

## 4. Hand Management (Phase 2)
- [ ] Refactor hand creation to write to the `Hand` table via Prisma
    - [ ] Store handNumber, state, createdAt, gameId
    - [ ] Add rake calculation and tracking
    - [ ] Add action history recording
    - [ ] Track blind positions
- [ ] Create HandHistory system
    - [ ] Implement HandHistory model and relations
    - [ ] Add personal hole card tracking
    - [ ] Add hand strength calculation
    - [ ] Implement winner tracking
- [ ] Refactor hand lookup and listing to use Prisma queries
- [ ] Add hand replay functionality
- [ ] Test hand tracking and history thoroughly

## 5. Table Sessions (Phase 1)
- [ ] Refactor player-to-table assignment to use the `TableSession` table
    - [ ] On join, create TableSession row with initial buy-in
    - [ ] Track rebuy amounts
    - [ ] Handle player disconnections
    - [ ] Manage active/inactive status
- [ ] Implement cash out functionality
    - [ ] Add balance updates
    - [ ] Record transactions
    - [ ] Update session status
- [ ] Test session management thoroughly

## 6. Game State & Statistics (Phase 3)
- [ ] Create PlayerStats system
    - [ ] Implement real-time stat tracking
    - [ ] Add historical calculations
    - [ ] Create stat update triggers
- [ ] Implement advanced table features
    - [ ] Add time bank system
    - [ ] Add ante support
    - [ ] Add straddle support
- [ ] Create audit logging system
    - [ ] Implement AuditLog model
    - [ ] Add logging triggers for important actions
    - [ ] Create admin dashboard endpoints

## 7. API/Server Endpoints
- [ ] Refactor all endpoints to use Prisma for DB access
- [ ] Add new cash game specific endpoints:
    - [ ] Buy-in management
    - [ ] Rebuy processing
    - [ ] Cash out handling
    - [ ] Hand history retrieval
    - [ ] Statistics access
- [ ] Add admin endpoints:
    - [ ] Table management
    - [ ] Player management
    - [ ] Transaction monitoring
- [ ] Implement rate limiting and logging

## 8. Real-Time & WebSocket Integration
- [ ] Update WebSocket logic to use DB-backed data
- [ ] Add real-time balance updates
- [ ] Implement disconnect handling
- [ ] Add auto-action support
- [ ] Test real-time flows thoroughly

## 9. Testing & Monitoring
- [ ] Write unit tests for new components:
    - [ ] Buy-in management
    - [ ] Transaction processing
    - [ ] Hand history recording
    - [ ] Statistics calculation
- [ ] Add integration tests for:
    - [ ] Complete game flows
    - [ ] Financial operations
    - [ ] Admin operations
- [ ] Implement monitoring:
    - [ ] Transaction monitoring
    - [ ] Game state monitoring
    - [ ] Performance metrics
    - [ ] Error tracking

## 10. Production Readiness
- [ ] Optimize database performance:
    - [ ] Add indexes for common queries
    - [ ] Implement caching strategy
    - [ ] Set up batch processing for stats
- [ ] Set up backup systems:
    - [ ] Regular database backups
    - [ ] Transaction logs
    - [ ] Audit trail backups
- [ ] Implement security measures:
    - [ ] Transaction validation
    - [ ] Admin access controls
    - [ ] Rate limiting
- [ ] Create documentation:
    - [ ] API documentation
    - [ ] Database schema
    - [ ] Deployment procedures
    - [ ] Recovery procedures

---

**Implementation Strategy:**
1. Start with Phase 1 components (User Management, Basic Game Features)
2. Move to Phase 2 (Hand History, Action Tracking)
3. Finally implement Phase 3 (Statistics, Advanced Features)

**Note:** Each phase should be fully tested before moving to the next. Maintain backward compatibility throughout the migration.
