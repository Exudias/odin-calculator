function add(a, b)
{
    return +a + +b;
}

function subtract(a, b)
{
    return a - b;
}

function multiply(a, b)
{
    return a * b;
}

function divide(a, b)
{
    return a / b;
}

function operate(num1, operator, num2)
{
    switch(operator)
    {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "x":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            throw Error("Incorrect operator!");
    }
}

function addNumberToDisplay(number)
{
    if (display.textContent !== "0")
    {
        display.textContent += number;
    }
    else
    {
        displayNumber(number);
    }
}

function displayNumber(number)
{
    display.textContent = number;
}

function clickNumberButton(number)
{
    if (operatorPressedLast)
    {
        displayNumber(number);
        operatorPressedLast = false;
    }
    else
    {
        addNumberToDisplay(number);
    }
}

function reset()
{
    display.textContent = "0";
    num1 = num2 = operator = null;
}

function onPressOperator(operatorPressed)
{
    if (operator !== null) // already doing an operation
    {
        calculateAndDisplay();
        num1 = getDisplayNumber();
    }
    else
    {
        num1 = getDisplayNumber();
    }
    operator = operatorPressed;
    operatorPressedLast = true;
}

function getDisplayNumber()
{
    return +display.textContent;
}

function calculateAndDisplay()
{
    if (num1 === null || operatorPressedLast)
        return;
    num2 = getDisplayNumber();
    const result = operate(num1, operator, num2);
    displayNumber(result);
    num1 = operator = num2 = null;
}

function addEvents()
{
    // Numbers
    for (let i = 0; i <= 9; i++)
    {
        const button = document.getElementById(i);
        button.addEventListener("click", () => clickNumberButton(i));
    }
    document.getElementById("clear-button").addEventListener("click", reset);
    document.getElementById("divide-button").addEventListener("click", () => onPressOperator("/"));
    document.getElementById("multiply-button").addEventListener("click", () => onPressOperator("x"));
    document.getElementById("subtract-button").addEventListener("click", () => onPressOperator("-"));
    document.getElementById("add-button").addEventListener("click", () => onPressOperator("+"));
    document.querySelector(".equals-button").addEventListener("click", calculateAndDisplay);
}

let num1 = null, operator = null, num2 = null;

const display = document.querySelector(".output");

let operatorPressedLast = false;

addEvents();