var fs = require('fs');
const fsPromises = fs.promises;
// The path to the contract ABI
// const ABI_FILE_PATH = 'artifacts/contracts/CarteirinhaNFT.sol/CarteirinhaNFT.json';
const ABI_FILE_PATH = 'artifacts/contracts/CarteirinhaV2.sol/CarteirinhaV2.json';
//const DEPLOYED_CONTRACTS_ADDRESS_FILE_PATH = 'deployed_contracts_address.txt';

// load ABI from build artifacts
async function getAbi(){ 
  const data = await fsPromises.readFile(ABI_FILE_PATH, 'utf8');
  const abi = JSON.parse(data)['abi'];
  console.log(abi);
  return abi;
}

async function main() {
  const abi = await getAbi()
  console.log(abi)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });