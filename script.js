
const display1 = document.querySelector(".prevOperation");
const display2 = document.querySelector(".input"); 
const numbers =  document.querySelectorAll(".number"); 
const decimal = document.querySelector(".decimal");
const operations = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");
const entryDelete = document.querySelector(".backspace"); 
const clear = document.querySelector(".delete"); 

let topNum = ""; 
let currNum = ""; 
let result = null;
let shouldResetScreen = false
