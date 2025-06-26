const form = document.getElementById("transactionForm");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const transactionList = document.getElementById("transactionList");
const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const filterSelect = document.getElementById("filterType");
const darkModeToggle = document.getElementById("darkModeToggle");

let financeChart;
let transactions = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const type = typeInput.value;

  if (description === "" || isNaN(amount) || amount <= 0) {
    alert("Please enter valid details");
    return;
  }

  const transaction = {
    id: Date.now(),
    description,
    amount,
    type,
  };

  transactions.push(transaction);
  saveToLocalStorage();
  renderTransactions();
  updateSummary();
  updateChart();
  form.reset();
});

function renderTransactions() {
  transactionList.innerHTML = "";
  const filterValue = filterSelect.value;

  const filteredTransactions = transactions.filter(
    (t) => filterValue === "all" || t.type === filterValue
  );

  filteredTransactions.forEach((t) => {
    const li = document.createElement("li");
    li.classList.add(t.type === "income" ? "income-item" : "expense-item");
    li.innerHTML = `
      ${t.description} - $${t.amount.toFixed(2)}
      <button onclick="deleteTransaction(${t.id})">X</button>
    `;
    transactionList.appendChild(li);
  });
}

function updateSummary() {
  let income = 0,
    expense = 0;

  transactions.forEach((t) => {
    if (t.type === "income") {
      income += t.amount;
    } else {
      expense += t.amount;
    }
  });

  incomeEl.textContent = income.toFixed(2);
  expenseEl.textContent = expense.toFixed(2);
  balanceEl.textContent = (income - expense).toFixed(2);
}

function saveToLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function loadFromLocalStorage() {
  const saved = localStorage.getItem("transactions");
  if (saved) {
    transactions = JSON.parse(saved);
    renderTransactions();
    updateSummary();
    updateChart();
  }
}

window.onload = loadFromLocalStorage;
filterSelect.addEventListener("change", renderTransactions);

function deleteTransaction(id) {
  transactions = transactions.filter((t) => t.id !== id);
  saveToLocalStorage();
  renderTransactions();
  updateSummary();
  updateChart();
}

function exportToCSV() {
  if (transactions.length === 0) {
    alert("No transactions to export.");
    return;
  }

  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "Description,Amount,Type\n";

  transactions.forEach((t) => {
    const row = `${t.description},${t.amount},${t.type}`;
    csvContent += row + "\n";
  });

  const encodedUrl = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUrl);
  link.setAttribute("download", "transactions.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

document.getElementById("exportCSV").addEventListener("click", exportToCSV);

function updateChart() {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const ctx = document.getElementById("financeChart").getContext("2d");

  if (financeChart) {
    financeChart.destroy();
  }

  financeChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Income", "Expense"],
      datasets: [
        {
          data: [income, expense],
          backgroundColor: ["#4caf50", "#f44336"],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
  });
}

// Theme toggle
darkModeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode", darkModeToggle.checked);
  document.body.classList.toggle("light-mode", !darkModeToggle.checked);
});
