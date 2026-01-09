let questions = [];
let index = 0;
let score = 0;
let timer;
let timeLeft = 2400; // 40 minutes
let mode = 'practice';
let leaderboard = [];

async function loadTopic(topic) {
    const response = await fetch(`problems/${topic}.json`);
    questions = await response.json();
    index = 0;
    score = 0;
    document.getElementById('score').innerText = score;
    loadQuestion();
}

function loadQuestion() {
    if(index >= questions.length){
        endQuiz();
        return;
    }
    const q = questions[index];
    document.getElementById('question').innerText = q.question;
    const cDiv = document.getElementById('choices');
    cDiv.innerHTML = '';
    q.choices.forEach(c => {
        cDiv.innerHTML += `<label class="choice"><input type='radio' name='choice' value='${c}'> ${c}</label>`;
    });
    document.getElementById('solution').innerText = '';
    document.getElementById('feedback').innerText = '';
}

function submitAnswer() {
    const selected = document.querySelector("input[name='choice']:checked");
    if(!selected) return;
    const q = questions[index];
    if(selected.value === q.answer){
        score++;
        document.getElementById('feedback').innerText = '✅ Correct!';
    } else {
        document.getElementById('feedback').innerText = `❌ Wrong. Answer: ${q.answer}`;
    }
    document.getElementById('solution').innerText = 'Solution: ' + q.solution;
    document.getElementById('score').innerText = score;
}

function nextQuestion() {
    index++;
    loadQuestion();
}

function startTimer() {
    clearInterval(timer);
    timeLeft = 2400;
    timer = setInterval(() => {
        let min = Math.floor(timeLeft/60);
        let sec = timeLeft % 60;
        document.getElementById('timer').innerText = `⏱️ ${min}:${sec.toString().padStart(2,'0')}`;
        timeLeft--;
        if(timeLeft < 0){
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

function startContest(topic){
    mode='contest';
    loadTopic(topic).then(()=>{
        questions = questions.sort(()=>0.5-Math.random()).slice(0,questions.length);
        startTimer();
    });
}

function endQuiz(){
    alert(`Quiz Finished! Your score: ${score}/${questions.length}`);
    leaderboard.push({name:document.getElementById('studentName').value || 'Anonymous', score});
    leaderboard.sort((a,b)=>b.score-a.score);
    updateLeaderboard();
}

function updateLeaderboard(){
    let dash = document.getElementById('dashboard');
    dash.innerHTML = '<h3>Leaderboard</h3>' + leaderboard.map((l,i)=>`${i+1}. ${l.name}: ${l.score}`).join('<br>');
}

function readQuestion(){
    const q = questions[index];
    const msg = new SpeechSynthesisUtterance(q.question);
    speechSynthesis.speak(msg);
}

function nextBadge(){
    if(score/questions.length>=0.8) return '🏅 Gold';
    if(score/questions.length>=0.6) return '🥈 Silver';
    if(score/questions.length>=0.4) return '🥉 Bronze';
    return '💡 Try Again';
}
