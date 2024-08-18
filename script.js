const questions = [
  {
    question: "How many bones do sharks have?",
    answer: [
      { text: "0", correct: true},
      { text: "1", correct: false},
      { text: "106", correct: false},
      { text: "8", correct: false},
    ]
  },
  {
    question: "What whale is actually a dolphin?",
    answer: [
      { text: "Beluga whale", correct: false},
      { text: "An orca", correct: true},
      { text: "False killer whale", correct: false},
      { text: "Gray Whale", correct: false},
    ]
  },

  {
    question: "What sport has been played on the moon?",
    answer: [
      { text: "Table Tennis", correct: false},
      { text: "Handball", correct: false},
      { text: "Golf", correct: true},
      { text: "High Jump", correct: false},
    ]
  },

  {
    question: "What is a group of Unicorns called?",
    answer: [
      { text: "Fantastic", correct: false},
      { text: "A blessing", correct: true},
      { text: "Rainbow", correct: false},
      { text: "Cotton candy", correct: false},
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion(){
  resetState();
  
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answer.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click",selectAnswer);

  });
}

function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e){
  const selectBtn = e.target;
  const isCorrect = selectBtn.dataset.correct === "true";
  if(isCorrect){

    selectBtn.classList.add("correct");
    score++;
  }
  else{
    selectBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}
function showScore(){
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }
  else{
    showScore();
  }
}

nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }
  else{
    startQuiz();
  }
});
startQuiz();



