class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear();
    }
    clear(){
        this.currentOperand = ""
        this.previousOperand = ""
        this.operation = undefined
    };
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);

    }
    appendNumber(number){
        if(number === "." && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation) {
        if(this.currentOperand === "") return;
        if(this.previousOperand !== ""){
            this.compute();
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ""
    }
    compute(){
        let computation 
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+': 
                computation = prev + current
                break 
            case '-':
                computation = prev - current
                break 
            case "X":
                computation = prev * current 
                break
            case "÷":
                computation = prev / current
                break
            case "%": 
                computation = prev * (current / 100); 
                break
            case "x*":
                computation = Math.pow(prev, current)
                break        
            default:
                return    

        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ""
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split(".")[0])
        const decimalDigits = stringNumber.split(".")[1]
        let integerDisplay 
        if(isNaN(integerDigits)){
            integerDisplay = ""
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits: 0})
        }
        if (decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay;
        }
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = 
            this.getDisplayNumber(this.currentOperand)
        if (this.operation != null){
            this.previousOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = "";
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]'); 
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]'); 
const allClearButton = document.querySelector('[data-allClear]');
const deleteButton = document.querySelector(['[data-delete]']);
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]'); 


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement); 

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
})
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay()
    })
})


equalsButton.addEventListener("click", button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener("click", button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener("click", button =>{
    calculator.delete();
    calculator.updateDisplay();
})

document.addEventListener("keydown", inputKey);

function inputKey(e) {
  const keyPress = e.key;
  const keyPressCode = e.keyCode;
  const screen = document.getElementsByClassName("input")[0];
  /* 
  96 to 105 = 0 to 9
  48 to 57 = 0 to 9
  110 = .
  */
  if (
    (keyPressCode >= 96 && keyPressCode <= 105) ||
    (keyPressCode >= 48 && keyPressCode <= 57) ||
    (keyPressCode == 110 &&
      screen.textContent.length > 0 &&
      !screen.textContent.includes(".")) ||
    (keyPressCode == 190 &&
      screen.textContent.length > 0 &&
      !screen.textContent.includes("."))
  ) {
    let selectAudioNumber = Math.floor(Math.random() * (3 - 1 + 1) + 1);
    let audio = new Audio(`audio/tecla-${selectAudioNumber}.mp3`);
    calculator.appendNumber(keyPress);
    calculator.updateDisplay();
    audio.play();
    audio.volume = validateButton();
    console.log((audio.volume = validateButton()));
  }

  /*
  8 = delete key
  13 = enter
  */
  if (keyPressCode == 8) {
    calculator.delete();
    calculator.updateDisplay();
    soundOperate();
  }
  if (keyPressCode == 13) {
    calculator.compute();
    calculator.updateDisplay();
    soundOperate();
  }

  /* 
  111 = /
  109 = -  
  107 = + 
  106 = *
  */
  if (keyPressCode == 111) {
    let aux = "÷";
    calculator.chooseOperation(aux);
    calculator.updateDisplay();
    soundOperate();
  }
  if (keyPressCode == 109 || keyPressCode == 107) {
    calculator.chooseOperation(keyPress);
    calculator.updateDisplay();
    soundOperate();
  }
  if (keyPressCode == 106) {
    let aux = "X";
    calculator.chooseOperation(aux);
    calculator.updateDisplay();
    soundOperate();
  }
  console.log(keyPressCode);
  console.log(keyPress);
}

function soundOperate() {
  let selectAudioOperate = Math.floor(Math.random() * (5 - 4 + 1) + 4);
  let audio = new Audio(`audio/tecla-${selectAudioOperate}-operate.mp3`);
  audio.play();
}
var optionSound = document.getElementById("sound");

optionSound.addEventListener("click", enableOrDisableSound);
function enableOrDisableSound() {
  if (optionSound.textContent == "On 🔊") {
    optionSound.textContent = "Off 🔇";
  } else {
    optionSound.textContent = "On 🔊";
  }
}

function validateButton() {
  if (optionSound.textContent == "On 🔊") {
    return 0.4;
  } else {
    return 0;
  }
}

validateButton();