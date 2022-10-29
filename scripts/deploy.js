const { SignerWithAddress } = require("@nomiclabs/hardhat-ethers/signers");
const hre = require("hardhat");

async function main() {

  const TOKEN = await hre.ethers.getContractFactory("CarteirinhaNFT");
  const token = await TOKEN.deploy();

  await token.deployed();

  console.log("CarteirinhaNFT deployed to:", token.address);
  //console.log(token);

  console.log(await token.name())
  //const deployer_wallet = signer.SignerWithAddress.address;
  //console.log(deployer_wallet);

  //contractObject = await new ethers.Contract(deployedContract, abi, provider)

  // copiando e colando bytecode da polygonscan (necessario apenas para fazer deploy) - o bytecode eh o codigo fonte do contrato transformado em linguagem de maquina, que eh a linguagem que o EVM executa
  // const ContractByteCode = require("../../abiByteCode/byteCode.json")
  // const factory = new ethers.ContractFactory(abi, ContractByteCode, signer) //para deploy, eh necessario a abi, o bytecode e a assinatura da metamask conectada
  // const contrato = await factory.deploy(); //executa a funcao de deploy de fato
  // const dados_deploy = await contrato.deployTransaction.wait();
  // console.log(`Contrato deployado com sucesso da blockchain! Endereco do contrato: ${dados_deploy.contractAddress} e o txhash da transacao: ${dados_deploy.transactionash}`)
  // deployedContract = await dados_deploy.contractAddress
  // contractObject = await new ethers.Contract(deployedContract, abi, provider)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
