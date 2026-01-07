class bankAccount {
    constructor(accountNumber, accountHolder, Balance = 0) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = Balance;
        this.transactionHistory = [];
    }

    deposit(amount) {
        this.balance += amount;
        console.log(`Deposited £${amount}. New balance: £${this.balance}`);
        this.transactionHistory.push({ type: 'Deposit', amount: amount, date: new Date() });
    }

    withdraw(amount) {
        if (amount > this.balance) {
            console.log('Insufficient funds for withdrawal.');
            return;
        }
        else {
            this.balance -= amount;
            console.log(`Withdrew £${amount}. New balance: £${this.balance}`);
            this.transactionHistory.push({ type: 'Withdrawal', amount: amount, date: new Date() });
        }
    }

    checkBalance() {
        console.log(`Account balance for ${this.accountHolder}: £${this.balance}`);
        return this.balance;
    }

    getTransactionHistory() {
        return this.transactionHistory;
    }
    displayAccountInfo() {
        alert(`🏦 Account Information\n\n` +
              `Account Number: ${this.accountNumber}\n` +
              `Account Holder: ${this.accountHolder}\n` +
              `Balance: $${this.balance.toFixed(2)}`);
    }
}

// Sample accounts
const accounts = [
    new bankAccount('001', 'Alice', 500),
    new bankAccount('002', 'Bob', 300),
    new bankAccount('003', 'Charlie', 700),
    new bankAccount('004', 'Negative Balance', -500),
    new bankAccount('005', 'Richie Rich', 1000000)
];

// Current logged-in account
let currentAccount = null;

// DOM elements
const loginForm = document.getElementById('loginForm');
const accountNumberInput = document.getElementById('accountNumber');
const loginBtn = document.getElementById('loginBtn');
const createBtn = document.getElementById('createBtn');
const accountDiv = document.getElementById('account');
const welcomeMessage = document.getElementById('welcomeMessage');
const balanceSpan = document.getElementById('balance');
const transactionsList = document.getElementById('transactions');
const transactionForm = document.getElementById('transactionForm');
const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type');
const accountHolderInput = document.getElementById('AccountHolderName');

// Login form handler
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const accountNumber = accountNumberInput.value.trim();
    
    if (!accountNumber) {
        alert('Please enter an account number!');
        return;
    }
    
    const account = accounts.find(acc => acc.accountNumber === accountNumber);
    
    if (account) {
        currentAccount = account;
        loginForm.style.display = 'none';
        accountDiv.style.display = 'block';
        welcomeMessage.textContent = `Welcome back, ${currentAccount.accountHolder}!`;
        updateUI();
    } else {
        alert('Account not found! Click "Create Account" to create a new account.');
    }
});

// Create account button handler
createBtn.addEventListener('click', () => {
    const accountHolder = accountHolderInput.value.trim();
    
    if (!accountHolder) {
        alert('Please enter an account holder name!');
        return;
    }
    
    // Check if account already exists
    const existingAccount = accounts.find(acc => acc.accountHolder === accountHolder);
    
    if (existingAccount) {
        alert('Account already exists! Please login instead.');
        return;
    }

    const initialBalanceInput = document.getElementById('initialBalance');
    const initialBalance = parseFloat(initialBalanceInput.value) || 0;
    
    // Generate new account number

    let newAccountNumber = (Math.random() * 1000000).toFixed(0);
    while (accounts.find(acc => acc.accountNumber === newAccountNumber)) {
        console.log('Duplicate account number generated, regenerating...');
        newAccountNumber = (Math.random() * 1000000).toFixed(0);
    }
    
    // Create new account
    function createAccount(accountHolder, initialBalance) {
        const newAccount = new bankAccount(newAccountNumber, accountHolder, initialBalance);
        accounts.push(newAccount);
        return newAccount;
    }
    
    const newAccount = createAccount(accountHolder, initialBalance);
    
    // Log in to the new account
    currentAccount = newAccount;
    loginForm.style.display = 'none';
    accountDiv.style.display = 'block';
    welcomeMessage.textContent = `Welcome, ${currentAccount.accountHolder}! Your new account has been created.`;
    updateUI();
});

// Check Account Info Button handler
const checkInfoBtn = document.getElementById('checkInfoBtn');
checkInfoBtn.addEventListener('click', () => {
    if (currentAccount) {
        currentAccount.displayAccountInfo();
    } else {
        alert('No account is currently logged in.');
    }
});

// Logout Button handler
const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', () => {
    currentAccount = null;
    accountDiv.style.display = 'none';
    loginForm.style.display = 'block';
    usernameInput.value = '';
});

// Transaction form handler
transactionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const amount = parseFloat(amountInput.value);
    const type = typeSelect.value;
    
    if (amount <= 0) {
        alert('Please enter a valid amount!');
        return;
    }
    
    if (type === 'deposit') {
        currentAccount.deposit(amount);
    } else if (type === 'withdraw') {
        currentAccount.withdraw(amount);
    }
    
    updateUI();
    amountInput.value = '';
});

// Update UI with current account data
function updateUI() {
    if (!currentAccount) return;
    
    balanceSpan.textContent = currentAccount.balance.toFixed(2);
    
    // Display transaction history
    transactionsList.innerHTML = '';
    currentAccount.getTransactionHistory().forEach(transaction => {
        const li = document.createElement('li');
        li.textContent = `${transaction.type}: $${transaction.amount} on ${transaction.date.toLocaleString()}`;
        transactionsList.appendChild(li);
    });
}

// Test creation of infinite accounts
function createInfiniteAccounts() {
    while (true) {
        let accNum = (Math.random() * 1000000).toFixed(0);
        if (accounts.find(acc => acc.accountNumber === accNum)) {
            console.log('Duplicate account number generated, regenerating...');
            accNum = (Math.random() * 1000000).toFixed(0);
            continue;
        } else {
            const accHolder = `User${accNum}`;
            const newAcc = new bankAccount(accNum, accHolder, 0);
            accounts.push(newAcc);
            if (accounts.length % 10000 === 0) {
                console.log(`Created ${accounts.length} accounts so far...`);
            }
        }
    }
}
// Uncomment the line below to test infinite account creation (use with caution!)
// createInfiniteAccounts();

console.log(`Total accounts created: ${accounts.length}`);