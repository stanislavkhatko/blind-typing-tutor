/**
 * Portuguese word dictionary for typing practice
 * Sorted by frequency and difficulty
 */
export const words: string[] = [
    // Very common short words (2-4 letters)
    'o', 'a', 'os', 'as', 'um', 'uma', 'de', 'do', 'da', 'dos', 'das',
    'e', 'ou', 'em', 'no', 'na', 'nos', 'nas', 'por', 'para', 'com',
    'eu', 'tu', 'ele', 'ela', 'nós', 'vós', 'eles', 'elas', 'você',
    'que', 'se', 'não', 'sim', 'bem', 'mal', 'muito', 'mais', 'menos',

    // Common 5-7 letter words
    'ser', 'estar', 'ter', 'haver', 'fazer', 'poder', 'dizer', 'ir',
    'ver', 'dar', 'saber', 'querer', 'chegar', 'passar', 'dever', 'pôr',
    'parecer', 'ficar', 'crer', 'falar', 'levar', 'deixar', 'seguir',
    'encontrar', 'chamar', 'vir', 'pensar', 'sair', 'voltar', 'tomar',

    // Common nouns
    'homem', 'mulher', 'criança', 'pessoa', 'gente', 'mundo', 'vida',
    'tempo', 'dia', 'ano', 'mês', 'semana', 'hora', 'minuto', 'segundo',
    'mão', 'cabeça', 'olho', 'olhos', 'rosto', 'voz', 'corpo', 'coração',
    'coisa', 'forma', 'vez', 'momento', 'ponto', 'lugar', 'parte', 'casa',

    // Family
    'pai', 'mãe', 'irmão', 'irmã', 'filho', 'filha', 'amigo', 'amiga',
    'família', 'pais', 'avô', 'avó', 'tio', 'tia', 'primo', 'prima',

    // Common adjectives
    'bom', 'boa', 'mau', 'má', 'grande', 'pequeno', 'pequena',
    'novo', 'nova', 'velho', 'velha', 'jovem', 'primeiro', 'último',
    'mesmo', 'mesma', 'outro', 'outra', 'cada', 'todo', 'toda', 'algum',
    'bonito', 'bonita', 'feio', 'feia', 'longo', 'curto', 'alto', 'baixo',
    'rápido', 'lento', 'fácil', 'difícil', 'importante', 'possível',

    // Numbers
    'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez',
    'onze', 'doze', 'treze', 'catorze', 'quinze', 'dezesseis', 'vinte', 'trinta',
    'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa', 'cem', 'mil',

    // Colors
    'vermelho', 'azul', 'verde', 'amarelo', 'preto', 'branco', 'cinza', 'rosa',
    'laranja', 'roxo', 'violeta', 'marrom', 'castanho',

    // Time and dates
    'hoje', 'amanhã', 'ontem', 'agora', 'sempre', 'nunca', 'às vezes',
    'ainda', 'já', 'logo', 'cedo', 'tarde', 'depois', 'antes', 'durante',
    'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado', 'domingo',
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto',
    'setembro', 'outubro', 'novembro', 'dezembro',

    // Common verbs (longer)
    'trabalhar', 'jogar', 'aprender', 'ensinar', 'comprar', 'vender',
    'comer', 'beber', 'dormir', 'ouvir', 'escutar', 'olhar', 'entender',
    'explicar', 'começar', 'terminar', 'abrir', 'fechar', 'entrar', 'sair',

    // Places
    'cidade', 'país', 'rua', 'caminho', 'praça', 'porta', 'janela',
    'quarto', 'cozinha', 'sala', 'escola', 'igreja', 'loja', 'mercado',

    // Technology
    'computador', 'internet', 'telefone', 'celular', 'móvel', 'email',
    'correio', 'site', 'programa', 'arquivo', 'pasta', 'tela', 'teclado',

    // Nature
    'árvore', 'flor', 'grama', 'montanha', 'vale', 'rio', 'lago', 'mar',
    'sol', 'lua', 'estrela', 'céu', 'nuvem', 'chuva', 'neve', 'vento',

    // Food and drink
    'pão', 'queijo', 'carne', 'peixe', 'legume', 'fruta', 'maçã', 'pera',
    'água', 'leite', 'café', 'chá', 'vinho', 'cerveja', 'suco', 'sumo',

    // Body parts
    'cabeça', 'cabelo', 'rosto', 'nariz', 'boca', 'orelha', 'pescoço', 'braço',
    'perna', 'pé', 'dedo', 'coração', 'estômago', 'costas', 'mão',

    // Longer/complex words
    'portugal', 'brasil', 'português', 'portuguesa', 'inglês', 'alemão',
    'francês', 'espanhol', 'italiano', 'russo', 'chinês', 'japonês',
    'universidade', 'biblioteca', 'museu', 'hospital', 'farmácia',
    'restaurante', 'supermercado', 'aeroporto', 'estação', 'autocarro', 'ônibus',

    // Words with ç (important for Portuguese typing practice)
    'ação', 'canção', 'coração', 'atenção', 'lição', 'solução', 'nação',
    'criança', 'ança', 'ança', 'começar', 'cabeça', 'ança', 'serviço',
    'preço', 'peça', 'força', 'ança', 'praça', 'frança', 'ança',

    // Words with til (~) - nasal vowels
    'não', 'são', 'mão', 'pão', 'irmão', 'irmã', 'manhã', 'amanhã',
    'alemão', 'alemã', 'órfão', 'órfã', 'cidadão', 'cidadã', 'cristão',
    'ação', 'canção', 'lição', 'nação', 'estação', 'informação',
    'mãe', 'põe', 'cães', 'pães', 'capitães', 'alemães',

    // Words with accents (á, é, í, ó, ú, â, ê, ô, à)
    'está', 'até', 'você', 'café', 'josé', 'três', 'português',
    'é', 'já', 'só', 'pé', 'fé', 'mês', 'país', 'aí', 'saí',
    'avô', 'avó', 'vovô', 'vovó', 'pôr', 'ônibus', 'você', 'inglês',
    'água', 'pêssego', 'tênis', 'ângulo', 'ânimo', 'âncora',

    // Common expressions
    'olá', 'oi', 'tchau', 'adeus', 'bom dia', 'boa tarde', 'boa noite',
    'obrigado', 'obrigada', 'por favor', 'desculpe', 'com licença', 'de nada',
    'tudo bem', 'muito', 'pouco', 'bastante', 'demais', 'nada', 'algo', 'alguém', 'ninguém',

    // Brazilian Portuguese specific
    'você', 'vocês', 'gente', 'legal', 'bacana', 'maneiro', 'massa',
    'ônibus', 'trem', 'metrô', 'celular', 'computador',
];
