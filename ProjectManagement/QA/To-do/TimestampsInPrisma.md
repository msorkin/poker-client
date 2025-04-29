Potential Things We May Have Missed or Need Later

Issue	Is it missing?	When to Handle

Soft deletes (deletedAt)	❌ Not handled yet	Later — when we want to "archive" games instead of permanently deleting

Timestamps on state changes (e.g., player folds, action made)	❌ Not yet	Optional — good for analytics later

Audit logs of sensitive actions (e.g., user password changes, large bankroll movements)	❌ Not yet	Later — when you start handling real money or accounts

createdAt vs updatedAt fields (tracking both creation and last change)	❌ Partial	Prisma updatedAt fields can be auto-handled with @updatedAt, but you may want to explicitly add this to User, Game, Hand later
