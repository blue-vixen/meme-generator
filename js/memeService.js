'use strict'

var gElCanvas
var gCtx
var gCurrImg = ''
var gStartPos
var gFilterBy = 'ALL'

var gImgs = [
    {
        id: 1,
        url: 'img/1.jpg',
        keywords: ['trump', 'angry', 'politics']
    },
    {
        id: 2,
        url: 'img/2.jpg',
        keywords: ['dog', 'puppy', 'cute', 'love', 'kiss', 'animal']
    },
    {
        id: 3,
        url: 'img/3.jpg',
        keywords: ['dog', 'baby', 'cute', 'sleep', 'animal']
    },
    {
        id: 4,
        url: 'img/4.jpg',
        keywords: ['cat', 'keyboard', 'tired', 'cute', 'animal']
    },
    {
        id: 5,
        url: 'img/5.jpg',
        keywords: ['baby', 'success', 'happy', 'cute']
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
        keywords: ['baby', 'laughing', 'evil', 'happy']
    },
    {
        id: 10,
        url: 'img/10.jpg',
        keywords: ['obama', 'laughing', 'happy']
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
            pos: { x: 250, y: 50 },
            isDrag: false,

        }
    ]
}

function saveMeme(data) {
    console.log('saving...');
    // var currMeme = {
    //     selectedImgId: gMeme.selectedImgId,
    //     selectedLineIdx: gMeme.selectedLineIdx,
    //     lines: 
    // }
    // currMeme[id] = gMemes.length + 1;
    // console.log(currMeme.lines[0].txt);
    gMemes.push(data);
    console.log(gMemes);
    saveToStorage('memesDB', gMemes);
}

function getSavedMemes() {
    var memes = loadFromStorage('memesDB');
    gMemes = memes;
    return memes;
}

function removeSavedMeme(idx) {
    gMemes.splice(idx, 1);
    saveToStorage('memesDB', gMemes);
}

function setFilter(filterBy) {
    gFilterBy = filterBy.toLowerCase();
    console.log('filtering by', filterBy.toLowerCase())
}

function getImages() {
    if (gFilterBy === 'ALL') return gImgs;
    console.log(gFilterBy);
    const imgs = gImgs.filter(function (img) {
        return img.keywords.includes(gFilterBy);
    })
    return imgs;
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
    gMeme.lines[gMeme.selectedLineIdx].txt = text;
}

function increaseFont() {
    if (gMeme.lines[gMeme.selectedLineIdx].size === 70) return
    gMeme.lines[gMeme.selectedLineIdx].size += 10;
}

function decreaseFont() {
    if (gMeme.lines[gMeme.selectedLineIdx].size === 20) return
    gMeme.lines[gMeme.selectedLineIdx].size -= 10;

}

function moveLineUp() {
    gMeme.lines[gMeme.selectedLineIdx].pos.y -= 10;

}

function moveLineDown() {
    gMeme.lines[gMeme.selectedLineIdx].pos.y += 10;

}

function switchLines() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx++
    // console.log(gMeme.selectedLineIdx);
    return gMeme.lines[gMeme.selectedLineIdx].txt;
}

function addLine() {
    gMeme.lines.push(createNewLine())
    gMeme.selectedLineIdx++

}

function createNewLine() {
    switch (gMeme.lines.length) {
        case 0:
            var pos = { x: (gElCanvas.width / 2), y: 50 }
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
        txt: 'Your text here',
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

function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

function removeLine() {
    if (gMeme.lines.length === 1) return
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    gMeme.selectedLineIdx = 0;
}

function setFillColor(value) {
    gMeme.lines[gMeme.selectedLineIdx].color = value;
}

function setStrokeColor(value) {
    gMeme.lines[gMeme.selectedLineIdx].stroke = value;
}


function getSavedMeme(idx) {
    return (gMemes[idx]);

}
// function setFont(font) {
//     gMeme.lines[gMeme.selectedLineIdx].font = font;
// }

// function isTextClicked(clickedPos) {
//     const { pos, size, txt } = gMeme.lines[gMeme.selectedLineIdx];
//     // console.log(gCtx.measureText(txt).width);
//     return ((clickedPos.x >= pos.x && clickedPos.x <= pos.x + gCtx.measureText(txt).width)) && ((clickedPos.y <= pos.y && clickedPos.y >= pos.y - size))
// }

// function moveLine(dx, dy) {
//     gMeme.lines[0].pos.x = dx;
//     gMeme.lines[0].pos.y = dy;
// }