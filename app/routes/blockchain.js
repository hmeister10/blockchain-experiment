var express = require('express');
var router = express.Router();
const axios = require('axios')

const { uuid } = require('uuidv4');
const bitcoin = require('../blockchain/bitcoin')

const currentNodeAddress = uuid().split('-').join('')
console.log("Node Address:: ", currentNodeAddress)

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(bitcoin);
});

router.post('/transaction', function(req, res, next) {
  const { transaction } = req.body
  bitcoin.addTransactionToPendingTransactions(transaction)
  res.send(`Transaction added`); 
});

router.post('/transaction/broadcast', async function(req, res, next) {
  const { amount, sender, recipient } = req.body
  
  // create a new transaction
  const transaction = bitcoin.createNewTransaction(amount, sender, recipient) 

  try {
    for(currentNode of bitcoin.networkNodes ) {
      // console.log(`Registering newTransaction: ${transaction.id} on network node: ${currentNode}`)
      await registerTransactionOnNetwork(currentNode, transaction)
    }

     // add to current nodes pending transactions
      bitcoin.addTransactionToPendingTransactions(transaction)
      res.send(`Transaction created`); 
  } catch (e) {
    res.status(500).send({e})
  }

});

const registerTransactionOnNetwork = (url, transaction) => {
  return axios.post(`${url}/blockchain/transaction`, { transaction: transaction })
}

router.get('/mine', async function(req, res, next) {
  
  const lastBlock = bitcoin.getLastBlock()
  const previousBlockHash = lastBlock.hash

  const currentBlockData = {
    transactions: bitcoin.pendingTransactions,
    index: lastBlock["index"] + 1
  }

  const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData)

  const currentHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce)

  const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, currentHash)

  try {
    for(currentNode of bitcoin.networkNodes ) {
      console.log(`Registering new Block: ${newBlock} on network node: ${currentNode}`)
      await registerMinedBlockOnNetwork(currentNode, newBlock)
    }

    registerRewardTransaction()
    
    res.send({
      message: "New block mined and broadcasted successfully",
      newBlock 
    });  } catch (e) {
    console.log({e})
    res.status(500).send({e})
  }

  
});

const registerMinedBlockOnNetwork = (url, block) => {
  return axios.post(`${url}/blockchain/receive-new-block`, { block })
}

const registerRewardTransaction = () => {
  // set reward first on the current node and let it broadcast
  const url = bitcoin.currentNodeUrl;

  // use 12.5 as the amount since its what Bitcoin also does (no real reason)
  const rewardTransaction = {
    amount: 12.5,
    sender: "00",
    recipient: currentNodeAddress
  }
  return axios.post(`${url}/blockchain/transaction/broadcast`, { ...rewardTransaction })
}

router.post('/receive-new-block', function(req, res, next) {
  console.log("RECEIVE NEW BLOCK REQ STARTED")
  const { block: newBlock } = req.body

  // step1 check if the previous hash matches
  const lastBlock = bitcoin.getLastBlock()
  const previousBlockHash = lastBlock.hash

  const correctPreviousHash = newBlock.previousBlockHash === previousBlockHash
  
  // Step 2 check if the next index that comes with the newBlock will match correctly with our chain
  const correctIndex = newBlock.index === lastBlock.index + 1

  if(correctIndex && correctPreviousHash) {
    bitcoin.chain.push(newBlock)
    bitcoin.pendingTransactions = []
    res.send({
      message: "New block accepted successfully",
      newBlock 
    });
  } else {
    res.status(500).send({
      message: "New block rejected"
    });
  }
  
});

router.get('/consensus', async function(req, res, next) {
  try {
    const networkBlockchains = []
    for(currentNode of bitcoin.networkNodes ) {
      const {data: currentBlockchain} = await getBlockChain(currentNode)
      console.log(currentBlockchain)
      networkBlockchains.push(currentBlockchain)
    }

    const currentChainLength = bitcoin.chain.length
    let maxChainLength = currentChainLength 
    let newLongestChain = null
    let newPendingTransaction = null

    for (blockchain of networkBlockchains) {
      if(blockchain.chain.length > maxChainLength) {
        maxChainLength = blockchain.chain.length
        newLongestChain = blockchain.chain
        newPendingTransaction = blockchain.pendingTransactions
      }
    }

    if(!newLongestChain || (newLongestChain && !bitcoin.chainIsValid(newLongestChain))) {
      res.status(500).send({
        message: "Chain has not been replaced",
        chain: bitcoin.chain
      })
    } else {
      bitcoin.chain = newLongestChain
      bitcoin.pendingTransactions = newPendingTransaction
      res.send({
        message: "Chain has been replaced, Consensus achieved",
        chain: bitcoin.chain
      }); 
    }

  } catch (e) {
    res.status(500).send({e})
  }
});

const getBlockChain = (url) => {
  return axios.get(`${url}/blockchain`)
}



module.exports = router;
