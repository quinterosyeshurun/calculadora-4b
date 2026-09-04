const display = document.getElementById('display');
let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetDisplay = false;

function updateDisplay() {
  display.textContent = currentInput;
}

function appendNumber(number) {
  if (currentInput === '0' || shouldResetDisplay) {
    currentInput = number === '.' ? '0.' : number;
    shouldResetDisplay = false;
  } else {
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
  }
  updateDisplay();
}

function appendOperator(op) {
  if (op === 'sqrt') {
    const value = parseFloat(currentInput);
    currentInput = value < 0 ? 'Error' : String(Math.sqrt(value));
    shouldResetDisplay = true;
    updateDisplay();
    return;
  }

  if (op === '%') {
    const value = parseFloat(currentInput);
    currentInput = String(value / 100);
    shouldResetDisplay = true;
    updateDisplay();
    return;
  }

  if (operator !== null && !shouldResetDisplay) {
    calculate();
  }

  previousInput = currentInput;
  operator = op;
  shouldResetDisplay = true;
}

function calculate() {
  if (operator === null || shouldResetDisplay) return;

  let result = 0;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = current === 0 ? 'Error' : prev / current;
      break;
    default:
      return;
  }

  currentInput = String(result);
  operator = null;
  shouldResetDisplay = true;
  updateDisplay();
}

function clearDisplay() {
  currentInput = '0';
  previousInput = '';
  operator = null;
  shouldResetDisplay = false;
  updateDisplay();
}

function clearEntry() {
  currentInput = '0';
  updateDisplay();
}
