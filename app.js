document.getElementById('expenseForm').addEventListener('submit', e => {
  e.preventDefault();
  const title = document.getElementById('expenseTitle').value;
  const amount = parseFloat(document.getElementById('expenseAmount').value);
  const category = document.getElementById('expenseCategory').value;
  
  const expense = { title, amount, category, date: new Date().toISOString() };
  
  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  expenses.push(expense);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  
  renderExpenses();
  updateTotal();
  e.target.reset();
});

function renderExpenses() {
  const list = document.getElementById('expenseList');
  const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  list.innerHTML = expenses.map((e, i) => `
    <li>
      <strong>${e.title}</strong> - $${e.amount} (${e.category})
      <button onclick="removeExpense(${i})">Remove</button>
    </li>
  `).join('');
}

function updateTotal() {
  const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  document.getElementById('total').textContent = total.toFixed(2);
}

function removeExpense(i) {
  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  expenses.splice(i, 1);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  renderExpenses();
  updateTotal();
}