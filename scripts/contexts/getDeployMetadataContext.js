const fs = require('fs');
const fsPromises = fs.promises;

// Busca os metadados JSON dos contratos criados
async function getDeployMetadata() {
    try {
        const data = await fsPromises.readFile('deploy_metadata.json', 'utf8');
        const obj = JSON.parse(data);
        return obj;
    } catch (error) {
        await fsPromises.writeFile('deploy_metadata.json', "[]");
        const data = await fsPromises.readFile('deploy_metadata.json', 'utf8');
        const obj = JSON.parse(data);
        return obj;
    }
}

module.exports = getDeployMetadata;