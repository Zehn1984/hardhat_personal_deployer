const deployContract = require("./contexts/deployContext.js");
const getDeployMetadata = require("./contexts/getDeployMetadataContext.js");

async function main() {

    const response = await deployContract("AirdropToken", getDeployMetadata); // MUDE APENAS O NOME DO CONTRATO
    console.log(response);

}

main();