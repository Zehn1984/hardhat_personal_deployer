require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
var fs = require('fs');
var ethers = require('ethers')
const fsPromises = fs.promises;

const ABI_FILE_PATH = 'artifacts/contracts/CarteirinhaNFT.sol/CarteirinhaNFT.json';
const DEPLOYED_CONTRACT_ADDRESS = '0x622d507143c2028B9b97f704027ac81B99c96634';
async function getAbi() { 
  const data = await fsPromises.readFile(ABI_FILE_PATH, 'utf8');
  const abi = JSON.parse(data)['abi'];
  //console.log(abi);
  return abi;
}

async function main() {
    let provider = ethers.getDefaultProvider(process.env.MATIC_MAINNET_ALCHEMY_RPC_URL);
    const abi = await getAbi()
    const { PRIVATE_KEY } = process.env;
    let signer = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(DEPLOYED_CONTRACT_ADDRESS, abi, signer);

    let transacao = await contract.adicionarConquistaHistorico('consegui', '230822', '3');
    const transacaoObj = await transacao.wait();
    const hashTransacao = transacaoObj.transactionHash;
    console.log("Comprovante da transacao: " + hashTransacao)
    const response = await contract.consultarHistorico();
    console.log(response);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });