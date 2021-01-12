var timeLeft = 70
var currentQuestionNumber = 0;
var currentScore = 0;
var lastScore = 0;

var questionList = [
    {
        question: "What continent is Ethiopia located in?",
        choices: ["Europe", "Africa", "South America", "Asia"],
        correctAns: "Africa"
    },

    {
        question: "How many languages our spoken in Ethiopia?",
        choices: ["5+", "45+", "80+", "25+"],
        correctAns: "80+"

    },

    {
        question: "What is the capital city of Ethiopia?",
        choices: ["Nariobi", "Dodoma", "Addis Ababa", "Dire Dawa"],
        correctAns: "Addis Ababa"
    },

    {
        question: "What is the largest ethnic group in Ethiopia?",
        choices: ["Amhara", "Somali", "Tigray", "Oromo"],
        correctAns: "Oromo"
    },

    {
        question: "How old is Ethiopia?",
        choices: ["500yrs", "1000yrs", "2000yrs", "1500yrs"],
        correctAns: "2000yrs"
    },

    {
        question: "Ethiopia has never been colonized?",
        choices: ["true", "false"],
        correctAns: "true"
    },

    {
        question: "What is the main dish eaten in Ethiopia?",
        choices: ["Injera", "fish", "Ugali ", "Oxtaiil"],
        correctAns: "Injera"
    }
]

function loadScore () {
    var timerEl = document.querySelector('#timer');
        timerEl.style.display = "none";

    var questionChoice = document.querySelector('#question-choice')
        questionChoice.style.display = "none";

    var scoreContainer = document.querySelector('#score-container')
        scoreContainer.style.display = "block"

    var finalScore = document.querySelector('#final-score')
        finalScore.textContent = lastScore;

    // local storage set item
}

function loadQuestion () {
    // clear status text
    var status =  document.querySelector('#status')
                status.textContent = ""

    // hide the welcome message
    var description = document.querySelector("#description")
        description.style.display = "none"

    // make question-choice appear
    var questionChoice = document.querySelector('#question-choice')
        questionChoice.style.display = "block"

    // clear the choices container
    var choicesContainer = document.querySelector('#choices')
    choicesContainer.innerHTML = '';

    // change the question text
    var questionText = document.querySelector("#questionText")
    questionText.textContent = questionList[currentQuestionNumber].question

    // change the option buttons
    questionList[currentQuestionNumber].choices.forEach(function(choice) {
        var newButton = document.createElement('button');
        newButton.textContent = choice;
        newButton.addEventListener('click', function(e) {
            var clickedButton = e.target;
            // check if clicked button is correct
            // console.log(clickedButton.textContent)
            // console.log(questionList[currentQuestionNumber-1].correctAns)
            if(clickedButton.textContent == questionList[currentQuestionNumber-1].correctAns){
                currentScore++;

                var status =  document.querySelector('#status')
                status.textContent = "Correct!"
                console.log('Correct')
            } else {
                var status =  document.querySelector('#status')
                status.textContent = "Wrong!"
                console.log('Wrong');

                timeLeft -= 10

                if(timeLeft <= 0) {
                    timeLeft = 0;
                } 
            }

            // load next question
            if(currentQuestionNumber < questionList.length){
                setTimeout(loadQuestion, 1000)
            } else {
                lastScore = timeLeft;
                loadScore();
            }
        })
        choicesContainer.append(newButton);
    })

    currentQuestionNumber++;
}

    // Declared variables
    var takeTheQuiz = document.querySelector("#startBtn")
    takeTheQuiz.addEventListener("click", function(){
        var countdownTimer = setInterval(function(){
            var countDown = document.querySelector("#countDown")
                countDown.textContent = timeLeft
                timeLeft--
                if(timeLeft < 0) {
                    timeLeft = 0;
                    clearInterval(countdownTimer)
                    loadScore();
                }
    
        },1000)

        loadQuestion();
    })

    document.querySelector('#save-button').addEventListener('click', function() {
        var score = lastScore;
        var initials = document.querySelector('#initialInput').value;
        

        var scoreObject = {
            initials: initials,
            score: score
        }

        var currentData = JSON.parse(localStorage.getItem('scoreRecords')) || [];

        currentData.push(scoreObject);

        localStorage.setItem('scoreRecords', JSON.stringify(currentData));

        location.href = "score.html"


    })

