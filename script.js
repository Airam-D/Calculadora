const keys = document.querySelector(".calculator-buttons");
const display = document.querySelector(".calculator-screen");

let expression = "";
let hasOperator = false;
let hasResult = false;

keys.addEventListener("click", (event) => {
  const { target } = event;

  if (!target.matches("button")) {
    return;
  }

  const value = target.value;

  if (target.classList.contains("operator")) {
    handleOperator(value);
    return;
  }

  if (target.classList.contains("decimal")) {
    inputDecimal(value);
    return;
  }

  if (target.classList.contains("all-clear")) {
    resetCalculator();
    return;
  }

  if (target.classList.contains("clear-last")) {
    clearLastDigit();
    return;
  }

  if (target.classList.contains("equal-sign")) {
    handleEqualSign();
    return;
  }

  inputDigit(value);
});

function inputDigit(digit) {
  if (hasResult || expression === "Erro") {
    expression = "";
    hasResult = false;
  }

  if (expression === "0") {
    expression = digit;
  } else {
    expression += digit;
  }
  updateDisplay();
}

function inputDecimal(dot) {
  if (hasResult) {
    expression = "0.";
    hasResult = false;
    updateDisplay();
    return;
  }

  if (!expression.includes(dot)) {
    expression += dot;
  }
  updateDisplay();
}

function handleOperator(operator) {
  if (hasOperator) {
    const result = evaluateExpression(expression);
    expression = result === "Erro" ? "Erro" : String(result) + operator;
    updateDisplay();
  } else {
    expression += operator;
    hasOperator = true;
    updateDisplay();
  }
}

function handleEqualSign() {
  if (!hasOperator || hasResult) {
    return;
  }

  const result = evaluateExpression(expression);
  expression = String(result);
  hasOperator = false;
  hasResult = true;
  updateDisplay();
}

function evaluateExpression(expr) {
  const operatorMatch = expr.match(/[+\-*/]/);
  if (!operatorMatch) {
    return parseFloat(expr);
  }

  const operator = operatorMatch[0];
  const parts = expr.split(operator);

  const firstValue = parseFloat(parts[0]);
  const secondValue = parseFloat(parts[1]);

  if (isNaN(firstValue) || isNaN(secondValue)) {
    return "Erro";
  }

  switch (operator) {
    case "+":
      return firstValue + secondValue;
    case "-":
      return firstValue - secondValue;
    case "*":
      return firstValue * secondValue;
    case "/":
      if (secondValue === 0) return "Erro";
      return firstValue / secondValue;
  }
}

function resetCalculator() {
  expression = "";
  hasOperator = false;
  hasResult = false;
  updateDisplay();
}

function clearLastDigit() {
  if (expression.length > 0 && expression !== "Erro") {
    const lastChar = expression.slice(-1);

    if ("+-*/".includes(lastChar)) {
      hasOperator = false;
    }

    expression = expression.slice(0, -1);
    if (expression === "") {
      expression = "0";
    }
  }
  hasResult = false;
  updateDisplay();
}

function updateDisplay() {
  display.value = expression === "" ? "0" : expression;
}
