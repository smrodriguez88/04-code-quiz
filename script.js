var highscoreEl = document.querySelector("#highscore");
var timerEl = document.querySelector("#timer");
var questionEl = document.querySelector("#question");
var multichoiceEl = document.querySelector("#multichoice");
var rightwrongEl = document.querySelector("#rightwrong");

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

var question = [question1, question2, question3, question4, question5]

// Function starts timer when StartQuiz is triggered
function Timer(){
    // If timer == 0, clear questions, display score, ask for initials
    timer = 600
    setInterval(function(){
        timerEl.textContent = timer;
		timer--;

		if (timer === 0) {
			timerEl.textContent = "";
            clearInterval(timeInterval);
            // Add code to clear question and question sel info, show score
		}
    }, 1000)
}


// Function to start Quiz on button press
function StartQuiz(){
    Timer()
    // Loop this function into a FOR loop and go through each question in the questions list
    nextQ(question[0])
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
    console.log(question)
    //Clear #question and #multichoice elements
    questionEl.textContent = ""
    multichoiceEl.textContent = ""
    //Set #question and #multichoice elemments
    questionEl.textContent = question.question
    for (var i = 1; i < 5; i++){
        answerSel = document.createElement("button")
        answerSel.classList.add("answer-button")
        answerSel.setAttribute("ans_letter", Object.keys(question)[i])
        answerSel.textContent = Object.keys(question)[i] + ". " + Object.values(question)[i]
        multichoiceEl.append(answerSel)
    }
    // Capture button elements by Class name answer-button
    var BtnEl = document.getElementsByClassName("answer-button");
    // Loop through button elements and add event listener for each
    for (var i = 0; i < BtnEl.length; i++) {
        BtnEl[i].addEventListener('click', function(){
            // Compare the attribute ans_letter for button click
            if(this.getAttribute('ans_letter') == question.ans){
                console.log("CORRECT")
                // Add function that increases the SCORE COUNT
                return true
            } else {
                console.log("WRONG!")
                return false
            }
    });
    
}
}

//Create Start button and set it to load on learn
startButtonEl = document.createElement("button");
startButtonEl.name = "Start";
startButtonEl.textContent = "Start";
questionEl.appendChild(startButtonEl);


startButtonEl.addEventListener("click", StartQuiz)

