let calc = {
    display: '0',
    operand1: null,
    operand2: false,
    operator: null
}

function inputDigit(digit) {
    const { display, operand2 } = calc;

    if (operand2 === true) {
        calc.display = digit;
        calc.operand2 = false;
    }
    else {
        calc.display = display === '0' ? digit : display + digit;
    }

    console.log(calc);
}

function inputDecimal(dot) {

    if (!calc.display.includes(dot)) {
        calc.display += dot;
    }
}

function handleOperator(next) {
    const { operand1, display, operator } = calc;
    const inputValue = parseFloat(display);
    if (operand1 == null) {
        calc.operand1 = inputValue;
        console.log(operand1);
    } else if (operator) {
        const result = performCalc[operator](operand1, inputValue)
        console.log(result)
        calc.display = String(result);
        calc.operand1 = result;
    }
    calc.operand2 = true;
    calc.operator = next;
    console.log("calc " , calc);
}

const performCalc = {
    '/': (operand1, operand2) => operand1 / operand2,
    '*': (operand1, operand2) => operand1 * operand2,
    '+': (operand1, operand2) => operand1 + operand2,
    '-': (operand1, operand2) => operand1 - operand2,
    '=': (operand1, operand2) =>  operand2 

}
const keys = document.querySelector('.keys');

keys.addEventListener('click', (event) => {
    const { target } = event;

    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay()
        return;
    }

    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('clear')) {

        return;
    }

    inputDigit(target.value);
    updateDisplay();
    return;

});


function updateDisplay() {
    const display = document.querySelector('.screen');
    display.value = calc.display;
}

updateDisplay();