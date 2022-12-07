const hre = require("hardhat");
const fs = require("fs");
const fsPromises = fs.promises;

async function deployContract(tokenName, getJsonMetadata) {
    try {
        // Faz o deploy do contrato que esta na pasta contracts
        const CONTRACT = await hre.ethers.getContractFactory(tokenName);
        const contract = await CONTRACT.deploy();
        await contract.deployed();
        // Pega os metadados dos deploys ja feitos no passado, chamando a funcao na pasta helpers  
        const deployObjArr = await getJsonMetadata("deploys_metadata.json");

        // Adiciona metadados do novo contrato deployado ao arquivo deploys_metadata.json
        const deployObj = new Object;
        deployObj.name = tokenName;
        deployObj.contractAddress = contract.address;
        deployObj.txHash = contract.deployTransaction.hash;
        deployObj.deployerWallet = contract.deployTransaction.from;
        deployObj.deployedChainId = contract.deployTransaction.chainId;
        deployObj.deployDate = new Date();
        deployObj.deployFee = contract.deployTransaction.gasPrice;
        deployObjArr.push(deployObj);
        await fsPromises.writeFile('deploys_metadata.json', JSON.stringify(deployObjArr));
        console.log(`Contrato deployado com sucesso! Dados do deploy salvos em "deploys_metadata.json":`);
        return deployObj;
        
    } catch (error) {
        return error;
    }
}

module.exports = deployContract;