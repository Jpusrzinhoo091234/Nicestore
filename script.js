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

// Função para registrar acesso
function registrarAcesso() {
    fetch('contador.php')
        .then(response => response.json())
        .then(data => {
            console.log(`Total de acessos: ${data.acessos}`);
            // Mostrar o número de acessos no canto inferior
            const acessosElement = document.getElementById('contador-acessos');
            acessosElement.innerHTML = `👥 ${data.acessos} visitas`;
        })
        .catch(error => console.error('Erro ao registrar acesso:', error));
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderizarCategorias();
    renderizarProdutos('todos');
    atualizarCarrinho();
    registrarAcesso();
}); 