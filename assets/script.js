let hour = 0
let minute = 0
let second = 0
let millisecond = 0
let cron
let startTime
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
    minLimite.disabled = false
  }
}

function start() {
  if (minLimite.value > 0) {
    startTime = new Date();
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
  millisecond = (new Date()) - startTime;

  second = Math.floor(millisecond/1000);
  millisecond %= 1000;

  minute = Math.floor(second/60);
  second %= 60;

  hour = Math.floor(minute/60);
  minute %= 60;

  document.getElementById('hour').innerText = returnData(hour)
  document.getElementById('minute').innerText = returnData(minute)
  document.getElementById('second').innerText = returnData(second)
}

function returnData(input) {
  return input >= 10 ? input : `0${input}`
}