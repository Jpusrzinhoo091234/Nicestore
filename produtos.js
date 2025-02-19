const AUMENTO_GLOBAL = 2.50; // Valor do aumento em reais
const AUMENTO_PORCENTAGEM = 0; // Aumento em porcentagem (0 = sem aumento percentual)

// Função auxiliar para calcular preço com aumento
function calcularPrecoComAumento(precoBase) {
    const aumentoFixo = AUMENTO_GLOBAL;
    const aumentoPorcentagem = precoBase * (AUMENTO_PORCENTAGEM / 100);
    return precoBase + aumentoFixo + aumentoPorcentagem;
}

// Exemplos de ícones SVG (adicionar no início do arquivo)
const ICONS = {
    youtube: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/><path fill="white" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
    
    netflix: '<svg viewBox="0 0 24 24"><path fill="#E50914" d="M5.398 0v24l6.87-1.67V0H5.398zm12.234 0v24l-6.87-1.67V0h6.87z"/></svg>',
    
    instagram: '<svg viewBox="0 0 24 24"><path fill="url(#instagram-gradient)" d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.897 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.897-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>',
    
    tiktok: '<svg viewBox="0 0 24 24"><path fill="black" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>',
};

const produtos = {
    streaming: [
        {
            id: 1,
            nome: "YOUTUBE PREMIUM + MUSIC + BRINDE | 30 DIAS",
            emoji: "▶️",
            preco: calcularPrecoComAumento(2.00),
            destaque: "AUTOMÁTICO",
            estoque: 100,
            descricao: "✅ Entrega automática\n✅ YouTube Premium\n✅ YouTube Music\n✅ Brinde exclusivo\n✅ Duração: 30 dias"
        },
        {
            id: 1,
            nome: "CAPCUT PRO - 1 VAGA (30 DIAS)",
            emoji: "✨",
            preco: calcularPrecoComAumento(10.90),
            destaque: "EXCLUSIVO",
            estoque: 6,
            descricao: "✅ Conta limitada a 5 pessoas no máximo\n🚫 Proibido compartilhar!\n➡️ Compatível com Android, iOS e PC"
        },
        {
            id: 2,
            nome: "NETFLIX (TELA) + CANVA PRO 30 DIAS",
            emoji: "🎬",
            preco: calcularPrecoComAumento(9.00),
            destaque: "COMBO",
            estoque: 14,
            descricao: "✅ Compartilhado com outras pessoas\n✅ Garantia de 7 dias\n✅ Séries originais, filmes e mais"
        },
        {
            id: 3,
            nome: "DISNEY PLUS (STAR+ESPN) + CANVA PRO",
            emoji: "✨",
            preco: calcularPrecoComAumento(6.99),
            destaque: "POPULAR",
            estoque: 10,
            descricao: "✅ Compartilhado com outras pessoas\n✅ Melhor Plano 4K FHD\n✅ Garantia de 30 dias"
        },
        {
            id: 4,
            nome: "HBO MAX (TELA) + CANVA PRO 30 DIAS",
            emoji: "🎯",
            preco: calcularPrecoComAumento(3.99),
            destaque: "OFERTA",
            estoque: 11,
            descricao: "✅ Compartilhado com outras pessoas\n✅ Garantia de 25 dias\n✅ Chance de durar mais de 1 mês"
        },
        {
            id: 5,
            nome: "PRIME VÍDEO (TELA) + CANVA PRO",
            emoji: "📺",
            preco: calcularPrecoComAumento(2.00),
            destaque: "PROMOÇÃO",
            estoque: 11,
            descricao: "✅ Compartilhado com outras pessoas\n✅ Garantia de 15 dias\n✅ Filmes, séries e originais Amazon"
        },
        {
            id: 6,
            nome: "PARAMOUNT+ (TELA) + CANVA PRO",
            emoji: "🎥",
            preco: calcularPrecoComAumento(2.50),
            destaque: "LIMITADO",
            estoque: 6,
            descricao: "✅ Compartilhado com outras pessoas\n✅ Garantia de 25 dias\n✅ Catálogo exclusivo da Paramount"
        },
        {
            id: 7,
            nome: "YT PREMIUM + MUSIC + CANVA PRO",
            emoji: "▶️",
            preco: calcularPrecoComAumento(3.99),
            destaque: "PREMIUM",
            estoque: 15,
            descricao: "✅ Acesso ilimitado e sem anúncios\n✅ Garantia de 30 dias\n✅ Inclui YouTube Music"
        },
        {
            id: 8,
            nome: "CRUNCHYROLL (TELA) + CANVA PRO",
            emoji: "🍥",
            preco: calcularPrecoComAumento(2.00),
            destaque: "ANIME",
            estoque: 12,
            descricao: "✅ Compartilhado com outras pessoas\n✅ Garantia de 15 dias\n✅ Animes simulcast direto do Japão"
        },
        {
            id: 9,
            nome: "1x TELA PRIVADA STREAMING + CANVA PRO",
            emoji: "🎯",
            preco: calcularPrecoComAumento(7.99),
            destaque: "PRIVADO",
            estoque: 4,
            descricao: "✅ Perfil só seu\n✅ Garantia de 30 dias\n✅ Escolha uma opção (HBO Max, Disney+, Prime Video, Paramount+, Crunchyroll)"
        },
        {
            id: 10,
            nome: "PARAMOUNT (NO SEU EMAIL) + CANVA PRO",
            emoji: "📧",
            preco: calcularPrecoComAumento(10.50),
            destaque: "EMAIL",
            estoque: 2,
            descricao: "✅ Ativo no seu email!\n✅ 6 telas disponíveis\n✅ Garantia de 25 dias"
        },
        {
            id: 11,
            nome: "YOUTUBE PREMIUM (NO SEU E-MAIL)",
            emoji: "▶️",
            preco: calcularPrecoComAumento(11.90),
            destaque: "PREMIUM",
            estoque: 5,
            descricao: "✅ Você cria a conta e nos envia!\n✅ 6 vagas disponíveis\n✅ Garantia de 30 dias"
        },
        {
            id: 12,
            nome: "PRIME VIDEO (NO SEU EMAIL) + CANVA PRO",
            emoji: "📧",
            preco: calcularPrecoComAumento(11.99),
            destaque: "ÚLTIMO",
            estoque: 1,
            descricao: "✅ Ativo no seu email!(conta nova)\n✅ 6 telas disponíveis\n✅ Garantia de 25 dias"
        },
        {
            id: 317,
            nome: "YouTube Premium - Plano Família",
            emoji: "▶️",
            preco: calcularPrecoComAumento(7.00),
            destaque: "FAMÍLIA",
            estoque: 1,
            descricao: "✔️ Ouça música e vídeos sem propaganda\n✔️ Downloads ilimitados\n✔️ Assistir/Ouvir em segundo plano\n✅ Conta somente sua!\n💰 Dentre 1 a 24 horas você receberá seu acesso\n🟢 CHEQUE SE O VENDEDOR ESTÁ ONLINE.\nSe tiver entrega automática, conta fresquinha criada recente."
        },
        {
            id: 320,
            nome: "NETFLIX 4K 10 DIAS COMPARTILHADA",
            emoji: ICONS.netflix,
            useIcon: true,
            preco: calcularPrecoComAumento(5.89),
            destaque: "COMPARTILHADA",
            estoque: 5195,
            descricao: "📌 plano premium 4k ultra hd\n✅️ suporte 10 dias\n✅️ envio mais rápido da ggmax\n✅ duração de 10 dias\n✅ esse item poderá dar telas simultaneas\n✅ conta compartilhada\n✅ funciona em todos os dispositivos"
        },
        {
            id: 321,
            nome: "[SOMENTE PARA TV] NETFLIX 4K 7 DIAS COMPARTILHADA",
            emoji: ICONS.netflix,
            useIcon: true,
            preco: calcularPrecoComAumento(2.99),
            destaque: "ECONÔMICO",
            estoque: 581173,
            descricao: "📌 plano premium 4k ultra hd\n✅️ suporte 7 dias\n✅️ envio mais rápido da ggmax\n✅ duração de 7 dias\n✅ esse item poderá dar telas simultaneas\n✅ conta compartilhada\n✅ todas as contas são revisadas diariamente\n\n⚠️ POR FAVOR PARA MELHOR EXPERIÊNCIA NÃO:\n❌ revenda nem compartilhe a senha\n❌ mude os perfis\n❌ troque a senha"
        },
        {
            id: 322,
            nome: "NETFLIX 4K - TELA PRIVADA COM PIN (ENTREGA IMEDIATA)",
            emoji: "🎬",
            preco: calcularPrecoComAumento(8.50),
            destaque: "IMEDIATO",
            estoque: 784,
            descricao: "✅ Plano Premium 4K Ultra HD\n✅ Tela Privada com PIN\n✅ Entrega Imediata\n✅ Conta Privada\n✅ Funciona em todos os dispositivos"
        },
        {
            id: 323,
            nome: "NETFLIX 4K - TELA PRIVADA (ENTREGA IMEDIATA)",
            emoji: "🎬",
            preco: calcularPrecoComAumento(5.00),
            destaque: "ECONÔMICO",
            estoque: 2,
            descricao: "✅ Plano Premium 4K Ultra HD\n✅ Tela Privada\n✅ Entrega Imediata\n✅ Conta Privada\n✅ Funciona em todos os dispositivos"
        }
    ],
    
    freefire: [
        {
            id: 401,
            nome: "[PROMOÇÃO] PASSE BOOYAH PREMIUM FREE FIRE",
            emoji: "🎮",
            preco: calcularPrecoComAumento(5.87),
            destaque: "PROMOÇÃO",
            estoque: 100,
            descricao: "✅ Passe Premium\n✅ Entrega mais rápida\n✅ Ativação imediata"
        },
        {
            id: 402,
            nome: "NÍVEL 15 + 50 DIMAS + 24K OURO + TROCA NICK",
            emoji: "⭐",
            preco: calcularPrecoComAumento(3.99),
            destaque: "BÁSICO",
            estoque: 964,
            descricao: "⭐ Personagens: Andrew, Alok, Luna, Moco, Hayato, Antonio, Maxim e Kelly\n💰 24.000 de ouro\n✅ Troca nick grátis"
        },
        {
            id: 403,
            nome: "NÍVEL 15 + 300 DIMAS + 24K OURO + TROCA NICK",
            emoji: "⭐",
            preco: calcularPrecoComAumento(11.99),
            destaque: "PREMIUM",
            estoque: 985,
            descricao: "⭐ Personagens: Andrew, Alok, Luna, Moco, Hayato, Antonio, Maxim e Kelly\n💰 24.000 de ouro\n✅ Troca nick grátis"
        },
        {
            id: 404,
            nome: "NÍVEL 15 + 50 DIMAS + REI CAVEIRA + 24K OURO",
            emoji: "👑",
            preco: calcularPrecoComAumento(4.99),
            destaque: "SKIN",
            estoque: 979,
            descricao: "⭐ Personagens: Andrew, Alok, Luna, Moco, Hayato, Antonio, Maxim e Kelly\n💰 24.000 de ouro\n✅ Skin Rei Caveira\n✅ Troca nick grátis"
        },
        {
            id: 405,
            nome: "10 SALAS PERSONALIZADAS + TROCA NICK",
            emoji: "🎪",
            preco: calcularPrecoComAumento(9.99),
            destaque: "SALAS",
            estoque: 851,
            descricao: "✅ 10 Salas Personalizadas\n✅ Troca de nick grátis\n✅ Entrega imediata"
        },
        {
            id: 406,
            nome: "17 SALAS PERSONALIZADAS + TROCA NICK",
            emoji: "🎪",
            preco: calcularPrecoComAumento(17.00),
            destaque: "MEGA SALAS",
            estoque: 950,
            descricao: "✅ 17 Salas Personalizadas\n✅ Troca de nick grátis\n✅ Entrega imediata\n✅ Melhor custo-benefício"
        },
        {
            id: 407,
            nome: "LV2 + SKIN SAKURA + REI CAVEIRA + MOCHILA",
            emoji: "🌸",
            preco: calcularPrecoComAumento(25.00),
            destaque: "EXCLUSIVO",
            estoque: 967,
            descricao: "🌸 Skin Sakura\n👑 Skin Rei Caveira\n🎒 Mochila e Gelo Rosa\n💃 Emote exclusivo\n✅ Troca nick grátis"
        },
        {
            id: 408,
            nome: "NÍVEL 15 + 50 DIMAS + 26K OURO (SEM TROCA NICK)",
            emoji: "💰",
            preco: calcularPrecoComAumento(2.79),
            destaque: "ECONÔMICO",
            estoque: 898,
            descricao: "⭐ Personagens básicos\n💰 26.000 de ouro\n❌ Sem troca de nick"
        },
        {
            id: 409,
            nome: "10 CONTAS NÍVEL 15 + 50 DIMAS + 24K OURO",
            emoji: "📦",
            preco: calcularPrecoComAumento(34.99),
            destaque: "PACOTE",
            estoque: 993,
            descricao: "✅ 10 Contas completas\n⭐ Nível 15 cada\n💎 50 Diamantes cada\n💰 24.000 ouro cada\n✅ Troca nick grátis"
        }
    ],
    
    animefighters: [
        {
            id: 8,
            nome: "Full Qualquer Booster Comum",
            emoji: "⚔️",
            preco: calcularPrecoComAumento(1.00),
            destaque: "PROMOÇÃO"
        },
        {
            id: 9,
            nome: "Full Qualquer Super Booster",
            emoji: "🔥",
            preco: calcularPrecoComAumento(1.50),
            destaque: "EXCLUSIVO"
        },
        {
            id: 10,
            nome: "200x Clone Token",
            emoji: "🎴",
            preco: calcularPrecoComAumento(1.00),
            destaque: "PROMOÇÃO"
        },
        {
            id: 11,
            nome: "50x Dungeon Token",
            emoji: "🏰",
            preco: calcularPrecoComAumento(1.00),
            destaque: "OFERTA"
        },
        {
            id: 12,
            nome: "100x Defence Token",
            emoji: "🛡️",
            preco: calcularPrecoComAumento(1.00),
            destaque: "LIMITADO"
        }
    ],
    
    instagram: [
        {
            id: 201,
            nome: "150 seguidores + 150 CURTIDAS - (MUNDIAIS)",
            emoji: "📈",
            preco: calcularPrecoComAumento(2.00),
            destaque: "COMBO",
            estoque: 9461,
            descricao: "✅ Seguidores de alta qualidade\n✅ Garantia de 30 dias\n✅ Entrega imediata"
        },
        {
            id: 202,
            nome: "250 seguidores + 250 CURTIDAS - (MUNDIAIS)",
            emoji: "👥",
            preco: calcularPrecoComAumento(4.90),
            destaque: "COMBO",
            estoque: 9884,
            descricao: "✅ Seguidores de alta qualidade\n✅ Garantia de 30 dias\n✅ Entrega imediata"
        },
        {
            id: 203,
            nome: "500 seguidores + 500 CURTIDAS - (MUNDIAIS)",
            emoji: "👥",
            preco: calcularPrecoComAumento(9.90),
            destaque: "POPULAR",
            estoque: 9936,
            descricao: "✅ Seguidores de alta qualidade\n✅ Garantia de 30 dias\n✅ Entrega imediata"
        },
        {
            id: 204,
            nome: "1000 seguidores + 1000 CURTIDAS - (MUNDIAIS)",
            emoji: "👥",
            preco: calcularPrecoComAumento(19.90),
            destaque: "MELHOR OFERTA",
            estoque: 9922,
            descricao: "✅ Seguidores de alta qualidade\n✅ Garantia de 30 dias\n✅ Entrega imediata"
        },
        {
            id: 205,
            nome: "100 SEGUIDORES - (BRASILEIROS) - ALTA QUALIDADE",
            emoji: "🇧🇷",
            preco: calcularPrecoComAumento(4.99),
            destaque: "BR",
            estoque: 9897,
            descricao: "✅ Seguidores brasileiros reais\n✅ Garantia de 30 dias\n✅ Alta retenção"
        },
        {
            id: 206,
            nome: "1000 SEGUIDORES - (BRASILEIROS) - ALTA QUALIDADE",
            emoji: "🇧🇷",
            preco: calcularPrecoComAumento(39.90),
            destaque: "PREMIUM BR",
            estoque: 9972,
            descricao: "✅ Seguidores brasileiros reais\n✅ Garantia de 30 dias\n✅ Alta retenção"
        },
        {
            id: 207,
            nome: "100 SEGUIDORAS - (BRASILEIRAS) - (SÓ MULHERES)",
            emoji: "👩",
            preco: calcularPrecoComAumento(4.99),
            destaque: "MULHERES",
            estoque: 9925,
            descricao: "✅ Seguidoras brasileiras\n✅ Perfis femininos\n✅ Garantia de 30 dias"
        },
        {
            id: 208,
            nome: "100 SEGUIDORES - (BRASILEIROS) - (SÓ HOMEM)",
            emoji: "👨",
            preco: calcularPrecoComAumento(4.99),
            destaque: "HOMENS",
            estoque: 9985,
            descricao: "✅ Seguidores brasileiros\n✅ Perfis masculinos\n✅ Garantia de 30 dias"
        },
        {
            id: 209,
            nome: "2000 CURTIDAS MUNDIAIS - (ALTA QUALIDADE)",
            emoji: "❤️",
            preco: calcularPrecoComAumento(2.00),
            destaque: "CURTIDAS",
            estoque: 99528,
            descricao: "✅ Curtidas de alta qualidade\n✅ Entrega gradual\n✅ Garantia de 30 dias"
        },
        {
            id: 210,
            nome: "10.000 CURTIDAS MUNDIAIS - (ALTA QUALIDADE)",
            emoji: "❤️",
            preco: calcularPrecoComAumento(4.99),
            destaque: "MEGA PACK",
            estoque: 999820,
            descricao: "✅ Curtidas de alta qualidade\n✅ Entrega gradual\n✅ Garantia de 30 dias"
        },
        {
            id: 211,
            nome: "20.000 CURTIDAS MUNDIAIS - (ALTA QUALIDADE)",
            emoji: "❤️",
            preco: calcularPrecoComAumento(9.99),
            destaque: "ULTRA PACK",
            estoque: 99884,
            descricao: "✅ Curtidas de alta qualidade\n✅ Entrega gradual\n✅ Garantia de 30 dias"
        },
        {
            id: 212,
            nome: "250 CURTIDAS BRASILEIRAS - (ALTA QUALIDADE)",
            emoji: "❤️",
            preco: calcularPrecoComAumento(2.00),
            destaque: "BR",
            estoque: 99311,
            descricao: "✅ Curtidas brasileiras\n✅ Entrega rápida\n✅ Alta qualidade"
        },
        {
            id: 213,
            nome: "500 CURTIDAS BRASILEIRAS - (ALTA QUALIDADE)",
            emoji: "🇧🇷",
            preco: calcularPrecoComAumento(3.99),
            destaque: "BR PACK",
            estoque: 99538,
            descricao: "✅ Curtidas brasileiras\n✅ Entrega rápida\n✅ Alta qualidade"
        },
        {
            id: 214,
            nome: "100 VISUALIZAÇÕES PARA STORY - (BRASILEIROS)",
            emoji: "👁️",
            preco: calcularPrecoComAumento(2.00),
            destaque: "STORIES BR",
            estoque: 99905,
            descricao: "✅ Visualizações brasileiras\n✅ Entrega rápida\n✅ Stories"
        },
        {
            id: 215,
            nome: "500 VISUALIZAÇÕES PARA STORY - (BRASILEIROS)",
            emoji: "👁️",
            preco: calcularPrecoComAumento(6.99),
            destaque: "STORIES BR",
            estoque: 99975,
            descricao: "✅ Visualizações brasileiras\n✅ Entrega rápida\n✅ Stories"
        },
        {
            id: 216,
            nome: "1000 VISUALIZAÇÕES PARA STORY - (BRASILEIROS)",
            emoji: "👁️",
            preco: calcularPrecoComAumento(14.99),
            destaque: "STORIES BR",
            estoque: 999988,
            descricao: "✅ Visualizações brasileiras\n✅ Entrega rápida\n✅ Stories"
        },
        {
            id: 217,
            nome: "2500 VISUALIZAÇÕES EM REELS - IGTV - VIDEO",
            emoji: "📱",
            preco: calcularPrecoComAumento(5.00),
            destaque: "REELS",
            estoque: 99704,
            descricao: "✅ Visualizações em Reels\n✅ Entrega gradual\n✅ Aumenta alcance"
        },
        {
            id: 218,
            nome: "5000 VISUALIZAÇÕES EM REELS - IGTV - VIDEO",
            emoji: "📱",
            preco: calcularPrecoComAumento(10.00),
            destaque: "REELS",
            estoque: 99790,
            descricao: "✅ Visualizações em Reels\n✅ Entrega gradual\n✅ Aumenta alcance"
        },
        {
            id: 219,
            nome: "10.000 VISUALIZAÇÕES EM REELS - IGTV - VIDEO",
            emoji: "📱",
            preco: calcularPrecoComAumento(20.00),
            destaque: "REELS",
            estoque: 99942,
            descricao: "✅ Visualizações em Reels\n✅ Entrega gradual\n✅ Aumenta alcance"
        },
        {
            id: 220,
            nome: "20.000 VISUALIZAÇÕES EM REELS - IGTV - VIDEO",
            emoji: "📱",
            preco: calcularPrecoComAumento(55.90),
            destaque: "REELS PREMIUM",
            estoque: 99983,
            descricao: "✅ Visualizações em Reels\n✅ Entrega gradual\n✅ Aumenta alcance"
        },
        {
            id: 221,
            nome: "50.000 VISUALIZAÇÕES EM REELS - IGTV - VIDEO",
            emoji: "📱",
            preco: calcularPrecoComAumento(125.00),
            destaque: "REELS ULTRA",
            estoque: 99996,
            descricao: "✅ Visualizações em Reels\n✅ Entrega gradual\n✅ Aumenta alcance"
        },
        {
            id: 222,
            nome: "100 ESPECTADORES - INSTAGRAM LIVE STREAM 1 HORA",
            emoji: "📺",
            preco: calcularPrecoComAumento(2.99),
            destaque: "LIVE",
            estoque: 99989,
            descricao: "✅ Espectadores para Live\n✅ 1 hora de duração\n✅ Aumenta engajamento"
        },
        {
            id: 223,
            nome: "100 ESPECTADORES - INSTAGRAM LIVE STREAM 2 HORAS",
            emoji: "📺",
            preco: calcularPrecoComAumento(5.98),
            destaque: "LIVE PLUS",
            estoque: 999997,
            descricao: "✅ Espectadores para Live\n✅ 2 horas de duração\n✅ Aumenta engajamento"
        },
        {
            id: 224,
            nome: "100 VOTOS EM ENQUETE PARA STORY - OPÇÃO 1",
            emoji: "📊",
            preco: calcularPrecoComAumento(2.50),
            destaque: "ENQUETE",
            estoque: 9915,
            descricao: "✅ Votos em enquetes\n✅ Opção 1\n✅ Entrega rápida"
        },
        {
            id: 225,
            nome: "100 VOTOS EM ENQUETE PARA STORY - OPÇÃO 2",
            emoji: "📊",
            preco: calcularPrecoComAumento(2.50),
            destaque: "ENQUETE",
            estoque: 9820,
            descricao: "✅ Votos em enquetes\n✅ Opção 2\n✅ Entrega rápida"
        }
    ],
    
    tiktok: [
        {
            id: 301,
            nome: "50.000 Visualizações No TikTok (SEM QUEDA)",
            emoji: "🎵",
            preco: calcularPrecoComAumento(4.55),
            destaque: "VIEWS",
            estoque: 377,
            descricao: "✅ Sem queda\n✅ Entrega rápida\n✅ Qualidade premium"
        },
        {
            id: 302,
            nome: "100.000 Visualizações No Tiktok (SEM QUEDA)",
            emoji: "🎥",
            preco: calcularPrecoComAumento(8.95),
            destaque: "MEGA VIEWS",
            estoque: 891,
            descricao: "✅ Sem queda\n✅ Entrega rápida\n✅ Qualidade premium"
        },
        {
            id: 303,
            nome: "200.000 Visualizações no TikTok (SEM QUEDA)",
            emoji: "🎥",
            preco: calcularPrecoComAumento(19.85),
            destaque: "ULTRA VIEWS",
            estoque: 902,
            descricao: "✅ Sem queda\n✅ Entrega rápida\n✅ Qualidade premium"
        },
        {
            id: 304,
            nome: "100 SEGUIDORES NO TIKTOK",
            emoji: "👥",
            preco: calcularPrecoComAumento(5.55),
            destaque: "SEGUIDORES",
            estoque: 196,
            descricao: "✅ Seguidores de qualidade\n✅ Entrega gradual\n✅ Perfis reais"
        },
        {
            id: 305,
            nome: "500 SEGUIDORES NO TIKTOK",
            emoji: "👥",
            preco: calcularPrecoComAumento(17.50),
            destaque: "SEGUIDORES",
            estoque: 197,
            descricao: "✅ Seguidores de qualidade\n✅ Entrega gradual\n✅ Perfis reais"
        },
        {
            id: 306,
            nome: "1000 SEGUIDORES NO TIKTOK",
            emoji: "👥",
            preco: calcularPrecoComAumento(30.00),
            destaque: "SEGUIDORES",
            estoque: 184,
            descricao: "✅ Seguidores de qualidade\n✅ Entrega gradual\n✅ Perfis reais"
        },
        {
            id: 307,
            nome: "Combo 50k Views + 100 seguidores + 500 curtidas",
            emoji: "💥",
            preco: calcularPrecoComAumento(14.25),
            destaque: "COMBO",
            estoque: 185,
            descricao: "✅ Pacote completo\n✅ Melhor custo-benefício\n✅ Entrega otimizada"
        },
        {
            id: 308,
            nome: "250 Curtidas NO TIKTOK",
            emoji: "♥️",
            preco: calcularPrecoComAumento(4.55),
            destaque: "CURTIDAS",
            estoque: 121,
            descricao: "✅ Curtidas reais\n✅ Entrega rápida\n✅ Sem queda"
        },
        {
            id: 309,
            nome: "500 Curtidas NO TIKTOK",
            emoji: "♥️",
            preco: calcularPrecoComAumento(6.55),
            destaque: "CURTIDAS",
            estoque: 131,
            descricao: "✅ Curtidas reais\n✅ Entrega rápida\n✅ Sem queda"
        },
        {
            id: 310,
            nome: "1000 Curtidas NO TIKTOK",
            emoji: "♥️",
            preco: calcularPrecoComAumento(7.55),
            destaque: "CURTIDAS",
            estoque: 68,
            descricao: "✅ Curtidas reais\n✅ Entrega rápida\n✅ Sem queda"
        },
        {
            id: 311,
            nome: "5000 Curtidas NO TIKTOK",
            emoji: "♥️",
            preco: calcularPrecoComAumento(23.99),
            destaque: "MEGA PACK",
            estoque: 149,
            descricao: "✅ Curtidas reais\n✅ Entrega rápida\n✅ Sem queda"
        },
        {
            id: 312,
            nome: "10.000 Curtidas NO TIKTOK",
            emoji: "♥️",
            preco: calcularPrecoComAumento(47.55),
            destaque: "ULTRA PACK",
            estoque: 144,
            descricao: "✅ Curtidas reais\n✅ Entrega rápida\n✅ Sem queda"
        },
        {
            id: 313,
            nome: "500 SALVAR VIDEOS(FAVORITOS) NO TIKTOK",
            emoji: "🔖",
            preco: calcularPrecoComAumento(3.85),
            destaque: "FAVORITOS",
            estoque: 87,
            descricao: "✅ Salvamentos reais\n✅ Aumenta engajamento\n✅ Entrega rápida"
        },
        {
            id: 314,
            nome: "500 COMPARTILHAMENTOS NO TIKTOK",
            emoji: "🔄",
            preco: calcularPrecoComAumento(3.85),
            destaque: "SHARES",
            estoque: 134,
            descricao: "✅ Compartilhamentos reais\n✅ Aumenta alcance\n✅ Entrega rápida"
        },
        {
            id: 315,
            nome: "500 VIEWS NO STORYS NO TIKTOK",
            emoji: "👁️",
            preco: calcularPrecoComAumento(3.85),
            destaque: "STORIES",
            estoque: 150,
            descricao: "✅ Visualizações em stories\n✅ Entrega rápida\n✅ Sem queda"
        },
        {
            id: 316,
            nome: "500 CURTIDAS NO STORYS NO TIKTOK",
            emoji: "❤️",
            preco: calcularPrecoComAumento(3.85),
            destaque: "STORIES",
            estoque: 150,
            descricao: "✅ Curtidas em stories\n✅ Entrega rápida\n✅ Sem queda"
        }
    ],
    
    valorant: [
        {
            id: 401,
            nome: "NIVEL 16 (COMP NÃO LIBERADO)",
            emoji: "🎮",
            preco: calcularPrecoComAumento(17.90),
            destaque: "COMP NÃO LIBERADO",
            estoque: 44,
            descricao: "- Modo ranked / competitivo liberado;\n- Full acesso (Você pode vincular em seu e-mail)."
        },
        {
            id: 402,
            nome: "NIVEL 17 (COMP NÃO LIBERADO)",
            emoji: "🎮",
            preco: calcularPrecoComAumento(21.90),
            destaque: "COMP NÃO LIBERADO",
            estoque: 97,
            descricao: "- Modo ranked / competitivo liberado;\n- Full acesso (Você pode vincular em seu e-mail)."
        },
        {
            id: 403,
            nome: "UNRANKED/Expirado (COMP LIBERADO)",
            emoji: "🎮",
            preco: calcularPrecoComAumento(29.90),
            destaque: "COMP LIBERADO",
            estoque: 13,
            descricao: "- Modo ranked / competitivo liberado;\n- Full acesso (Você pode vincular em seu e-mail)."
        },
        {
            id: 404,
            nome: "UNRANKED (COMP LIBERADO E NUNCA JOGADO)",
            emoji: "🎮",
            preco: calcularPrecoComAumento(34.90),
            destaque: "COMP LIBERADO",
            estoque: 15,
            descricao: "- Modo ranked / competitivo liberado;\n- Full acesso (Você pode vincular em seu e-mail)."
        },
        {
            id: 405,
            nome: "FERRO (1-3)",
            emoji: "🎮",
            preco: calcularPrecoComAumento(39.90),
            destaque: "RANK",
            estoque: 3,
            descricao: "- Modo ranked / competitivo liberado;\n- Full acesso (Você pode vincular em seu e-mail)."
        },
        {
            id: 406,
            nome: "BRONZE (1-3)",
            emoji: "🎮",
            preco: calcularPrecoComAumento(38.90),
            destaque: "RANK",
            estoque: 11,
            descricao: "- Modo ranked / competitivo liberado;\n- Full acesso (Você pode vincular em seu e-mail)."
        },
        {
            id: 407,
            nome: "PRATA (1-3)",
            emoji: "🎮",
            preco: calcularPrecoComAumento(39.90),
            destaque: "RANK",
            estoque: 22,
            descricao: "- Modo ranked / competitivo liberado;\n- Full acesso (Você pode vincular em seu e-mail)."
        },
        {
            id: 408,
            nome: "PLATINA (1-3)",
            emoji: "🎮",
            preco: calcularPrecoComAumento(59.90),
            destaque: "RANK",
            estoque: 8,
            descricao: "- Modo ranked / competitivo liberado;\n- Full acesso (Você pode vincular em seu e-mail)."
        },
        {
            id: 409,
            nome: "COMP LIBERADO (APENAS PARA CONSOLE)",
            emoji: "🎮",
            preco: calcularPrecoComAumento(19.90),
            destaque: "COMP LIBERADO",
            estoque: 28,
            descricao: "- Modo ranked / competitivo liberado;\n- Full acesso (Você pode vincular em seu e-mail)."
        },
    ],
    
    xbox: [
        {
            id: 501,
            nome: "XBOX GAME PASS ULTIMATE - 1 MÊS",
            emoji: "🎮",
            preco: calcularPrecoComAumento(3.90),
            destaque: "MAIS VENDIDO",
            estoque: 58,
            descricao: "✅ Game Pass Ultimate 1 mês\n✅ Funciona em Xbox, PC e Cloud Gaming\n✅ Entrega imediata\n✅ Ativação garantida"
        },
        {
            id: 502,
            nome: "GAME PASS ULTIMATE + EA PLAY",
            emoji: "🎮",
            preco: calcularPrecoComAumento(6.90),
            destaque: "PREMIUM",
            estoque: 68,
            descricao: "🟢 Xbox Game Pass Ultimate\n🟢 Conta 30 Dias\n🟢 Conta compartilhada\n🟢 Login + Senha inclusos\n🟢 Acesso ao EA PLAY\n🟢 Acesso ao xCloud\n🟢 Disponível em todos dispositivos\n😊 A revenda do produto não é permitida"
        },
        {
            id: 503,
            nome: "GAME PASS ULTIMATE - 4 PESSOAS",
            emoji: "🎮",
            preco: calcularPrecoComAumento(14.90),
            destaque: "COMPARTILHADO",
            estoque: 4,
            descricao: "🟢 Xbox Game Pass Ultimate 1 Mês\n🟢 Conta 30 Dias\n🟢 Conta compartilhada com 4 pessoas\n🟢 Compartilhável com sua conta principal\n🟢 Login + Senha inclusos\n🟢 Acesso ao EA PLAY\n�� Acesso ao xCloud\n🟢 Disponível em todos dispositivos"
        },
        {
            id: 504,
            nome: "GAME PASS ULTIMATE - 2 PESSOAS",
            emoji: "🎮",
            preco: calcularPrecoComAumento(39.90),
            destaque: "PRIVADO",
            estoque: 2,
            descricao: "🟢 Xbox Game Pass Ultimate\n🟢 Conta 30 Dias\n🟢 Conta compartilhada com 2 pessoas\n🟢 Compre 2 Unidades para conta privada\n🟢 Compartilhável com conta principal\n🟢 Disponível em todos dispositivos\n🟢 Acesso ao EA PLAY\n�� Acesso ao xCloud"
        },
        {
            id: 505,
            nome: "ATIVAÇÃO DE CÓDIGO [SUPORTE]",
            emoji: "🌟",
            preco: calcularPrecoComAumento(12.99),
            destaque: "SUPORTE",
            estoque: 6,
            descricao: "✅ Serviço de ativação de códigos\n✅ Suporte especializado\n✅ Resolução de problemas\n✅ Garantia de funcionamento"
        }
    ],
}; 