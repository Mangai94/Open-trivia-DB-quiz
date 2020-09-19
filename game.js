
(function()
{ var currentQuestionIndex = 0;
var questions;
var container = document.createElement('div');
container.setAttribute('class', 'container');
container.style.width = '800px';
container.style.height = '400px';
container.style.marginLeft = 'auto';
container.style.marginRight = 'auto';
container.style.border = '1px solid black';
container.style.marginTop = '50px';


document.body.appendChild(container);

var questionHeader = document.createElement('div');
questionHeader.style.width = '90%';
questionHeader.style.height = '40px';
questionHeader.style.display = 'flex';
questionHeader.style.justifyContent = 'right';
questionHeader.style.alignItems = 'right';

var scoreDiv = document.createElement('div');
scoreDiv.style.width = '50%';
scoreDiv.style.height = '40px';
scoreDiv.style.textAlign = 'right';
scoreDiv.style.fontWeight = '700';
scoreDiv.style.fontSize = '20px';
scoreDiv.innerText = 'Score : ';

var label = document.createElement('label');
label.setAttribute('id', 'scorelabel')
label.innerText = 0;
scoreDiv.append(label);

var progressDiv = document.createElement('div');
progressDiv.style.width = '50%';
progressDiv.style.height = '40px';

questionHeader.append(progressDiv, scoreDiv);

container.appendChild(questionHeader);

var questionDiv = document.createElement('div');
questionDiv.style.width = '90%';
questionDiv.style.marginLeft = 'auto';
questionDiv.style.marginRight = 'auto';
questionDiv.style.textAlign = 'left';
questionDiv.style.marginBottom = '20px';

container.appendChild(questionDiv);

var ansDiv = document.createElement('div');
ansDiv.style.width = '90%';
ansDiv.style.marginLeft = 'auto';
ansDiv.style.marginRight = 'auto';
ansDiv.style.textAlign = 'left';
ansDiv.style.marginBottom = '20px';

container.appendChild(ansDiv);

getQuestions();

async function getQuestions()
{
    var questionResponse = await fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=hard&type=multiple');
    var finalJson  = await questionResponse.json();
     questions = finalJson.results;
     console.log(questions);
    localStorage.clear();
    displayQuestionAndOptions(questions[0]);
    var buttonContainer = document.createElement('div');
    buttonContainer.style.width = '90%';
    buttonContainer.style.marginLeft = 'auto';
    buttonContainer.style.marginRight = 'auto';
    buttonContainer.style.textAlign = 'right';
    
    buttonContainer.appendChild(createButton('Prev', 'prev'));
    buttonContainer.appendChild(createButton('Next', 'next'));
    container.appendChild(buttonContainer);
    var finishButton = document.createElement('div');
    finishButton.style.width = '90%';
    finishButton.style.textAlign ='right';
    finishButton.style.marginLeft = 'auto';
    finishButton.style.marginRight = 'auto';
    finishButton.style.marginTop = '20px';
    finishButton.appendChild(createButton('Finish Quiz'));
    container.appendChild(finishButton);
}



function displayQuestionAndOptions(record)
{
    questionDiv.innerText = record.question;
    ansDiv.setAttribute('id', questionDiv.innerText);

    var questionAlreadyAns = localStorage.getItem(record.question);
    let isChosen = false;
    let color
    if(questionAlreadyAns != undefined)
    {
        if(questionAlreadyAns == record.correct_answer)
            color = 'green';
        else
            color = 'red';
    }

    var optionsArray = [];
    optionsArray = record.incorrect_answers.slice(0);
    optionsArray.push(record.correct_answer);
    shuffleArray(optionsArray);
    ansDiv.innerHTML = '';
    for(var option of optionsArray)
    {
        if(option == questionAlreadyAns)
        isChosen = true;
        else
        isChosen = false;
        ansDiv.appendChild(createAnsDiv(option, record,isChosen,color));
    }
}

function shuffleArray(array)
{
    for(var i = array.length-1 ; i > 0; i--)
    {
        var j = Math.floor(Math.random() * (i+1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function createButton(text, id)
{
    var element = document.createElement('button');
    element.innerText = text;
    element.setAttribute('class', 'btn btn-primary');
    element.setAttribute('id', id);
    element.style.textAlign ='right';
    element.style.marginRight ='10px';
    element.style.cursor ='pointer';

    if(element.innerText == 'Next')
    {
        element.addEventListener('click', function()
        {
            document.getElementById('prev').disabled = false;
            if(currentQuestionIndex >= 0 && currentQuestionIndex < 9)
            {
                currentQuestionIndex = currentQuestionIndex+1; 
                displayQuestionAndOptions(questions[currentQuestionIndex]);
            }
            else
            {
                displayQuestionAndOptions(questions[currentQuestionIndex]);
                this.disabled = true;
            }
        })
    }
    else if(element.innerText == 'Prev')
    {
        element.disabled = true;
        element.addEventListener('click', function()
        {
            document.getElementById('next').disabled = false;
            if(currentQuestionIndex > 0 && currentQuestionIndex <= 9)
            {
                currentQuestionIndex = currentQuestionIndex - 1;
                displayQuestionAndOptions(questions[currentQuestionIndex]);
                console.log(currentQuestionIndex);
            }
            else
            {
                displayQuestionAndOptions(questions[currentQuestionIndex]);
                this.disabled = true;
            }
        })
    }

    else if(element.innerText == 'Finish Quiz')
    {
        element.addEventListener('click', function()
        {
            if(currentQuestionIndex >= 9)
            {
                localStorage.setItem('score', document.getElementById('scorelabel').innerText);
                window.location.href = '/end.html'
            }
            else
            {
                if(confirm('Are you sure want to end?'))
                {
                    localStorage.setItem('score', document.getElementById('scorelabel').innerText);
                    window.location.href = '/end.html';
                } 
            }
        })
    }

    return element;
}

function createAnsDiv(text, question, ischosen, color)
{
    var element = document.createElement('div');
    element.setAttribute('class', 'choice-text');
    element.setAttribute('class', 'card');
    element.setAttribute('name', text);
    element.innerText = text;
    element.style.marginLeft ='auto';
    element.style.marginRight ='auto';
    element.style.textAlign ='left';
    element.style.width ='90%';
    element.style.cursor ='pointer';
    element.style.marginBottom ='10px';
    element.style.padding ='5px';
    if(ischosen)
        element.style.backgroundColor = color;

    element.addEventListener('click', function()
    {
        if(this.innerText == question.correct_answer)
        {
            clearOtherAns(question.question);
            element.style.backgroundColor = 'green';
            element.style.color = 'white';
            document.getElementById('scorelabel').innerText = +document.getElementById('scorelabel').innerText+ 10;
            //disableAns(question.question);
        }
        else
        {
            clearOtherAns(question.question);
            element.style.backgroundColor = 'red';
            element.style.color = 'white';
            var correctelement = document.getElementsByName(question.correct_answer)[0];
            correctelement.style.backgroundColor = 'green';
            correctelement.style.color = 'white';
            //disableAns(question.question);
        }

        localStorage.setItem(question.question, this.innerText);
    })
    return element;
}

function disableAns(question)
{
    // var anselements = document.getElementById(question).children;
    // for(var element of anselements)
    //     element.disabled = true;
}


function clearOtherAns(question)
{
    var anselements = document.getElementById(question).children;
    for(var element of anselements)
    {
        element.style.backgroundColor = 'white';
        element.style.color = 'black';
    }
}})()

