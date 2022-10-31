const { SignerWithAddress } = require("@nomiclabs/hardhat-ethers/signers");
const hre = require("hardhat");


const conquistas =[
  {nomeConquista: "a", idConquista: 1, dataCriadoBlockchain: 11101984},
  {nomeConquista: "ab", idConquista: 2, dataCriadoBlockchain: 11101984},
  {nomeConquista: "abc", idConquista: 3, dataCriadoBlockchain: 11101984},
  {nomeConquista: "abcd", idConquista: 4, dataCriadoBlockchain: 11101984},
  {nomeConquista: "abcde", idConquista: 5, dataCriadoBlockchain: 11101984},
  {nomeConquista: "abcdef", idConquista: 6, dataCriadoBlockchain: 11101984},
  {nomeConquista: "abcdefg", idConquista: 7, dataCriadoBlockchain: 11101984},
  {nomeConquista: "abcdefgh", idConquista: 8, dataCriadoBlockchain: 11101984}
]

async function main() {

  const TOKEN = await hre.ethers.getContractFactory("CarteirinhaNFT");
  const token = await TOKEN.deploy();

  await token.deployed();
  //console.log(token);

  console.log("CarteirinhaNFT deployed to:", token.address);

  owner_wallet = await token.owner();
  console.log("Owner Wallet:", owner_wallet);

  await token.safeMint(owner_wallet);
  
  const nomeConquista = "bola_automatica";
  const dataConquista = 29102022;
  const idConquista = 001;

  let maxTry = conquistas.length / 2
  let index = 0
  let time = 0

  // while(index <= conquistas.length || maxTry > 0) {
  //   console.log(i)
  //   const {nomeConquista, dataCriadoBlockchain, idConquista} = conquistas[index];
  //   setTimeout(async () => {
  //     try {
  //       const gravarConquista = await token.adicionarConquistaHistorico(nomeConquista, dataCriadoBlockchain, idConquista);
  //       const waitResponse = await gravarConquista.wait()
  //       //if (!gravarConquista) throw new Error()
  //       console.log(waitResponse)
  //       index++
  //       time++
  //       console.log("DEU CERTO")
  //     } catch (err) {
  //       maxTry--
  //       time = time * 2
  //       console.log("ERROR")
  //       if (maxTry === 0) {
  //         index = conquistas.length + 1
  //         console.log("Não fo possivel gravar as conquistas")
  //       }
  //     }
  //   }, 1000 * time)
  // }

  //passos: fazer deploy, fazer mint, adicionar todas as conquistas (buscar do banco de dados e fazer loop para adicionar uma a uma), e por fim, fazer transferencia para carteira do jimmy
  conquistas.map( async (conquista, i) => {
    const {nomeConquista, dataCriadoBlockchain, idConquista} = conquista
    setTimeout(async () => {
      try {
        const a = await token.adicionarConquistaHistorico(nomeConquista, dataCriadoBlockchain, idConquista);
        console.log(await a.wait())
      } catch (err) {
        console.log(i)
      } 
    }, 1000 * i)
  })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
