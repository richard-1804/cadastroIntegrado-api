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
    resultado += "\n\n" + JSON.stringify(dados, null, 2);
  }

  log.textContent = resultado;
}

// =====================================================
// 1. LISTAR TODOS OS PRODUTOS
// MÉTODO: GET
// NOME: listarProdutos()
// =====================================================

async function listarProdutos() {
  try {
    const resposta = await fetch(API_URL, {
      method: "GET",
    });

    const dados = await resposta.json();

    if (resposta.status === 200) {
      mostrarLog(
        `Status: ${resposta.status} ${resposta.statusText}\n Produtos Encontrados:`,
        dados,
      );
    } else {
      mostrarLog(
        `Erro HTTP: ${resposta.status}: ${resposta.statusText}\n`,
        dados,
      );
    }
  } catch (erro) {
    mostrarLog(
      "Erro ao conectar com o servidor.\n\nVerifique se a API está rodando em http://localhost:3000",
    );

    console.error(erro);
  }
}

// =====================================================
// 2. FILTRAR POR CATEGORIA
// MÉTODO: GET
// QUERY PARAMETER: req.query
// =====================================================

async function filtrarCategoria() {
  try {
    const categoria = document.getElementById("categoria").value.trim();

    const resposta = await fetch(
      `${API_URL}/categoria?categoria=${encodeURIComponent(categoria)}`,
      {
        method: "GET",
      },
    );

    let produtosFiltrados; //criação da variável a ser modificada a frente

    if (resposta.ok) {
      //se a resposta for ok (200) transformar em json
      produtosFiltrados = await resposta.json(); //transforma em json
    }

    if (resposta.status === 200) {
      mostrarLog(
        `Status: ${resposta.status} ${resposta.statusText}\n Produtos filtrados por categoria:`,
        produtosFiltrados,
      );

      document.getElementById("categoria").value = "";
    } else {
      mostrarLog(`Erro HTTP: ${resposta.status}\n`);
    }

    // console.log(produtosFiltrados);
  } catch (erro) {
    mostrarLog(
      "Erro ao conectar com o servidor.\n\n" +
        "Verifique se a API está rodando em http://localhost:3000",
    );
    console.error(erro);
  }
}

// =====================================================

// 3. BUSCAR PRODUTO POR ID
// MÉTODO: GET
// ROUTE PARAMETER: req.params
// NOME: buscarPorId()

// =====================================================

async function buscarPorId() {
  // id digitado no campo input
  const id = document.getElementById("idBusca").value.trim();

  if (!id) {
    mostrarLog("Erro: Informe o ID do produto.");

    return;
  }

  try {
    const resposta = await fetch(`${API_URL}/${id}`, {
      method: "GET",
    });

    const dados = await resposta.json();

    // Produto encontrado com sucesso
    if (resposta.status === 200) {
      mostrarLog(
        `Status: ${resposta.status} ${resposta.statusText}\n Produtos Encontrados:`,
        dados,
      );

      document.getElementById("idBusca").value = "";
    } else if (resposta.status === 404) {
      // Produto não encontrado

      mostrarLog("Erro 404: Produto não encontrado!");
    } else {
      // Outros erros HTTP exibindo o codigo do erro
      mostrarLog(`Erro HTTP: ${resposta.status} ${resposta.statusText}`);
    }
  } catch (erro) {
    mostrarLog(
      `Erro ao conectar com o servidor.\n\nVerifique se a API está rodando em http://localhost:3000`,
    );

    console.error(erro);
  }
}

// =====================================================
// 4. CADASTRAR PRODUTO
// MÉTODO: POST
// BODY: req.body
// NOME: cadastrarProduto()
// =====================================================

async function cadastrarProduto() {
  const nome = document.getElementById("nome").value.trim();
  const categoria = document.getElementById("categoriaCadastro").value.trim();
  const preco = Number(document.getElementById("preco").value.trim());

  if (!nome || !categoria || isNaN(preco)) {
    mostrarLog(
      "Certifique-se que todos os campos foram preenchidos corretamente.",
    );
    return;
  }

  const novoProduto = {
    nome: nome,
    categoria: categoria,
    preco: preco,
  };

  try {
    const resposta = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(novoProduto),
    });

    const dados = await resposta.json();

    if (resposta.status === 201) {
      mostrarLog(
        `Status: ${resposta.status} \nO produto foi registrado com sucesso.`,
      );
      document.getElementById("nome").value = "";
      document.getElementById("categoriaCadastro").value = "";
      document.getElementById("preco").value = "";
      return;
    } else {
      mostrarLog(`Status: ${resposta.status} \n${resposta.statusText}`, dados);
    }
  } catch (erro) {
    mostrarLog(
      "Erro ao conectar como servidor.\nCertifique-se que o servidor está na porta correta.",
    );
    console.error(erro);
  }
}

// =====================================================
// 5. DELETAR PRODUTO POR ID
// MÉTODO: DELETE
// ROUTE PARAMETER: req.params
// NOME: deletarProduto()
// =====================================================

async function deletarProduto() {
  const id = document.getElementById("idDelete").value.trim();

  if (!id) {
    mostrarLog("Erro: id não informado");
    return;
  }

  try {
    const resposta = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    const dados = await resposta.json();

    if (resposta.status === 200) {
      mostrarLog(`Produto deleteado com sucesso!:`, dados);

      document.getElementById("idDelete").value = "";
    } else if (resposta.status === 404) {
      mostrarLog(`Erro ${resposta.status}: Produto não encontrado`);
    } else {
      mostrarLog(
        `Erro HTTP: ${resposta.status}: ${resposta.statusText}\n`,
        dados,
      );
    }
  } catch (erro) {
    mostrarLog(
      "Erro ao conectar com o servidor.\n\nVerifique se a API está rodando em http://localhost:3000",
    );
    console.error(erro);
  }
}

// =====================================================
// 6. LIMPAR / RESETAR LOG
// =====================================================

function limparLog() {
  document.getElementById("log").textContent = "Aguardando ação...";
}
