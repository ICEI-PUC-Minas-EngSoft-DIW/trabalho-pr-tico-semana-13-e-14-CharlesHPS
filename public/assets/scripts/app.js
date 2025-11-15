//variaveis globais
let pagClicada = 0;

let count = 1;
// A URL para o seu arquivo JSON
const URL_JSON = '/db/db.json';

// Função para imprimir dados na tela inicial/index 
async function carregarDadosIndex() {
    let assuntoContainer = document.getElementById('assuntos');
    let dadosAssuntosHTML = '';

    // Busca dos Dados
    try {
        const response = await fetch(URL_JSON);

        if (!response.ok) {
            throw new Error(`Erro ao buscar o arquivo JSON: ${response.status} ${response.statusText}`);
        }

        // Converte o corpo da resposta para um objeto JavaScript
        const data = await response.json();
        
        // O array de conteúdos que você quer iterar está dentro da propriedade 'conteudos'
        const resumo = data.conteudos; 

        // Iteração e Construção do HTML
        for (let i = 0; i < resumo.length; i++) {
            // Desestruturação para tornar o código mais limpo
            const { id, imagem, titulo, resumo: resumoCarregar } = resumo[i];

            dadosAssuntosHTML += `
                <div class="itens-assuntos">
                    <img class="img-assuntos" src="${imagem}" alt="Imagem representativa do ${titulo}">
                    <h2 class="titulo-assuntos cor-branco">
                        ${titulo}
                    </h2>
                    <p class="texto-assuntos cor-branco">
                        ${resumoCarregar} 
                    </p>
                    <button onclick="exibirConteudo(${id})" class="botao-assuntos">
                        Ler mais
                    </button>
                </div>`;
        }

        // inserindo dados na tela
        assuntoContainer.innerHTML = dadosAssuntosHTML;

    } catch (error) {
        // Caso a busca der erro menssagem a ser exibida
        console.error('Falha ao carregar e exibir os dados:', error);
    }
}

//Função para exibir conteudo de acordo com o item que foi clicado
async function exibirConteudo(pagClicada) {
    console.log("Página clicada:", pagClicada);

    try {
        // Busca dos Dados
        const response = await fetch(URL_JSON);

        if (!response.ok) {
            throw new Error(`Erro ao buscar o arquivo JSON: ${response.status} ${response.statusText}`);
        }

        // Converte o corpo da resposta para um objeto JavaScript
        const data = await response.json();
        
        // O array de conteúdos é data.conteudos
        const conteudosArray = data.conteudos;

        // Encontra o objeto de conteúdo específico pelo ID
        // Usamos .find() para procurar o objeto onde item.id é igual à pagClicada
        const dadoCompleto = conteudosArray.find(item => item.id === pagClicada);

        // Verificação de segurança
        if (!dadoCompleto) {
            console.error("Conteúdo não encontrado para o ID:", pagClicada);
            return; 
        }

        // Extração de variáveis
        const imgCarregar = dadoCompleto.imagem;
        const resumoCarregar = dadoCompleto.resumo;
        const tituloCarregar = dadoCompleto.titulo;
        const tituloConteudo1Carregar = dadoCompleto.tituloConteudo1;
        const conteudo1Carregar = dadoCompleto.conteudo1;
        const tituloConteudo2Carregar = dadoCompleto.tituloConteudo2;
        const conteudo2Carregar = dadoCompleto.conteudo2;

        let dadosEnviar = `
            <div id="apresentacao-conteudo">
                <img id="img-inicio" src="${imgCarregar}" alt="Imagem de ${tituloCarregar}">
                <div id="container-resumo-conteudo">
                    <h1 id="titulo-inicio-conteudo" class="titulo-inicio-conteudo cor-branco">${tituloCarregar}</h1>
                    <p id="resumo-conteudo" class="cor-branco"> ${resumoCarregar} </p>
                </div>
            </div>
            
            <div id="temas">
                <div class="divisao-paragrafos">
                    <div id="conteudo-1" class="conteudo-1">
                        <h2 id="titulo-temas-1" class="titulo-paragrafos cor-azul-claro">${tituloConteudo1Carregar}</h2>
                        <p id="paragrafo-1" class="paragrafo cor-branco">${conteudo1Carregar}</p>
                    </div>
                </div>
                <div class="divisao-paragrafos">
                    <div id="conteudo-2" class="conteudo-2">
                        <h2 id="titulo-temas-2" class="titulo-paragrafos cor-azul-claro">${tituloConteudo2Carregar}</h2>
                        <p id="paragrafo-2" class="paragrafo cor-branco">${conteudo2Carregar}</p>
                    </div>
                </div>
            </div>`;

        // Armazenar no localStorage e Redirecionar
        localStorage.setItem('conteudoParaExibir', dadosEnviar);
        window.location.href = 'conteudo.html';
        
    } catch (error) {
        // caso o JSON não carregue
        console.error('Falha ao carregar o conteúdo para exibição:', error);
        alert('Não foi possível carregar os detalhes do conteúdo. Tente novamente.');
    }
}

/*Função para abrir o menu mobile*/
function abrirMenuMobile(){

    const menuMobile = document.getElementById('id-menu-mobile');
    
    menuMobile.classList.add('menu-ativo');
    
}

/*Função para fechar o menu mobile*/
function fecharMenuMobile(){

    const menuMobile = document.getElementById('id-menu-mobile');
    
    menuMobile.classList.remove('menu-ativo');

}

/*Função para exibir o cabeçalho em todas as paginas e reutilizar o codigo*/
function menuPagina(){
    document.getElementById('cabecalho').innerHTML = `
        <nav id="menu">
            <div id="itens-desktop">
                <a id="logo-site" href="index.html"><img id="logo" src="/public/assets/img/logo_all_universo.png" alt="log al universo"></a>
                <div id="lista-menu-desktop">
                    <ul id="menu-desktop">
                        <li class="itens-lista-desktop">
                            <a class="paginas" href="sobre.html">SOBRE</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="itens-mobile">
                <img onclick="abrirMenuMobile()" id="open-menu-lista" src="/public/assets/img/icon_menu.png" alt="icone de menu">
                <ul class="menu-mobile" id="id-menu-mobile" >
                    <li id="close-menu-lista">
                        <img onclick="fecharMenuMobile()" id="img-close-menu" src="/public/assets/img/icon_x.png" alt="icone de menu">
                    </li>
                    <li class="itens-lista-mobile">
                        <a class="paginas" href="sobre.html">SOBRE</a>
                    </li>
                </ul>
            </div>
        </nav>`;

}

// função que muda altomaticamente os slides da pagina index
function proximaimg(){
    count++;
    if(count>5){
        count = 1;
    }

    document.getElementById("radio-"+ count).checked = true;
}

setInterval( function(){
    proximaimg();
}, 4000);

document.addEventListener('DOMContentLoaded', (event) => {
    // 1. Tenta recuperar o conteúdo armazenado
    const conteudoHTML = localStorage.getItem('conteudoParaExibir');
    const mainConteudo = document.getElementById('conteudo-pag');

    if (conteudoHTML && mainConteudo) {
        // 2. Injeta o HTML recuperado no elemento principal
        mainConteudo.innerHTML = conteudoHTML;

        // 3. Opcional: Limpa o localStorage para que o conteúdo não persista em outras navegações
        localStorage.removeItem('conteudoParaExibir');
    } else if (mainConteudo) {
        // Exibe uma mensagem de erro ou redireciona de volta se o conteúdo não for encontrado
        mainConteudo.innerHTML = '<h1>Erro: Conteúdo não carregado.</h1>';
        console.error('Conteúdo não encontrado no localStorage ou elemento main-conteudo ausente.');
    }
});

window.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById('slide-1').addEventListener('click', function(){
        exibirConteudo(0);
    });

    document.getElementById('slide-2').addEventListener('click', function(){
        exibirConteudo(1);
    });

    document.getElementById('slide-3').addEventListener('click', function(){
        exibirConteudo(2);
    });

    document.getElementById('slide-4').addEventListener('click', function(){
        exibirConteudo(3);
    });

    document.getElementById('slide-5').addEventListener('click', function(){
        exibirConteudo(4);
    });

});

document.getElementById("radio-1").checked = true;
