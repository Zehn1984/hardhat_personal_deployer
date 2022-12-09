const deployContract = require("./deploy.service.js");
const getJsonMetadata = require("../helpers/getJsonMetadata.js");
const readContractName = require("../helpers/readContractName.js");
const fs = require('fs');

async function main() {
    
    const contractName = await readContractName();
    const response = await deployContract(contractName, getJsonMetadata); // MUDE APENAS O NOME DO CONTRATO (contractName)
    console.log(response);

}

main();