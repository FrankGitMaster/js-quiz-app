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
    goldBtnStyle: "btn-custom-gold",
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
btnStartGame.classList.add(appConfig.goldBtnStyle);
const questionTemplate = document.getElementById("question-template");

function createQuestionCardClone() {
    const clone = questionTemplate.content.cloneNode(true);
    const btnAction = clone.getElementById("action-btn");
btnAction.textContent = appConfig.nextQuestionBtnText;
btnAction.classList.add(appConfig.nextQuestionBtnStyle);
    const timer = clone.getElementById("remaining-time");
    const answers = clone.querySelector(".card-body");
    const questionId = clone.querySelector("#question-id");
    const question = clone.querySelector("#question");
const questionsList = shuffleQuestionsAndAnswers();
    const questionCardClone = new QuestionCardClone(clone, btnAction, timer, answers, questionId, question, questionsList);
    btnAction.addEventListener("click", function(){
        nextQuestion(questionCardClone);
    });
    return questionCardClone;
}

function startGame() {
    btnStartGame.remove();
    principalTitle.remove();
    const questionCardClone = createQuestionCardClone();
    principalContainer.appendChild(questionCardClone.clone);
    createAnswers(appState.currentQuestionIndex, appConfig, questionCardClone);
    initializeTimer(appState.currentQuestionIndex, appConfig.remainingTime, questionCardClone);
}
}

/**
 * @param {number} currentQuestionIndex 
 * @param {appConfig} config 
 * @param {QuestionCardClone} questionCardClone 
*/
function createAnswers(currentQuestionIndex, config, questionCardClone) {
    if (currentQuestionIndex < questionCardClone.questionsList.length) {
        const currentQuestion = questionCardClone.questionsList[currentQuestionIndex];
        const fragment = document.createDocumentFragment();
        questionCardClone.question.textContent = currentQuestion.question;
        questionCardClone.questionId.textContent = `Pregunta ${currentQuestionIndex + 1} de ${questionCardClone.questionsList.length}`;
        for (let answer of currentQuestion.answers) {
            const divAnswer = document.createElement("div");
            divAnswer.textContent = answer;
            divAnswer.classList.add("answer");
            divAnswer.addEventListener("click", (e) => {
                appState.userCurrentAnswer = e.currentTarget;
                validateUserAnswer(appState.userCurrentAnswer, currentQuestionIndex, questionCardClone);
            });
            fragment.appendChild(divAnswer);
        }
        questionCardClone.answers.innerHTML = "";
        questionCardClone.answers.appendChild(fragment);
        const isLastQuestion = currentQuestionIndex === questionCardClone.questionsList.length - 1;
        if (isLastQuestion) {
            questionCardClone.btnAction.textContent = config.finishBtnText;
            questionCardClone.btnAction.classList.replace(config.nextQuestionBtnStyle, config.finishBtnStyle);
        }
        return true;
    }
    return false;
}

/**
 * @param {number} currentQuestionIndex 
 * @param {number} remainingTime 
 * @param {QuestionCardClone} questionCardClone 
 */
function initializeTimer(currentQuestionIndex, remainingTime, questionCardClone) {
    questionCardClone.timer.textContent = remainingTime;
    appState.timerIntervalId = setInterval(() => {
        remainingTime--;
        questionCardClone.timer.textContent = remainingTime;
        if (remainingTime <= appConfig.littleTime)
            questionCardClone.timer.classList.add("little-time");
        if (remainingTime <= 0) {
            questionCardClone.timer.classList.replace("little-time", "time-is-up");
            validateUserAnswer(appState.userCurrentAnswer, currentQuestionIndex, questionCardClone);
        }
    }, 1000);
}

/**
 * @param {PointerEvent} userCurrentAnswer
 * @param {number} currentQuestionIndex
 * @param {QuestionCardClone} questionCardClone
 */
function validateUserAnswer(userCurrentAnswer, currentQuestionIndex, questionCardClone) {
    clearInterval(appState.timerIntervalId);
    questionCardClone.answers.classList.toggle("disable-pointer-events", true);
    const correctAnswer = questionCardClone.questionsList[currentQuestionIndex].correctAnswer;
    const userAnswerIsCorrect = userCurrentAnswer && userCurrentAnswer.textContent === correctAnswer;
    if (userAnswerIsCorrect) {
        userCurrentAnswer.classList.add("correct-answer");
        appState.score++;
    }
    else {
        if (userCurrentAnswer)
            userCurrentAnswer.classList.add("incorrect-answer");
        for (const answer of questionCardClone.answers.children) {
            if (answer.textContent === correctAnswer) {
                answer.classList.add("is-correct-answer");
                break;
            }
        };
    }
    appState.userCurrentAnswer = null;
    questionCardClone.btnAction.disabled = false;
}

/**
 * @param {QuestionCardClone} questionCardClone 
 */
function nextQuestion(questionCardClone) {
    appState.currentQuestionIndex++;
    const areQuestions = createAnswers(appState.currentQuestionIndex, appConfig, questionCardClone);
    if (areQuestions) {
        questionCardClone.answers.classList.toggle("disable-pointer-events", false);
        questionCardClone.btnAction.disabled = true;
        questionCardClone.timer.classList.remove("little-time", "time-is-up");
        initializeTimer(appState.currentQuestionIndex, appConfig.remainingTime, questionCardClone);
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
    const btnRetry = totalScoreClone.querySelector("#retry-btn");
    btnRetry.addEventListener("click", retryGame);
    btnRetry.textContent = appConfig.retryBtnText;
    btnRetry.classList.add(appConfig.goldBtnStyle);
    const questionsCard = principalContainer.querySelector(".card");
    questionsCard.remove();
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
    const shuffledQuestions = shuffleArray(structuredClone(questions));
    shuffledQuestions.forEach((question) => {
        const shuffledAnswers = shuffleArray(question.answers);
        question.answers = shuffledAnswers;
        return question;
    });
    return shuffledQuestions;
}

function QuestionCardClone(clone, btnAction, timer, answers, questionId, question, questionsList){
    this.clone = clone;
    this.btnAction = btnAction;
    this.timer = timer;
    this.answers = answers;
    this.questionId = questionId;
    this.question = question;
    this.questionsList = questionsList;
}