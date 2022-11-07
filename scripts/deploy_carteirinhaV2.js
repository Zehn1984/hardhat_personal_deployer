const hre = require("hardhat");
const fs = require('fs');
const axios = require("axios");

// const conquistas =[
//   // {nomeConquista: "bola", idConquista: "001", dataCriadoBlockchain: "11101984"}

//   {nomeConquista: "[a,akjjd,ksajdakdjkajsd,askldjaskjdkajsdja,asldkaskldjlasdkja,askdaskdj,asdkjaskdjaskdjalskdjalksdj,aksjdjk,dsjklj]-[asdhasdhjasd,asdjaskjasdk,jhkd,kjasdajksdkjasdkasdkj,kjsd]", idConquista: "[1,2,3,4,5,6,7,8,9]-[10,11,12,13,14]", dataCriadoBlockchain: "[11101984,11101984,11101984,11101984,11101984,11101984,11101984,11101984,11101984]-[11101984,11101984,11101984,11101984,11101984]"},
//   {nomeConquista: "[a,akjjd,ksajdakdjkajsd,askldjaskjdkajsdja,asldkaskldjlasdkja,askdaskdj,asdkjaskdjaskdjalskdjalksdj,aksjdjk,dsjklj]-[asdhasdhjasd,asdjaskjasdk,jhkd,kjasdajksdkjasdkasdkj,kjsd]", idConquista: "[1,2,3,4,5,6,7,8,9]-[10,11,12,13,14]", dataCriadoBlockchain: "[11101984,11101984,11101984,11101984,11101984,11101984,11101984,11101984,11101984]-[11101984,11101984,11101984,11101984,11101984]"},
//   {nomeConquista: "[a,akjjd,ksajdakdjkajsd,askldjaskjdkajsdja,asldkaskldjlasdkja,askdaskdj,asdkjaskdjaskdjalskdjalksdj,aksjdjk,dsjklj]-[asdhasdhjasd,asdjaskjasdk,jhkd,kjasdajksdkjasdkasdkj,kjsd]", idConquista: "[1,2,3,4,5,6,7,8,9]-[10,11,12,13,14]", dataCriadoBlockchain: "[11101984,11101984,11101984,11101984,11101984,11101984,11101984,11101984,11101984]-[11101984,11101984,11101984,11101984,11101984]"}

// ]

// const getAchievements = async () => {
//   const response = await axios.get("http://localhost:3000/Conquistas")
//   const conquistas = await response.data
//   console.log(response.status, "Quantidade de conquistas "+ conquistas.length)
//   return conquistas
// };

async function main() {

  const conquistas = await getAchievements();
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
  console.log("Owner Wallet:", owner_wallet);

  await token.safeMint(owner_wallet);

  let maxTry = 3
  let multiply = 1;

  for(let i = 0; i < conquistas.length && maxTry; i++) {
    const conquistaAtual = conquistas[i]
    const {nomeConquista, dataCriadoBlockchain, idConquista} = conquistaAtual
    setTimeout( async () => {
      if (maxTry > 0) {
        try {
          const gravarConquista = await token.adicionarConquistaHistorico(nomeConquista, dataCriadoBlockchain, idConquista);
          const conquistaDeployada = await gravarConquista.wait()
          console.log(conquistaAtual.nomeConquista)
          console.log(conquistaDeployada.transactionHash)
        } catch (err) {
          console.log(err)
          multiply = multiply * 1.50;
          maxTry--;
        }
      } else {
        i = conquistas.length + 1 
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