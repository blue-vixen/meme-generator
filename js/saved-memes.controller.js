function renderSavedMemes() {
    var idx = -1;
    var memes = getSavedMemes();
    if (!memes || memes.length === 0) {
        document.querySelector('.saved-memes-container').innerHTML = `<h2>No saved memes</h2>`
    } else {
        var strHtml = memes.map((meme) => {
            idx++
            return `<img src="${meme}" class="saved-meme" onclick="openModal(${idx})">`
        })

        // console.log(strHtml);
        document.querySelector('.saved-memes-container').innerHTML = strHtml.join('');
    }

}

function openModal(idx) {
    var imageData = getSavedMeme(idx);
    document.querySelector('.modal-img').setAttribute('data-idx', idx);
    document.querySelector('.modal-img').src = imageData;
    document.querySelector('.modal').classList.remove('hide');
    document.querySelector('.modal-overlay').classList.remove('hide');
}

function closeModal() {
    document.querySelector('.modal').classList.add('hide');
    document.querySelector('.modal-overlay').classList.add('hide');
}

function onRemoveMeme() {
    var idx = document.querySelector('.modal-img').getAttribute('data-idx');
    removeSavedMeme(idx);
    renderSavedMemes();
    closeModal();
}


function onSaveMeme() {
    var img = new Image()
    img.src = gCurrImg;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText();
        const data = gElCanvas.toDataURL();
        saveMeme(data);
        renderSavedMemes();
    }
}


function downloadSavedMeme(elLink) {
    const imageURI = document.querySelector('.modal-img').src;
    console.log(imageURI);
    elLink.href = imageURI;
}