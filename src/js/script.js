const produtos = [
    {
        nome: "Mulher Maravilha",
        descricao: "Action figure da heroína Mulher Maravilha com traje original com escudo e lança.\n Altura: 30cm",
        preco: 650,
        imagem: "action-figure-wonder-woman.jpg"   
    },

    {
        nome: "Bela e a Fera",
        descricao: "Conjunto especial Studios Disney 100 anos com a Bela e a Fera em edição colecionável.\n Altura: 35cm",
        preco: 2220.90,
        imagem: "action-figure-bela-fera.jpg"
    },

    {
        nome: "Pequena Sereia",
        descricao: "Ariel em base temática com Linguado, Sebastião e outros elementos do filme.\n Altura: 25cm",
        preco: 1560,
        imagem: "action-figure-pequena-sereia.png"
    },

    {
        nome: "Chewbacca e Han Solo",
        descricao: "Conjunto especial de Star Wars, Chewbacca e Han Solo juntos com base e fundo temático.\n Altura: 30cm",
        preco: 1980,
        imagem:"action-figure-chewbacca.png"
    },

    {
        nome: "Aladdin e Jasmine",
        descricao: "Alladin e Jasmine no tapete mágico com base do Palácio do Sultão.\n Altura: 40cm",
        preco: 980.90,
        imagem: "action-figure-alladin.png"
    }
];

const prefixoImagem = document.getElementById("produtos")
    ? "./src/assets/img/"
    : "../assets/img/";

// carrinho
let carrinho = JSON.parse(sessionStorage.getItem("carrinho")) || [];
 
function salvarCarrinho() {
    sessionStorage.setItem("carrinho", JSON.stringify(carrinho));
}
 
function adicionarAoCarrinho(nome, preco) {
    const itemExistente = carrinho.find(item => item.nome === nome);
 
    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        const produto = produtos.find(p =>p.nome === nome);
        carrinho.push({ nome: nome, preco: preco, quantidade: 1, imagem: produto.imagem });
    }
 
    salvarCarrinho();
    alert(`"${nome}" adicionado ao carrinho!`);
}

function removerDoCarrinho(nome) {
    const index = carrinho.findIndex(item => item.nome === nome);
    if (index === -1) return;

    if (carrinho[index].quantidade > 1){
        carrinho[index].quantidade -=1;
    } else {
        carrinho.splice(index, 1);
    }

    salvarCarrinho();

    document.getElementById("resultado-total").innerHTML = "";
    const btnDesconto = document.getElementById("btn-desconto");
    if (btnDesconto) btnDesconto.style.display = "none";

    renderizarCarrinho();
}

// Index - map dos cards
const container = document.getElementById("produtos");
 
if (container) {
    const htmlProdutos = produtos.map(item => `
        <div class="card">
            <div class="card-body">
            <img src="${prefixoImagem}${item.imagem}" alt="${item.nome}" class="card-img">
                <h3 class="card-nome">${item.nome}</h3>
                <p class="card-descricao">${item.descricao}</p>
                <span class="card-preco">R$ ${item.preco.toFixed(2)}</span>
                <button class="card-btn" onclick="adicionarAoCarrinho('${item.nome}', ${item.preco})">
                    <i class="bx bx-cart-add"></i> Adicionar ao carrinho
                </button>
            </div>
        </div>
    `).join('');
 
    container.innerHTML = htmlProdutos;
}

// Loja - map carrinho
const containerCarrinho = document.getElementById("listar-produtos");

function renderizarCarrinho() {

    if (!containerCarrinho) return;

    if (carrinho.length === 0) {
        containerCarrinho.innerHTML = `<p class="carrinho-vazio">Seu carrinho está vazio. <a href="../../index.html">Voltar à loja</a></p>`;
        return;
    }

    const htmlItens = carrinho.map(item => `
        <div class="item-carrinho">
            <div class="item-info">
                <img src="${prefixoImagem}${item.imagem}" alt="${item.nome}" class="item-img">
                <div class="item-texto">
                    <h3>${item.nome}</h3>
                    <p>Quantidade: ${item.quantidade}</p>
                </div>
            </div>
            <div class="item-acoes">
                <span class="item-preco">R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
                <button class="btn-remover" onclick="removerDoCarrinho('${item.nome}')"><i class="bx bx-trash"></i>Remover</button>
            </div>
        </div>
    `).join('');

    containerCarrinho.innerHTML = htmlItens;
}

if (containerCarrinho){
    renderizarCarrinho();
}

// Loja - Reduce
function calcularTotal() {
    const total = carrinho.reduce((acumulador, item) => {
        return acumulador + (item.preco * item.quantidade)
    }, 0);

    document.getElementById("resultado-total").innerHTML = `Total da Compra: <span>R$ ${total.toFixed(2)}</span>`;

    document.getElementById("btn-desconto").style.display = "flex";
}

// Loja - desconto
function aplicarDesconto() {
    const total = carrinho.reduce((acumulador, item) => {
        return acumulador + (item.preco * item.quantidade)
    }, 0);

    const totalComDesconto = total * (1 - 0.10);

    document.getElementById("resultado-total").innerHTML =`
        <p class ="riscado">De: R$ ${total.toFixed(2)}</p>
        Total com 10% de desconto: <span class="destaque-verde">R$ ${totalComDesconto.toFixed(2)}</span>
    `;
}