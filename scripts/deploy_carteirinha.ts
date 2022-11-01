import hre from "hardhat";
import axios from "axios";

// const conquistas =[
//   {nomeConquista: "a", idConquista: 1, dataCriadoBlockchain: 11101984},
//   {nomeConquista: "ab", idConquista: 2, dataCriadoBlockchain: 11101984},
//   {nomeConquista: "abc", idConquista: 3, dataCriadoBlockchain: 11101984},
//   {nomeConquista: "abcd", idConquista: 4, dataCriadoBlockchain: 11101984},
//   {nomeConquista: "abcde", idConquista: 5, dataCriadoBlockchain: 11101984},
//   {nomeConquista: "abcdef", idConquista: 6, dataCriadoBlockchain: 11101984},
//   {nomeConquista: "abcdefg", idConquista: 7, dataCriadoBlockchain: 11101984},
//   {nomeConquista: "abcdefgh", idConquista: 8, dataCriadoBlockchain: 11101984}
// ]



export async function main() {
  const getAchievements = async () => {
    const response = await axios.get("http://localhost:3000/Conquistas")
    const conquistas = await response.data
    console.log(response.status, "Qunatidade de conquistas "+conquistas.length)
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
  const TxHashDasConquista: any = [];


  for(let i = 0; i < conquistas.length && maxTry; i++) {
    awaitToResponse = i
    const conquistaAtual = conquistas[i]
    const {nomeConquista, dataCriadoBlockchain, idConquista} = conquistaAtual
    setTimeout( async () => {
      if (maxTry > 0) {
        try {
          const gravarConquista = await token.adicionarConquistaHistorico(nomeConquista, parseInt(dataCriadoBlockchain), idConquista);
          const conquistaDeployada = await gravarConquista.wait()
          console.log(conquistaAtual.nomeConquista)
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
  }, 30000));
  return loadTime
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
