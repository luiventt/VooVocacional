// O código será executado somente depois que o HTML estiver totalmente carregado
window.addEventListener('DOMContentLoaded', (event) => {

    const startScreen = document.getElementById('start-screen');
    const coursesScreen = document.getElementById('courses-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');
    const startButton = document.getElementById('start-button');
    const dataFormScreen = document.getElementById('data-form-screen'); // NOVO ELEMENTO DO FORMULÁRIO
    const formSubmitNextButton = document.getElementById('form-submit-next-button'); // BOTÃO DE PRÓXIMA ETAPA NO FORMULÁRIO
    const showCoursesButton = document.getElementById('show-courses-button');
    const startMiniQuizButton = document.getElementById('start-mini-quiz-button');
    const backButtonIconCourses = document.getElementById('back-button-icon-courses');
    const backButtonIconChoose = document.getElementById('back-button-icon-choose');
    const backButtonIconMiniQuiz = document.getElementById('back-button-icon-mini-quiz');
    // Botões de voltar dos mini-jogos removidos: backButtonIconMemory, backButtonIconJokenpo, backButtonIconTictactoe
    const restartButton = document.getElementById('restart-button');
    const questionText = document.getElementById('question-text');
    const dynamicContent = document.getElementById('dynamic-content');
    const progressBarFill = document.getElementById('progress-bar-fill');
    const progressBar = document.getElementById('progress-bar');
    const coursesListContainer = document.getElementById('courses-list');
    const backgroundAudio = document.getElementById('background-audio');
    const audioButton = document.getElementById('audio-button');
    const tutorialModal = document.getElementById('tutorial-modal');
    const closeModalBtn = document.getElementById('close-modal');
    // Corrigido o erro de atribuição no original:
    const startQuizFromModalBtn = document.getElementById('start-quiz-from-modal'); 
    const chooseCourseScreen = document.getElementById('choose-course-screen');
    const chooseCourseGrid = document.getElementById('choose-course-grid');
    const miniQuizScreen = document.getElementById('mini-quiz-screen');
    const miniQuizQuestionText = document.getElementById('mini-quiz-question-text');
    const miniQuizDynamicContent = document.getElementById('mini-quiz-dynamic-content');
    const miniQuizProgressBarFill = document.getElementById('mini-quiz-progress-bar-fill');
    const miniQuizProgressBar = document.getElementById('mini-quiz-progress-bar');
    const miniQuizResultModal = document.getElementById('mini-quiz-result-modal');
    const miniQuizResultText = document.getElementById('mini-quiz-result-text');
    const miniQuizPercentage = document.getElementById('mini-quiz-percentage');
    const restartMiniQuizBtn = document.getElementById('restart-mini-quiz-btn');

    // Elementos dos Mini-jogos removidos: memoryGameScreen, rockPaperScissorsScreen, tictactoeScreen

    let affinityChartInstance = null;
    let miniQuizChartInstance = null;

    let currentQuestionIndex = 0;
    let scores = {};
    let miniQuizQuestions = [];
    let currentMiniQuizQuestionIndex = 0;
    let miniQuizScore = 0;
    let selectedMiniQuizCourse = '';

    // Variáveis dos Mini-jogos removidas: hasFlippedCard, lockBoard, firstCard, secondCard, matchedPairsCount, totalPairs, memoryGameIcons, jokenpoWins, jokenpoTargetWins, tictactoeBoard, tictactoePlayer, tictactoeGameActive, tictactoeWinningConditions

    const questionColors = ['question-color-1', 'question-color-2', 'question-color-3', 'question-color-4', 'question-color-5'];

    // Ordem dos minigames antes das perguntas removida: miniGamesSequence, currentMiniGameIndex

    const courses = {
        'Administração': {
            description: 'Trabalha com o planejamento, organização e controle de recursos de uma empresa.',
            areas: 'Gestão Empresarial, Finanças, Marketing, Recursos Humanos.',
            icon: 'fas fa-chart-line',
            traits: ['Liderança', 'Organização', 'Estratégia', 'Análise']
        },
        'Comércio Exterior': {
            description: 'Gerencia processos de compra e venda de produtos e serviços entre países.',
            areas: 'Importação e Exportação, Logística Internacional, Câmbio e Negociação.',
            icon: 'fas fa-globe-americas',
            traits: ['Negociação', 'Comunicação', 'Global', 'Liderança']
        },
        'Cuidados de Idosos': {
            description: 'Profissional especializado em proporcionar bem-estar e qualidade de vida para pessoas idosas.',
            areas: 'Saúde e Higiene, Nutrição, Atividades Recreativas, Acompanhamento.',
            icon: 'fas fa-hands-helping',
            traits: ['Empatia', 'Paciência', 'Cuidado', 'Dedicação']
        },
        'Desenvolvimento de Sistemas': {
            description: 'Cria, projeta e mantém softwares e aplicativos, resolvendo problemas com código.',
            areas: 'Programação Web, Desenvolvimento Mobile, Análise de Sistemas, Banco de Dados.',
            icon: 'fas fa-laptop-code',
            traits: ['Lógica', 'Resolução de Problemas', 'Inovação', 'Criatividade']
        },
        'Informática para Internet': {
            description: 'Desenvolve e mantém sites e aplicativos para a web, com foco na interface e lógica.',
            areas: 'Criação de Sites, Front-end, Back-end, E-commerce, Design Digital.',
            icon: 'fas fa-wifi',
            traits: ['Criatividade', 'Inovação', 'Visual', 'Lógica']
        },
        'Logística': {
            description: 'Organiza e gerencia a movimentação e armazenamento de produtos.',
            areas: 'Gestão de Estoques, Distribuição e Transporte, Cadeia de Suprimentos.',
            icon: 'fas fa-truck',
            traits: ['Organização', 'Planejamento', 'Eficiência', 'Detalhes']
        },
        'Marketing': {
            description: 'Cria estratégias para divulgar produtos, serviços e marcas de forma eficaz.',
            areas: 'Marketing Digital, Pesquisa de Mercado, Análise de Dados, Branding.',
            icon: 'fas fa-bullhorn',
            traits: ['Comunicação', 'Estratégia', 'Criatividade', 'Análise']
        },
        'Recursos Humanos': {
            description: 'Cuida da gestão de pessoas em uma empresa, buscando o bem-estar dos colaboradores.',
            areas: 'Recrutamento e Seleção, Treinamento, Benefícios, Relações Trabalhistas.',
            icon: 'fas fa-users',
            traits: ['Empatia', 'Comunicação', 'Liderança', 'Organização']
        },
        'Segurança do Trabalho': {
            description: 'Atua na prevenção de acidentes e doenças ocupacionais em ambientes de trabalho.',
            areas: 'Prevenção de Acidentes, Normas de Segurança, Análise de Riscos, Ergonomia.',
            icon: 'fas fa-hard-hat',
            traits: ['Detalhes', 'Prevenção', 'Responsabilidade', 'Lógica']
        },
        'Serviços Jurídicos': {
            description: 'Presta apoio técnico a advogados e escritórios de advocacia.',
            areas: 'Documentação Jurídica, Pesquisa de Legislação, Apoio a Processos.',
            icon: 'fas fa-gavel',
            traits: ['Análise', 'Organização', 'Detalhes', 'Pesquisa']
        }
    };

    const questions = [
        {
            type: 'click',
            question: "Em Jujutsu Kaisen, seu foco seria em:",
            options: [
                { text: "Dominar uma Técnica de Barreira perfeita e cheia de regras.", points: { 'Serviços Jurídicos': 3, 'Segurança do Trabalho': 2 } },
                { text: "Aumentar seu poder físico para proteger todos os seus amigos.", points: { 'Cuidados de Idosos': 2, 'Recursos Humanos': 2 } },
                { text: "Aprimorar sua técnica para fazê-la única e complexa.", points: { 'Desenvolvimento de Sistemas': 3, 'Informática para Internet': 2 } },
                { text: "Criar planos de batalha eficientes, aproveitando as fraquezas do inimigo.", points: { 'Administração': 2, 'Logística': 3 } }
            ]
        },
        {
            type: 'click',
            question: "Dentre as opções, qual cor de gato você se identifica mais?",
            options: [
                { text: "Gato laranja: extrovertido, é a bateria do grupo de amigos.", points: { 'Comércio Exterior': 2, 'Marketing': 3 } },
                { text: "Gato preto: focado, ótimo em resolver problemas difíceis.", points: { 'Segurança do Trabalho': 3, 'Logística': 2 } },
                { text: "Gato branco: empatia em primeiro lugar, sempre preza pelo bem-estar do próximo.", points: { 'Recursos Humanos': 3, 'Cuidados de Idosos': 2 } },
                { text: "Gato cinza: calmo, sempre valoriza a organização.", points: { 'Administração': 3, 'Informática para Internet': 2 } }
            ]
        },
        {
            type: 'click',
            question: "Na sua opinião, qual instrumento é o mais importante para a harmonia de uma banda?",
            options: [
                { text: "A Guitarra, que inova com solos chamativos, atraindo o foco e arriscando novas ideias.", points: { 'Desenvolvimento de Sistemas': 3, 'Informática para Internet': 2 } },
                { text: "O Baixo, que dita a base e une todos, garantindo que o grupo tenha um ritmo firme.", points: { 'Cuidados de Idosos': 3, 'Recursos Humanos': 2 } },
                { text: "O Vocal, que carrega a mensagem e a criatividade, unindo o público e a banda através da comunicação..", points: { 'Marketing': 2, 'Comércio Exterior': 3 } },
                { text: "A Bateria, que impõe o ritmo e o tempo, forçando todos a seguirem a ordem e a produtividade.", points: { 'Serviços Jurídicos': 2, 'Administração': 2 } }
            ]
        },
        {
            type: 'slider',
            question: "O Homem-Aranha precisa equilibrar a vida de herói e a de estudante. De 0 a 10, o quanto você se sente capaz de se organizar para cumprir duas grandes tarefas no mesmo dia?",
            min: 0,
            max: 10,
            step: 1,
            points: {
                'Serviços Jurídicos': 3,
                'Segurança do Trabalho': 3,
                'Administração': 2
            }
        },
        {
            type: 'click',
            question: "Qual série melhor representa o ambiente de trabalho perfeito pra você?",
            options: [
                { text: "Friends: Apoio e companherismo sempre.", points: { 'Recursos Humanos': 3, 'Cuidados de Idosos': 2 } },
                { text: "Gossip Girl: Foco em estilo, estratégia e redes sociais.", points: { 'Marketing': 3, 'Comércio Exterior': 2 } },
                { text: "Stranger Things: Solução de problemas difíceis com eficiência.", points: { 'Desenvolvimento de Sistemas': 2, 'Informática para Internet': 3 } },
                { text: "Outer Banks: Liderança, planejamento e caça ao tesouro.", points: { 'Administração': 3, 'Logística': 2 } }
            ]
        },
        {
            type: 'click',
            question: "Em um cenário de The Walking Dead, qual é sua prioridade de sobrevivência?",
            options: [
                { text: "Garantir o suprimento de água e comida e planejar rotas seguras de fuga.", points: { 'Logística': 3, 'Segurança do Trabalho': 3 } },
                { text: "Estabelecer uma hierarquia e negociar a paz com outros grupos.", points: { 'Administração': 2, 'Comércio Exterior': 2 } },
                { text: "Construir um forte à prova de invasão com barreiras.", points: { 'Desenvolvimento de Sistemas': 2, 'Serviços Jurídicos': 2 } },
                { text: "Oferecer apoio emocional e manter o moral do grupo elevado.", points: { 'Cuidados de Idosos': 3, 'Recursos Humanos': 2 } }
            ]
        },
        {
            type: 'sentence-completion',
            question: "Quando algo dá errado no dia-a-dia, minha primeira reação é: ... para ...",
            options: [
                { text: "parar, analisar e entender o erro", points: { 'Desenvolvimento de Sistemas': 3, 'Serviços Jurídicos': 2 } },
                { text: "tentar solucionar o erro de forma criativa", points: { 'Marketing': 3, 'Informática para Internet': 2 } },
                { text: "ignorar o problema para minha seguraça", points: { 'Segurança do Trabalho': 3, 'Logística': 2 } },
                { text: "acalmar a equipe e buscar uma solução justa", points: { 'Recursos Humanos': 3, 'Administração': 2 } }
            ]
        },
        {
            type: 'click',
            question: "Escolha um pokémon:",
            options: [
                { text: "Charmander: explorador e organizado.", points: { 'Administração': 3, 'Comércio Exterior': 2 } },
                { text: "Pikachu: animado e criativo.", points: { 'Informática para Internet': 3, 'Marketing': 2 } },
                { text: "Squirtle: protetor e organizado.", points: { 'Serviços Jurídicos': 3, 'Segurança do Trabalho': 2 } },
                { text: "Bulbassaur: calmo e companheiro,", points: { 'Recursos Humanos': 3, 'Cuidados de Idosos': 2 } }
            ]
        },
        {
            type: 'sort',
            question: "Ao comprar um item na Shopee, ordene os fatores mais importantes para você:",
            options: [
                { text: "O custo-benefício e a análise financeira do preço.", points: { 'Administração': 3, 'Logística': 2 } },
                { text: "O design e a apresentação visual da produto.", points: { 'Informática para Internet': 3, 'Marketing': 2 } },
                { text: "A política de devolução e a garantia do produto.", points: { 'Comércio Exterior': 2, 'Desenvolvimento de Sistemas': 2 } },
                { text: "As avaliações do item.", points: { 'Cuidados de Idosos': 3, 'Recursos Humanos': 2 } }
            ]
        },
        {
            type: 'slider',
            question: "De 0 a 10, o quanto você se considera organizado?",
            min: 0,
            max: 10,
            step: 1,
            points: {
                'Segurança do Trabalho': 3,
                'Serviços Jurídicos': 3,
                'Logística': 2,
                'Desenvolvimento de Sistemas': 2
            }
        },
        {
            type: 'click',
            question: "Você recebe um **presente surpresa**. Sua reação é:",
            options: [
                { text: "Ficção Científica: Seu foco é achar a fonte do problema para reprogramá-la e criar uma nova realidade tecnológica.", points: { 'Informática para Internet': 3, 'Recursos Humanos': 2 } },
                { text: "Suspense: Seu foco é estar sempre um passo à frente com planos secretos de alto risco para atingir o objetivo a qualquer custo", points: { 'Comércio Exterior': 3, 'Administração': 2 } },
                { text: "Filme de Terror: Seu foco é analisar todos os riscos e evitar que o monstro apareça, garantindo a segurança do grupo.", points: { 'Segurança do Trabalho': 3, 'Serviços Jurídicos': 2 } },
                { text: "Comédia Romântica: Seu foco é criar conexões emocionais e garantir que todos terminem felizes e alinhados.", points: { 'Marketing': 3, 'Cuidados de Idosos': 2 } }
            ]
        },
        {
            type: 'click',
            question: "Você acaba de criar um mundo no Minecraft e a noite está chegando. Qual é a sua prioridade para a primeira noite?",
            options: [
                { text: "Construir uma casa básica de madeira, focando na organização e estabilidade para a primeira noite.", points: { 'Logística': 3, 'Administração': 2 } },
                { text: "Sair explorando em busca de um vilarejo ou de uma área com comida, assumindo o risco pela recompensa.", points: { 'Marketing': 2, 'Informática para Internet': 2 } },
                { text: "Cavar um buraco 1x1 e se isolar completamente, usando terra para tampar, sem arriscar nada.", points: { 'Cuidados de Idosos': 3, 'Recursos Humanos': 2 } },
                { text: "Coletar os minérios mais raros e montar uma mesa de trabalho e fornalha, priorizando as ferramentas.", points: { 'Desenvolvimento de Sistemas': 3, 'Serviços Jurídicos': 2 } }
            ]
        },
        {
            type: 'click',
            question: "Você está no trânsito com um engarrafamento inesperado. O que te irrita mais?",
            options: [
                { text: "A falta de organização das faixas e a ineficiência do fluxo de veículos.", points: { 'Administração': 3, 'Logística': 2 } },
                { text: "A falha no app de navegação ou no sistema de monitoramento de tráfego.", points: { 'Desenvolvimento de Sistemas': 3, 'Informática para Internet': 2 } },
                { text: "A comunicação fraca sobre a causa do problema e o que fazer.", points: { 'Marketing': 2, 'Comércio Exterior': 3 } },
                { text: "A falta de empatia dos motoristas que buzinam sem pensar nos outros.", points: { 'Recursos Humanos': 3, 'Cuidados de Idosos': 2 } }
            ]
        },
        {
            type: 'slider',
            question: "De 0 a 10, o quanto você se considera criativo?",
            min: 0,
            max: 10,
            step: 1,
            points: {
                'Marketing': 3,
                'Comércio Exterior': 2,
                'Serviços Jurídicos': 1 // Pontua mais se a pontuação for baixa, indicando que não é facilmente manipulado.
            }
        },
        {
            type: 'click',
            question: "Você precisa convencer alguém a fazer algo. O que você faz?",
            options: [
                { text: "Uma apresentação bonita e cheia de dados informativos.", points: { 'Marketing': 3, 'Informática para Internet': 2 } },
                { text: "Cito argumentos da lei e as consequências de quebrar as regras.", points: { 'Serviços Jurídicos': 3, 'Segurança do Trabalho': 2 } },
                { text: "Faço uma lista de lucros futuros.", points: { 'Comércio Exterior': 3, 'Administração': 2 } },
                { text: "Inicio uma conversa focada nas necessidades e no sentimento da pessoa.", points: { 'Recursos Humanos': 3, 'Cuidados de Idosos': 2 } }
            ]
        }
    ];

    const miniQuizQuestionsData = {
        'Administração': [
            { question: "Em um dia normal, você prefere:", options: ['Seguir um plano rígido', 'Improvisar', 'Ajudar um amigo', 'Aprender um código'], correct: 'Seguir um plano rígido' },
            { question: "Qual é a sua prioridade ao iniciar uma tarefa?", options: ['O custo total', 'O visual', 'O bem-estar do time', 'A lógica interna'], correct: 'O custo total' },
            { question: "Em um grupo, você assume o papel de:", options: ['Criativo', 'Líder de resultados', 'Mediador', 'Observador'], correct: 'Líder de resultados' },
            { question: "Você se sente mais confortável em lidar com:", options: ['Números e metas', 'Emoções', 'Design', 'Regras'], correct: 'Números e metas' },
            { question: "O que te irrita mais no trabalho?", options: ['Falta de liderança', 'Conflito de egos', 'Erros de código', 'Falta de segurança'], correct: 'Falta de liderança' },
            { question: "Você é mais motivado por:", options: ['Otimização de lucro', 'Empatia', 'Inovação visual', 'Ordem clara'], correct: 'Otimização de lucro' }
        ],
        'Comércio Exterior': [
            { question: "Você prefere aprender sobre:", options: ['Lógica de código', 'Cultura de outro país', 'Regras locais', 'Plantas e animais'], correct: 'Cultura de outro país' },
            { question: "Seu ponto forte é:", options: ['Organização', 'Negociação com estranhos', 'Cuidado', 'Análise de dados'], correct: 'Negociação com estranhos' },
            { question: "Qual te atrai mais?", options: ['Tendências globais', 'Logística local', 'Desenho de interfaces', 'Gestão de benefícios'], correct: 'Tendências globais' },
            { question: "Em uma conversa, você se destaca por:", options: ['Sua lógica', 'Sua persuasão', 'Sua paciência', 'Seus gráficos'], correct: 'Sua persuasão' },
            { question: "Qual te empolga mais?", options: ['Criar um app', 'Gerenciar a importação', 'Cuidar de idosos', 'Revisar contratos'], correct: 'Gerenciar a importação' },
            { question: "Você se adapta bem a mudanças:", options: ['Sim, adoro o novo', 'Só se for planejado', 'Não, prefiro rotina', 'Só se for no código'], correct: 'Sim, adoro o novo' }
        ],
        'Cuidados de Idosos': [
            { question: "Seu traço principal é:", options: ['Lógica', 'Empatia', 'Estratégia', 'Visual'], correct: 'Empatia' },
            { question: "Ao ver alguém em dificuldade, sua reação é:", options: ['Buscar a regra', 'Oferecer conforto e ajuda', 'Analisar o risco', 'Desenvolver uma solução'], correct: 'Oferecer conforto e ajuda' },
            { question: "Você é paciente com repetição e lentidão?", options: ['Sim, sou muito paciente', 'Não, me irrito fácil', 'Só se for no código', 'Depende do lucro'], correct: 'Sim, sou muito paciente' },
            { question: "Você se sente mais útil ao:", options: ['Resolver um problema técnico', 'Promover o bem-estar de alguém', 'Organizar um estoque', 'Criar uma campanha'], correct: 'Promover o bem-estar de alguém' },
            { question: "Seu estilo de comunicação é:", options: ['Direto e técnico', 'Calmo e atencioso', 'Persuasivo', 'Detalhado nas regras'], correct: 'Calmo e atencioso' },
            { question: "Qual o valor central para você?", options: ['Lucro', 'Segurança', 'Cuidado e dedicação', 'Eficiência'], correct: 'Cuidado e dedicação' }
        ],
        'Desenvolvimento de Sistemas': [
            { question: "Diante de um *bug* em um sistema, você:", options: ['Pede ajuda', 'Desmembra em lógica e resolve', 'Cria um meme sobre ele', 'Revisa o contrato'], correct: 'Desmembra em lógica e resolve' },
            { question: "Você prefere trabalhar com:", options: ['Ideias abstratas e código', 'Pessoas e gestão', 'Regras e leis', 'Movimentação de carga'], correct: 'Ideias abstratas e código' },
            { question: "Seu maior interesse é:", options: ['Comportamento humano', 'Lógica e algoritmos', 'Tendências de moda', 'Documentos jurídicos'], correct: 'Lógica e algoritmos' },
            { question: "O que te atrai em um *gadget*?", options: ['O design', 'A tecnologia interna', 'O preço', 'A embalagem'], correct: 'A tecnologia interna' },
            { question: "Você se considera mais:", options: ['Lógico', 'Emocional', 'Criativo', 'Negociador'], correct: 'Lógico' },
            { question: "Você se sente mais confortável em resolver problemas:", options: ['Com regras claras', 'Com empatia', 'Com lógica fria', 'Com marketing'], correct: 'Com lógica fria' }
        ],
        'Informática para Internet': [
            { question: "No seu projeto, o mais importante é:", options: ['A velocidade do código', 'O design e a UX/UI', 'O custo/benefício', 'A lei de dados'], correct: 'O design e a UX/UI' },
            { question: "Você se considera:", options: ['Um bom mediador', 'Um líder de projetos', 'Um esteta digital', 'Um auditor'], correct: 'Um esteta digital' },
            { question: "O que você gosta de resolver?", options: ['Conflitos de equipe', 'Problemas financeiros', 'Interfaces feias e confusas', 'Falhas de segurança'], correct: 'Interfaces feias e confusas' },
            { question: "Seu foco ao criar um site é:", options: ['Ser o mais seguro', 'Ser o mais bonito e fácil de usar', 'Ser o mais rentável', 'Ter o código mais complexo'], correct: 'Ser o mais bonito e fácil de usar' },
            { question: "Você prefere gastar tempo com:", options: ['Otimização de código', 'Layout e cores', 'Negociação de preços', 'Revisão de estoque'], correct: 'Layout e cores' },
            { question: "Você é fã de:", options: ['Estratégia de negócios', 'Tendências de design', 'Regulamentos', 'Matemática pura'], correct: 'Tendências de design' }
        ],
        'Logística': [
            { question: "O que te traz satisfação?", options: ['Código novo', 'Pessoa feliz', 'Processo eficiente', 'Campanha viral'], correct: 'Processo eficiente' },
            { question: "Em um armário bagunçado, você:", options: ['Ignora', 'Cria um sistema para organizar', 'Pede para arrumarem', 'Tira foto para meme'], correct: 'Cria um sistema para organizar' },
            { question: "Sua maior qualidade é:", options: ['Persuasão', 'Planejamento e detalhe', 'Empatia', 'Inovação'], correct: 'Planejamento e detalhe' },
            { question: "Em um evento, você foca em:", options: ['A segurança', 'O fluxo e a ordem cronológica', 'O marketing', 'O bem-estar do staff'], correct: 'O fluxo e a ordem cronológica' },
            { question: "Você se incomoda com desperdício?", options: ['Muito, prezo a eficiência', 'Um pouco, mas não é o foco', 'Não me importo', 'Só se for no dinheiro'], correct: 'Muito, prezo a eficiência' },
            { question: "Qual o valor central para você?", options: ['Justiça', 'Fluxo e rastreamento', 'Lógica', 'Criação'], correct: 'Fluxo e rastreamento' }
        ],
        'Marketing': [
            { question: "Qual faria por diversão?", options: ['Codificar', 'Analisar comportamento de rede', 'Estudar lei', 'Organizar estoque'], correct: 'Analisar comportamento de rede' },
            { question: "Você capta tendências?", options: ['Sim, rapidamente', 'Não, crio as minhas', 'Só as técnicas', 'Não me importo'], correct: 'Sim, rapidamente' },
            { question: "O que te move?", options: ['Solução técnica', 'Comunicar e influenciar', 'Perfeição organizacional', 'Seguir regras'], correct: 'Comunicar e influenciar' },
            { question: "Em uma apresentação, você foca em:", options: ['Precisão dos dados', 'Impacto visual e persuasão', 'Cumprimento do tempo', 'Inclusão'], correct: 'Impacto visual e persuasão' },
            { question: "Você é mais:", options: ['Analista de dados', 'Criador(a) de conteúdo', 'Mediador(a)', 'Fiscalizador(a)'], correct: 'Criador(a) de conteúdo' },
            { question: "Você se sentiria confortável ao:", options: ['Revisar planilhas', 'Fazer uma *live* de vendas', 'Revisar contratos', 'Desenvolver um app'], correct: 'Fazer uma live de vendas' }
        ],
        'Recursos Humanos': [
            { question: "Sua maior preocupação na equipe é:", options: ['A qualificação técnica', 'A coesão e comunicação do grupo', 'O custo de contratação', 'O prazo de entrega'], correct: 'A coesão e comunicação do grupo' },
            { question: "Você lida bem com conflitos?", options: ['Sim, sou bom mediador', 'Não, evito ao máximo', 'Só com regras claras', 'Uso a lógica para decidir'], correct: 'Sim, sou bom mediador' },
            { question: "Em um grupo, você é quem:", options: ['Organiza a rota', 'Garante a harmonia e o moral', 'Questiona a lógica', 'Busca o lanche'], correct: 'Garante a harmonia e o moral' },
            { question: "O que te fascina?", options: ['Tecnologia', 'Comportamento humano', 'Direito e leis', 'Leis da física'], correct: 'Comportamento humano' },
            { question: "No trabalho, você valoriza:", options: ['Regras rígidas', 'Cultura de respeito e colaboração', 'Oportunidades de lucro', 'Autonomia total'], correct: 'Cultura de respeito e colaboração' },
            { question: "Seu objetivo com *feedback* é:", options: ['Ser honesto', 'Promover o desenvolvimento', 'Apenas cumprir a tarefa', 'Criticar'], correct: 'Promover o desenvolvimento' }
        ],
        'Segurança do Trabalho': [
            { question: "Você segue as regras:", options: ['À risca, pela segurança', 'Sou flexível', 'Só se fizerem sentido', 'Sou criativo, mas respeito o básico'], correct: 'À risca, pela segurança' },
            { question: "Em um lugar novo, você analisa:", options: ['As pessoas', 'Os riscos e emergências', 'O Wi-Fi', 'Onde comer'], correct: 'Os riscos e emergências' },
            { question: "O que é mais importante?", options: ['A emoção e a surpresa', 'A estabilidade e a prevenção', 'A chance de liderar', 'O design visual'], correct: 'A estabilidade e a prevenção' },
            { question: "Em uma emergência, você:", options: ['Entra em pânico', 'Mantém a calma e segue o protocolo', 'Espera alguém agir', 'Tenta negociar'], correct: 'Mantém a calma e segue o protocolo' },
            { question: "Você tem olhar apurado para:", options: ['Tendências', 'Falhas e perigos', 'Banco de dados', 'Humor'], correct: 'Falhas e perigos' },
            { question: "Seu maior medo é:", options: ['Não ser criativo', 'Colocar alguém em risco', 'Não subir de cargo', 'Trabalhar em silêncio'], correct: 'Colocar alguém em risco' }
        ],
        'Serviços Jurídicos': [
            { question: "Ao escrever, você é:", options: ['Rápido e direto', 'Criativo', 'Detalhado e preciso', 'Acolhedor'], correct: 'Detalhado e preciso' },
            { question: "Você prefere ganhar um debate por:", options: ['Carisma', 'Regras e argumentos claros', 'Lógica técnica', 'Evitar debater'], correct: 'Regras e argumentos claros' },
            { question: "Você se interessa por:", options: ['Grandes líderes', 'Leis e normas sociais', 'Sistemas de transporte', 'Design de interfaces'], correct: 'Leis e normas sociais' },
            { question: "Sua habilidade de leitura é:", options: ['Rápida e superficial', 'Detalhada e busca contradições', 'Visual e focada em design', 'Só leio código'], correct: 'Detalhada e busca contradições' },
            { question: "Sua motivação é:", options: ['Ajudar emocionalmente', 'Garantir processos justos e corretos', 'Construir redes', 'Desenvolver produtos'], correct: 'Garantir processos justos e corretos' },
            { question: "Em um time, você é quem:", options: ['Busca as regras e precedentes', 'Organiza o espaço', 'Promove a união', 'Pensa fora da caixa'], correct: 'Busca as regras e precedentes' }
        ]
    };

    // Função para mostrar telas
    function showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.style.display = 'none';
        });
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.style.display = 'flex'; 
        }
    }

    // Função para gerar as perguntas dinamicamente
    function showQuestion() {
        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            
            // Exibir a barra de progresso do quiz principal
            progressBar.style.display = 'block';

            // Adiciona a classe de cor ao card da pergunta
            const questionCard = document.getElementById('question-card');
            questionCard.className = `main-container question-card ${questionColors[currentQuestionIndex % questionColors.length]}`;

            questionText.textContent = currentQuestion.question;
            dynamicContent.innerHTML = '';

            // Lógica para os diferentes tipos de pergunta (código omitido por ser longo e inalterado)

            if (currentQuestion.type === 'click') {
                const optionsGrid = document.createElement('div');
                optionsGrid.className = 'options-grid';
                currentQuestion.options.forEach(option => {
                    const button = document.createElement('button');
                    button.textContent = option.text;
                    button.className = 'option-btn';
                    button.addEventListener('click', () => handleAnswer(option.points));
                    optionsGrid.appendChild(button);
                });
                dynamicContent.appendChild(optionsGrid);
            } else if (currentQuestion.type === 'slider') {
                const container = document.createElement('div');
                container.className = 'slider-container';
                const labelContainer = document.createElement('div');
                labelContainer.className = 'slider-label';
                const minLabel = document.createElement('span');
                minLabel.textContent = currentQuestion.min;
                const maxLabel = document.createElement('span');
                maxLabel.textContent = currentQuestion.max;
                labelContainer.appendChild(minLabel);
                labelContainer.appendChild(maxLabel);

                const slider = document.createElement('input');
                slider.type = 'range';
                slider.className = 'slider';
                slider.min = currentQuestion.min;
                slider.max = currentQuestion.max;
                slider.step = currentQuestion.step;
                slider.value = (currentQuestion.min + currentQuestion.max) / 2;

                const valueDisplay = document.createElement('div');
                valueDisplay.className = 'slider-value';
                valueDisplay.textContent = `Valor: ${slider.value}`;
                slider.oninput = () => {
                    valueDisplay.textContent = `Valor: ${slider.value}`;
                };

                const submitBtn = document.createElement('button');
                submitBtn.textContent = 'Confirmar';
                submitBtn.className = 'submit-btn';
                submitBtn.addEventListener('click', () => {
                    const value = parseInt(slider.value);
                    const points = {};
                    for (const course in currentQuestion.points) {
                        // Lógica de pontuação para o slider que pontua inversamente no Marketing (Q14)
                        if (currentQuestionIndex === 13 && course === 'Serviços Jurídicos') {
                            // Se a pontuação for baixa, ou seja, se o usuário NÃO for influenciado pela propaganda (10 - value), então pontua bem para SJ.
                            points[course] = currentQuestion.points[course] * (10 - value) / 10;
                        } else {
                            points[course] = currentQuestion.points[course] * (value / 10);
                        }
                    }
                    handleAnswer(points);
                });

                container.appendChild(labelContainer);
                container.appendChild(slider);
                container.appendChild(valueDisplay);
                dynamicContent.appendChild(container);
                dynamicContent.appendChild(submitBtn);

            } else if (currentQuestion.type === 'sentence-completion') {
                const container = document.createElement('div');
                const sentence = document.createElement('div');
                sentence.className = 'sentence-container';
                const parts = currentQuestion.question.split('...');
                sentence.innerHTML = `${parts[0]}<span class="droppable-placeholder"></span>${parts[1]}<span class="droppable-placeholder"></span>`;
                container.appendChild(sentence);

                const optionsGrid = document.createElement('div');
                optionsGrid.className = 'options-grid';
                currentQuestion.options.forEach(option => {
                    const optionBtn = document.createElement('button');
                    optionBtn.className = 'option-btn';
                    optionBtn.textContent = option.text;
                    optionBtn.draggable = true;
                    optionBtn.addEventListener('dragstart', (e) => {
                        e.dataTransfer.setData('text/plain', option.text);
                        e.dataTransfer.setData('points', JSON.stringify(option.points));
                        setTimeout(() => optionBtn.classList.add('dragging'), 0);
                    });
                    optionBtn.addEventListener('dragend', () => optionBtn.classList.remove('dragging'));
                    optionsGrid.appendChild(optionBtn);
                });
                container.appendChild(optionsGrid);

                dynamicContent.appendChild(container);

                const placeholders = document.querySelectorAll('.droppable-placeholder');
                placeholders.forEach(placeholder => {
                    placeholder.addEventListener('dragover', (e) => {
                        e.preventDefault();
                        placeholder.classList.add('active');
                    });
                    placeholder.addEventListener('dragleave', () => placeholder.classList.remove('active'));
                    placeholder.addEventListener('drop', (e) => {
                        e.preventDefault();
                        const draggedText = e.dataTransfer.getData('text/plain');
                        const draggedPoints = JSON.parse(e.dataTransfer.getData('points'));
                        placeholder.textContent = draggedText;
                        placeholder.classList.add('filled');
                        placeholder.classList.remove('active');
                        placeholder.dataset.points = JSON.stringify(draggedPoints);

                        // Esconder o botão original
                        const originalButton = Array.from(optionsGrid.querySelectorAll('.option-btn')).find(btn => btn.textContent === draggedText);
                        if (originalButton) {
                            originalButton.style.display = 'none';
                        }
                    });
                });

                const submitBtn = document.createElement('button');
                submitBtn.textContent = 'Confirmar';
                submitBtn.className = 'submit-btn';
                submitBtn.addEventListener('click', () => {
                    const filledPlaceholders = document.querySelectorAll('.droppable-placeholder.filled');
                    if (filledPlaceholders.length === 2) {
                        const points1 = JSON.parse(filledPlaceholders[0].dataset.points);
                        const points2 = JSON.parse(filledPlaceholders[1].dataset.points);
                        const combinedPoints = {};
                        for (const course in points1) {
                            combinedPoints[course] = (combinedPoints[course] || 0) + points1[course];
                        }
                        for (const course in points2) {
                            combinedPoints[course] = (combinedPoints[course] || 0) + points2[course];
                        }
                        handleAnswer(combinedPoints);
                    } else {
                        alert('Por favor, arraste ambas as opções para as lacunas.');
                    }
                });
                dynamicContent.appendChild(submitBtn);
            } else if (currentQuestion.type === 'sort') {
                const sortableList = document.createElement('div');
                sortableList.className = 'sortable-list';
                currentQuestion.options.sort(() => Math.random() - 0.5).forEach((item, index) => {
                    const div = document.createElement('div');
                    div.className = 'sortable-item';
                    div.draggable = true;
                    div.dataset.text = item.text;
                    div.dataset.points = JSON.stringify(item.points);
                    div.innerHTML = `<span class="sortable-number">${index + 1}</span><i class="fas fa-grip-lines"></i> ${item.text}`;
                    sortableList.appendChild(div);
                });
                dynamicContent.appendChild(sortableList);

                let draggedItem = null;

                sortableList.addEventListener('dragstart', (e) => {
                    if (e.target.classList.contains('sortable-item')) {
                        draggedItem = e.target;
                        setTimeout(() => draggedItem.classList.add('dragging'), 0);
                        e.dataTransfer.effectAllowed = 'move';
                    }
                });

                sortableList.addEventListener('dragend', () => {
                    draggedItem.classList.remove('dragging');
                    draggedItem = null;
                });

                sortableList.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    if (e.target.classList.contains('sortable-item') && e.target !== draggedItem) {
                        const rect = e.target.getBoundingClientRect();
                        const middleY = rect.top + rect.height / 2;
                        const isAbove = e.clientY < middleY;
                        if (isAbove) {
                            sortableList.insertBefore(draggedItem, e.target);
                        } else {
                            sortableList.insertBefore(draggedItem, e.target.nextElementSibling);
                        }
                    }
                });

                sortableList.addEventListener('drop', () => {
                    // Atualiza a numeração após o drop
                    Array.from(sortableList.querySelectorAll('.sortable-item')).forEach((item, index) => {
                        item.querySelector('.sortable-number').textContent = index + 1;
                    });
                });

                const submitBtn = document.createElement('button');
                submitBtn.textContent = 'Confirmar';
                submitBtn.className = 'submit-btn';
                submitBtn.addEventListener('click', () => {
                    const sortedItems = Array.from(sortableList.querySelectorAll('.sortable-item'));
                    const points = {};
                    sortedItems.forEach((item, index) => {
                        const itemPoints = JSON.parse(item.dataset.points);
                        for (const course in itemPoints) {
                            // Pontuação baseada na posição (mais pontos para as primeiras posições)
                            const scoreFactor = sortedItems.length - index;
                            points[course] = (points[course] || 0) + itemPoints[course] * scoreFactor;
                        }
                    });
                    handleAnswer(points);
                });
                dynamicContent.appendChild(submitBtn);

            }
        } else {
            showResult();
        }
    }
    
    // Função para tratar as respostas
    function handleAnswer(points) {
        for (const course in points) {
            scores[course] = (scores[course] || 0) + points[course];
        }
        currentQuestionIndex++;
        updateProgressBar();
        showQuestion();
    }

    // Função para exibir a tela de resultado (código omitido por ser longo e inalterado)
    function showResult() {
        showScreen('result-screen');
        progressBar.style.display = 'none';
        const sortedScores = Object.entries(scores).sort(([, a], [, b]) => b - a);
        const bestCourse = sortedScores[0][0];

        document.getElementById('result-course').textContent = bestCourse;
        document.getElementById('course-description').innerHTML = `
            <h4 class="text-xl font-bold mb-2 text-gray-700">${bestCourse}</h4>
            <p>${courses[bestCourse].description}</p>
            <p class="mt-2"><strong>Áreas de Atuação:</strong> ${courses[bestCourse].areas}</p>
            <p class="mt-2"><strong>Características Chave:</strong> ${courses[bestCourse].traits.join(', ')}</p>
        `;
        document.getElementById('course-icon-in-title').className = courses[bestCourse].icon;

        // Criar o gráfico
        if (affinityChartInstance) {
            affinityChartInstance.destroy();
        }

        const labels = sortedScores.map(([course]) => course);
        const data = sortedScores.map(([, score]) => score);

        const ctx = document.getElementById('affinityChart').getContext('2d');
        affinityChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Pontuação de Afinidade',
                    data: data,
                    backgroundColor: [
                        '#00a8d4',
                        '#9cbb17',
                        '#fae41e',
                        '#fc803f',
                        '#ee4035',
                        '#4a5568',
                        '#2c5282',
                        '#718096',
                        '#a0aec0',
                        '#cbd5e0'
                    ],
                    borderColor: [
                        '#00a8d4',
                        '#9cbb17',
                        '#fae41e',
                        '#fc803f',
                        '#ee4035',
                        '#4a5568',
                        '#2c5282',
                        '#718096',
                        '#a0aec0',
                        '#cbd5e0'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function updateProgressBar() {
        const progress = (currentQuestionIndex / questions.length) * 100;
        progressBarFill.style.width = `${progress}%`;
    }

    // Funcionalidades de navegação
    
    // 1. Fluxo Principal: Botão Inicial -> Formulário
    startButton.addEventListener('click', () => {
        showScreen('data-form-screen'); 
    });

    // 2. FLUXO CORRIGIDO: Formulário -> Modal de Atenção/Tutorial
    // Esconde a tela do formulário e mostra o pop-up de atenção.
    if (formSubmitNextButton && dataFormScreen && tutorialModal) { 
        formSubmitNextButton.addEventListener('click', (e) => {
            e.preventDefault(); 
            
            // Oculta APENAS a tela do formulário para que o modal apareça
            dataFormScreen.style.display = 'none'; 
            
            // Mostra o modal de atenção/tutorial
            tutorialModal.style.display = 'flex'; 
        });
    }

    closeModalBtn.addEventListener('click', () => {
        tutorialModal.style.display = 'none';
        // É importante que depois de fechar o modal, o usuário volte a ter uma tela de fundo.
        // Se a start-screen não estiver visível (porque a data-form-screen a substituiu e foi escondida),
        // precisamos garantir que algo seja mostrado para não ficar a tela em branco.
        // Neste caso, se o modal é fechado, o próximo passo lógico é ir para a quiz-screen,
        // mas como o botão de modal já cuida disso, não precisa fazer nada aqui. 
    });
    
    // 3. Fluxo do Modal de Atenção -> Início do Quiz
    if (startQuizFromModalBtn) {
        startQuizFromModalBtn.addEventListener('click', () => {
            tutorialModal.style.display = 'none';
            showScreen('quiz-screen');
            currentQuestionIndex = 0;
            scores = {};
            showQuestion(); 
        });
    }


    restartButton.addEventListener('click', () => {
        showScreen('start-screen');
        currentQuestionIndex = 0;
        scores = {};
    });

    audioButton.addEventListener('click', () => {
        if (backgroundAudio.paused) {
            backgroundAudio.play();
            audioButton.classList.remove('fa-volume-mute');
            audioButton.classList.add('fa-volume-up');
        } else {
            backgroundAudio.pause();
            audioButton.classList.remove('fa-volume-up');
            audioButton.classList.add('fa-volume-mute');
        }
    });

    // Funcionalidades do Mini-Quiz (código omitido por ser longo e inalterado)

    function renderChooseCourseGrid() {
        chooseCourseGrid.innerHTML = '';
        for (const courseName in courses) {
            const courseData = courses[courseName];
            const courseItem = document.createElement('div');
            courseItem.className = 'choose-course-item';
            courseItem.innerHTML = `
                <i class="${courseData.icon} text-4xl mb-2 text-blue-500"></i>
                <p class="font-bold text-gray-700">${courseName}</p>
            `;
            courseItem.addEventListener('click', () => {
                selectedMiniQuizCourse = courseName;
                miniQuizQuestions = miniQuizQuestionsData[courseName];
                currentMiniQuizQuestionIndex = 0;
                miniQuizScore = 0;
                showScreen('mini-quiz-screen');
                showMiniQuizQuestion();
            });
            chooseCourseGrid.appendChild(courseItem);
        }
    }
    

    function showMiniQuizQuestion() {
        if (currentMiniQuizQuestionIndex < miniQuizQuestions.length) {
            const currentQuestion = miniQuizQuestions[currentMiniQuizQuestionIndex];
            miniQuizProgressBar.style.display = 'block';
            updateMiniQuizProgressBar();
            miniQuizQuestionText.textContent = currentQuestion.question;
            miniQuizDynamicContent.innerHTML = '';
            
            const optionsGrid = document.createElement('div');
            optionsGrid.className = 'options-grid';
            currentQuestion.options.forEach(option => {
                const button = document.createElement('button');
                button.textContent = option;
                button.className = 'option-btn';
                button.addEventListener('click', () => handleMiniQuizAnswer(option, currentQuestion.correct));
                optionsGrid.appendChild(button);
            });
            miniQuizDynamicContent.appendChild(optionsGrid);
        } else {
            showMiniQuizResult();
        }
    }
    

    function handleMiniQuizAnswer(selected, correct) {
        if (selected === correct) {
            miniQuizScore++;
        }
        currentMiniQuizQuestionIndex++;
        updateMiniQuizProgressBar();
        showMiniQuizQuestion();
    }

    function updateMiniQuizProgressBar() {
        const progress = (currentMiniQuizQuestionIndex / miniQuizQuestions.length) * 100;
        miniQuizProgressBarFill.style.width = `${progress}%`;
    }

    function showMiniQuizResult() {
        const totalQuestions = miniQuizQuestions.length;
        const percentage = totalQuestions > 0 ? (miniQuizScore / totalQuestions) * 100 : 0;
        miniQuizResultModal.style.display = 'flex';
        miniQuizResultText.textContent = `Sua compatibilidade com o curso de ${selectedMiniQuizCourse} é de:`;
        miniQuizPercentage.textContent = `${percentage.toFixed(0)}%`;

        if (miniQuizChartInstance) {
            miniQuizChartInstance.destroy();
        }

        const ctx = document.getElementById('miniQuizChart').getContext('2d');
        miniQuizChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Compatibilidade', 'Falta'],
                datasets: [{
                    data: [percentage, 100 - percentage],
                    backgroundColor: [
                        '#9cbb17',
                        '#e2e8f0'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                cutout: '80%',
                plugins: {
                    tooltip: {
                        enabled: false
                    },
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // Inicialização do Quiz
    showScreen('start-screen');

}); // Fim do DOMContentLoaded
// O código será executado somente depois que o HTML estiver totalmente carregado
window.addEventListener('DOMContentLoaded', (event) => {

    // VARIÁVEIS DE TELAS E BOTÕES (Incluindo as novas)
    const startScreen = document.getElementById('start-screen');
    const coursesScreen = document.getElementById('courses-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');
    
    const startButton = document.getElementById('start-button');
    const dataFormScreen = document.getElementById('data-form-screen'); // TELA DO FORMULÁRIO
    
    const formSubmitNextButton = document.getElementById('form-submit-next-button'); // BOTÃO DE PRÓXIMA ETAPA
    const formConfirmationCheckbox = document.getElementById('form-confirmation-checkbox'); // NOVO CHECKBOX
    
    const tutorialModal = document.getElementById('tutorial-modal');
    const startQuizFromModalButton = document.getElementById('start-quiz-from-modal');
    
    // ... (MANTENHA SUAS OUTRAS VARIÁVEIS AQUI: showCoursesButton, startMiniQuizButton, restartButton, etc)

    // Variáveis do Quiz (Exemplo, você deve ter estas)
    let currentQuestionIndex = 0;
    let quizData = []; // Mantenha sua estrutura de dados do quiz aqui!
    
    // =================================================================
    // FUNÇÕES DE FLUXO DE TELAS
    // =================================================================

    // Função de utilidade para trocar de tela: essencial para o fluxo
    function showScreen(screenId) {
        // Esconde todas as telas que usam a classe 'screen'
        document.querySelectorAll('.screen').forEach(screen => {
            screen.style.display = 'none';
        });
        // Mostra a tela desejada
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            // Usa 'flex' para as telas que precisam de centralização vertical
            targetScreen.style.display = 'flex'; 
        }
    }

    // Função de utilidade para mostrar/esconder o modal (tutorial)
    if (tutorialModal) {
        document.getElementById('close-modal').addEventListener('click', () => {
            tutorialModal.style.display = 'none';
        });
    }

    // =================================================================
    // LÓGICA DO FORMULÁRIO (NOVA IMPLEMENTAÇÃO)
    // =================================================================

    // Inicialização: Garante que o botão esteja desabilitado e com aparência correta
    function disableFormButton() {
        if (formSubmitNextButton) {
            formSubmitNextButton.disabled = true;
            formSubmitNextButton.classList.add('opacity-50', 'cursor-not-allowed');
            formSubmitNextButton.classList.remove('hover:bg-green-600');
        }
    }
    
    // Lógica de Inicialização no carregamento
    disableFormButton();


    // LÓGICA DE HABILITAÇÃO DO BOTÃO PELO CHECKBOX
    if (formConfirmationCheckbox && formSubmitNextButton) {
        formConfirmationCheckbox.addEventListener('change', () => {
            if (formConfirmationCheckbox.checked) {
                formSubmitNextButton.disabled = false;
                formSubmitNextButton.classList.remove('opacity-50', 'cursor-not-allowed');
                formSubmitNextButton.classList.add('hover:bg-green-600'); // Devolve o efeito hover
            } else {
                disableFormButton(); // Desabilita
            }
        });
    }


    // 1. Fluxo Principal: Botão Inicial -> Formulário
    if (startButton) {
        startButton.addEventListener('click', () => {
            // PASSO 1: O usuário clica em "Descubra seu curso"
            showScreen('data-form-screen'); // Mostra a tela do Google Form
            
            // **RESETA O ESTADO AO ENTRAR NA TELA**
            disableFormButton();
            if (formConfirmationCheckbox) {
                formConfirmationCheckbox.checked = false;
            }
        });
    }

    // 2. Fluxo do Formulário -> Modal de Atenção
    if (formSubmitNextButton) {
        formSubmitNextButton.addEventListener('click', () => {
            // Esta verificação garante que só avança se o checkbox estiver marcado
            if (formConfirmationCheckbox && formConfirmationCheckbox.checked) {
                // PASSO 2: O usuário clica em "Avançar para o Quiz"
                showScreen('start-screen'); // Esconde o formulário, volta à tela inicial no fundo.
                // PASSO 3: O pop-up de atenção aparece
                tutorialModal.style.display = 'flex'; // Mostra o modal de atenção/tutorial
            }
        });
    }

    // 3. Fluxo do Modal de Atenção -> Quiz
    if (startQuizFromModalButton) {
        startQuizFromModalButton.addEventListener('click', () => {
            // Fecha o modal
            tutorialModal.style.display = 'none';
            // Inicia o Quiz
            showScreen('quiz-screen'); 
            // 🚨 ADICIONE A CHAMADA PARA INICIAR SEU QUIZ AQUI!
            // Exemplo: loadQuiz(currentQuestionIndex); 
        });
    }
    
    // =================================================================
    // FIM DA LÓGICA DE FLUXO E INÍCIO DE SUAS FUNÇÕES DE QUIZ, ETC.
    // =================================================================

    // ... (MANTENHA SUAS OUTRAS FUNÇÕES AQUI: loadQuiz, handleAnswer, mini-games, etc)

    // Inicialização do fluxo (pode ser necessário manter esta linha)
    showScreen('start-screen');

}); // Fim do DOMContentLoaded