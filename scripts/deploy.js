const hre = require("hardhat");
const fs = require('fs');

async function main() {
    // faz o deploy do contrato que esta na pasta contracts
    const CONTRACT = await hre.ethers.getContractFactory("CarteirinhaNFT"); // colocar nome correto do contrato que esta na pasta contracts
    const contract = await CONTRACT.deploy();
    await contract.deployed();
    console.log("Deployed contract address:", contract.address);

    // armazena endereco do contrato criado no arquivo deployed_contracts_address
    const contractAddress = "," + contract.address;
    fs.appendFile('./deployed_contracts_address.txt', contractAddress, err => {
        if (err) {
            console.error(err);
        }
    });
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
