const wrapper = document.querySelector('.wrapper')
let musicImg = wrapper.querySelector('.box__image img')
let musicName = wrapper.querySelector('.song__details .music__name')
let musicArtist = wrapper.querySelector('.song__details .artist__name')
let mainAudio = wrapper.querySelector('#audio')
let playPouseBtn = wrapper.querySelector('.play__pause')
let prevBtn = wrapper.querySelector('#prev-song')
let nextBtn = wrapper.querySelector('#next-song')


let musicIndex = 1

window.addEventListener('load', () => {
    loadMusic(musicIndex)
})

function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].song
    musicArtist.innerText = allMusic[indexNumb - 1].artist
    musicImg.src = `assets/images/artist/${allMusic[indexNumb - 1].image}.jpg`
    mainAudio.src = `assets/songs/${allMusic[indexNumb - 1].src}.mp3`
}

function playMusic() {
    wrapper.classList.add('paused')
    playPouseBtn.querySelector('i').innerText = 'paused'
    mainAudio.play()
}

function pauseMusic() {
    wrapper.classList.remove('paused')
    playPouseBtn.querySelector('i').innerText = 'play_arrow'
    mainAudio.pause()
}

function nextMusic() {
    musicIndex++
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex
    loadMusic(musicIndex)
    playMusic()
}

function prevMusic() {
    musicIndex--
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex
    loadMusic(musicIndex)
    playMusic()
}

playPouseBtn.addEventListener('click', () => {
    const isMusicPaused = wrapper.classList.contains('paused')

    isMusicPaused ? pauseMusic() : playMusic()
})

nextBtn.addEventListener('click', () => {
    nextMusic()
})

prevBtn.addEventListener('click', () => {
    prevMusic()
})