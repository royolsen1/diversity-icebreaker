﻿"use strict";

// Initialize Firebase

//Database 1
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
        html += '<th id="' + groupName + '"> ' + groupName + '</th > ';
    }
    html += '</tr><tr>';
    for (var groupName in groups) {
        var groupScores = groups[groupName];
        html += '<td id="' + groupName + 'ppl">';
        for (var j = 0; j < groupScores.length; j++) {
            var score = groupScores[j];
            html += '<b>' + score.name + '</b>' + ' B:' + score.blue + ' R:' + score.red + ' G:' + score.green + ' <a href="javascript:deleteUser(\''
                + score.id + '\')"style="text-decoration:none;">❌</a>' + '<br/>' + '<br/>';
        }
        html += '</td>';
    }
    html += '</tr></table>';
    document.getElementById('showresults').innerHTML = html;
    check01()
    check02()
}

function deleteUser(index) {
    dataCollection.doc(index).delete().then(function () {
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}

var RMode = db.collection("Admin").doc("Settings");

RMode.get().then(function (doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        // Settings.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function (error) {
    console.log("Error getting document:", error);
    });

function deleteAll() {
    dataCollection.get().then(
        function (collectionSnapshot) {
            collectionSnapshot.forEach(
                function (dataSnapshot) {
                    dataSnapshot.data();
                    var ID = dataSnapshot.id;
                    dataCollection.doc(ID).delete().then(function () {
                        console.log("Document successfully deleted!");
                    }).catch(function (error) {
                        console.error("Error removing document: ", error);
                    });
                });
        });
}

var checkboxread = document.getElementById("readmode");
db.collection("Admin").doc("Settings")
    .onSnapshot(function (doc) {
        checkboxread.checked = doc.data().ReadOnly;
    });

function readmode() {
        db.collection("Admin").doc("Settings").update({
            ReadOnly: checkboxread.checked
        });
}

function handlePaste(e) {
    var clipboardData, pastedData;
    // Stop data actually being pasted into div
    e.stopPropagation();
    e.preventDefault();
    // Get pasted data via clipboard API
    clipboardData = e.clipboardData || window.clipboardData;
    pastedData = clipboardData.getData('Text');
    var lines = pastedData.split('\r\n');
    for (var i in lines) {
        let line = lines[i];
        let parts = line.split('\t');
        dataCollection.add({
            blue: parts[0],
            red: parts[1],
            green: parts[2],
            age: parts[3],
            sex: parts[4],
            name: parts[5]
        });
    }
}
document.getElementById('editableDiv').addEventListener('paste', handlePaste);

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