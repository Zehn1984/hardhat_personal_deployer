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
  const tokenAddress = "," + token.address;
  console.log("CarteirinhaV2 deployed to:", tokenAddress);

  fs.appendFile('./deployed_contracts_address.txt', tokenAddress, err => {
    if (err) {
      console.error(err);
    }
  });

  const ownerWallet = await token.owner();
  console.log("Owner Wallet:" + ownerWallet);
  await token.safeMint(ownerWallet);

  const conquistas = await getAchievements();

  let [nomeConquistaArr, dataConquistaArr, idConquistaArr] = [[], [], []]

  conquistas.map((element) => {
    nomeConquistaArr.push(element.nomeConquista);
    dataConquistaArr.push(element.createdAt);
    idConquistaArr.push(element.id.toString());
  });

  nomeConquistaArr = JSON.stringify(nomeConquistaArr)
  dataConquistaArr = JSON.stringify(dataConquistaArr)
  idConquistaArr = JSON.stringify(idConquistaArr)

  const gravarConquista = await token.adicionarConquistaHistorico(nomeConquistaArr, dataConquistaArr, idConquistaArr);
  const conquistaDeployada = await gravarConquista.wait()
  const txHashConquista = conquistaDeployada.transactionHash
  const blockNumberConquista = conquistaDeployada.blockNumber
  const blocoMineirado = await provider.getBlock(blockNumberConquista)
  const dataCriadoBlockchain = new Date(blocoMineirado.timestamp * 1000)
  
  console.log(txHashConquista)
  console.log(blockNumberConquista)
  console.log(dataCriadoBlockchain)

  const response = await axios.patch("http://localhost:3000/Conquistas",
    {
      data: { dataConquista: dataCriadoBlockchain, txHashConquista },
      headers: { "Content-Type": "application/json" }
    })
    return await response.data

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});