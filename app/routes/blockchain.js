var express = require('express');
var router = express.Router();
const { uuid } = require('uuidv4');

const Blockchain = require('../blockchain');
const bitcoin = new Blockchain();

const currentNodeAddress = uuid().split('-').join('')
console.log("Node Address:: ", currentNodeAddress)

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(bitcoin);
});

router.post('/transaction', function(req, res, next) {
  const { amount, sender, recipient } = req.body
  const transaction = bitcoin.createNewTransaction(amount, sender, recipient) 
  bitcoin.addTransactionToPendingTransactions(transaction)
  res.send(`Transaction created`); 
});

router.get('/mine', function(req, res, next) {
  

  const lastBlock = bitcoin.getLastBlock()
  const previousBlockHash = lastBlock.hash

  const currentBlockData = {
    transactions: bitcoin.pendingTransactions,
    index: lastBlock["index"] + 1
  }

  const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData)

  const currentHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce)
  
  const rewardTransaction = bitcoin.createNewTransaction(12.5, "00", currentNodeAddress)
  bitcoin.addTransactionToPendingTransactions(rewardTransaction)

  const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, currentHash)

  res.send({
    message: "New block mined successfully",
    newBlock 
  });
});

module.exports = router;
