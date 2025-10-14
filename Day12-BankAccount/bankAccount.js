class BankAccount {
  /**
   * @param {number} initialBalance - The starting balance for the account (default 0).
   */
  constructor(initialBalance = 0) {
    // TODO: Initialize balance and transaction history (array)
    this.balance = initialBalance;
    this.history = [];
}

  /**
   * @param {number} amount - The amount to deposit (must be positive).
   * @return {boolean} - True if successful, false if invalid amount.
   */
  deposit(amount) {
    // TODO: Check if amount > 0, add to balance, push transaction to history
    if(amount <= 0){
        console.log("You should deposit a positive amount.");
        return false;
    }
    this.balance += amount;
    this.history.push({
        type: "deposit",
        amount,
        date: new Date().toISOString()
    })
    console.log("Deposit successful");
    return true;
  }

  /**
   * @param {number} amount - The amount to withdraw (must be positive and <= balance).
   * @return {boolean} - True if successful, false if invalid or insufficient funds.
   */
  withdraw(amount) {
    // TODO: Check if amount > 0 and amount <= balance, subtract from balance, push transaction
    if(amount <= 0){
        console.log("You cannot withdraw a negative amount.");
        return false;
    }
    if(amount > this.balance){
        console.log("Insufficient funds.");
        return false;
    }
    this.balance -= amount;
    this.history.push({
        type: "withdrawal",
        amount,
        date: new Date().toISOString()
    })
    console.log("Withdrawal successful");
    return true;
  }

  /**
   * @return {number} - The current balance.
   */
  getBalance() {
    // TODO: Return the balance
    return "Your balance is $" + this.balance;
  }

  /**
   * @return {array} - The list of transactions.
   */
  getTransactionHistory() {
    // TODO: Return the history array
    return this.history;
  }
}

class BankingSystem {
  constructor() {
    // TODO: Initialize accounts (object: id -> BankAccount), nextId (counter), interestRate (0.02 annual), feeRate (0.01)
    this.accounts = {};
    this.nextId = 1;
    this.interestRate = 0.02;
    this.feeRate = 0.01;
  }

  /**
   * @param {number} initialBalance - Starting balance.
   * @param {string} type - 'checking' or 'savings'.
   * @return {string} - The new account ID.
   */
  createAccount(initialBalance = 0, type = 'checking') {
    // TODO: Create a new BankAccount, assign ID (string, e.g., 'acc1'), store in this.accounts, return ID
    // Hint: Add a 'type' property to the BankAccount instance
    const id = "acc" + this.nextId;
    this.accounts[id] = new BankAccount(initialBalance, type);
    this.nextId++;
    return id;
  }

  /**
   * @param {string} fromId - Sender account ID.
   * @param {string} toId - Receiver account ID.
   * @param {number} amount - Amount to transfer.
   * @return {boolean} - True if successful.
   */
  transfer(fromId, toId, amount) {
    // TODO: Check if both accounts exist and fromId != toId
    // Calculate fee = amount * this.feeRate
    // Withdraw (amount + fee) from fromId (but record as 'transfer-out' with fee note)
    // Deposit amount to toId (record as 'transfer-in')
    // Return false on failure
    if(!this.accounts[fromId] || !this.accounts[toId] || fromId === toId){
        console.log("Invalid transfer.");
        return false;
    }
    const fee = amount * this.feeRate;
    this.accounts[fromId].withdraw(amount + fee);
    this.accounts[toId].deposit(amount);
    console.log("Transfer successful");
    return true;
  }

  /**
   * Simulate applying monthly interest to all savings accounts.
   * @return {void}
   */
  applyInterest(id) {
    // TODO: For each account, if type 'savings' and balance > 0
    // Calculate monthly interest: balance * (this.interestRate / 12)
    // Deposit interest with type 'interest'
    if(this.accounts[id].type === "savings" && this.accounts[id].balance > 0){
        const interest = balance * (this.interestRate / 12);
        this.accounts[id].deposit(interest);
        this.accounts[id].history.push({
            type: "interest",
            amount: interest,
            date: new Date().toISOString()
        })
        console.log("Interest applied");
        return true;
    }
    console.log("Interest not applied");
    return false;
  }

  /**
   * @param {string} accountId - Account to undo on.
   * @return {boolean} - True if undone.
   */
  undoLastTransaction(accountId) {
    // TODO: Get account, pop last transaction from history
    // Reverse based on type: deposit/interest -> subtract, withdraw/transfer-out -> add
    // For simplicity, don't reverse receiver side of transfers
    // Return false if no history
    const account = this.accounts[accountId];
    if(account.history.length === 0){
        console.log("No transactions to undo.");
        return false;
    }
    const transaction = account.history.pop();

    if(transaction.type === "deposit" || transaction.type === "interest"){
        account.balance -= transaction.amount;
    }else{
        account.balance += transaction.amount;
    }
    console.log("Transaction undone");
    return true;
  }

  /**
   * @return {object} - {id: balance, ...}
   */
  getAllBalances() {
    // TODO: Return object with all IDs and their balances
    return this.accounts;
  }
}

// Add this test suite to the bottom of your bankAccount.js file
// Run with: node bankAccount.js
// It will output results in a nice, readable format using console.log and console.table

console.log('=== Banking System Test Suite ===\n');

const system = new BankingSystem();

// Test 1: Create Accounts
console.log('Test 1: Creating Accounts');
const acc1 = system.createAccount(100, 'checking');
const acc2 = system.createAccount(200, 'savings');
console.log(`- Created checking account: ${acc1} (initial: 100)`);
console.log(`- Created savings account: ${acc2} (initial: 200)`);

// Test 2: Basic Deposits and Withdrawals on acc1
console.log('\nTest 2: Deposits and Withdrawals');
const acc1Deposit = new BankAccount().deposit(50); // Temp instance for isolated test
console.log(`- Deposit 50 (should succeed): ${acc1Deposit ? 'Success' : 'Failed'}`);
console.log(`- Deposit -10 (should fail): ${new BankAccount().deposit(-10) ? 'Success' : 'Failed'}`);
console.log(`- Withdraw 30 from acc1 (balance 100): ${system.accounts[acc1].withdraw(30) ? 'Success' : 'Failed'}`);
console.log(`- Withdraw 200 from acc1 (insufficient): ${system.accounts[acc1].withdraw(200) ? 'Success' : 'Failed'}`);

// Test 3: Transfer
console.log('\nTest 3: Transfer from acc1 to acc2');
console.log(`- acc1 balance before: ${system.accounts[acc1].getBalance()}`);
console.log(`- acc2 balance before: ${system.accounts[acc2].getBalance()}`);
const transferResult = system.transfer(acc1, acc2, 50);
console.log(`- Transfer 50 (with 1% fee ~0.5): ${transferResult ? 'Success' : 'Failed'}`);
console.log(`- acc1 balance after: ${system.accounts[acc1].getBalance()}`);
console.log(`- acc2 balance after: ${system.accounts[acc2].getBalance()}`);

// Test 4: Apply Interest (note: your impl takes id, so testing on acc2)
console.log('\nTest 4: Apply Interest');
const interestResult = system.applyInterest(acc2);
console.log(`- Interest on acc2 (savings): ${interestResult ? 'Success' : 'Failed'}`);
console.log(`- acc2 balance after interest: ${system.accounts[acc2].getBalance()}`);

// Test 5: Undo Last Transaction
console.log('\nTest 5: Undo Transaction');
console.log(`- acc1 balance before undo: ${system.accounts[acc1].getBalance()}`);
const undoResult = system.undoLastTransaction(acc1);
console.log(`- Undo on acc1: ${undoResult ? 'Success' : 'Failed'}`);
console.log(`- acc1 balance after undo: ${system.accounts[acc1].getBalance()}`);

// Test 6: Get All Balances and History
console.log('\nTest 6: All Balances and Sample History');
const allBalances = system.getAllBalances();
console.log('- All Balances:', allBalances);
console.table(allBalances); // Nice table view if balances were numbers
console.log('- Sample History for acc1:');
console.table(system.accounts[acc1].getTransactionHistory().slice(-3)); // Last 3

console.log('\n=== Test Suite Complete ===');
console.log('Note: Check console for any errors. Some tests may fail due to bugs—fix them next!');