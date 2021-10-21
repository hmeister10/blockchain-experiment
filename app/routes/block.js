var express = require('express');
var router = express.Router();
const bitcoin = require('../blockchain/bitcoin');

router.get('/:blockHash', async function(req, res, next) {
  try {
    const blockHash = req.params.blockHash
    const block = bitcoin.getBlock(blockHash)
    res.send({
      block
    })
  } catch (e) {
    res.status(500).send({e})
  }
});


router.get('/transaction/:transactionId', async function(req, res, next) {
  try {
    const transactionId = req.params.transactionId
    const transactionData = bitcoin.getTransaction(transactionId)
    res.send({
      transaction: transactionData.transaction,
      block: transactionData.block,
    })
  } catch (e) {
    res.status(500).send({e})
  }
});

router.get('/address/:address', async function(req, res, next) {
  try {
    const address = req.params.address;
    const addressData = bitcoin.getAddressData(address)
    res.send({
      addressData
    })
  } catch (e) {
    res.status(500).send({e})
  }
});

module.exports = router;
