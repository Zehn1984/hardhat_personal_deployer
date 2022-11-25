import hre from "hardhat";
import axios from "axios";

export async function main() {
  const getAchievements = async () => {
    const response = await axios.get("http://localhost:3000/Conquistas")
    return conquistas
  };

  const conquistas = await getAchievements();
  const TOKEN = await hre.ethers.getContractFactory("CarteirinhaNFT");
  const token = await TOKEN.deploy();

  await token.deployed();
  //console.log(token);

  console.log("CarteirinhaNFT deployed to:", token.address);

  const owner_wallet = await token.owner();
  console.log("Owner Wallet:", owner_wallet);

  await token.safeMint(owner_wallet);

  let maxTry = 3
  let multiply = 1;
  let awaitToResponse = 0
  const TxHashDasConquista = [];


  for(let i = 0; i < conquistas.length && maxTry; i++) {
    awaitToResponse = i
    const conquistaAtual = conquistas[i]
    const {nomeConquista, dataCriadoBlockchain, idConquista} = conquistaAtual
    setTimeout( async () => {
      if (maxTry > 0) {
        try {
          const gravarConquista = await token.adicionarConquistaHistorico(nomeConquista, parseInt(dataCriadoBlockchain), parseInt(idConquista));
          const conquistaDeployada = await gravarConquista.wait()
          const conquistaObj = {
            name: conquistaAtual.nomeConquista,
            txHash: conquistaDeployada.transactionHash
          }
          TxHashDasConquista.push(conquistaObj)
        } catch (err) {
          console.log(err)
          multiply = multiply * 1.50;
          maxTry--;
        }
      } else {
        i = conquistas.length + 1 
      }
      awaitToResponse = i
    }, 1000 * i * multiply);
  }

  const loadTime = await new Promise((resolve) => setTimeout(() => {
    return resolve(TxHashDasConquista)
  }, 2000 * awaitToResponse));
  return loadTime
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
