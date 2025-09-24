const keys = document.querySelector(".calculator-buttons");
const display = document.querySelector(".calculator-screen");

let expression = "0";
let hasResult = false;

keys.addEventListener("click", (event) => {
  const { target } = event;

  if (!target.matches("button")) {
    return;
  }

  const value = target.value;

  if (value === "=") {
    handleEqualSign();
    return;
  }

  if (value === "all-clear") {
    resetCalculator();
    return;
  }

  if (value === "clear-last") {
    clearLastDigit();
    return;
  }

  if (hasResult) {
    expression = "";
    hasResult = false;
  }

  if (
    value === "sin" ||
    value === "cos" ||
    value === "tan" ||
    value === "log" ||
    value === "ln"
  ) {
    expression += `${value}(`;
  } else if (value === "^") {
    expression += "**";
  } else if (value === "sqrt") {
    expression += "sqrt(";
  } else if (value === "pi") {
    expression += "pi";
  } else if (value === "e") {
    expression += "e";
  } else if (value === "!") {
    expression += "!";
  } else {
    if (expression === "0") {
      expression = value;
    } else {
      expression += value;
    }
  }
  updateDisplay();
});

function handleEqualSign() {
  try {
    const result = math.evaluate(expression);
    expression = String(result);
    hasResult = true;
  } catch (e) {
    expression = "Erro";
    hasResult = true;
  }
  updateDisplay();
}

function resetCalculator() {
  expression = "0";
  hasResult = false;
  updateDisplay();
}

function clearLastDigit() {
  if (expression.length > 1 && expression !== "Erro") {
    expression = expression.slice(0, -1);
  } else {
    expression = "0";
  }
  hasResult = false;
  updateDisplay();
}

function updateDisplay() {
  display.value = expression;
}

document.addEventListener("DOMContentLoaded", (event) => {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-theme");
    themeToggle.textContent = "Modo Claro";
  }

  themeToggle.addEventListener("click", () => {
    if (body.classList.contains("dark-theme")) {
      body.classList.remove("dark-theme");
      themeToggle.textContent = "Modo Escuro";
      localStorage.setItem("theme", "light");
    } else {
      body.classList.add("dark-theme");
      themeToggle.textContent = "Modo Claro";
      localStorage.setItem("theme", "dark");
    }
  });
});
