const startScreen = document.getElementById('start-screen');
    const coursesScreen = document.getElementById('courses-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');
    const startButton = document.getElementById('start-button');
    const showCoursesButton = document.getElementById('show-courses-button');
    const startMiniQuizButton = document.getElementById('start-mini-quiz-button');
    const backButtonIconCourses = document.getElementById('back-button-icon-courses');
    const backButtonIconChoose = document.getElementById('back-button-icon-choose');
    const backButtonIconMiniQuiz = document.getElementById('back-button-icon-mini-quiz');
    const backButtonIconMemory = document.getElementById('back-button-icon-memory');
    const backButtonIconJokenpo = document.getElementById('back-button-icon-jokenpo');
    const backButtonIconTictactoe = document.getElementById('back-button-icon-tictactoe');
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

    // Elementos dos Mini-jogos
    const memoryGameScreen = document.getElementById('memory-game-screen');
    const memoryGameGrid = document.getElementById('memory-game-grid');

    const rockPaperScissorsScreen = document.getElementById('rock-paper-scissors-screen');
    const jokenpoResult = document.getElementById('jokenpo-result');
    const jokenpoScore = document.getElementById('jokenpo-score');
    const jokenpoButtons = document.querySelectorAll('.jokenpo-btn');

    const tictactoeScreen = document.getElementById('tictactoe-screen');
    const tictactoeGrid = document.getElementById('tictactoe-grid');
    const tictactoeStatus = document.getElementById('tictactoe-status');
    const tictactoeRestartBtn = document.getElementById('tictactoe-restart');

    let affinityChartInstance = null;
    let miniQuizChartInstance = null;

    let currentQuestionIndex = 0;
    let scores = {};
    let miniQuizQuestions = [];
    let currentMiniQuizQuestionIndex = 0;
    let miniQuizScore = 0;
    let selectedMiniQuizCourse = '';

    // Variáveis dos Mini-jogos
    // Memória
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let matchedPairsCount = 0;
    const totalPairs = 8;
    const memoryGameIcons = ['<i class="fas fa-code"></i>', '<i class="fas fa-brain"></i>', '<i class="fas fa-users"></i>', '<i class="fas fa-chart-line"></i>', '<i class="fas fa-laptop-code"></i>', '<i class="fas fa-bullhorn"></i>', '<i class="fas fa-truck"></i>', '<i class="fas fa-hard-hat"></i>'];

    // Jokenpô
    let jokenpoWins = 0;
    const jokenpoTargetWins = 1;

    // Jogo da Velha
    let tictactoeBoard = ['', '', '', '', '', '', '', '', ''];
    let tictactoePlayer = 'X';
    let tictactoeGameActive = true;
    const tictactoeWinningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const questionColors = ['question-color-1', 'question-color-2', 'question-color-3', 'question-color-4', 'question-color-5'];

    // Ordem dos minigames antes das perguntas
    const miniGamesSequence = ['memory', 'jokenpo', 'tictactoe'];
    let currentMiniGameIndex = 0;

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
            question: "Num mundo de jogos, qual seria seu papel ideal?",
            options: [
                { text: "O estrategista que monta o plano de ataque para o time.", points: { 'Administração': 2, 'Logística': 1 } },
                { text: "O que ajuda a guild a resolver conflitos e se manter unida.", points: { 'Recursos Humanos': 2, 'Cuidados de Idosos': 1 } },
                { text: "O que encontra falhas no código do jogo para criar novas funcionalidades.", points: { 'Desenvolvimento de Sistemas': 2, 'Informática para Internet': 2 } },
                { text: "O influenciador que faz streams e cria o hype em volta do jogo.", points: { 'Marketing': 1, 'Comércio Exterior': 1 } }
            ]
        },
        {
            type: 'click',
            question: "Se você fosse um animal, qual seria sua principal característica?",
            options: [
                { text: "O instinto de leão, defendendo a equipe e seus objetivos.", points: { 'Administração': 2, 'Recursos Humanos': 2 } },
                { text: "A paciência e o carinho de um gato com quem precisa de ajuda.", points: { 'Recursos Humanos': 2, 'Cuidados de Idosos': 2 } },
                { text: "A criatividade de um camaleão, se adaptando a qualquer ambiente digital.", points: { 'Informática para Internet': 2, 'Marketing': 2 } },
                { text: "A audácia de uma águia, planejando voos longos e observando tudo de longe.", points: { 'Logística': 2, 'Comércio Exterior': 2 } }
            ]
        },
        {
            type: 'click',
            question: "Qual famosa tendência você mais gosta?",
            options: [
                { text: "A ascensão da inteligência artificial (IA) e seu impacto na tecnologia.", points: { 'Desenvolvimento de Sistemas': 2, 'Informática para Internet': 2 } },
                { text: "A expansão do K-Pop globalmente, com suas coreografias e produções complexas.", points: { 'Marketing': 2, 'Comércio Exterior': 1 } },
                { text: "Os desafios de segurança da internet e a proteção de dados.", points: { 'Segurança do Trabalho': 2, 'Serviços Jurídicos': 1 } },
                { text: "A onda de bem-estar e saúde mental que está dominando as redes sociais.", points: { 'Recursos Humanos': 2, 'Cuidados de Idosos': 2 } }
            ]
        },
        {
            type: 'slider',
            question: "Avalie o quanto você se sente à vontade ao ter que liderar uma equipe para completar uma missão?",
            min: 0,
            max: 10,
            step: 1,
            points: {
                'Administração': 2,
                'Recursos Humanos': 1,
                'Comércio Exterior': 1
            }
        },
        {
            type: 'click',
            question: "Você tem que organizar um evento para a comunidade nerd. Qual tarefa você prefere?",
            options: [
                { text: "Gerenciar o cronograma e garantir que tudo ocorra como planejado.", points: { 'Administração': 2, 'Logística': 2 } },
                { text: "Garantir que os participantes se sintam acolhidos e tenham uma boa experiência.", points: { 'Recursos Humanos': 3, 'Cuidados de Idosos': 2 } },
                { text: "Criar o site do evento com um design incrível e uma experiência de usuário perfeita.", points: { 'Informática para Internet': 2, 'Marketing': 2 } },
                { text: "Revisar as regras de segurança e os contratos com os fornecedores.", points: { 'Serviços Jurídicos': 2, 'Segurança do Trabalho': 2 } }
            ]
        },
        {
            type: 'click',
            question: "Qual problema você preferiria resolver?",
            options: [
                { text: "Ajudar seu avô a usar o TikTok ou uma nova plataforma de streaming.", points: { 'Cuidados de Idosos': 3, 'Recursos Humanos': 2 } },
                { text: "Criar um bot que otimiza a organização de um chat no Discord.", points: { 'Logística': 3, 'Desenvolvimento de Sistemas': 2 } },
                { text: "Garantir que as regras de um torneio de e-sports sejam justas para todos.", points: { 'Segurança do Trabalho': 3, 'Administração': 1 } },
                { text: "Analisar as métricas de um canal no YouTube para entender o que viralizou.", points: { 'Marketing': 2, 'Comércio Exterior': 2 } }
            ]
        },
        {
            type: 'sentence-completion',
            question: "Num universo de animes, eu escolheria um superpoder de ... para ...",
            options: [
                { text: "hacker que invade sistemas", points: { 'Desenvolvimento de Sistemas': 3, 'Informática para Internet': 3 } },
                { text: "liderança e comunicação", points: { 'Comércio Exterior': 3, 'Recursos Humanos': 3 } },
                { text: "segurança e proteção", points: { 'Segurança do Trabalho': 3, 'Serviços Jurídicos': 2 } },
                { text: "marketing e criatividade", points: { 'Marketing': 3, 'Comércio Exterior': 2 } }
            ]
        },
        {
            type: 'click',
            question: "Você tem um tempo livre para uma nova atividade. O que você faria?",
            options: [
                { text: "Criaria um canal no YouTube ou TikTok para ensinar algo ou falar sobre um tema que amo.", points: { 'Marketing': 3, 'Comércio Exterior': 2, 'Informática para Internet': 2 } },
                { text: "Aprenderia uma nova língua ou sobre a cultura de um novo país.", points: { 'Comércio Exterior': 3, 'Marketing': 1 } },
                { text: "Criaria um novo projeto, seja um aplicativo ou um site, para resolver um problema cotidiano.", points: { 'Desenvolvimento de Sistemas': 3, 'Informática para Internet': 3 } },
                { text: "Faria um curso rápido sobre primeiros socorros para ajudar em emergências.", points: { 'Segurança do Trabalho': 3, 'Cuidados de Idosos': 2 } }
            ]
        },
        {
            type: 'sort',
            question: "Organize as tarefas a seguir em ordem de prioridade, da mais importante para a menos importante, para a gestão de uma festa.",
            options: [
                { text: "Garantir a segurança dos convidados", points: { 'Segurança do Trabalho': 3, 'Administração': 2 } },
                { text: "Distribuir as comidas e bebidas no horário certo", points: { 'Logística': 3, 'Administração': 2 } },
                { text: "Fazer a lista de convidados e gerenciar as confirmações", points: { 'Recursos Humanos': 2, 'Organização': 3 } },
                { text: "Divulgar a festa nas redes sociais para atrair mais pessoas", points: { 'Marketing': 3, 'Comunicação': 2 } }
            ]
        },
        {
            type: 'slider',
            question: "Em uma escala de 0 a 10, o quanto você gosta de resolver quebra-cabeças e problemas complexos?",
            min: 0,
            max: 10,
            step: 1,
            points: {
                'Desenvolvimento de Sistemas': 3,
                'Informática para Internet': 3,
                'Logística': 2,
                'Segurança do Trabalho': 2
            }
        },
        {
            type: 'click',
            question: "Num RPG, qual seria a sua classe de personagem?",
            options: [
                { text: "O Guerreiro, que lidera o grupo e protege a todos.", points: { 'Administração': 2, 'Recursos Humanos': 2, 'Segurança do Trabalho': 2 } },
                { text: "O Mago, que cria soluções inovadoras com magia e conhecimento.", points: { 'Desenvolvimento de Sistemas': 2, 'Informática para Internet': 2 } },
                { text: "O Bardo, que usa a comunicação para persuadir e encantar.", points: { 'Marketing': 2, 'Comércio Exterior': 2 } },
                { text: "O Clérigo, que cura e apoia seus aliados, garantindo que ninguém seja deixado para trás.", points: { 'Cuidados de Idosos': 3, 'Recursos Humanos': 3 } }
            ]
        },
        {
            type: 'click',
            question: "Se você fosse um personagem da série 'The Office', qual seria?",
            options: [
                { text: "Michael Scott, o líder carismático, mesmo que um pouco caótico, que tenta manter a moral da equipe alta.", points: { 'Administração': 2, 'Recursos Humanos': 2 } },
                { text: "Dwight Schrute, o obcecado por regras e segurança que se certifica de que todos seguem os protocolos.", points: { 'Segurança do Trabalho': 3, 'Logística': 2 } },
                { text: "Jim Halpert, o criativo que sempre encontra uma forma divertida de ver as coisas e interage bem com todos.", points: { 'Marketing': 2, 'Recursos Humanos': 2 } },
                { text: "Pam Beesly, a mediadora que ajuda a resolver conflitos e organizar o escritório.", points: { 'Recursos Humanos': 3, 'Cuidados de Idosos': 2 } }
            ]
        },
        {
            type: 'click',
            question: "Qual dessas atividades ao ar livre você prefere?",
            options: [
                { text: "Organizar uma trilha, planejando a rota, os suprimentos e os horários.", points: { 'Logística': 3, 'Administração': 2 } },
                { text: "Montar um acampamento, garantindo que tudo está seguro e montado corretamente.", points: { 'Segurança do Trabalho': 3, 'Logística': 2 } },
                { text: "Participar de um projeto de conservação da natureza, ajudando a cuidar do ambiente.", points: { 'Cuidados de Idosos': 2, 'Responsabilidade Social': 2 } },
                { text: "Fazer um tour gastronômico, descobrindo novos sabores e culturas.", points: { 'Comércio Exterior': 2, 'Marketing': 1 } }
            ]
        },
        {
            type: 'slider',
            question: "Numa escala de 0 a 10, o quanto você valoriza a segurança e o bem-estar dos outros?",
            min: 0,
            max: 10,
            step: 1,
            points: {
                'Cuidados de Idosos': 3,
                'Segurança do Trabalho': 3,
                'Recursos Humanos': 2
            }
        },
        {
            type: 'click',
            question: "Você encontra um mapa do tesouro. Qual seria sua primeira ação?",
            options: [
                { text: "Analisar o mapa para traçar a rota mais segura e eficiente.", points: { 'Logística': 3, 'Segurança do Trabalho': 2 } },
                { text: "Estudar os símbolos e a linguagem do mapa para entender sua história.", points: { 'Serviços Jurídicos': 2, 'Análise': 3 } },
                { text: "Formar uma equipe, delegando tarefas para cada um de acordo com suas habilidades.", points: { 'Administração': 3, 'Recursos Humanos': 2 } },
                { text: "Criar uma narrativa épica e divulgar a aventura nas redes sociais para atrair seguidores.", points: { 'Marketing': 3, 'Comércio Exterior': 2 } }
            ]
        }
    ];

    const miniQuizQuestionsData = {
        'Administração': [
            { question: "Em um projeto, você se sente mais à vontade ao:", options: ['Executar as tarefas delegadas', 'Definir as metas e distribuir as tarefas', 'Resolver problemas técnicos do produto', 'Cuidar do bem-estar da equipe'], correct: 'Definir as metas e distribuir as tarefas' },
            { question: "Qual palavra melhor descreve seu estilo de comunicação no trabalho?", options: ['Criativo', 'Detalhado', 'Estratégico', 'Empático'], correct: 'Estratégico' },
            { question: "Quando uma decisão difícil precisa ser tomada, você tende a:", options: ['Seguir a maioria', 'Analisar dados e riscos antes de tudo', 'Verificar as regras e a lei', 'Pedir a opinião de todos'], correct: 'Analisar dados e riscos antes de tudo' },
            { question: "Você se descreve mais como um(a):", options: ['Pessoa que prioriza o bem-estar', 'Líder com foco em resultados', 'Mente lógica e técnica', 'Comunicador natural'], correct: 'Líder com foco em resultados' },
            { question: "Qual a sua reação a um processo ineficiente?", options: ['Busco a solução técnica para automatizá-lo', 'Tento otimizá-lo e torná-lo mais rentável', 'Crio um manual de segurança para evitar riscos', 'Aceito e sigo o fluxo'], correct: 'Tento otimizá-lo e torná-lo mais rentável' },
            { question: "Seu principal foco ao organizar uma viagem é:", options: ['Garantir que todos se divirtam', 'Calcular o orçamento e gerenciar o tempo', 'Fazer as malas rapidamente', 'Criar posts sobre o destino'], correct: 'Calcular o orçamento e gerenciar o tempo' }
        ],
        'Comércio Exterior': [
            { question: "Em uma conversa, você se destaca por sua habilidade de:", options: ['Analisar detalhes jurídicos', 'Manter a calma em crises', 'Negociar e convencer as pessoas', 'Desenhar gráficos bonitos'], correct: 'Negociar e convencer as pessoas' },
            { question: "Você prefere um trabalho que envolve contato com:", options: ['Sistemas de computador e código', 'Pessoas de diferentes culturas', 'Documentos e regras de segurança', 'Apenas pessoas da minha cidade'], correct: 'Pessoas de diferentes culturas' },
            { question: "Qual destes cenários te atrai mais?", options: ['Desenvolver um novo app', 'Gerenciar a logística de um festival de música', 'Acompanhar as notícias globais de economia', 'Organizar um evento local'], correct: 'Acompanhar as notícias globais de economia' },
            { question: "Ao aprender sobre uma nova cultura, sua atitude é:", options: ['Buscar as regras e leis dessa cultura', 'Aprender a língua para me comunicar melhor', 'Comparar com minha cultura para criticar', 'Ignorar, pois não é relevante'], correct: 'Aprender a língua para me comunicar melhor' },
            { question: "Seu ponto forte em um debate é:", options: ['Conhecimento técnico em TI', 'Liderança e carisma', 'Visão global e adaptação', 'Atenção ao bem-estar dos participantes'], correct: 'Visão global e adaptação' },
            { question: "Você é mais motivado por:", options: ['Aprovação social', 'Estar sempre aprendendo e crescendo', 'Estabilidade e rotina', 'Compreender o mundo em uma escala micro'], correct: 'Estar sempre aprendendo e crescendo' }
        ],
        'Cuidados de Idosos': [
            { question: "Qual traço de personalidade você considera mais importante em si?", options: ['Lógica e raciocínio rápido', 'Criatividade e inovação', 'Empatia e paciência', 'Foco em resultados e lucro'], correct: 'Empatia e paciência' },
            { question: "Ao ver alguém em dificuldade, sua primeira reação é:", options: ['Analisar a causa do problema', 'Oferecer ajuda prática e emocional', 'Buscar uma solução tecnológica', 'Verificar se há risco de segurança'], correct: 'Oferecer ajuda prática e emocional' },
            { question: "Qual tipo de atividade social você prefere?", options: ['Organizar o cronograma de um evento', 'Um bate-papo calmo e atencioso com uma pessoa', 'Apresentar uma ideia para uma grande plateia', 'Competir em um jogo de estratégia'], correct: 'Um bate-papo calmo e atencioso com uma pessoa' },
            { question: "Você se irrita facilmente com a repetição e lentidão?", options: ['Sim, prefiro tudo rápido e eficiente', 'Não, sou paciente e compreensivo', 'Só se eu tiver um prazo apertado', 'Depende do nível de ineficiência'], correct: 'Não, sou paciente e compreensivo' },
            { question: "Seu estilo de aprendizado é mais focado em:", options: ['Teoria e regras', 'Prática e cuidado com os outros', 'Estratégia e liderança', 'Tecnologia e inovação'], correct: 'Prática e cuidado com os outros' },
            { question: "Você valoriza mais:", options: ['O crescimento financeiro', 'O impacto positivo na vida de uma pessoa', 'A criação de algo novo', 'A ordem e o protocolo'], correct: 'O impacto positivo na vida de uma pessoa' }
        ],
        'Desenvolvimento de Sistemas': [
            { question: "Qual a sua reação diante de um problema complexo?", options: ['Delegar para a equipe', 'Desmembrar em partes menores e buscar a lógica', 'Tentar vender o problema como oportunidade', 'Ignorar e focar em algo mais fácil'], correct: 'Desmembrar em partes menores e buscar a lógica' },
            { question: "Você prefere trabalhar com:", options: ['Ideias abstratas e códigos', 'Pessoas e negociações', 'Regras e segurança', 'Logística de entrega de produtos'], correct: 'Ideias abstratas e códigos' },
            { question: "Em um grupo de estudos, seu papel é tipicamente:", options: ['O organizador das reuniões', 'O que sempre questiona a lógica dos conceitos', 'O que anima o grupo', 'O que busca o lanche para todos'], correct: 'O que sempre questiona a lógica dos conceitos' },
            { question: "Você se considera uma pessoa:", options: ['Mais lógica do que emocional', 'Mais emocional do que lógica', 'Igualmente lógica e emocional', 'Nem um nem outro'], correct: 'Mais lógica do que emocional' },
            { question: "O que te atrai mais em um novo gadget?", options: ['O design e a cor', 'O preço e o custo-benefício', 'A funcionalidade e a tecnologia interna', 'Como ele pode ser usado em marketing'], correct: 'A funcionalidade e a tecnologia interna' },
            { question: "Qual a sua forma favorita de passar o tempo livre?", options: ['Cuidando de amigos e familiares', 'Lendo sobre a história de outros países', 'Criando um projeto pessoal com código', 'Planejando uma festa'], correct: 'Criando um projeto pessoal com código' }
        ],
        'Informática para Internet': [
            { question: "Em um projeto de design, o que mais importa para você?", options: ['A velocidade do servidor', 'A experiência de usuário (UX) e o visual', 'O contrato legal com o cliente', 'O custo final do projeto'], correct: 'A experiência de usuário (UX) e o visual' },
            { question: "Você se considera uma pessoa com um forte senso estético?", options: ['Sim, sou muito visual e atento aos detalhes de design', 'Não, foco mais na funcionalidade', 'Apenas em projetos pessoais', 'Depende do que estou desenvolvendo'], correct: 'Sim, sou muito visual e atento aos detalhes de design' },
            { question: "Qual tipo de problema você gosta de resolver?", options: ['Falhas na cadeia de suprimentos', 'Conflitos entre pessoas', 'Deixar uma interface bonita e intuitiva', 'Problemas financeiros de uma empresa'], correct: 'Deixar uma interface bonita e intuitiva' },
            { question: "Seu objetivo ao criar algo digital é:", options: ['Ser o mais seguro e a prova de falhas', 'Ser o mais fácil e agradável de usar', 'Ser o que mais gera lucros', 'Ser o que mais promove o bem-estar'], correct: 'Ser o mais fácil e agradável de usar' },
            { question: "Você prefere gastar tempo:", options: ['Otimizando o código para performance', 'Melhorando o layout e as cores de uma página', 'Negociando um preço melhor com o fornecedor', 'Revisando as regras de um torneio'], correct: 'Melhorando o layout e as cores de uma página' },
            { question: "Você é fã de:", options: ['Estratégia pura e logística', 'Tendências de design e arte digital', 'Leis e regulamentos', 'Finanças e economia'], correct: 'Tendências de design e arte digital' }
        ],
        'Logística': [
            { question: "O que te traz mais satisfação?", options: ['Ver um código funcionando perfeitamente', 'Fazer uma pessoa feliz', 'Ver um processo fluir de forma eficiente e sem atrasos', 'Ter uma ideia criativa validada'], correct: 'Ver um processo fluir de forma eficiente e sem atrasos' },
            { question: "Em um armário desorganizado, sua primeira atitude é:", options: ['Fechar a porta e ignorar', 'Tirar tudo e criar um sistema para organizar', 'Pedir para alguém fazer', 'Tirar uma foto para postar'], correct: 'Tirar tudo e criar um sistema para organizar' },
            { question: "Qual a sua maior qualidade?", options: ['Persuasão', 'Atenção aos detalhes e planejamento', 'Empatia', 'Inovação tecnológica'], correct: 'Atenção aos detalhes e planejamento' },
            { question: "Qual o seu foco ao planejar um grande evento?", options: ['Garantir a segurança dos participantes', 'A ordem cronológica e a movimentação de itens', 'O marketing e a divulgação', 'A gestão dos voluntários'], correct: 'A ordem cronológica e a movimentação de itens' },
            { question: "Você se incomoda com desperdício de tempo ou recursos?", options: ['Muito, sempre busco a máxima eficiência', 'Um pouco, mas não é minha prioridade', 'Não, o que importa é o resultado final', 'Sim, por questões ambientais'], correct: 'Muito, sempre busco a máxima eficiência' },
            { question: "O que você mais valoriza em uma ferramenta digital?", options: ['A interface gráfica', 'A capacidade de rastrear e mapear informações', 'A comunidade de usuários', 'A novidade do conceito'], correct: 'A capacidade de rastrear e mapear informações' }
        ],
        'Marketing': [
            { question: "Qual dessas atividades você faria por diversão?", options: ['Criar um novo algoritmo', 'Analisar o comportamento das pessoas nas redes', 'Estudar leis de proteção de dados', 'Organizar um estoque'], correct: 'Analisar o comportamento das pessoas nas redes' },
            { question: "Você consegue identificar rapidamente o que está 'na moda' ou viralizando?", options: ['Sim, estou sempre ligado nas tendências', 'Não, eu crio as minhas próprias tendências', 'Não, prefiro o que é atemporal', 'Só me importo com tendências técnicas'], correct: 'Sim, estou sempre ligado nas tendências' },
            { question: "O que te motiva a criar algo?", options: ['A possibilidade de resolver um problema técnico', 'A chance de influenciar e comunicar uma ideia', 'A busca pela perfeição organizacional', 'A necessidade de seguir regras'], correct: 'A chance de influenciar e comunicar uma ideia' },
            { question: "Em uma apresentação, você foca em:", options: ['A precisão dos dados e fatos', 'O impacto visual e a persuasão da mensagem', 'O cumprimento do tempo estipulado', 'A inclusão de todos na discussão'], correct: 'O impacto visual e a persuasão da mensagem' },
            { question: "Você é mais um(a):", options: ['Analista de dados', 'Criador(a) de conteúdo envolvente', 'Mediador(a) de conflitos', 'Fiscalizador(a) de normas'], correct: 'Criador(a) de conteúdo envolvente' },
            { question: "Você se sentiria confortável ao:", options: ['Passar o dia em planilhas de estoque', 'Fazer uma live para promover um produto', 'Revisar contratos complexos', 'Desenvolver um aplicativo do zero'], correct: 'Fazer uma live para promover um produto' }
        ],
        'Recursos Humanos': [
            { question: "Qual a sua maior preocupação ao formar uma equipe?", options: ['A qualificação técnica individual', 'A capacidade de comunicação e trabalho em grupo', 'O custo de contratação', 'O tempo de entrega do projeto'], correct: 'A capacidade de comunicação e trabalho em grupo' },
            { question: "Você lida bem com conflitos interpessoais?", options: ['Sim, sou um bom mediador e ouvinte', 'Não, prefiro que os conflitos se resolvam sozinhos', 'Lido, mas só se tiver regras claras', 'Lido com a lógica para provar quem está certo'], correct: 'Sim, sou um bom mediador e ouvinte' },
            { question: "Em uma festa, você é a pessoa que:", options: ['Fica no canto observando', 'Garante que todos estejam se divertindo e interage', 'Planeja a rota de volta para casa', 'Fica analisando a música e a acústica'], correct: 'Garante que todos estejam se divertindo e interage' },
            { question: "O que você acha mais fascinante?", options: ['Como a tecnologia se desenvolve', 'O comportamento humano e suas motivações', 'A precisão das regras do direito', 'As leis da física'], correct: 'O comportamento humano e suas motivações' },
            { question: "Você valoriza mais em um ambiente de trabalho:", options: ['Regras rígidas e conformidade', 'Oportunidades de crescimento individual', 'Uma cultura de colaboração e respeito', 'Salários altos e bônus'], correct: 'Uma cultura de colaboração e respeito' },
            { question: "Seu principal objetivo ao dar feedback é:", options: ['Ser o mais honesto, mesmo que doloroso', 'Promover o desenvolvimento e a melhoria da pessoa', 'Apenas cumprir a tarefa', 'Criticar a performance de forma geral'], correct: 'Promover o desenvolvimento e a melhoria da pessoa' }
        ],
        'Segurança do Trabalho': [
            { question: "Você é uma pessoa que segue as regras à risca?", options: ['Sim, a segurança e a ordem vêm em primeiro lugar', 'Não, prefiro ser flexível', 'Só sigo se as regras fizerem sentido para mim', 'Sou criativo, mas respeito o básico'], correct: 'Sim, a segurança e a ordem vêm em primeiro lugar' },
            { question: "Qual a sua prioridade em um ambiente novo?", options: ['Conhecer as pessoas e fazer amigos', 'Analisar os riscos e os pontos de emergência', 'Verificar a conexão Wi-Fi', 'Encontrar o melhor lugar para comer'], correct: 'Analisar os riscos e os pontos de emergência' },
            { question: "O que é mais importante para você no dia a dia?", options: ['A emoção e a surpresa', 'A estabilidade e a prevenção de problemas', 'A chance de liderar uma grande equipe', 'A oportunidade de criar algo visualmente atraente'], correct: 'A estabilidade e a prevenção de problemas' },
            { question: "Em uma emergência, você:", options: ['Entra em pânico', 'Mantém a calma e segue um protocolo mental', 'Espera que alguém tome a iniciativa', 'Tenta negociar a situação'], correct: 'Mantém a calma e segue um protocolo mental' },
            { question: "Você tem um olhar apurado para:", options: ['O que é tendência nas redes sociais', 'Falhas e perigos que a maioria não percebe', 'A complexidade de um banco de dados', 'O humor de uma pessoa'], correct: 'Falhas e perigos que a maioria não percebe' },
            { question: "Seu maior medo no trabalho é:", options: ['Não ser criativo o suficiente', 'Cometer um erro que coloque alguém em risco', 'Não conseguir subir de cargo', 'Trabalhar em um lugar muito quieto'], correct: 'Cometer um erro que coloque alguém em risco' }
        ],
        'Serviços Jurídicos': [
            { question: "Ao escrever um documento importante, você é extremamente:", options: ['Rápido e direto', 'Criativo e inspirador', 'Detalhado e preciso na linguagem', 'Empático e acolhedor'], correct: 'Detalhado e preciso na linguagem' },
            { question: "Você prefere:", options: ['Ganhar um debate pelo carisma', 'Ganhar um debate pela clareza das regras e argumentos', 'Ganhar um debate pela lógica técnica', 'Evitar debates'], correct: 'Ganhar um debate pela clareza das regras e argumentos' },
            { question: "Você se interessa por:", options: ['A história de grandes líderes', 'Como as leis e normas regulam a sociedade', 'Como otimizar um sistema de transporte', 'As últimas novidades de design de interfaces'], correct: 'Como as leis e normas regulam a sociedade' },
            { question: "Qual a sua habilidade de leitura?", options: ['Leio rápido, mas superficialmente', 'Leio cada detalhe, buscando contradições e nuances', 'Leio apenas o que é visualmente atraente', 'Só leio se for código'], correct: 'Leio cada detalhe, buscando contradições e nuances' },
            { question: "Sua motivação vem de:", options: ['Ajudar as pessoas com suas necessidades emocionais', 'Garantir que os processos sejam justos e corretos', 'Construir grandes redes de contato', 'Desenvolver um novo produto do zero'], correct: 'Garantir que os processos sejam justos e corretos' },
            { question: "Em um time, você é o(a) que:", options: ['Busca as regras e os precedentes para a ação', 'Foca na organização física dos materiais', 'Promove a união da equipe', 'Pensa fora da caixa para soluções'], correct: 'Busca as regras e os precedentes para a ação' }
        ]
    };

    // Função para mostrar telas
    function showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.style.display = 'none';
        });
        document.getElementById(screenId).style.display = 'flex';
        // Reiniciar mini-jogos ao entrar na tela deles
        if (screenId === 'memory-game-screen') {
            initMemoryGame();
        } else if (screenId === 'rock-paper-scissors-screen') {
            initJokenpo();
        } else if (screenId === 'tictactoe-screen') {
            initTictactoe();
        }
    }

    // Função para gerar as perguntas dinamicamente
    function showQuestion() {
        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            
            // Lógica para os minigames
            if (currentQuestionIndex === 0 && miniGamesSequence[currentMiniGameIndex] === 'memory') {
                showScreen('memory-game-screen');
                return;
            }
            if (currentQuestionIndex === 5 && miniGamesSequence[currentMiniGameIndex] === 'jokenpo') {
                showScreen('rock-paper-scissors-screen');
                return;
            }
            if (currentQuestionIndex === 10 && miniGamesSequence[currentMiniGameIndex] === 'tictactoe') {
                showScreen('tictactoe-screen');
                return;
            }

            // Exibir a barra de progresso do quiz principal
            progressBar.style.display = 'block';

            // Adiciona a classe de cor ao card da pergunta
            const questionCard = document.getElementById('question-card');
            questionCard.className = `main-container question-card ${questionColors[currentQuestionIndex % questionColors.length]}`;

            questionText.textContent = currentQuestion.question;
            dynamicContent.innerHTML = '';

            // Lógica para os diferentes tipos de pergunta
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
                        points[course] = currentQuestion.points[course] * (value / 10);
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
    
    // Funções do Jogo da Memória
    function initMemoryGame() {
        const icons = memoryGameIcons;
        const cards = [...icons, ...icons]
            .sort(() => 0.5 - Math.random())
            .map(icon => `
                <div class="memory-card" data-icon="${icon}">
                    <div class="back-face">FATEC</div>
                    <div class="front-face">${icon}</div>
                </div>
            `).join('');
        memoryGameGrid.innerHTML = cards;

        document.querySelectorAll('.memory-card').forEach(card => card.addEventListener('click', flipCard));
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        const isMatch = firstCard.dataset.icon === secondCard.dataset.icon;
        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        matchedPairsCount++;
        resetBoard();
        if (matchedPairsCount === totalPairs) {
            playNextMiniGame();
        }
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }
    
    // Funções do Jokenpô
    function initJokenpo() {
        jokenpoWins = 0;
        jokenpoScore.textContent = `Vitórias: ${jokenpoWins} de ${jokenpoTargetWins}`;
        jokenpoResult.textContent = '';
    }

    jokenpoButtons.forEach(button => {
        button.addEventListener('click', () => {
            const playerChoice = button.id.replace('jokenpo-', '');
            const choices = ['rock', 'paper', 'scissors'];
            const computerChoice = choices[Math.floor(Math.random() * choices.length)];

            let result = '';
            if (playerChoice === computerChoice) {
                result = 'Empate!';
            } else if (
                (playerChoice === 'rock' && computerChoice === 'scissors') ||
                (playerChoice === 'paper' && computerChoice === 'rock') ||
                (playerChoice === 'scissors' && computerChoice === 'paper')
            ) {
                result = 'Você Venceu!';
                jokenpoWins++;
            } else {
                result = 'Você Perdeu!';
            }

            jokenpoResult.textContent = `Você escolheu ${getEmoji(playerChoice)}, o computador escolheu ${getEmoji(computerChoice)}. ${result}`;
            jokenpoScore.textContent = `Vitórias: ${jokenpoWins} de ${jokenpoTargetWins}`;

            if (jokenpoWins >= jokenpoTargetWins) {
                playNextMiniGame();
            }
        });
    });

    function getEmoji(choice) {
        if (choice === 'rock') return 'Pedra';
        if (choice === 'paper') return 'Papel';
        if (choice === 'scissors') return 'Tesoura';
        return '';
    }

    // Funções do Jogo da Velha
    function initTictactoe() {
        tictactoeBoard = ['', '', '', '', '', '', '', '', ''];
        tictactoePlayer = 'X';
        tictactoeGameActive = true;
        tictactoeStatus.textContent = "Sua vez (X)";
        document.querySelectorAll('.tictactoe-cell').forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('bg-blue-200', 'bg-red-200');
        });
        tictactoeRestartBtn.classList.add('hidden');
    }

    document.querySelectorAll('.tictactoe-cell').forEach(cell => {
        cell.addEventListener('click', handleTictactoeCellClick);
    });
    tictactoeRestartBtn.addEventListener('click', initTictactoe);

    function handleTictactoeCellClick(e) {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.dataset.cellIndex);

        if (tictactoeBoard[clickedCellIndex] !== '' || !tictactoeGameActive || tictactoePlayer !== 'X') {
            return;
        }

        tictactoeBoard[clickedCellIndex] = tictactoePlayer;
        clickedCell.textContent = tictactoePlayer;
        checkTictactoeResult();
        if (tictactoeGameActive) {
            tictactoePlayer = 'O';
            tictactoeStatus.textContent = "Vez do Computador (O)";
            setTimeout(handleComputerMove, 1000);
        }
    }

    function handleComputerMove() {
        if (!tictactoeGameActive) return;

        // Estratégia simples do computador
        let move = getWinningMove('O') || getWinningMove('X') || getRandomMove();

        if (move !== -1) {
            tictactoeBoard[move] = 'O';
            document.querySelector(`[data-cell-index="${move}"]`).textContent = 'O';
            checkTictactoeResult();
            tictactoePlayer = 'X';
            tictactoeStatus.textContent = "Sua vez (X)";
        }
    }

    function getWinningMove(player) {
        for (let i = 0; i < tictactoeWinningConditions.length; i++) {
            const condition = tictactoeWinningConditions[i];
            const board = tictactoeBoard;
            const emptyCell = condition.find(index => board[index] === '');
            const count = condition.filter(index => board[index] === player).length;

            if (emptyCell !== undefined && count === 2) {
                return emptyCell;
            }
        }
        return null;
    }

    function getRandomMove() {
        const emptyCells = tictactoeBoard.map((cell, index) => cell === '' ? index : -1).filter(index => index !== -1);
        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            return emptyCells[randomIndex];
        }
        return -1;
    }

    function checkTictactoeResult() {
        let roundWon = false;
        for (let i = 0; i < tictactoeWinningConditions.length; i++) {
            const condition = tictactoeWinningConditions[i];
            const a = tictactoeBoard[condition[0]];
            const b = tictactoeBoard[condition[1]];
            const c = tictactoeBoard[condition[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            tictactoeStatus.textContent = `O jogador ${tictactoePlayer} Venceu!`;
            tictactoeGameActive = false;
            tictactoeRestartBtn.classList.remove('hidden');
            if (tictactoePlayer === 'X') {
                setTimeout(() => {
                    playNextMiniGame();
                }, 1000);
            }
            return;
        }

        const isDraw = !tictactoeBoard.includes('');
        if (isDraw) {
            tictactoeStatus.textContent = 'Empate!';
            tictactoeGameActive = false;
            tictactoeRestartBtn.classList.remove('hidden');
            return;
        }
    }
    
    // Função para avançar para a próxima fase do mini-jogo
    function playNextMiniGame() {
        currentMiniGameIndex++;
        if (currentMiniGameIndex < miniGamesSequence.length) {
            if (miniGamesSequence[currentMiniGameIndex] === 'memory') {
                showScreen('memory-game-screen');
            } else if (miniGamesSequence[currentMiniGameIndex] === 'jokenpo') {
                showScreen('rock-paper-scissors-screen');
            } else if (miniGamesSequence[currentMiniGameIndex] === 'tictactoe') {
                showScreen('tictactoe-screen');
            }
        } else {
            showScreen('quiz-screen');
            showQuestion();
        }
    }

    // Função para exibir a tela de resultado
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
    startButton.addEventListener('click', () => {
        tutorialModal.style.display = 'flex';
    });

    closeModalBtn.addEventListener('click', () => {
        tutorialModal.style.display = 'none';
    });

    startQuizFromModalBtn.addEventListener('click', () => {
        tutorialModal.style.display = 'none';
        showScreen('quiz-screen');
        currentQuestionIndex = 0;
        scores = {};
        currentMiniGameIndex = 0; // Reinicia a sequência de mini-jogos
        playNextMiniGame(); // Inicia o primeiro mini-jogo
    });

    restartButton.addEventListener('click', () => {
        showScreen('start-screen');
        currentQuestionIndex = 0;
        scores = {};
    });

    // Removendo showCoursesButton listener
    // showCoursesButton.addEventListener('click', () => {
    //     showScreen('courses-screen');
    //     renderCoursesList();
    // });

    // Removendo backButtonIconCourses listener
    // backButtonIconCourses.addEventListener('click', () => {
    //     showScreen('start-screen');
    // });

    backButtonIconMemory.addEventListener('click', () => {
        showScreen('start-screen');
    });

    backButtonIconJokenpo.addEventListener('click', () => {
        showScreen('start-screen');
    });

    backButtonIconTictactoe.addEventListener('click', () => {
        showScreen('start-screen');
    });

    // Removendo a função renderCoursesList
    // function renderCoursesList() {
    //     coursesListContainer.innerHTML = '';
    //     for (const courseName in courses) {
    //         const courseData = courses[courseName];
    //         const courseItem = document.createElement('div');
    //         courseItem.className = 'course-item';
    //         courseItem.innerHTML = `
    //             <h3 class="text-xl font-bold text-gray-700 flex items-center mb-2">
    //                 <i class="${courseData.icon} text-2xl mr-2 text-blue-500"></i>${courseName}
    //             </h3>
    //             <p class="text-gray-600">${courseData.description}</p>
    //             <p class="mt-2 text-sm text-gray-500"><strong>Áreas:</strong> ${courseData.areas}</p>
    //         `;
    //         coursesListContainer.appendChild(courseItem);
    //     }
    // }

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

    // Funcionalidades do Mini-Quiz
    startMiniQuizButton.addEventListener('click', () => {
        showScreen('choose-course-screen');
        renderChooseCourseGrid();
    });

    backButtonIconChoose.addEventListener('click', () => {
        showScreen('start-screen');
    });

    backButtonIconMiniQuiz.addEventListener('click', () => {
        showScreen('start-screen');
    });

    restartMiniQuizBtn.addEventListener('click', () => {
        miniQuizResultModal.style.display = 'none';
        showScreen('choose-course-screen');
    });

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