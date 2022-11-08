const axios = require("axios");

const main = async () => {
  const getAchievements = async () => {
    const response = await axios.get("http://localhost:3000/Conquistas")
    const conquistas = await response.data
    console.log(response.status, "Quantidade de conquistas " + conquistas.length)
    return conquistas
  };

  const conq = await getAchievements();

  console.log(conq)

  const nomeConquistaArr = [];
  const dataConquistaArr = [];
  const idConquistaArr = [];
  conq.map((element) => {
    nomeConquistaArr.push(element.nomeConquista);
    dataConquistaArr.push(element.createdAt);
    idConquistaArr.push(element.id.toString());
  });

  const nomeConquistaArray = []
  const dataConquistaArray = []
  const idConquistaArray = []

  nomeConquistaArray.push(JSON.stringify(nomeConquistaArr))
  dataConquistaArray.push(JSON.stringify(dataConquistaArr))
  idConquistaArray.push(JSON.stringify(idConquistaArr))

  console.log(nomeConquistaArray)
  console.log(dataConquistaArray)
  console.log(idConquistaArray)
  console.log(nomeConquistaArray.length)

}
main()