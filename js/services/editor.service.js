'use strict'

var gElCanvas
var gCtx


var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 40,
            align: 'center',
            color: 'white',
            stroke: 'black',
            font: 'Impact',
            pos: { x: 250, y: 60 },
            isDrag: false,

        }
    ]
}


function getLines() {
    return gMeme.lines;
}


function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}



function updateText(text) {
    console.log(gMeme.lines);
    console.log(gMeme.selectedLineIdx);
    gMeme.lines[gMeme.selectedLineIdx].txt = text;
}

function increaseFont() {
    const line = getCurrLine()
    if (line.size === 50) return
    line.size += 10;
    // console.log(line.size)
}

function decreaseFont() {
    const line = getCurrLine()
    if (line.size === 30) return
    line.size -= 10;

}

function moveLine(dir) {
    const currLine = getCurrLine();
    // console.log(currLine.pos.y);
    if ((dir === 'down' && currLine.pos.y >= gElCanvas.height - 30) || (dir === "up" && currLine.pos.y <= 50)) return
    if (dir === 'up') currLine.pos.y -= 10
    else currLine.pos.y += 10;
}


function switchLines() {
    console.log(gMeme.selectedLineIdx);
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx++
    // console.log(gMeme.selectedLineIdx);
    return gMeme.lines[gMeme.selectedLineIdx].txt;
}

function addLine() {
    console.log(gMeme.lines);
    gMeme.lines.push(createNewLine());
    console.log(gMeme.lines);
    gMeme.selectedLineIdx = (gMeme.lines.length === 0) ? 0 : gMeme.selectedLineIdx + 1

}

function createNewLine() {
    switch (gMeme.lines.length) {
        case 0:
            var pos = { x: (gElCanvas.width / 2), y: 60 }
            break;
        case 1:
            var pos = { x: (gElCanvas.width / 2), y: (gElCanvas.height - 50) }
            break;
        case (gMeme.lines.length):
            var pos = { x: (gElCanvas.width / 2), y: (gElCanvas.height / 2) }
            // console.log(pos);
            break;
    }
    var newLine = {
        txt: '',
        size: 40,
        align: 'center',
        color: 'white',
        stroke: 'black',
        font: 'Impact',
        pos: pos,
        isDrag: false,
    }
    return newLine
}

function resetMeme() {
    gMeme = {
        selectedImgId: 1,
        selectedLineIdx: 0,
        lines: [
            {
                txt: '',
                size: 40,
                align: 'center',
                color: 'white',
                stroke: 'black',
                font: 'Impact',
                pos: { x: 250, y: 50 },
                isDrag: false,

            }
        ]
    }
}


function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    gMeme.selectedLineIdx = (gMeme.lines.length === 0) ? gMeme.selectedLineIdx = -1 : gMeme.selectedLineIdx - 1;
    // console.log(gMeme.lines);
    // gMeme.selectedLineIdx = 0;
}

function changeColor(color, path) {
    const currLine = getCurrLine();
    currLine[path] = color;
}

function setFont(font) {
    const line = getCurrLine();
    line.font = font;
}



function saveMeme(data) {
    console.log('saving...');
    console.log(gMemes)
    // var currMeme = {
    //     selectedImgId: gMeme.selectedImgId,
    //     selectedLineIdx: gMeme.selectedLineIdx,
    //     lines: 
    // }
    // currMeme[id] = gMemes.length + 1;
    // console.log(currMeme.lines[0].txt);
    if (!gMemes || gMemes.length === 0) gMemes = [data]
    else gMemes.push(data);
    console.log(gMemes);
    saveToStorage('memesDB', gMemes);
}


// function isTextClicked(clickedPos) {
//     const { pos, size, txt } = gMeme.lines[gMeme.selectedLineIdx];
//     // console.log(gCtx.measureText(txt).width);
//     return ((clickedPos.x >= pos.x && clickedPos.x <= pos.x + gCtx.measureText(txt).width)) && ((clickedPos.y <= pos.y && clickedPos.y >= pos.y - size))
// }

// function moveLine(dx, dy) {
//     gMeme.lines[0].pos.x = dx;
//     gMeme.lines[0].pos.y = dy;
// }