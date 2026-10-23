
const form = document.getElementById("expenseForm");
const titleInput = document.getElementById("expenseTitle");
const amountInput = document.getElementById("expenseAmount");
const categoryInput = document.getElementById("expenseCategory");
const expenseList = document.getElementById("expenseList");
const totalElement = document.getElementById("total");

const categories = {
  food: "Food",
  transport: "Transport",
  shopping: "Shopping",
  other: "Other"
};

const STORAGE_KEY = "expenses";

function getExpenses() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    if (!Array.isArray(data)) return [];

    return data.filter(expense =>
      expense &&
      typeof expense.title === "string" &&
      Number.isFinite(Number(expense.amount)) &&
      Number(expense.amount) > 0 &&
      Object.hasOwn(categories, expense.category)
    ).map((expense, index) => ({
      ...expense,
      id: expense.id || `expense-${index}-${expense.date || ""}`,
      amount: Number(expense.amount)
    }));
  } catch {
    return [];
  }
}

let expenses = getExpenses();

function saveExpenses() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch {
    alert("Unable to save expenses. Check your browser storage.");
  }
}

function formatMoney(amount) {
  return amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = text;
  return element;
}

function renderExpenses() {
  expenseList.replaceChildren();

  const countBadge = document.querySelector(".expenses-count");

  if (countBadge) {
    countBadge.textContent =
      `${expenses.length} ${expenses.length === 1 ? "EXPENSE" : "EXPENSES"}`;
  }

  if (expenses.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty-state";

    empty.append(
      createElement("span", "empty-icon", "↗"),
      createElement("h3", "", "No expenses yet"),
      createElement("p", "", "Your transactions will show up here.")
    );

    expenseList.appendChild(empty);
    updateTotal();
    return;
  }

  // Show the newest expense first.
  [...expenses].reverse().forEach(expense => {
    const item = document.createElement("li");
    item.className = "expense-item";

    const info = createElement("div", "expense-info", "");

    info.appendChild(
      createElement("div", "expense-name", expense.title)
    );

    const meta = createElement("div", "expense-meta", "");

    meta.appendChild(
      createElement(
        "span",
        `expense-category ${expense.category}`,
        categories[expense.category]
      )
    );

    if (expense.date) {
      const parsedDate = new Date(expense.date);

      if (!Number.isNaN(parsedDate.getTime())) {
        meta.appendChild(
          createElement(
            "span",
            "",
            parsedDate.toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric"
            })
          )
        );
      }
    }

    info.appendChild(meta);

    const amount = createElement(
      "span",
      "expense-amount",
      `₹${formatMoney(expense.amount)}`
    );

    const removeButton = createElement(
      "button",
      "expense-remove",
      "Remove"
    );

    removeButton.type = "button";
    removeButton.setAttribute(
      "aria-label",
      `Remove expense: ${expense.title}`
    );

    removeButton.addEventListener("click", () => {
      removeExpense(expense.id);
    });

    item.append(info, amount, removeButton);
    expenseList.appendChild(item);
  });

  updateTotal();
}

function updateTotal() {
  const total = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  totalElement.textContent = formatMoney(total);
}

form.addEventListener("submit", event => {
  event.preventDefault();

  const title = titleInput.value.trim();
  const amount = Number(amountInput.value);
  const category = categoryInput.value;

  if (
    !title ||
    !Number.isFinite(amount) ||
    amount <= 0 ||
    !Object.hasOwn(categories, category)
  ) {
    return;
  }

  expenses.push({
    id: crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random()}`,
    title,
    amount,
    category,
    date: new Date().toISOString()
  });

  saveExpenses();
  renderExpenses();

  form.reset();
  titleInput.focus();
});

function removeExpense(id) {
  expenses = expenses.filter(expense => expense.id !== id);
  saveExpenses();
  renderExpenses();
}

// Display saved expenses on page load.
renderExpenses();
