var db = firebase.firestore();
var dataCollection = db.collection('Data');
var adminCollection = db.collection('Admin');
var participants = [];
hexagonBuild();
var counter = 0;
var totalRed = 0;
var totalBlue = 0;
var totalGreen = 0;
var radius = 10;
var numberOfGroups;

dataCollection.onSnapshot(
    function (collectionSnapshot) {
        hexagonBuild();
        participants = [];
        collectionSnapshot.forEach(
            function (dataSnapshot) {
                let data = dataSnapshot.data();
                if (data.red >= 0 || data.red <= 100 ||
                    data.green >= 0 || data.green <= 100 ||
                    data.blue >= 0 || data.blue <= 100) {
                    var person = {};
                    person.red = data.red;
                    person.blue = data.blue;
                    person.green = data.green;
                    person.age = data.age;
                    person.sex = data.sex;
                    person.name = data.name;
                    participants.push(person);
                }
            }
        )
        hexagonMath(true);
    }
);

adminCollection.onSnapshot(
    function (collectionSnapshot) {
        collectionSnapshot.forEach(
            function (dataSnapshot) {
                let data = dataSnapshot.data();
                numberOfGroups = data.nr;
            }
        )
        hexagonMath(true);
    }
);

function hexagonBuild() {
    document.getElementById('drawing').innerHTML =
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
        '<polygon points="22.3,60 51.1,10 108.9,10 137.7,60 108.9,110 51.1,110" stroke="black" fill="url(#b)" stroke-width="0.5" />' +
        // Red lines 
        '<line x1="45.5" y1="20" x2="114.66" y2="20" stroke="black" stroke-width="0.1" />' +
        '<line x1="39.58" y1="30" x2="120.42" y2="30" stroke="black" stroke-width="0.1" />' +
        '<line x1="33.82" y1="40" x2="126.18" y2="40" stroke="black" stroke-width="0.1" />' +
        '<line x1="28.06" y1="50" x2="131.94" y2="50" stroke="black" stroke-width="0.1" />' +
        '<line x1="22.3" y1="60" x2="137.7" y2="60" stroke="black" stroke-width="0.1" />' +
        '<line x1="28.06" y1="70" x2="131.94" y2="70" stroke="black" stroke-width="0.1" />' +
        '<line x1="33.82" y1="80" x2="126.18" y2="80" stroke="black" stroke-width="0.1" />' +
        '<line x1="39.58" y1="90" x2="120.42" y2="90" stroke="black" stroke-width="0.1" />' +
        '<line x1="45.5" y1="100" x2="114.66" y2="100" stroke="black" stroke-width="0.1" />' +
        // Green lines
        '<line x1="28.06" y1="50" x2="62.64" y2="110" stroke="black" stroke-width="0.1" />' +
        '<line x1="33.82" y1="40" x2="74.18" y2="110" stroke="black" stroke-width="0.1" />' +
        '<line x1="39.58" y1="30" x2="85.72" y2="110" stroke="black" stroke-width="0.1" />' +
        '<line x1="45.5" y1="20" x2="97.26" y2="110" stroke="black" stroke-width="0.1" />' +
        '<line x1="51.1" y1="10" x2="108.9" y2="110" stroke="black" stroke-width="0.1" />' +
        '<line x1="62.74" y1="10" x2="114.66" y2="100" stroke="black" stroke-width="0.1" />' +
        '<line x1="74.28" y1="10" x2="120.42" y2="90" stroke="black" stroke-width="0.1" />' +
        '<line x1="85.82" y1="10" x2="126.18" y2="80" stroke="black" stroke-width="0.1" />' +
        '<line x1="97.36" y1="10" x2="131.94" y2="70" stroke="black" stroke-width="0.1" />' +
        // Blue lines
        '<line x1="28.06" y1="70" x2="62.64" y2="10" stroke="black" stroke-width="0.1" />' +
        '<line x1="33.82" y1="80" x2="74.28" y2="10" stroke="black" stroke-width="0.1" />' +
        '<line x1="39.58" y1="90" x2="85.82" y2="10" stroke="black" stroke-width="0.1" />' +
        '<line x1="45.5" y1="100" x2="97.36" y2="10" stroke="black" stroke-width="0.1" />' +
        '<line x1="51.1" y1="110" x2="108.9" y2="10" stroke="black" stroke-width="0.1" />' +
        '<line x1="62.64" y1="110" x2="114.66" y2="20" stroke="black" stroke-width="0.1" />' +
        '<line x1="74.18" y1="110" x2="120.42" y2="30" stroke="black" stroke-width="0.1" />' +
        '<line x1="85.72" y1="110" x2="126.18" y2="40" stroke="black" stroke-width="0.1" />' +
        '<line x1="97.26" y1="110" x2="131.94" y2="50" stroke="black" stroke-width="0.1" />';


}
function hexagonMath(condition) {
    var calculate = condition;
    if (!calculate) {
        var cAX = document.getElementById('circleA').getAttribute('cx');
        var cAY = document.getElementById('circleA').getAttribute('cy');
        var cBX = document.getElementById('circleB').getAttribute('cx');
        var cBY = document.getElementById('circleB').getAttribute('cy');
        var cCX = document.getElementById('circleC').getAttribute('cx');
        var cCY = document.getElementById('circleC').getAttribute('cy');
        var cDX = document.getElementById('circleD').getAttribute('cx');
        var cDY = document.getElementById('circleD').getAttribute('cy');
    }
    hexagonBuild();
    var dots = document.getElementById('drawing');
    counter = 0;
    totalRed = 0;
    totalBlue = 0;
    totalGreen = 0;
    for (var i = 0; i < participants.length; i++) {
        var redScore = parseInt(participants[i].red);
        var greenScore = parseInt(participants[i].green);
        var relGreen = 150 - greenScore;
        var rest = 150 - greenScore;
        var relRed = 100 - redScore;
        var gx = Math.sqrt(relGreen * relGreen * 3 / 4)
        var dy = rest / 2 - redScore;
        var dx = Math.sqrt(dy * dy / 3);
        var y = relRed + 10;
        var x = Math.round(redScore > rest / 2 ? gx - dx - 6.6025 : gx + dx - 6.6025);
        dots.innerHTML += '<circle class="tooltip" cx="' +
            x +
            '" cy="' +
            y +
            '" r="1" stroke= "black" fill="black"><title>Name: ' + participants[i].name +
            '<br/>Blue: ' + participants[i].blue + '<br/>Red: ' + participants[i].red + '<br/>Green: ' +
            participants[i].green + '</title ></circle > ';
        totalRed += parseInt(participants[i].red);
        totalBlue += parseInt(participants[i].blue);
        totalGreen += parseInt(participants[i].green);
        counter++;
    }
    if (counter > 2) {
        if (calculate) {
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
            var cAY = relRed + 10;
            var cAX = Math.round(redScore > rest / 2 ? gx - dx - 6.6025 : gx + dx - 6.6025);
            var cBX = 123.3
            var cBY = 35
            var cCX = 36.7
            var cCY = 35
            var cDX = 80
            var cDY = 110
        }
        if (numberOfGroups == 3) {
            groupThree(cAX, cAY, cBX, cBY, cCX, cCY, cDX, cDY);
        } else if (numberOfGroups == 4) {
            groupFour(cAX, cAY, cBX, cBY, cCX, cCY, cDX, cDY);
        }
    }
}

function groupThree(x, y, cBX, cBY, cCX, cCY, cDX, cDY) {
    var draw = SVG('drawing');
    document.getElementById('radius').value = radius;
    var circleA = draw.circle(2).center(x, y).fill('green').id('circleA');
    var circleB = draw.circle(2).center(cBX, cBY).fill('blue').id('circleB');
    var circleC = draw.circle(2).center(cCX, cCY).fill('blue').id('circleC');
    var circleD = draw.circle(2).center(cDX, cDY).fill('blue').id('circleD');
    circleB.attr({ class: 'draggable' });
    circleC.attr({ class: 'draggable' });
    circleD.attr({ class: 'draggable' });
    circleA.draggable({
        minX: 21.3,
        minY: 9,
        maxX: 138.7,
        maxY: 111,
    });
    circleB.draggable({
        minX: 107.9,
        minY: 9,
        maxX: 138.7,
        maxY: 61
    });
    circleC.draggable({
        minX: 21.3,
        minY: 9,
        maxX: 52.1,
        maxY: 61
    });
    circleD.draggable({
        minX: 50.1,
        minY: 109,
        maxX: 109.9,
        maxY: 111
    });
    var lineB = draw.line(circleA.cx(), circleA.cy(), circleB.cx(), circleB.cy()).stroke({ width: 0.5 }).id('lineB');
    var lineC = draw.line(circleA.cx(), circleA.cy(), circleC.cx(), circleC.cy()).stroke({ width: 0.5 }).id('lineC');
    var lineD = draw.line(circleA.cx(), circleA.cy(), circleD.cx(), circleD.cy()).stroke({ width: 0.5 }).id('lineD');
    circleA.on('dragmove',
        function (event) {
            lineB.attr({ x1: event.detail.p.x });
            lineB.attr({ y1: event.detail.p.y });
            lineC.attr({ x1: event.detail.p.x });
            lineC.attr({ y1: event.detail.p.y });
            lineD.attr({ x1: event.detail.p.x });
            lineD.attr({ y1: event.detail.p.y });
        });

    circleB.on('dragmove',
        function (event) {
            if (event.detail.p.x < 108.9) {
                lineB.attr({ x2: 108.9 });
                lineB.attr({ y2: 10 });
            } else if (event.detail.p.x > 137.7) {
                lineB.attr({ x2: 137.7 });
                lineB.attr({ y2: 60 });
            } else {
                lineB.attr({ x2: event.detail.p.x });
                lineB.attr({ y2: event.detail.p.x * 1.74 - 179.76 });
            }
        });
    circleC.on('dragmove',
        function (event) {
            if (event.detail.p.x > 51.1) {
                lineC.attr({ x2: 51.1 });
                lineC.attr({ y2: 10 });
            } else if (event.detail.p.x < 22.3) {
                lineC.attr({ x2: 22.3 });
                lineC.attr({ y2: 60 });
            } else {
                lineC.attr({ x2: event.detail.p.x });
                lineC.attr({ y2: event.detail.p.x * (-1.74) + 98.72 });
            }
        });
    circleD.on('dragmove',
        function (event) {
            if (event.detail.p.x > 108.9) {
                lineD.attr({ x2: 108.9 });
            } else if (event.detail.p.x < 51.1) {
                lineD.attr({ x2: 51.1 });
            } else {
                lineD.attr({ x2: event.detail.p.x });
            }
        });
}

function groupFour(x, y, cBX, cBY, cCX, cCY, cDX, cDY) {
    var draw = SVG('drawing');
    document.getElementById('radius').value = radius;
    var circleA = draw.circle(2).center(x, y).fill('green').id('circleA');
    var circleB = draw.circle(2).center(cBX, cBY).fill('blue').id('circleB');
    var circleC = draw.circle(2).center(cCX, cCY).fill('blue').id('circleC');
    var circleD = draw.circle(2).center(cDX, cDY).fill('blue').id('circleD');
    var circleE = draw.circle(radius * 2).center(x, y).stroke({ width: 0.5 }).fill('none').id('middleCircle');
    circleA.attr({ class: 'draggable' });
    circleB.attr({ class: 'draggable' });
    circleC.attr({ class: 'draggable' });
    circleD.attr({ class: 'draggable' });
    circleA.draggable({
        minX: 21.3,
        minY: 9,
        maxX: 138.7,
        maxY: 111,
    });
    circleB.draggable({
        minX: 107.9,
        minY: 9,
        maxX: 138.7,
        maxY: 61
    });
    circleC.draggable({
        minX: 21.3,
        minY: 9,
        maxX: 52.1,
        maxY: 61
    });
    circleD.draggable({
        minX: 50.1,
        minY: 109,
        maxX: 109.9,
        maxY: 111
    });

    var deltaYAB = circleA.cy() - circleB.cy();
    var deltaXAB = circleB.cx() - circleA.cx();
    var angleAB = Math.atan2(deltaYAB, deltaXAB);
    var lineB = draw.line(radius * Math.cos(angleAB) + circleA.cx(),
        (-radius) * Math.sin(angleAB) + circleA.cy(),
        circleB.cx(), circleB.cy()).stroke({ width: 0.5 }).id('lineB');

    var deltaYAC = circleA.cy() - circleC.cy();
    var deltaXAC = circleC.cx() - circleA.cx();
    var angleAC = Math.atan2(deltaYAC, deltaXAC);
    var lineC = draw.line(radius * Math.cos(angleAC) + circleA.cx(),
        (-radius) * Math.sin(angleAC) + circleA.cy(),
        circleC.cx(), circleC.cy()).stroke({ width: 0.5 }).id('lineC');

    var deltaYAD = circleA.cy() - circleD.cy();
    var deltaXAD = circleD.cx() - circleA.cx();
    var angleAD = Math.atan2(deltaYAD, deltaXAD);
    var lineD = draw.line(radius * Math.cos(angleAD) + circleA.cx(),
        -radius * Math.sin(angleAD) + circleA.cy(),
        circleD.cx(), circleD.cy()).stroke({ width: 0.5 }).id('lineD');
    circleA.on('dragmove',
        function (event) {
            circleE.attr({ cx: circleA.cx() });
            circleE.attr({ cy: circleA.cy() });
            var deltaYAB = circleA.cy() - circleB.cy();
            var deltaXAB = circleB.cx() - circleA.cx();
            var angleAB = Math.atan2(deltaYAB, deltaXAB);
            lineB.attr({ x1: radius * Math.cos(angleAB) + circleA.cx() });
            lineB.attr({ y1: -radius * Math.sin(angleAB) + circleA.cy() });
            var deltaYAC = circleA.cy() - circleC.cy();
            var deltaXAC = circleC.cx() - circleA.cx();
            var angleAC = Math.atan2(deltaYAC, deltaXAC);
            lineC.attr({ x1: radius * Math.cos(angleAC) + circleA.cx() });
            lineC.attr({ y1: -radius * Math.sin(angleAC) + circleA.cy() });
            var deltaYAD = circleA.cy() - circleD.cy();
            var deltaXAD = circleD.cx() - circleA.cx();
            var angleAD = Math.atan2(deltaYAD, deltaXAD);
            lineD.attr({ x1: radius * Math.cos(angleAD) + circleA.cx() });
            lineD.attr({ y1: -radius * Math.sin(angleAD) + circleA.cy() });
        });

    circleB.on('dragmove',
        function (event) {
            if (event.detail.p.x < 108.9) {
                lineB.attr({ x2: 108.9 });
                lineB.attr({ y2: 10 });
            } else if (event.detail.p.x > 137.7) {
                lineB.attr({ x2: 137.7 });
                lineB.attr({ y2: 60 });
            } else {
                lineB.attr({ x2: event.detail.p.x });
                lineB.attr({ y2: event.detail.p.x * 1.74 - 179.76 });
            }
            var deltaYAB = circleA.cy() - document.getElementById('lineB').getAttribute('y2');
            var deltaXAB = document.getElementById('lineB').getAttribute('x2') - circleA.cx();
            var angleAB = Math.atan2(deltaYAB, deltaXAB);
            lineB.attr({ x1: radius * Math.cos(angleAB) + circleA.cx() });
            lineB.attr({ y1: -radius * Math.sin(angleAB) + circleA.cy() });
        });
    circleC.on('dragmove',
        function (event) {
            if (event.detail.p.x > 51.1) {
                lineC.attr({ x2: 51.1 });
                lineC.attr({ y2: 10 });
            } else if (event.detail.p.x < 22.3) {
                lineC.attr({ x2: 22.3 });
                lineC.attr({ y2: 60 });
            } else {
                lineC.attr({ x2: event.detail.p.x });
                lineC.attr({ y2: event.detail.p.x * (-1.74) + 98.72 });
            }
            var deltaYAC = circleA.cy() - document.getElementById('lineC').getAttribute('y2');
            var deltaXAC = document.getElementById('lineC').getAttribute('x2') - circleA.cx();
            var angleAC = Math.atan2(deltaYAC, deltaXAC);
            lineC.attr({ x1: radius * Math.cos(angleAC) + circleA.cx() });
            lineC.attr({ y1: -radius * Math.sin(angleAC) + circleA.cy() });
        });
    circleD.on('dragmove',
        function (event) {
            if (event.detail.p.x > 108.9) {
                lineD.attr({ x2: 108.9 });
            } else if (event.detail.p.x < 51.1) {
                lineD.attr({ x2: 51.1 });
            } else {
                lineD.attr({ x2: event.detail.p.x });
            }
            var deltaYAD = circleA.cy() - document.getElementById('lineD').getAttribute('y2');
            var deltaXAD = document.getElementById('lineD').getAttribute('x2') - circleA.cx();
            var angleAD = Math.atan2(deltaYAD, deltaXAD);
            lineD.attr({ x1: radius * Math.cos(angleAD) + circleA.cx() });
            lineD.attr({ y1: -radius * Math.sin(angleAD) + circleA.cy() });
        });
}
function circleSize() {
    radius = document.getElementById('radius').value;
    document.getElementById('middleCircle').setAttribute('r', radius);
    hexagonMath(false);
}
