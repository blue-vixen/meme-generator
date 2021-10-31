'use strict'

// const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
var gImg;
var gPrevSelectedLineIdx;

function onInit() {
    gPrevSelectedLineIdx = 0;
    console.log('lets meme!', gMeme.selectedLineIdx)
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    renderCanvas();
    renderGallery();
    addListeners();
    renderSavedMemes();
}


function renderCanvas() {
    if (!gCurrImg) {
        gCtx.fillStyle = "#ede5ff"
        gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
    } else renderImage(gCurrImg)
    // gCtx.save()
    // gCtx.restore()
    // renderSelectionRect();
    // drawText();
}


function renderImage(url, isDownload) {
    var img = new Image()
    img.src = url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText();
        if (gMeme.selectedLineIdx !== -1) renderSelectionRect();
        if (isDownload) gMeme.selectedLineIdx = gPrevSelectedLineIdx
    }
}

function drawText() {
    var lines = getLines();
    if (lines.length === 0) return;
    lines.forEach((line) => {
        let { txt, size, align, color, stroke, font, pos } = line;
        if (txt === '') txt = (document.getElementById("line-txt").getAttribute('placeholder'));
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

function clearSelectionRect() {
    gPrevSelectedLineIdx = gMeme.selectedLineIdx
    gMeme.selectedLineIdx = -1
    renderImage(gCurrImg, true)
}


function renderSelectionRect() {
    var line = getCurrLine();
    if (!line) return
    const { pos, width, height } = line;
    drawRect(pos.x - width / 2 - 25, pos.y - height, width + 50, height + 20);

}

function drawRect(x, y, width, height) {
    gCtx.beginPath();
    gCtx.rect(x, y, width, height);
    gCtx.setLineDash([10, 10]);
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
}


function onUpdateText(text) {
    if (gMeme.selectedLineIdx === -1) gMeme.selectedLineIdx = gPrevSelectedLineIdx
    // console.log(text)
    updateText(text);
    renderCanvas();
    // drawText();
}

function renderGallery() {
    var images = getImages();
    if (images.length === 0) {
        document.querySelector('.gallery-container').innerHTML = `<h2 class="filter">No matches found...</h2>`;
    } else {
        var strHtml
        strHtml = images.map(image => {
            return `<img src="${image.url}" onclick="updateCanvas(${image.id})">`
        })
        document.querySelector('.gallery-container').innerHTML = strHtml.join('');
    }

}

function onSetFilter(filterBy) {
    console.log('filtering by', filterBy)
    setFilter(filterBy);
    renderGallery();
}


function updateCanvas(imgId) {
    var img = getImageById(imgId);
    gCurrImg = img.url;
    renderImage(gCurrImg)
    showEditor();
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}


function onIncreaseFont() {
    increaseFont();
    renderCanvas();
}

function onDecreaseFont() {
    decreaseFont();
    renderCanvas();
}


function onMove(dir) {
    moveLine(dir);
    renderCanvas();
}

function onAddLine() {
    addLine();
    document.querySelector('#line-txt').value = '';
    renderCanvas();
}

function onSwitch() {
    var lineTxt = switchLines();
    document.querySelector('#line-txt').value = lineTxt;
    renderCanvas();
}

function onChangeColor(color, path) {
    changeColor(color, path)
    renderCanvas();
}

function onRemoveLine() {
    removeLine();
    renderCanvas();
}

// function onChangeFont(font) {
//     console.log(font);
//     switch (font) {
//         case 'Arial':
//             setFont('Arial');
//             break;
//         case 'ArialB':
//             setFont('Arial Black');
//             break;
//     }

//     renderCanvas();
// }

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL('image/jpeg');
    elLink.href = data;
    elLink.download = 'img';
}


function showArea(clickedEl, area) {
    const elBtns = document.querySelectorAll('.nav-btn');
    // console.log(elBtns);
    elBtns.forEach(btn => {
        btn.classList.remove('current-page');
    });
    // console.log(elBtns);
    clickedEl.classList.add('current-page');
    const elAreas = document.querySelectorAll('.area');
    elAreas.forEach(area => {
        area.classList.add('hide');
    });
    document.querySelector(`.${area}`).classList.remove('hide');
    document.body.classList.remove('menu-open');
}


function showGallery() {
    document.querySelector('.gallery').classList.remove('hide');
    document.querySelector('.editor').classList.add('hide');
    document.querySelector('.gallery-btn').classList.add('current-page');
    document.querySelector('.memes-btn').classList.remove('current-page');
    clearCanvas();
}

function showEditor() {
    document.querySelector('.gallery').classList.toggle('hide');
    document.querySelector('.editor').classList.toggle('hide');
    document.querySelector('.gallery-btn').classList.toggle('current-page');
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
    document.querySelector('.btn-menu').classList.toggle('burger');
}





// function givePos(ev) {
//     var pos = {
//         x: ev.offsetX,
//         y: ev.offsetY
//     }
//     console.log(pos)
// }



// Uploading image from file system

// function onImgInput(ev) {
//     console.log(ev)
//     document.querySelector('.upload-operations').classList.remove('hide');
//     const fileChosen = document.getElementById('file-chosen');
//     fileChosen.textContent = `File chosen: ${ev.target.files[0].name}`
//     loadImageFromInput(ev, renderImg)
// }

// function loadImageFromInput(ev, onImageReady) {
//     var reader = new FileReader()
//     reader.onload = function (event) {
//         var img = new Image()
//         img.onload = onImageReady.bind(null, img)
//         img.src = event.target.result
//         gImg = img
//     }
//     reader.readAsDataURL(ev.target.files[0])
// }

// function renderImg(img) {
//     gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
// }






