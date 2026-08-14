/**
 * script.js – Temperature Converter
 * OIBSIP Web Dev & Designing Internship — Level 1 Task 3
 *
 * Stack: Vanilla JavaScript (ES6+), no external libraries.
 *
 * Supported conversions (all routed through Celsius as the base):
 *   Celsius ↔ Fahrenheit
 *   Celsius ↔ Kelvin
 *   Fahrenheit ↔ Kelvin  (via Celsius)
 *
 * Physical constraint enforced:
 *   No value below absolute zero (0 K / −273.15 °C / −459.67 °F).
 */

'use strict';

/* ════════════════════════════════════════════════════════════
   1. CONVERSION FORMULAE (pure functions — no side effects)
   ════════════════════════════════════════════════════════════ */

/**
 * Convert any unit to Celsius (intermediate step).
 * @param {number} value
 * @param {string} fromUnit  'celsius' | 'fahrenheit' | 'kelvin'
 * @returns {number} temperature in Celsius
 */
function toCelsius(value, fromUnit) {
  switch (fromUnit) {
    case 'celsius':    return value;
    case 'fahrenheit': return (value - 32) * (5 / 9);
    case 'kelvin':     return value - 273.15;
    default:           throw new Error(`Unknown unit: ${fromUnit}`);
  }
}

/**
 * Convert from Celsius to any target unit.
 * @param {number} celsius
 * @param {string} toUnit  'celsius' | 'fahrenheit' | 'kelvin'
 * @returns {number} temperature in the target unit
 */
function fromCelsius(celsius, toUnit) {
  switch (toUnit) {
    case 'celsius':    return celsius;
    case 'fahrenheit': return celsius * (9 / 5) + 32;
    case 'kelvin':     return celsius + 273.15;
    default:           throw new Error(`Unknown unit: ${toUnit}`);
  }
}

/**
 * Master converter: fromUnit → toUnit.
 * @param {number} value
 * @param {string} fromUnit
 * @param {string} toUnit
 * @returns {number}
 */
function convertTemperature(value, fromUnit, toUnit) {
  const celsius = toCelsius(value, fromUnit);
  return fromCelsius(celsius, toUnit);
}

/* ════════════════════════════════════════════════════════════
   2. ABSOLUTE-ZERO THRESHOLD (in each unit)
   ════════════════════════════════════════════════════════════ */
const ABSOLUTE_ZERO = {
  celsius:    -273.15,
  fahrenheit: -459.67,
  kelvin:      0,
};

/**
 * Check if a value (in a given unit) is below absolute zero.
 * @param {number} value
 * @param {string} unit
 * @returns {boolean}
 */
function isBelowAbsoluteZero(value, unit) {
  return value < ABSOLUTE_ZERO[unit];
}

/* ════════════════════════════════════════════════════════════
   3. UNIT METADATA (display labels & symbols)
   ════════════════════════════════════════════════════════════ */
const UNIT_META = {
  celsius:    { label: 'Celsius',    symbol: '°C', badge: '°C' },
  fahrenheit: { label: 'Fahrenheit', symbol: '°F', badge: '°F' },
  kelvin:     { label: 'Kelvin',     symbol: 'K',  badge: 'K'  },
};

/* Conversion formula strings for display */
function getFormulaString(fromUnit, toUnit) {
  const key = `${fromUnit}->${toUnit}`;
  const formulas = {
    'celsius->fahrenheit':    '°F = (°C × 9/5) + 32',
    'fahrenheit->celsius':    '°C = (°F − 32) × 5/9',
    'celsius->kelvin':        'K  = °C + 273.15',
    'kelvin->celsius':        '°C = K − 273.15',
    'fahrenheit->kelvin':     'K  = (°F − 32) × 5/9 + 273.15',
    'kelvin->fahrenheit':     '°F = (K − 273.15) × 9/5 + 32',
    'celsius->celsius':       'Same unit — no conversion needed',
    'fahrenheit->fahrenheit': 'Same unit — no conversion needed',
    'kelvin->kelvin':         'Same unit — no conversion needed',
  };
  return formulas[key] || '';
}

/* ════════════════════════════════════════════════════════════
   4. DOM REFERENCES
   ════════════════════════════════════════════════════════════ */
const tempInput      = document.getElementById('temp-input');
const inputUnitBadge = document.getElementById('input-unit-badge');
const inputError     = document.getElementById('input-error');
const convertBtn     = document.getElementById('convert-btn');
const resetBtn       = document.getElementById('reset-btn');
const swapBtn        = document.getElementById('swap-btn');
const resultPanel    = document.getElementById('result-panel');
const resultInner    = document.getElementById('result-inner');

/* All unit toggle buttons */
const fromBtns = document.querySelectorAll('.unit-btn[data-role="from"]');
const toBtns   = document.querySelectorAll('.unit-btn[data-role="to"]');

/* ════════════════════════════════════════════════════════════
   5. APPLICATION STATE
   ════════════════════════════════════════════════════════════ */
let state = {
  fromUnit: 'celsius',
  toUnit:   'fahrenheit',
};

/* ════════════════════════════════════════════════════════════
   6. UNIT BUTTON LOGIC
   ════════════════════════════════════════════════════════════ */

/**
 * Activate the correct button within a group, update aria-pressed.
 * @param {NodeList} btnGroup
 * @param {string}   activeUnit
 */
function setActiveBtn(btnGroup, activeUnit) {
  btnGroup.forEach((btn) => {
    const isActive = btn.dataset.unit === activeUnit;
    btn.classList.toggle('unit-btn--active', isActive);
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });
}

/** Handle a click on any unit button. */
function handleUnitBtnClick(event) {
  const btn  = event.currentTarget;
  const role = btn.dataset.role;      // 'from' or 'to'
  const unit = btn.dataset.unit;

  if (role === 'from') {
    state.fromUnit = unit;
    setActiveBtn(fromBtns, unit);
    updateInputBadge();
  } else {
    state.toUnit = unit;
    setActiveBtn(toBtns, unit);
  }

  /* Clear any lingering error when the user changes units */
  clearError();
  /* Re-run conversion live if a value is already present */
  if (tempInput.value.trim() !== '') {
    doConvert();
  }
}

/** Attach click listeners to all unit buttons. */
function bindUnitButtons() {
  fromBtns.forEach((btn) => btn.addEventListener('click', handleUnitBtnClick));
  toBtns.forEach((btn)   => btn.addEventListener('click', handleUnitBtnClick));
}

/* ════════════════════════════════════════════════════════════
   7. SWAP BUTTON LOGIC
   ════════════════════════════════════════════════════════════ */
function handleSwap() {
  /* Exchange from/to */
  [state.fromUnit, state.toUnit] = [state.toUnit, state.fromUnit];
  setActiveBtn(fromBtns, state.fromUnit);
  setActiveBtn(toBtns,   state.toUnit);
  updateInputBadge();
  clearError();

  /* Re-run conversion if value present */
  if (tempInput.value.trim() !== '') {
    doConvert();
  }
}

/* ════════════════════════════════════════════════════════════
   8. INPUT BADGE UPDATE
   ════════════════════════════════════════════════════════════ */
function updateInputBadge() {
  inputUnitBadge.textContent = UNIT_META[state.fromUnit].badge;
}

/* ════════════════════════════════════════════════════════════
   9. VALIDATION
   ════════════════════════════════════════════════════════════ */

/** Display an error message and mark the input field. */
function showError(message) {
  inputError.textContent = message;
  tempInput.classList.add('is-error');
  showResultError(message);
}

/** Clear validation error state. */
function clearError() {
  inputError.textContent = '';
  tempInput.classList.remove('is-error');
}

/**
 * Validate the current input value.
 * @returns {{ valid: boolean, value?: number, error?: string }}
 */
function validateInput() {
  const raw = tempInput.value.trim();

  if (raw === '') {
    return { valid: false, error: 'Please enter a temperature value.' };
  }

  const numeric = parseFloat(raw);

  if (isNaN(numeric)) {
    return { valid: false, error: 'Invalid input — please enter a numeric value.' };
  }

  if (isBelowAbsoluteZero(numeric, state.fromUnit)) {
    const az = ABSOLUTE_ZERO[state.fromUnit];
    const symbol = UNIT_META[state.fromUnit].symbol;
    return {
      valid: false,
      error: `Temperature cannot be below absolute zero (${az} ${symbol}).`,
    };
  }

  return { valid: true, value: numeric };
}

/* ════════════════════════════════════════════════════════════
   10. RESULT RENDERING
   ════════════════════════════════════════════════════════════ */

/**
 * Round to at most 4 significant decimal places, removing trailing zeros.
 * e.g. 100.0000 → "100", 98.6000 → "98.6"
 */
function formatResult(num) {
  /* Use toPrecision for large numbers, toFixed for normal range */
  const rounded = Math.round(num * 10000) / 10000;
  return String(parseFloat(rounded.toFixed(4)));
}

/** Show a successful conversion result. */
function showResultSuccess(inputValue, outputValue, fromUnit, toUnit) {
  const fromMeta   = UNIT_META[fromUnit];
  const toMeta     = UNIT_META[toUnit];
  const formula    = getFormulaString(fromUnit, toUnit);
  const formattedOutput = formatResult(outputValue);
  const formattedInput  = formatResult(inputValue);

  resultInner.className = 'result-panel__inner result-panel--success';
  resultInner.innerHTML = `
    <p class="result-value">${formattedOutput}&thinsp;${toMeta.symbol}</p>
    <p class="result-unit">
      ${formattedInput}&thinsp;${fromMeta.symbol}
      &nbsp;→&nbsp;
      <strong>${formattedOutput}&thinsp;${toMeta.symbol}</strong>
    </p>
    <p class="result-formula">${formula}</p>
  `;
}

/** Show an error inside the result panel. */
function showResultError(message) {
  resultInner.className = 'result-panel__inner result-panel--error';
  resultInner.innerHTML = `<p class="result-error-msg">⚠️ ${message}</p>`;
}

/** Reset the result panel to its default placeholder state. */
function showResultPlaceholder() {
  resultInner.className = 'result-panel__inner result-panel--placeholder';
  resultInner.innerHTML = `<p class="result-hint">Enter a value and press <strong>Convert</strong></p>`;
}

/* ════════════════════════════════════════════════════════════
   11. CORE CONVERT HANDLER
   ════════════════════════════════════════════════════════════ */
function doConvert() {
  clearError();

  const validation = validateInput();

  if (!validation.valid) {
    showError(validation.error);
    return;
  }

  const inputValue  = validation.value;
  const outputValue = convertTemperature(inputValue, state.fromUnit, state.toUnit);

  /* Edge case: if both units are the same, result equals input */
  showResultSuccess(inputValue, outputValue, state.fromUnit, state.toUnit);
}

/* ════════════════════════════════════════════════════════════
   12. RESET HANDLER
   ════════════════════════════════════════════════════════════ */
function doReset() {
  /* Clear the input field */
  tempInput.value = '';

  /* Reset units to defaults */
  state.fromUnit = 'celsius';
  state.toUnit   = 'fahrenheit';
  setActiveBtn(fromBtns, 'celsius');
  setActiveBtn(toBtns,   'fahrenheit');
  updateInputBadge();

  /* Clear errors and result */
  clearError();
  showResultPlaceholder();

  /* Return focus to the input for better UX */
  tempInput.focus();
}

/* ════════════════════════════════════════════════════════════
   13. KEYBOARD SUPPORT
   ════════════════════════════════════════════════════════════ */

/** Allow pressing Enter inside the input to trigger conversion. */
function handleInputKeydown(event) {
  if (event.key === 'Enter') {
    doConvert();
  }
}

/* ════════════════════════════════════════════════════════════
   14. LIVE VALIDATION (clears error as user types)
   ════════════════════════════════════════════════════════════ */
function handleInputChange() {
  /* Only clear the error once the field has valid-looking content */
  if (tempInput.classList.contains('is-error') && tempInput.value.trim() !== '') {
    clearError();
    showResultPlaceholder();
  }
}

/* ════════════════════════════════════════════════════════════
   15. INITIALISATION
   ════════════════════════════════════════════════════════════ */
function init() {
  /* Reflect the default state in the UI */
  setActiveBtn(fromBtns, state.fromUnit);
  setActiveBtn(toBtns,   state.toUnit);
  updateInputBadge();

  /* Wire up events */
  bindUnitButtons();
  convertBtn.addEventListener('click', doConvert);
  resetBtn.addEventListener('click',   doReset);
  swapBtn.addEventListener('click',    handleSwap);
  tempInput.addEventListener('keydown', handleInputKeydown);
  tempInput.addEventListener('input',   handleInputChange);

  /* Set initial placeholder result panel */
  showResultPlaceholder();
}

/* Run on DOM ready */
document.addEventListener('DOMContentLoaded', init);
