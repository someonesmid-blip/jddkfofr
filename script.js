const aSlider = document.getElementById("aSlider");
const cSlider = document.getElementById("cSlider");
const aValue = document.getElementById("aValue");
const cValue = document.getElementById("cValue");
const parabolaFormula = document.getElementById("parabolaFormula");
const vertex = document.getElementById("vertex");
const parabolaPath = document.getElementById("parabolaPath");

const ampSlider = document.getElementById("ampSlider");
const freqSlider = document.getElementById("freqSlider");
const ampValue = document.getElementById("ampValue");
const freqValue = document.getElementById("freqValue");
const sineFormula = document.getElementById("sineFormula");
const period = document.getElementById("period");
const sinePath = document.getElementById("sinePath");

const nSlider = document.getElementById("nSlider");
const pSlider = document.getElementById("pSlider");
const kSlider = document.getElementById("kSlider");
const nValue = document.getElementById("nValue");
const pValue = document.getElementById("pValue");
const kValue = document.getElementById("kValue");
const binomialFormula = document.getElementById("binomialFormula");
const expectation = document.getElementById("expectation");

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const updateParabola = () => {
  const a = parseFloat(aSlider.value);
  const c = parseFloat(cSlider.value);
  aValue.textContent = a.toFixed(1);
  cValue.textContent = c.toFixed(1);
  parabolaFormula.textContent = `f(x) = ${a.toFixed(1)}x² + ${c.toFixed(1)}`;
  vertex.textContent = `S(0 | ${c.toFixed(1)})`;

  const scale = 8;
  const centerX = 120;
  const centerY = 60 - c * 6;
  const leftY = clamp(centerY + a * scale * (centerX ** 2) / 1600, 10, 110);
  const rightY = leftY;
  parabolaPath.setAttribute(
    "d",
    `M0 ${leftY} Q${centerX} ${centerY} 240 ${rightY}`
  );
};

const updateSine = () => {
  const amp = parseFloat(ampSlider.value);
  const freq = parseFloat(freqSlider.value);
  ampValue.textContent = amp.toFixed(1);
  freqValue.textContent = freq.toFixed(1);
  sineFormula.textContent = `f(x) = ${amp.toFixed(1)}·sin(${freq.toFixed(1)}x)`;
  period.textContent = `${(2 * Math.PI / freq).toFixed(2)}π`;

  const points = Array.from({ length: 6 }, (_, i) => {
    const x = i * 48;
    const t = (i / 5) * Math.PI * 2 * freq;
    const y = 60 - Math.sin(t) * amp * 20;
    return `${x} ${y.toFixed(1)}`;
  });
  sinePath.setAttribute(
    "d",
    `M${points[0]} C${points[1]} ${points[2]} ${points[3]} S${points[4]} ${points[5]}`
  );
};

const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));

const binomial = (n, k, p) => {
  const coeff = factorial(n) / (factorial(k) * factorial(n - k));
  return coeff * (p ** k) * ((1 - p) ** (n - k));
};

const updateBinomial = () => {
  const n = parseInt(nSlider.value, 10);
  const p = parseFloat(pSlider.value);
  const k = parseInt(kSlider.value, 10);
  nValue.textContent = n;
  pValue.textContent = p.toFixed(2);
  kValue.textContent = k;
  kSlider.max = n;

  const probability = binomial(n, k, p);
  binomialFormula.textContent = `P(X=${k}) = ${probability.toFixed(4)}`;
  expectation.textContent = `E(X)=${(n * p).toFixed(1)}`;
};

[aSlider, cSlider].forEach((slider) => slider.addEventListener("input", updateParabola));
[ampSlider, freqSlider].forEach((slider) => slider.addEventListener("input", updateSine));
[nSlider, pSlider, kSlider].forEach((slider) => slider.addEventListener("input", updateBinomial));

updateParabola();
updateSine();
updateBinomial();
