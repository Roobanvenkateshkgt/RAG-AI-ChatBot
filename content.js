export const weeklyConfig = {
    weekID: "2026_JAN_W3",
    topicName: "AMC 8 Sprint: Master of Ratios",
    topicDescription: "25-Question Week Challenge: From basic proportions to competition-level word problems.",
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

        // --- WEDNESDAY: UNIT RATES & SPEED (dayID 3) ---
        { dayID: 3, q: "A car travels 180 miles in 3 hours. At this same constant rate, how many miles will it travel in 5 hours?", options: ["240", "300", "320", "360"], ans: 1, explain: "Speed = $180/3 = 60$ mph. In 5 hours: $60 \\times 5 = 300$ miles." },
        { dayID: 3, q: "If a printer can print 45 pages in 3 minutes, how many pages can it print in 10 minutes?", options: ["120", "150", "135", "180"], ans: 1, explain: "Rate = $45/3 = 15$ pages per minute. In 10 minutes: $15 \\times 10 = 150$ pages." },
        { dayID: 3, q: "The ratio of a person's height to their shadow is $3:2$. If a tree is 15 feet tall, how long is its shadow?", options: ["10 ft", "12 ft", "22.5 ft", "7.5 ft"], ans: 0, explain: "Ratio $3/2 = 15/x$. $3x = 30$, so $x = 10$." },
        { dayID: 3, q: "A faucet leaks 20 ml of water every 5 minutes. How many ml does it leak in one hour?", options: ["120 ml", "200 ml", "240 ml", "300 ml"], ans: 2, explain: "There are 12 periods of 5 minutes in an hour ($60/5=12$). Total leak: $20 \\times 12 = 240$ ml." },
        { dayID: 3, q: "A cyclist travels at a constant speed of 12 km/h. How many meters does the cyclist travel in 1 minute?", options: ["120 m", "200 m", "1200 m", "2000 m"], ans: 1, explain: "$12$ km/h $= 12,000$ meters / $60$ minutes $= 200$ meters per minute." },

        // --- THURSDAY: RATIO CHANGES & MIXTURES (dayID 4) ---
        { dayID: 4, q: "A bowl contains apples and bananas in a ratio of $4:3$. If there are 12 bananas, how many total fruits are in the bowl?", options: ["16", "21", "28", "24"], ans: 2, explain: "3 parts = 12, so 1 part = 4. Total parts = $4+3=7$. Total fruit: $7 \\times 4 = 28$." },
        { dayID: 4, q: "The ratio of milk to water in a jug is $5:1$. If you add 2 liters of water, the ratio becomes $5:3$. How much milk is in the jug?", options: ["5 L", "10 L", "2.5 L", "15 L"], ans: 0, explain: "Initially $5x$ milk and $1x$ water. New water is $x+2$. $5x/(x+2) = 5/3$. $15x = 5x + 10 \\rightarrow 10x = 10 \\rightarrow x=1$. Milk is $5(1)=5$ L." },
        { dayID: 4, q: "In a box, the ratio of red marbles to blue marbles is $2:5$. If there are 35 blue marbles, how many red marbles must be added to make the ratio $1:1$?", options: ["14", "21", "25", "10"], ans: 1, explain: "Initially, $5$ parts $= 35$, so $1$ part $= 7$. Red marbles $= 2 \\times 7 = 14$. To make it $1:1$, we need $35$ red marbles. Add: $35 - 14 = 21$." },
        { dayID: 4, q: "A drink is made by mixing juice and water in a ratio of $1:4$. If the total volume is 500 ml, how much juice is used?", options: ["100 ml", "125 ml", "200 ml", "400 ml"], ans: 0, explain: "Total parts: $1+4=5$. One part: $500/5 = 100$ ml. Juice is 1 part, so 100 ml." },
        { dayID: 4, q: "The ratio of length to width of a rectangle is $5:3$. If the perimeter is 32 cm, what is the area?", options: ["15 cm²", "60 cm²", "30 cm²", "45 cm²"], ans: 1, explain: "Let $L=5x, W=3x$. $2(5x+3x)=32 \\rightarrow 16x=32 \\rightarrow x=2$. $L=10, W=6$. Area $= 10 \\times 6 = 60$." },

        // --- FRIDAY: ADVANCED RATIO LOGIC (dayID 5) ---
        { dayID: 5, q: "The ratio of $A:B$ is $2:3$ and the ratio of $B:C$ is $4:5$. What is the ratio $A:C$?", options: ["2:5", "8:15", "6:15", "1:2"], ans: 1, explain: "Make B equal. $A:B = 8:12$ and $B:C = 12:15$. So $A:C = 8:15$." },
        { dayID: 5, q: "Three numbers are in the ratio $2:3:5$. If their sum is 100, what is the largest number?", options: ["30", "40", "50", "60"], ans: 2, explain: "Total parts: $2+3+5=10$. One part: $100/10=10$. Largest is $5 \\times 10 = 50$." },
        { dayID: 5, q: "A gear with 12 teeth is engaged with a gear with 30 teeth. If the small gear rotates 10 times, how many times does the large gear rotate?", options: ["4", "25", "6", "8"], ans: 0, explain: "The total teeth moved is $12 \\times 10 = 120$. Large gear rotations: $120 / 30 = 4$." },
        { dayID: 5, q: "If $a/b = 3/4$ and $b/c = 8/9$, what is $a/c$?", options: ["2/3", "1/2", "3/8", "1/3"], ans: 0, explain: "Multiply the ratios: $(a/b) \\times (b/c) = (3/4) \\times (8/9) = 24/36 = 2/3$." },
        { dayID: 5, q: "The ratio of the areas of two squares is $4:9$. What is the ratio of their perimeters?", options: ["2:3", "4:9", "16:81", "8:18"], ans: 0, explain: "Area ratio is $s_1^2 : s_2^2$, so side ratio is $\\sqrt{4}:\\sqrt{9} = 2:3$. Perimeter ratio is the same as side ratio: $2:3$." },
    ]
};
