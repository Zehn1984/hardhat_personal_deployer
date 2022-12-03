const deployContract = require("./contexts/deployContext.js")

async function main() {

    const response = await deployContract("AirdropToken"); // MUDE APENAS O NOME DO CONTRATO
    console.log(response)

}

main();