let carrinho = [];
let categoriaAtual = 'todos';
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

function renderizarProdutos(categoria = 'todos', produtosParaMostrar = null) {
    const container = document.getElementById('produtos-container');
    container.innerHTML = '';

    // Se não foram passados produtos específicos, seleciona com base na categoria
    if (produtosParaMostrar === null) {
        if (categoria === 'todos') {
            // Juntar todos os produtos de todas as categorias
            produtosParaMostrar = Object.values(produtos).flat();
        } else {
            // Pegar produtos apenas da categoria selecionada
            produtosParaMostrar = produtos[categoria] || [];
        }
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
    const isFavorito = favoritos.includes(produto.id);
    return `
        ${produto.destaque ? `<div class="produto-destaque">${produto.destaque}</div>` : ''}
        <button class="btn-favorito ${isFavorito ? 'ativo' : ''}" onclick="toggleFavorito(${produto.id})">
            ${isFavorito ? '❤️' : '🤍'}
        </button>
        <div class="produto-emoji">
            ${produto.useIcon ? produto.emoji : `<span>${produto.emoji}</span>`}
        </div>
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

async function adicionarAoCarrinho(id) {
    const btn = event.currentTarget;
    btn.disabled = true;
    btn.innerHTML = '⌛ Adicionando...';
    
    try {
        // Simular delay de rede
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Encontrar o produto em todas as categorias
        let produto = null;
        for (let categoria in produtos) {
            produto = produtos[categoria].find(p => p.id === id);
            if (produto) break;
        }

        if (!produto) {
            mostrarNotificacao('Erro ao adicionar produto!', 'erro');
            return;
        }

        const itemNoCarrinho = carrinho.find(item => item.id === id);

        if (itemNoCarrinho) {
            itemNoCarrinho.quantidade++;
            mostrarNotificacao(`+1 ${produto.nome} no carrinho! 🛒`, 'sucesso');
        } else {
            carrinho.push({
                ...produto,
                quantidade: 1
            });
            mostrarNotificacao(`${produto.nome} adicionado ao carrinho! 🛒`, 'sucesso');
        }

        atualizarCarrinho();

        // Adicionar feedback tátil em dispositivos móveis
        if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(50);
        }
    } finally {
        btn.disabled = false;
        btn.innerHTML = 'adicionar ao carrinho';
    }
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

    // Atualizar o botão flutuante
    atualizarBotaoCarrinho();
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
    const numeroWhatsApp = "5524981827333";
    const mensagem = "Olá! Preciso de ajuda com um produto 😊";
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        mostrarNotificacao('Adicione itens ao carrinho primeiro!');
        return;
    }

    const numeroWhatsApp = "5524981827333";
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

function mostrarNotificacao(mensagem, tipo = 'sucesso') {
    const notificacao = document.getElementById('notificacao');
    notificacao.textContent = mensagem;
    notificacao.className = 'notificacao'; // Reset classes
    notificacao.classList.add(`notificacao-${tipo}`);
    
    // Mostrar notificação
    notificacao.style.display = 'block';
    notificacao.style.opacity = '1';
    
    // Esconder após 3 segundos
    setTimeout(() => {
        notificacao.style.opacity = '0';
        setTimeout(() => {
            notificacao.style.display = 'none';
        }, 300);
    }, 3000);
}

function mostrarErro(mensagem, tipo = 'erro') {
    const notificacao = document.getElementById('notificacao');
    notificacao.innerHTML = `
        <div class="notificacao-icon">${tipo === 'erro' ? '❌' : '⚠️'}</div>
        <div class="notificacao-mensagem">${mensagem}</div>
    `;
    // ... resto do código
}

function pesquisarProdutos(termo) {
    if (!termo.trim()) {
        renderizarProdutos(categoriaAtual);
        return;
    }

    const produtosFiltrados = Object.values(produtos)
        .flat()
        .filter(produto => produto.nome.toLowerCase().includes(termo.toLowerCase()));
    
    renderizarProdutos(categoriaAtual, produtosFiltrados);
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

function toggleFavorito(id) {
    const index = favoritos.indexOf(id);
    if (index === -1) {
        favoritos.push(id);
        mostrarNotificacao('Produto adicionado aos favoritos! ❤️', 'sucesso');
    } else {
        favoritos.splice(index, 1);
        mostrarNotificacao('Produto removido dos favoritos', 'info');
    }
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    renderizarProdutos(categoriaAtual);
}

function filtrarPorPreco(min, max) {
    const produtosFiltrados = Object.values(produtos)
        .flat()
        .filter(p => p.preco >= min && p.preco <= max);
    renderizarProdutos('todos', produtosFiltrados);
}

function salvarPedido(pedido) {
    const historico = JSON.parse(localStorage.getItem('historico') || '[]');
    historico.push({
        ...pedido,
        data: new Date().toISOString(),
        id: Date.now()
    });
    localStorage.setItem('historico', JSON.stringify(historico));
}

// Adicionar estilos CSS
const estilos = document.createElement('style');
estilos.textContent = `
    .contador-container {
        position: fixed;
        left: 20px;
        bottom: 20px;
        background-color: rgba(255, 255, 255, 0.95);
        padding: 8px 15px;
        border-radius: 20px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        z-index: 1000;
        backdrop-filter: blur(5px);
        border: 1px solid rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    }

    .contador-container:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    .icone-visitantes {
        font-size: 16px;
    }

    .numero-visitantes {
        font-weight: bold;
        color: #333;
        font-size: 15px;
    }

    .texto-visitantes {
        color: #666;
    }

    @media (max-width: 768px) {
        .contador-container {
            left: 10px;
            bottom: 10px;
            padding: 6px 12px;
            font-size: 12px;
        }
        
        .icone-visitantes {
            font-size: 14px;
        }

        .numero-visitantes {
            font-size: 13px;
        }
    }

    /* Estilos do botão flutuante do carrinho */
    .carrinho-flutuante {
        position: fixed;
        right: 20px;
        bottom: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 12px 20px;
        border-radius: 50px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 16px;
        z-index: 1000;
        border: none;
        transition: all 0.3s ease;
        -webkit-tap-highlight-color: transparent;
    }

    .carrinho-flutuante:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        background-color: #45a049;
    }

    .carrinho-flutuante:active {
        transform: translateY(1px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .carrinho-flutuante .icone {
        font-size: 20px;
    }

    .carrinho-flutuante .contador {
        background-color: white;
        color: #4CAF50;
        padding: 2px 8px;
        border-radius: 15px;
        font-size: 14px;
        font-weight: bold;
        min-width: 24px;
        text-align: center;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 768px) {
        .carrinho-flutuante {
            right: 16px;
            bottom: 16px;
            padding: 14px;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            justify-content: center;
        }

        .carrinho-flutuante .icone {
            font-size: 24px;
        }

        .carrinho-flutuante .contador {
            position: absolute;
            top: -8px;
            right: -8px;
            padding: 4px 8px;
            font-size: 12px;
            min-width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid #4CAF50;
        }

        /* Ajuste para evitar sobreposição com o contador de visitas */
        .contador-container {
            bottom: 90px !important;
        }
    }

    /* Animação de pulso quando adiciona item */
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }

    .carrinho-pulse {
        animation: pulse 0.3s ease-in-out;
    }
`;
document.head.appendChild(estilos);

// Função para criar o botão flutuante do carrinho
function criarBotaoCarrinhoFlutuante() {
    const botaoExistente = document.getElementById('carrinho-flutuante');
    if (botaoExistente) return;

    const botao = document.createElement('button');
    botao.id = 'carrinho-flutuante';
    botao.className = 'carrinho-flutuante';
    botao.onclick = toggleCarrinho;
    atualizarBotaoCarrinho(botao);
    document.body.appendChild(botao);
}

// Atualizar o conteúdo do botão do carrinho
function atualizarBotaoCarrinho(botao = document.getElementById('carrinho-flutuante')) {
    if (!botao) return;

    const quantidadeTotal = carrinho.reduce((total, item) => total + item.quantidade, 0);
    
    // Em mobile, mostrar apenas o ícone e o contador
    const isMobile = window.innerWidth <= 768;
    botao.innerHTML = isMobile ? `
        <span class="icone">🛒</span>
        <span class="contador">${quantidadeTotal}</span>
    ` : `
        <span class="icone">🛒</span>
        <span class="contador">${quantidadeTotal}</span>
    `;

    // Adicionar animação de pulso
    botao.classList.add('carrinho-pulse');
    setTimeout(() => {
        botao.classList.remove('carrinho-pulse');
    }, 300);
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderizarCategorias();
    renderizarProdutos('todos');
    criarBotaoCarrinhoFlutuante();
    atualizarCarrinho();
}); 