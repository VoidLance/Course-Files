class bankAccount {
    constructor(accountNumber, accountHolder, balance = 0) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = balance;
        this.transactionHistory = [];
    }

    deposit(amount) {
        this.balance += amount;
        this.addTransaction('Deposit', amount);
    }

    withdraw(amount) {
        if (amount > this.balance) {
            console.log('Insufficient funds for withdrawal.');
            return false;
        }
        this.balance -= amount;
        this.addTransaction('Withdrawal', amount);
        return true;
    }

    addTransaction(type, amount) {
        this.transactionHistory.push({ type, amount, date: new Date() });
        console.log(`${type}: £${amount}. New balance: £${this.balance}`);
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
const accounts = new Map();
accounts.set('001', new bankAccount('001', 'Alice', 500));
accounts.set('002', new bankAccount('002', 'Bob', 300));
accounts.set('003', new bankAccount('003', 'Charlie', 700));
accounts.set('004', new bankAccount('004', 'Negative Balance', -500));
accounts.set('005', new bankAccount('005', 'Richie Rich', 1000000));

// Current logged-in account
let currentAccount = null;

// DOM elements
const elements = {
    loginForm: document.getElementById('loginForm'),
    accountNumberInput: document.getElementById('accountNumber'),
    accountHolderInput: document.getElementById('AccountHolderName'),
    initialBalanceInput: document.getElementById('initialBalance'),
    accountDiv: document.getElementById('account'),
    welcomeMessage: document.getElementById('welcomeMessage'),
    balanceSpan: document.getElementById('balance'),
    transactionsList: document.getElementById('transactions'),
    transactionForm: document.getElementById('transactionForm'),
    amountInput: document.getElementById('amount'),
    typeSelect: document.getElementById('type')
};

// Helper functions
function findAccount(accountNumber) {
    return accounts.get(accountNumber);
}

function findAccountByHolder(accountHolder) {
    for (const account of accounts.values()) {
        if (account.accountHolder === accountHolder) {
            return account;
        }
    }
    return undefined;
}

function generateAccountNumber() {
    let newNumber;
    do {
        newNumber = (Math.random() * 1000000).toFixed(0);
    } while (accounts.has(newNumber));
    return newNumber;
}

function createAccount(accountNumber, accountHolder, initialBalance) {
    const newAccount = new bankAccount(accountNumber, accountHolder, initialBalance);
    accounts.set(accountNumber, newAccount);
    return newAccount;
}

function loginToAccount(account, welcomeMsg) {
    currentAccount = account;
    elements.loginForm.style.display = 'none';
    elements.accountDiv.style.display = 'block';
    elements.welcomeMessage.textContent = welcomeMsg;
    updateUI();
}

function logout() {
    currentAccount = null;
    elements.accountDiv.style.display = 'none';
    elements.loginForm.style.display = 'block';
    elements.accountNumberInput.value = '';
}

function updateUI() {
    if (!currentAccount) return;
    
    elements.balanceSpan.textContent = currentAccount.balance.toFixed(2);
    
    elements.transactionsList.innerHTML = '';
    currentAccount.getTransactionHistory().forEach(transaction => {
        const li = document.createElement('li');
        li.textContent = `${transaction.type}: $${transaction.amount} on ${transaction.date.toLocaleString()}`;
        elements.transactionsList.appendChild(li);
    });
}

// Event handlers
function handleLogin(e) {
    e.preventDefault();
    const accountNumber = elements.accountNumberInput.value.trim();
    
    if (!accountNumber) {
        alert('Please enter an account number!');
        return;
    }
    
    const account = findAccount(accountNumber);
    
    if (account) {
        loginToAccount(account, `Welcome back, ${account.accountHolder}!`);
    } else {
        alert('Account not found! Click "Create Account" to create a new account.');
    }
}

function handleCreateAccount() {
    const accountHolder = elements.accountHolderInput.value.trim();
    
    if (!accountHolder) {
        alert('Please enter an account holder name!');
        return;
    }
    
    if (findAccountByHolder(accountHolder)) {
        alert('Account already exists! Please login instead.');
        return;
    }

    const initialBalance = parseFloat(elements.initialBalanceInput.value) || 0;
    const accountNumber = generateAccountNumber();
    const newAccount = createAccount(accountNumber, accountHolder, initialBalance);
    
    loginToAccount(newAccount, `Welcome, ${newAccount.accountHolder}! Your new account has been created.`);
}

function handleTransaction(e) {
    e.preventDefault();
    const amount = parseFloat(elements.amountInput.value);
    const type = elements.typeSelect.value;
    
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
    elements.amountInput.value = '';
}

function handleCheckInfo() {
    if (currentAccount) {
        currentAccount.displayAccountInfo();
    } else {
        alert('No account is currently logged in.');
    }
}

// Attach event listeners
elements.loginForm.addEventListener('submit', handleLogin);
document.getElementById('createBtn').addEventListener('click', handleCreateAccount);
document.getElementById('checkInfoBtn').addEventListener('click', handleCheckInfo);
document.getElementById('logoutBtn').addEventListener('click', logout);
elements.transactionForm.addEventListener('submit', handleTransaction);

// Test creation of infinite accounts (use with caution!)
function createInfiniteAccounts() {
    let count = 0;
    while (true) {
        const accountNumber = generateAccountNumber();
        const accountHolder = `User${accountNumber}`;
        createAccount(accountNumber, accountHolder, 0);
        count++;
        
        if (count % 10000 === 0) {
            console.log(`Created ${accounts.size} accounts so far...`);
        }
    }
}
// Uncomment to test: createInfiniteAccounts();

console.log(`Total accounts created: ${accounts.size}`);