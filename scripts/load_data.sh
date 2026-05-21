#!/usr/bin/env bash

set -e

DB_USER="root"
DB_NAME="higure_db"

echo "╔══════════════════════════════════════╗"
echo "║   higure_db — JournalPage seed tool  ║"
echo "╚══════════════════════════════════════╝"
echo ""

read -rp "Insert the user id (\$1): " USER_ID

if [[ -z "$USER_ID" ]]; then
  echo "❌ Error: ID cannot be empty." >&2
  exit 1
fi

echo ""
echo "▶ Connection to MariaDB as $DB_USER, database: $DB_NAME"
echo "▶ Inserting data for userId = $USER_ID"
echo ""

mariadb -u "$DB_USER" "$DB_NAME" <<EOF

-- USER ID: $USER_ID
INSERT INTO JournalPage (id, userId, date, time, location, content, mood, isActive, lastModified, createdAt, updatedAt) VALUES
(UUID(), '$USER_ID', '2025-11-01 08:30:00', '2025-11-01 08:30:00', 'Home Office', 'November starts cold. Just drafted the first idea for my journal app. Exciting times ahead.', 8, 1, '2025-11-01 08:30:00', '2025-11-01 08:30:00', '2025-11-01 08:30:00'),
(UUID(), '$USER_ID', '2025-11-02 21:00:00', '2025-11-02 21:00:00', 'Living Room', 'Spent the evening looking at database architectures. Relational vs NoSQL is always a tough choice.', 7, 1, '2025-11-02 21:00:00', '2025-11-02 21:00:00', '2025-11-02 21:00:00'),
(UUID(), '$USER_ID', '2025-11-04 19:15:00', '2025-11-04 19:15:00', 'Office', 'Work was exhausting today. Too many meetings, too little coding. Need to recharge.', 4, 1, '2025-11-04 19:15:00', '2025-11-04 19:15:00', '2025-11-04 19:15:00'),
(UUID(), '$USER_ID', '2025-11-05 07:45:00', '2025-11-05 07:45:00', 'Kitchen', 'Good coffee, good morning. Decided to go with MariaDB and Prisma for the new project.', 9, 1, '2025-11-05 07:45:00', '2025-11-05 07:45:00', '2025-11-05 07:45:00'),
(UUID(), '$USER_ID', '2025-11-07 22:30:00', '2025-11-07 22:30:00', 'Bedroom', 'Finally Friday. I can focus on my personal code this weekend without interruptions.', 8, 1, '2025-11-07 22:30:00', '2025-11-07 22:30:00', '2025-11-07 22:30:00'),
(UUID(), '$USER_ID', '2025-11-08 14:00:00', '2025-11-08 14:00:00', 'Coffee Shop', 'Setting up the Prisma schema. It is incredibly intuitive. The initial models are ready.', 9, 1, '2025-11-08 14:00:00', '2025-11-08 14:00:00', '2025-11-08 14:00:00'),
(UUID(), '$USER_ID', '2025-11-10 18:00:00', '2025-11-10 18:00:00', 'Home Office', 'Monday struggle. Dealing with some dependency conflicts in Node.js. Frustrating.', 3, 1, '2025-11-10 18:00:00', '2025-11-10 18:00:00', '2025-11-10 18:00:00'),
(UUID(), '$USER_ID', '2025-11-11 20:20:00', '2025-11-11 20:20:00', 'Living Room', 'Fixed the bugs. Turns out I just needed to update npm. Simple solutions are the best.', 7, 1, '2025-11-11 20:20:00', '2025-11-11 20:20:00', '2025-11-11 20:20:00'),
(UUID(), '$USER_ID', '2025-11-13 09:10:00', '2025-11-13 09:10:00', 'Subway', 'Reading about database indexing on the commute. Need to optimize early.', 6, 1, '2025-11-13 09:10:00', '2025-11-13 09:10:00', '2025-11-13 09:10:00'),
(UUID(), '$USER_ID', '2025-11-14 23:45:00', '2025-11-14 23:45:00', 'Home Office', 'Late night coding session. The User authentication flow is finally working.', 8, 1, '2025-11-14 23:45:00', '2025-11-14 23:45:00', '2025-11-14 23:45:00'),
(UUID(), '$USER_ID', '2025-11-16 11:30:00', '2025-11-16 11:30:00', 'Park', 'Took a long walk. Sometimes stepping away from the keyboard solves the hardest logic problems.', 9, 1, '2025-11-16 11:30:00', '2025-11-16 11:30:00', '2025-11-16 11:30:00'),
(UUID(), '$USER_ID', '2025-11-18 19:00:00', '2025-11-18 19:00:00', 'Gym', 'Workout was brutal but necessary. Desk life is making me stiff.', 6, 1, '2025-11-18 19:00:00', '2025-11-18 19:00:00', '2025-11-18 19:00:00'),
(UUID(), '$USER_ID', '2025-11-19 21:15:00', '2025-11-19 21:15:00', 'Home Office', 'Working on the JWT implementation. Security is hard but fascinating.', 7, 1, '2025-11-19 21:15:00', '2025-11-19 21:15:00', '2025-11-19 21:15:00'),
(UUID(), '$USER_ID', '2025-11-21 22:00:00', '2025-11-21 22:00:00', 'Couch', 'Movie night to disconnect. My brain feels fried after this week.', 5, 1, '2025-11-21 22:00:00', '2025-11-21 22:00:00', '2025-11-21 22:00:00'),
(UUID(), '$USER_ID', '2025-11-22 15:30:00', '2025-11-22 15:30:00', 'Library', 'Researching natural language processing for the journal AI feature. Very complex but cool.', 8, 1, '2025-11-22 15:30:00', '2025-11-22 15:30:00', '2025-11-22 15:30:00'),
(UUID(), '$USER_ID', '2025-11-24 08:00:00', '2025-11-24 08:00:00', 'Kitchen', 'Cold and rainy morning. Motivation is low today, but discipline must take over.', 4, 1, '2025-11-24 08:00:00', '2025-11-24 08:00:00', '2025-11-24 08:00:00'),
(UUID(), '$USER_ID', '2025-11-25 18:45:00', '2025-11-25 18:45:00', 'Home Office', 'Started drafting the frontend architecture. Next.js seems like the right choice.', 8, 1, '2025-11-25 18:45:00', '2025-11-25 18:45:00', '2025-11-25 18:45:00'),
(UUID(), '$USER_ID', '2025-11-27 20:30:00', '2025-11-27 20:30:00', 'Dining Room', 'Had dinner with old friends. It is good to talk about things other than code.', 9, 1, '2025-11-27 20:30:00', '2025-11-27 20:30:00', '2025-11-27 20:30:00'),
(UUID(), '$USER_ID', '2025-11-28 23:10:00', '2025-11-28 23:10:00', 'Bedroom', 'Black Friday deals are distracting. Bought a new mechanical keyboard anyway.', 7, 1, '2025-11-28 23:10:00', '2025-11-28 23:10:00', '2025-11-28 23:10:00'),
(UUID(), '$USER_ID', '2025-11-30 19:00:00', '2025-11-30 19:00:00', 'Home Office', 'End of November. The backend foundation is solid. December will be for UI building.', 8, 1, '2025-11-30 19:00:00', '2025-11-30 19:00:00', '2025-11-30 19:00:00');

INSERT INTO JournalPage (id, userId, date, time, location, content, mood, isActive, lastModified, createdAt, updatedAt) VALUES
(UUID(), '$USER_ID', '2025-12-01 09:00:00', '2025-12-01 09:00:00', 'Home Office', 'Hello December. The new keyboard feels great. Ready to write some React components.', 8, 1, '2025-12-01 09:00:00', '2025-12-01 09:00:00', '2025-12-01 09:00:00'),
(UUID(), '$USER_ID', '2025-12-03 20:15:00', '2025-12-03 20:15:00', 'Living Room', 'Struggling with CSS Grid today. Centering divs is historically painful.', 5, 1, '2025-12-03 20:15:00', '2025-12-03 20:15:00', '2025-12-03 20:15:00'),
(UUID(), '$USER_ID', '2025-12-04 18:30:00', '2025-12-04 18:30:00', 'Office', 'Productive day at work. Brought some good ideas back home for my side project.', 7, 1, '2025-12-04 18:30:00', '2025-12-04 18:30:00', '2025-12-04 18:30:00'),
(UUID(), '$USER_ID', '2025-12-06 14:00:00', '2025-12-06 14:00:00', 'Downtown', 'Christmas shopping. Too crowded, too loud. I prefer the silence of my IDE.', 4, 1, '2025-12-06 14:00:00', '2025-12-06 14:00:00', '2025-12-06 14:00:00'),
(UUID(), '$USER_ID', '2025-12-08 10:45:00', '2025-12-08 10:45:00', 'Home Office', 'Public holiday today. Perfect time to connect the frontend to the Prisma API.', 9, 1, '2025-12-08 10:45:00', '2025-12-08 10:45:00', '2025-12-08 10:45:00'),
(UUID(), '$USER_ID', '2025-12-10 22:10:00', '2025-12-10 22:10:00', 'Bedroom', 'Testing the JournalPage model insertions. The timestamps logic gave me a headache.', 6, 1, '2025-12-10 22:10:00', '2025-12-10 22:10:00', '2025-12-10 22:10:00'),
(UUID(), '$USER_ID', '2025-12-11 19:30:00', '2025-12-11 19:30:00', 'Kitchen', 'Cooking dinner and thinking about how to visualize user moods. A chart would be nice.', 7, 1, '2025-12-11 19:30:00', '2025-12-11 19:30:00', '2025-12-11 19:30:00'),
(UUID(), '$USER_ID', '2025-12-13 16:00:00', '2025-12-13 16:00:00', 'Coffee Shop', 'Snow is falling outside. Inside, my React app is finally rendering data from MariaDB.', 10, 1, '2025-12-13 16:00:00', '2025-12-13 16:00:00', '2025-12-13 16:00:00'),
(UUID(), '$USER_ID', '2025-12-15 08:20:00', '2025-12-15 08:20:00', 'Subway', 'Listening to a tech podcast. They talked about Edge functions. Need to investigate.', 8, 1, '2025-12-15 08:20:00', '2025-12-15 08:20:00', '2025-12-15 08:20:00'),
(UUID(), '$USER_ID', '2025-12-17 21:00:00', '2025-12-17 21:00:00', 'Home Office', 'Implemented the Habit tracking model. It feels good to see the schema coming to life.', 8, 1, '2025-12-17 21:00:00', '2025-12-17 21:00:00', '2025-12-17 21:00:00'),
(UUID(), '$USER_ID', '2025-12-18 23:50:00', '2025-12-18 23:50:00', 'Bedroom', 'Burnout is knocking. I need to take a break before the holidays.', 3, 1, '2025-12-18 23:50:00', '2025-12-18 23:50:00', '2025-12-18 23:50:00'),
(UUID(), '$USER_ID', '2025-12-20 10:00:00', '2025-12-20 10:00:00', 'Living Room', 'Decorated the tree today. Took my mind off programming entirely. Much needed.', 9, 1, '2025-12-20 10:00:00', '2025-12-20 10:00:00', '2025-12-20 10:00:00'),
(UUID(), '$USER_ID', '2025-12-22 14:30:00', '2025-12-22 14:30:00', 'Office', 'Last day of work before the break. The office is empty and quiet.', 7, 1, '2025-12-22 14:30:00', '2025-12-22 14:30:00', '2025-12-22 14:30:00'),
(UUID(), '$USER_ID', '2025-12-24 19:00:00', '2025-12-24 19:00:00', 'Parents House', 'Christmas Eve. Family is gathered. Grateful for the food and the company.', 10, 1, '2025-12-24 19:00:00', '2025-12-24 19:00:00', '2025-12-24 19:00:00'),
(UUID(), '$USER_ID', '2025-12-25 15:00:00', '2025-12-25 15:00:00', 'Parents House', 'Ate too much. Not even thinking about opening my laptop today. Merry Christmas.', 9, 1, '2025-12-25 15:00:00', '2025-12-25 15:00:00', '2025-12-25 15:00:00'),
(UUID(), '$USER_ID', '2025-12-26 11:00:00', '2025-12-26 11:00:00', 'Living Room', 'Lazy Boxing Day. Watched some tutorials on AI integration just for fun.', 7, 1, '2025-12-26 11:00:00', '2025-12-26 11:00:00', '2025-12-26 11:00:00'),
(UUID(), '$USER_ID', '2025-12-28 20:45:00', '2025-12-28 20:45:00', 'Home Office', 'Back to the project. Cleaning up some technical debt from November.', 6, 1, '2025-12-28 20:45:00', '2025-12-28 20:45:00', '2025-12-28 20:45:00'),
(UUID(), '$USER_ID', '2025-12-29 22:30:00', '2025-12-29 22:30:00', 'Home Office', 'Designing the JournalAIAnalysis schema. Claude Sonnet seems perfect for this.', 8, 1, '2025-12-29 22:30:00', '2025-12-29 22:30:00', '2025-12-29 22:30:00'),
(UUID(), '$USER_ID', '2025-12-30 18:15:00', '2025-12-30 18:15:00', 'Home Office', 'Reflecting on the year. I learned a lot. Looking forward to launching this app.', 8, 1, '2025-12-30 18:15:00', '2025-12-30 18:15:00', '2025-12-30 18:15:00'),
(UUID(), '$USER_ID', '2025-12-31 23:30:00', '2025-12-31 23:30:00', 'Balcony', 'Waiting for midnight. A toast to 2026 and new bugs to fix. Happy New Year!', 10, 1, '2025-12-31 23:30:00', '2025-12-31 23:30:00', '2025-12-31 23:30:00');

INSERT INTO JournalPage (id, userId, date, time, location, content, mood, isActive, lastModified, createdAt, updatedAt) VALUES
(UUID(), '$USER_ID', '2026-02-01 09:15:00', '2026-02-01 09:15:00', 'Home Office', 'February already. The prototype is functional. Now I need to focus on performance.', 7, 1, '2026-02-01 09:15:00', '2026-02-01 09:15:00', '2026-02-01 09:15:00'),
(UUID(), '$USER_ID', '2026-02-02 18:40:00', '2026-02-02 18:40:00', 'Kitchen', 'Meal prep for the week. Eating healthy is hard when you just want to code all night.', 6, 1, '2026-02-02 18:40:00', '2026-02-02 18:40:00', '2026-02-02 18:40:00'),
(UUID(), '$USER_ID', '2026-02-04 21:00:00', '2026-02-04 21:00:00', 'Living Room', 'Added cascade deletes to the database schema. Risky but necessary for cleanup.', 8, 1, '2026-02-04 21:00:00', '2026-02-04 21:00:00', '2026-02-04 21:00:00'),
(UUID(), '$USER_ID', '2026-02-05 23:20:00', '2026-02-05 23:20:00', 'Bedroom', 'Could not sleep, kept thinking about a UI bug on the mobile view. Fixed it in bed.', 5, 1, '2026-02-05 23:20:00', '2026-02-05 23:20:00', '2026-02-05 23:20:00'),
(UUID(), '$USER_ID', '2026-02-07 14:10:00', '2026-02-07 14:10:00', 'Park', 'Cold breeze but sunny. Testing the sleep tracking logic mentally while walking.', 8, 1, '2026-02-07 14:10:00', '2026-02-07 14:10:00', '2026-02-07 14:10:00'),
(UUID(), '$USER_ID', '2026-02-09 08:30:00', '2026-02-09 08:30:00', 'Subway', 'Monday again. The week looks packed with client meetings.', 4, 1, '2026-02-09 08:30:00', '2026-02-09 08:30:00', '2026-02-09 08:30:00'),
(UUID(), '$USER_ID', '2026-02-10 19:45:00', '2026-02-10 19:45:00', 'Home Office', 'Started writing the JournalMetrics analyzer. Calculating word counts and lexical richness.', 9, 1, '2026-02-10 19:45:00', '2026-02-10 19:45:00', '2026-02-10 19:45:00'),
(UUID(), '$USER_ID', '2026-02-12 22:15:00', '2026-02-12 22:15:00', 'Home Office', 'Regex is a nightmare. Trying to parse sentences accurately for the metrics engine.', 3, 1, '2026-02-12 22:15:00', '2026-02-12 22:15:00', '2026-02-12 22:15:00'),
(UUID(), '$USER_ID', '2026-02-14 20:00:00', '2026-02-14 20:00:00', 'Restaurant', 'Valentine''s Day dinner. It is nice to celebrate love and take a pause from technology.', 10, 1, '2026-02-14 20:00:00', '2026-02-14 20:00:00', '2026-02-14 20:00:00'),
(UUID(), '$USER_ID', '2026-02-15 16:30:00', '2026-02-15 16:30:00', 'Living Room', 'Sunday planning. Outlining the tags system for the journal entries.', 7, 1, '2026-02-15 16:30:00', '2026-02-15 16:30:00', '2026-02-15 16:30:00'),
(UUID(), '$USER_ID', '2026-02-17 09:00:00', '2026-02-17 09:00:00', 'Office', 'A big server crash at work today. Chaos everywhere. Glad my app is just local for now.', 2, 1, '2026-02-17 09:00:00', '2026-02-17 09:00:00', '2026-02-17 09:00:00'),
(UUID(), '$USER_ID', '2026-02-18 21:20:00', '2026-02-18 21:20:00', 'Home Office', 'Recovered from yesterday. Testing the Habit model and frequency enums.', 7, 1, '2026-02-18 21:20:00', '2026-02-18 21:20:00', '2026-02-18 21:20:00'),
(UUID(), '$USER_ID', '2026-02-20 18:10:00', '2026-02-20 18:10:00', 'Gym', 'Personal best at the gym today! Physical progress feels just as good as software progress.', 9, 1, '2026-02-20 18:10:00', '2026-02-20 18:10:00', '2026-02-20 18:10:00'),
(UUID(), '$USER_ID', '2026-02-21 11:00:00', '2026-02-21 11:00:00', 'Coffee Shop', 'Working on the Task statuses. Pending vs Completed. Simple, effective.', 8, 1, '2026-02-21 11:00:00', '2026-02-21 11:00:00', '2026-02-21 11:00:00'),
(UUID(), '$USER_ID', '2026-02-23 20:30:00', '2026-02-23 20:30:00', 'Home Office', 'Trying to implement dark mode. It changes the whole vibe of the application.', 7, 1, '2026-02-23 20:30:00', '2026-02-23 20:30:00', '2026-02-23 20:30:00'),
(UUID(), '$USER_ID', '2026-02-24 23:45:00', '2026-02-24 23:45:00', 'Bedroom', 'Just watched a documentary on AI. Exciting but terrifying at the same time.', 6, 1, '2026-02-24 23:45:00', '2026-02-24 23:45:00', '2026-02-24 23:45:00'),
(UUID(), '$USER_ID', '2026-02-25 19:15:00', '2026-02-25 19:15:00', 'Living Room', 'Feeling a bit sick today. Took medicine and avoided screens all evening.', 4, 1, '2026-02-25 19:15:00', '2026-02-25 19:15:00', '2026-02-25 19:15:00'),
(UUID(), '$USER_ID', '2026-02-26 10:30:00', '2026-02-26 10:30:00', 'Home Office', 'Feeling better. Working from home. The UI dashboard is starting to look professional.', 8, 1, '2026-02-26 10:30:00', '2026-02-26 10:30:00', '2026-02-26 10:30:00'),
(UUID(), '$USER_ID', '2026-02-27 21:00:00', '2026-02-27 21:00:00', 'Home Office', 'Connected the AI API to generate suggested songs based on journal text. Mind blowing.', 10, 1, '2026-02-27 21:00:00', '2026-02-27 21:00:00', '2026-02-27 21:00:00'),
(UUID(), '$USER_ID', '2026-02-28 17:30:00', '2026-02-28 17:30:00', 'Balcony', 'February flew by. The core features are done. March will be for testing and bug fixing.', 8, 1, '2026-02-28 17:30:00', '2026-02-28 17:30:00', '2026-02-28 17:30:00');

INSERT INTO JournalPage (id, userId, date, time, location, content, mood, isActive, lastModified, createdAt, updatedAt) VALUES
(UUID(), '$USER_ID', '2026-03-02 08:45:00', '2026-03-02 08:45:00', 'Home Office', 'March brings a new energy. Starting rigorous QA testing on the app.', 8, 1, '2026-03-02 08:45:00', '2026-03-02 08:45:00', '2026-03-02 08:45:00'),
(UUID(), '$USER_ID', '2026-03-03 20:10:00', '2026-03-03 20:10:00', 'Living Room', 'Found three critical bugs in the Event model logic. Timezones are the enemy of developers.', 4, 1, '2026-03-03 20:10:00', '2026-03-03 20:10:00', '2026-03-03 20:10:00'),
(UUID(), '$USER_ID', '2026-03-05 19:30:00', '2026-03-05 19:30:00', 'Kitchen', 'Fixed the timezone issues using UTC storage and local conversion. Feeling relieved.', 8, 1, '2026-03-05 19:30:00', '2026-03-05 19:30:00', '2026-03-05 19:30:00'),
(UUID(), '$USER_ID', '2026-03-07 14:00:00', '2026-03-07 14:00:00', 'Library', 'Reading up on psychological metrics to improve the JournalMetrics model.', 7, 1, '2026-03-07 14:00:00', '2026-03-07 14:00:00', '2026-03-07 14:00:00'),
(UUID(), '$USER_ID', '2026-03-08 11:15:00', '2026-03-08 11:15:00', 'Park', 'Spring is slowly arriving. The weather is warmer, mood is lifting naturally.', 9, 1, '2026-03-08 11:15:00', '2026-03-08 11:15:00', '2026-03-08 11:15:00'),
(UUID(), '$USER_ID', '2026-03-10 22:45:00', '2026-03-10 22:45:00', 'Bedroom', 'Stressful day at the day job. Coding my own app is actually relaxing compared to that.', 6, 1, '2026-03-10 22:45:00', '2026-03-10 22:45:00', '2026-03-10 22:45:00'),
(UUID(), '$USER_ID', '2026-03-12 18:00:00', '2026-03-12 18:00:00', 'Home Office', 'Implemented the refresh token rotation. Security matters from day one.', 8, 1, '2026-03-12 18:00:00', '2026-03-12 18:00:00', '2026-03-12 18:00:00'),
(UUID(), '$USER_ID', '2026-03-14 15:20:00', '2026-03-14 15:20:00', 'Coffee Shop', 'Had a chat with a friend about beta testing my app. He gave me some great feedback.', 9, 1, '2026-03-14 15:20:00', '2026-03-14 15:20:00', '2026-03-14 15:20:00'),
(UUID(), '$USER_ID', '2026-03-15 10:30:00', '2026-03-15 10:30:00', 'Living Room', 'Sunday morning code cleanup. Refactoring is oddly satisfying.', 7, 1, '2026-03-15 10:30:00', '2026-03-15 10:30:00', '2026-03-15 10:30:00'),
(UUID(), '$USER_ID', '2026-03-17 19:40:00', '2026-03-17 19:40:00', 'Office', 'Got stuck on a CSS transition for an hour. Sometimes I miss backend work.', 5, 1, '2026-03-17 19:40:00', '2026-03-17 19:40:00', '2026-03-17 19:40:00'),
(UUID(), '$USER_ID', '2026-03-19 21:15:00', '2026-03-19 21:15:00', 'Home Office', 'Writing the script to populate JournalMetrics. The emotional valence algorithm needs tuning.', 7, 1, '2026-03-19 21:15:00', '2026-03-19 21:15:00', '2026-03-19 21:15:00'),
(UUID(), '$USER_ID', '2026-03-21 13:00:00', '2026-03-21 13:00:00', 'Downtown', 'Saturday stroll. Bought a new notebook. Ironic, building a digital journal while buying a physical one.', 8, 1, '2026-03-21 13:00:00', '2026-03-21 13:00:00', '2026-03-21 13:00:00'),
(UUID(), '$USER_ID', '2026-03-22 17:45:00', '2026-03-22 17:45:00', 'Home Office', 'Pre-launch anxiety is kicking in. What if nobody uses this but me? Well, that is okay too.', 6, 1, '2026-03-22 17:45:00', '2026-03-22 17:45:00', '2026-03-22 17:45:00'),
(UUID(), '$USER_ID', '2026-03-24 20:30:00', '2026-03-24 20:30:00', 'Kitchen', 'Made pizza from scratch today. Cooking is basically chemistry and algorithms anyway.', 9, 1, '2026-03-24 20:30:00', '2026-03-24 20:30:00', '2026-03-24 20:30:00'),
(UUID(), '$USER_ID', '2026-03-25 22:00:00', '2026-03-25 22:00:00', 'Home Office', 'Finalizing the TaskCategory relations. The UI for color picking is smooth.', 8, 1, '2026-03-25 22:00:00', '2026-03-25 22:00:00', '2026-03-25 22:00:00'),
(UUID(), '$USER_ID', '2026-03-27 18:10:00', '2026-03-27 18:10:00', 'Gym', 'Pushed myself too hard at the gym. My arms feel like jelly typing this.', 5, 1, '2026-03-27 18:10:00', '2026-03-27 18:10:00', '2026-03-27 18:10:00'),
(UUID(), '$USER_ID', '2026-03-28 14:30:00', '2026-03-28 14:30:00', 'Balcony', 'Sunny Saturday. Reading a book on clean architecture.', 8, 1, '2026-03-28 14:30:00', '2026-03-28 14:30:00', '2026-03-28 14:30:00'),
(UUID(), '$USER_ID', '2026-03-29 20:00:00', '2026-03-29 20:00:00', 'Living Room', 'Preparing the production environment. Vercel for frontend, DigitalOcean for DB.', 7, 1, '2026-03-29 20:00:00', '2026-03-29 20:00:00', '2026-03-29 20:00:00'),
(UUID(), '$USER_ID', '2026-03-30 23:15:00', '2026-03-30 23:15:00', 'Bedroom', 'Last minute bugs popping up everywhere. Deep breaths. One by one.', 4, 1, '2026-03-30 23:15:00', '2026-03-30 23:15:00', '2026-03-30 23:15:00'),
(UUID(), '$USER_ID', '2026-03-31 22:00:00', '2026-03-31 22:00:00', 'Home Office', 'March is over. Tomorrow is April, the big month. The app is 95% ready for beta.', 9, 1, '2026-03-31 22:00:00', '2026-03-31 22:00:00', '2026-03-31 22:00:00');

SELECT CONCAT('✅ Inserted ', ROW_COUNT(), ' record per userId = $USER_ID') AS result;

EOF

echo ""
echo "✅ Seed completed."