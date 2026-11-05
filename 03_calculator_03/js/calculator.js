"use strict";

const elementSelect = document.getElementById("calcType");
const elementNum1 = document.getElementById("num1");
const elementNum2 = document.getElementById("num2");
const elementResult = document.getElementById("result");
const elementEqual = document.getElementById("btnEqual");

elementSelect.addEventListener("change", clear);
elementNum1.addEventListener("change", clear);
elementNum2.addEventListener("change", clear);
elementEqual.addEventListener("click", calculate);

function calculate() {
  let num1 = Number(elementNum1.value);
  let num2 = Number(elementNum2.value);
  let calcType = elementSelect.value;
  let result;

  switch (calcType) {
    case "type-add":
      result = num1 + num2;
      break;
    case "type-substract":
      result = num1 - num2;
      break;
    case "type-multiply":
      result = num1 * num2;
      break;
    case "type-divide":
      result = num1 / num2;
      break;
  }
  elementResult.innerHTML = result;
}

function clear() {
  elementResult.innerHTML = "";
}
