'use strict'

var gElCanvas
var gCtx
var gCurrImg = ''

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
            align: 'left',
            color: 'red'

        }
    ]
}

function getImages() {
    return gImgs;
}


function getImage() {
    return gImgs[0].url;
}

function getImageById(imgId) {
    var currImage = gImgs.find(image => image.id === imgId);
    gCurrImg = currImage.url;
    return currImage;
}

function getTxt() {
    return gMeme.lines[0].txt;
}

function updateText(text) {
    gMeme.lines[0].txt = text;
}