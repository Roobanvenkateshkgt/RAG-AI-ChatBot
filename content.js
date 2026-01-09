// content.js
export const weeklyConfig = {
    weekID: "2026_WEEK_01_MARATHON", // Change this to reset the scoreboard
    topicName: "AMC 8: The 50-Question Mastery Challenge",
    topicDescription: "A comprehensive deep-dive into Ratios, Proportions, Work Rates, and Percentages. Total Mastery starts here.",
    
    questions: [
        // --- RATIOS & PROPORTIONS ---
        {
            category: "Ratios",
            question: "The ratio of boys to girls in a class is $3:5$. If there are 40 students total, how many are girls?",
            options: ["15", "20", "25", "30"],
            answer: 2,
            explanation: "Total parts: $3+5=8$. Each part is $40/8 = 5$. Girls: $5 \\times 5 = 25$."
        },
        {
            category: "Ratios",
            question: "A map scale is $1:50,000$. If two cities are 10cm apart on the map, what is the actual distance in km?",
            options: ["5 km", "50 km", "0.5 km", "500 km"],
            answer: 0,
            explanation: "$10 \\text{ cm} \\times 50,000 = 500,000 \\text{ cm}$. Since $100,000 \\text{ cm} = 1 \\text{ km}$, the distance is 5 km."
        },
        {
            category: "Ratios",
            question: "The angles of a quadrilateral are in the ratio $1:2:3:4$. What is the measure of the largest angle?",
            options: ["36°", "72°", "108°", "144°"],
            answer: 3,
            explanation: "Sum of angles = 360°. Total parts: $1+2+3+4=10$. One part = 36°. Largest = $4 \\times 36 = 144^{\\circ}$."
        },
        {
            category: "Ratios",
            question: "If $a:b = 2:3$ and $b:c = 4:5$, find the ratio $a:c$.",
            options: ["2:5", "8:15", "6:15", "1:2"],
            answer: 1,
            explanation: "Multiply the ratios: $\\frac{a}{b} \\times \\frac{b}{c} = \\frac{2}{3} \\times \\frac{4}{5} = \\frac{8}{15}$."
        },
        {
            category: "Ratios",
            question: "A 60cm rope is cut into two pieces with a ratio of $7:8$. How long is the shorter piece?",
            options: ["24cm", "28cm", "32cm", "30cm"],
            answer: 1,
            explanation: "Total parts: $7+8=15$. $60/15 = 4$. Shorter piece: $7 \\times 4 = 28$."
        },

        // --- WORK RATES ---
        {
            category: "Work Rate",
            question: "Pipe A fills a tank in 10 hours. Pipe B fills it in 15. Together, how long does it take?",
            options: ["5 hours", "6 hours", "12 hours", "4 hours"],
            answer: 1,
            explanation: "$\\frac{10 \\times 15}{10+15} = \\frac{150}{25} = 6$."
        },
        {
            category: "Work Rate",
            question: "3 workers can build a wall in 4 days. How many days would it take 6 workers?",
            options: ["8", "4", "2", "6"],
            answer: 2,
            explanation: "This is inverse proportion. $3 \\times 4 = 6 \\times x$. $12 = 6x$, so $x=2$."
        },
        {
            category: "Work Rate",
            question: "John can paint a room in 3 hours. Jim can do it in 2. If they work together, what fraction of the room is painted in 1 hour?",
            options: ["1/5", "5/6", "1/6", "2/3"],
            answer: 1,
            explanation: "Rates: $\\frac{1}{3} + \\frac{1}{2} = \\frac{2+3}{6} = \\frac{5}{6}$."
        },
        {
            category: "Work Rate",
            question: "A machine produces 50 widgets in 2 hours. How many widgets in 5 hours?",
            options: ["100", "125", "150", "250"],
            answer: 1,
            explanation: "Rate = $50/2 = 25$ widgets/hr. $25 \\times 5 = 125$."
        },

        // --- PERCENTAGES ---
        {
            category: "Percentages",
            question: "What is 15% of 20% of 500?",
            options: ["15", "20", "30", "10"],
            answer: 0,
            explanation: "$0.20 \\times 500 = 100$. $15\\%$ of $100 = 15$."
        },
        {
            category: "Percentages",
            question: "A price increases by 20%, then decreases by 20%. What is the total change?",
            options: ["No change", "4% decrease", "4% increase", "2% decrease"],
            answer: 1,
            explanation: "$100 \\times 1.20 = 120$. $120 \\times 0.80 = 96$. $100 \\to 96$ is a $4\\%$ decrease."
        },
        {
            category: "Percentages",
            question: "If 40% of a number is 120, what is the number?",
            options: ["300", "480", "240", "360"],
            answer: 0,
            explanation: "$0.4x = 120 \\Rightarrow x = 120 / 0.4 = 300$."
        },
        {
            category: "Percentages",
            question: "In a box of 40 candies, 12 are red. What percentage are red?",
            options: ["12%", "25%", "30%", "40%"],
            answer: 2,
            explanation: "$(12/40) \\times 100 = 0.3 \\times 100 = 30\\%$."
        },
        
        // --- ADDING MORE QUESTIONS (MIXED AMC 8 STYLE) ---
        {
            category: "Ratios",
            question: "A recipe uses 2 cups of sugar for every 5 cups of flour. If you use 20 cups of flour, how much sugar is needed?",
            options: ["4", "8", "10", "12"],
            answer: 1,
            explanation: "$2/5 = x/20 \\Rightarrow 5x = 40 \\Rightarrow x = 8$."
        },
        {
            category: "Work Rate",
            question: "If 5 cats can catch 5 mice in 5 minutes, how many cats are needed to catch 100 mice in 100 minutes?",
            options: ["100", "20", "5", "1"],
            answer: 2,
            explanation: "1 cat catches 1 mouse in 5 minutes. In 100 minutes, 1 cat catches 20 mice. To catch 100 mice, you need $100/20 = 5$ cats."
        }
        
        // NOTE: Continue adding questions 16-50 using this exact format. 
        // Ensure you change the 'answer' index (0 for 1st option, 1 for 2nd, etc.)
    ]
};
