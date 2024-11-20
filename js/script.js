'use strict'

const members = [
    'VU-BCS-2201-0378-EVE', 'VU-BCS-2201-0003-EVE', 'VU-BCS-2201-1542-EVE', 'VU-BCS-2201-0123-EVE',
    'VU-BIT-2407-0188-EVE', 'VU-DIT-2403-1299-EVE', 'VU-BIT-2407-0958-EVE', 'VU-DAV-2403-0885-EVE',
    'VU-BIT-2403-0852-EVE', 'VU-BIT-2403-0384-EVE', 'VU-BIT-2201-1038-EVE'
]

const navigation = document.querySelector('.navigation')

members.forEach((member, i) => {
    const link = document.createElement('a')
    link.href = `${member}.html`
    link.innerText = i + 1

    navigation.appendChild(link)
})

const voicesEl = document.getElementById('voices')
const voices = speechSynthesis.getVoices()
const getVoices = () => {
    for (let voice of voices) {

        const option = document.createElement('option')
        option.textContent = `${voice.name} ${voice.lang}`
        option.value = voice.name
        option.setAttribute('data-lang', voice.lang)
        option.setAttribute('data-name', voice.name)
        voicesEl.appendChild(option)
    }
}

getVoices();
speechSynthesis.onvoiceschanged = getVoices

voicesEl.addEventListener('change', e => {
    message.voice = voices.find(v => v.name === e.target.value)
})


const message = new SpeechSynthesisUtterance()


const readBtn = document.getElementById('read').addEventListener('click', e => {
    const main = document.querySelector('main')
    message.text = main.innerText

    speechSynthesis.speak(message)
})

document.getElementById('pause').addEventListener('click', e => {
    speechSynthesis.pause()
})

document.getElementById('resume').addEventListener('click', e => {
    speechSynthesis.resume()
})


document.getElementById('phone-input').addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, "")

    if (value.length > 12) value = value.substring(0, 12)

    // +(256) 770-506234
    const areaCode = value.substring(0, 3)
    const carrierPart = value.substring(3, 6)
    const digitsPart = value.substring(6, 12)

    let formatedPhone = ''
    if (areaCode) {
        if (areaCode == 0) formatedPhone += `+(256`
        else formatedPhone += `+(${areaCode}`
    }
    if (carrierPart) formatedPhone += `) ${carrierPart}`
    if (digitsPart) formatedPhone += `-${digitsPart}`

    e.target.value = formatedPhone
})