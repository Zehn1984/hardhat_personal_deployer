const axios = require('axios');
const { ethers } = require('ethers');
const { etherscan } = require("../../hardhat.config.js");

console.log(etherscan);

// async function getAbi(contractAddress, chainId) {

// const address = contractAddress;
// const chainId = chainId;;
// const apiKey = 
// const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${apiKey}`
// const infuraUrl = ''

// // https://api.polygonscan.com/api?module=contract&action=getabi&address=0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270&apikey=YourApiKeyToken

// const getAbi = async () => {
//   const res = await axios.get(url)
//   const abi = JSON.parse(res.data.result)
//   // console.log(abi)

//   const provider = new ethers.providers.JsonRpcProvider(infuraUrl)
//   const contract = new ethers.Contract(
//     address,
//     abi,
//     provider
//   )

//   const name = await contract.name()
//   const totalSupply = await contract.totalSupply()

//   console.log(name)
//   console.log(totalSupply.toString())
// }
// }
// getAbi()