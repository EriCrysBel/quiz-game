function createRadioInputs(questionData, articleElement, index) { 
  const answers = questionData.answers;
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
  articleElement.classList.add('tab-pane'); // Agregar clase 'tab-pane'
  articleElement.id = `tab-pane-${index}`; // Agregar ID con número de elemento
}

// Obtener los datos del archivo JSON
fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    const title = document.getElementById('title');
    title.innerHTML = `<h1>${data.title}</h1><h2>${data.description}</h2><h3>${data.author}</h3>`;

    const img = document.createElement('img');
    img.setAttribute("src", "./img/aranjuez1.jpg");
    title.appendChild(img);

    const questions = data.questions[0];
    questions.forEach((question, index) => {
      const section = document.getElementById('section');
      const articleElement = document.createElement('article');
      const questionTitle = document.createElement('h3');
      questionTitle.textContent = question.question;
      articleElement.appendChild(questionTitle);

      createRadioInputs(question, articleElement, index); // Pasar el índice como argumento

      section.appendChild(articleElement);
    });

    // Código para cambiar entre pestañas
    const tabLinks= document.querySelectorAll('.tab-link');
    const tabPanes= document.querySelectorAll('.tab-pane');

    tabLinks.forEach(
      function(link,index){
        link.addEventListener('click',function(){
          tabPanes.forEach(function(pane,indice){
            pane.style.display='none';
          });
          tabPanes[index].style.display='block';
        })    
      }
    );

  })
  .catch(err => console.error('Error fetching data:', err));

$('.message a').click(function(){
  $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});
