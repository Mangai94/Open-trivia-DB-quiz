var container = document.createElement('div');
container.setAttribute('class', 'container');
container.style.width = '800px';
container.style.height = '400px';
container.style.marginLeft = 'auto';
container.style.marginRight = 'auto';
container.style.border = '1px solid black';
container.style.marginTop = '50px';
container.style.display = 'flex';
container.style.justifyContent ='center';
container.style.alignItems ='center';

document.body.appendChild(container);

var centerDiv = document.createElement('div');
centerDiv.style.height ='200px';
centerDiv.style.width ='500px';

container.appendChild(centerDiv);

var label = document.createElement('label');
label.innerText = 'Quick Quiz';
label.style.color = '#42a3b9';
label.style.fontSize = '24px';
label.style.width = '100%';
label.style.textAlign = 'center';
label.style.fontWeight = '700';

centerDiv.appendChild(label);

var playbuttonContainer = document.createElement('div');
playbuttonContainer.style.width = '100%';
playbuttonContainer.style.display ='flex';
playbuttonContainer.style.justifyContent ='center';
playbuttonContainer.style.alignItems ='center';

var playButton = document.createElement('button');
playButton.setAttribute('class', 'btn btn-primary');
playButton.setAttribute('id', 'play');
playButton.innerText ='Play';
playButton.style.height ='35px';
playButton.style.width ='160px';
playButton.style.fontSize ='18px';
playButton.style.display ='flex';
playButton.style.justifyContent ='center';
playButton.style.alignItems ='center';
playButton.addEventListener('click', function()
{
    window.location.href ='game.html';
});

playbuttonContainer.appendChild(playButton);

centerDiv.appendChild(playbuttonContainer);

var highScorebuttonContainer = document.createElement('div');
highScorebuttonContainer.style.width = '100%';
highScorebuttonContainer.style.marginTop = '10px';
highScorebuttonContainer.style.display ='flex';
highScorebuttonContainer.style.justifyContent ='center';
highScorebuttonContainer.style.alignItems ='center';


var hscoreButton = document.createElement('button');
hscoreButton.setAttribute('class', 'btn btn-primary');
hscoreButton.setAttribute('id', 'highScores');
hscoreButton.innerText ='High Scores';
hscoreButton.style.height ='35px';
hscoreButton.style.width ='160px';
hscoreButton.style.fontSize ='18px';
hscoreButton.style.display ='flex';
hscoreButton.style.justifyContent ='center';
hscoreButton.style.alignItems ='center';
hscoreButton.addEventListener('click', function()
{
    window.location.href ='highscores.html';
});

highScorebuttonContainer.appendChild(hscoreButton);

centerDiv.append(highScorebuttonContainer);