// =====================================================
// ELEMENTOS DA PÁGINA
// =====================================================

// Área onde os resultados serão exibidos
const log = document.getElementById('log');


// =====================================================
// BOTÕES
// =====================================================

const btnListar = document.getElementById('btnListar');

const btnFiltrar = document.getElementById('btnFiltrar');

const btnBuscarId = document.getElementById('btnBuscarId');

const btnCadastrar = document.getElementById('btnCadastrar');

const btnDeletar = document.getElementById('btnDeletar');

const btnReset = document.getElementById('btnReset');


// =====================================================
// CAMPOS DE ENTRADA
// =====================================================

const inputCategoria = document.getElementById('categoria');

const inputIdBusca = document.getElementById('idBusca');

const inputNome = document.getElementById('nome');

const inputCategoriaCadastro =
    document.getElementById('categoriaCadastro');

const inputPreco = document.getElementById('preco');

const inputIdDelete =
    document.getElementById('idDelete');


// =====================================================
// ENDPOINT DA API
// =====================================================

const API_URL = 'http://localhost:3000/produtos';