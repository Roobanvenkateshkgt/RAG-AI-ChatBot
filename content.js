// content.js
export const weeklyConfig = {
    weekID: "2026_JAN_W2",
    lastWeekWinner: "MathNinja_99", // Update this every Sunday to crown the new King/Queen
    topicName: "AMC 8: The Weekly Sprint",
    
    questions: [
        // --- MONDAY (dayID: 1) ---
        { 
            dayID: 1, 
            q: "If the ratio $x:y = 3:4$ and $x=12$, what is the value of $y$?", 
            options: ["9", "16", "12", "15"], 
            ans: 1, 
            explain: "Since $x=12$, we set up the proportion: $\\frac{12}{y} = \\frac{3}{4}$. Multiplying both sides by $y$ and cross-multiplying gives $3y = 48$, so $y = 16$." 
        },
        { 
            dayID: 1, 
            q: "What is $20\\%$ of $80$?", 
            options: ["16", "20", "10", "24"], 
            ans: 0, 
            explain: "To find the percentage, convert $20\\%$ to a decimal ($0.20$) and multiply: $0.20 \\times 80 = 16$." 
        },
        { 
            dayID: 1, 
            q: "A car travels $60$ miles in $1$ hour. How many miles does it travel in $15$ minutes?", 
            options: ["10", "15", "20", "30"], 
            ans: 1, 
            explain: "$15$ minutes is $\\frac{15}{60} = \\frac{1}{4}$ of an hour. Distance = $Speed \\times Time = 60 \\times \\frac{1}{4} = 15$ miles." 
        },

        // --- TUESDAY (dayID: 2) ---
        { 
            dayID: 2, 
            q: "The ratio of cats to dogs in a shelter is $2:5$. If there are $35$ animals in total, how many are cats?", 
            options: ["10", "14", "25", "7"], 
            ans: 0, 
            explain: "Total parts = $2 + 5 = 7$. Value of one part = $35 \\div 7 = 5$. Cats = $2 \\times 5 = 10$." 
        },
        { 
            dayID: 2, 
            q: "A hoodie costs $\$50$ but is on sale for $10\\%$ off. What is the final price?", 
            options: ["$\$40$", "$\$45$", "$\$49$", "$\$35$"], 
            ans: 1, 
            explain: "Discount = $0.10 \\times 50 = 5$. Final price = $50 - 5 = 45$." 
        },
        { 
            dayID: 2, 
            q: "Alice can paint a room in $2$ hours, and Bob can paint it in $3$ hours. Working together, how many hours will it take?", 
            options: ["$2.5$", "$1.2$", "$5$", "$1$"], 
            ans: 1, 
            explain: "Use the product-over-sum formula: $\\frac{2 \\times 3}{2+3} = \\frac{6}{5} = 1.2$ hours." 
        },

        // --- WEDNESDAY (dayID: 3) ---
        { 
            dayID: 3, 
            q: "What is $\\frac{1}{2}$ of $\\frac{1}{4}$ of $100$?", 
            options: ["25", "12.5", "50", "10"], 
            ans: 1, 
            explain: "First find $\\frac{1}{4}$ of $100 = 25$. Then find $\\frac{1}{2}$ of $25 = 12.5$." 
        },
        { 
            dayID: 3, 
            q: "If the ratio $3:5$ is equivalent to $x:25$, what is the value of $x$?", 
            options: ["15", "10", "20", "5"], 
            ans: 0, 
            explain: "Since $25$ is $5 \\times 5$, we multiply the first part of the ratio by $5$ as well: $3 \\times 5 = 15$." 
        },
        { 
            dayID: 3, 
            q: "A runner completes $4$ miles in $32$ minutes. What is their average pace in minutes per mile?", 
            options: ["8", "4", "6", "10"], 
            ans: 0, 
            explain: "$32 \\text{ minutes} \\div 4 \\text{ miles} = 8 \\text{ minutes per mile}$." 
        },

        // --- THURSDAY (dayID: 4) ---
        { 
            dayID: 4, 
            q: "$30$ is $60\\%$ of what number?", 
            options: ["50", "60", "40", "100"], 
            ans: 0, 
            explain: "Set up the equation $0.60x = 30$. Solve for $x$: $x = 30 \\div 0.60 = 50$." 
        },
        { 
            dayID: 4, 
            q: "The angles of a triangle are in the ratio $1:1:2$. What is the measure of the largest angle?", 
            options: ["$45^\\circ$", "$90^\\circ$", "$60^\\circ$", "$120^\\circ$"], 
            ans: 1, 
            explain: "Total parts = $1+1+2=4$. Sum of angles = $180^\\circ$. One part = $180 \\div 4 = 45^\\circ$. Largest angle = $2 \\times 45 = 90^\\circ$." 
        },
        { 
            dayID: 4, 
            q: "If $2$ cats can catch $2$ mice in $2$ minutes, how many mice can $10$ cats catch in $2$ minutes?", 
            options: ["10", "20", "5", "2"], 
            ans: 0, 
            explain: "If $2$ cats catch $2$ mice, then $1$ cat catches $1$ mouse in the same amount of time. Therefore, $10$ cats will catch $10$ mice in $2$ minutes." 
        },

        // --- FRIDAY (dayID: 5) ---
        { 
            dayID: 5, 
            q: "A price is increased by $10\\%$, and then that new price is increased by another $10\\%$. What is the total percentage increase?", 
            options: ["$20\\%$", "$21\\%$", "$19\\%$", "$25\\%$"], 
            ans: 1, 
            explain: "Let the price be $100$. First increase: $100 \\times 1.1 = 110$. Second increase: $110 \\times 1.1 = 121$. Total increase is $21\\%$." 
        },
        { 
            dayID: 5, 
            q: "The ratio of the length to width of a rectangle is $4:1$. If the perimeter is $50$, what is the length?", 
            options: ["10", "20", "40", "5"], 
            ans: 1, 
            explain: "Perimeter = $2(L + W)$. $2(4x + x) = 50 \\Rightarrow 10x = 50 \\Rightarrow x = 5$. Length = $4x = 20$." 
        },
        { 
            dayID: 5, 
            q: "A pump can fill a tank in $4$ hours, but a leak can empty it in $12$ hours. If both are active, how long to fill the tank?", 
            options: ["3 hours", "6 hours", "8 hours", "4 hours"], 
            ans: 1, 
            explain: "Net rate = $\\frac{1}{4} - \\frac{1}{12} = \\frac{3}{12} - \\frac{1}{12} = \\frac{2}{12} = \\frac{1}{6}$. It will take $6$ hours." 
        }
    ]
};
