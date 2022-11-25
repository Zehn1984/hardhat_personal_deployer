const hre = require("hardhat");
const fs = require('fs');

async function main() {
    // colocar nome correto do contrato que esta na pasta contracts
    const TOKEN = await hre.ethers.getContractFactory("CarteirinhaNFT");
    const token = await TOKEN.deploy();
    await token.deployed();
    console.log("Deployed contract address:", token.address);

    const tokenAddress = "," + token.address;

    fs.appendFile('./deployed_contracts_address.txt', tokenAddress, err => {
        if (err) {
            console.error(err);
        }
    });
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
