const quizData=[
    {
        question:"Whatt is the full form of HTML?",
        options:["Hyper Text Markup Language","Hyper Text Makeup Language","High Text Markup Language","Hyper Tabular Markup Language"],
        answer:"Hyper Text Markup Language"
    },
    {
        question:"Whatt is the full form of CSS?",
        options:["Cascading Style Sheep","Cartoon Style Sheets","Cascading Super Sheets","Cascading Style Sheets"],
        answer:"Cascading Style Sheets"
    },
    {
        question:"What is the full form of SEO",
        options:["Search Engine Option","Search Engine Optimization","Simple Engine Optimization","None of the above"],
        answer:"Search Engine Optimization"
    },
    {
        question:"Which input type is used for email addresses?",
        options:["text","email","number","url"],
        answer:"email"
    },
    {
        question:"Which HTML element is used to link external CSS files?",
        options:["<css>","<link>","<style>","<script>"],
        answer:"<link>"
    }

];

const questionNumberEl=document.getElementById("question-number");
const questionEl=document.getElementById("question");
const optionEl=document.querySelectorAll(".option");
const timerEl=document.getElementById("timer");
const nextBtn=document.getElementById("next-btn");
const resultEl=document.getElementById("result");
const scoreEl=document.getElementById("score");


let currentQuestion=0;
let score=0;
let timer;
let timeLeft=10;
let answerSelected=false;


function loadQuestion(){
    const {question,options}=quizData[currentQuestion];
    questionNumberEl.innerText=`Question ${currentQuestion+1} of ${quizData.length}`;
    questionEl.innerText=question;
    optionEl.forEach((option,index)=>{
        option.innerText=options[index];
        option.classList.remove("correct","incorrect");
        option.onclick=()=>selectoption(option);
    });

    answerSelected=false;
    nextBtn.disabled=false;
    startTimer();
}

function selectoption(option){
    if(!answerSelected){
        answerSelected=true;
        const selectedAswer=option.textContent;
        const correctAnswer=quizData[currentQuestion].answer;
        if(selectedAswer===correctAnswer){
            score++;
            option.classList.add("correct");
        }else{
            option.classList.add("incorrect");
            optionEl.forEach((opt)=>{
                if(opt.textContent===correctAnswer){
                    opt.classList.add("correct");
                }
            });
        }
        nextBtn.disabled=false;
    }
}

function loadNextQuestion(){
    if(currentQuestion<quizData.length-1){
        currentQuestion++;
        loadQuestion();
    }
    else{
       showResults(); 
    }
}

nextBtn.addEventListener("click",()=>{
    loadNextQuestion();
});

function startTimer(){
    clearInterval(timer);
    timeLeft=10;
    timerEl.textContent=`Time Left: ${timeLeft}s`;
    timer=setInterval(()=>{
        timeLeft--;
        timerEl.textContent=`Time Left: ${timeLeft}s`;
        if(timeLeft<=0){
            clearInterval(timer);
            if(!answerSelected){
                loadNextQuestion();
            }
        }
    },1000);
}

function showResults(){
    const quizEl=document.getElementById("quiz");
    quizEl.classList.add("hide");
    resultEl.classList.remove("hide");
    scoreEl.textContent=`Your Score: ${score} / ${quizData.length}`;
}

// Initialize the quiz
loadQuestion();