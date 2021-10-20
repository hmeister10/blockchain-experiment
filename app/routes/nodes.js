var express = require('express');
const bitcoin = require('../blockchain/bitcoin');
const axios = require('axios')
var router = express.Router();

router.post('/register', function(req, res, next) {
  const nodeToRegister = req.body.networkNode
  bitcoin.networkNodes.push(nodeToRegister)
  console.log({
    message: "node registered",
    networkNodes: bitcoin.networkNodes
  })
  res.send({
    message: "node registered",
    networkNodes: bitcoin.networkNodes
  })
});

router.post('/register-and-broadcast', async function(req, res, next) {
  const networkNode = req.body.networkNode
  
  // register the new node on all the network nodes
  try {
    for(currentNode of bitcoin.networkNodes ) {
      console.log(`Registering NewNode: ${networkNode} on network node: ${currentNode}`)
      await registerNodeOnNetwork(currentNode, networkNode)
    }

    // register the all other nodes on the new node
    registerAllOtherNodesOnNewNode(networkNode, [...bitcoin.networkNodes, bitcoin.currentNodeUrl])


    // establish consensus on the new node
    establishConsensusOnNetworkNode(networkNode)

    // register the new node on the current node
    bitcoin.networkNodes.push(networkNode)

    res.send({
      message: "node registered and broadcasted to the mesh",
      networkNodes: bitcoin.networkNodes
    })
  }
  catch(err) {
    res.status(500).send({ err })
  }

  
});

const registerNodeOnNetwork = (url, nodeToRegister) => {
  return axios.post(`${url}/nodes/register`, { networkNode: nodeToRegister })
}

const establishConsensusOnNetworkNode = (url) => {
  return axios.get(`${url}/blockchain/consensus`)

}

const registerAllOtherNodesOnNewNode = (url, nodesToRegister) => {
  return axios.post(`${url}/nodes/register/bulk`, { nodesToRegister })
}

router.post('/register/bulk', function(req, res, next) {
  const nodesToRegister = req.body.nodesToRegister;
  bitcoin.networkNodes = [...bitcoin.networkNodes, ...nodesToRegister];
  res.send({
    message: "node registered successfully",
    networkNodes: bitcoin.networkNodes
  })
});

module.exports = router;
