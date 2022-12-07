const deployContract = require("./deploy.service.js");
const getDeployMetadata = require("./helpers/getJsonMetadata.js");

async function main() {

    const response = await deployContract("AirdropToken", getDeployMetadata); // MUDE APENAS O NOME DO CONTRATO
    console.log(response);

}

main();