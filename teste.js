const axios = require("axios");
const { id } = require("ethers/lib/utils");
const { updateDecorator } = require("typescript");

const main = async () => {
  const getAchievements = async () => {
    const response = await axios.get("http://ifdot.com.br:3000/Conquistas")
    const conquistas = await response.data
    console.log(response.status, "Quantidade de conquistas " + conquistas.length)
    return conquistas
  };

  const conq = await getAchievements();
  const nomeConquistaArr = [];
  const dataConquistaArr = [];
  const idConquistaArr = [];
  conq.map(async(element) => {
    nomeConquistaArr.push(await element.nomeConquista);
    dataConquistaArr.push(await element.dataConquista);
    idConquistaArr.push(await element.id);
  });

  console.log(await nomeConquistaArr)
  console.log(await dataConquistaArr)
  console.log(await idConquistaArr)
{nomeConquista: "[a,akjjd,ksajdakdjkajsd,askldjaskjdkajsdja,asldkaskldjlasdkja,askdaskdj,asdkjaskdjaskdjalskdjalksdj,aksjdjk,dsjklj]-[asdhasdhjasd,asdjaskjasdk,jhkd,kjasdajksdkjasdkasdkj,kjsd]", idConquista: "[1,2,3,4,5,6,7,8,9]-[10,11,12,13,14]", dataCriadoBlockchain: "[11101984,11101984,11101984,11101984,11101984,11101984,11101984,11101984,11101984]-[11101984,11101984,11101984,11101984,11101984]"},

}
main()