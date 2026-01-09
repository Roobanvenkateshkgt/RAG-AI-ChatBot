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

// Setup initial view
document.getElementById('display-topic').innerText = weeklyConfig.topicName;
document.getElementById('display-desc').innerText = weeklyConfig.topicDescription;
document.getElementById('week-label').innerText = weeklyConfig.weekID;
loadLeaderboard(); // Load immediately on start

let currentQ = 0;
let score = 0;
let startTime;
let timerInterval;

document.getElementById('start-btn').onclick = () => {
    if(!document.getElementById('username').value) return alert("Pick a hero name first!");
    document.getElementById('setup').classList.add('hidden');
    document.getElementById('quiz-area').classList.remove('hidden');
    startTime = Date.now();
    startTimer();
    renderQuestion();
};

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
    document.getElementById('final-stats').innerHTML = `Score: ${score}/${weeklyConfig.questions.length} <br> Time: ${totalTime}s`;

    await addDoc(collection(db, "weeklyScores"), {
        weekID: weeklyConfig.weekID,
        name: document.getElementById('username').value,
        score: score,
        time: totalTime,
        date: new Date()
    });
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
        const rankClass = rank === 1 ? "rank-1" : "";
        html += `<tr class="${rankClass}"><td>#${rank++}</td><td>${d.name}</td><td>${d.score}</td><td>${d.time}s</td></tr>`;
    });
    document.getElementById('leaderboard-body').innerHTML = html || "<tr><td colspan='4'>Be the first hero!</td></tr>";
}
