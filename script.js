const header = document.createElement('header');
title.classList.add('masthead');
document.body.appendChild(header)
header.innerHTML = `
<div class="logo">
        <img src="img/rexygame2.png" alt="logotipo">
    </div>
    <div class="titulo masthead-subheading">
        <h1>Quiz Game!</h1>
    </div>`;

// Obtener los datos del archivo JSON
fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    const title = document.createElement('div');
    title.classList.add('title');
    document.body.appendChild(title)
    title.innerHTML = `
    <h1>${data.title}</h1>
    <h2>${data.description}</h2>
    <h3>${data.author}</h3>`;

    const img = document.createElement('img');

    img.setAttribute("src", data.img_feature.url);
    img.setAttribute("alt", data.img_feature.alt);
    img.className = "logotipo";
    title.appendChild(img);

    questionsData = data.questions[0];
    showQuestion(currentQuestionIndex);
  })
  .catch(err => console.error('Error fetching data:', err));


let currentQuestionIndex = 0;
let questionsData = [];
let correctAnswersCount = 0;

function createRadioInputs(questionData, articleElement) {
  const answers = questionData.answers;
  const imgQuestion = questionData.img_question;

  const questionImage = document.createElement('img');
  questionImage.src = imgQuestion.url;
  questionImage.alt = imgQuestion.alt;
  questionImage.classList.add('question-image');
  articleElement.appendChild(questionImage);

  const questionDesc = document.createElement('p');
  questionDesc.textContent = imgQuestion.desc;
  articleElement.appendChild(questionDesc);

  for (const option in answers) {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = `question_${questionData.id}`;
    input.value = option;
    label.textContent = answers[option];
    label.appendChild(input);
    articleElement.appendChild(label);
  }
  articleElement.classList.add('question-pane');
}

function showQuestion(index) {
  const questions = questionsData[index];
  const section = document.createElement('section');
  section.innerHTML = ''; // Clear previous content if needed
  document.body.appendChild(section);
  
  const articleElement = document.createElement('article');
  const questionTitle = document.createElement('h3');
  questionTitle.textContent = questions.question;
  articleElement.appendChild(questionTitle);

  createRadioInputs(questions, articleElement);

  section.appendChild(articleElement);

  const buttonElement = document.createElement('button');
  const textButton = document.createTextNode('Siguiente');
  buttonElement.appendChild(textButton);
  buttonElement.classList.add('form-buttons');
  buttonElement.id = 'botonSig';
  buttonElement.setAttribute('type', 'button'); // '
  section.appendChild(buttonElement);
  
  // Habilitar el botón "Siguiente"
  buttonElement.disabled = false;

  // Agregar el evento click después de crear el botón
  document.getElementById('botonSig').addEventListener('click', function() {
    const selectedAnswer = document.querySelector(`input[name="question_${questionsData[currentQuestionIndex].id}"]:checked`);
    if (selectedAnswer) {
      validateAnswer(currentQuestionIndex, selectedAnswer.value);
    } else {
      alert('Por favor, selecciona una respuesta.');
    }
  });
}

function validateAnswer(questionIndex, selectedAnswer) {
  const question = questionsData[questionIndex];
  const correctAnswer = Object.keys(question.results).find(key => question.results[key]);

  const radioInputs = document.querySelectorAll(`input[name="question_${question.id}"]`);

  radioInputs.forEach(input => {
    if (input.value === correctAnswer) {
      input.parentElement.style.backgroundColor = 'green'; // Colorear la respuesta correcta de verde
      if (selectedAnswer === correctAnswer) {
        correctAnswersCount++; // Incrementar el contador de respuestas correctas
      }
    } else if (input.value === selectedAnswer) {
      input.parentElement.style.backgroundColor = 'red'; // Colorear la respuesta seleccionada incorrecta de rojo
    }
    input.disabled = true; // Deshabilitar las opciones después de seleccionar una respuesta
  });

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questionsData.length) {
      showQuestion(currentQuestionIndex);
    } else {
      showResult(correctAnswersCount); // Mostrar el resultado al final del quiz
    }
  }, 2000); // Esperar 2 segundos antes de pasar a la siguiente pregunta
}

function showResult(correctCount) {
  const resultMessage = `Respuestas correctas: ${correctCount} de ${questionsData.length}`;
  const resultWindow = window.open('', 'Result Popup', 'width=400,height=200');
  resultWindow.document.write(`
    <html>
      <head>
        <title>Resultado del Quiz</title>
      </head>
      <body>
        <h2>¡Fin del juego!</h2>
        <p>${resultMessage}</p>
        <button onclick="window.close()">Cerrar</button>
      </body>
    </html>
  `);
}
