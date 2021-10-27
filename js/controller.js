'use strict'

function onInit() {
    console.log('lets meme!')
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    gCtx.fillStyle = 'white'
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
    renderCanvas()
    renderGallery();
}


function renderCanvas() {
    renderMeme()
    gCtx.save()
    gCtx.restore()
}

function renderMeme() {
    var img = new Image()
    img.src = getImage();
    console.log(img)
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText();
    }

}


function drawText() {
    var txt = getTxt();
    console.log(txt)
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'white';
    gCtx.font = '40px Impact';
    gCtx.fillText(txt, 50, 50);
    gCtx.strokeText(txt, 50, 50);
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
    console.log(images)
    var strHtml = '';
    strHtml += images.map(image => {
        return `<img src="${image.url}"  onclick="updateCanvas(${image.id})">`
    })
    console.log(strHtml)

    document.querySelector('.gallery-container').innerHTML = strHtml
}