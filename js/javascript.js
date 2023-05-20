function add(a, b)
{
    return a + b;
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
        case "add":
            return add(num1, num2);
        case "subtract":
            return subtract(num1, num2);
        case "multiply":
            return multiply(num1, num2);
        case "divide":
            return divide(num1, num2);
        default:
            throw Error("Incorrect operator!");
    }
}

function displayNumber(number)
{
    if (display.textContent !== "0")
    {
        display.textContent += number;
    }
    else
    {
        display.textContent = number;
    }
}

function clickNumberButton(number)
{
    displayNumber(number);
}

function clearOutput()
{
    display.textContent = "0";
}

function addEvents()
{
    // Numbers
    for (let i = 0; i <= 9; i++)
    {
        const button = document.getElementById(i);
        button.addEventListener("click", () => clickNumberButton(i));
    }
    document.getElementById("clear-button").addEventListener("click", clearOutput);
}

let num1, operator, num2;

const display = document.querySelector(".output");

addEvents();