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
        keywords: ['trump', 'angry', 'politics']
    },
    {
        id: 2,
        url: 'img/2.jpg',
        keywords: ['dog', 'puppy', 'cute', 'love', 'kiss']
    },
    {
        id: 3,
        url: 'img/3.jpg',
        keywords: ['dog', 'baby', 'cute', 'sleep']
    },
    {
        id: 4,
        url: 'img/4.jpg',
        keywords: ['cat', 'keyboard', 'tired']
    },
    {
        id: 5,
        url: 'img/5.jpg',
        keywords: ['baby', 'success', 'happy']
    },
    {
        id: 6,
        url: 'img/6.jpg',
        keywords: ['man', 'aliens', 'blame']
    },
    {
        id: 7,
        url: 'img/7.jpg',
        keywords: ['baby', 'surprise']
    },
    {
        id: 8,
        url: 'img/8.jpg',
        keywords: ['charlie and the chocolate factory', 'tell me again', 'wonka', 'condescending', 'gene wilder']
    },
    {
        id: 9,
        url: 'img/9.jpg',
        keywords: ['baby', 'laughing', 'evil']
    },
    {
        id: 10,
        url: 'img/10.jpg',
        keywords: ['obama', 'laughing']
    },
    {
        id: 15,
        url: 'img/15.jpg',
        keywords: ['lord of the rings', 'one does not simply', 'boromir']
    },
    {
        id: 18,
        url: 'img/18.jpg',
        keywords: ['everywhere', 'buzz', 'toy story']
    },
]

var gMemes = []

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
            pos: { x: 0, y: 0 },
            isDrag: false,

        }
    ]
}

// function saveMeme(data) {
//     console.log('saving...');
//     var currMeme = gMeme;
//     currMeme[data] = data;
//     // currMeme[id] = gMemes.length + 1;
//     console.log(currMeme.lines[0].txt);
//     // gMemes.push(currMeme);
//     // console.log(gMemes);
//     // saveToStorage('memesDB', gMemes);
// }

// function getSavedMemes() {
//     var memes = loadFromStorage('memesDB');
//     return memes;
// }

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
    return gMeme.lines[gCurrLineIdx].txt;
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