npx hardhat compile // este comando compila os contratos existentes na pasta "contracts" e gera os artifacts e cache

npx hardhat run scripts/deploy.js --network matic // faz o deploy do contrato na rede matic, que foi configurada dentro do arquivo hardhat.config.js

npx hardhat verify --network mumbai 0x165Ba58dEe5C596eC1876A7Bee7Ff597a0840c84 // substitua o endereço pelo endereço gerado no deploy. Deve-se passar os argumentos do constructor dessa maneira.
