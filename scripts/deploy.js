const hre = require("hardhat");
const fs = require('fs');
const fsPromises = fs.promises;

async function main() {
    // faz o deploy do contrato que esta na pasta contracts
    const CONTRACT = await hre.ethers.getContractFactory("CarteirinhaNFT"); // colocar nome correto do contrato que esta na pasta contracts
    const contract = await CONTRACT.deploy();
    await contract.deployed();
    console.log("Deployed contract address:", contract);

    // armazena endereco do contrato criado no arquivo deployed_contracts_address
    const contractAddress = "," + contract.address;
    fs.appendFile('./deployed_contracts_address.txt', contractAddress, err => {
        if (err) {
            console.error(err);
        }
    });

    async function getObj() {
        try {
            const data = await fsPromises.readFile('deployObject.json', 'utf8');
            const obj = JSON.parse(data);
            return obj;
        } catch (error) {
            await fsPromises.writeFile('deployObject.json', "[]");
            const data = await fsPromises.readFile('deployObject.json', 'utf8');
            const obj = JSON.parse(data);
            return obj;
        }
    }
    const deployObjArr = await getObj();
    const deployObj = new Object;      
    deployObj.address = contract.address;
    deployObj.txHash = contract.deployTransaction.hash;
    deployObj.deployer = contract.deployTransaction.from;
    deployObj.custoDeploy = contract.deployTransaction.gasPrice;
    deployObj.chainId = contract.deployTransaction.chainId;
    console.log(deployObjArr, Array.isArray(deployObjArr));
    deployObjArr.push(deployObj);    
    console.log(deployObjArr, Array.isArray(deployObjArr));
    await fsPromises.writeFile('deployObject.json', JSON.stringify(deployObjArr));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
