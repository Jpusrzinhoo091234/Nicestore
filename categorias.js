const categorias = [
    {
        id: "combos",
        nome: "Combos",
        cor: "#000000",
        emoji: "📺",
        descricao: "Todos os produtos"
    },
    {
        id: "Netflix",
        nome: "Netflix",
        cor: "#E50914",
        emoji: "📺",
        descricao: "Serviços de streaming"
    },
    {
        id: "Paramount",
        nome: "Paramount",
        cor: "#FF0000",
        emoji: "📺",
        descricao: "Serviços de games"
    },
    {
        id: "DisneyPlus",
        nome: "Disney +Star Plus",
        cor: "#000000",
        emoji: "📺",
        descricao: "Todos os produtos"
    },
    {
        id: "Hbomax",
        nome: "HBOMAX",
        cor: "#000000",
        emoji: "📺",
        descricao: "Todos os produtos"
    },
    {
        id: "Crunchyroll",
        nome: "Crunchyroll",
        cor: "#000000",
        emoji: "📺",
        descricao: "Todos os produtos"
    },
    {
        id: "Canva",
        nome: "Canva",
        cor: "#000000",
        emoji: "🤖",
        descricao: "Todos os produtos"
    },
    {
        id: "SPOTIFY",
        nome: "SPOTIFY",
        cor: "#000000",
        emoji: "🎶",
        descricao: "Todos os produtos"
    },
    {
        id: "appletv",
        nome: "Apple TV+",
        cor: "#000000",
        emoji: "📺",
        descricao: "Todos os produtos"
    },
    {
        id: "youtube",
        nome: "Youtube",
        cor: "#000000",
        emoji: "🎶",
        descricao: "Todos os produtos"
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