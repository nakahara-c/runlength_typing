const alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('');
const numbers = '123456789'.split('');
let word = ''; let c = 0; let r = 0;
let timerArray = [];
let timer = document.getElementById('timer');
let countTypes = document.getElementById('countTypes');
let countChars = document.getElementById('countChars');
let kpm = document.getElementById('kpm');
let cpm = document.getElementById('cpm');
let char = document.getElementById('char');
let num = document.getElementById('num');
let wordBox = document.getElementById('wordbox');

let time = 0;

window.addEventListener('keydown', startType);

function startType(e) {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {

        timer.textContent = "0.0";
        countChars.textContent = "0";
        countTypes.textContent = "0";
        kpm.textContent = "0";
        cpm.textContent = "0";
        time = 0;

        makeWord();
        stopInterval();
        timerArray.push(setInterval(startTimer, 100));
        window.addEventListener('keydown', judgeKeys);
    }
}

function makeWord() {
    word = '';
    c = 0;
    r = 0;
    let cnt = 0
    let tmp = '';
    while (word.length < 400) {
        c = Math.floor(Math.random() * 26);
        r = Math.floor(Math.random() * 9) + 1;
        if (tmp !== alphabets[c]) {
            word += alphabets[c].repeat(r);
            tmp = alphabets[c];
            cnt += 1;
        }

    }
    word = word.slice(0,400);
    const box = document.getElementById('wordbox');
    box.value = word.slice(0,50);
    document.getElementById('allTypes').textContent = cnt * 2;
}


function startTimer () {

    let nowTime = time;
    nowTime = (nowTime + 0.1);
    timer.textContent = nowTime.toFixed(1);
    time = nowTime;

}

function stopInterval() {
    if (timerArray.length > 0) {
        clearInterval(timerArray.shift());
    }
}

function judgeKeys(e) {
    e.preventDefault();

    let c = char.textContent;
    let n = num.textContent;

    if (alphabets.indexOf(e.key) !== -1) {
        char.textContent = e.key;
        num.textContent = '';
    } else if (numbers.indexOf(e.key) !== -1) {
        correctType(c, e.key);
        char.textContent = '';
        num.textContent = e.key;
    }

/*
    if (e.key === word.at(0)) {
        correctType();
    }

*/
}

function correctType(ch, nu) {
    console.log(ch, nu);
    if (word.slice(0,nu) === ch.repeat(nu)) {
        word = word.slice(nu);
        wordBox.value = word;

        countChars.textContent = Number(countChars.textContent) + Number(nu);

        cpm.textContent = (countChars.textContent / time * 60).toFixed(0);


    }
}