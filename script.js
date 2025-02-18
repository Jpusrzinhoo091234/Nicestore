let carrinho = [];
let categoriaAtual = 'todos';

function renderizarProdutos(categoria = 'todos') {
    const container = document.getElementById('produtos-container');
    container.innerHTML = '';

    let produtosParaMostrar = [];
    
    if (categoria === 'todos') {
        // Juntar todos os produtos de todas as categorias
        produtosParaMostrar = Object.values(produtos).flat();
    } else {
        // Pegar produtos apenas da categoria selecionada
        produtosParaMostrar = produtos[categoria] || [];
    }

    if (produtosParaMostrar.length === 0) {
        container.innerHTML = `
            <div class="sem-produtos">
                <p>Nenhum produto encontrado nesta categoria</p>
            </div>
        `;
        return;
    }

    // Adicionar título da categoria
    if (categoria !== 'todos') {
        const categoriaInfo = categorias.find(cat => cat.id === categoria);
        if (categoriaInfo) {
            container.innerHTML = `
                <div class="categoria-titulo">
                    ${categoriaInfo.emoji} ${categoriaInfo.nome}
                    <small>${categoriaInfo.descricao}</small>
                </div>
            `;
        }
    }

    // Criar grid de produtos
    const produtosGrid = document.createElement('div');
    produtosGrid.className = 'produtos-grid';

    produtosParaMostrar.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'produto-card';
        card.innerHTML = renderizarProdutoCard(produto);
        produtosGrid.appendChild(card);
    });

    container.appendChild(produtosGrid);
}

function renderizarProdutoCard(produto) {
    return `
        ${produto.destaque ? `<div class="produto-destaque">${produto.destaque}</div>` : ''}
        <div class="produto-emoji">${produto.emoji}</div>
        <div class="produto-nome">${produto.nome}</div>
        <div class="produto-estoque">${produto.estoque} em estoque</div>
        <div class="produto-descricao">${produto.descricao}</div>
        <div class="produto-preco">R$ ${produto.preco.toFixed(2)}</div>
        <button class="btn-adicionar" onclick="adicionarAoCarrinho(${produto.id})">
            adicionar ao carrinho
        </button>
    `;
}

function filtrarProdutos(categoria) {
    categoriaAtual = categoria;
    renderizarProdutos(categoria);
    
    // Atualizar botões ativos
    document.querySelectorAll('.categoria-btn').forEach(btn => {
        btn.classList.toggle('ativo', btn.dataset.categoria === categoria);
    });
}

function adicionarAoCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    const itemNoCarrinho = carrinho.find(item => item.id === id);

    if (itemNoCarrinho) {
        itemNoCarrinho.quantidade++;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }

    atualizarCarrinho();
    mostrarNotificacao(`${produto.emoji} ${produto.nome} adicionado ao carrinho!`);
}

function atualizarCarrinho() {
    const container = document.getElementById('carrinho-items');
    const totalElement = document.getElementById('carrinho-total');
    const countElement = document.getElementById('cart-count');

    container.innerHTML = '';
    
    if (carrinho.length === 0) {
        container.innerHTML = '<p>Carrinho vazio</p>';
        totalElement.textContent = 'Total: R$ 0,00';
        countElement.textContent = '0';
        return;
    }

    let total = 0;
    let quantidadeTotal = 0;

    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;
        quantidadeTotal += item.quantidade;

        const itemElement = document.createElement('div');
        itemElement.className = 'carrinho-item';
        itemElement.innerHTML = `
            <div class="item-emoji">${item.emoji}</div>
            <div class="item-info">
                <div>${item.nome}</div>
                <div>R$ ${item.preco.toFixed(2)}</div>
            </div>
            <div class="item-controles">
                <button class="btn-quantidade" onclick="alterarQuantidade(${item.id}, ${item.quantidade - 1})">-</button>
                <span>${item.quantidade}</span>
                <button class="btn-quantidade" onclick="alterarQuantidade(${item.id}, ${item.quantidade + 1})">+</button>
            </div>
        `;
        container.appendChild(itemElement);
    });

    totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
    countElement.textContent = quantidadeTotal;
}

function alterarQuantidade(id, novaQuantidade) {
    if (novaQuantidade <= 0) {
        carrinho = carrinho.filter(item => item.id !== id);
    } else {
        const item = carrinho.find(item => item.id === id);
        if (item) {
            item.quantidade = novaQuantidade;
        }
    }
    atualizarCarrinho();
}

function toggleCarrinho() {
    const modal = document.getElementById('carrinho-modal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

function contatarSuporte() {
    const numeroWhatsApp = "5524981128510";
    const mensagem = "Olá! Preciso de suporte na loja.";
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        mostrarNotificacao('Adicione itens ao carrinho primeiro!');
        return;
    }

    const numeroWhatsApp = "5524981128510";
    let mensagem = "🛒 *Novo Pedido*\n\n";
    
    // Adicionar itens do carrinho à mensagem
    carrinho.forEach(item => {
        mensagem += `${item.emoji} *${item.nome}*\n`;
        mensagem += `Quantidade: ${item.quantidade}\n`;
        mensagem += `Preço: R$ ${(item.preco * item.quantidade).toFixed(2)}\n\n`;
        
        // Adicionar instruções especiais para produtos do Instagram
        if (item.categoria === 'instagram') {
            mensagem += "⚠️ *INSTRUÇÕES IMPORTANTES:*\n";
            mensagem += "1. Mantenha sua conta aberta/pública\n";
            mensagem += "2. Desative 'Sinalizar para revisão' em Configurações > Seguir e convidar amigos\n";
            mensagem += "3. Garantia de reposição por 30 dias\n";
            mensagem += "4. Entrega gradual para maior segurança\n";
            mensagem += "5. Não altere seu @ durante o processo\n\n";
        }
    });

    // Adicionar instruções especiais para produtos do TikTok
    if (carrinho.some(item => item.categoria === 'tiktok')) {
        mensagem += "\n⚠️ *INSTRUÇÕES PARA TIKTOK:*\n";
        mensagem += "1. Envie apenas o link do perfil/vídeo\n";
        mensagem += "2. Não precisa enviar senha\n";
        mensagem += "3. Não altere o @ durante o processo\n";
        mensagem += "4. Entrega média: 50 minutos\n";
        mensagem += "5. Garantia contra quedas\n\n";
    }

    // Adicionar total
    const total = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    mensagem += `\n💰 *Total: R$ ${total.toFixed(2)}*`;

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
    
    carrinho = [];
    atualizarCarrinho();
    toggleCarrinho();
    mostrarNotificacao('Pedido enviado para o WhatsApp! 🎉');
}

function mostrarNotificacao(mensagem) {
    const notificacao = document.getElementById('notificacao');
    notificacao.textContent = mensagem;
    notificacao.style.display = 'block';
    
    setTimeout(() => {
        notificacao.style.opacity = '0';
        setTimeout(() => {
            notificacao.style.display = 'none';
            notificacao.style.opacity = '1';
        }, 300);
    }, 2000);
}

function mostrarErro(mensagem) {
    const notificacao = document.getElementById('notificacao');
    notificacao.textContent = mensagem;
    notificacao.style.background = '#ff4444';
    notificacao.style.display = 'block';
    
    setTimeout(() => {
        notificacao.style.display = 'none';
    }, 3000);
}

function buscarProdutos(termo) {
    const produtosFiltrados = produtos.filter(produto => 
        produto.nome.toLowerCase().includes(termo.toLowerCase())
    );
    renderizarProdutos('todos', produtosFiltrados);
}

function ordenarProdutos(tipo) {
    switch(tipo) {
        case 'preco-menor':
            produtos.sort((a, b) => a.preco - b.preco);
            break;
        case 'preco-maior':
            produtos.sort((a, b) => b.preco - a.preco);
            break;
        case 'nome':
            produtos.sort((a, b) => a.nome.localeCompare(b.nome));
            break;
    }
    renderizarProdutos(categoriaAtual);
}

// Salvar carrinho no localStorage
function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// Carregar carrinho do localStorage
function carregarCarrinho() {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
        carrinho = JSON.parse(carrinhoSalvo);
        atualizarCarrinho();
    }
}

function validarCompra() {
    if (carrinho.length === 0) {
        mostrarErro('Adicione itens ao carrinho primeiro!');
        return false;
    }
    return true;
}

function limparCarrinho() {
    if (confirm('Tem certeza que deseja limpar o carrinho?')) {
        carrinho = [];
        atualizarCarrinho();
        mostrarNotificacao('Carrinho limpo com sucesso!');
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderizarCategorias();
    renderizarProdutos();
    atualizarCarrinho();
}); 