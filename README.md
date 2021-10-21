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
<br>
# Block Explorer

There is a basic block explorer that will help you find elements from the blockchain

<img width="646" alt="Screenshot 2021-10-21 at 11 48 01 AM" src="[https://user-images.githubusercontent.com/7304486/138224643-fff37710-d152-4a2a-b6d5-9a3f83fd557b.png](https://user-images.githubusercontent.com/7304486/138224643-fff37710-d152-4a2a-b6d5-9a3f83fd557b.png)">
<img width="971" alt="Screenshot 2021-10-21 at 11 47 57 AM" src="[https://user-images.githubusercontent.com/7304486/138224658-be5ddae2-47c3-4ee7-b9fa-a710bace2411.png](https://user-images.githubusercontent.com/7304486/138224658-be5ddae2-47c3-4ee7-b9fa-a710bace2411.png)">

# Workign of the blockchain

## Registering Nodes

<img width="1135" alt="image" src="[https://user-images.githubusercontent.com/2339864/138227168-83d24652-efe1-4305-93e7-5384c9cce3ce.png](https://user-images.githubusercontent.com/2339864/138227168-83d24652-efe1-4305-93e7-5384c9cce3ce.png)">

<br>
## Syncronising every new transaction
<br>
<br>
## Syncronising new blocks when blocks are mined
<br>
<br>
## Consensus

this is achieved by hitting the /consesus route on the new block. This block will then call all the other blocks in the network and then decide with blockchain it wants to copy over.

The consensus algorithm used in this example is the longest chain wins example
This is done because of 2 assumptions
1\. The longest chain did the most work to save data
2\. Since its the longest it will have correct data