const getAbi = require("../helpers/getAbi.js");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
var ethers = require('ethers')
const getJsonMetadata = require("../helpers/getJsonMetadata.js");
const fs = require("fs");
const fsPromises = fs.promises;

async function main() {

    // Passe o numero do contrato a ser interagido, e em qual chainId ele esta deployado
    const contractAddress = "0xDceAA2FD8332Ed4eC3131CF26aff2687d385FdC0"; // <<-------
    const chainId = 80001; // <<-------

    const data = await getAbi(contractAddress, chainId);

    const provider = ethers.getDefaultProvider(data.rpcUrl);
    const { PRIVATE_KEY } = process.env;
    const signer = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(contractAddress, data.abi, signer);

    // PASSE A FUNCAO DO CONTRATO QUE DESEJA EXECUTAR AQUI, NO LUGAR DO "NAME()"

    const transaction = await contract._multiMint(); // <<----------------------

    // Caso escreva (pague taxa) na blockchain, eh gerado um objeto de transacao
    try {
        const interactObjArr = await getJsonMetadata("interact_metadata.json");
        const txObj = await transaction.wait();        
        const interactObj = new Object;
        interactObj.contractName = await contract.name();
        interactObj.contractAddress = txObj.to;
        interactObj.txHash = txObj.transactionHash;
        interactObj.interactorWallet = txObj.from;
        interactObj.chainId = transaction.chainId;
        interactObj.interactDate = new Date();
        interactObj.interactFee = txObj.gasUsed;
        interactObjArr.push(interactObj);
        await fsPromises.writeFile('interact_metadata.json', JSON.stringify(interactObjArr));
        console.log(interactObj);
        console.log(`Contrato deployado com sucesso! Dados do deploy salvos em "interact_metadata.json":`);
    } catch (error) {
        console.log(transaction);
        // console.log(error);
    }

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });