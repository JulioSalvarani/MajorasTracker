const cardcontainer = document.querySelector(".card-container"); // seleciona a classe card-container
const inputBusca = document.querySelector("#input-busca"); // seleciona o input de busca pelo id
let todasAsMascaras = []; //  Array para guardar todas as máscaras carregadas do JSON.

// Função que carrega os dados do JSON e exibe todos os cards inicialmente.

// É chamada assim que o script é carregado.
async function carregarDados() { // Função assincrona, usada quando ela deve esperar os resultados chegarem
    try {
        const resposta = await fetch("data.json"); // await fetch= pegar informações (JSON), espera o resultado chegar
        todasAsMascaras = await resposta.json(); // dados recebe o resultado da resposta.json()
        renderizarCards(todasAsMascaras); // Exibe todos os cards na primeira vez
        console.log("Máscaras carregadas:", todasAsMascaras); // print no console
    } catch (error) {
        console.error("Erro ao carregar as máscaras:", error);
    }
}

// Função chamada pelo botão "Buscar Máscara"
function buscarMascara() {
    const termoBuscado = inputBusca.value.toLowerCase(); // Pega o valor do input e converte para minúsculas
    
    // Filtra o array 'todasAsMascaras' para encontrar itens cujo nome inclui o termo buscado
    const mascarasFiltradas = todasAsMascaras.filter(mascara => {
        return mascara.nome.toLowerCase().includes(termoBuscado);
    });
    
    renderizarCards(mascarasFiltradas); // Renderiza apenas os cards filtrados
}

// Captura o Enter no input de busca
inputBusca.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        buscarMascara();
    }
});

function renderizarCards(mascaras){
    cardcontainer.innerHTML = ""; // Limpa os cards existentes antes de renderizar os novos

    for (let mascara of mascaras){
        let article = document.createElement("article"); // cria um elemento article
        article.classList.add("card"); // Adiciona a classe "card" ao novo article
        article.classList.add("row");
        article.innerHTML = // cria um elemento article
        
        `
        ${mascara.foto ? `<img src="${mascara.foto}" alt="Foto da ${mascara.nome}" width="150px" height="150px">` : '' }
        <h2>${mascara.nome}</h2> 
        <p>${mascara.tipo}</p> <!--parágrafo-->
        <p>Dificuldade: ${mascara.dificuldade}</p>  
        <p>" ${mascara.descricao} "</p>
        `
        cardcontainer.appendChild(article);
    }    
}

// Inicia o carregamento dos dados assim que a página é aberta
carregarDados();