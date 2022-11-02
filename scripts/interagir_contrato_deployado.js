require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
var fs = require('fs');
const util = require('util');
var ethers = require('ethers')
const fsPromises = fs.promises;

// The path to the contract ABI
const ABI_FILE_PATH = 'artifacts/contracts/CarteirinhaNFT.sol/CarteirinhaNFT.json';
// The address from the deployed smart contract
const DEPLOYED_CONTRACT_ADDRESS = '0x738467359AC00967e12293e2bb07bCEE97E8171b';

// load ABI from build artifacts
async function getAbi(){ 
  const data = await fsPromises.readFile(ABI_FILE_PATH, 'utf8');
  const abi = JSON.parse(data)['abi'];
  //console.log(abi);
  return abi;
}

async function main() {
    let provider = ethers.getDefaultProvider(process.env.MATIC_MAINNET_ALCHEMY_RPC_URL);
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
    const contract = new ethers.Contract(DEPLOYED_CONTRACT_ADDRESS, abi, signer);

    // let transacao = await contract.adicionarConquistaHistorico('consegui', '230822', '3');
    // const transacaoObj = await transacao.wait();
    // const hashTransacao = transacaoObj.transactionHash;
    // console.log("Comprovante da transacao: " + hashTransacao)
    const response = await contract.consultarHistorico();
    console.log(response[0].nomeConquista);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });