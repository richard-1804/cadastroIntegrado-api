// =====================================================
// ENDPOINT DA API
// =====================================================

const API_URL = "http://localhost:3000/produtos";


// =====================================================
// FUNÇÃO AUXILIAR PARA EXIBIR RESULTADOS
// =====================================================

function mostrarLog(mensagem, dados = null) {

    const log = document.getElementById("log");

    let resultado = mensagem;

    if (dados !== null) {
        resultado += '\n\n' + JSON.stringify(dados, null, 2);
    }

    log.textContent = resultado;
};

// =====================================================
// 1. LISTAR TODOS OS PRODUTOS
// MÉTODO: GET
// NOME: listarProdutos()
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
// 2. FILTRAR POR CATEGORIA 
// MÉTODO: GET
// QUERY PARAMETER: req.query
// NOME: filtrarCategoria()
// =====================================================

// aa


// =====================================================
// 3. BUSCAR PRODUTO POR ID
// MÉTODO: GET
// ROUTE PARAMETER: req.params
// NOME: buscarPorId()
// =====================================================

// aa


// =====================================================
// 4. CADASTRAR PRODUTO
// MÉTODO: POST
// BODY: req.body\
// NOME: cadastrarProduto()
// =====================================================

// aa


// =====================================================
// 5. DELETAR PRODUTO POR ID
// MÉTODO: DELETE
// ROUTE PARAMETER: req.params
// NOME: deletarProduto()
// =====================================================

// aa


// =====================================================
// 6. LIMPAR / RESETAR LOG
// =====================================================

// aa
