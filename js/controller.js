'use strict'

// const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    console.log('lets meme!')
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    gCtx.fillStyle = 'white'
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
    gMeme.lines[0].pos = { x: (gElCanvas.width / 2), y: 50 }
    renderCanvas()
    renderGallery();
    // addListeners()
}


function renderCanvas() {
    if (!gCurrImg) {
        gCtx.fillStyle = "#ede5ff"
        gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
        drawText();
    } else renderImage(gCurrImg)
    // gCtx.save()
    // gCtx.restore()
    renderSelectionRect();
    drawText();
}


function renderImage(url) {
    var img = new Image()
    img.src = url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText();
        renderSelectionRect();
    }
}

function drawText() {
    var lines = getLines();
    lines.forEach((line) => {
        const { txt, size, align, color, stroke, font, pos } = line;
        gCtx.lineWidth = 2;
        gCtx.setLineDash([]);
        gCtx.strokeStyle = stroke;
        gCtx.fillStyle = color;
        gCtx.font = `${size}px ${font}`;
        gCtx.textAlign = align;
        line.width = gCtx.measureText(txt).width;
        line.height = (gCtx.measureText(txt).fontBoundingBoxDescent) + (gCtx.measureText(txt).fontBoundingBoxAscent);
        gCtx.fillText(txt.toUpperCase(), pos.x, pos.y);
        gCtx.strokeText(txt.toUpperCase(), pos.x, pos.y);

    })
}


function renderSelectionRect() {
    var line = getCurrLine();
    console.log(line);
    const { txt, pos, width, height } = line;
    console.log(pos)
    // var textWidth = gCtx.measureText(txt).width;
    // var textHeight = (gCtx.measureText(txt).fontBoundingBoxDescent) + (gCtx.measureText(txt).fontBoundingBoxAscent)
    console.log(width, height);
    drawRect(pos.x - width / 2 - 25, pos.y - height, width + 50, height + 20);

}

function drawRect(x, y, width, height) {
    gCtx.beginPath();
    gCtx.rect(x, y, width, height);
    gCtx.setLineDash([10, 10]);
    // gCtx.fillStyle = 'transparent';
    // gCtx.fillRect(x, y, 150, 150);
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
}


function onUpdateText(text) {
    console.log(text)
    updateText(text);
    renderCanvas();
    drawText();
}

function renderGallery() {
    var images = getImages();
    // console.log(images)
    var strHtml
    strHtml = images.map(image => {
        return `<img src="${image.url}" onclick="updateCanvas(${image.id})">`
    })
    // console.log(strHtml)
    console.log(strHtml)
    document.querySelector('.gallery-container').innerHTML = strHtml.join('');
}

function updateCanvas(imgId) {
    var img = getImageById(imgId);
    renderImage(img.url)
    showEditor();
}

function onIncreaseFont() {
    increaseFont();
    renderCanvas();
}

function onDecreaseFont() {
    decreaseFont();
    renderCanvas();
}


function onMoveDown() {
    moveLineDown();
    renderCanvas();

}

function onMove(direction) {
    if (direction === 'up') moveLineUp()
    else moveLineDown()
    renderCanvas()
}

function onAddLine() {
    addLine()
    renderCanvas()
}

function onSwitch() {
    switchLines()
    renderCanvas()
}

function onRemoveLine() {
    removeLine();
    renderCanvas();
}


function givePos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    console.log(pos)
}


function showGallery() {
    document.querySelector('.gallery-container').classList.toggle('hide');
    document.querySelector('.editor').classList.toggle('hide');
    document.querySelector('.gallery').classList.toggle('current-page');
}

function showEditor() {
    document.querySelector('.gallery-container').classList.toggle('hide');
    document.querySelector('.editor').classList.toggle('hide');
    document.querySelector('.gallery').classList.toggle('current-page');
}

/* Drag and Drop - currently disabled */


// function addListeners() {
//     addMouseListeners()
//     addTouchListeners()
// }

// function addMouseListeners() {
//     gElCanvas.addEventListener('mousemove', onMove)
//     gElCanvas.addEventListener('mousedown', onDown)
//     gElCanvas.addEventListener('mouseup', onUp)
// }

// function addTouchListeners() {
//     gElCanvas.addEventListener('touchmove', onMove)
//     gElCanvas.addEventListener('touchstart', onDown)
//     gElCanvas.addEventListener('touchend', onUp)
// }



// function onDown(ev) {
//     const pos = getEvPos(ev)
//     if (!isTextClicked(pos)) return
//     // console.log(isTextClicked(pos))
//     gMeme.lines[0].isDrag = true;
//     gStartPos = pos
//     document.body.style.cursor = 'grabbing'
// }

// function onMove(ev) {
//     const line = gMeme.lines[0];
//     if (line.isDrag) {
//         const pos = getEvPos(ev);
//         const dx = pos.x - gStartPos.x
//         const dy = pos.y - gStartPos.y
//         gStartPos = pos
//         renderCanvas()
//     }
// }

// function onUp() {
//     gMeme.lines[0].isDrag = false;
//     document.body.style.cursor = 'default'
// }

// function getEvPos(ev) {
//     var pos = {
//         x: ev.offsetX,
//         y: ev.offsetY
//     }
//     if (gTouchEvs.includes(ev.type)) {
//         ev.preventDefault()
//         ev = ev.changedTouches[0]
//         pos = {
//             x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
//             y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
//         }
//     }
//     return pos
// }
