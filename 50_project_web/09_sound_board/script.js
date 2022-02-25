const sounds = ['applause', 'boo', 'gasp', 'tada', 'victory', 'wrong']

sounds.forEach(sound => {
    const btn = document.createElement('button')
    btn.classList.add('btn')

    btn.innerText = sound

    btn.addEventListener('click',() => {
        stopSound()

        document.getElementById(sound).play()
    })

    document.getElementById('buttons').appendChild(btn)
})

function stopSound(){
    sounds.forEach((sound) => {
        const song = document.getElementById(sound)

        song.pause()
        // set currentTime để reset âm thanh về giây ban đầu
        song.currentTime = 0;
    })
}