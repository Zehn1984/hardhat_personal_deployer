const fs = require('fs')
fsPromises = fs.promises;

async function readContractName() {
    let contractName = "";
    const files = fs.readdirSync('contracts'); // Le os nomes dos arquivos da pasta contracts e guarda na array files
    const contractFileName = files[0];
    const directoryPath = `contracts/${contractFileName}`;
    const data = await fsPromises.readFile(directoryPath, 'utf8');
    // faz tratamento de string para filtrar nome do contrato
    const dataSplitted = data.split(" ");
    dataSplitted.map((element, i) => {
        if (element === "constructor()") {
            let stringManipulated = dataSplitted[i+1];            
            stringManipulated = stringManipulated.split("\"");
            contractName = stringManipulated[1];
            contractName = contractName.split(".");
        }        
    })
    // console.log(contractName[0])
    return contractName[0];
}

module.exports = readContractName;