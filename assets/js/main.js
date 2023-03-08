const wrapper = document.querySelector('.wrapper')
let musicImg = wrapper.querySelector('.box__image img')
let musicName = wrapper.querySelector('.song__details .music__name')
let musicArtist = wrapper.querySelector('.song__details .artist__name')
let mainAudio = wrapper.querySelector('#audio')
let playPouseBtn = wrapper.querySelector('.play__pause')
let prevBtn = wrapper.querySelector('#prev-song')
let nextBtn = wrapper.querySelector('#next-song')
let progressBarContent = wrapper.querySelector('.progress__content')
let progressBar = wrapper.querySelector('.progress__bar')


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

mainAudio.addEventListener('timeupdate', e => {
    const currentTime = e.target.currentTime
    const duration = e.target.duration

    let progressWidth = (currentTime / duration) * 100

    progressBar.style.width = `${progressWidth}%`

    let musicCurrentTime = wrapper.querySelector('.current')
    let musicDurationTime = wrapper.querySelector('.current__duration')

    mainAudio.addEventListener('loadeddata', () => {

        let audioDuration = mainAudio.duration
        let totalMinutes = Math.floor(audioDuration / 60)
        let totalSeconds = Math.floor(audioDuration % 60)

        if(totalSeconds < 10) {
            totalSeconds = `0${totalSeconds}`
        }

        musicDurationTime.innerText = `${totalMinutes} : ${totalSeconds}`
    })

        let currentMinutes = Math.floor(currentTime / 60)
        let currentSeconds = Math.floor(currentTime % 60)

        if(currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`
        }

        musicCurrentTime.innerText = `${currentMinutes} : ${currentSeconds}`

})


progressBarContent.addEventListener('click', e => {
    let progressWidthValue = progressBarContent.clientWidth
    let clickedOffSetX = e.offsetX
    let songDuration = mainAudio.duration

    mainAudio.currentTime = (clickedOffSetX / progressWidthValue) * songDuration
    playMusic()
})