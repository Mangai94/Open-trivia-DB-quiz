var highScoresArray = [];
var container = document.createElement('div');
container.setAttribute('class', 'container');
container.style.width = '800px';
container.style.height = '400px';
container.style.marginLeft = 'auto';
container.style.marginRight = 'auto';
container.style.border = '1px solid black';
container.style.marginTop = '50px';
container.style.display = 'flex';
container.style.flexDirection = 'column';
container.style.justifyContent = 'center';
container.style.alignItems = 'center';

document.body.appendChild(container);

var scoreDiv = document.createElement('div');
scoreDiv.innerText = 'Score :'
scoreDiv.style.height = '30px';
scoreDiv.style.width = '90%';
scoreDiv.style.marginLeft = 'auto';
scoreDiv.style.marginRight = 'auto';
scoreDiv.style.textAlign = 'center';
scoreDiv.style.fontWeight = '700';
scoreDiv.style.fontSize = '30px';
scoreDiv.style.marginBottom = '20px';

container.appendChild(scoreDiv);
var scoreValue = document.createElement('span');
scoreValue.setAttribute('id', 'scoreValue')
scoreValue.innerText = localStorage.getItem('score');
scoreValue.style.height = '30px';
scoreValue.style.textAlign = 'center';
scoreValue.style.fontWeight = '700';
scoreValue.style.fontSize = '30px';

scoreDiv.appendChild(scoreValue);

var userName = document.createElement('input');
userName.setAttribute('id', 'username');
userName.style.height = '30px';
userName.style.width = '40%';
userName.style.marginLeft = 'auto';
userName.style.marginRight = 'auto';
userName.addEventListener('keyup', function(e)
{
    if(e.target.value.length > 0)
        document.getElementById('saveScoreBtn').disabled = false;
    else
        document.getElementById('saveScoreBtn').disabled = true;
})

container.appendChild(userName);
container.appendChild(createButton('Save', 'saveScoreBtn', true));
container.appendChild(createButton('Play Again', 'playAgain', false));
container.appendChild(createButton('Go Home', 'goHome', false));

function createButton(text, id, disablestatus)
{
    var element = document.createElement('button');
    element.setAttribute('id', id);
    element.innerText = text;
    element.disabled = disablestatus;
    element.style.height = '30px';
    element.style.marginLeft = 'auto';
    element.style.marginRight = 'auto';
    element.style.textAlign = 'center';
    element.style.marginTop = '20px';
    element.style.cursor = 'pointer';
    if(text == 'Save')
    {
        element.addEventListener('click', function()
        {
            alert('Data saved successfully');
            var usernm =  document.getElementById('username');
            var score = document.getElementById('scoreValue');
            highScoresArray.push([usernm.value, score.innerText]);
            localStorage.setItem('highscores',JSON.stringify(highScoresArray));
            usernm.value = '';
        })
    }
    else if(text == 'Play Again')
    {
        element.addEventListener('click', function(e)
        {
            window.location.href = 'game.html';
        })
    }
    else if(text == 'Go Home')
    {
        element.addEventListener('click', function(e)
        {
            window.location.href = 'index.html';
        })
    }

    return element;
}