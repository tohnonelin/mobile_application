"use strict";
let prev_value = null;
let w_result = "";
let w_total = "";
let currentAudio = null;
let click_sound = new Audio("./sound/click.mp3");
let keyboard_array = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "c",
  "C",
  "Escape",
  "Backspace",
  "Delete",
  "+",
  "-",
  "*",
  "/",
  "=",
  "Enter",
];

const calclog = document.getElementById("calcLog");
const result = document.getElementById("result");
const buttons = document.getElementById("buttons");

buttons.addEventListener("click", (event) => {
  if (event.target.tagName !== "BUTTON") return;
  calculate(event.target.value);
});

document.addEventListener("keydown", (event) => {
  if (event === "Enter") event.preventDefault();

  if (keyboard_array.includes(event.key)) calculate(event.key);
});

function calculate(event_value) {
  soundControl(click_sound);
  console.log(
    "prev_value:",
    prev_value,
    "w_result:",
    w_result,
    "w_total:",
    w_total,
    "calclog:",
    calclog.textContent,
    "result",
    result.textContent
  );
  //const btn_value = event.target.value;

  if (
    event_value === "C" ||
    event_value === "c" ||
    event_value == "Escape" ||
    event_value === "Backspace" ||
    event_value === "Delete"
  ) {
    calclog.textContent = "";
    result.textContent = "";
    w_result = "";
    w_total = "";
  } else if (event_value === "=" || event_value === "Enter") {
    calclog.textContent = w_result;
    try {
      calclog.textContent = w_result;
      w_total = eval(w_result);
      result.textContent = w_total.toLocaleString("ja-JP");
    } catch {
      result.textContent = "Error";
    }
  } else {
    if (prev_value === "=" || prev_value === "Enter") {
      calclog.textContent = w_total;
      w_result = w_total;
    }
    w_result += event_value;
    result.textContent = w_result.toLocaleString("ja-JP");
    calclog.textContent += event_value;
  }
  prev_value = event_value;
  console.log(
    "prev_value:",
    prev_value,
    "w_result:",
    w_result,
    "w_total:",
    w_total,
    "calclog:",
    calclog.textContent,
    "result",
    result.textContent
  );
}

function soundControl(w_sound) {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  w_sound.play().catch((error) => {
    if (error.name !== "AbortError") {
      console.error("再生エラー:", error);
    }
  });
  currentAudio = w_sound;
}
