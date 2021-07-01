let hour = 0
let minute = 0
let second = 0
let millisecond = 0
let cron
let sirene = new Audio("assets/audio/sirene.mp3")
let minLimite = document.querySelector('#minutosLimite')
let msgErroMinLimite = document.querySelector('#msgErroMinLimite')

document.form_main.start.onclick = () => start()
document.form_main.pause.onclick = () => pause()
document.form_main.reset.onclick = () => reset()

function limite() {
  if (minute == minLimite.value) {
    pause()
    sirene.play()
  }
}

function start() {
  if (minLimite.value > 0) {
    pause()
    cron = setInterval(() => {
      timer()
      limite()
    }, 10)
    msgErroMinLimite.innerHTML=''
    minLimite.style.borderColor = 'black'
    minLimite.disabled = true
  } else {
    msgErroMinLimite.innerHTML='<h4>Insira minutos válidos</h4>'
    minLimite.style.borderColor = 'red'
    minLimite.focus()
  }

}

function pause() {
  clearInterval(cron)
}

function reset() {
  hour = 0
  minute = 0
  second = 0
  millisecond = 0
  document.getElementById('hour').innerText = '00'
  document.getElementById('minute').innerText = '00'
  document.getElementById('second').innerText = '00'
  minLimite.disabled = false
  pause()
}

function timer() {
  if ((millisecond += 10) == 1000) {
    millisecond = 0
    second++
  }
  if (second == 60) {
    second = 0
    minute++
  }
  if (minute == 60) {
    minute = 0
    hour++
  }
  document.getElementById('hour').innerText = returnData(hour)
  document.getElementById('minute').innerText = returnData(minute)
  document.getElementById('second').innerText = returnData(second)
}

function returnData(input) {
  return input >= 10 ? input : `0${input}`
}