const getAbi = require("./getAbi.service.js");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
var ethers = require('ethers')

async function main() {

    const contractAddress = "0xDceAA2FD8332Ed4eC3131CF26aff2687d385FdC0";
    const chainId = 80001;
    
    const data = await getAbi(contractAddress, chainId);
    //console.log(data)

    const provider = ethers.getDefaultProvider(data.rpcUrl);
    const { PRIVATE_KEY } = process.env;
    const signer = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(contractAddress, data.abi, signer);
    console.log(contract);
    const transaction = await contract.name();

    console.log(transaction);
    const txObj = await transaction.wait();
    // const txHash = transaction.transactionHash;
    // console.log("Comprovante da transacao: " + txHash);
    console.log(txObj);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });