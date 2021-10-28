'use strict'

var gElCanvas
var gCtx
var gCurrImg = ''
var gStartPos
var gCurrLineIdx = 0;
var gNewLineDiff = 50;

var gImgs = [
    {
        id: 1,
        url: 'img/1.jpg',
        keywords: []
    },
    {
        id: 2,
        url: 'img/2.jpg',
        keywords: []
    },
]

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Your text here',
            size: 40,
            align: 'center',
            color: 'white',
            stroke: 'black',
            font: 'Impact',
            pos: { x: 0, y: 0 },
            isDrag: false,

        }
    ]
}

function getImages() {
    return gImgs;
}


function getImageById(imgId) {
    var currImage = gImgs.find(image => image.id === imgId);
    gCurrImg = currImage.url;
    return currImage;
}


function getLines() {
    return gMeme.lines;
}

function updateText(text) {
    gMeme.lines[gCurrLineIdx].txt = text;
}

function increaseFont() {
    if (gMeme.lines[gCurrLineIdx].size === 70) return
    gMeme.lines[gCurrLineIdx].size += 10;
}

function decreaseFont() {
    if (gMeme.lines[gCurrLineIdx].size === 20) return
    gMeme.lines[gCurrLineIdx].size -= 10;

}

function moveLineUp() {
    gMeme.lines[gCurrLineIdx].pos.y -= 10;

}

function moveLineDown() {
    gMeme.lines[gCurrLineIdx].pos.y += 10;

}

function switchLines() {
    if (gCurrLineIdx === gMeme.lines.length - 1) gCurrLineIdx = 0
    else gCurrLineIdx++
    console.log(gCurrLineIdx);
}

function addLine() {
    gMeme.lines.push(createNewLine())
    gCurrLineIdx = gMeme.lines.length - 1;
    gNewLineDiff += 55;

}

function createNewLine() {
    var newLine = {
        txt: 'Your text here',
        size: 40,
        align: 'center',
        color: 'white',
        stroke: 'black',
        font: 'Impact',
        pos: { x: (gElCanvas.width / 2), y: (gElCanvas.height - gNewLineDiff) },
        isDrag: false,
    }
    return newLine
}

function getCurrLine() {
    return gMeme.lines[gCurrLineIdx];
}

function removeLine() {
    if (gMeme.lines.length === 1) return
    gMeme.lines.splice(gCurrLineIdx, 1);
    gCurrLineIdx = 0;
}

// function isTextClicked(clickedPos) {
//     const { pos, size, txt } = gMeme.lines[0];
//     // console.log(gCtx.measureText(txt).width);
//     return ((clickedPos.x >= pos.x && clickedPos.x <= pos.x + gCtx.measureText(txt).width)) && ((clickedPos.y <= pos.y && clickedPos.y >= pos.y - size))
// }

// function moveLine(dx, dy) {
//     gMeme.lines[0].pos.x = dx;
//     gMeme.lines[0].pos.y = dy;
// }