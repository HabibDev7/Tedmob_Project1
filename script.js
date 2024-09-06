let currentQuestionIndex = 1;
let score = 0;
let currentQuizCategory = '';

function checkAnswer(selectedAnswer) {
    let correctAnswer;

    console.log(`Selected answer: ${selectedAnswer}`);

    switch (currentQuizCategory) {
        case 'general-knowledge':
            correctAnswer = getGeneralKnowledgeAnswer(currentQuestionIndex);
            break;
        case 'cars':
            correctAnswer = getCarAnswer(currentQuestionIndex);
            break;
        case 'movies':
            correctAnswer = getMovieAnswer(currentQuestionIndex);
            break;
        case 'video-games':
            correctAnswer = getVideoGameAnswer(currentQuestionIndex);
            break;
    }

    console.log(`Correct answer: ${correctAnswer}`);

    if (selectedAnswer === correctAnswer) {
        showCorrectAnswer();
    } else {
        showWrongAnswer();
    }
}

function showCorrectAnswer() {
    console.log('Showing correct answer');
    console.log(`Current score before increment: ${score}`);
    score++;
    console.log(`Score after increment: ${score}`);
    hideCurrentQuestion();
    showMessage('.answer-correct');
}

function showWrongAnswer() {
    console.log('Showing wrong answer');
    hideCurrentQuestion();
    showMessage('.answer-wrong');
}

function hideCurrentQuestion() {
    const questionElement = document.querySelector(`#quiz-${currentQuizCategory} #question${currentQuestionIndex}`);
    if (questionElement) {
        questionElement.style.display = 'none';
    }
}

function showMessage(selector) {
    console.log(`Showing message: ${selector}`);
    const messageElement = document.querySelector(selector);
    if (messageElement) {
        messageElement.style.display = 'block';
    } else {
        console.error(`Message element not found: ${selector}`);
    }
}

function nextQuestion() {
    console.log('Moving to next question');
    currentQuestionIndex++;
    hideAllQuestions();
    hideMessages();

    if (currentQuestionIndex > 10) {
        showScore();
    } else {
        showQuestion(currentQuestionIndex);
    }
}

function hideAllQuestions() {
    document.querySelectorAll(`#quiz-${currentQuizCategory} .question`).forEach(question => {
        question.style.display = 'none';
    });
}

function hideMessages() {
    document.querySelector('.answer-correct').style.display = 'none';
    document.querySelector('.answer-wrong').style.display = 'none';
}

function showQuestion(index) {
    const questionElement = document.querySelector(`#quiz-${currentQuizCategory} #question${index}`);
    if (questionElement) {
        questionElement.style.display = 'block';
    } else {
        console.error(`Question element not found: #question${index}`);
    }
}

function showScore() {
    console.log('Showing score');
    document.querySelector(`#quiz-${currentQuizCategory}`).style.display = 'none';

    const scoreElement = document.querySelector('.score');
    const scoreSpan = document.getElementById('score');

    if (scoreElement && scoreSpan) {
        scoreSpan.textContent = score;
        scoreElement.style.display = 'block';
        showBackToMenuButton();
    } else {
        console.error('Score element or score span not found');
    }
}

function retryQuiz() {
    currentQuestionIndex = 1;
    score = 0;
    hideAllQuestions();
    hideMessages();
    showQuestion(1);
    document.querySelector(`#quiz-${currentQuizCategory}`).style.display = 'block';
    document.querySelector('.score').style.display = 'none';
    hideBackToMenuButton();
}

function startQuiz(category) {
    console.log(`Starting quiz: ${category}`);
    document.querySelectorAll('.quiz-container').forEach(el => el.style.display = 'none');
    currentQuizCategory = category;
    currentQuestionIndex = 1;
    document.getElementById('category-list').style.display = 'none';
    document.getElementById('Quiz-cat-title').style.display = 'none';

    document.getElementById(`quiz-${currentQuizCategory}`).style.display = 'block';

    showQuestion(1);
    hideBackToMenuButton();
}
function showError(message) {
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = message;
    errorMessageElement.style.display = 'block';
}

function showCategories() {
    const name = document.getElementById('name').value;
    const age = parseInt(document.getElementById('age').value);

    if (name === '' || isNaN(age)) {
        showError('Please enter both your name and age.');
        return;
    }

    document.getElementById('user-input').style.display = 'none';
    document.querySelector('.Welcome-message').style.display = 'none';
    document.getElementById('quiz-categories').style.display = 'block';
    populateCategories(age);
}

function populateCategories(age) {
    const categoryList = document.getElementById('category-list');
    categoryList.innerHTML = '';

    if (age > 16) {
        categoryList.innerHTML += '<div class="category" onclick="startQuiz(\'general-knowledge\')">General Knowledge</div>';
        categoryList.innerHTML += '<div class="category" onclick="startQuiz(\'cars\')">Cars</div>';
    } else {
        categoryList.innerHTML += '<div class="category" onclick="startQuiz(\'movies\')">Movies</div>';
        categoryList.innerHTML += '<div class="category" onclick="startQuiz(\'video-games\')">Video Games</div>';
    }
}

document.getElementById('enter-button').addEventListener('click', showCategories);
document.getElementById('enter-button').addEventListener('click', () => {
    document.querySelector('.Welcome-message').style.display = 'none';
});

function showBackToMenuButton() {
    document.getElementById('back-to-menu').style.display = 'block';
}

function hideBackToMenuButton() {
    document.getElementById('back-to-menu').style.display = 'none';
}

function goToMenu() {
    document.querySelectorAll('.quiz-container').forEach(el => el.style.display = 'none');
    document.querySelector('.score').style.display = 'none';

    document.getElementById('user-input').style.display = 'block';
    document.querySelector('.Welcome-message').style.display = 'block';
    document.getElementById('quiz-categories').style.display = 'none';
    document.getElementById('category-list').style.display = 'block';

    document.getElementById('name').value = '';
    document.getElementById('age').value = '';
    score = 0;
}

function goToCategory() {
    document.querySelectorAll('.quiz-container').forEach(el => el.style.display = 'none');
    document.querySelector('.score').style.display = 'none';

    document.getElementById('quiz-categories').style.display = 'block';
    document.getElementById('category-list').style.display = 'block';
    document.getElementById('Quiz-cat-title').style.display = 'block';
    score = 0;
}

function getCarAnswer(index) {
    const answers = ['BMW', 'Mercedes', 'Peugeot', 'Mclaren', 'Aston Martin', 'G Wagon', 'Nissan', 'Fiat', 'Infinity', 'VolksWagen'];
    return answers[index - 1];
}

function getGeneralKnowledgeAnswer(index) {
    const answers = ['Paris', 'Mars', 'Harper Lee', 'Pacific Ocean', 'Oxygen', '2', 'Africa', '0', 'Leonardo da Vinci', '1912'];
    console.log(`General Knowledge Answer for question ${index}: ${answers[index - 1]}`);
    return answers[index - 1];
}

function getMovieAnswer(index) {
    const answers = ['Pirates of the Caribbean', 'James Cameron', 'Casablanca', 'Avengers: Endgame', 'Forrest Gump', 'Leonardo DiCaprio', 'Titanic', 'Leonardo DiCaprio', 'The Matrix', 'Steven Spielberg'];
    return answers[index - 1];
}
function getVideoGameAnswer(index) {
    const answers = ['Link', 'Nintendo', 'Halo', 'God of War', 'The Legend of Zelda', 'Survival and Creativity', 'Pac-Man', 'Life Simulation', 'Tomb Raider', 'MMORPG'];
    return answers[index - 1];
}