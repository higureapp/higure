# Database design

## Entities

## User

| Campo         | Tipo     | Vincoli          | Note              |
| ------------- | -------- | ---------------- | ----------------- |
| id            | UUID     | PK               |                   |
| firstname     | String   | NOT NULL         |                   |
| lastname      | String   | NOT NULL         |                   |
| email         | String   | UNIQUE, NOT NULL |                   |
| phone         | String   | UNIQUE, NULLABLE |                   |
| password      | String   | NOT NULL         | hash              |
| avatarUrl     | String   | NULLABLE         | simplify Avatar   |
| timezone      | String   | NOT NULL         | es. `Europe/Rome` |
| locale        | String   | NOT NULL         | es. `it-IT`       |
| emailVerified | Boolean  | DEFAULT false    |                   |
| phoneVerified | Boolean  | DEFAULT false    |                   |
| lastLoginAt   | DateTime | NULLABLE         |                   |
| createdAt     | DateTime | DEFAULT now      |                   |
| updatedAt     | DateTime | AUTO             |                   |
| deletedAt     | DateTime | NULLABLE         | soft delete       |

---

## Task

| Campo          | Tipo     | Vincoli              | Note                    |
| -------------- | -------- | -------------------- | ----------------------- |
| id             | UUID     | PK                   |                         |
| userId         | UUID     | FK → User.id         |                         |
| title          | String   | NOT NULL             |                         |
| description    | String   | NULLABLE             |                         |
| dueDate        | DateTime | NULLABLE             |                         |
| completedAt    | DateTime | NULLABLE             |                         |
| status         | Enum     | NOT NULL             | `pending`, `completed`  |
| priority       | Enum     | NOT NULL             | `low`, `medium`, `high` |
| isRecurring    | Boolean  | DEFAULT false        |                         |
| recurrenceRule | String   | NULLABLE             | RRULE                   |
| categoryId     | UUID     | FK → TaskCategory.id |                         |
| createdAt      | DateTime | DEFAULT now          |                         |
| updatedAt      | DateTime | AUTO                 |                         |

---

## TaskCategory

| Campo     | Tipo     | Vincoli      | Note |
| --------- | -------- | ------------ | ---- |
| id        | UUID     | PK           |      |
| userId    | UUID     | FK → User.id |      |
| name      | String   | NOT NULL     |      |
| color     | String   | NULLABLE     | UI   |
| createdAt | DateTime | DEFAULT now  |      |
| updatedAt | DateTime | AUTO         |      |

**Unique constraint**

`(userId, name)`

---

## Event (Appointment)

| Campo       | Tipo     | Vincoli      | Note |
| ----------- | -------- | ------------ | ---- |
| id          | UUID     | PK           |      |
| userId      | UUID     | FK → User.id |      |
| title       | String   | NOT NULL     |      |
| description | String   | NULLABLE     |      |
| startAt     | DateTime | NOT NULL     |      |
| endAt       | DateTime | NOT NULL     |      |
| location    | String   | NULLABLE     |      |
| createdAt   | DateTime | DEFAULT now  |      |
| updatedAt   | DateTime | AUTO         |      |

---

## Habit (base)

| Campo     | Tipo     | Vincoli      | Note              |
| --------- | -------- | ------------ | ----------------- |
| id        | UUID     | PK           |                   |
| userId    | UUID     | FK → User.id |                   |
| name      | String   | NOT NULL     |                   |
| frequency | Enum     | NOT NULL     | `daily`, `weekly` |
| isActive  | Boolean  | DEFAULT true |                   |
| createdAt | DateTime | DEFAULT now  |                   |

---

## Sleep

| Campo     | Tipo     | Vincoli      | Note      |
| --------- | -------- | ------------ | --------- |
| id        | UUID     | PK           |           |
| userId    | UUID     | FK → User.id |           |
| sleepAt   | DateTime | NOT NULL     |           |
| wakeAt    | DateTime | NOT NULL     |           |
| quality   | Int      | 1–5          | percepita |
| createdAt | DateTime | DEFAULT now  |           |

# Relationships

## User

- **User 1 — N Task**

- **User 1 — N TaskCategory**

- **User 1 — N Event**

- **User 1 — N Habit**

- **User 1 — N Sleep**

## Task

- **Task N — 1 User**

- **Task N — 1 TaskCategory**

## TaskCategory

- **TaskCategory N — 1 User**

- **TaskCategory 1 — N Task**

## Event

- **Event N — 1 User**

## Habit

- **Habit N — 1 User**

## Sleep

- **Sleep N — 1 User**
