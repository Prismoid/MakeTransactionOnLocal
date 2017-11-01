# Caution!
using web3@0.16.0

## usage
1. running a Ethereum (or Ethereum Classic) node
2. compile and migrate contracts
```
truffle compile
truffle migrate
```
or
on the truffle console
```
> migrate --reset
```
3. Setting npm init
```
cd ./js-rpc
npm init
npm install 
```
4. calling web3.js RPC
```
cd ./js-rpc
node Test.js
```

## References
1. ethereum-js, how to get data param

https://ethereum.stackexchange.com/questions/21402/web3-eth-call-how-can-i-set-data-param

2. Contract function key

keccak256("get()")'s first 4 byte is the key of contract function

https://github.com/ethereum/wiki/wiki/JavaScript-API#web3ethcall

3. example of ethereumjs-tx

https://ethereum.stackexchange.com/questions/21428/contract-state-does-not-change-after-sendtransaction

4. how to use secp256k1

https://github.com/cryptocoinjs/secp256k1-node/blob/master/README.md

5. how to get public-key from private-key

https://ethereum.stackexchange.com/questions/11253/ethereumjs-how-to-get-public-key-from-private-key

6. how to make Transactions

https://ethereum.stackexchange.com/questions/25839/how-to-make-transactions-using-private-key-in-web3

7. What is the ethereum transaction data structure?

https://ethereum.stackexchange.com/questions/1990/what-is-the-ethereum-transaction-data-structure