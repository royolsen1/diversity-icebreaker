﻿"use strict";


        // Initialize Firebase
        var config = {
     apiKey: "AIzaSyDIMCz-H4Qa6yzO8cOEDDO-_-TNgKRwz40",
     authDomain: "diversity-icebreaker.firebaseapp.com",
     databaseURL: "https://diversity-icebreaker.firebaseio.com",
     projectId: "diversity-icebreaker",
     storageBucket: "diversity-icebreaker.appspot.com",
     messagingSenderId: "829693602828"
 };
 firebase.initializeApp(config);
 var db = firebase.firestore();
 var dataCollection = db.collection('Data');
 var participants = [];
 dataCollection.onSnapshot(
     function (collectionSnapshot) {
         participants = [];
         collectionSnapshot.forEach(
             function (dataSnapshot) {
                 let data = dataSnapshot.data();
                 if ((data.red >= 0 && data.red <= 100) ||
                     (data.green >= 0 && data.green <= 100) ||
                     (data.blue >= 0 && data.blue <= 100)) {
                     var person = {};
                     person.red = data.red;
                     person.blue = data.blue;
                     person.green = data.green;
                     person.age = data.age;
                     person.sex = data.sex;
                     person.name = data.name;
                     person.id = dataSnapshot.id;
                     person.group = data.group;
                     participants.push(person);
                 }
             }
         );
         grouping();
     }
 );
 function grouping() {
     // Lage grupper
     var groups = {};
     for (var i = 0; i < participants.length; i++) {
         let singleScore = participants[i];
         let groupName = singleScore.group;
         if (!groups[groupName]) {
             groups[groupName] = [];
         }
         groups[groupName].push(singleScore);
     }
     document.getElementById('candicount').innerHTML = 'Number of candidates: <b>' + participants.length + '</b>';
     // Vise grupper
     var html =
         '<table id="t01" style="width:40%;">' + '<tr>';
     for (var groupName in groups) {
         var groupScores = groups[groupName];
         html += '<th id="' + groupName +'"> ' + groupName + '</th > ';
     }
     html += '</tr><tr>';
     for (var groupName in groups) {
         var groupScores = groups[groupName];
         html += '<td id="' + groupName + 'ppl">';
         for (var j = 0; j < groupScores.length; j++) {
             var score = groupScores[j];
             html += score.name + ' Red=' + score.red + ' Blue=' + score.blue + ' Green=' + score.green + ' ' + '<br/>';
         }
         html += '</td>';
     }
     html += '</tr></table>';
     document.getElementById('test').innerHTML = html;
     check01()
     check02()
     check03()
     check04()
     check05()
     check06()
     check07()
     check08()
 }

function changelimit1(inputElement, showIndex, groupIndex) {
    var groups = LayoutModel[showIndex];
    var group = groups[groupIndex];
    group.limit1 = inputElement.value;
    showView(showIndex);
    console.log(group);
}

//var t01 = document.getElementById("t01");

//function groupdisp() {
//    var value = document.getElementById('grouplist').value;

//    if (value == "t01") {
//        showView(0);
//    }
//    if (value == "t02") {
//        showView(1);
//    }
//    if (value == "t03") {
//        showView(2);
//    }
//    if (value == "t04") {
//        showView(3);
//    }
//    if (value == "t05") {
//        showView(4);
//    }
//}


// Group Checkboxes

function check01() {
    // Get the checkbox
    var checkBox01 = document.getElementById("c1");
    // Get the output text
    var Text01 = document.getElementById("Text01");

    // If the checkbox is checked, display the output text
    if (checkBox01.checked == true) {
        Text01.style.display = "block";
        Red.style.display = 'table-cell';
        Redppl.style.display = 'table-cell';
        Green.style.display = 'table-cell';
        Greenppl.style.display = 'table-cell';
        Blue.style.display = 'table-cell';
        Blueppl.style.display = 'table-cell';
    } else {
        Text01.style.display = "none";
        Red.style.display = 'none';
        Redppl.style.display = 'none';
        Green.style.display = 'none';
        Greenppl.style.display = 'none';
        Blue.style.display = 'none';
        Blueppl.style.display = 'none';
    }
}

function check02() {
    // Get the checkbox
    var checkBox02 = document.getElementById("c2");
    // Get the output text
    var Text02 = document.getElementById("Text02");

    // If the checkbox is checked, display the output text
    if (checkBox02.checked == true) {
        Text02.style.display = "block";
        Average.style.display = 'table-cell';
        Averageppl.style.display = 'table-cell';
    } else {
        Text02.style.display = "none";
        Average.style.display = 'none';
        Averageppl.style.display = 'none';
    }
}

function check03() {
    // Get the checkbox
    var checkBox03 = document.getElementById("c3");
    // Get the output text
    var Text03 = document.getElementById("Text03");

    // If the checkbox is checked, display the output text
    if (checkBox03.checked == true) {
        Text03.style.display = "block";
    } else {
        Text03.style.display = "none";
    }
}

function check04() {
    // Get the checkbox
    var checkBox04 = document.getElementById("c4");
    // Get the output text
    var Text04 = document.getElementById("Text04");

    // If the checkbox is checked, display the output text
    if (checkBox04.checked == true) {
        Text04.style.display = "block";
    } else {
        Text04.style.display = "none";
    }
}

function check05() {
    // Get the checkbox
    var checkBox05 = document.getElementById("c5");
    // Get the output text
    var Text05 = document.getElementById("Text05");

    // If the checkbox is checked, display the output text
    if (checkBox05.checked == true) {
        Text05.style.display = "block";
    } else {
        Text05.style.display = "none";
    }
}

function check06() {
    // Get the checkbox
    var checkBox06 = document.getElementById("c6");
    // Get the output text
    var Text06 = document.getElementById("Text06");

    // If the checkbox is checked, display the output text
    if (checkBox06.checked == true) {
        Text06.style.display = "block";
    } else {
        Text06.style.display = "none";
    }
}

function check07() {
    // Get the checkbox
    var checkBox07 = document.getElementById("c7");
    // Get the output text
    var Text07 = document.getElementById("Text07");

    // If the checkbox is checked, display the output text
    if (checkBox07.checked == true) {
        Text07.style.display = "block";
    } else {
        Text07.style.display = "none";
    }
}

function check08() {
    // Get the checkbox
    var checkBox08 = document.getElementById("c8");
    // Get the output text
    var Text08 = document.getElementById("Text08");

    // If the checkbox is checked, display the output text
    if (checkBox08.checked == true) {
        Text08.style.display = "block";
    } else {
        Text08.style.display = "none";
    }
}

