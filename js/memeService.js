'use strict'

var gElCanvas
var gCtx
var gCurrImg = ''
var gStartPos

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
            txt: '',
            size: 20,
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

function getTxt() {
    return gMeme.lines[0].txt;
}

function getFill() {
    return gMeme.lines[0].color;
}

function getStroke() {
    return gMeme.lines[0].stroke;
}

function getFontSize() {
    return gMeme.lines[0].size;
}

function getFont() {
    return gMeme.lines[0].font;
}

function updateText(text) {
    gMeme.lines[0].txt = text;
}

function increaseFont() {
    gMeme.lines[0].size += 10;
    console.log(gMeme.lines[0].size)
}

function decreaseFont() {
    gMeme.lines[0].size -= 10;
    console.log(gMeme.lines[0].size)
}

function isTextClicked(clickedPos) {
    const { pos, size, txt } = gMeme.lines[0];
    // console.log(gCtx.measureText(txt).width);
    return ((clickedPos.x >= pos.x && clickedPos.x <= pos.x + gCtx.measureText(txt).width)) && ((clickedPos.y <= pos.y && clickedPos.y >= pos.y - size))
}

function moveLine(dx, dy) {
    gMeme.lines[0].pos.x = dx;
    gMeme.lines[0].pos.y = dy;
}