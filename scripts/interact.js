require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
var fs = require('fs');
var ethers = require('ethers')
const fsPromises = fs.promises;

const ABI_FILE_PATH = 'artifacts/contracts/Airdrop.sol/AirdropToken.json';
const DEPLOYED_CONTRACT_ADDRESS = '0xFC3FBFf916BBD9F6df61868820665f0397F17598';
async function getAbi() { 
  const data = await fsPromises.readFile(ABI_FILE_PATH, 'utf8');
  const abi = JSON.parse(data)['abi'];
  //console.log(abi);
  return abi;
}

async function main() {
    let provider = ethers.getDefaultProvider(process.env.BSC_TESTNET_RPC_URL );
    const abi = await getAbi()
    const { PRIVATE_KEY } = process.env;
    let signer = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(DEPLOYED_CONTRACT_ADDRESS, abi, signer);

    let transacao = await contract._multiMint();
    const transacaoObj = await transacao.wait();
    const hashTransacao = transacaoObj.transactionHash;
    console.log("Comprovante da transacao: " + hashTransacao)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });