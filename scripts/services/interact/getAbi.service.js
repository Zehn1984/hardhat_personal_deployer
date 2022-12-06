const axios = require('axios');
const { etherscan } = require("../../../hardhat.config.js");

// Retorna a ABI de qualquer contrato das redes que estao cadastradas no hardhat.config.js
async function getAbi(contractAddress, chainId) {
    // console.log(etherscan)
    etherscan.customChains.map((element) => {     
        if(element.chainId === chainId) {
            apiUrl = element.urls.apiURL;
            chainName = element.network;
            apiKey = etherscan.apiKey[`${chainName}`];
            chainData = new Object({ apiUrl, chainName, apiKey });
        };
    });    
    // console.log(chainData)
    const url = `${chainData.apiUrl}?module=contract&action=getabi&address=${contractAddress}&apikey=${chainData.apiKey}`;
    const response = await axios.get(url);
    const abi = JSON.parse(response.data.result);
    // console.log(abi);
    
    return abi;

};

module.exports = getAbi;

//getAbi("0xDceAA2FD8332Ed4eC3131CF26aff2687d385FdC0", 80001);