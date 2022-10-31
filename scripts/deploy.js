const { SignerWithAddress } = require("@nomiclabs/hardhat-ethers/signers");
const hre = require("hardhat");

async function main() {

  const TOKEN = await hre.ethers.getContractFactory("CarteirinhaNFT");
  const token = await TOKEN.deploy();

  await token.deployed();

  console.log("CarteirinhaNFT deployed to:", token.address);
  //console.log(token);

  owner_wallet = await token.owner();
  console.log("Owner Wallet:", owner_wallet);
  await token.safeMint(owner_wallet);
  
  const nomeConquista = "bola_automatica";
  const dataConquista = 29102022;
  const idConquista = 001;

  // passos: fazer deploy, fazer mint, adicionar todas as conquistas (buscar do banco de dados e fazer loop para adicionar uma a uma), e por fim, fazer transferencia para carteira do jimmy

  await token.adicionarConquistaHistorico(nomeConquista, dataConquista, idConquista);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
