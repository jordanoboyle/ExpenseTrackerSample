const balance     = document.getElementById('balance');
const money_plus  = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list        = document.getElementById('list');
const form        = document.getElementById('form');
const text        = document.getElementById('text');
const amount      = document.getElementById('amount');

// const dummyTransactions = [
//   {id: 1, text: 'Flower', amount: -20 },
//   {id: 2, text: 'Salary', amount: 2000},
//   {id: 3, text: 'Book', amount: -20},
//   {id: 4, text: 'Camera', amount: 150}
// ];
// let transactions = dummyTransactions;

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

//Add New Transaction
function addTransaction(e) {
  e.preventDefault(); //prevents the auto submit

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add text and amount');
  } else {
    const transaction = {
      id: generateRandomID(),
      text: text.value,
      amount: +amount.value  //That plus turns the value into a number/integer/float
    };
    console.log("Input Transaction", transaction);

    transactions.push(transaction);

    addTransactionToDOM(transaction);

    updateValues();

    updateLocalStorageTransactions();

    text.value = '';
    amount.value = '';
  }
}

//Gen Random ID:
function generateRandomID() {
  return Math.floor(Math.random() * 100000000);
}

//Add Transactions to DOM list:
function addTransactionToDOM(transaction) {
  //get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  //Add class based on value sign
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span> ${sign}${Math.abs(transaction.amount)} </span> <button class="delete-button" onclick="removeTransaction(${transaction.id})"> X </button>
  `;
  //Above we created an inline eventListener for the purposes of removing a transaction from the DOM

  list.appendChild(item);
}

//update balance Income and Expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((accumulator, item) => (accumulator += item), 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((accumulator, item) => (accumulator += item), 0)
    .toFixed(2);

  const expense = (amounts
    .filter(item => item < 0)
    .reduce((accumulator, item) => (accumulator += item), 0)) * -1
    .toFixed(2);    

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;

  console.log("the amounts", amounts);
  console.log("TOTAL", total);
  console.log('INCOME', income);
  console.log('EXPENSE', expense);
}

//remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);

  updateLocalStorageTransactions();

  init(); // Here we have created a function to remove a transaction via an inline eventListener in addTransactionToDOM. Use filter to add only transactions that don't have that ID. Re-intialize the app. 
}

//Update Local Storage transactions
function updateLocalStorageTransactions() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

//Init APP
function init() {
  list.innerHTML = '';

  transactions.forEach(addTransactionToDOM);
  //We do not want paranthesis here because if we do so then addTransactionToDOM is immediately invoked which is not desireable since this happens before 

  updateValues();
}

init();

//Event Listeners

form.addEventListener('submit', addTransaction);

