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

var highScoresHeaderDiv = document.createElement('div');
highScoresHeaderDiv.style.width = '800px';
highScoresHeaderDiv.style.height = '80px';
highScoresHeaderDiv.innerText = 'High Scores';
highScoresHeaderDiv.style.textAlign = 'Center';
highScoresHeaderDiv.style.lineHeight = '100px';
highScoresHeaderDiv.style.fontSize = '30px';
highScoresHeaderDiv.style.color = '#81bcf0';

container.appendChild(highScoresHeaderDiv);

var highScoresBodyDiv = document.createElement('div');
highScoresBodyDiv.style.maxHeight = '300px'
highScoresBodyDiv.style.width = '800px';
highScoresBodyDiv.style.textAlign = 'center';
highScoresBodyDiv.style.overflowY = 'auto'
highScoresBodyDiv.style.marginBottom = '15px'
var array = JSON.parse(localStorage.getItem('highscores'));
for(let i = 0; i < array.length; i++)
{
    var text = `${array[i][0]} - ${array[i][1]}`;
    highScoresBodyDiv.appendChild(createScoreDiv(text));
}


container.appendChild(highScoresBodyDiv);

var goHomeButton = document.createElement('button');
goHomeButton.innerText = 'Go Home';
goHomeButton.style.fontSize = '18px';
goHomeButton.style.cursor = 'pointer';
goHomeButton.addEventListener('click', function()
{
    window.location.href = 'index.html'
});

container.appendChild(goHomeButton);

function createScoreDiv(text)
{
    var element = document.createElement('div');
    element.innerText = text;
    element.style.marginLeft ='auto';
    element.style.marginRight ='auto';
    element.style.textAlign ='center';
    element.style.color ='#474747';
    element.style.fontSize ='22px';
    element.style.fontWeight ='700';
    element.style.width ='90%';
    element.style.cursor ='pointer';
    return element;
}