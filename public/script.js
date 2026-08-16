// =====================================================
// ELEMENTOS DA PÁGINA
// =====================================================

// Área onde os resultados serão exibidos
const log = document.getElementById("log");

// =====================================================
// BOTÕES
// =====================================================

const btnListar = document.getElementById("btnListar");

const btnFiltrar = document.getElementById("btnFiltrar");

const btnBuscarId = document.getElementById("btnBuscarId");

const btnCadastrar = document.getElementById("btnCadastrar");

const btnDeletar = document.getElementById("btnDeletar");

const btnReset = document.getElementById("btnReset");

// =====================================================
// CAMPOS DE ENTRADA
// =====================================================

const inputCategoria = document.getElementById("categoria");

const inputIdBusca = document.getElementById("idBusca");

const inputNome = document.getElementById("nome");

const inputCategoriaCadastro = document.getElementById("categoriaCadastro");

const inputPreco = document.getElementById("preco");

const inputIdDelete = document.getElementById("idDelete");

// =====================================================
// ENDPOINT DA API
// =====================================================

const API_URL = "http://localhost:3000/produtos";


// =====================================================
// FUNÇÃO AUXILIAR PARA EXIBIR RESULTADOS
// =====================================================

function mostrarLog(mensagem, dados = null) {

    const log = document.getElementById('log');

    let resultado = mensagem;

    if (dados !== null) {
        resultado += '\n\n' + JSON.stringify(dados, null, 2);
    }

    log.textContent = resultado;
};

// =====================================================
// 1. LISTAR TODOS OS PRODUTOS
// MÉTODO: GET
// =====================================================

async function listarProdutos() {

    try {

        const resposta = await fetch(API_URL, {
            method: 'GET'
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            mostrarLog(`Status: ${resposta.status} ${resposta.statusText}\n Produtos Encontrados:`, dados)
        } else {
            mostrarLog(`Erro HTTP: ${resposta.status}: ${resposta.statusText}\n`, dados)
        }

    } catch (erro) {
        mostrarLog('Erro ao conectar com o servidor.\n\nVerifique se a API está rodando em http://localhost:3000');

        console.error(erro);
    };
};

// =====================================================
// 6. LIMPAR / RESETAR LOG
// =====================================================

function limparLog() {
    document.getElementById("log").textContent = "Aguardando ação...";
};