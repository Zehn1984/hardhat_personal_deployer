const hre = require("hardhat");
const fs = require('fs');
const axios = require("axios");
require('dotenv').config();

const getAchievements = async () => {
  const response = await axios.get("http://localhost:3000/Conquistas")
  const conquistasDb = await response.data
  console.log(response.status, "Quantidade de conquistas " + conquistasDb.length)
  return conquistasDb
};

async function main() {

  const provider = new ethers.providers.JsonRpcProvider(process.env.MATIC_TESTNET_ALCHEMY_RPC_URL)

  const TOKEN = await hre.ethers.getContractFactory("CarteirinhaV2");
  const token = await TOKEN.deploy();

  await token.deployed();
  //console.log(token);

  const tokenAddress = "," + token.address;
  console.log("CarteirinhaV2 deployed to:", tokenAddress);


  fs.appendFile('./deployed_contracts_address.txt', tokenAddress, err => {
    if (err) {
      console.error(err);
    }
  });

  owner_wallet = await token.owner();
  console.log("Owner Wallet:" + owner_wallet);

  await token.safeMint(owner_wallet);

  let maxTry = 3
  let multiply = 1;

  const conquistas = await getAchievements();

  const nomeConquistaArr = [];
  const dataConquistaArr = [];
  const idConquistaArr = [];
  conquistas.map((element) => {
    nomeConquistaArr.push(element.nomeConquista);
    dataConquistaArr.push(element.createdAt);
    idConquistaArr.push(element.id.toString());
  });

  const nomeConquistaArray = []
  const dataConquistaArray = []
  const idConquistaArray = []

  nomeConquistaArray.push(JSON.stringify(nomeConquistaArr))
  dataConquistaArray.push(JSON.stringify(dataConquistaArr))
  idConquistaArray.push(JSON.stringify(idConquistaArr))

  const txHashConquista = []
  const blockNumberConquista = []
  const dataCriadoBlockchain = []

  for(let i = 0; i < nomeConquistaArray.length && maxTry; i++) {

    const nomeConquista = nomeConquistaArray[i];
    const dataConquista = dataConquistaArray[i];
    const idConquista = idConquistaArray[i];
    setTimeout( async () => {
      if (maxTry > 0) {
        try {
          const gravarConquista = await token.adicionarConquistaHistorico(nomeConquista, dataConquista, idConquista);
          const conquistaDeployada = await gravarConquista.wait()
          txHashConquista.push(conquistaDeployada.transactionHash)
          blockNumberConquista.push(conquistaDeployada.blockNumber)
          console.log(txHashConquista[i])
          console.log(blockNumberConquista[i])
          const blocoMineirado = await provider.getBlock(blockNumberConquista[i])
          dataCriadoBlockchain.push(new Date(blocoMineirado.timestamp * 1000))
          console.log(dataCriadoBlockchain[i])
          
        } catch (err) {
          console.log(err)
          multiply = multiply * 1.50;
          maxTry--;
        }
      } else {
        i = nomeConquistaArray.length + 1 
      }
    }, 1000 * i * multiply)
  }
  console.log("TxHash das conquistas abaixo:")
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});