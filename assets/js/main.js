const wrapper = document.querySelector('.wrapper')
const musicImg = wrapper.querySelector('.box__image img')
const musicName = wrapper.querySelector('.song__details .music__name')
const musicArtist = wrapper.querySelector('.song__details .artist__name')
const mainAudio = wrapper.querySelector('#audio')
const playPouseBtn = wrapper.querySelector('.play__pause')
const prevBtn = wrapper.querySelector('#prev-song')
const nextBtn = wrapper.querySelector('#next-song')
const progressBarContent = wrapper.querySelector('.progress__content')
const progressBar = wrapper.querySelector('.progress__bar')
const repeatBtn = wrapper.querySelector('#repeat__song')
const musicList = wrapper.querySelector('.music__list')



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

// Função para reproduzir a música
function playMusic() {
    wrapper.classList.add('paused')
    playPouseBtn.querySelector('i').innerText = 'paused'
    mainAudio.play()
}

// Função para pausar a música
function pauseMusic() {
    wrapper.classList.remove('paused')
    playPouseBtn.querySelector('i').innerText = 'play_arrow'
    mainAudio.pause()
}

// Função para passar para a próxima música
function nextMusic() {
    musicIndex++
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex
    loadMusic(musicIndex)
    playMusic()
}

// Função para voltar para música anterior
function prevMusic() {
    musicIndex--
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex
    loadMusic(musicIndex)
    playMusic()
}

// Evento de play ou pause
playPouseBtn.addEventListener('click', () => {
    const isMusicPaused = wrapper.classList.contains('paused')

    isMusicPaused ? pauseMusic() : playMusic()
})

// Evento de passar a música
nextBtn.addEventListener('click', () => {
    nextMusic()
})

// Evento de voltar a música
prevBtn.addEventListener('click', () => {
    prevMusic()
})

// Atualize a barra de progresso de acordo com a música atua
mainAudio.addEventListener('timeupdate', e => {
    const currentTime = e.target.currentTime
    const duration = e.target.duration

    let progressWidth = (currentTime / duration) * 100

    progressBar.style.width = `${progressWidth}%`

    let musicCurrentTime = wrapper.querySelector('.current')
    let musicDurationTime = wrapper.querySelector('.current__duration')

    
   // Atualize a reprodução da hora atual da música
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

// Atualize a reprodução da hora atual da música
progressBarContent.addEventListener('click', e => {
    let progressWidthValue = progressBarContent.clientWidth
    let clickedOffSetX = e.offsetX
    let songDuration = mainAudio.duration

    mainAudio.currentTime = (clickedOffSetX / progressWidthValue) * songDuration
    playMusic()
})

// Alterar loop, embaralhar, repetir ícone ao clicar
repeatBtn.addEventListener('click',  () => {
    let getText = repeatBtn.innerText;

    switch(getText) {
        case "repeat":
            repeatBtn.innerText = 'repeat_one';
            repeatBtn.setAttribute('title', 'Repetir...')
            break;
        case "repeat_one":
            repeatBtn.innerText = 'shuffle';
            repeatBtn.setAttribute('title', 'Aleatório...')
            break;   
        case "shuffle":
            repeatBtn.innerText = 'repeat';
            repeatBtn.setAttribute('title', 'Tocando...')
            break;  
    }
})

// Código para o que fazer depois que a música terminar
mainAudio.addEventListener('ended', () => {
    let getText = repeatBtn.innerText;

    switch(getText) {
        case "repeat":
            nextMusic()
            break;
        case "repeat_one":
            mainAudio.currentTime = 0
            loadMusic(musicIndex)
            playMusic()
            break;   
        case "shuffle":
            let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            do (
                randIndex = Math.floor((Math.random() * allMusic.length) + 1)
            ); 
            while(musicIndex === randIndex);
            musicIndex = randIndex;
            loadMusic(musicIndex)
            playMusic()
            break;     
    }
})


