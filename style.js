let questions = [
  {
    topic: "arithmetic",
    q: "What is the remainder when 2024 is divided by 9?",
    choices: ["2","4","6","8","9"],
    answer: "2",
    solution: "Sum of digits of 2024 is 8, so remainder mod 9 is 8."
  },
  {
    topic: "fractions",
    q: "What percent of 50 is 20?",
    choices: ["20%","30%","40%","50%","60%"],
    answer: "40%",
    solution: "20 ÷ 50 = 0.4 = 40%."
  },
  {
    topic: "algebra",
    q: "If 3x + 7 = 25, what is x?",
    choices: ["4","5","6","7","8"],
    answer: "6",
    solution: "3x = 18 ⇒ x = 6."
  },
  {
    topic: "geometry",
    q: "A rectangle has area 24 and length 6. What is its perimeter?",
    choices: ["16","18","20","24","28"],
    answer: "20",
    solution: "Width = 24 ÷ 6 = 4. Perimeter = 2(6+4)=20."
  },
  {
    topic: "counting",
    q: "How many ways can 2 students be chosen from 5?",
    choices: ["5","10","15","20","25"],
    answer: "10",
    solution: "C(5,2) = 10."
  }
];

let index = 0;
let score = Number(localStorage.getItem("amc8Score")) || 0;
let timer;
let timeLeft = 2400;

function loadQuestion() {
  const q = questions[index];
  document.getElementById("question").innerText = q.q;
  const cDiv = document.getElementById("choices");
  cDiv.innerHTML = "";
  q.choices.forEach(c => {
    cDiv.innerHTML += `
      <label class="choice">
        <input type="radio" name="choice" value="${c}"> ${c}
      </label>`;
  });
  document.getElementById("feedback").innerText = "";
  document.getElementById("solution").innerText = "";
}

function submitAnswer() {
  const selected = document.querySelector("input[name='choice']:checked");
  if (!selected) return;

  const q = questions[index];
  if (selected.value === q.answer) {
    score++;
    document.getElementById("feedback").innerText = "✅ Correct";
  } else {
    document.getElementById("feedback").innerText = "❌ Incorrect";
  }
  document.getElementById("solution").innerText = "Solution: " + q.solution;
  document.getElementById("score").innerText = score;
  localStorage.setItem("amc8Score", score);
  updateDashboard();
}

function nextQuestion() {
  index = (index + 1) % questions.length;
  loadQuestion();
}

function updateDashboard() {
  const name = document.getElementById("student").value || "Student";
  document.getElementById("dashboard").innerText =
    `${name} has solved ${score} AMC 8 problems correctly.`;
}

function startContestTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    let m = Math.floor(timeLeft / 60);
    let s = timeLeft % 60;
    document.getElementById("timer").innerText =
      `⏱️ ${m}:${s.toString().padStart(2,'0')}`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("Contest finished!");
    }
  }, 1000);
}

function readQuestion() {
  speechSynthesis.speak(
    new SpeechSynthesisUtterance(
      document.getElementById("question").innerText
    )
  );
}

loadQuestion();
startContestTimer();
updateDashboard();
