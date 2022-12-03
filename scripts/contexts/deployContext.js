const hre = require("hardhat");
const fs = require('fs');
const fsPromises = fs.promises;

async function deployContract(tokenName) {
    try {
        // Faz o deploy do contrato que esta na pasta contracts
        const CONTRACT = await hre.ethers.getContractFactory(tokenName); // colocar nome correto do contrato que esta na pasta contracts
        const contract = await CONTRACT.deploy();
        await contract.deployed();
    
        // Busca os metadados JSON dos contratos criados
        async function getDeploysMetadata() {
            try {
                const data = await fsPromises.readFile('deploys_metadata.json', 'utf8');
                const obj = JSON.parse(data);
                return obj;
            } catch (error) {
                await fsPromises.writeFile('deploys_metadata.json', "[]");
                const data = await fsPromises.readFile('deploys_metadata.json', 'utf8');
                const obj = JSON.parse(data);
                return obj;
            }
        }
    
        // Adiciona metadados do novo contrato deployado ao arquivo deploys_metadata.json
        const deployObjArr = await getDeploysMetadata();
        const deployObj = new Object;      
        deployObj.contractAddress = contract.address;
        deployObj.txHash = contract.deployTransaction.hash;
        deployObj.deployerWallet = contract.deployTransaction.from;
        deployObj.deployedChainId = contract.deployTransaction.chainId;
        deployObj.deployDate = new Date();
        deployObj.deployFee = contract.deployTransaction.gasPrice;
        deployObjArr.push(deployObj);
        await fsPromises.writeFile('deploys_metadata.json', JSON.stringify(deployObjArr));
        console.log(`Contrato deployado com sucesso! Dados do deploy salvos em "deploys_metadata.json":`)
        return deployObj;
        
    } catch (error) {
        return error;
    }
}

module.exports = deployContract;