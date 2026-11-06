"use strict";

const timer = document.getElementById("timer");
const btn_start = document.getElementById("btn_start");
const btn_stop = document.getElementById("btn_stop");
const btn_reset = document.getElementById("btn_reset");

let currentAudio = null;
let startSound = new Audio("./sound/start.mp3");
let stop1Sound = new Audio("./sound/stop1.mp3");
let stop2Sound = new Audio("./sound/stop2.mp3");
let resetSound = new Audio("./sound/reset.mp3");

let startTime; // Startボタンクリック時の時刻
let timeoutid; // ID
let stopTime = 0; // Stopまでの経過時間
let targetTime = 0;
// ボタンを"初期"状態とする
setButtonStateInitial();
window.onload = function () { 
  let input;
  while (true) { 
    input = prompt("Enter number");
    if (input === null) {
      return;
    }
    else if (input.trim() === "") {
      alert("Please enter a number.");
    } 
    else if (!/^\d+$/.test(input.trim())) {
      alert("Please enter numbers only.");
    } 
    else {
      targetTime = Number(input);
      document.getElementById("target-time").textContent = targetTime;
      break;
    }
  } 
};
////////////////////////
// Startボタンクリック
////////////////////////
btn_start.addEventListener(
  "click",
  function () {
    // ボタンをタイマー"動作中"状態とする
    setButtonStateRunning();
    soundControl(startSound);
    startTime = Date.now();
    countUp();
  },
  false
);

////////////////////////
// Stopボタンクリック
////////////////////////
btn_stop.addEventListener(
  "click",
  function () {
    // タイマーを"停止中"状態とする
    //console.log("hello");
    setButtonStateStopped();
    clearTimeout(timeoutid); //setTimeout()でセットしたタイマーを解除する際に使用
    stopTime = Date.now() - startTime;
    let target1 = targetTime * 1000;
    let target2 = target1 + 999;
    if (stopTime >= target1 && stopTime <= target2) {
      soundControl(stop2Sound);
      document.body.style.backgroundImage = "url('img/fireworks.gif')";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundPosition = "center center";
      document.body.style.backgroundColor = "rgba(0,0,0,0)";
    } else {
      soundControl(stop1Sound);
    }
  },
  false
);
////////////////////////
// Resetボタンクリック
////////////////////////
btn_reset.addEventListener("click", function () {
  // タイマーを停止
  clearTimeout(timeoutid);

  // 背景を初期状態に戻す
  document.body.style.backgroundImage = "";
  document.body.style.backgroundSize = "";
  document.body.style.backgroundRepeat = "";
  document.body.style.backgroundPosition = "";
  document.body.style.backgroundColor = "rgba(233, 168, 227, 0.6)";

  // タイマーをリセット
  timer.textContent = "00:00.000";
  stopTime = 0;
  startTime = 0;

  // ボタンを初期状態にする
  setButtonStateInitial();

  // リセット音
  soundControl(resetSound);

  // 新しい目標時間を入力
  setTimeout(() => {
    let input;
    while (true) { 
      input = prompt("Enter number");
      if (input === null) {
        return;
      } 
      else if (input.trim() === "") {
        alert("Please enter a number.");
      } 
      else if (!/^\d+$/.test(input.trim())) {
        alert("Please enter numbers only.");
      }
      else{
        break;
      }
    }
    targetTime = Number(input);
    document.getElementById("target-time").textContent = targetTime;
  
  },100);
});


function countUp() {
  const d = new Date(Date.now() - startTime + stopTime);
  /* padStart()で２桁固定表示とする */
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  const ms = String(d.getMilliseconds()).padStart(3, "0");
  /* 描画 */
  timer.textContent = `${m}:${s}.${ms}`;
  timeoutid = setTimeout(() => {
    //再帰呼び出し
    countUp();
  }, 10);
}

// 初期 または Reset後
function setButtonStateInitial() {
  btn_start.classList.remove("js-inactive");
  btn_stop.classList.add("js-inactive");
  btn_reset.classList.add("js-inactive");
  btn_start.classList.remove("js-unclickable");
  btn_stop.classList.add("js-unclickable");
  btn_reset.classList.add("js-unclickable");
}

// 状態:タイマー動作中
function setButtonStateRunning() {
  timer.classList.add("timer-fontColor_hidden"); //時間を見えなくする
  btn_start.classList.add("js-inactive"); // 非活性
  btn_stop.classList.remove("js-inactive"); // 活性
  btn_reset.classList.add("js-inactive"); // 非活性
  btn_start.classList.add("js-unclickable");
  btn_stop.classList.remove("js-unclickable");
  btn_reset.classList.add("js-unclickable");
}

// 状態:タイマー停止中
function setButtonStateStopped() {
  timer.classList.remove("timer-fontColor_hidden"); //時間を見えるようにする
  timer.classList.add(".timer_appear"); //時間をゆっくり表示
  btn_start.classList.add("js-inactive"); // 活性
  btn_stop.classList.add("js-inactive"); // 非活性
  btn_reset.classList.remove("js-inactive"); // 活性
  btn_start.classList.add("js-unclickable");
  btn_stop.classList.add("js-unclickable");
  btn_reset.classList.remove("js-unclickable");
}

function soundControl(w_sound) {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  w_sound.play();
  currentAudio = w_sound;
}
