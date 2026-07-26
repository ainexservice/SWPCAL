// ======================================
// AINEX SBI SWP Calculator
// Part 3 - script.js
// ======================================

const investmentInput = document.getElementById("investmentInput");
const investmentSlider = document.getElementById("investmentSlider");

const withdrawInput = document.getElementById("withdrawInput");
const withdrawSlider = document.getElementById("withdrawSlider");

const returnInput = document.getElementById("returnInput");
const returnSlider = document.getElementById("returnSlider");

const yearInput = document.getElementById("yearInput");
const yearSlider = document.getElementById("yearSlider");

const investmentResult = document.getElementById("investmentResult");
const withdrawResult = document.getElementById("withdrawResult");
const interestResult = document.getElementById("interestResult");
const corpusResult = document.getElementById("corpusResult");
const statusBox = document.getElementById("statusBox");

let swpChart;

// ===============================
// Helpers
// ===============================

function numberValue(v) {
  return Number(String(v).replace(/,/g, "")) || 0;
}

function indian(v) {
  return Number(v).toLocaleString("en-IN");
}

function money(v) {
  const value = Math.round(v);
  return "₹" + Math.abs(value).toLocaleString("en-IN");
}

// ===============================
// Sync Investment
// ===============================

investmentInput.addEventListener("input", () => {
  
  let value = numberValue(investmentInput.value);
  
  value = Math.max(1, Math.min(10000000, value));
  
  investmentInput.value = indian(value);
  
  investmentSlider.value = value;
  
  calculate();
  
});

investmentSlider.addEventListener("input", () => {
  
  investmentInput.value = indian(investmentSlider.value);
  
  calculate();
  
});

// ===============================
// Sync Withdrawal
// ===============================

withdrawInput.addEventListener("input", () => {
  
  let value = numberValue(withdrawInput.value);
  
  value = Math.max(1, Math.min(5000000, value));
  
  withdrawInput.value = indian(value);
  
  withdrawSlider.value = value;
  
  calculate();
  
});

withdrawSlider.addEventListener("input", () => {
  
  withdrawInput.value = indian(withdrawSlider.value);
  
  calculate();
  
});

// ===============================
// Return
// ===============================

returnInput.oninput = () => {
  
  returnSlider.value = returnInput.value;
  
  calculate();
  
};

returnSlider.oninput = () => {
  
  returnInput.value = returnSlider.value;
  
  calculate();
  
};

// ===============================
// Years
// ===============================

yearInput.oninput = () => {
  
  yearSlider.value = yearInput.value;
  
  calculate();
  
};

yearSlider.oninput = () => {
  
  yearInput.value = yearSlider.value;
  
  calculate();
  
};

// ===============================
// Calculate
// ===============================

function calculate() {
  
  const investment = numberValue(investmentInput.value);
  
  const withdrawal = numberValue(withdrawInput.value);
  
  const annual = Number(returnInput.value);
  
  const years = Number(yearInput.value);
  
  const monthly = annual / 12 / 100;
  
  let corpus = investment;
  
  let withdrawalTotal = 0;
  
  let labels = [];
  
  let values = [];
  
  let exhausted = false;
  
  for (let m = 1; m <= years * 12; m++) {
    
    corpus += corpus * monthly;
    
    corpus -= withdrawal;
    
    withdrawalTotal += withdrawal;
    
    labels.push(m);
    
    values.push(corpus);
    
    if (corpus <= 0) {
      
      exhausted = true;
      
      break;
      
    }
    
  }
  
  const interest = corpus + withdrawalTotal - investment;
  
  investmentResult.innerHTML = "₹" + indian(investment);
  
  withdrawResult.innerHTML = "₹" + indian(withdrawalTotal);
  
  interestResult.innerHTML =
    interest >= 0 ?
    `<span style="color:#16a34a;">+${money(interest)}</span>` :
    `<span style="color:#dc2626;">-${money(interest)}</span>`;
  
  corpusResult.innerHTML =
    corpus >= 0 ?
    `<span style="color:#005BAC;">${money(corpus)}</span>` :
    `<span style="color:#dc2626;">-${money(corpus)}</span>`;
  
  statusBox.innerHTML =
    exhausted ?
    "❌ Corpus Exhausted" :
    "✅ Investment Running Successfully";
  
  drawChart(labels, values);
  
}

// ===============================
// Chart
// ===============================

function drawChart(labels, data) {
  
  const ctx = document.getElementById("swpChart");
  
  if (swpChart) swpChart.destroy();
  
  swpChart = new Chart(ctx, {
    
    type: "line",
    
    data: {
      
      labels: labels,
      
      datasets: [{
        
        data: data,
        
        borderColor: "#005BAC",
        
        backgroundColor: "rgba(0,91,172,.15)",
        
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
