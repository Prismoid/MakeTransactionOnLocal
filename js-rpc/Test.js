// external library
const Web3 = require("web3");
// const solc = require("solc"); // install
const Tx = require('ethereumjs-tx'); // install
const ethUtils = require('ethereumjs-util'); // install
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
web3.eth.defaultAccount = web3.eth.accounts[1];
const hdkey = require('ethereumjs-wallet/hdkey'); // install
const Wallet = require('ethereumjs-wallet'); // install

// making a contract instance (Test)
var contract_json = require('../build/contracts/Test.json');
var addr = contract_json.networks[1].address;
var abi = contract_json.abi;
var contract = web3.eth.contract(abi).at(addr);

// Making a Private Key, you should change a str to cryptographically secure random number,
var str = "random";
const privateKey = hdkey.fromMasterSeed(str)._hdkey._privateKey;
console.log("秘密鍵: 32Byte(=256bit), 定義域は[0, 2^256 - 1]")
console.log(privateKey);
console.log();

// Making a wallet instance from the private key
const wallet = Wallet.fromPrivateKey(privateKey);
console.log("公開鍵: 64Byte(=512bit), 圧縮すれば32Byte+1bit(=257bit)まで圧縮できる(1bitは楕円曲線上の正負判定)");
console.log(wallet.getPublicKeyString());
console.log(wallet.getPublicKey());
console.log();

// converting the above public key into Ethereum address (in this process, doing compression and Base58 conversion)
var EthAddr = "0x" + ethUtils.privateToAddress(privateKey).toString('hex');
console.log("Local Ethereum Address: " + EthAddr);
console.log();

// calling a contract function
var callData = contract.add.getData(100, 300); // 100 + 300
var result = web3.eth.call({
    to: addr, // contract address
    data: callData
});
console.log("contract function's return: " + result); // 100 + 300 = 400 (0x190 in hex)
console.log();

// making a transaction from the Ethereum address and the private key, sending it to a Ethereum node and then spreading it in the P2P network
var balance = web3.eth.getBalance(EthAddr); // Getting a local Ethereum Address's balance
console.log("Local Address's balance: " + balance);
if (balance == 0) {
    console.log("This Address doesn't have Ether");
} else {
    var callData = contract.increment.getData(); // contract increment function
    var current_nonce = web3.eth.getTransactionCount(EthAddr); // Nonces must be sequential from 0 on the main network or from 2^20 on the test network.
    var rawTx = {
    nonce: current_nonce, // you should increment this param, every time you make a transaction
	gasPrice: "0x4A817C800", // 20g wei(in hex expression)
	gasLimit: 3000000, // between [5000, 4700000]
	from: EthAddr, 
	to: contract.address, // contract addr
	value: 0, // transfer money to contract addr equals 0
	data: callData
    }
    var tx = new Tx(rawTx);
    tx.sign(privateKey);
    var serializedTx = tx.serialize();
    web3.eth.sendRawTransaction(serializedTx.toString('hex'));
    console.log("Sending Tx Success!");
}
