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

const todayNum = new Date().getDay(); 
const todayQuestions = weeklyConfig.questions.filter(q => q.dayID === todayNum);
let currentQ = 0, score = 0, startTime, timerInterval;

// FIX: This wrapper ensures HTML is built before JS runs
window.onload = () => {
    const topicEl = document.getElementById('display-topic');
    const descEl = document.getElementById('display-desc');
    const dayEl = document.getElementById('display-day');
    const winnerEl = document.getElementById('last-winner');

    // Safety checks: Only set text if the ID exists in HTML
    if (topicEl) topicEl.innerText = weeklyConfig.topicName || "";
    if (descEl) descEl.innerText = weeklyConfig.topicDescription || "";
    if (dayEl) dayEl.innerText = `Today is ${["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][todayNum]}`;
    if (winnerEl) winnerEl.innerText = weeklyConfig.lastWeekWinner || "TBD";

    loadLeaderboard();

    document.getElementById('start-btn').onclick = startQuiz;
    document.getElementById('next-btn').onclick = nextQuestion;
};

function startQuiz() {
    const user = document.getElementById('username').value.trim();
    if(!user) return alert("Enter a name!");
    if(todayQuestions.length === 0) return alert("No questions today!");

    document.getElementById('setup').classList.add('hidden');
    document.getElementById('quiz-area').classList.remove('hidden');
    startTime = Date.now();
    startTimer();
    renderQuestion();
}

function startTimer() {
    timerInterval = setInterval(() => {
        const timerEl = document.getElementById('timer');
        if(timerEl) {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            timerEl.innerText = `⏱️ ${elapsed}s`;
        }
    }, 1000);
}

function renderQuestion() {
    const q = todayQuestions[currentQ];
    document.getElementById('q-progress').innerText = `Question ${currentQ + 1} of 3`;
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

function nextQuestion() {
    currentQ++;
    if(currentQ < todayQuestions.length) {
        document.getElementById('analysis').classList.add('hidden');
        renderQuestion();
    } else {
        finishQuiz();
    }
}

async function finishQuiz() {
    clearInterval(timerInterval);
    const totalTime = Math.floor((Date.now() - startTime) / 1000);
    const name = document.getElementById('username').value.trim();
    await addDoc(collection(db, "sprints"), {
        weekID: weeklyConfig.weekID,
        day: todayNum,
        name: name,
        score: score,
        time: totalTime,
        date: new Date()
    });
    alert(`Success! Score: ${score}/3`);
    location.reload();
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
        const ranked = Object.keys(players).sort((a, b) => {
            if (players[b].totalScore !== players[a].totalScore) return players[b].totalScore - players[a].totalScore;
            return players[a].totalTime - players[b].totalTime;
        });
        const lbBody = document.getElementById('leaderboard-body');
        if(lbBody) {
            lbBody.innerHTML = ranked.map((name, i) => `
                <tr><td>${i+1}</td><td>${name}</td><td>${players[name].totalScore}/15</td><td>${players[name].totalTime}s</td></tr>
            `).join('') || "<tr><td colspan='4'>No scores yet!</td></tr>";
        }
    } catch (e) { console.error(e); }
}
