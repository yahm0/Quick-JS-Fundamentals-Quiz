
// added an event listener for the DOM Content
// established the constants to be used
document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('start-btn');
    const highScoresButton = document.getElementById('high-scores-btn');
    const questionContainer = document.getElementById('question-container');
    const optionsContainer = document.getElementById('options-container');
    const feedbackContainer = document.getElementById('feedback-container');
    const scoreContainer = document.getElementById('score-container');
    const initialsInput = document.getElementById('initials');
    const saveScoreButton = document.getElementById('save-score-btn');
    const timerElement = document.getElementById('timer');
  
    let currentQIndex = 0;
    let score = 0;
    let timer;

    const questions = [
        {
          question: 'What does the acronym DOM stand for in JavaScript?',
          options: ['Document Object Model', 'Data Object Model', 'Document Oriented Model', 'Digital Object Model'],
          correctAnswer: 'Document Object Model'
        },
        {
          question: 'Which keyword is used to declare a variable in JavaScript?',
          options: ['var', 'int', 'string', 'declare'],
          correctAnswer: 'var'
        },
        {
          question: 'What is the purpose of the `querySelector` method in JavaScript?',
          options: ['To select multiple elements', 'To select the first element that matches a specified CSS selector', 'To query the user for input', 'To query the server for data'],
          correctAnswer: 'To select the first element that matches a specified CSS selector'
        },
        {
          question: 'What is the output of `console.log(typeof [])`?',
          options: ['"object"', '"array"', '"undefined"', '"string"'],
          correctAnswer: '"object"'
        },
        {
          question: 'What is a closure in JavaScript?',
          options: ['A function that is part of an object', 'A way to declare variables with restricted scope', 'A combination of a function and the lexical environment within which that function was declared', 'A type of loop'],
          correctAnswer: 'A combination of a function and the lexical environment within which that function was declared'
        },
        {
          question: 'What does the `===` operator do in JavaScript?',
          options: ['Assigns a value to a variable', 'Compares values for equality without type coercion', 'Checks if a variable is undefined', 'Concatenates two strings'],
          correctAnswer: 'Compares values for equality without type coercion'
        },
        {
          question: 'How can you prevent the default behavior of an HTML form submit button using JavaScript?',
          options: ['event.preventDefault()', 'event.stopPropagtion()', 'event.stopPropagation()', 'event.preventSubmit()'],
          correctAnswer: 'event.preventDefault()'
        },
        {
          question: 'What is the purpose of the `setTimeout` function in JavaScript?',
          options: ['To create a delay before executing a function', 'To set the interval between function executions', 'To stop the execution of a function', 'To set the timeout for AJAX requests'],
          correctAnswer: 'To create a delay before executing a function'
        },
        {
          question: 'What is the difference between `let`, `const`, and `var` when declaring variables?',
          options: ['They are interchangeable and can be used in any context', '`let` and `const` have block-level scope, while `var` has function-level scope', '`const` is used for constants, while `let` and `var` are for variables', 'There is no difference; they are three ways to declare the same thing'],
          correctAnswer: '`let` and `const` have block-level scope, while `var` has function-level scope'
        },
        {
          question: 'What is the purpose of the `JSON.parse` method in JavaScript?',
          options: ['To parse a JSON string and convert it into a JavaScript object', 'To stringify a JavaScript object into a JSON-formatted string', 'To check if a variable is of type JSON', 'To create a new JSON object'],
          correctAnswer: 'To parse a JSON string and convert it into a JavaScript object'
        }
      ];


  // Event listeners for buttons
  startButton.addEventListener('click', startQuiz);
  highScoresButton.addEventListener('click', viewHighScores);
  saveScoreButton.addEventListener('click', saveScore);

   // Function to start the quiz
   function startQuiz() {
    startButton.classList.add('hide');
    highScoresButton.classList.add('hide'); // Hide high scores button during the quiz
    questionContainer.classList.remove('hide');
    nextQuestion();
    timer = setInterval(updateTimer, 1000);
  }


   // Function to display the next question
   function nextQuestion() {
    if (currentQIndex < questions.length) {
      displayQuestion(questions[currentQIndex]);
    } else {
      endQuiz();
    }
  }

   // Function to display a question
   function displayQuestion(question) {
    feedbackContainer.innerText = '';
    document.getElementById('question-text').innerText = question.question;

    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.innerText = option;
      button.addEventListener('click', () => checkAnswer(question, option));
      optionsContainer.appendChild(button);
    });
  }


    // Function to check the answer
    function checkAnswer(question, selectedOption) {
        const feedbackContainer = document.getElementById('feedback-container');
      
        if (selectedOption === question.correctAnswer) {
          score++;
          feedbackContainer.innerText = 'Correct!';
        } else {
          feedbackContainer.innerText = 'Wrong!';
          updateTimer(-10); // Penalty for wrong answer (adjust as needed)
        }
      
        // Show the feedback container
        feedbackContainer.classList.remove('hide');
      
        currentQIndex++;
        nextQuestion();
      }
    

        // Function to update the timer
  function updateTimer(seconds = -1) {
    const timeRemaining = parseInt(timerElement.innerText, 10);
    const newTime = Math.max(timeRemaining + seconds, 0);
    timerElement.innerText = newTime;

    if (newTime === 0) {
      endQuiz();
    }
  }

  // Function to end the quiz
  function endQuiz() {
    clearInterval(timer);
    questionContainer.classList.add('hide');
    highScoresButton.classList.remove('hide'); // Show high scores button after the quiz
    scoreContainer.classList.remove('hide');
  }

  // Function to save the score
  function saveScore() {
    const initials = initialsInput.value.trim();
    if (initials !== '') {
      // Handle localStorage operations and potential errors
      const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
      const newScore = { initials, score };
      highScores.push(newScore);
      localStorage.setItem('highScores', JSON.stringify(highScores));
      alert('High Scores:\n' + highScores.map(score => `${score.initials}: ${score.score}`).join('\n'));
    }
  }

  // Function to view high scores
  function viewHighScores() {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const highScoresMessage = highScores.length > 0 ?
      'High Scores:\n' + highScores.map(score => `${score.initials}: ${score.score}`).join('\n') :
      'No high scores yet.';
    alert(highScoresMessage);
  }
});