var highscoreEl = document.querySelector("#highscore");
var timerEl = document.querySelector("#timer");
var questionEl = document.querySelector("#question");
var multichoiceEl = document.querySelector("#multichoice");
var rightwrongEl = document.querySelector("#rightwrong");
var score = 0
var timer = 0
var timeInterval = null

var question1 = {
    "question": "What is the HTML tag under which one can write the JavaScript code?",
    "a": "<javascript>",
    "b": "<scripted>",
    "c": "<script>",
    "d": "<js>",
    "ans": "c",
}

var question2 = {
    "question": "Choose the correct JavaScript syntax to change the content of the following HTML code. \n\n <p id='geek'>GeeksforGeeks</p>",
    "a": "document.getElement('geek').innerHTML='I am a Geek';",
    "b": "document.getElementById('geek').innerHTML='I am a Geek';",
    "c": " document.getId('geek')='I am a Geek';",
    "d": "document.getElementById('geek').innerHTML=I am a Geek;",
    "ans": "b",
}

var question3 = {
    "question": "Which of the following is the correct syntax to display 'GeeksforGeeks' in an alert box using JavaScript?",
    "a": "alertbox('GeeksforGeeks');",
    "b": "msg('GeeksforGeeks');",
    "c": "msgbox('GeeksforGeeks');",
    "d": "alert('GeeksforGeeks');",
    "ans": "d",
}

var question4 = {
    "question": "What is the correct syntax for referring to an external script called 'geek.js'",
    "a": "<script src='geek.js'>",
    "b": "<script href='geek.js'>",
    "c": "<script ref='geek.js'>",
    "d": "<script name='geek.js'>",
    "ans": "a",
}

var question5 = {
    "question": "Which of the following is not a reserved word in JavaScript?",
    "a": "interface",
    "b": "throws",
    "c": "program",
    "d": "short",
    "ans": "c",
}

var questions = [question1, question2, question3, question4, question5]

// Function starts timer when StartQuiz is triggered
function Timer(){
    // If timer == 0, clear questions, display score, ask for initials
    timer = 90
    timerEl.textContent = timer;
    timeInterval = setInterval(function(){
        timer--;
        timerEl.textContent = timer;

		if (timer == 0) {
			timerEl.textContent = "";
            clearInterval(timeInterval);
            score = timer
            // Add code to clear question and question sel info, show score
		}
    }, 1000)
}


// Function to start Quiz on button press
function StartQuiz(){
    Timer()
    questionsShuffle()
    nextQ(questions[0])
    }

// Function to compare score with High Score and replace in local storage if higher
function HighScore(score){
    //Grab high score from local storage
    highscore = localStorage.getItem("HighScore");
    if (highscore < score) {
    highscore = score;
    }
    localStorage.setItem("HighScore", highscore);
}

// Takes in question object, clears existing content, replaces with new question/answer content
function nextQ(question){
    //Clear #question and #multichoice elements
    questionEl.textContent = ""
    multichoiceEl.textContent = ""
    //Set #question element
    questionEl.textContent = question.question
    // Loop through and add buttons to #multichoice elemment
    for (var i = 1; i < 5; i++){
        answerSel = document.createElement("button")
        answerSel.classList.add("answer-button")
        answerSel.setAttribute("ans_letter", Object.keys(question)[i])
        answerSel.textContent = Object.keys(question)[i] + ". " + Object.values(question)[i]
        multichoiceEl.append(answerSel)
    }
    // generate event listeners for each button
    generateEventListen(question)
}


function generateEventListen(question){
        // Capture button elements by Class name answer-button
        var BtnEl = document.getElementsByClassName("answer-button");
        // Loop through button elements and add event listener for each
        for (var i = 0; i < BtnEl.length; i++) {
            BtnEl[i].addEventListener('click', function(){
                // Compare the attribute ans_letter for button click
                if(this.getAttribute('ans_letter') == question.ans){
                    // If ANS is correct, shift the array
                    console.log("CORRECT")
                    questions.shift()
                    // If array is not equal to 0 display the next question
                    if(questions.length != 0){
                        questionsShuffle()
                        nextQ(questions[0])
                    }
                    // Else end quiz
                    else{
                        endQuiz() 
                    }
                } else {
                    // Else ANS is incorrect, shift the array
                    console.log("WRONG!")
                    questions.shift()
                    // Deduct 10 seconds from timer
                    timer = timer - 10
                    // If array is not equal to 0 display the next question
                    if(questions.length != 0){
                        questionsShuffle()
                        nextQ(questions[0])
                    }
                    // Else end quiz
                    else{
                        endQuiz() 
                    }
                }
        });
}}

// Shuffle the Questions array
function questionsShuffle(){
    // for i in the length of questions array -1
    for(var i = questions.length - 1; i > 0; i--){
        // set a random number with a max value of the index
        randomNum = Math.floor(Math.random() * i)
        // Store the array index option question as a tempOption 
        tempOption = questions[i]
        // Set a random question as the current array index
        questions[i] = questions[randomNum]
        // Set the tempOtion variable stored earlier to a random array index
        questions[randomNum] = tempOption
  }}

function endQuiz(){
    console.log("quiz ended")
    // Clear interval to stop timer
    clearInterval(timeInterval);
    // Score is equal to timer
    score = timer
    //Clear #question and #multichoice elements
    questionEl.textContent = ""
    multichoiceEl.textContent = ""
    //TO DO - clear timer and display score where question was
}

function storeScore(){
    //TO DO - open prompt to store initials and highScore
}
    //TO DO - make high score button clickable to display score



//Create Start button and set it to load on learn
startButtonEl = document.createElement("button");
startButtonEl.name = "Start";
startButtonEl.textContent = "Start";
questionEl.appendChild(startButtonEl);

//Create Event listener for start button
startButtonEl.addEventListener("click", StartQuiz)

