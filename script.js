const balance     = document.getElementById('balance');
const money_plus  = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list        = document.getElementById('list');
const form        = document.getElementById('form');
const text        = document.getElementById('text');
const amount      = document.getElementById('amount');

const dummyTransactions = [
  {id: 1, text: 'Flower', amount: -20 },
  {id: 2, text: 'Salary', amount: 2000},
  {id: 3, text: 'Book', amount: -20},
  {id: 4, text: 'Camera', amount: 150}
];


let transactions = dummyTransactions;

//Add Transactions to DOM list:
function addTransactionToDOM(transaction) {
  //get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  //Add class based on value sign
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span> ${sign}${Math.abs(transaction.amount)} </span> <button class="delete-button"> X </button>
  `;

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


//Init APP
function init() {
  list.innerHTML = '';

  transactions.forEach(addTransactionToDOM);
  //We do not want paranthesis here because if we do so then addTransactionToDOM is immediately invoked which is not desireable since this happens before 

  updateValues();
}

init();

