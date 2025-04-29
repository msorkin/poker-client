# Cash Game Implementation Plan

## Overview
This document outlines the phased approach to implementing a robust cash game poker system, including both database schema changes and corresponding game logic updates.

## Phase 1: Core Financial System & Basic Enhancements
Focus: Implement basic cash game mechanics and financial tracking

### Database Changes
1. User Model Enhancements:
   ```prisma
   model User {
     balance    Int      @default(0)
     isAdmin    Boolean  @default(false)
     lastLogin  DateTime?
   }
   ```

2. Add Transaction Model:
   ```prisma
   model Transaction {
     id            String          @id @default(uuid())
     userId        String
     type          TransactionType
     amount        Int
     gameId        String?
     balanceBefore Int
     balanceAfter  Int
     timestamp     DateTime        @default(now())
     status        String          @default("COMPLETED")
   }
   ```

3. Enhance TableSession:
   ```prisma
   model TableSession {
     initialBuyIn  Int
     rebuyAmount   Int     @default(0)
     leftAt        DateTime?
     isActive      Boolean @default(true)
   }
   ```

4. Update Game Model:
   ```prisma
   model Game {
     minBuyIn    Int
     maxBuyIn    Int
     minPlayers  Int     @default(2)
     maxPlayers  Int     @default(9)
   }
   ```

### Game Logic Updates
1. Buy-in Management:
   - Add `BuyInManager` class to handle:
     - Initial buy-in validation
     - Rebuy processing
     - Cash out calculations
   - Update `PokerGame` to enforce min/max buy-in limits

2. Player Balance System:
   - Create `BalanceManager` service for:
     - Balance updates
     - Transaction recording
     - Buy-in/cash out processing

3. Table Management:
   - Update table creation to include buy-in limits
   - Add player join/leave validation
   - Implement basic admin controls

4. API Endpoints:
   - POST /api/tables/:tableId/buy-in
   - POST /api/tables/:tableId/rebuy
   - POST /api/tables/:tableId/cash-out
   - GET /api/users/balance

## Phase 2: Enhanced Hand Tracking & History
Focus: Improve hand tracking and history recording

### Database Changes
1. Enhance Hand Model:
   ```prisma
   model Hand {
     rake            Int     @default(0)
     smallBlindIndex Int
     bigBlindIndex   Int
     actions         String  // JSON array of actions
     winners         String? // JSON array of winner info
   }
   ```

2. Add HandHistory Model:
   ```prisma
   model HandHistory {
     id          String   @id @default(uuid())
     handId      String
     userId      String
     holeCards   String?  // JSON array
     handStrength String?
     winAmount   Int?
     position    Int
   }
   ```

### Game Logic Updates
1. Action Tracking:
   - Create `ActionTracker` class to record:
     - Betting sequences
     - Player decisions
     - Timing information
   - Update `PokerGame` to use action tracker

2. Hand History System:
   - Implement `HandHistoryManager` to:
     - Record personal hole cards
     - Track positions
     - Calculate hand strengths
   - Add hand replay capabilities

3. Rake System:
   - Implement `RakeCalculator` class
   - Update pot distribution logic
   - Add rake tracking to hand records

4. API Endpoints:
   - GET /api/hands/:handId
   - GET /api/users/:userId/hand-history
   - GET /api/hands/:handId/replay

## Phase 3: Advanced Features & Statistics
Focus: Add player statistics and advanced table features

### Database Changes
1. Add PlayerStats Model:
   ```prisma
   model PlayerStats {
     handsPlayed       Int    @default(0)
     biggestPot        Int    @default(0)
     totalWinnings     Int    @default(0)
     vpip             Float?
     pfr              Float?
     bbWon            Float?
     threeBetPercentage Float?
   }
   ```

2. Update Game Model:
   ```prisma
   model Game {
     timeBank        Int?
     antesRequired   Boolean @default(false)
     anteAmount      Int?
     straddleAllowed Boolean @default(false)
     autoAction      String? // JSON object
   }
   ```

3. Add AuditLog Model:
   ```prisma
   model AuditLog {
     id        String   @id @default(uuid())
     userId    String?
     action    String
     details   String?
     timestamp DateTime @default(now())
   }
   ```

### Game Logic Updates
1. Statistics System:
   - Create `StatsCalculator` class for:
     - Real-time stat updates
     - Historical calculations
     - Performance metrics
   - Implement stat persistence

2. Advanced Table Features:
   - Add time bank system
   - Implement ante collection
   - Add straddle support
   - Create auto-action system

3. Audit System:
   - Implement `AuditLogger`
   - Add admin dashboard
   - Create monitoring tools

4. API Endpoints:
   - GET /api/users/:userId/stats
   - POST /api/tables/:tableId/straddle
   - POST /api/tables/:tableId/auto-action
   - GET /api/admin/audit-log

## Migration Strategy
1. Database Migrations:
   - Create separate migration for each phase
   - Include rollback procedures
   - Add data backfill scripts

2. Code Deployment:
   - Feature flags for gradual rollout
   - Backward compatibility layers
   - Monitoring and alerts

3. Testing Requirements:
   - Unit tests for new components
   - Integration tests for financial flows
   - Load testing for stat calculations
   - Security testing for admin features

## Considerations & Risks
1. Performance:
   - Index optimization for hand histories
   - Caching strategy for statistics
   - Batch processing for calculations

2. Consistency:
   - Transaction atomicity
   - Race condition prevention
   - State recovery procedures

3. Security:
   - Admin access controls
   - Financial transaction validation
   - Audit trail completeness

4. Scalability:
   - Database partitioning strategy
   - Statistics calculation optimization
   - Hand history storage approach
