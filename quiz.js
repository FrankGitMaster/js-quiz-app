const appState = {
    timerIntervalId: null,
    score: 0,
    currentQuestionIndex: 0,
    userCurrentAnswer: null
}

const questions = [
    {
        question: "¿Cuál es el objeto principal de la Ley 594 de 2000 (Ley General de Archivos en Colombia)?",
        answers: [
            "Establecer las reglas y principios generales que regulan la función archivística del Estado",
            "Reglamentar únicamente el uso de firma digital en documentos privados",
            "Definir las tarifas de cobro para empresas de mensajería y transportadoras",
            "Sancionar penalmente la pérdida de documentos contables"
        ],
        correctAnswer: "Establecer las reglas y principios generales que regulan la función archivística del Estado"
    },
    {
        question: "¿Qué aspectos regula principalmente el Acuerdo 060 de 2001 del Archivo General de la Nación (AGN)?",
        answers: [
            "Las pautas para la administración de las comunicaciones oficiales en entidades públicas y privadas que cumplen funciones públicas",
            "La tabla de retención para empresas puramente privadas sin relación estatal",
            "Las licencias de software para digitalización de documentos",
            "El reglamento de contratación de personal en BPO"
        ],
        correctAnswer: "Las pautas para la administración de las comunicaciones oficiales en entidades públicas y privadas que cumplen funciones públicas"
    },
    {
        question: "¿Qué es una Tabla de Retención Documental (TRD)?",
        answers: [
            "Un inventario de libros contables de una empresa",
            "Un listado de series y subseries documentales con sus correspondientes tiempos de permanencia en cada fase del archivo",
            "Un software exclusivo para escanear documentos a alta velocidad",
            "Un contrato de confidencialidad para personal de archivo"
        ],
        correctAnswer: "Un listado de series y subseries documentales con sus correspondientes tiempos de permanencia en cada fase del archivo"
    },
    {
        question: "¿En qué consiste el proceso de expurgo en la gestión documental?",
        answers: [
            "En la eliminación física o digital controlada de documentos que perdieron su valor legal o administrativo y no tienen valor histórico",
            "En encarpetar y rotular documentos recién recibidos en ventanilla",
            "En digitalizar documentos a color en alta resolución",
            "En transferir documentos del archivo de gestión al archivo histórico directamente"
        ],
        correctAnswer: "En la eliminación física o digital controlada de documentos que perdieron su valor legal o administrativo y no tienen valor histórico"
    },
    {
        question: "¿Qué es la indexación de metadatos?",
        answers: [
            "El proceso de coser y encuadernar expedientes antiguos",
            "La asignación de datos descriptivos (clave/valor) a un archivo digital para facilitar su búsqueda, control y trazabilidad",
            "La destrucción acelerada de carpetas en mal estado",
            "La conversión de un archivo PDF a formato Word editables"
        ],
        correctAnswer: "La asignación de datos descriptivos (clave/valor) a un archivo digital para facilitar su búsqueda, control y trazabilidad"
    },
    {
        question: "¿Qué significan las siglas OCR en el ámbito de la captura de información?",
        answers: [
            "Organización Central de Archivos Relevantes",
            "Optical Character Recognition (Reconocimiento Óptico de Caracteres)",
            "Operación Centralizada de Registros Rápidos",
            "Order Control and Retention System"
        ],
        correctAnswer: "Optical Character Recognition (Reconocimiento Óptico de Caracteres)"
    },
    {
        question: "En operaciones de BPO documental, ¿qué mide un Acuerdo de Nivel de Servicio (SLA)?",
        answers: [
            "El costo total de los escáneres comprados",
            "Los compromisos de tiempo, volumen y calidad acordados entre el proveedor del servicio y el cliente",
            "La cantidad de folios que caben dentro de una caja de archivo",
            "El salario base de los digitalizadores"
        ],
        correctAnswer: "Los compromisos de tiempo, volumen y calidad acordados entre el proveedor del servicio y el cliente"
    },
    {
        question: "Según el ciclo vital de los documentos (Ley 594 de 2000), ¿cuáles son las tres fases del archivo?",
        answers: [
            "Archivo de Gestión, Archivo Central y Archivo Histórico",
            "Archivo Inicial, Archivo Intermedio y Archivo Final",
            "Archivo Físico, Archivo Digital y Archivo Cloud",
            "Archivo Activo, Archivo Pasivo y Archivo Muerto"
        ],
        correctAnswer: "Archivo de Gestión, Archivo Central y Archivo Histórico"
    },
    {
        question: "¿Cuál es el objetivo principal del protocolo de cadena de custodia en la recepción de tulas selladas?",
        answers: [
            "Garantizar la integridad, inalterabilidad e inviolabilidad de los documentos desde su despacho hasta su procesamiento",
            "Acelerar el proceso de pegado de etiquetas",
            "Evitar pagar el servicio de la empresa de transporte",
            "Reducir el peso físico de las cajas"
        ],
        correctAnswer: "Garantizar la integridad, inalterabilidad e inviolabilidad de los documentos desde su despacho hasta su procesamiento"
    },
    {
        question: "Según el Acuerdo 060 de 2001, ¿qué es la radicación de comunicaciones oficiales?",
        answers: [
            "El procedimiento de asignar un número consecutivo a las comunicaciones recibidas o enviadas, dejando constancia de fecha y hora",
            "El envío de correos masivos a clientes potenciales",
            "El archivo definitivo de carpetas en el archivo central",
            "La trituración de papel de copia sobrante"
        ],
        correctAnswer: "El procedimiento de asignar un número consecutivo a las comunicaciones recibidas o enviadas, dejando constancia de fecha y hora"
    },
    {
        question: "¿Cuál es la diferencia principal entre una TRD y una TVD (Tabla de Valoración Documental)?",
        answers: [
            "La TRD se aplica a documentos en producción/actuales; la TVD se aplica a fondos acumulados",
            "La TRD es para archivos digitales y la TVD es exclusiva para archivos físicos",
            "La TRD la aprueba el Archivo General y la TVD la aprueba la DIAN",
            "No hay diferencia, son exactamente el mismo instrumento"
        ],
        correctAnswer: "La TRD se aplica a documentos en producción/actuales; la TVD se aplica a fondos acumulados"
    },
    {
        question: "En la jerarquía de clasificación documental, ¿cuál es el orden correcto de mayor a menor nivel?",
        answers: [
            "Fondo > Sección > Subsección > Serie > Subserie > Tipo Documental",
            "Serie > Subserie > Fondo > Sección > Tipo Documental",
            "Tipo Documental > Subserie > Serie > Sección > Fondo",
            "Sección > Fondo > Serie > Tipo Documental > Subserie"
        ],
        correctAnswer: "Fondo > Sección > Subsección > Serie > Subserie > Tipo Documental"
    },
    {
        question: "¿Qué es un 'fondo acumulado' en el contexto archivístico?",
        answers: [
            "Un conjunto de documentos reunidos por una entidad sin criterios archivísticos previos ni control de retención",
            "Un presupuesto guardado para comprar insumos de archivo",
            "Un repositorio digital con copia de seguridad en la nube",
            "Una colección de periódicos y revistas antiguas"
        ],
        correctAnswer: "Un conjunto de documentos reunidos por una entidad sin criterios archivísticos previos ni control de retención"
    },
    {
        question: "¿Qué significan las siglas SGDEA en el contexto del archivo digital?",
        answers: [
            "Sistema de Gestión de Documentos Electrónicos de Archivo",
            "Software General de Digitalización Escaneada y Almacenamiento",
            "Servicio Global de Custodia y Entrega de Archivos",
            "Sistema Guardián de Expedientes Automatizados"
        ],
        correctAnswer: "Sistema de Gestión de Documentos Electrónicos de Archivo"
    },
    {
        question: "¿Cuál es la diferencia técnica entre el reconocimiento OCR y el ICR?",
        answers: [
            "OCR reconoce texto impreso de máquina; ICR reconoce texto manuscrito (letra a mano)",
            "OCR funciona solo en PDF; ICR funciona solo en imágenes JPEG",
            "OCR es para archivos en blanco y negro; ICR es para color",
            "OCR requiere internet; ICR funciona offline"
        ],
        correctAnswer: "OCR reconoce texto impreso de máquina; ICR reconoce texto manuscrito (letra a mano)"
    },
    {
        question: "Durante la etapa de alistamiento físico para digitalización, ¿cuál de las siguientes acciones NO se debe realizar?",
        answers: [
            "Aplicar cinta pegante sobre sellos o firmas originales ocultando información",
            "Retirar ganchos cosedores, clips y sujetadores metálicos",
            "Desdoblar folios y reparar rasgaduras con cinta transparente mágica",
            "Identificar y depurar hojas en blanco o duplicados no requeridos"
        ],
        correctAnswer: "Aplicar cinta pegante sobre sellos o firmas originales ocultando información"
    },
    {
        question: "¿Qué documento legal e institucional avala la eliminación formal de documentos por expurgo?",
        answers: [
            "El Acta de Eliminación respaldada por el Comité Interno de Archivo",
            "La factura de venta del papel reciclado",
            "Un correo electrónico del jefe de sistemas",
            "La orden de servicio de la transportadora"
        ],
        correctAnswer: "El Acta de Eliminación respaldada por el Comité Interno de Archivo"
    },
    {
        question: "¿Qué instrumento archivístico permite la identificación y codificación de la estructura orgánica de la entidad?",
        answers: [
            "Cuadro de Clasificación Documental (CCD)",
            "Formato Único de Inventario Documental (FUID)",
            "Plan de Captura de Datos",
            "Manual de Procedimientos de BPO"
        ],
        correctAnswer: "Cuadro de Clasificación Documental (CCD)"
    },
    {
        question: "En la captura de información, ¿qué es la 'validación por doble digitación'?",
        answers: [
            "Un método de control de calidad donde dos digitadores ingresan el mismo dato para verificar que coincidan",
            "Escribir dos veces el mismo texto en un archivo de Word",
            "Copiar y pegar un campo usando atajos de teclado",
            "Utilizar dos teclados conectados al mismo computador"
        ],
        correctAnswer: "Un método de control de calidad donde dos digitadores ingresan el mismo dato para verificar que coincidan"
    },
    {
        question: "¿Qué es el FUID en la normativa archivística colombiana?",
        answers: [
            "Formato Único de Inventario Documental",
            "Fondo Unificado de Impresiones Digitales",
            "Fórmula Universal de Indexación de Datos",
            "Fichero Único de Inspección y Documentación"
        ],
        correctAnswer: "Formato Único de Inventario Documental"
    },
    {
        question: "¿Cuál es la función principal de la 'hoja de control' en un expediente físico?",
        answers: [
            "Registrar el inventario analítico y el orden de los tipos documentales contenidos en el expediente",
            "Servir como portada decorativa de la carpeta",
            "Anotar el precio de venta del expediente",
            "Separar las fotocopias de los documentos originales"
        ],
        correctAnswer: "Registrar el inventario analítico y el orden de los tipos documentales contenidos en el expediente"
    },
    {
        question: "¿Cómo se debe realizar la foliación correcta de un expediente físico?",
        answers: [
            "En la esquina superior derecha del recto del folio, de manera consecutiva a lápiz mina negra suave",
            "En el centro inferior a esfero rojo",
            "Numerando únicamente las hojas que tengan sellos originales",
            "Foliando tanto la cara frontal como el reverso de cada hoja"
        ],
        correctAnswer: "En la esquina superior derecha del recto del folio, de manera consecutiva a lápiz mina negra suave"
    },
    {
        question: "¿Qué tipo de escáner es el indicado para procesar miles de historias clínicas o créditos en un proyecto BPO?",
        answers: [
            "Escáner de alta producción con alimentador automático (ADF) y cama plana",
            "Escáner portátil manual a baterías",
            "Cámara fotográfica de celular de gama media",
            "Fotocopiadora doméstica multifuncional de inyección de tinta"
        ],
        correctAnswer: "Escáner de alta producción con alimentador automático (ADF) y cama plana"
    },
    {
        question: "Según el Acuerdo 060 del AGN, ¿cuál es el plazo para dar respuesta a peticiones de información legal?",
        answers: [
            "Los términos fijados por la Ley (Código de Procedimiento Administrativo y de lo Contencioso Administrativo)",
            "Máximo 24 horas laborables en todos los casos",
            "Sin límite de tiempo mientras esté en archivo central",
            "30 días hábiles obligatorios sin excepción"
        ],
        correctAnswer: "Los términos fijados por la Ley (Código de Procedimiento Administrativo y de lo Contencioso Administrativo)"
    },
    {
        question: "En gestión documental, ¿qué se entiende por 'valor primario' de los documentos?",
        answers: [
            "El valor administrativo, legal, fiscal, contable o técnico que tienen los documentos mientras están en gestión o central",
            "El precio en dinero del papel reciclado",
            "El valor histórico y cultural que adquiere el documento después de 50 años",
            "El costo cobrado al usuario por expedir una copia certificada"
        ],
        correctAnswer: "El valor administrativo, legal, fiscal, contable o técnico que tienen los documentos mientras están en gestión o central"
    },
    {
        question: "¿Qué se entiende por 'valor secundario' de los documentos?",
        answers: [
            "El valor testimonial, histórico y patrimonial que justifica su conservación permanente en el archivo histórico",
            "El valor del documento cuando es una fotocopia y no el original",
            "El costo comercial que cobra la bodega de almacenamiento",
            "La validez del documento durante sus primeros 6 meses de expedición"
        ],
        correctAnswer: "El valor testimonial, histórico y patrimonial que justifica su conservación permanente en el archivo histórico"
    },
    {
        question: "¿Qué es el PGD (Programa de Gestión Documental)?",
        answers: [
            "Un plan estratégico institucional para planificar, procesar y conservar la documentación desde su producción hasta su disposición final",
            "Un programa de computadora ejecutable (.exe) para escanear",
            "Un curso de capacitación presencial dictado por el SENA",
            "El manual de usuario de las impresoras de la oficina"
        ],
        correctAnswer: "Un plan estratégico institucional para planificar, procesar y conservar la documentación desde su producción hasta su disposición final"
    },
    {
        question: "En un proceso BPO de salud (cuentas médicas), ¿por qué es crítico el control de calidad en la indexación?",
        answers: [
            "Para evitar errores en la liquidación, auditoría médica y cobro de facturas entre prestadores y EPS",
            "Porque el escáner se bloquea si un metadato no tiene tilde",
            "Para cambiar el nombre del paciente si está mal escrito en la cédula",
            "Únicamente para cumplir con la estética del diseño del software"
        ],
        correctAnswer: "Para evitar errores en la liquidación, auditoría médica y cobro de facturas entre prestadores y EPS"
    },
    {
        question: "En el control de humedad y temperatura de una bodega de archivo central, ¿cuáles son los parámetros generales de conservación preventiva?",
        answers: [
            "Temperatura aproximada entre 15°C - 20°C y humedad relativa entre 45% y 60%",
            "Temperatura superior a 35°C e iluminación solar directa permanente",
            "Humedad del 90% para evitar que el papel se ponga quebradizo",
            "Congelación a 0°C para eliminar insectos y hongos"
        ],
        correctAnswer: "Temperatura aproximada entre 15°C - 20°C y humedad relativa entre 45% y 60%"
    },
    {
        question: "En el contexto de la Ley 594 de 2000, ¿qué es la 'técnica archivística'?",
        answers: [
            "El conjunto de métodos, principios y procedimientos prácticos aplicados a la gestión de los documentos de un archivo",
            "La habilidad para reparar escáneres de producción averiados",
            "El uso exclusivo de inteligencia artificial para redactar cartas",
            "El arte de encuadernar libros antiguos con pasta dura y cuero"
        ],
        correctAnswer: "El conjunto de métodos, principios y procedimientos prácticos aplicados a la gestión de los documentos de un archivo"
    }
];

const appConfig = {
    remainingTime: 15,
    littleTime: 5,
    startBtnText: "Empezar",
    retryBtnText: "Reintentar",
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

function retryGame() {
    initializeAppState(appState);
    const totalScoreCard = principalContainer.querySelector(".card");
    totalScoreCard.remove();
    const questionCardClone = createQuestionCardClone();
    principalContainer.appendChild(questionCardClone.clone);
    createAnswers(appState.currentQuestionIndex, appConfig, questionCardClone);
    initializeTimer(appState.currentQuestionIndex, appConfig.remainingTime, questionCardClone);
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
 * @param {appState} appState 
 */
function initializeAppState(appState){
    appState.timerIntervalId = null;
    appState.score = 0;
    appState.currentQuestionIndex = 0;
    appState.userCurrentAnswer = null;
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