const fs = require('fs')
fsPromises = fs.promises;
const files = fs.readdirSync('contracts');

async function readContractName() {
    let contractName = "";
    const contractFileName = files[0];
    const directoryPath = `contracts/${contractFileName}`;
    const data = await fsPromises.readFile(directoryPath, 'utf8');
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