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

let todayQuestions = [];
let currentQ = 0, score = 0, startTime, timerInterval;
const todayNum = new Date().getDay();

window.onload = () => {
    todayQuestions = weeklyConfig.questions.filter(q => Number(q.dayID) === Number(todayNum));
    document.getElementById('display-topic').innerText = weeklyConfig.topicName;
    document.getElementById('display-desc').innerText = weeklyConfig.topicDescription;
    document.getElementById('display-day').innerText = `Today is ${["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][todayNum]}`;

    loadPreviousPodium();
    loadLeaderboard();

    document.getElementById('start-btn').onclick = startQuiz;
    document.getElementById('next-btn').onclick = nextQuestion;
};

function startQuiz() {
    const user = document.getElementById('username').value.trim();
    if(!user) return alert("Enter Name!");
    if(todayQuestions.length === 0) return alert("No questions today!");
    document.getElementById('setup').classList.add('hidden');
    document.getElementById('quiz-area').classList.remove('hidden');
    startTime = Date.now();
    startTimer();
    renderQuestion();
}

function renderQuestion() {
    const q = todayQuestions[currentQ];
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
            if(i === q.ans) {
                btn.classList.add('correct-anim');
                score++;
                createConfetti(btn);
                showEmoji("🌟");
            } else {
                btn.classList.add('wrong-anim');
                btns[q.ans].classList.add('correct-anim');
                showEmoji("🥺");
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
        weekID: weeklyConfig.weekID, day: todayNum, name: name, score: score, time: totalTime, date: new Date()
    });
    alert(`Success! Day Score: ${score}/${todayQuestions.length}`);
    location.reload();
}

function startTimer() {
    timerInterval = setInterval(() => {
        document.getElementById('timer').innerText = `⏱️ ${Math.floor((Date.now() - startTime) / 1000)}s`;
    }, 1000);
}

function createConfetti(target) {
    const rect = target.getBoundingClientRect();
    for(let i=0; i<8; i++) {
        const p = document.createElement('div');
        p.className = 'confetti-piece';
        p.style.left = (rect.left + rect.width/2) + 'px';
        p.style.top = (rect.top) + 'px';
        p.style.backgroundColor = ['#ff4081', '#ffeb3b', '#00e676', '#00e5ff'][Math.floor(Math.random()*4)];
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 800);
    }
}

function showEmoji(symbol) {
    const el = document.getElementById('emoji-container');
    el.innerText = symbol;
    el.classList.add('show-emoji');
    setTimeout(() => el.classList.remove('show-emoji'), 1000);
}

async function loadPreviousPodium() {
    const q = query(collection(db, "sprints"), where("weekID", "!=", weeklyConfig.weekID));
    const snap = await getDocs(q);
    let past = {};
    snap.forEach(doc => {
        const d = doc.data();
        if(!past[d.name]) past[d.name] = { score: 0, time: 0 };
        past[d.name].score += d.score; past[d.name].time += d.time;
    });
    const ranked = Object.keys(past).sort((a,b) => (past[b].score - past[a].score) || (past[a].time - past[b].time));
    document.getElementById('gold').innerText = `🥇 ${ranked[0] || '---'}`;
    document.getElementById('silver').innerText = `🥈 ${ranked[1] || '---'}`;
    document.getElementById('bronze').innerText = `🥉 ${ranked[2] || '---'}`;
}

async function loadLeaderboard() {
    const snap = await getDocs(query(collection(db, "sprints"), where("weekID", "==", weeklyConfig.weekID)));
    let players = {};
    snap.forEach(doc => {
        const d = doc.data();
        if(!players[d.name]) players[d.name] = { score: 0, time: 0 };
        players[d.name].score += d.score; players[d.name].time += d.time;
    });
    const ranked = Object.keys(players).sort((a,b) => (players[b].score - players[a].score) || (players[a].time - players[b].time));
    document.getElementById('leaderboard-body').innerHTML = ranked.map((name, i) => `
        <tr><td>${i+1}</td><td>${name}</td><td>${players[name].score}/25</td><td>${players[name].time}s</td></tr>
    `).join('') || "<tr><td colspan='4'>No scores!</td></tr>";
}
