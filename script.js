// ==============================
// AINEX SBI SWP Calculator
// Part 3
// ==============================

// INPUTS
const investmentInput = document.getElementById("investmentInput");
const investmentSlider = document.getElementById("investmentSlider");

const withdrawInput = document.getElementById("withdrawInput");
const withdrawSlider = document.getElementById("withdrawSlider");

const returnInput = document.getElementById("returnInput");
const returnSlider = document.getElementById("returnSlider");

const yearInput = document.getElementById("yearInput");
const yearSlider = document.getElementById("yearSlider");

// OUTPUT
const investmentResult = document.getElementById("investmentResult");
const withdrawResult = document.getElementById("withdrawResult");
const interestResult = document.getElementById("interestResult");
const corpusResult = document.getElementById("corpusResult");
const statusBox = document.getElementById("statusBox");

let chart;

// ----------------------------

function getNumber(value) {
  return Number(String(value).replace(/,/g, ""));
}

function formatIndian(value) {
  return Number(value).toLocaleString("en-IN");
}

function money(value) {
  return "₹" + Number(value).toLocaleString("en-IN");
}

// ----------------------------
// Investment

investmentInput.addEventListener("input", () => {
  
  let amount = getNumber(investmentInput.value);
  
  if (isNaN(amount)) amount = 1000;
  
  amount = Math.max(1, Math.min(10000000, amount));
  
  investmentSlider.value = amount;
  
  investmentInput.value = formatIndian(amount);
  
  calculate();
  
});

investmentSlider.addEventListener("input", () => {
  
  investmentInput.value = formatIndian(investmentSlider.value);
  
  calculate();
  
});

// Withdrawal

withdrawInput.addEventListener("input", () => {
  
  withdrawSlider.value = getNumber(withdrawInput.value);
  
  calculate();
  
});

withdrawSlider.addEventListener("input", () => {
  
  withdrawInput.value = withdrawSlider.value;
  
  calculate();
  
});

// Return

returnInput.addEventListener("input", () => {
  
  returnSlider.value = returnInput.value;
  
  calculate();
  
});

returnSlider.addEventListener("input", () => {
  
  returnInput.value = returnSlider.value;
  
  calculate();
  
});

// Years

yearInput.addEventListener("input", () => {
  
  yearSlider.value = yearInput.value;
  
  calculate();
  
});

yearSlider.addEventListener("input", () => {
  
  yearInput.value = yearSlider.value;
  
  calculate();
  
});

// ----------------------------

function calculate() {
  
  const investment = getNumber(investmentInput.value);
  
  const withdrawal = getNumber(withdrawInput.value);
  
  const annualRate = parseFloat(returnInput.value);
  
  const years = parseInt(yearInput.value);
  
  let corpus = investment;
  
  let totalWithdrawal = 0;
  
  const monthlyRate = annualRate / 12 / 100;
  
  const labels = [];
  
  const values = [];
  
  let exhausted = false;
  
  for (let month = 1; month <= years * 12; month++) {
    
    corpus += corpus * monthlyRate;
    
    corpus -= withdrawal;
    
    totalWithdrawal += withdrawal;
    
    labels.push(month);
    
    values.push(corpus);
    
    if (corpus <= 0) {
      
      exhausted = true;
      
      break;
      
    }
    
  }
  
  const interest = (corpus + totalWithdrawal) - investment;
  
  investmentResult.innerHTML = money(investment);
  
  withdrawResult.innerHTML = money(totalWithdrawal);
  
  if (interest >= 0) {
    
    interestResult.innerHTML =
      `<span style="color:#16a34a;">+${money(Math.round(interest))}</span>`;
    
  } else {
    
    interestResult.innerHTML =
      `<span style="color:#dc2626;">-${money(Math.abs(Math.round(interest)))}</span>`;
    
  }
  
  if (corpus >= 0) {
    
    corpusResult.innerHTML =
      `<span style="color:#005BAC;">${money(Math.round(corpus))}</span>`;
    
  } else {
    
    corpusResult.innerHTML =
      `<span style="color:#dc2626;">-${money(Math.abs(Math.round(corpus)))}</span>`;
    
  }
  
  statusBox.innerHTML =
    exhausted ?
    "❌ Corpus Exhausted" :
    "✅ Investment Running Successfully";
  
  drawChart(labels, values);
  
}

// ----------------------------

function drawChart(labels, data) {
  
  const ctx = document.getElementById("swpChart");
  
  if (chart) chart.destroy();
  
  chart = new Chart(ctx, {
    
    type: "line",
    
    data: {
      
      labels: labels,
      
      datasets: [{
        
        label: "Corpus",
        
        data: data,
        
        borderColor: "#005BAC",
        
        backgroundColor: "rgba(0,91,172,.12)",
        
        fill: true,
        
        borderWidth: 3,
        
        pointRadius: 0,
        
        tension: .35
        
      }]
      
    },
    
    options: {
      
      responsive: true,
      
      maintainAspectRatio: false,
      
      plugins: {
        
        legend: {
          display: false
        }
        
      }
      
    }
    
  });
  
}

calculate();
