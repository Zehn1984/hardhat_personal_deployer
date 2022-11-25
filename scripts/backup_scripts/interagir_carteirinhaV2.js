require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
var fs = require('fs');
var ethers = require('ethers');
const e = require("express");
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
    const signer = new ethers.Wallet(PRIVATE_KEY, provider);
    const last_contract_deployed_address = await getLastContractDeployedAddress();
    const token = new ethers.Contract(last_contract_deployed_address, abi, signer);

    const response = await token.consultarHistorico();

    //console.log(JSON.parse(response[0].nomeConquista))
    let [nomeConquistaArr, dataConquistaArr, idConquistaArr] = [[], [], []]
    response.map((element) => {
      let {nomeConquista, dataConquista, idConquista} = element
      nomeConquistaArr.push(JSON.parse(nomeConquista))
      dataConquistaArr.push(JSON.parse(dataConquista))
      idConquistaArr.push(JSON.parse(idConquista))
    });
    nomeConquistaArr = nomeConquistaArr.flat()
    dataConquistaArr = dataConquistaArr.flat()
    idConquistaArr = idConquistaArr.flat()

    const conquistasArr = []
    for(i=0; i<nomeConquistaArr.length; i++) {
      const conquistas = new Object;      
      conquistas.nomeConquista = nomeConquistaArr[i];
      conquistas.dataConquista = dataConquistaArr[i];
      conquistas.idConquista = parseInt(idConquistaArr[i]);
      conquistasArr.push(conquistas)
    }

    console.log(conquistasArr)
    // return conquistasArr

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });