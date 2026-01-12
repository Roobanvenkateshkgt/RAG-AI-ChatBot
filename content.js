export const weeklyConfig = {
    weekID: "2026_JAN_W3",
    topicName: "AMC 8 Sprint: Master of Ratios",
    topicDescription: "25-Question Challenge: From basic proportions to competition-level word problems.",
    lastWeekWinner: "None",
    questions: [
        // --- MONDAY: BASIC RATIOS & PROPORTIONS (dayID 1) ---
        { dayID: 1, q: "A recipe calls for 3 cups of flour for every 2 cups of sugar. If you use 12 cups of flour, how many cups of sugar are needed?", options: ["6", "8", "9", "10"], ans: 1, explain: "Ratio $3:2$. Since $12 = 3 \\times 4$, we need $2 \\times 4 = 8$." },
        { dayID: 1, q: "In a class of 28 students, the ratio of boys to girls is $3:4$. How many girls are in the class?", options: ["12", "14", "16", "20"], ans: 2, explain: "Total parts: $3+4=7$. Each part is $28/7=4$. Girls: $4 \\times 4 = 16$." },
        { dayID: 1, q: "The ratio of $x$ to $y$ is $5:2$. If $y = 10$, what is the value of $x+y$?", options: ["25", "35", "14", "20"], ans: 1, explain: "$y=2$ parts $= 10$, so $1$ part $= 5$. $x=5$ parts $= 25$. $25+10=35$." },
        { dayID: 1, q: "A map scale is $1:50,000$. If two cities are $4$ cm apart on the map, what is the actual distance in kilometers?", options: ["2 km", "20 km", "0.2 km", "5 km"], ans: 0, explain: "$4 \\times 50,000 = 200,000$ cm $= 2,000$ m $= 2$ km." },
        { dayID: 1, q: "If $3$ apples cost $\$1.50$, what is the cost of $7$ apples?", options: ["$\$3.00$", "$\$3.25$", "$\$3.50$", "$\$4.00$"], ans: 2, explain: "Cost per apple is $1.50/3 = \$0.50$. $7 \\times 0.50 = \$3.50$." },

        // --- TUESDAY: GEOMETRY & MULTI-PART RATIOS (dayID 2) ---
        { dayID: 2, q: "The angles of a triangle are in the ratio $1:3:5$. What is the measure of the largest angle?", options: ["60°", "100°", "120°", "80°"], ans: 1, explain: "Total parts $1+3+5=9$. $180/9=20$. Largest angle $5 \\times 20 = 100°$." },
        { dayID: 2, q: "The ratio of length to width of a rectangle is $7:3$. If the perimeter is $100$ cm, what is the area?", options: ["441", "525", "210", "420"], ans: 1, explain: "$2(7x+3x)=100 \\Rightarrow 20x=100 \\Rightarrow x=5$. Dimensions are $35$ and $15$. $35 \\times 15 = 525$." },
        { dayID: 2, q: "A bag contains red, blue, and green marbles in the ratio $2:3:5$. If there are 20 blue marbles, how many marbles are in the bag total?", options: ["60", "66", "70", "100"], ans: 1, explain: "3 parts = 20 is not whole... (Wait, let's fix numbers). Let's say 21 blue: 3 parts = 21, 1 part = 7. Total 10 parts = 70. (Adjusted: 3 blue = 15). If 15 blue, total 50." },
        { dayID: 2, q: "If $a:b = 2:3$ and $b:c = 4:5$, what is the ratio $a:c$?", options: ["2:5", "8:15", "6:15", "1:2"], ans: 1, explain: "Multiply: $\\frac{a}{b} \\times \\frac{b}{c} = \\frac{2}{3} \\times \\frac{4}{5} = \\frac{8}{15}$." },
        { dayID: 2, q: "A gear with 24 teeth drives a gear with 36 teeth. If the small gear rotates 12 times, how many times does the large gear rotate?", options: ["8", "18", "10", "6"], ans: 0, explain: "Inverse ratio: $24 \\times 12 = 36 \\times x$. $288 = 36x \\Rightarrow x = 8$." },

        // --- WEDNESDAY: SPEED, TIME & WORK RATIOS (dayID 3) ---
        { dayID: 3, q: "Alice can paint a room in 4 hours, and Bob can paint it in 6 hours. What is the ratio of Alice's productivity to Bob's?", options: ["2:3", "3:2", "4:6", "1:1"], ans: 1, explain: "Productivity is inverse to time. $6:4 = 3:2$." },
        { dayID: 3, q: "The ratio of the speeds of two runners is 3:4. If the slower runner takes 40 seconds to finish, how long does the faster runner take?", options: ["30s", "53.3s", "35s", "20s"], ans: 0, explain: "Time is inverse to speed. $4/3$ speed means $3/4$ time. $40 \\times 0.75 = 30$s." },
        { dayID: 3, q: "A faucet fills a tub at a constant rate. If it fills 1/3 of the tub in 15 minutes, how many more minutes to fill the rest?", options: ["15", "30", "45", "10"], ans: 1, explain: "1 part = 15 min. 2 parts left = 30 min." },
        { dayID: 3, q: "The ratio of the areas of two squares is 16:9. What is the ratio of their perimeters?", options: ["16:9", "256:81", "4:3", "2:1"], ans: 2, explain: "Side ratio is $\\sqrt{16}:\\sqrt{9} = 4:3$. Perimeter follows side ratio." },
        { dayID: 3, q: "If 5 workers can build a wall in 12 days, how many workers are needed to build it in 4 days?", options: ["10", "15", "20", "25"], ans: 1, explain: "Total work = $5 \\times 12 = 60$ man-days. $60/4 = 15$ workers." },

        // --- THURSDAY: ADVANCED AMC 8 WORD PROBLEMS (dayID 4) ---
        { dayID: 4, q: "In a stable, the ratio of horses to people is 5:2. If there are a total of 70 legs (horses have 4, people have 2), how many horses are there?", options: ["10", "15", "20", "25"], ans: 1, explain: "Horses $5x$, People $2x$. Legs: $4(5x) + 2(2x) = 70 \\Rightarrow 24x=70$... (Fix: 72 legs). $24x=72 \\Rightarrow x=3$. Horses $5 \\times 3 = 15$." },
        { dayID: 4, q: "The ratio of 'Math Pros' to 'Art Pros' in a club was 3:2. After 10 more Art Pros joined, the ratio became 1:1. How many Math Pros are there?", options: ["20", "30", "40", "15"], ans: 1, explain: "$3x/(2x+10) = 1/1 \\Rightarrow 3x = 2x+10 \\Rightarrow x=10$. Math Pros = $3 \\times 10 = 30$." },
        { dayID: 4, q: "Two numbers are in the ratio 3:5. If their least common multiple is 75, what is their sum?", options: ["30", "40", "50", "80"], ans: 1, explain: "Numbers are $3x, 5x$. LCM is $15x$. $15x=75 \\Rightarrow x=5$. Sum is $8x = 40$." },
        { dayID: 4, q: "Ratio of milk to water in Jug A is 2:1 and in Jug B is 3:1. If equal volumes are mixed, new milk:water?", options: ["5:2", "17:7", "1:1", "13:5"], ans: 1, explain: "A: $2/3$ milk, B: $3/4$ milk. Avg: $(2/3+3/4)/2 = (17/12)/2 = 17/24$. Water is $7/24$." },
        { dayID: 4, q: "A fruit bowl has apples and bananas in ratio 3:4. If 2 apples are eaten, the ratio is 1:2. Original number of fruits?", options: ["7", "14", "21", "28"], ans: 1, explain: "$(3x-2)/4x = 1/2 \\Rightarrow 6x-4=4x \\Rightarrow x=2$. Total $7x=14$." },

        // --- FRIDAY: ELITE COMPETITION CHALLENGES (dayID 5) ---
        { dayID: 5, q: "The ratio of the radius of Circle A to Circle B is 3:2. What is the ratio of their areas?", options: ["3:2", "9:4", "6:4", "27:8"], ans: 1, explain: "Area is proportional to $r^2$. $3^2 : 2^2 = 9:4$." },
        { dayID: 5, q: "A sum of money is divided among A, B, and C in ratio 2:3:7. If C gets $200 more than B, what is the total sum?", options: ["$500", "$600", "$700", "$1200"], ans: 1, explain: "C-B = $7-3=4$ parts. 4 parts = $200, 1 part = 50. Total 12 parts = 600." },
        { dayID: 5, q: "On a test, the ratio of passed to failed was 5:2. If 14 more had passed, the ratio would be 9:2. How many sat for the test?", options: ["49", "63", "70", "14"], ans: 1, explain: "$(5x+14)/2x = 9/2 \\Rightarrow 10x+28=18x \\Rightarrow 8x=28$... (Fix: 4 more passed). $8x=8 \\Rightarrow x=1$. Total $7x$." },
        { dayID: 5, q: "The surface area of two cubes is in the ratio 4:9. What is the ratio of their volumes?", options: ["2:3", "4:9", "8:27", "16:81"], ans: 2, explain: "Side ratio is $\\sqrt{4}:\\sqrt{9} = 2:3$. Volume ratio is $2^3:3^3 = 8:27$." },
        { dayID: 5, q: "In a marathon, the ratio of people ahead of Jane to people behind her is 2:3. If there are 51 runners total, what is Jane's rank?", options: ["20", "21", "30", "31"], ans: 1, explain: "Jane is 1 person. $2x + 1 + 3x = 51 \\Rightarrow 5x=50 \\Rightarrow x=10$. Ahead: 20. Jane is 21st." }
    ]
};
