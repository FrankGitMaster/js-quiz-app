const appState = {
    timerIntervalId: null,
    score: 0,
    currentQuestionIndex: 0,
    userCurrentAnswer: null
}

const questions = [
    {
        question: "¿Para qué se usa 'DocumentFragment' al insertar varios elementos?",
        answers: [
            "Para evitar múltiples repintados (reflows) en el DOM",
            "Para convertir elementos HTML a formato JSON",
            "Para ocultar elementos en la pantalla",
            "Para ejecutar funciones asíncronas"
        ],
        correctAnswer: "Para evitar múltiples repintados (reflows) en el DOM"
    },
    {
        question: "¿Cuál es la ventaja de un 'getter' (get) en un objeto?",
        answers: [
            "Hacer privada una propiedad",
            "Calcular el valor dinámicamente cada vez que se lee",
            "Bloquear el valor para que sea inmutable",
            "Convertir la propiedad en un arreglo"
        ],
        correctAnswer: "Calcular el valor dinámicamente cada vez que se lee"
    },
    {
        question: "¿Qué crea 'structuredClone()' a diferencia del operador spread ([...])?",
        answers: [
            "Una copia superficial (shallow copy)",
            "Una copia profunda (deep copy)",
            "Un arreglo ordenado",
            "Un puntero al arreglo original"
        ],
        correctAnswer: "Una copia profunda (deep copy)"
    },
    {
        question: "¿Qué función detiene un ciclo creado con 'setInterval()'?",
        answers: [
            "stopInterval()",
            "clearInterval()",
            "clearTimer()",
            "cancelInterval()"
        ],
        correctAnswer: "clearInterval()"
    },
    {
        question: "¿Qué elemento referencia 'e.currentTarget' en un evento?",
        answers: [
            "El elemento que tiene asignado el listener",
            "El elemento hijo exacto donde se hizo clic",
            "El elemento padre de toda la página",
            "El objeto global window"
        ],
        correctAnswer: "El elemento que tiene asignado el listener"
    }
];

const appConfig = {
    remainingTime: 10,
    littleTime: 3,
    startBtnText: "Empezar",
    startBtnStyle: "btn-custom-gold",
    nextQuestionBtnText: "Próxima Pregunta",
    nextQuestionBtnStyle: "btn-custom-action",
    finishBtnText: "Terminar",
    finishBtnStyle: "btn-custom-finish",
    finishTitle: `¡Partida terminada!`,
    get finishMessage() {
        return `Lograste responder correctamente <br><b>${appState.score}</b> de ${questions.length} preguntas.`
    }
}

const principalContainer = document.querySelector(".principal");
const principalTitle = principalContainer.querySelector("#principal-title");
const btnStartGame = document.getElementById("star-game-btn");
btnStartGame.addEventListener("click", startGame);
btnStartGame.textContent = appConfig.startBtnText;
btnStartGame.classList.add(appConfig.startBtnStyle);
const cardTemplate = document.getElementById("card-template");
const cardClone = cardTemplate.content.cloneNode(true);
const btnAction = cardClone.getElementById("action-btn");
btnAction.textContent = appConfig.nextQuestionBtnText;
btnAction.classList.add(appConfig.nextQuestionBtnStyle);
btnAction.addEventListener("click", nextQuestion);
const timer = cardClone.getElementById("remaining-time");
const answers = cardClone.querySelector(".card-body");
const questionId = cardClone.querySelector("#question-id");
const question = cardClone.querySelector("#question");
const questionsList = shuffleQuestionsAndAnswers();

function startGame() {
    btnStartGame.remove();
    principalTitle.remove();
    principalContainer.appendChild(cardClone);
    createAnswers(questionsList, appState.currentQuestionIndex, appConfig);
    initializeTimer(questionsList, appState.currentQuestionIndex, appConfig.remainingTime);
}

/**
 * @param {Object[]} questionsList 
 * @param {appConfig} config 
*/
function createAnswers(questionsList, currentQuestionIndex, config) {
    if (currentQuestionIndex < questionsList.length) {
        const currentQuestion = questionsList[currentQuestionIndex];
        const fragment = document.createDocumentFragment();
        question.textContent = currentQuestion.question;
        questionId.textContent = `Pregunta ${currentQuestionIndex + 1} de ${questionsList.length}`;
        for (let answer of currentQuestion.answers) {
            const divAnswer = document.createElement("div");
            divAnswer.textContent = answer;
            divAnswer.classList.add("answer");
            divAnswer.addEventListener("click", (e) => {
                appState.userCurrentAnswer = e.currentTarget;
                validateUserAnswer(questionsList, appState.userCurrentAnswer, currentQuestionIndex);
            });
            fragment.appendChild(divAnswer);
        }
        answers.innerHTML = "";
        answers.appendChild(fragment);
        const isLastQuestion = currentQuestionIndex === questionsList.length - 1;
        if (isLastQuestion) {
            btnAction.textContent = config.finishBtnText;
            btnAction.classList.replace(config.nextQuestionBtnStyle, config.finishBtnStyle);
        }
        return true;
    }
    return false;
}

function initializeTimer(questionsList, currentQuestionIndex, remainingTime) {
    timer.textContent = remainingTime;
    appState.timerIntervalId = setInterval(() => {
        remainingTime--;
        timer.textContent = remainingTime;
        if (remainingTime <= appConfig.littleTime)
            timer.classList.add("little-time");
        if (remainingTime <= 0) {
            timer.classList.replace("little-time", "time-is-up");
            validateUserAnswer(questionsList, appState.userCurrentAnswer, currentQuestionIndex);
        }
    }, 1000);
}

/**
 * @param {PointerEvent} userCurrentAnswer
 * @param {string[]} answer
 */
function validateUserAnswer(questionsList, userCurrentAnswer, currentQuestionIndex) {
    clearInterval(appState.timerIntervalId);
    answers.classList.toggle("disable-pointer-events", true);
    const correctAnswer = questionsList[currentQuestionIndex].correctAnswer;
    const userAnswerIsCorrect = userCurrentAnswer && userCurrentAnswer.textContent === correctAnswer;
    if (userAnswerIsCorrect) {
        userCurrentAnswer.classList.add("correct-answer");
        appState.score++;
    }
    else {
        if (userCurrentAnswer)
            userCurrentAnswer.classList.add("incorrect-answer");
        for (const answer of answers.children) {
            if (answer.textContent === correctAnswer) {
                answer.classList.add("is-correct-answer");
                break;
            }
        };
    }
    appState.userCurrentAnswer = null;
    btnAction.disabled = false;
}

function nextQuestion() {
    appState.currentQuestionIndex++;
    const areQuestions = createAnswers(questionsList, appState.currentQuestionIndex, appConfig);
    if (areQuestions) {
        answers.classList.toggle("disable-pointer-events", false);
        btnAction.disabled = true;
        timer.classList.remove("little-time", "time-is-up");
        initializeTimer(questionsList, appState.currentQuestionIndex, appConfig.remainingTime);
    }
    else
        showTotalScore(appConfig);
}

/**
 * @param {appConfig} config
 */
function showTotalScore(config) {
    const totalScoreTemplate = document.getElementById("total-score-template");
    const totalScoreClone = totalScoreTemplate.content.cloneNode(true);
    totalScoreClone.querySelector("#finish-title").textContent = config.finishTitle;
    totalScoreClone.querySelector("#finish-message").innerHTML = config.finishMessage;
    const card = principalContainer.lastElementChild;
    card.remove();
    principalContainer.appendChild(totalScoreClone);
}

/**
 * @param {Array} array
 */
function shuffleArray(array) {
    const newArray = structuredClone(array);
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function shuffleQuestionsAndAnswers() {
    const shuffledQuestions = shuffleArray(questions);
    shuffledQuestions.forEach((question) => {
        const shuffledAnswers = shuffleArray(question.answers);
        question.answers = shuffledAnswers;
        return question;
    });
    return shuffledQuestions;
}