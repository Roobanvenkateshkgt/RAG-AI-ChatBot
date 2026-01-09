import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, orderBy, limit, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
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

// --- GLOBAL INITIALIZATION ---
// This runs IMMEDIATELY when the page opens
document.getElementById('display-topic').innerText = weeklyConfig.topicName;
document.getElementById('display-desc').innerText = weeklyConfig.topicDescription;
document.getElementById('week-label').innerText = weeklyConfig.weekID;

// CALL THIS NOW so kids see the board before they login
loadLeaderboard(); 

let currentQ = 0;
let score = 0;
let startTime;
let timerInterval;

// --- BUTTON ACTIONS ---
document.getElementById('start-btn').onclick = () => {
    const nameInput = document.getElementById('username').value.trim();
    if(!nameInput) return alert("Please enter your Hero Name to start!");
    
    document.getElementById('setup').classList.add('hidden');
    document.getElementById('quiz-area').classList.remove('hidden');
    startTime = Date.now();
    startTimer();
    renderQuestion();
};

// --- CORE FUNCTIONS ---
function startTimer() {
    timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        document.getElementById('timer').innerText = `⏱️ ${elapsed}s`;
    }, 1000);
}

function renderQuestion() {
    const q = weeklyConfig.questions[currentQ];
    const progress = ((currentQ) / weeklyConfig.questions.length) * 100;
    document.getElementById('progress-bar').style.width = progress + "%";
    document.getElementById('q-progress').innerText = `Question ${currentQ + 1} of ${weeklyConfig.questions.length}`;
    document.getElementById('q-text').innerHTML = q.question;
    document.getElementById('analysis').classList.add('hidden');
    
    const container = document.getElementById('options-container');
    container.innerHTML = "";
    
    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = "option-btn";
        btn.innerHTML = opt;
        btn.onclick = () => {
            const btns = container.querySelectorAll('button');
            btns.forEach(b => b.disabled = true);
            if(i === q.answer) {
                btn.classList.add('correct');
                score++;
            } else {
                btn.classList.add('incorrect');
                btns[q.answer].classList.add('correct');
            }
            document.getElementById('explain-text').innerHTML = q.explanation;
            document.getElementById('analysis').classList.remove('hidden');
            MathJax.typeset();
        };
        container.appendChild(btn);
    });
    MathJax.typeset();
}

document.getElementById('next-btn').onclick = () => {
    currentQ++;
    if(currentQ < weeklyConfig.questions.length) renderQuestion();
    else finishQuiz();
};

async function finishQuiz() {
    clearInterval(timerInterval);
    const totalTime = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById('quiz-area').classList.add('hidden');
    document.getElementById('results').classList.remove('hidden');
    
    // Badge Logic
    let badge = "🥈 Silver Finisher";
    if (score === weeklyConfig.questions.length) badge = "👑 Math King/Queen";
    else if (score > weeklyConfig.questions.length * 0.8) badge = "🥇 Gold Master";

    document.getElementById('final-stats').innerHTML = `
        <div style="font-size: 2rem;">${badge}</div>
        <strong>Score:</strong> ${score}/${weeklyConfig.questions.length} <br> 
        <strong>Time:</strong> ${totalTime}s
    `;

    // Save to Firebase
    await addDoc(collection(db, "weeklyScores"), {
        weekID: weeklyConfig.weekID,
        name: document.getElementById('username').value,
        score: score,
        time: totalTime,
        date: new Date()
    });
    
    // Refresh the leaderboard one last time to show the user's new score
    loadLeaderboard();
}

async function loadLeaderboard() {
    try {
        const q = query(
            collection(db, "weeklyScores"), 
            where("weekID", "==", weeklyConfig.weekID),
            orderBy("score", "desc"), 
            orderBy("time", "asc"), 
            limit(10)
        );
        
        const snap = await getDocs(q);
        let html = "";
        let rank = 1;
        
        snap.forEach(doc => {
            const d = doc.data();
            let medal = "";
            if(rank === 1) medal = "🥇 ";
            if(rank === 2) medal = "🥈 ";
            if(rank === 3) medal = "🥉 ";
            
            html += `<tr>
                <td>${medal || rank}</td>
                <td><strong>${d.name}</strong></td>
                <td>${d.score}</td>
                <td>${d.time}s</td>
            </tr>`;
            rank++;
        });
        
        document.getElementById('leaderboard-body').innerHTML = html || "<tr><td colspan='4' style='text-align:center;'>No scores yet. Be the first!</td></tr>";
    } catch (error) {
        console.error("Leaderboard error:", error);
        document.getElementById('leaderboard-body').innerHTML = "<tr><td colspan='4'>Click 'GO' to submit your first score!</td></tr>";
    }
}
