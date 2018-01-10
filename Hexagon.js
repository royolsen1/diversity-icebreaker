var db = firebase.firestore();
var dataCollection = db.collection('Data');
hexagonBuild();
var redAmount = document.getElementById('redInput');
var blueAmount = document.getElementById('blueInput');
var greenAmount = document.getElementById('greenInput');
var counter = 0;
var totalRed = 0;
var totalBlue = 0;
var totalGreen = 0;
dataCollection.onSnapshot(
    function (collectionSnapshot) {
        hexagonBuild();
        counter = 0;
        totalRed = 0;
        totalBlue = 0;
        totalGreen = 0;
        collectionSnapshot.forEach(
            function (dataSnapshot) {
                var dots = document.getElementById('sekskant');
                let data = dataSnapshot.data();
                if (data.red > 0) {
                    var redScore = parseInt(data.red);
                    var greenScore = parseInt(data.green);
                    var relGreen = 150 - greenScore;
                    var rest = 150 - greenScore;
                    var relRed = 100 - redScore;
                    var gx = Math.sqrt(relGreen * relGreen * 3 / 4)
                    var dy = rest / 2 - redScore;
                    var dx = Math.sqrt(dy * dy / 3);
                    var y = relRed + 10;
                    var x = Math.round(redScore > rest / 2 ? gx - dx - 6.6025 : gx + dx - 6.6025);
                    dots.innerHTML += '<circle class="draggable" cx="' +
                        x +
                        '" cy="' +
                        y +
                        '" r="1" stroke= "black" fill="black" transform="matrix(1 0 0 1 0 0)" onmousedown="selectElement(evt)"/>';
                    totalRed += parseInt(data.red);
                    totalBlue += parseInt(data.blue);
                    totalGreen += parseInt(data.green);
                    counter++;

                }
            }
        )
        hexagonMath();
    }
)


function addScore() {
    var newScore = {};
    newScore.red = redAmount.value;
    newScore.blue = blueAmount.value;
    newScore.green = greenAmount.value;
    userScores.push(newScore);
    showScores();
    hexagonMath();
}
function randomScore() {
    var newScore = {};
    newScore.red = Math.floor((Math.random() * 99) + 1);
    newScore.blue = Math.floor((Math.random() * 99) + 1);
    newScore.green = 150 - (newScore.red + newScore.blue);
    if (newScore.green < 0 || newScore.green > 100) {
        randomScore();
    }
    else {
        userScores.push(newScore);
        showScores();
        hexagonMath();
    }
}
function randomScore15() {
    for (var i = 0; i < 15; i++) {
        randomScore();
    }
}
function hexagonBuild() {
    document.getElementById('sekskant').innerHTML =
        '<defs>' +
        '<linearGradient id="r" x1="80" y1="10" x2="80" y2="110" gradientUnits="userSpaceOnUse">' +
        '<stop stop-color="red" stop-opacity="1" offset="0" />' +
        '<stop stop-color="white" stop-opacity="0" offset="1" />' +
        '</linearGradient>' +
        '<linearGradient id="b" x1="36.7" y1="35" x2="123.3" y2="85" gradientUnits="userSpaceOnUse">' +
        '<stop stop-color="white" stop-opacity="0" offset="0" />' +
        '<stop stop-color="blue" stop-opacity="0.5" offset="1" />' +
        '</linearGradient>' +
        '<linearGradient id="g" x1="123.3" y1="35" x2="36.7" y2="85" gradientUnits="userSpaceOnUse">' +
        '<stop stop-color="white" stop-opacity="0" offset="0" />' +
        '<stop stop-color="green" stop-opacity="0.85" offset="1" />' +
        '</linearGradient>' +
        '</defs>' +
        '<polygon points="22.3,60 51.1,10 108.9,10 137.7,60 108.9,110 51.1,110" stroke="black" fill="url(#r)" stroke-width="0.5" />' +
        '<polygon points="22.3,60 51.1,10 108.9,10 137.7,60 108.9,110 51.1,110" stroke="black" fill="url(#g)" stroke-width="0.5" />' +
        '<polygon points="22.3,60 51.1,10 108.9,10 137.7,60 108.9,110 51.1,110" stroke="black" fill="url(#b)" stroke-width="0.5" />';
}
function hexagonMath(red, green, blue) {
    if (counter > 2) {
        var dots = document.getElementById('sekskant');
        totalRed = totalRed / counter;
        totalGreen = totalGreen / counter;
        totalBlue = totalBlue / counter;
        var redScore = totalRed;
        var greenScore = totalGreen;
        var relGreen = 150 - greenScore;
        var rest = 150 - greenScore;
        var relRed = 100 - redScore;
        var gx = Math.sqrt(relGreen * relGreen * 3 / 4)
        var dy = rest / 2 - redScore;
        var dx = Math.sqrt(dy * dy / 3);
        var y = relRed + 10;
        var x = Math.round(redScore > rest / 2 ? gx - dx - 6.6025 : gx + dx - 6.6025);
        dots.innerHTML +=
            '<line x1="' + x + '" y1="' + y + '" x2="80" y2="110" stroke="black" stroke-width="0.5" />' +
            '<line x1="36.7" y1="35" x2="' + x + '" y2="' + y + '" stroke="black" stroke-width="0.5" />' +
            '<line x1="123.3" y1="35" x2="' + x + '" y2="' + y + '" stroke="black" stroke-width="0.5" />;'
    }
}
//test
var selectedElement = 0;
var currentX = 0;
var currentY = 0;
var currentMatrix = 0;

function selectElement(evt) {
    selectedElement = evt.target;
    currentX = evt.clientX;
    currentY = evt.clientY;
    currentMatrix = selectedElement.getAttributeNS(null, "transform").slice(7, -1).split(' ');

    for (var i = 0; i < currentMatrix.length; i++) {
        currentMatrix[i] = parseFloat(currentMatrix[i]);
    }

    selectedElement.setAttributeNS(null, "onmousemove", "moveElement(evt)");
}
function moveElement(evt) {
    selectedElement.setAttributeNS(null, "onmouseout", "deselectElement(evt)");
    selectedElement.setAttributeNS(null, "onmouseup", "deselectElement(evt)");
    dx = evt.clientX - currentX;
    dy = evt.clientY - currentY;
    currentMatrix[4] += dx / 5.95;
    currentMatrix[5] += dy / 5.95;
    newMatrix = "matrix(" + currentMatrix.join(' ') + ")";

    selectedElement.setAttributeNS(null, "transform", newMatrix);
    currentX = evt.clientX;
    currentY = evt.clientY;
}
function deselectElement(evt) {
    if (selectedElement != 0) {
        selectedElement.removeAttributeNS(null, "onmousemove");
        selectedElement.removeAttributeNS(null, "onmouseout");
        selectedElement.removeAttributeNS(null, "onmouseup");
        selectedElement = 0;
    }
}

            //test end