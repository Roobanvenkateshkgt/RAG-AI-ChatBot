import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { weeklyConfig } from "./content.js";

const firebaseConfig = {
    apiKey: "AIzaSyAOlqpBpgaK1S7d2TCkWFTU7ZOdJdSBNBM",
    authDomain: "amc8-74254.firebaseapp.com",
    projectId: "amc8-74254",
    storageBucket: "amc8-74254.firebasestorage.app",
    messagingSenderId: "207658801952",
    appId: "1:207658801952:web:46768e050a0430d5ab5545"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Global state variables
let todayQuestions = [];
let currentQ = 0, score = 0, startTime, timerInterval;
const todayNum = new Date().getDay();

window.onload = () => {
    // DEBUG: Check raw data
    console.log("--- DEBUG: INITIAL LOAD ---");
    console.log("System Day Number (0=Sun, 1=Mon):", todayNum);
    console.log("Total questions in content.js:", weeklyConfig.questions.length);

    todayQuestions = weeklyConfig.questions.filter(q => q.dayID === todayNum);
    
    // DEBUG: Check filtered data
    console.log("Questions filtered for today:", todayQuestions);
    console.log("todayQuestions.length is:", todayQuestions.length);

    // UI Updates
    document.getElementById('display-topic').innerText = weeklyConfig.topicName;
    document.getElementById('display-desc').innerText = weeklyConfig.topicDescription;
    document.getElementById('display-day').innerText = `Today is ${["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][todayNum]}`;
    document.getElementById('last-winner').innerText = weeklyConfig.lastWeekWinner;

    loadLeaderboard();

    document.getElementById('start-btn').onclick = startQuiz;
    document.getElementById('next-btn').onclick = nextQuestion;
};

function startQuiz() {
    const user = document.getElementById('username').value.trim();
    if(!user) return alert("Enter a name!");
    
    if(todayQuestions.length === 0) {
        console.error("ERROR: No questions found for dayID:", todayNum);
        return alert("No questions found for today!");
    }

    document.getElementById('setup').classList.add('hidden');
    document.getElementById('quiz-area').classList.remove('hidden');
    
    startTime = Date.now();
    console.log("--- DEBUG: QUIZ STARTED ---");
    console.log("User:", user);
    console.log("Start Time Stamp:", startTime);

    startTimer();
    renderQuestion();
}

function renderQuestion() {
    const q = todayQuestions[currentQ];
    
    // DEBUG: Question tracking
    console.log(`--- DEBUG: RENDERING Q#${currentQ + 1} ---`);
    console.log("Question Object:", q);

    document.getElementById('q-progress').innerText = `Question ${currentQ + 1} of ${todayQuestions.length}`;
    document.getElementById('q-text').innerHTML = q.q;
    
    const container = document.getElementById('options-container');
    container.innerHTML = "";
    
    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = "option-btn";
        btn.innerHTML = opt;
        btn.onclick = () => {
            const btns = container.querySelectorAll('button');
            btns.forEach(b => b.disabled = true);
            
            // DEBUG: Answer Selection
            console.log(`User selected option index: ${i}`);
            console.log(`Correct answer index: ${q.ans}`);

            if(i === q.ans) {
                btn.classList.add('correct');
                score++;
                console.log("%c CORRECT! Current Score:", "color: green; font-weight: bold;", score);
            } else {
                btn.classList.add('incorrect');
                btns[q.ans].classList.add('correct');
                console.log("%c WRONG. Score remains:", "color: red; font-weight: bold;", score);
            }
            
            document.getElementById('explain-text').innerHTML = q.explain;
            document.getElementById('analysis').classList.remove('hidden');
            if (window.MathJax) MathJax.typesetPromise();
        };
        container.appendChild(btn);
    });
    if (window.MathJax) MathJax.typesetPromise();
}

function nextQuestion() {
    currentQ++;
    console.log("Moving to next index:", currentQ);

    if(currentQ < todayQuestions.length) {
        document.getElementById('analysis').classList.add('hidden');
        renderQuestion();
    } else {
        console.log("No more questions. Finishing quiz...");
        finishQuiz();
    }
}

async function finishQuiz() {
    clearInterval(timerInterval);
    const totalTime = Math.floor((Date.now() - startTime) / 1000);
    const name = document.getElementById('username').value.trim();
    
    console.log("--- DEBUG: QUIZ FINISHED ---");
    console.log("Final Score:", score);
    console.log("Final Length:", todayQuestions.length);
    console.log("Total Time (s):", totalTime);

    await addDoc(collection(db, "sprints"), {
        weekID: weeklyConfig.weekID,
        day: todayNum,
        name: name,
        score: score,
        time: totalTime,
        date: new Date()
    });
    
    alert(`Success! Day Score: ${score}/${todayQuestions.length}`);
    location.reload();
}

function startTimer() {
    timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        document.getElementById('timer').innerText = `⏱️ ${elapsed}s`;
    }, 1000);
}

async function loadLeaderboard() {
    try {
        const snap = await getDocs(query(collection(db, "sprints"), where("weekID", "==", weeklyConfig.weekID)));
        const players = {};
        snap.forEach(doc => {
            const d = doc.data();
            if(!players[d.name]) players[d.name] = { totalScore: 0, totalTime: 0 };
            players[d.name].totalScore += d.score;
            players[d.name].totalTime += d.time;
        });
        
        console.log("Leaderboard Data Processed:", players);

        const ranked = Object.keys(players).sort((a, b) => {
            if (players[b].totalScore !== players[a].totalScore) return players[b].totalScore - players[a].totalScore;
            return players[a].totalTime - players[b].totalTime;
        });
        
        const lbBody = document.getElementById('leaderboard-body');
        if(lbBody) {
            lbBody.innerHTML = ranked.map((name, i) => `
                <tr><td>${i+1}</td><td>${name}</td><td>${players[name].totalScore}/25</td><td>${players[name].totalTime}s</td></tr>
            `).join('') || "<tr><td colspan='4'>No scores yet!</td></tr>";
        }
    } catch (e) { console.error("Leaderboard Error:", e); }
}
