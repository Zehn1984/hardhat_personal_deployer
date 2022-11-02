require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
var fs = require('fs');
//const util = require('util');
var ethers = require('ethers')
const fsPromises = fs.promises;

// The path to the contract ABI
// const ABI_FILE_PATH = 'artifacts/contracts/CarteirinhaNFT.sol/CarteirinhaNFT.json';
const ABI_FILE_PATH = 'artifacts/contracts/CarteirinhaV2.sol/CarteirinhaV2.json';
const DEPLOYED_CONTRACTS_ADDRESS_FILE_PATH = './deployed_contracts_address.txt';

// load ABI from build artifacts
async function getAbi(){ 
  const data = await fsPromises.readFile(ABI_FILE_PATH, 'utf8');
  const abi = JSON.parse(data)['abi'];
  console.log(abi);
  return abi;
}
// const data = fs.readFileSync('./input.txt',
//             {encoding:'utf8', flag:'r'});

async function getLastContractDeployedAddress(){ 
    const data = await fsPromises.readFileSync(DEPLOYED_CONTRACTS_ADDRESS_FILE_PATH, 'utf8');
    const deployed_contracts_address_array = data.split(", ");
    console.log(deployed_contracts_address_array[0])
    return deployed_contracts_address_array[0];
  }

async function main() {
    let provider = ethers.getDefaultProvider(process.env.MATIC_TESTNET_ALCHEMY_RPC_URL); // TESTNET
    // let provider = ethers.getDefaultProvider(process.env.MATIC_MAINNET_ALCHEMY_RPC_URL); // MAINNET
    const abi = await getAbi()

    /* 
    // READ-only operations require only a provider.
    // Providers allow only for read operations.
    let contract = new ethers.Contract(DEPLOYED_CONTRACT_ADDRESS, abi, provider);
    const greeting = await contract.greet();
    console.log(greeting);
    */

    // WRITE operations require a signer
    const { PRIVATE_KEY } = process.env;
    let signer = new ethers.Wallet(PRIVATE_KEY, provider);
    const last_contract_deployed_address = await getLastContractDeployedAddress();
    last_contract_deployed_address = "0xA8C1Ea1fa3E782a5063052238563c631d1b18A32"
    const token = new ethers.Contract(last_contract_deployed_address, abi, signer);

    // let transacao = await token.adicionarConquistaHistorico("consegui", "23081984", "3");
    // const transacaoObj = await transacao.wait();
    // const hashTransacao = transacaoObj.transactionHash;
    // console.log("Comprovante da transacao: " + hashTransacao);
    
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

    const response = await token.consultarHistorico();
    console.log(await response);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });