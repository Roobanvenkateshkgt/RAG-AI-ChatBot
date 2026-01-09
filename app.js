import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, orderBy, limit, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { weeklyConfig } from "./content.js";

// YOUR FIREBASE CONFIG
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

// Initialize Header Content
document.getElementById('display-topic').innerText = weeklyConfig.topicName;
document.getElementById('display-desc').innerText = weeklyConfig.topicDescription;
document.getElementById('week-label').innerText = weeklyConfig.weekID;

let currentQ = 0;
let score = 0;
let startTime;
let user = "";
let timerInterval;

document.getElementById('start-btn').onclick = () => {
    user = document.getElementById('username').value.trim() || "Anonymous";
    document.getElementById('setup').classList.add('hidden');
    document.getElementById('quiz-area').classList.remove('hidden');
    startTime = Date.now();
    startTimer();
    renderQuestion();
};

function startTimer() {
    timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        document.getElementById('timer').innerText = `Time: ${elapsed}s`;
    }, 1000);
}

function renderQuestion() {
    const q = weeklyConfig.questions[currentQ];
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
    if(currentQ < weeklyConfig.questions.length) {
        renderQuestion();
    } else {
        finishQuiz();
    }
};

async function finishQuiz() {
    clearInterval(timerInterval);
    const totalTime = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById('quiz-area').classList.add('hidden');
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('final-stats').innerHTML = `<strong>Score:</strong> ${score}/${weeklyConfig.questions.length} | <strong>Time:</strong> ${totalTime}s`;

    // Save Data to Firebase
    try {
        await addDoc(collection(db, "weeklyScores"), {
            weekID: weeklyConfig.weekID,
            name: user,
            score: score,
            time: totalTime,
            date: new Date()
        });
    } catch (e) { console.error("Score save failed", e); }

    loadLeaderboard();
}

async function loadLeaderboard() {
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
        html += `<tr><td>${rank++}</td><td>${d.name}</td><td>${d.score}</td><td>${d.time}s</td></tr>`;
    });
    document.getElementById('leaderboard-body').innerHTML = html || "<tr><td colspan='4'>No scores yet this week!</td></tr>";
}
