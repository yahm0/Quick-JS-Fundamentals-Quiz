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
  