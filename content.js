export const weeklyConfig = {
    weekID: "2026_JAN_W2",
    topicName: "AMC 8 Sprint: Ratios & Rates",
    topicDescription: "Master speed, ratios, and percentages to climb the leaderboard!",
    lastWeekWinner: "None",
    questions: [
        // MON: dayID 1 | TUE: 2 | WED: 3 | THU: 4 | FRI: 5
        { dayID: 1, q: "If $x:y = 3:4$ and $x=12$, what is $y$?", options: ["9", "16", "12", "15"], ans: 1, explain: "$12/3 = 4$, so $4 \\times 4 = 16$." },
        { dayID: 1, q: "What is $20\\%$ of $80$?", options: ["16", "20", "10", "24"], ans: 0, explain: "$0.2 \\times 80 = 16$." },
        { dayID: 1, q: "A car travels $60$ miles in $1$ hour. Miles in $15$ mins?", options: ["10", "15", "20", "30"], ans: 1, explain: "$15$ min is $1/4$ hour. $60/4 = 15$." },
        
        { dayID: 2, q: "Cats:Dogs is $2:5$. $35$ total animals. How many cats?", options: ["10", "14", "25", "7"], ans: 0, explain: "Total 7 parts. $35/7=5$. Cats: $2 \\times 5 = 10$." },
        { dayID: 2, q: "A $\$50$ item is $10\\%$ off. New price?", options: ["$\$40$", "$\$45$", "$\$49$", "$\$35$"], ans: 1, explain: "$50 - 5 = 45$." },
        { dayID: 2, q: "Alice paints in $2$h, Bob in $3$h. Together?", options: ["$2.5$h", "$1.2$h", "$5$h", "$1$h"], ans: 1, explain: "$(2 \\times 3)/(2+3) = 1.2$." },
        
        { dayID: 3, q: "1/2 of 1/4 of 100?", options: ["25", "12.5", "50", "10"], ans: 1, explain: "0.5 * 25 = 12.5" },
        { dayID: 3, q: "$3:5$ is $x:25$. Find $x$.", options: ["15", "10", "20", "5"], ans: 0, explain: "$3/5 \\times 25 = 15$" },
        { dayID: 3, q: "Run 4 miles in 32 mins. Rate?", options: ["8m/m", "4m/m", "6m/m", "10m/m"], ans: 0, explain: "32/4 = 8" },

        { dayID: 4, q: "30 is 60% of what?", options: ["50", "60", "40", "100"], ans: 0, explain: "30 / 0.6 = 50" },
        { dayID: 4, q: "Angle ratio 1:1:2. Largest angle?", options: ["45", "90", "60", "120"], ans: 1, explain: "2/4 * 180 = 90" },
        { dayID: 4, q: "2 cats catch 2 mice in 2 min. 10 cats catch 10 in...?", options: ["10 min", "2 min", "5 min", "20 min"], ans: 1, explain: "Rate is constant. 1 cat/1 mouse/2 min." },

        { dayID: 5, q: "$10\\%$ then $10\\%$ increase. Total change?", options: ["$20\\%$", "$21\\%$", "$19\\%$", "$25\\%$"], ans: 1, explain: "$1.1 \\times 1.1 = 1.21$ (21% increase)." },
        { dayID: 5, q: "Length:Width $4:1$. Perimeter $50$. Length?", options: ["10", "20", "40", "5"], ans: 1, explain: "$2(4x+x)=50 \\rightarrow 10x=50$. $4 \\times 5=20$." },
        { dayID: 5, q: "Fill tank in $4$h. Drain in $12$h. Both open?", options: ["3h", "6h", "8h", "4h"], ans: 1, explain: "$1/4 - 1/12 = 1/6$ (6 hours)." }
    ]
};
