// Set global variables
const highscoreEl = document.querySelector("#highscore");
const timerEl = document.querySelector("#timer");
const questionEl = document.querySelector("#question");
const multichoiceEl = document.querySelector("#multichoice");
const rightwrongEl = document.querySelector("#rightwrong");
let score = null
let timer = null
let timeInterval = null
let questions = null

// Set questions, answer selections, and answers as objects
let question1 = {
    "question": "What is the HTML tag under which one can write the JavaScript code?",
    "a": "<javascript>",
    "b": "<scripted>",
    "c": "<script>",
    "d": "<js>",
    "ans": "c",
}

let question2 = {
    "question": "Choose the correct JavaScript syntax to change the content of the following HTML code. \n\n <p id='geek'>GeeksforGeeks</p>",
    "a": "document.getElement('geek').innerHTML='I am a Geek';",
    "b": "document.getElementById('geek').innerHTML='I am a Geek';",
    "c": " document.getId('geek')='I am a Geek';",
    "d": "document.getElementById('geek').innerHTML=I am a Geek;",
    "ans": "b",
}

let question3 = {
    "question": "Which of the following is the correct syntax to display 'GeeksforGeeks' in an alert box using JavaScript?",
    "a": "alertbox('GeeksforGeeks');",
    "b": "msg('GeeksforGeeks');",
    "c": "msgbox('GeeksforGeeks');",
    "d": "alert('GeeksforGeeks');",
    "ans": "d",
}

let question4 = {
    "question": "What is the correct syntax for referring to an external script called 'geek.js'",
    "a": "<script src='geek.js'>",
    "b": "<script href='geek.js'>",
    "c": "<script ref='geek.js'>",
    "d": "<script name='geek.js'>",
    "ans": "a",
}

let question5 = {
    "question": "Which of the following is not a reserved word in JavaScript?",
    "a": "interface",
    "b": "throws",
    "c": "program",
    "d": "short",
    "ans": "c",
}



// Function starts timer when StartQuiz is triggered
function Timer(){
    // If timer == 0, clear questions, display score, ask for initials
    timer = 100
    timerEl.classList.add("btn")
    timerEl.classList.add("btn-info")
    timerEl.classList.add("disabled")
    timerEl.textContent = "Timer: " + timer;
    timeInterval = setInterval(function(){
        timer--;
        timerEl.textContent = "Timer: " + timer;

		if (timer == 0) {
			timerEl.textContent = "";
            score = timer
            endQuiz()
		}
    }, 1000)
}


// Function to start Quiz on button press
function StartQuiz(){
    // Rebuild array when Quiz restarts after running once
    // Need to check if the array is undefined or if the length is 0
    // On first run it will be undefined and not able to analyze length
    // On the subsequent runs it will be defined with a length of 0
    // Must check for both conditions
    if((questions == undefined) || (questions.length == 0)){
        questions = [question1, question2, question3, question4, question5]
    }
    // Clear text content when Quiz starts
    rightwrongEl.textContent = ""
    Timer()
    setupHighScore()
    questionsShuffle()
    nextQ(questions[0])
    }

// Takes in question object, clears existing content, replaces with new question/answer content
function nextQ(question){
    //Clear #question, #multichoice, #rightwrong elements
    questionEl.textContent = ""
    multichoiceEl.textContent = ""
    //Set #question element
    questionEl.textContent = question.question
    // Loop through and add buttons to #multichoice elemment for each answer option
    // Set classes and more importantly add the ans_letter attribute which equalts the object Key
    // for later reference, then set content to the Key and the Value to display the question
    for (let i = 1; i < 5; i++){
        answerSel = document.createElement("button")
        answerSel.classList.add("btn")
        answerSel.classList.add("btn-secondary")
        answerSel.classList.add("answer-button")
        answerSel.classList.add("my-1")
        answerSel.classList.add("mx-auto")
        answerSel.setAttribute("ans_letter", Object.keys(question)[i])
        answerSel.textContent = Object.keys(question)[i] + ". " + Object.values(question)[i]
        multichoiceEl.append(answerSel)
    }
    // generate event listeners for each button
    generateEventListen(question)
}


function generateEventListen(question){
        // Capture button elements by Class name answer-button
        let BtnEl = document.getElementsByClassName("answer-button");
        // Loop through button elements and add event listener for each
        for (let i = 0; i < BtnEl.length; i++) {
            BtnEl[i].addEventListener('click', function(){
                // Compare the attribute ans_letter for button click
                if(this.getAttribute('ans_letter') == question.ans){
                    // Display RIGHT/WRONG
                    rightwrongEl.classList.remove("alert-danger")
                    rightwrongEl.classList.add("alert-success")
                    rightwrongEl.textContent = "CORRECT!"
                    // If ANS is correct, remove first array option
                    questions.shift()
                    // If array is not equal to 0 display the next question
                    if(questions.length != 0){
                        questionsShuffle()
                        nextQ(questions[0])
                    }
                    // Else end quiz
                    else{
                        rightwrongEl.classList.remove("alert-danger")
                        rightwrongEl.classList.add("alert-success")
                        rightwrongEl.textContent = "CORRECT!"
                        endQuiz() 
                    }
                } else {
                    // Display RIGHT/WRONG
                    rightwrongEl.classList.remove("alert-success")
                    rightwrongEl.classList.add("alert-danger")
                    rightwrongEl.textContent = "WRONG!"
                    // Else ANS is incorrect, shift the array
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
                        rightwrongEl.classList.remove("alert-success")
                        rightwrongEl.classList.add("alert-danger")
                        rightwrongEl.textContent = "WRONG!"
                        endQuiz() 
                    }
                }
        });
}}

// Shuffle the Questions array
function questionsShuffle(){
    // for i in the length of questions array -1
    for(let i = questions.length - 1; i > 0; i--){
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
    // Clear interval to stop timer
    clearInterval(timeInterval);
    // Score is equal to timer
    score = timer
    //Clear #question, #multichoice, #rightwrong elements
    questionEl.textContent = ""
    multichoiceEl.textContent = ""
    rightwrongEl.textContent = ""
    rightwrongEl.classList.remove("alert-success")
    rightwrongEl.classList.remove("alert-danger")
    //Clear timer and display score where question was
    timerEl.textContent = "Score: " + score;
    storeHighScore()
    setup()
}

function storeHighScore(){
    // Get highScore and hsInitials elements from local storage
    hScore = localStorage.getItem("highScore")
    hsInitials = localStorage.getItem("hsInitials")
    // If the Score is higher than the stored high score prompt for initals to set new high score
    if (hScore < score) {
        // Prompt user for Initials, continue to prompt if nothing is entered
        hsInitials = prompt("New High Score! Please Enter your Initials")
        while(!hsInitials){
            hsInitials = prompt("New High Score! Please Enter your Initials")
        }
        // Store highScore and hsInitials in local storage
        localStorage.setItem("hsInitials", hsInitials)
        localStorage.setItem("highScore", score)
    } else{
        // Else return a message showing user score vs the current high score
        alert("Your score was " + score + " better luck next time at beating the high score of " + hScore+ " set by " + hsInitials)
    }
}

function readHighScore(){
    // Grab high score variables from local storage, this is called by the high score button
    hsInitials = localStorage.getItem("hsInitials")
    hsScore = localStorage.getItem("highScore")
    // If both exist show the score and initials
    if (hsInitials && hsScore){
        alert(hsInitials + " - "+ hsScore)
    }
    // Else display this alert
    else{
        alert("No High Scores")
    }
}

// Setup the High Score button
function setupHighScore(){
    hsBtn = document.createElement("button")
    hsBtn.classList.add("btn")
    hsBtn.classList.add("btn-info")
    hsBtn.classList.add("high-score-button")
    hsBtn.textContent = "View High Score"
    // If highscoreEl has a childElement already don't append a new button
    // Fixing issue: When Quiz has been restarted button was re-generated
    if (highscoreEl.childElementCount == 0){
        highscoreEl.append(hsBtn)
    }
    // Add button listener
    hsBtn.addEventListener("click", readHighScore)
}
    
// Setup quiz
function setup(){
    //Display Welcome Message
    questionEl.textContent = "Coding Quiz Challenge!"
    multichoiceEl.textContent = "Welcome to the coding quiz challenge. You will have 100 seconds to answer 5 Javascript related questions. For every wrong answer you will be docked -10 points/seconds. Have fun!"
    //Create Start button and set it to load on learn
    startButtonEl = document.createElement("button");
    startButtonEl.name = "Start";
    startButtonEl.textContent = "Start";
    startButtonEl.classList.add("start-button")
    startButtonEl.classList.add("my-auto")
    startButtonEl.classList.add("btn")
    startButtonEl.classList.add("btn-success")
    rightwrongEl.appendChild(startButtonEl);

    //Create Event listener for start button
    startButtonEl.addEventListener("click", StartQuiz)
}

// Start all the things!
setup()

