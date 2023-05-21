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
    fitText()
}

function displayNumber(number)
{
    display.textContent = number;
    fitText()
}

function clickNumberButton(number)
{
    if (!appendDigits)
    {
        displayNumber(number);
        operatorPressedLast = false;
        appendDigits = true;
    }
    else
    {
        addNumberToDisplay(number);
    }
}

function reset()
{
    displayNumber(0);
    appendDigits = false;
    operatorPressedLast = false;
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
    appendDigits = false;
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
    appendDigits = false;
}

function backspaceDisplay()
{
    let displayNumberString = getDisplayNumber().toString();
    if (displayNumberString.length > 1)
    {
        displayNumber(displayNumberString.slice(0, -1));
    }
    else
    {
        displayNumber(0);
    }
}

function onDecimalButton()
{
    let displayNumberString = getDisplayNumber().toString();
    if (displayNumberString.includes(".")) return;
    if (appendDigits)
    {
        displayNumber(displayNumberString + ".");
    }
    else
    {
        displayNumber("0.");
        appendDigits = true;
    }
}

function sqrtDisplay()
{
    let display = getDisplayNumber();
    displayNumber(Math.sqrt(display));
    appendDigits = false;
}

function percentDisplay()
{
    displayNumber(getDisplayNumber() / 100);
    appendDigits = false;
}

function onKeyPressed(e)
{
    const keyCode = e.code;
    switch (keyCode)
    {
        case "KeyC":
            reset();
            break;
        case "Slash":
            onPressOperator("/");
            break;
        case "KeyX":
            onPressOperator("x");
            break;
        case "Minus":
            onPressOperator("-");
            break;
        case "Equal":
            e.shiftKey ? onPressOperator("+") : calculateAndDisplay();
            console.log(e.shiftKey);
            break;
        case "KeyD":
            backspaceDisplay();
            break;
        case "Period":
            onDecimalButton();
            break;
        case "KeyS":
            sqrtDisplay();
            break;
        case "Digit5":
            if (e.shiftKey) percentDisplay(); 
            break;
        case "Enter":
            calculateAndDisplay();
            break;
        default:
            break;
    }
    // Digits
    if (!e.shiftKey && keyCode.startsWith("Digit"))
    {
        const number = +keyCode.slice(5);
        clickNumberButton(number);
    }
}

function addEvents()
{
    // Numbers
    for (let i = 0; i <= 9; i++)
    {
        const button = document.getElementById(i);
        button.addEventListener("click", () => clickNumberButton(i));
    }
    // Operators
    document.getElementById("clear-button").addEventListener("click", reset);
    document.getElementById("divide-button").addEventListener("click", () => onPressOperator("/"));
    document.getElementById("multiply-button").addEventListener("click", () => onPressOperator("x"));
    document.getElementById("subtract-button").addEventListener("click", () => onPressOperator("-"));
    document.getElementById("add-button").addEventListener("click", () => onPressOperator("+"));
    document.getElementById("delete-button").addEventListener("click", backspaceDisplay);
    document.getElementById("decimal-button").addEventListener("click", onDecimalButton);
    document.getElementById("sqrt-button").addEventListener("click", sqrtDisplay);
    document.getElementById("percent-button").addEventListener("click", percentDisplay);
    document.querySelector(".equals-button").addEventListener("click", calculateAndDisplay);
    // Resizing
    window.addEventListener("resize", fitText, true);
    // Input
    window.addEventListener("keypress", onKeyPressed);
}

function fitText()
{
    const maxFontSize = 128;

    let width = display.clientWidth;
    let contentWidth = display.scrollWidth;
    // get fontSize
    let fontSize = parseInt(window.getComputedStyle(display, null).getPropertyValue('font-size'),10);
    // if content's width is bigger then elements width - overflow
    if (contentWidth > width)
    {
        fontSize = Math.ceil(fontSize * width / contentWidth, 10);
        fontSize =  fontSize > maxFontSize ? fontSize = maxFontSize : fontSize - 1;
        display.style.fontSize = fontSize+'px';   
    }
    else
    {
        // content is smaller then width... let's resize in 1 px until it fits 
        while (contentWidth === width && fontSize < maxFontSize)
        {
            fontSize = Math.ceil(fontSize) + 1;
            fontSize = fontSize > maxFontSize  ? fontSize = maxFontSize  : fontSize;
            display.style.fontSize = fontSize + 'px';   
            // update widths
            width = display.clientWidth;
            contentWidth = display.scrollWidth;
            if (contentWidth > width)
            {
                display.style.fontSize = fontSize - 1 + 'px'; 
            }
        }
    }
}

let num1 = null, operator = null, num2 = null;

const display = document.querySelector(".output");

let operatorPressedLast = false;
let appendDigits = false;

addEvents();
fitText();