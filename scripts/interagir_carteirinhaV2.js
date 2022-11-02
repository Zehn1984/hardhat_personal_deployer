require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
var fs = require('fs');
//const util = require('util');
var ethers = require('ethers');
const { id } = require("ethers/lib/utils");
const fsPromises = fs.promises;

// The path to the contract ABI
// const ABI_FILE_PATH = 'artifacts/contracts/CarteirinhaNFT.sol/CarteirinhaNFT.json';
const ABI_FILE_PATH = 'artifacts/contracts/CarteirinhaV2.sol/CarteirinhaV2.json';
const DEPLOYED_CONTRACTS_ADDRESS_FILE_PATH = './deployed_contracts_address.txt';

// load ABI from build artifacts
async function getAbi(){ 
  const data = await fsPromises.readFile(ABI_FILE_PATH, 'utf8');
  const abi = JSON.parse(data)['abi'];
  //console.log(abi);
  return abi;
}
// const data = fs.readFileSync('./input.txt',
//             {encoding:'utf8', flag:'r'});

async function getLastContractDeployedAddress(){ 
    const data = await fsPromises.readFile(DEPLOYED_CONTRACTS_ADDRESS_FILE_PATH, 'utf8');
    const deployed_contracts_address_array = data.split(",");
    return deployed_contracts_address_array[deployed_contracts_address_array.length - 1];
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
    //const last_contract_deployed_address = "0xC202EeEB5d3f12aA9D8e5C35ed1115564Fe538A7"
    const token = new ethers.Contract(last_contract_deployed_address, abi, signer);

    // let transacao = await token.adicionarConquistaHistorico("consegui", "23081984", "3");
    // const transacaoObj = await transacao.wait();
    // const hashTransacao = transacaoObj.transactionHash;
    // console.log("Comprovante da transacao: " + hashTransacao);
    
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

    const response = await token.consultarHistorico();
    //console.log(await response[0].nomeConquista, response[0].dataConquista, response[0].idConquista);
 
    async function trataConquista(tipoConquista) {
      const ConquistaArrayStringSplit = await (response[0][tipoConquista]).split("-");
      const ConquistaArr = [];

      for(i=0; i<ConquistaArrayStringSplit.length; i++) {
        ConquistaArr.push((ConquistaArrayStringSplit[i].replace("[","").replace("]","")).split(","));
      }

      for(i=0; i<ConquistaArr.length-1; i++) {
        ConquistaArr2 = ConquistaArr[i].concat(ConquistaArr[i+1])
      }
      return ConquistaArr2;
    }
    const nomeConquistas = await trataConquista("nomeConquista");
    const dataConquistas = await trataConquista("dataConquista");
    const idConquistas = await trataConquista("idConquista");
    console.log(nomeConquistas, dataConquistas, idConquistas)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });