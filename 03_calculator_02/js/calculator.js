"use strict";

const elementSelect = document.getElementById("calcType");
const elementNum1 = document.getElementById("num1");
const elementNum2 = document.getElementById("num2");
const elementResult = document.getElementById("result");

elementSelect.addEventListener("change", calculate);
elementNum1.addEventListener("change", calculate);
elementNum2.addEventListener("change", calculate);

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
