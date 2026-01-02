# Habits

Habits are scheduled recurring activities, for example: _"Run 3km every Thursday afternoon"_. The main goal of this feature is to train the user's brain to perform these activities autonomously, with the application helping to enforce them by providing timely reminders.

## Category

Each habit belongs to a category, such as _"Work"_, which helps users mentally and visually distinguish between different habits.

## Frequency

Users can set different frequency patterns:

- **Specific days of the week**: e.g., `Swimming Training [Monday, Thursday, Friday]`
- **Daily**: e.g., `Wash the dishes [...every day]`
- **Specific days of the month**: e.g., `Waste collection [1, 4, 19, 23]`
- **Every N days**: e.g., `Take a shower [every 2 days]`
- **N times per week**: e.g., `Grocery shopping [2 times per week]`

## Repetition

Repetition defines how many times an activity should be performed each day. For example, for a habit like _"Brush your teeth"_, you might specify it should be done _3 times per day_.

## Time and Reminder

**Time** is useful when an activity depends on a specific moment of the day, such as _"Walk the dog"_, where you can specify the exact time: _"at 4:30 PM"_. If the user doesn't require a specific time, this value can be set to `null`.

**Reminder** serves to notify the user that they need to perform a specific activity. Unlike the scheduled time, the reminder indicates when the system should notify the user about the task. This can also be set to `null` if the user doesn't want any reminders.

## Additional Details

The application stores additional information along with each habit:

- **Difficulty**: [Easy, Normal, Hard, Demanding, Challenging]
- **Comment** (optional): Brief description
- **Due date** (optional): Expiration date for the habit

---

## Database Schema

### Habit Model

```typescript
model Habit {
  id          String   @id @default(uuid())
  userId      String
  categoryId  String?

  // Core fields
  title       String
  description String?

  // Frequency configuration
  frequency   FrequencyType
  frequencyConfig Json // Stores specific configuration based on frequency type

  // Repetition and timing
  dailyRepetitions Int @default(1)
  scheduledTime    DateTime?
  reminderTime     DateTime?

  // Additional details
  difficulty  DifficultyLevel @default(NORMAL)
  dueDate     DateTime?

  // Tracking
  isActive    Boolean  @default(true)
  streakCount Int      @default(0)

  // Relations
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  category    HabitCategory? @relation(fields: [categoryId], references: [id])
  completions HabitCompletion[]

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([userId])
  @@index([categoryId])
}

enum FrequencyType {
  SPECIFIC_DAYS_OF_WEEK  // [Monday, Thursday, Friday]
  DAILY                  // Every day
  SPECIFIC_DAYS_OF_MONTH // [1, 4, 19, 23]
  EVERY_N_DAYS           // Every 2 days
  N_TIMES_PER_WEEK       // 2 times per week
}

enum DifficultyLevel {
  EASY
  NORMAL
  HARD
  DEMANDING
  CHALLENGING
}

model HabitCategory {
  id          String   @id @default(uuid())
  userId      String
  name        String
  color       String?
  icon        String?

  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  habits      Habit[]

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@unique([userId, name])
  @@index([userId])
}

model HabitCompletion {
  id          String   @id @default(uuid())
  habitId     String
  userId      String
  completedAt DateTime @default(now())
  notes       String?

  habit       Habit    @relation(fields: [habitId], references: [id], onDelete: Cascade)
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([habitId])
  @@index([userId])
  @@index([completedAt])
}
```

### Frequency Configuration Examples

The `frequencyConfig` JSON field stores type-specific configuration:

**SPECIFIC_DAYS_OF_WEEK:**

```json
{
    "daysOfWeek": [1, 4, 5] // Monday=1, Thursday=4, Friday=5
}
```

**DAILY:**

```json
{} // No additional config needed
```

**SPECIFIC_DAYS_OF_MONTH:**

```json
{
    "daysOfMonth": [1, 4, 19, 23]
}
```

**EVERY_N_DAYS:**

```json
{
    "intervalDays": 2,
    "startDate": "2025-01-01T00:00:00Z"
}
```

**N_TIMES_PER_WEEK:**

```json
{
    "timesPerWeek": 2,
    "weekStartsOn": 1 // Monday=1
}
```

---

## API Endpoints

### Create Habit

**Mutation:**

```graphql
mutation CreateHabit($input: CreateHabitInput!) {
    createHabit(input: $input) {
        id
        title
        frequency
        dailyRepetitions
        scheduledTime
        reminderTime
        difficulty
        category {
            id
            name
        }
    }
}
```

**Input:**

```typescript
input CreateHabitInput {
  title: String!
  description: String
  categoryId: String
  frequency: FrequencyType!
  frequencyConfig: JSON!
  dailyRepetitions: Int = 1
  scheduledTime: DateTime
  reminderTime: DateTime
  difficulty: DifficultyLevel = NORMAL
  dueDate: DateTime
}
```

### Get User Habits

**Query:**

```graphql
query GetHabits($filters: HabitFilters) {
    habits(filters: $filters) {
        id
        title
        frequency
        category {
            name
            color
        }
        streakCount
        nextScheduledDate
    }
}
```

### Complete Habit

**Mutation:**

```graphql
mutation CompleteHabit($habitId: String!, $notes: String) {
    completeHabit(habitId: $habitId, notes: $notes) {
        id
        completedAt
        habit {
            streakCount
        }
    }
}
```

### Get Habit Statistics

**Query:**

```graphql
query GetHabitStats($habitId: String!, $period: StatsPeriod!) {
    habitStats(habitId: $habitId, period: $period) {
        completionRate
        currentStreak
        longestStreak
        totalCompletions
        completionsByDay {
            date
            completed
        }
    }
}
```

---

## Business Logic

### Streak Calculation

A streak is maintained when a habit is completed according to its frequency:

- **Daily habits**: Must be completed every day
- **Weekly habits**: Must be completed the required number of times per week
- **Every N days**: Must be completed within the interval window

**Algorithm:**

```typescript
async calculateStreak(habitId: string): Promise<number> {
  const habit = await this.findOne(habitId);
  const completions = await this.getCompletions(habitId);

  let streak = 0;
  let currentDate = new Date();

  while (true) {
    const expectedDate = this.getExpectedDateForFrequency(habit, streak);
    const wasCompleted = completions.some(c =>
      isSameDay(c.completedAt, expectedDate)
    );

    if (!wasCompleted) break;
    streak++;
  }

  return streak;
}
```

### Next Scheduled Date

Calculate when a habit should next occur:

```typescript
getNextScheduledDate(habit: Habit): Date {
  switch (habit.frequency) {
    case FrequencyType.SPECIFIC_DAYS_OF_WEEK:
      return getNextDayOfWeek(habit.frequencyConfig.daysOfWeek);

    case FrequencyType.DAILY:
      return addDays(new Date(), 1);

    case FrequencyType.EVERY_N_DAYS:
      const lastCompletion = habit.completions[0]?.completedAt;
      return addDays(lastCompletion, habit.frequencyConfig.intervalDays);

    // ... other cases
  }
}
```

### Reminder Notifications

The system should send reminders at the specified `reminderTime`:

```typescript
async sendHabitReminders(): Promise<void> {
  const now = new Date();

  // Find habits with reminders due now
  const habitsToRemind = await this.habitRepository.findMany({
    where: {
      isActive: true,
      reminderTime: {
        gte: subMinutes(now, 5),
        lte: now,
      },
    },
    include: { user: true },
  });

  for (const habit of habitsToRemind) {
    await this.notificationService.send({
      userId: habit.userId,
      title: `Reminder: ${habit.title}`,
      body: `Time to complete your habit!`,
      type: 'HABIT_REMINDER',
      data: { habitId: habit.id },
    });
  }
}
```

---

## Frontend Components

### Habit Card Component

```typescript
interface HabitCardProps {
  habit: Habit;
  onComplete: (habitId: string) => void;
}

function HabitCard({ habit, onComplete }: HabitCardProps) {
  return (
    <Card>
      <CardHeader>
        <Badge color={habit.category?.color}>
          {habit.category?.name}
        </Badge>
        <DifficultyBadge level={habit.difficulty} />
      </CardHeader>

      <CardBody>
        <h3>{habit.title}</h3>
        <p>{habit.description}</p>

        <FrequencyDisplay frequency={habit.frequency} config={habit.frequencyConfig} />

        {habit.scheduledTime && (
          <TimeDisplay time={habit.scheduledTime} />
        )}

        <StreakCounter count={habit.streakCount} />
      </CardBody>

      <CardFooter>
        <Button onClick={() => onComplete(habit.id)}>
          Complete
        </Button>
      </CardFooter>
    </Card>
  );
}
```

---

## Testing Scenarios

### Unit Tests

```typescript
describe('HabitService', () => {
    it('should calculate streak correctly for daily habits', async () => {
        const habit = createDailyHabit()
        const completions = [
            { completedAt: subDays(new Date(), 0) },
            { completedAt: subDays(new Date(), 1) },
            { completedAt: subDays(new Date(), 2) },
        ]

        const streak = await service.calculateStreak(habit, completions)
        expect(streak).toBe(3)
    })

    it('should break streak when day is missed', async () => {
        const habit = createDailyHabit()
        const completions = [
            { completedAt: subDays(new Date(), 0) },
            // Day 1 missing
            { completedAt: subDays(new Date(), 2) },
        ]

        const streak = await service.calculateStreak(habit, completions)
        expect(streak).toBe(1)
    })
})
```

---

## Performance Considerations

- Index on `userId` and `categoryId` for fast filtering
- Index on `completedAt` for streak calculations
- Use pagination for habit lists
- Cache streak calculations (recalculate on completion only)
- Batch reminder notifications

---

## Future Enhancements

1. **Smart scheduling**: ML-based suggestion of optimal times
2. **Habit templates**: Pre-configured popular habits
3. **Social features**: Share streaks with friends
4. **Analytics dashboard**: Detailed completion insights
5. **Habit chains**: Link related habits together
