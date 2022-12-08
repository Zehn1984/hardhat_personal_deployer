const getAbi = require("../helpers/getAbi.js");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
var ethers = require('ethers')

async function main() {

    // Passe o numero do contrato a ser interagido, e em qual chainId ele esta deployado
    const contractAddress = "0xDceAA2FD8332Ed4eC3131CF26aff2687d385FdC0"; // <<-------
    const chainId = 80001; // <<-------

    const data = await getAbi(contractAddress, chainId);

    const provider = ethers.getDefaultProvider(data.rpcUrl);
    const { PRIVATE_KEY } = process.env;
    const signer = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(contractAddress, data.abi, signer);
    // PASSE A FUNCAO DO CONTRATO QUE DESEJA EXECUTAR AQUI, NO LUGAR DO NAME()
    const transaction = await contract.name(); // <<----------------------

    // Caso escreva (pague taxa) na blockchain, eh gerado um objeto de transacao
    try {
        const txObj = await transaction.wait();
        const txHash = await txObj.transactionHash;
        // console.log(txObj);
        // console.log(transaction);
        console.log("Comprovante da transacao: " + txHash);        
    } catch (error) {
        console.log(transaction);
    }

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });