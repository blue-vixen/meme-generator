'use strict'


var gCurrImg = ''
var gFilterBy = 'ALL'
var gKeyWords = { 'happy': 10, 'cute': 15, 'angry': 6, 'baby': 20, 'dog': 15, 'cat': 13, 'politics': 4, 'movies': 16, 'funny': 20 };

var gImgs = _createImgs()
var gMemes = [];

function _createImg(id, keywords) {
    var img = {
        id,
        url: `img/${id}.jpg`,
        keywords
    }
    return img;
}

function _createImgs() {
    var imgs = [
        _createImg(1, ['politics', 'crazy', 'angry']),
        _createImg(2, ['animal', 'happy', 'dogs', 'love', 'cute']),
        _createImg(3, ['animal', 'happy', 'kids', 'dogs', 'cute', 'baby']),
        _createImg(4, ['animal', 'cats', 'cute']),
        _createImg(5, ['kids', 'funny', 'baby']),
        _createImg(6, ['funny']),
        _createImg(7, ['funny', 'kids', 'shock', 'baby']),
        _createImg(8, ['funny', 'movies']),
        _createImg(9, ['funny', 'kids', 'crazy', 'weird', 'evil', 'baby', 'laugh']),
        _createImg(10, ['funny', 'politics', 'laugh']),
        _createImg(11, ['funny', 'crazy', 'love', 'weird', 'kiss', 'sport']),
        _createImg(12, ['funny', 'weird', 'israeli']),
        _createImg(13, ['happy', 'movies']),
        _createImg(14, ['crazy', 'movies']),
        _createImg(15, ['funny', 'weird']),
        _createImg(16, ['funny', 'happy', 'shock', 'movies', 'sci-fi', 'picard', 'laugh']),
        _createImg(17, ['politics', 'crazy', 'angry']),
        _createImg(18, ['funny', 'shock', 'movies'])
    ]
    return imgs;
}



function getImageById(imgId) {
    var currImage = gImgs.find(image => image.id === imgId);
    gCurrImg = currImage.url;
    return currImage;
}

function getKeywords() {
    return Object.keys(gKeyWords);
}


function setFilter(filterBy) {
    console.log(filterBy)
    if (!filterBy) gFilterBy = 'ALL'
    else gFilterBy = filterBy.toLowerCase();
    console.log('filtering by', gFilterBy.toLowerCase())
}

function getImages() {
    if (gFilterBy === 'ALL') return gImgs;
    // console.log(gFilterBy);
    return gImgs.filter(img => img.keywords.some(keyword => keyword.startsWith(gFilterBy)));

}

function getSavedMeme(idx) {
    return (gMemes[idx]);

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