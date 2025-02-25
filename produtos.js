const AUMENTO_GLOBAL = 2.60; // Valor do aumento em reais
const AUMENTO_PORCENTAGEM = 20; // Aumento em porcentagem (0 = sem aumento percentual)

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
    Netflix: [
        {
            "id": 1,
            "nome": "NETFLIX 4K 30 DIAS | 1 TELA COM PIN (SOMENTE PARA TV)",
            "emoji": "📺",
            "preco": calcularPrecoComAumento(16.90),
            "estoque": 146399,
            "descricao": "Plano Premium 4K Ultra HD\n🔹 Suporte de 30 dias\n🔹 Envio rápido\n🔹 Conta privada\n🔹 Exclusivo para TV"
        },
        {
            "id": 2,
            "nome": "NETFLIX 4K 30 DIAS | 1 TELA COM PIN",
            "emoji": "📺",
            "preco": calcularPrecoComAumento(15.90),
            "estoque": 13568,
            "descricao": "Plano Premium 4K Ultra HD\n🔹 Suporte de 30 dias\n🔹 Envio rápido\n🔹 Conta privada\n🔹 Funciona em todos os dispositivos"
        },
        {
            "id": 3,
            "nome": "NETFLIX 4K 10 DIAS COMPARTILHADA",
            "emoji": "📺",
            "preco": calcularPrecoComAumento(5.89),
            "estoque": 5038,
            "descricao": "Plano Premium 4K Ultra HD\n🔹 Suporte de 10 dias\n🔹 Envio rápido\n🔹 Conta compartilhada\n🔹 Funciona em todos os dispositivos\n🔹 Pode dar telas simultâneas"
        },
        {
            "id": 4,
            "nome": "NETFLIX 4K 7 DIAS COMPARTILHADA (SOMENTE PARA TV)",
            "emoji": "📺",
            "preco": calcularPrecoComAumento(2.99),
            "estoque": 112,
            "descricao": "Plano Premium 4K Ultra HD\n🔹 Suporte de 7 dias\n🔹 Envio rápido\n🔹 Conta compartilhada\n🔹 Exclusivo para TV\n🔹 Pode dar telas simultâneas"
        }
    ],
    
    Paramount: [
        {
            "id": 5,
            "nome": "Paramount Plus - TELA PRIVADA (30 dias de uso)",
            "emoji": "📺",
            "preco": calcularPrecoComAumento(2.99),
            "estoque": 12,
            "descricao": "Acesso a uma tela individual. Pode colocar o seu nome na tela."
        },
        {
            "id": 6,
            "nome": "Paramount Plus - ATIVAÇÃO NO SEU EMAIL - CONTA COMPLETA (30 dias de uso)",
            "emoji": "📧",
            "preco": calcularPrecoComAumento(7.99),
            "estoque": 9,
            "descricao": "Acesso completo a conta Paramount Plus. Todos os perfis são seus."
        }
    ],

    DisneyPlus: [
        {
            "id": 7,
            "nome": "Disney + Star Plus (Compartilhada) + Brinde [1 Mês]",
            "emoji": "🎬",
            "preco": calcularPrecoComAumento(3.99),
            "estoque": 33,
            "descricao": "Acesso a conta compartilhada com perfil público. Inclui brinde de 1 mês."
        },
        {
            "id": 8,
            "nome": "Disney + Star Plus (Tela Privada) + Brinde [1 Mês]",
            "emoji": "🎥",
            "preco": calcularPrecoComAumento(6.99),
            "estoque": 33,
            "descricao": "Acesso a conta com perfil exclusivo protegido por PIN. Inclui brinde de 1 mês."
        }
    ],

    Hbomax: [
        {
            "id": 9,
            "nome": "HBOMAX TELA PRIVADA + PIN (STANDARD)",
            "emoji": "💖",
            "preco": calcularPrecoComAumento(2.50),
            "estoque": 54,
            "descricao": "Plano Standard Full HD. Até 2 dispositivos simultâneos. 1 perfil por usuário. Pode dar tela cheia, sem reembolso caso ocorra."
        },
        {
            "id": 10,
            "nome": "HBOMAX CONTA PRIVADA NO MEU EMAIL (STANDARD)",
            "emoji": "⭐",
            "preco": calcularPrecoComAumento(4.20),
            "estoque": 30,
            "descricao": "Plano Standard Full HD. Até 2 dispositivos simultâneos. Conta privada, apenas você na conta. Garantia de 30 dias."
        }
    ],
    Crunchyroll: [
        {
            "id": 11,
            "nome": "Crunchyroll Mega Fan 30 Dias + CANVA (Brinde)",
            "emoji": "⚡",
            "preco": calcularPrecoComAumento(2.00),
            "estoque": 8,
            "descricao": "Conta compartilhada com o plano Mega Fan, garantia de 30 dias de funcionamento. Acesso a mais de 20.000 conteúdos de mangás e animes. Brinde: Canva. Proibido trocar a senha."
        }
    ],
    Canva: [
        {
            "id": 12,
            "nome": "CANVA PRO 30 DIAS + 4 BRINDES + ENTREGA AUTOMATICA",
            "emoji": "🤖",
            "preco": calcularPrecoComAumento(2.00),
            "estoque": 10,
            "descricao": "Aproveite os benefícios do Canva Pro por 30 dias com nosso plano compartilhado. Garantia de 30 dias de funcionamento e suporte. Receba 4 brindes com a compra. Link entregue automaticamente após a compra."
        }
    ],
    
    SPOTIFY: [
        {
            "id": 13,
            "nome": "1000 Plays Premium ⚡",
            "emoji": "💎",
            "preco": calcularPrecoComAumento(2.90),
            "estoque": 99476,
            "descricao": "NÃO é Spotify Premium. Adquira 1000 plays para suas músicas. Serviço garantido com reposição em caso de queda maior que 5%."
        },
        {
            "id": 14,
            "nome": "1000 Plays Brasileiros ⚡🇧🇷",
            "emoji": "🇧🇷",
            "preco": calcularPrecoComAumento(4.90),
            "estoque": 99355,
            "descricao": "Adquira 1000 plays para suas músicas, com foco no público brasileiro. Garantia de 30 dias com reposição em caso de queda."
        },
        {
            "id": 15,
            "nome": "1000 Seguidores Mundiais 👥",
            "emoji": "🌍",
            "preco": calcularPrecoComAumento(5.90),
            "estoque": 99755,
            "descricao": "Adquira 1000 seguidores mundiais para suas redes sociais. Ideal para influenciadores e marcas. Garantia de 30 dias."
        },
        {
            "id": 16,
            "nome": "1000 Seguidores Brasileiros 👥🇧🇷",
            "emoji": "🇧🇷",
            "preco": calcularPrecoComAumento(7.90),
            "estoque": 99988,
            "descricao": "Adquira 1000 seguidores brasileiros para sua conta. Perfeito para quem busca crescer no Brasil. Garantia de 30 dias."
        },
        {
            "id": 17,
            "nome": "1000 Salvos ✅",
            "emoji": "✅",
            "preco": calcularPrecoComAumento(5.90),
            "estoque": 99966,
            "descricao": "Adquira 1000 salvos para suas músicas ou posts. Aumente a visibilidade e engajamento das suas publicações. Garantia de 30 dias."
        }
    ],
    appletv: [
        {
            "id": 18,
            "nome": "TV APPLE - 30 DIAS (PRIVADA)",
            "emoji": "📺",
            "preco": calcularPrecoComAumento(3.99),
            "estoque": 2,
            "descricao": "Acesse a TV Apple com qualidade superior em 4K HDR. Conta compartilhada, disponível por 30 dias. Ideal para TVs e navegadores."
        },
        {
            "id": 19,
            "nome": "APPLE TV+ MLS SEASON PASS - 30 DIAS (PRIVADA)",
            "emoji": "⚽️",
            "preco": calcularPrecoComAumento(5.99),
            "estoque": 3,
            "descricao": "Acesse o Apple TV+ com o MLS Season Pass. Conta privada, disponível em 4K HDR e válida por 30 dias. Ideal para assistir na sua TV Apple."
        }
    ],
    youtube: [
        {
            "id": 20,
            "nome": "YouTube Premium + YouTube Music 30 dias via link",
            "emoji": "🎥",
            "preco": calcularPrecoComAumento(4.49),
            "estoque": 4,
            "descricao": "Receba um link para ativar o YouTube Premium e YouTube Music. Acesso válido por 30 dias. Suporte garantido durante o período."
        },
        {
            "id": 21,
            "nome": "YouTube Premium Família no seu e-mail 30 dias",
            "emoji": "🎶",
            "preco": calcularPrecoComAumento(5.99),
            "estoque": 59,
            "descricao": "Conta completa do YouTube Premium e YouTube Music em modo Família. Envie seu Gmail e senha para ativação. Acesso válido por 30 dias."
        }
    ],
    combos: [
        {
            "id": 22,
            "nome": "YouTube Premium + Canva Link 30 dias",
            "emoji": "🎥",
            "preco": calcularPrecoComAumento(3.99),
            "estoque": 10,
            "descricao": "Acesso ao YouTube Premium e Canva Pro por 30 dias."
        },
        {
            "id": 23,
            "nome": "Star Plus / Disney / ESPN + Canva Link 30 dias",
            "emoji": "🌟",
            "preco": calcularPrecoComAumento(10.99),
            "estoque": 16,
            "descricao": "Acesso ao Star Plus, Disney e ESPN com Canva Pro por 30 dias."
        },
        {
            "id": 24,
            "nome": "Prime Video + Canva Pro Link 30 dias",
            "emoji": "🎬",
            "preco": calcularPrecoComAumento(2.00),
            "estoque": 35,
            "descricao": "Acesso ao Prime Video e Canva Pro por 30 dias."
        },
        {
            "id": 25,
            "nome": "HBO Max + Canva Link 30 dias",
            "emoji": "📺",
            "preco": calcularPrecoComAumento(4.99),
            "estoque": 16,
            "descricao": "Acesso ao HBO Max e Canva Pro por 30 dias."
        },
        {
            "id": 26,
            "nome": "Prime Video + HBO Max 30 dias Tela Privada",
            "emoji": "🎥",
            "preco": calcularPrecoComAumento(6.99),
            "estoque": 14,
            "descricao": "Acesso ao Prime Video e HBO Max em tela privada por 30 dias."
        },
        {
            "id": 27,
            "nome": "YouTube Premium + Star Plus 30 dias",
            "emoji": "🎥",
            "preco": calcularPrecoComAumento(7.99),
            "estoque": 10,
            "descricao": "Acesso ao YouTube Premium e Star Plus por 30 dias."
        },
        {
            "id": 28,
            "nome": "Prime Video + YouTube Premium 30 dias",
            "emoji": "🎬",
            "preco": calcularPrecoComAumento(8.99),
            "estoque": 15,
            "descricao": "Acesso ao Prime Video e YouTube Premium por 30 dias."
        },
        {
            "id": 29,
            "nome": "HBO Max + YouTube Premium 30 dias",
            "emoji": "📺",
            "preco": calcularPrecoComAumento(9.99),
            "estoque": 12,
            "descricao": "Acesso ao HBO Max e YouTube Premium por 30 dias."
        },
        {
            "id": 30,
            "nome": "Crunchyroll 30 dias + Canva Pro 30 dias",
            "emoji": "🎮",
            "preco": calcularPrecoComAumento(2.99),
            "estoque": 8,
            "descricao": "Acesso ao Crunchyroll e Canva Pro por 30 dias."
        },
        {
            "id": 31,
            "nome": "Conta YouTube Premium Família no seu Gmail + Canva Link",
            "emoji": "🎶",
            "preco": calcularPrecoComAumento(5.99),
            "estoque": 12,
            "descricao": "Conta YouTube Premium Família e Canva Pro por 30 dias."
        },
        {
            "id": 32,
            "nome": "Monte seu Combo 3 Streamings Compartilhado",
            "emoji": "☀️",
            "preco": calcularPrecoComAumento(18.99),
            "estoque": 5,
            "descricao": "Monte seu combo com 3 streamings compartilhados."
        }
    ]
};