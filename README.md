# Getting Started

1. Go to the /app directory and install all the node modules  using

```
cd app
npm install
```

2\. Run all the nodes locally
<br>
```
npm run all
```

3\. Import the postman Collection "Blockchain sample\.postman\_collection\.json"

<br>
# Using the Postman Collection

Note: The Postman Collection is exported in v2 of the postman spec

Each request in the collection is marked with a node number (eg. Node 1, Node 3 etc.)
This refers to the localhost port that is running
Node 1 => [http://localhost:3001](http://localhost:3001)
Node 2 => [http://localhost:3002](http://localhost:3002)
Node 3 => [http://localhost:3003](http://localhost:3003)
Node 4 => [http://localhost:3004](http://localhost:3004)
Node 5 => [http://localhost:3005](http://localhost:3005)

to quikcly open all the nodes together you can use the command

```
npm run openAll
```

# Essentials of the blockchain
<br>
1\. Decentralizing the Chain

Start by linking the nodes to each other. What I was doing to understand this was to Register nodes 2,3,4 to node 1
Once they are linked all transactions added. / new blocks mined will be auto synced

2\. Mining Blocks
Use the postman collection to mine new blocks on any one of the connected nodes (Node 1, 2, 3, or 4)

3\. Adding transactions
Use the postman collection to add new transactions to any one of the connected nodes

4\. Adding more nodes \(with Consensus established\)
You will notice that all nodes except 5 have data being synced. To add Node 5 to the mesh all you need to do now is call the register endpoint for Node 5 to any of the other nodes