// ========================================
// Constantes Obrigatórias Para o Servidor
// ========================================

//======================================================================================
// O import abaixo é usado para trazer códigos como variáveis, funções e outras coisas 
// de outros arquivos estrangeiros para essa sintaxe.                                  
// Cada arquivo é um módulo separado individualmente, usando o import é possível       
// fazer uma certa correlação entre esses arquivos.                                    
//======================================================================================


import express from "express";
import cors from "cors";

const app = express();
const PORTA = 3000;

//==========================================================================================================================
//app use com "express json" faz com que o express consiga interpretar dados enviados em formato JSON, principalmente no POST.
//app use "cors" habilita o cors, um mecanismo de segurança dos navegadores.
// OBS: desta forma não violamos a Same-Origin Policy (Política de Mesma Origem).
//==========================================================================================================================

app.use(cors());
app.use(express.json());

// ========================================
// Array de Produtos
// ========================================

let produtos = [
  {
    id: 1,
    nome: "Máscara capilar Pantene Pro-V",
    categoria: "Cosméticos",
    preco: 25.0,
  },
  {
    id: 2,
    nome: "Máquina de Lavar 13kg Consul",
    categoria: "Eletrodomésticos",
    preco: 1500.0,
  },
  {
    id: 3,
    nome: "Mouse C3 Tech",
    categoria: "Periféricos",
    preco: 15.0,
  },
];

const corretor = (text) => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

app.listen(PORTA, () => {
  console.log(
    `Servidor Rodando com Sucesso na porta: ${PORTA}
URL: http://localhost:${PORTA}/produtos`,
  );
});

// ========================================
// Listar todos os produtos
// ========================================

app.get("/produtos", (req, res) => {
  res.json(produtos);
});

// ========================================
// Filtrar por categoria
// ========================================

app.get("/produtos/categoria", (req, res) => {
  const categoria = req.query.categoria;
  
//===============================================================================================
//O filter percorre todos os produtos e mantém somente aqueles que possuem a categoria procurada.
//===============================================================================================

  const resultado = produtos.filter(
    (produto) => corretor(produto.categoria) === corretor(categoria),
  );

  res.json(resultado);
});

// ========================================
// Buscar por ID único
// ========================================

// requisição GET procurando pela url /produtos/:id
app.get("/produtos/:id", (req, res) => {
  const idBusca = parseInt(req.params.id); // vai pegar o id colocado na url e converter de string para inteiro

  const produtoEncontrado = produtos.find((p) => p.id === idBusca); // verificar se o id encontrado é igual ao id digitado no input do site

  if (!produtoEncontrado) {
    // se o id da busca NAO seja igual ao id digitado pelo usuario, sera exibido a seguinte mensagem
    return res.status(404).json({ mensagem: `Produto não encontrado.` }); // será captado o status 404 e exibido a mensagem
  }

  res.status(200).json(produtoEncontrado); // caso ambos sejam iguais, o status será 200 e será exibido em formato json o produto encontrado.
});

// ========================================
// Cadastrar produto
// ========================================

app.post("/produtos", (req, res) => {
  const novoProduto = req.body;

  if (produtos.length > 0) {
    novoProduto.id = produtos[produtos.length - 1].id + 1;
  } else {
    novoProduto.id = 1;
  }

  produtos.push(novoProduto);

  res.status(201).json(novoProduto);
});

// ========================================
// Deletar produto
// ========================================

app.delete("/produtos/:id", (req, res) => {
  // captura o id da url via req.params
  const idBusca = parseInt(req.params.id);

  // 2. procura a posição do produto no array
  const index = produtos.findIndex((p) => p.id === idBusca);

  // se não encontrar o produto, devolve Status 404
  if (index === -1) {
    return res.status(404).json({ mensagem: "Produto não encontrado." });
  }

  // remove o produto do array
  produtos.splice(index, 1);

  // retorna mensagem de sucesso com status 200
  res.status(200).json({ mensagem: "Produto deletado com sucesso" });
});