const categorias = [
    {
        id: "todos",
        nome: "ver tudo",
        cor: "#000000",
        descricao: "Todos os produtos"
    },
    {
        id: "instagram",
        nome: "instagram",
        cor: "#E1306C",
        emoji: "📸",
        descricao: "Serviços para Instagram"
    },
    {
        id: "streaming",
        nome: "streaming",
        cor: "#E50914",
        emoji: "📺",
        descricao: "Serviços de streaming"
    },
    {
        id: "freefire",
        nome: "free fire",
        cor: "#FF6B00",
        emoji: "🎮",
        descricao: "Itens para Free Fire"
    },
    {
        id: "animefighters",
        nome: "anime fighters",
        cor: "#7C4DFF",
        emoji: "⚔️",
        descricao: "Itens para Anime Fighters"
    },
    {
        id: "tiktok",
        nome: "tiktok",
        cor: "#000000",
        emoji: "🎥",
        descricao: "Serviços para TikTok"
    },
    {
        id: "valorant",
        nome: "valorant",
        cor: "#A3A3A3",
        emoji: "🎮",
        descricao: "Contas de Valorant"
    },
];

function renderizarCategorias() {
    const container = document.querySelector('.categorias');
    container.innerHTML = categorias.map(categoria => `
        <button class="categoria-btn ${categoria.id === 'todos' ? 'ativo' : ''}" 
                data-categoria="${categoria.id}"
                style="--categoria-color: ${categoria.cor}"
                title="${categoria.descricao}">
            ${categoria.emoji ? categoria.emoji + ' ' : ''}${categoria.nome}
        </button>
    `).join('');

    // Adicionar event listeners
    document.querySelectorAll('.categoria-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            filtrarProdutos(btn.dataset.categoria);
        });
    });

    // Verificar overflow inicial
    verificarOverflow();

    // Adicionar listener para redimensionamento
    window.addEventListener('resize', verificarOverflow);

    // Adicionar listener para scroll
    container.addEventListener('scroll', verificarOverflow);
}

// Função para verificar se há overflow
function verificarOverflow() {
    const container = document.querySelector('.categorias');
    const navLeft = document.querySelector('.categoria-nav-left');
    const navRight = document.querySelector('.categoria-nav-right');
    
    const hasOverflow = container.scrollWidth > container.clientWidth;
    const atStart = container.scrollLeft <= 0;
    const atEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;

    navLeft.classList.toggle('show', hasOverflow && !atStart);
    navRight.classList.toggle('show', hasOverflow && !atEnd);
}

// Função para rolar as categorias
function rolarCategorias(direction) {
    const container = document.querySelector('.categorias');
    const scrollAmount = container.clientWidth * 0.8;
    
    if (direction === 'left') {
        container.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    } else {
        container.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }
} 