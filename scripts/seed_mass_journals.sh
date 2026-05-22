#!/usr/bin/env bash

set -e

DB_USER="usbo"
DB_PASS="password"
DB_NAME="higure_db"
USER_ID="d3d7b0d5-c5b8-4ae1-8ae2-bbe0e020ec47"

echo "╔════════════════════════════════════════════════════════╗"
echo "║   higure_db — Mass Journal Page Seed Tool               ║"
echo "║   Goal: 300+ entries per year (2023, 2024, 2025, 2026) ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

content_work_1="Today was another challenging day at the office. The project deadline is approaching faster than I anticipated, and I find myself working later and later each evening. My team is fantastic, but we're currently understaffed, which means everyone is carrying extra weight. I had a meeting with my manager this morning to discuss our progress, and while she acknowledged the pressure, there wasn't much she could do about resources. I've been thinking a lot about my career trajectory lately. Is this the right path for me? I enjoy the technical challenges, and I genuinely love solving complex problems through code. But the constant crunch and the expectation to be available outside of working hours is starting to take a toll. I'm considering whether I should look for opportunities at companies with better work-life balance, or perhaps even explore the possibility of going freelance. On the positive side, I learned a new framework today that I've been wanting to dive into. It's called Next.js, and it seems incredibly powerful for building modern web applications. I spent a few hours after dinner going through the documentation and building a small prototype. The component-based architecture feels intuitive, and the routing system is elegant. I can see myself using this for my personal projects moving forward. My mood today is sitting around a 6. Productive but exhausted. I need to remember to take breaks and not push myself too hard. Tomorrow, I'm planning to take a proper lunch break away from my desk."
content_work_2="Work has been incredibly demanding lately. The project I'm leading is entering its final phase, and the pressure is mounting. Every day brings new challenges, from last-minute requirement changes to technical issues that seem to come out of nowhere. I've always prided myself on being calm under pressure, but lately, I've been feeling the strain. This morning, I had an important presentation to the executive team. I spent all weekend preparing, going over every slide, practicing my delivery, anticipating questions. The presentation went well, or at least it seemed to. They nodded in all the right places and asked thoughtful questions. But afterwards, I couldn't help but second-guess everything I said. Did I explain the technical constraints clearly enough? Should I have emphasized the risks more? This kind of overthinking is exhausting. I've been reflecting on why I care so much about these presentations. I think it's not just about the project — it's about proving myself. Ever since I was promoted to this leadership role, I've felt this constant pressure to demonstrate that I'm worthy of the position. Intellectually, I know I earned this promotion through hard work and consistent delivery. But emotionally, there's still that voice of self-doubt whispering in my ear. Outside of work, I've been trying to maintain balance. I've started going to the gym three times a week, which helps with stress. There's something meditative about the rhythm of exercise — the focus on breathing, the physical exertion pushing out the mental noise. I also started seeing a therapist, which has been incredibly helpful for processing these feelings of inadequacy."
content_work_3="Career thoughts have been occupying a lot of my mental space recently. I've been at this company for three years now, and while I've learned a tremendous amount, I'm starting to feel stagnant. The work is comfortable, the team is great, but I'm not growing as much as I'd like to. I've been researching other opportunities, and there are some fascinating companies doing innovative work in AI and machine learning — areas I've been curious about but never had the chance to dive into professionally. But leaving feels risky. I have a good salary, I know the systems inside and out, there's security here. Is growth worth sacrificing that security? I spoke with my mentor about this, and she asked me a question that stuck with me: If you stay here for another five years, will you be happy with where you are? The honest answer is... probably not. I want to be challenged. I want to work on problems that push me to learn new things. I want to build things that feel meaningful. The fear of the unknown is powerful. But the regret of not trying might be even more powerful. I've decided to start applying. Not impulsively, but thoughtfully. I'll research companies thoroughly, prepare well for interviews, and see what happens. Whatever the outcome, I'll know I tried."

content_reflection_1="I've been doing a lot of introspection lately. It started with a therapy session where my therapist asked me a simple question: What do you actually want? Not what you think you should want, not what others expect of you — what do you, deep down, truly desire? The question stopped me cold because I realized I didn't have a ready answer. I've spent so much of my life following a predetermined script. Study hard in school, get good grades, go to university, land a stable job, climb the ladder... These were goals given to me by society, by family, by culture. I never stopped to question whether they were actually my goals. Now in my late twenties, I'm having a bit of a quarter-life crisis — though crisis feels too dramatic. It's more of an awakening, a realization that I have agency over the direction of my life. I've been exploring different areas of interest to see what sparks joy. I took a pottery class, which was more frustrating than I expected — my pieces kept coming out lopsided — but there was something satisfying about working with my hands. I started meditating daily, just ten minutes each morning, which has helped with the constant mental chatter. I've been reading philosophy, which I haven't done since university. The Stoics, in particular, have been speaking to me lately — their emphasis on focusing only on what you can control. This process of self-discovery feels uncomfortable at times. It's like stripping away layers of identity I've accumulated over years, and I'm not entirely sure what's underneath. But there's also a sense of excitement, of possibility. For the first time in a long time, I feel like I'm living intentionally rather than on autopilot."
content_reflection_2="Personal growth has been on my mind constantly. I've come to realize that comfort is the enemy of progress. When everything is easy and predictable, we don't stretch, we don't learn, we don't evolve. This year, I've made a conscious decision to embrace discomfort. The first step was acknowledging my patterns of avoidance. I noticed that whenever I faced something challenging — whether it was a difficult conversation, a new skill to learn, or a personal problem to confront — I would distract myself with trivial tasks, scrolling on my phone, or other forms of procrastination. Understanding this tendency was the beginning of changing it. I've started practicing what I call the five-minute rule. When I feel myself resisting something, I tell myself: just five minutes. That's it. If after five minutes I still want to stop, I give myself permission to stop. But more often than not, once I start, I find it's not as bad as I anticipated. The momentum carries me forward. This simple technique has helped me tackle things I've been avoiding for months. I've also been working on my relationship with failure. For most of my life, I've seen failure as something to be avoided at all costs. But recently, I've started reframing it as feedback. Every failure is just data point telling me what doesn't work, steering me closer to what does. This shift in perspective has been incredibly liberating. I've started more projects, taken more risks, and cared less about being perfect. The journey of personal growth is not linear. Some days I feel like I'm making tremendous progress. Other days, I feel like I'm slipping back into old patterns. I'm learning to be compassionate with myself on those days. Growth isn't about perfection. It's about direction, about trying, about showing up."

content_relationships_1="Relationships have been weighing on me. I recently had a falling out with a friend I've known since university. We'd been drifting apart for a while — different life paths, different priorities — but the actual conflict was something small and stupid, an argument that escalated beyond what it deserved. The worst part is the silence afterwards. No texts, no calls, no attempts to reconcile. I've been replaying the conversation in my head, wondering what I could have said differently, what I should have done. Should I reach out? Apologize? Try to fix things? Or is this friendship simply over, and I need to accept that? I've been thinking about the nature of friendship. Not all friendships are meant to last forever. Some people come into our lives for a season, teach us what we need to learn, and then move on. That doesn't make the relationship any less meaningful while it lasted. But accepting that truth doesn't make the ending hurt any less. Outside of this, my other friendships are going well. I had dinner with Sarah last week, and we talked for hours about everything and nothing. She's going through a difficult time at work too, so there's a lot of mutual understanding. I'm grateful for people like her in my life. She listens without judgment, offers advice when asked, and knows how to make me laugh when I'm taking life too seriously. I've also been thinking about romantic relationships. It's been a while since I was in one, and lately I've been feeling that quiet loneliness. Not the desperate I need to find someone immediately kind of loneliness, but the gentle awareness that it would be nice to share life with someone. I haven't been putting myself out there much — dating apps feel overwhelming, and meeting people organically seems to happen less and less as I get older. But maybe it's time to make an effort."
content_relationships_2="Family dynamics have been complex lately. My parents are getting older, and I'm starting to see the toll the years are taking. My dad's memory isn't what it used to be — he'll ask the same question three times in an hour, or forget conversations we had just yesterday. It's scary to witness this decline in someone who was always such a solid, dependable presence in my life. We had a family gathering last weekend, and it was... tense. My sister and I got into an argument about how to handle our parents' care as they age. She wants to look into assisted living facilities sooner rather than later, just in case. I want to keep them at home as long as possible, with home health aides if needed. We both want what's best for them, but we have very different ideas about what best means. After the argument, I felt terrible. My sister and I have always been close, and we rarely fight. I apologized later, and we had a calmer conversation. We agreed that we need to talk to our parents directly, ask them what they want, what their preferences are. So often, we make decisions for our aging parents without actually consulting them. This whole situation has me thinking about my own mortality, about getting older, about the people who will be there for me when I'm the one needing care. These aren't comfortable thoughts, but they're important ones. I've started having open conversations with my closest friends about these topics — aging, illness, death. It's not cheerful, but there's something deeply connecting about being vulnerable with each other about these inevitable parts of life. I've also been thinking about legacy — not in a grand what will I be remembered for sense, but in a more personal way. What kind of impact do I want to have on the people around me while I'm here? I want to be someone who listens well, who shows up reliably, who makes people feel seen and valued."

content_health_1="Health has been a major focus for me this year. I've spent most of my adult life taking my body for granted — sitting at a desk for ten hours a day, eating whatever was convenient, sleeping erratically. But lately, I've started feeling the consequences of that neglect: persistent back pain, low energy, brain fog, weight gain I can't seem to shake. I finally had enough and decided to make a change. I started small, which I think is the key. Last month, I began walking for thirty minutes every day during my lunch break. Just getting outside, moving my body, breathing fresh air... it's made a surprising difference. My energy levels are better, my back hurts less, and I feel more focused in the afternoons. From there, I added some basic stretching in the morning and evening. Nothing complicated, just ten minutes of gentle movements to loosen up my tight shoulders and hips. I spend so much time hunched over a keyboard that my posture is terrible. I've also been trying to be more mindful of my posture throughout the day — setting reminders on my phone to sit up straight, to take breaks. Next, I'm tackling my diet. I wouldn't say I eat poorly, exactly, but it's very unbalanced. A lot of takeout, a lot of processed food, not enough vegetables, too much sugar. I've started meal prepping on Sundays — cooking a few healthy dishes that I can eat throughout the week. It's more work up front, but it saves me time during the busy work week, and I actually know what's in my food. Sleep is another area that needs work. I have terrible sleep hygiene — I'm on my phone right before bed, I stay up too late scrolling, my bedroom is too bright, too warm. I've been implementing a screen curfew — putting my phone away an hour before bed. I've started reading physical books instead of e-books before sleep. It's a work in progress, but I'm already noticing that I fall asleep faster and wake up feeling more rested."
content_health_2="Mental health has been a journey this year. I've always thought of myself as a mentally tough person — someone who can handle pressure, who doesn't get easily stressed. But this year tested that image, and I realized I've been using toughness as a way to avoid dealing with my feelings. It started with burnout. I'd been pushing myself too hard for too long at work, taking on too many projects, not setting boundaries. I thought I could handle it, that I just needed to power through. But you can only power through for so long before something breaks. I started experiencing symptoms I couldn't ignore: constant exhaustion even after a full night's sleep, irritability over minor things, difficulty concentrating, a persistent feeling of dread about work. The worst part was the emotional numbness — I didn't feel sad, exactly, but I didn't feel much of anything. Just... empty. I finally made an appointment with a therapist, which was a big step for me. I'd always had this outdated idea that therapy was for weak people, or for people with serious problems. But everyone needs help sometimes. That first session was awkward — sitting across from a stranger, talking about my most intimate thoughts and feelings. But my therapist was warm and non-judgmental, and I quickly felt comfortable opening up. Through therapy, I've learned so much about myself. I've discovered patterns in my behavior that I never noticed before, traced them back to experiences in my childhood and adolescence. I've learned healthier coping mechanisms — instead of suppressing my feelings, I'm learning to acknowledge them, to process them, to express them appropriately. I've also started medication for anxiety, which was another hurdle for me. There's still so much stigma around mental health medication, like it's a crutch or a sign of failure. But my therapist put it in perspective: if I had diabetes, I wouldn't hesitate to take insulin. If my brain isn't producing the right chemicals, why should I feel ashamed to take something that helps? It's not a quick fix, and I still have hard days. But overall, I'm feeling better than I have in years. I'm learning to be kinder to myself, to set boundaries, to prioritize my mental health as much as my physical health."

content_creative_1="Creativity has been calling to me lately. I've spent so many years focused on technical skills — coding, problem-solving, logical thinking — that I feel like my creative side has atrophied. But recently, I've had this urge to make things, to express myself in ways that aren't just lines of code. I've always been interested in photography, so I dug out my old camera and started taking it with me everywhere. Not the professional DSLR I bought years ago and barely used, but a simple point-and-shoot that's light and easy to carry. I've been documenting my commute, the coffee shops I visit, the parks I walk through, the changing light at different times of day. The act of seeing through a camera lens has changed how I see the world. I notice things I never would have before — the way light filters through leaves, the expression on a stranger's face, the textures and patterns of everyday objects. Photography has taught me to slow down, to look more carefully, to find beauty in the mundane. I've also started writing fiction again. I used to write stories constantly when I was younger, filling notebook after notebook with terrible but enthusiastic tales. Somewhere along the way, I stopped — maybe because it felt unproductive, maybe because I became self-conscious about how good it was. But now I'm writing just for the sake of writing, with no expectation of anyone ever reading it. It's liberating. There's something magical about creating something out of nothing, whether it's a photograph, a story, a painting, or even a well-crafted meal. I'm realizing that creativity isn't just for artists — it's a fundamental human need, a way to process and express our inner lives. I want to make more space for it in mine. I've been thinking about taking a class — painting, pottery, creative writing, something where I can learn and make mistakes in a supportive environment. The idea is intimidating — I'll be a beginner, surrounded by people who are probably much better than me. But that's the point, isn't it? To embrace being a beginner, to learn and grow, to not be perfect at everything."
content_creative_2="Cooking has become my creative outlet. There's something deeply satisfying about transforming raw ingredients into something delicious and nourishing. It's a different kind of problem-solving than coding — more intuitive, more sensory. You can taste your way to the solution, adjust seasoning as you go, follow your instincts. I've been challenging myself to cook new cuisines, to try techniques I've never attempted. Last week, I made fresh pasta from scratch — mixing the flour and eggs by hand, rolling it out, cutting it into noodles. It was labor-intensive and messy, but incredibly rewarding. There's a primal satisfaction in making something that basic with your own two hands. And it tasted better than any store-bought pasta I've ever had. I've also been exploring fermented foods — making my own sauerkraut, kimchi, sourdough starter. There's something fascinating about working with these living cultures, waiting for nature to work its magic. My first sourdough loaves were disasters — dense, flat, unrisen. But I kept at it, reading books, watching tutorials, adjusting my technique. My tenth loaf was actually good — tangy, with a crispy crust and airy crumb. That feeling of success after so many failures was intoxicating. Cooking has taught me patience. You can't rush a braise, you can't force dough to rise, you can't hurry fermentation. These things take time, and that's okay. In a world that's all about speed and instant gratification, there's something meditative about slow cooking — stirring a sauce that needs hours to develop flavor, waiting for bread to proof, letting ingredients breathe. I've also started hosting dinner parties, something I never would have done a year ago. There's joy in feeding people, in bringing friends together around a table, in the conversation that flows with good food. It's a form of connection, of care, of saying I value you enough to spend my time making this for you. The kitchen has become my sanctuary. After a long day of staring at screens and solving abstract problems, working with my hands, smelling herbs and spices, tasting as I go... it grounds me, it centers me. Cooking isn't just about sustenance. It's about creativity, about patience, about generosity, about love."

LOCATIONS=(
    "Home Office" "Living Room" "Bedroom" "Kitchen" "Coffee Shop" "Park" "Gym"
    "Library" "Office" "Subway" "Balcony" "Downtown" "Couch" "Restaurant"
)

CONTENTS=(
    "$content_work_1" "$content_work_2" "$content_work_3"
    "$content_reflection_1" "$content_reflection_2"
    "$content_relationships_1" "$content_relationships_2"
    "$content_health_1" "$content_health_2"
    "$content_creative_1" "$content_creative_2"
)

echo "▶ Connection to MariaDB as $DB_USER, database: $DB_NAME"
echo "▶ User ID: $USER_ID"
echo ""

SQL_FILE=$(mktemp)

cat > "$SQL_FILE" <<SQLHEADER
-- User ID: $USER_ID
-- Generated journal entries for 2023, 2024, 2025, 2026
-- Each entry: ~500 words, some repetitive

SQLHEADER

generate_batch() {
    local year=$1
    local count=$2
    local batch_size=50
    
    for ((i=0; i<count; i+=batch_size)); do
        local batch_count=$((batch_size < count - i ? batch_size : count - i))
        echo "INSERT INTO JournalPage (id, userId, date, time, location, content, mood, isActive, lastModified, createdAt, updatedAt) VALUES"
        
        local first=true
        for ((j=0; j<batch_count; j++)); do
            local month=$((RANDOM % 12 + 1))
            local day=$((RANDOM % 28 + 1))
            local hour=$((RANDOM % 14 + 6))
            local minute=$((RANDOM % 60))
            local mood=$((RANDOM % 9 + 2))
            
            local loc_idx=$((RANDOM % ${#LOCATIONS[@]}))
            local location="${LOCATIONS[$loc_idx]}"
            
            local content_idx=$((RANDOM % ${#CONTENTS[@]}))
            local content="${CONTENTS[$content_idx]}"
            
            local is_repetitive=$((RANDOM % 100 < 15))
            if [ "$is_repetitive" = "1" ]; then
                local repeat_idx=$((RANDOM % ${#CONTENTS[@]}))
                local repeat_content="${CONTENTS[$repeat_idx]}"
                content="${content} ${repeat_content:0:400}"
            fi
            
            local date_str="$year-$(printf "%02d" $month)-$(printf "%02d" $day) $(printf "%02d" $hour):$(printf "%02d" $minute):00"
            
            local safe_content=$(echo "$content" | sed "s/'/''/g")
            
            if [ "$first" = "true" ]; then
                first=false
            else
                echo ","
            fi
            
            echo -n "(UUID(), '$USER_ID', '$date_str', '$date_str', '$location', '$safe_content', $mood, 1, '$date_str', '$date_str', '$date_str')"
        done
        echo ";"
    done
}

echo "Generating SQL... This may take a moment."
echo ""

for year in 2023 2024 2025 2026; do
    current=$(mariadb -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" -N -e "SELECT COUNT(*) FROM JournalPage WHERE userId = '$USER_ID' AND YEAR(date) = $year;")
    needed=$((300 - current))
    
    if [ "$needed" -gt 0 ]; then
        echo "Year $year: $current existing, need $needed more"
        generate_batch $year $needed >> "$SQL_FILE"
    else
        echo "Year $year: $current existing (enough)"
    fi
done

echo ""
echo "Executing SQL..."
mariadb -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" < "$SQL_FILE"

rm "$SQL_FILE"

total=$(mariadb -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" -N -e "SELECT COUNT(*) FROM JournalPage WHERE userId = '$USER_ID';")

echo ""
echo "════════════════════════════════════════════════════════"
echo "✅ Seed completed!"
echo "   Total journals for user: $total"
echo "════════════════════════════════════════════════════════"
