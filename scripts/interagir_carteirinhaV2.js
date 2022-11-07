require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
var fs = require('fs');
//const util = require('util');
var ethers = require('ethers');
const { id } = require("ethers/lib/utils");
const fsPromises = fs.promises;

// const ABI_FILE_PATH = 'artifacts/contracts/CarteirinhaNFT.sol/CarteirinhaNFT.json';
const ABI_FILE_PATH = 'artifacts/contracts/CarteirinhaV2.sol/CarteirinhaV2.json';
const DEPLOYED_CONTRACTS_ADDRESS_FILE_PATH = './deployed_contracts_address.txt';

// load ABI from build artifacts
async function getAbi(){ 
  const data = await fsPromises.readFile(ABI_FILE_PATH, 'utf8');
  const abi = JSON.parse(data)['abi'];
  return abi;
}

async function getLastContractDeployedAddress(){ 
    const data = await fsPromises.readFile(DEPLOYED_CONTRACTS_ADDRESS_FILE_PATH, 'utf8');
    const deployed_contracts_address_array = data.split(",");
    return deployed_contracts_address_array[deployed_contracts_address_array.length - 1];
  }

async function main() {

    let provider = ethers.getDefaultProvider(process.env.MATIC_TESTNET_ALCHEMY_RPC_URL); // TESTNET
    // let provider = ethers.getDefaultProvider(process.env.MATIC_MAINNET_ALCHEMY_RPC_URL); // MAINNET
    const abi = await getAbi()

    // criando objeto do contrato para executar as funcoes do mesmo
    const { PRIVATE_KEY } = process.env;
    let signer = new ethers.Wallet(PRIVATE_KEY, provider);
    const last_contract_deployed_address = await getLastContractDeployedAddress();
    const token = new ethers.Contract(last_contract_deployed_address, abi, signer);

    const response = await token.consultarHistorico();

    // Trata a string capturada do contrato para ficar no padrao JSON para ser utilizada no backend/DB
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

    const arrConquistas = []
    for(i=0; i<nomeConquistas.length; i++) {
      const conquistas = new Object;      
      conquistas.nomeConquista = nomeConquistas[i];
      conquistas.dataConquista = dataConquistas[i];
      conquistas.idConquista = idConquistas[i];
      arrConquistas.push(conquistas)
    }
    console.log(arrConquistas)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });