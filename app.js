const startBtn = document.querySelector("#start") //определяем кнопку "начало"
const screens = document.querySelectorAll('.screen')//определяем экраны
const timeList = document.querySelector('#time-list')//список кнопок со временем
const timeEl = document.querySelector('#time')//кнопка со временем
const board = document.querySelector('#board')//игровое поле
const colors = ['yellow', 'blue', 'red', 'orange', 'green', 'pink']
let time = 0 //начальное время
let score = 0 //начальный счет
startBtn.addEventListener('click', (event) => { //при клике по кнопке "начало" выполняется функция
    event.preventDefault()
    screens[0].classList.add('up') //1-й экран(из массива) сдвигается вверх
})
timeList.addEventListener('click', event => { //при клике по кнопке со временем выполняется
    if (event.target.classList.contains('time-btn')) { //если событие - кнопка, то
    time = parseInt(event.target.getAttribute('data-time')) //времени присваивается числовое значение атрибута
    screens[1].classList.add('up') //2-й экран(из массива) сдвигается вверх
    startGame() //начинается игра
}
})
board.addEventListener('click', event => { //слушатель события по игровому полю
    if (event.target.classList.contains('circle')) { //если событие - круг, то
        score++ //счет увеличивается на 1
        event.target.remove() //пораженный круг пропадает
        createRandomCircle() //создается случайный круг
    }
})
function startGame() {
    setInterval(decreaseTime, 1000) //устанавливается интервал считывателя события - 1мс
    createRandomCircle() //создается случайный круг
    setTime(time) //устанавливается время (соласно нажатой кнопке)
}
function decreaseTime() { //считыватель события по времени
    if (time === 0) { //если время = 0, то конец игры
        finishGame()
    } else {
        let current = --time //иначе время уменьшается на 1
        if (current < 10) { //если значение меньше 10,
            current = `0${current}` //то к значению добавляется 0 (00:09)
        }
        setTime(current) //устанавливается время
    }
}
function setTime(value) { 
    timeEl.innerHTML = `00:${value}`
}
function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Счет: <span class="primary">${score}</span>
    </h1>`
}
function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const color = getRandomColor()
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.backgroundColor = `${color}`

    board.append(circle)
}
function getRandomNumber(min, max) {
    return Math.round(Math.random()* (max - min) + min)
}
function getRandomColor() {
    const index = Math.floor(Math.random()*colors.length)
    return colors[index]
}
