const getAbi = require("./getAbi.service.js");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
var ethers = require('ethers')

async function main() {

    const contractAddress = "0xDceAA2FD8332Ed4eC3131CF26aff2687d385FdC0";
    const chainId = 80001
    const abi = await getAbi(contractAddress, chainId);
    console.log(abi)

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });



// const ABI_FILE_PATH = 'artifacts/contracts/Airdrop.sol/AirdropToken.json';
// const DEPLOYED_CONTRACT_ADDRESS = '0xFC3FBFf916BBD9F6df61868820665f0397F17598';

// async function main() {
//     let provider = ethers.getDefaultProvider(process.env.BSC_TESTNET_RPC_URL );
//     const abi = await getAbi()
//     const { PRIVATE_KEY } = process.env;
//     let signer = new ethers.Wallet(PRIVATE_KEY, provider);
//     const contract = new ethers.Contract(DEPLOYED_CONTRACT_ADDRESS, abi, signer);

//     let transacao = await contract._multiMint();
//     const transacaoObj = await transacao.wait();
//     const hashTransacao = transacaoObj.transactionHash;
//     console.log("Comprovante da transacao: " + hashTransacao);
// }