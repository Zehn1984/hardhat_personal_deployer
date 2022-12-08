const deployContract = require("./deploy.service.js");
const getJsonMetadata = require("../helpers/getJsonMetadata.js");

async function main() {

    const response = await deployContract("AirdropToken", getJsonMetadata); // MUDE APENAS O NOME DO CONTRATO
    console.log(response);

}

main();