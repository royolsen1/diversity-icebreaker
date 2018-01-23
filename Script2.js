﻿"use strict";

var LayoutModel = [
    [   // Index 0 = 3 groups
        {
            title1: 'Blue',
            color1: 'Blue',
            text1: 'Red: 25, Blue: 71 Green: 54',
        },
        {
            title1: 'Red',
            color1: 'Red',
            text1: 'Red: 24, Blue: 49, Green: 71',
        },
        {
            title1: 'Green',
            color1: 'Green',
            text1: 'Red: 24, Blue: 49, Green: 71',
        },
    ],
    [   // Index 1 = 6 groups
        {
            title1: 'Blue/Red',
            color1: 'Purple',
            text1: 'Red: 25, Blue: 71 Green: 54',
        },
        {
            title1: 'Blue/Green',
            color1: 'Green',
            text1: 'Red: 24, Blue: 49, Green: 71',
        },
        {
            title1: 'Green/Red',
            color1: 'Red',
            text1: 'Red: 24, Blue: 49, Green: 71',
        },
        {
            title1: 'Green/Blue',
            color1: 'DodgerBlue',
            text1: 'Red: 25, Blue: 71 Green: 54',
        },
        {
            title1: 'Red/Blue',
            color1: 'Green',
            text1: 'Red: 24, Blue: 49, Green: 71',
        },
        {
            title1: 'Red/Green',
            color1: 'Red',
            text1: 'Red: 24, Blue: 49, Green: 71',
        },
    ],
    [   // Index 2 = 7 groups
        {
            title1: 'Blue/Red',
            color1: 'DodgerBlue',
            text1: 'Red: 25, Blue: 71, Green: 54',
        },
        {
            title1: 'Blue/Green',
            color1: 'Green',
            text1: 'Red: 24, Blue: 49, Green: 71',
        },
        {
            title1: 'Green/Red',
            color1: 'Red',
            text1: 'Red: 24, Blue: 49, Green: 71',
        },
        {
            title1: 'Green/Blue',
            color1: 'DodgerBlue',
            text1: 'Red: 25, Blue: 71 Green: 54',
        },
        {
            title1: 'Red/Blue',
            color1: 'Green',
            text1: 'Red: 24, Blue: 49, Green: 71',
        },
        {
            title1: 'Red/Green',
            color1: 'Red',
            text1: 'Red: 24, Blue: 49, Green: 71',
        },
        {
            title1: 'Average',
            color1: 'Pink',
            text1: 'Red: 24, Blue: 49, Green: 71',
        },
    ],
    [   // Index 3 = 9 groups
        {
            title1: 'Blue',
            color1: 'Blue',
            text1: 'Red: 25, Blue: 71 Green: 54',
        },
        {
            title1: 'Blue/Red',
            color1: 'DodgerBlue',
            text1: 'Red: 25, Blue:71 Green: 54',
        },
        {
            title1: 'Blue/Green',
            color1: 'Green',
            text1: 'Red: 24, Blue: 49, Green: 71',
        },
        {
            title1: 'Green',
            color1: 'Green',
            text1: 'Red: 25, Blue:71 Green: 54',
        },
        {
            title1: 'Green/Red',
            color1: 'Red',
            text1: 'Red: 24, Blue: 49, Green: 71',
        },
        {
            title1: 'Green/Blue',
            color1: 'DodgerBlue',
            text1: 'Red: 25, Blue: 71 Green: 54',
        },
        {
            title1: 'Red',
            color1: 'Red',
            text1: 'Red: 25, Blue: 71 Green: 54',
        },
        {
            title1: 'Red/Blue',
            color1: 'Green',
            text1: 'Red: 24, Blue: 49, Green: 71',
        },
        {
            title1: 'Red/Green',
            color1: 'Red',
            text1: 'Red: 24, Blue: 49, Green: 71',
        },
    ],
    [   // Index 4 = 10 groups
        {
            title1: 'Blue',
            color1: 'Blue',
            text1: 'Red: 25, Blue: 71 Green: 54',
        },
        {
            title1: 'Blue/Red',
            color1: 'DodgerBlue',
            text1: 'Red: 25, Blue: 71 Green: 54',
        },
        {
            title1: 'Blue/Green',
            color1: 'Green',
            text1: 'Red: 24, Blue: 49, Green: 71',
        },
        {
            title1: 'Green',
            color1: 'Green',
            text1: 'Red: 25, Blue: 71 Green: 54',
        },
        {
            title1: 'Green/Red',
            color1: 'Red',
            text1: 'Red: 24, Blue: 49, Green: 71',
        },
        {
            title1: 'Green/Blue',
            color1: 'DodgerBlue',
            text1: 'Red: 25, Blue: 71 Green: 54',
        },
        {
            title1: 'Red',
            color1: 'Red',
            text1: 'Red: 25, Blue: 71 Green: 54',
        },
        {
            title1: 'Red/Blue',
            color1: 'Green',
            text1: 'Red: 24, Blue: 49, Green: 71',
        },
        {
            title1: 'Red/Green',
            color1: 'Red',
            text1: 'Red: 24, Blue: 49, Green: 71',
        },
        {
            title1: 'Average',
            color1: 'Pink',
            text1: 'Red: 24, Blue: 49, Green: 71',
        },
    ],
];

function showView(showIndex) {
    var html =
        '<table id="t01" style="width:40%;">' + '<tr>';
    var i;
    var group;
    var groups = LayoutModel[showIndex];
    for (i in groups) {
        group = groups[i];
        html += '<th style="color:'
            + group.color1 + '">'
            + group.title1 + '</th>';
    }
    html += '</tr><tr>';
    for (i in groups) {
        group = groups[i];
        html += '<td>' + group.text1 + '</td>';
    }
    html += '</tr><tr>';
    for (i in groups) {
        group = groups[i];
        var tmp = '<td>&gt;' + group.limit1
    }
    document.getElementById('show').innerHTML = html;
}

function changelimit1(inputElement, showIndex, groupIndex) {
    var groups = LayoutModel[showIndex];
    var group = groups[groupIndex];
    group.limit1 = inputElement.value;
    showView(showIndex);
    console.log(group);
}

var t01 = document.getElementById("t01");

function groupdisp() {
    var value = document.getElementById('grouplist').value;

    if (value == "t01") {
        showView(0);
    }
    if (value == "t02") {
        showView(1);
    }
    if (value == "t03") {
        showView(2);
    }
    if (value == "t04") {
        showView(3);
    }
    if (value == "t05") {
        showView(4);
    }
}