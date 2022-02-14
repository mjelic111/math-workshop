const NUMBER_RANGE = 10
const task = {
    num1: 3,
    op: "+",
    num2: 4,
    num3: "?",
    result: 7
}
const score = {
    total: 0,
    correct: 0
}
var imageTimeout = setTimeout(() => {
    document.getElementById("show-score").style.visibility = 'hidden'

}, 0);
const history = [0, 0, 0, NUMBER_RANGE]

function submitResult(number) {
    clearTimeout(imageTimeout)
    imageTimeout = setTimeout(() => {
        document.getElementById("show-score").style.visibility = 'hidden'
    }, 3000);
    if (number == task.result) {
        console.info("Correct!")
        document.getElementById("show-score").src = './img/accept.png'
        document.getElementById("show-score").style.visibility = null
        score.correct++
    } else {
        console.info(`Incorrect: result is ${task.result} `)
        document.getElementById("show-score").src = './img/cancel.png'
        document.getElementById("show-score").style.visibility = null
    }
    score.total++
    renderTask()
    console.info(score);
}

function nextTask() {
    const numFloor = NUMBER_RANGE + 1
    const isSum = Math.floor(Math.random() * 2) == 0
    task.op = isSum ? "+" : "-"
    do {
        task.num1 = Math.floor(Math.random() * (numFloor))
    } while (task.num1 == 0 || task.num1 == NUMBER_RANGE || history.indexOf(task.num1) !== -1)

    task.num2 = isSum ? Math.floor(Math.random() * (numFloor - task.num1)) : Math.floor(Math.random() * task.num1)
    if (task.num2 == 0) {
        task.num2 = isSum ? Math.floor(Math.random() * (numFloor - task.num1)) : Math.floor(Math.random() * task.num1)
    }

    task.result = isSum ? (task.num1 + task.num2) : (task.num1 - task.num2)
    task.num3 = task.result
    // save to history
    history.shift()
    history.push(task.num1)
    console.log(history)

    // decide what to hide
    var hideNum = Math.floor(Math.random() * (3) + 1)
    if (hideNum == 1) {
        task.result = task.num1
        task.num1 = '?'
    } else if (hideNum == 2) {
        task.result = task.num2
        task.num2 = '?'
    } else {
        task.result = task.num3
        task.num3 = '?'
    }
}

function renderTask() {
    console.info("init...")
    nextTask()
    document.getElementById("num1").innerText = task.num1
    document.getElementById("op").innerText = task.op
    document.getElementById("num2").innerText = task.num2
    document.getElementById("res").innerText = task.num3
    document.getElementById("score").innerText = `${score.correct}/${score.total}`
}

window.onload = () => renderTask()

