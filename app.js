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
let currentQ = 0, score = 0, startTime;

document.getElementById('display-day').innerText = `Target: ${["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][todayNum]}'s Daily 3`;
document.getElementById('last-winner').innerText = weeklyConfig.lastWeekWinner;
loadLeaderboard();

document.getElementById('start-btn').onclick = () => {
    if(!document.getElementById('username').value.trim()) return alert("Enter a name!");
    if(todayQuestions.length === 0) return alert("No questions for Sunday! Come back tomorrow.");
    document.getElementById('setup').classList.add('hidden');
    document.getElementById('quiz-area').classList.remove('hidden');
    startTime = Date.now();
    renderQuestion();
};

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
            if(i === q.ans) { btn.classList.add('correct'); score++; }
            else { btn.classList.add('incorrect'); btns[q.ans].classList.add('correct'); }
            document.getElementById('explain-text').innerHTML = q.explain;
            document.getElementById('analysis').classList.remove('hidden');
            // FIX: Refresh math symbols after adding text to HTML
            if (window.MathJax) MathJax.typesetPromise();
        };
        container.appendChild(btn);
    });
    // FIX: Refresh math symbols when the question first appears
    if (window.MathJax) MathJax.typesetPromise();
}

document.getElementById('next-btn').onclick = () => {
    currentQ++;
    if(currentQ < 3) {
        document.getElementById('analysis').classList.add('hidden');
        renderQuestion();
    } else {
        submitScore();
    }
};

async function submitScore() {
    const totalTime = Math.floor((Date.now() - startTime) / 1000);
    await addDoc(collection(db, "sprints"), {
        weekID: weeklyConfig.weekID,
        dayNum: todayNum,
        name: document.getElementById('username').value.trim(),
        score: score,
        time: totalTime
    });
    location.reload();
}

async function loadLeaderboard() {
    const snap = await getDocs(query(collection(db, "sprints"), where("weekID", "==", weeklyConfig.weekID)));
    const players = {};
    snap.forEach(doc => {
        const d = doc.data();
        if(!players[d.name]) players[d.name] = { score: 0, time: 0 };
        players[d.name].score += d.score;
        players[d.name].time += d.time;
    });

    const ranked = Object.keys(players).sort((a, b) => {
        if (players[b].score !== players[a].score) return players[b].score - players[a].score;
        return players[a].time - players[b].time;
    });

    document.getElementById('leaderboard-body').innerHTML = ranked.map((name, i) => `
        <tr><td>${i+1}</td><td>${name}</td><td>${players[name].score}/15</td><td>${players[name].time}s</td></tr>
    `).join('') || "<tr><td colspan='4'>No heroes yet. Be the first!</td></tr>";
}
