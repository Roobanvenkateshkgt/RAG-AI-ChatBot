import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, orderBy, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
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

// State Management
const todayNum = new Date().getDay(); 
const todayQuestions = weeklyConfig.questions.filter(q => q.dayID === todayNum);
let currentQ = 0, score = 0, startTime, timerInterval;

// INITIALIZE ON LOAD
window.onload = () => {
    // Fill text values
    document.getElementById('display-topic').innerText = weeklyConfig.topicName || "Hero Academy";
    document.getElementById('display-day').innerText = `Current Mission: ${["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][todayNum]}`;
    document.getElementById('last-winner').innerText = weeklyConfig.lastWeekWinner;

    // Load Sidebar
    loadLeaderboard();

    // Setup Start Button
    document.getElementById('start-btn').onclick = () => {
        const user = document.getElementById('username').value.trim();
        if(!user) return alert("Enter your name first!");
        if(todayQuestions.length === 0) return alert("No questions are scheduled for today! (Sunday is a rest day).");

        document.getElementById('setup').classList.add('hidden');
        document.getElementById('quiz-area').classList.remove('hidden');
        startTime = Date.now();
        startTimer();
        renderQuestion();
    };

    // Setup Next Button
    document.getElementById('next-btn').onclick = () => {
        currentQ++;
        if(currentQ < todayQuestions.length) {
            document.getElementById('analysis').classList.add('hidden');
            renderQuestion();
        } else {
            submitFinalScore();
        }
    };
};

function startTimer() {
    timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        document.getElementById('timer').innerText = `⏱️ ${elapsed}s`;
    }, 1000);
}

function renderQuestion() {
    const q = todayQuestions[currentQ];
    document.getElementById('q-progress').innerText = `Daily Goal: ${currentQ + 1} of ${todayQuestions.length}`;
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
            
            if(i === q.ans) {
                btn.classList.add('correct');
                score++;
            } else {
                btn.classList.add('incorrect');
                btns[q.ans].classList.add('correct');
            }
            
            document.getElementById('explain-text').innerHTML = q.explain;
            document.getElementById('analysis').classList.remove('hidden');
            if (window.MathJax) MathJax.typesetPromise();
        };
        container.appendChild(btn);
    });
    if (window.MathJax) MathJax.typesetPromise();
}

async function submitFinalScore() {
    clearInterval(timerInterval);
    const totalTime = Math.floor((Date.now() - startTime) / 1000);
    const user = document.getElementById('username').value.trim();

    try {
        await addDoc(collection(db, "sprints"), {
            weekID: weeklyConfig.weekID,
            dayNum: todayNum,
            name: user,
            score: score,
            time: totalTime,
            timestamp: new Date()
        });
        alert(`Mission Complete! You got ${score}/3 correct in ${totalTime} seconds.`);
        location.reload();
    } catch (e) {
        console.error("Score Save Error: ", e);
    }
}

async function loadLeaderboard() {
    try {
        const snap = await getDocs(query(collection(db, "sprints"), where("weekID", "==", weeklyConfig.weekID)));
        const players = {};

        // Aggregate scores for the week
        snap.forEach(doc => {
            const d = doc.data();
            if(!players[d.name]) players[d.name] = { totalPts: 0, totalTime: 0 };
            players[d.name].totalPts += d.score;
            players[d.name].totalTime += d.time;
        });

        // Sort: Points (desc), then Time (asc)
        const ranked = Object.keys(players).sort((a, b) => {
            if (players[b].totalPts !== players[a].totalPts) return players[b].totalPts - players[a].totalPts;
            return players[a].totalTime - players[b].totalTime;
        });

        document.getElementById('leaderboard-body').innerHTML = ranked.map((name, i) => `
            <tr>
                <td>${i+1}</td>
                <td><strong>${name}</strong></td>
                <td>${players[name].totalPts}/15</td>
                <td>${players[name].totalTime}s</td>
            </tr>
        `).join('') || "<tr><td colspan='4'>Be the first to finish!</td></tr>";
    } catch (e) {
        console.error("Leaderboard Error: ", e);
    }
}
