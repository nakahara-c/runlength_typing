'use strict';

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
let progress = document.getElementById('progress');
let wordBox = document.getElementById('wordbox');
let time = 0;

let startTime;
let intervalId;

let isChrNum = true;

const L = 400;

const reverseButton = document.getElementById('reverse');
reverseButton.addEventListener('click', () => {
    
    reverseButton.textContent === 'num⇔chr' 
    ? reverseButton.textContent = 'chr⇔num'
    : reverseButton.textContent = 'num⇔chr';

    isChrNum ? isChrNum = false : isChrNum = true;

});

window.addEventListener('keydown', startType);

function startType(e) {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {

        timer.textContent = "0.0";
        countChars.textContent = "0";
        countTypes.textContent = "0";
        kpm.textContent = "0";
        cpm.textContent = "0";
        char.textContent = "";
        num.textContent = "";
        progress.value = 0;
        
        time = 0;

        makeWord();
        
        clearInterval(intervalId);

        removeJudgeKeysListener();
        
        startTime = performance.now();
        intervalId = setInterval(startTimer, 100);

        window.addEventListener('keydown', judgeKeys);
    }
}

function makeWord() {
    word = '';
    c = 0;
    r = 0;
    let cnt = 0
    let tmp = '';
    while (word.length < L) {
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

    let elapsedTime = (performance.now() - startTime) / 1000;
    timer.textContent = elapsedTime.toFixed(1);
    time = elapsedTime.toFixed(1);

}

function stressFunc() {
    let st = Date.now();
    while (Date.now() - st < 300) {
    }
}

function judgeKeys(e) {
    e.preventDefault();

    let ch = char.textContent;
    let n = num.textContent;

    if (isChrNum) {

        if (alphabets.includes(e.key)) {
            char.textContent = e.key;
            num.textContent = '';
        } else if (numbers.includes(e.key)) {
            correctType(ch, e.key);
            char.textContent = '';
            num.textContent = e.key;
        }

    } else {

        if (numbers.includes(e.key)) {
            char.textContent = '';
            num.textContent = e.key;
        } else if (alphabets.includes(e.key)) {
            correctType(e.key, n);
            char.textContent = e.key;
            num.textContent = '';
        }

    }


}

function correctType(ch, nu) {

    if (word.slice(0,nu) === ch.repeat(nu)) {
        word = word.slice(nu);
        wordBox.value = word;

        countTypes.textContent = Number(countTypes.textContent) + 2;
        kpm.textContent = (countTypes.textContent / time * 60).toFixed(0);

        countChars.textContent = Number(countChars.textContent) + Number(nu);
        cpm.textContent = (countChars.textContent / time * 60).toFixed(0);

        progress.value = countChars.textContent;

        if (word.length === 0) finishType();

    }
}

function finishType() {
    clearInterval(intervalId);
    removeJudgeKeysListener();
    makeTweet();
}

function makeTweet () {

    const tweetButton = document.getElementById('tweet');
    
    const t = timer.textContent;
    const c = cpm.textContent;
    const k = kpm.textContent;
    const ct = countTypes.textContent;
    const a = document.getElementById('allTypes').textContent;

    const hashTags = "ランレングス圧縮タイピング"
    const tweet = `${t}sec (${ct}/${a}keys) ${c}CPM,${k}KPM`;
    const url = 'https://nkhr-c.com/runlengthtyping/index.html';
    const tweetText = `https://twitter.com/intent/tweet?ref_src=twsrc&text=${tweet}&hashtags=${hashTags}&url=${url}`;
    tweetButton.href = tweetText;

    addHistory(tweet, tweetText);
}

function addHistory (tweet, tweetURL) {
    const newResult = document.createElement('div');
    newResult.style.margin = '1em';
    newResult.innerHTML = `${tweet}&nbsp;<a target="_blank" href="${tweetURL}">ツイート</a>`;

    const info = document.getElementById('info');
    info.appendChild(newResult);
}

function removeJudgeKeysListener() {
    window.removeEventListener('keydown', judgeKeys);
}
