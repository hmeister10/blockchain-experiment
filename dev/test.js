const Blockchain = require('./blockchain');

const bitcoin = new Blockchain()

const previousBlockHash =  "noHASH"
currentBlockData = [
 {
  amount: 10,
  sender: "JOHN",
  recipient: "JANE"
 },
 {
  amount: 20,
  sender: "JAMIE",
  recipient: "JONAH"
 },
 {
  amount: 30,
  sender: "JANE",
  recipient: "JANICE"
 }
]
const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData)

console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce))


let transaction = bitcoin.createNewTransaction(100, "JOHN", "JANE")
bitcoin.addTransactionToPendingTransactions(transaction)

bitcoin.createNewBlock()

// transaction = bitcoin.createNewTransaction(50, "JOHN2", "JANE2")
// bitcoin.addTransactionToPendingTransactions(transaction)

// transaction = bitcoin.createNewTransaction(300, "JOHN2", "JANE2")
// bitcoin.addTransactionToPendingTransactions(transaction)

// transaction = bitcoin.createNewTransaction(200, "JOHN2", "JANE2")
// bitcoin.addTransactionToPendingTransactions(transaction)


// bitcoin.createNewBlock(1234, "SECONDHASH", "THIRDHASH")

console.log(bitcoin)
