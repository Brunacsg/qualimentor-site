const API_ORIGIN = window.location.origin;
const MODULES = [
  'module-1',
  'module-2',
  'module-3',
  'module-4',
  'module-5',
  'module-6',
  'module-7',
  'module-8',
  'module-9'
];

const QUIZ_PASSING_PERCENT = 60;
const COURSE_PROGRESS_STORAGE_KEY = 'qaCourseProgress';
const CERTIFICATE_ORGANIZATION = 'Qualimentor';
const CERTIFICATE_CNPJ = '59.758.519/0001-86';

const MODULE_QUIZZES = {
  'module-1': {
    title: 'Questionário do módulo',
    description: 'Revise os conceitos centrais sobre o papel de Quality Assurance e seus princípios de atuação.',
    questions: [
      {
        prompt: 'Qual é um dos principais objetivos de Quality Assurance em um projeto?',
        options: [
          'Apenas corrigir bugs depois da produção',
          'Garantir qualidade, reduzir riscos e melhorar processos',
          'Substituir o trabalho do desenvolvedor',
          'Escrever apenas documentação técnica'
        ],
        answer: 1,
        explanation: 'Quality Assurance atua para prevenir defeitos, reduzir riscos e aumentar a confiança no produto.'
      },
      {
        prompt: 'O princípio “prevenção vs correção” significa que:',
        options: [
          'Corrigir defeitos sempre custa menos',
          'Prevenir defeitos tende a ser mais eficiente do que corrigi-los depois',
          'Defeitos só devem ser tratados no fim do projeto',
          'Quality Assurance não precisa participar do início do projeto'
        ],
        answer: 1,
        explanation: 'O módulo reforça que prevenir problemas cedo reduz retrabalho e custo.'
      },
      {
        prompt: 'Qual das opções abaixo representa uma responsabilidade típica de Quality Assurance?',
        options: [
          'Ignorar requisitos não-funcionais',
          'Executar testes, registrar defeitos e acompanhar sua resolução',
          'Deployar em produção sem validação',
          'Alterar regras de negócio sem alinhamento'
        ],
        answer: 1,
        explanation: 'Quality Assurance revisa requisitos, executa testes e acompanha defeitos até a resolução.'
      }
    ]
  },
  'module-2': {
    title: 'Questionário do módulo',
    description: 'Confira se o fluxo do STLC, métricas e planejamento ficaram claros.',
    questions: [
      {
        prompt: 'Qual etapa do STLC envolve definir escopo, estratégia e cronograma?',
        options: [
          'Execução',
          'Relatório',
          'Planejamento',
          'Configuração de ambiente'
        ],
        answer: 2,
        explanation: 'Planejamento é a fase em que escopo, estratégia, recursos e cronograma são definidos.'
      },
      {
        prompt: 'Qual métrica ajuda a entender quanto tempo os defeitos levam para ser corrigidos?',
        options: [
          'Cobertura de testes',
          'Tempo médio de resolução',
          'Critério de entrada',
          'Escopo funcional'
        ],
        answer: 1,
        explanation: 'Tempo médio de resolução mede a velocidade de correção de defeitos.'
      },
      {
        prompt: 'Em um plano de teste, critérios de saída definem:',
        options: [
          'Quando a execução pode ser considerada concluída',
          'Quais browsers serão usados',
          'O salário do profissional de Quality Assurance responsável',
          'A tecnologia escolhida pelo backend'
        ],
        answer: 0,
        explanation: 'Critérios de saída indicam quando os testes atingiram o nível necessário para encerrar a fase.'
      }
    ]
  },
  'module-3': {
    title: 'Questionário do módulo',
    description: 'Teste seu entendimento sobre testes manuais, casos de teste e bug reports.',
    questions: [
      {
        prompt: 'O teste de regressão serve para:',
        options: [
          'Criar novas features',
          'Reverificar funcionalidades após mudanças no código',
          'Substituir todos os testes exploratórios',
          'Executar apenas testes de usabilidade'
        ],
        answer: 1,
        explanation: 'Regressão confirma se mudanças recentes não quebraram comportamentos que já funcionavam.'
      },
      {
        prompt: 'Qual item faz parte da estrutura recomendada de um caso de teste?',
        options: [
          'Resultado esperado',
          'Campanha de marketing',
          'Roadmap do produto',
          'Código-fonte completo da aplicação'
        ],
        answer: 0,
        explanation: 'Um caso de teste eficaz precisa deixar claro o resultado esperado para validação.'
      },
      {
        prompt: 'Em um bug report de qualidade, é importante incluir:',
        options: [
          'Somente a opinião do tester',
          'Passos de reprodução e evidências',
          'Apenas a severidade sem contexto',
          'Nenhuma informação de ambiente'
        ],
        answer: 1,
        explanation: 'Passos claros, ambiente e evidências ajudam a reproduzir e corrigir o problema.'
      }
    ]
  },
  'module-4': {
    title: 'Questionário do módulo',
    description: 'Valide os conceitos sobre quando automatizar, abordagens e ferramentas.',
    questions: [
      {
        prompt: 'Qual cenário costuma ser um bom candidato para automação?',
        options: [
          'Teste único e descartável',
          'Teste exploratório altamente criativo',
          'Teste repetitivo de regressão executado com frequência',
          'Requisito que muda todos os dias'
        ],
        answer: 2,
        explanation: 'Automação traz mais retorno em cenários repetitivos, críticos e frequentes.'
      },
      {
        prompt: 'Qual abordagem de automação foca na jornada completa do usuário pela interface?',
        options: [
          'Unitários',
          'Contrato',
          'UI/E2E',
          'Banco de dados'
        ],
        answer: 2,
        explanation: 'Testes UI/E2E simulam a experiência do usuário do início ao fim.'
      },
      {
        prompt: 'Qual ferramenta citada no módulo é conhecida por automação web moderna multi-browser?',
        options: [
          'Playwright',
          'Wireshark',
          'MantisBT',
          'Nagios'
        ],
        answer: 0,
        explanation: 'Playwright é destacado por suporte multi-browser e APIs modernas.'
      }
    ]
  },
  'module-5': {
    title: 'Questionário do módulo',
    description: 'Revise a Biblioteca do QA com foco em ferramentas, bugs, APIs e CI/CD.',
    questions: [
      {
        prompt: 'Qual ferramenta do módulo é amplamente usada para bug tracking com workflows customizáveis?',
        options: [
          'Jira',
          'k6',
          'Appium',
          'Wireshark'
        ],
        answer: 0,
        explanation: 'Jira foi apresentado como padrão da indústria para rastreamento de defeitos.'
      },
      {
        prompt: 'Para testar APIs manualmente com collections e environments, uma ferramenta indicada é:',
        options: [
          'Postman',
          'JUnit',
          'MantisBT',
          'LoadRunner'
        ],
        answer: 0,
        explanation: 'Postman foi apresentado como ferramenta amigável para testes de API.'
      },
      {
        prompt: 'Qual opção pertence à categoria de CI/CD e integração?',
        options: [
          'GitHub Actions',
          'Burp Suite',
          'SoapUI',
          'Zephyr Scale'
        ],
        answer: 0,
        explanation: 'GitHub Actions aparece no módulo como ferramenta de automação de pipelines.'
      }
    ]
  },
  'module-6': {
    title: 'Questionário do módulo',
    description: 'Confira seu entendimento sobre Scrum, DevOps, BDD e colaboração ágil.',
    questions: [
      {
        prompt: 'Qual cerimônia do Scrum é usada para relatar progresso, bloqueios e plano do dia?',
        options: [
          'Sprint Review',
          'Retrospective',
          'Daily Standup',
          'Refinement financeiro'
        ],
        answer: 2,
        explanation: 'A daily standup é a reunião curta usada para alinhamento diário do time.'
      },
      {
        prompt: 'BDD se caracteriza por:',
        options: [
          'Ignorar critérios de aceitação',
          'Usar linguagem natural para descrever comportamentos e cenários',
          'Executar apenas testes unitários',
          'Eliminar a participação de Quality Assurance'
        ],
        answer: 1,
        explanation: 'BDD usa cenários em linguagem natural, frequentemente com Gherkin.'
      },
      {
        prompt: 'Em DevOps, “Shift Left Testing” significa:',
        options: [
          'Testar só depois do deploy',
          'Mover testes para mais cedo no ciclo de desenvolvimento',
          'Executar apenas smoke tests',
          'Desativar testes em CI/CD'
        ],
        answer: 1,
        explanation: 'Shift Left traz validação para fases iniciais do desenvolvimento.'
      }
    ]
  },
  'module-7': {
    title: 'Questionário do módulo',
    description: 'Teste sua compreensão sobre OWASP, ataques comuns e ferramentas de segurança.',
    questions: [
      {
        prompt: 'Qual item do OWASP Top 10 está ligado a SQL Injection?',
        options: [
          'Injection',
          'Logging insuficiente',
          'Usabilidade ruim',
          'Load balancing'
        ],
        answer: 0,
        explanation: 'SQL Injection é um exemplo clássico da categoria Injection.'
      },
      {
        prompt: 'Qual ferramenta open source foi citada para escanear aplicações web em busca de vulnerabilidades?',
        options: [
          'OWASP ZAP',
          'TestRail',
          'Cypress',
          'CircleCI'
        ],
        answer: 0,
        explanation: 'OWASP ZAP foi citado como scanner open source para aplicações web.'
      },
      {
        prompt: 'Uma forma de prevenir XSS é:',
        options: [
          'Exibir inputs sem tratamento',
          'Sanitizar entradas e usar CSP',
          'Desativar autenticação',
          'Permitir qualquer script no navegador'
        ],
        answer: 1,
        explanation: 'Sanitização e Content Security Policy ajudam a reduzir riscos de XSS.'
      }
    ]
  },
  'module-8': {
    title: 'Questionário do módulo',
    description: 'Reveja tipos de testes de performance, métricas e otimizações.',
    questions: [
      {
        prompt: 'Qual teste avalia o sistema sob a carga esperada normal?',
        options: [
          'Stress Testing',
          'Load Testing',
          'Spike Testing',
          'Chaos Testing'
        ],
        answer: 1,
        explanation: 'Load Testing mede o comportamento do sistema sob carga normal prevista.'
      },
      {
        prompt: 'No exemplo do módulo, qual métrica estava alta e precisava de otimização?',
        options: [
          'Throughput',
          'Uso de memória',
          'Status code',
          'Ramp-up time'
        ],
        answer: 1,
        explanation: 'O exemplo destacava uso de memória em 85% como ponto de atenção.'
      },
      {
        prompt: 'Qual ferramenta moderna baseada em JavaScript foi citada para testes de performance?',
        options: [
          'k6',
          'MantisBT',
          'Zephyr Scale',
          'Nessus'
        ],
        answer: 0,
        explanation: 'k6 foi apresentado como uma ferramenta moderna de performance baseada em JavaScript.'
      }
    ]
  },
  'module-9': {
    title: 'Questionário do módulo',
    description: 'Confira se você absorveu as principais trilhas, habilidades e próximos passos da carreira em Quality Assurance.',
    questions: [
      {
        prompt: 'Qual certificação foi apresentada como base internacional para Quality Assurance?',
        options: [
          'ISTQB Foundation',
          'CCNA',
          'AWS Solutions Architect',
          'PMP'
        ],
        answer: 0,
        explanation: 'ISTQB Foundation foi citada como certificação básica importante para Quality Assurance.'
      },
      {
        prompt: 'Qual trajetória tem foco forte em automação e desenvolvimento de frameworks de teste?',
        options: [
          'Quality Assurance Engineer',
          'Product Owner',
          'UX Writer',
          'Scrum Master júnior'
        ],
        answer: 0,
        explanation: 'O módulo destaca Quality Assurance Engineer como perfil mais técnico com foco em automação.'
      },
      {
        prompt: 'Entre as habilidades técnicas essenciais citadas, está:',
        options: [
          'Apenas design gráfico',
          'SQL, Git e metodologias ágeis',
          'Somente edição de vídeo',
          'Nenhum conhecimento de API'
        ],
        answer: 1,
        explanation: 'Fundamentos como SQL, Git e metodologias ágeis aparecem como base da carreira.'
      }
    ]
  }
};

const MODULE_QUIZ_EXPANSIONS = {
  'module-1': [
    {
      prompt: 'Quando Quality Assurance participa cedo da descoberta de requisitos, o principal ganho é:',
      options: [
        'Aumentar a quantidade de bugs em produção',
        'Reduzir ambiguidades e detectar riscos antes da construção',
        'Eliminar a necessidade de alinhamento com produto',
        'Substituir completamente a documentação'
      ],
      answer: 1,
      explanation: 'Participar cedo ajuda a esclarecer expectativas e evita que defeitos sejam construídos no produto.'
    },
    {
      prompt: 'Qual atitude mostra visão de negócio em Quality Assurance?',
      options: [
        'Priorizar todos os defeitos da mesma forma',
        'Avaliar impacto do defeito sobre cliente, receita e operação',
        'Reportar apenas erros visuais',
        'Testar sem considerar contexto de uso'
      ],
      answer: 1,
      explanation: 'Quality Assurance maduro prioriza risco com base em impacto real para cliente e negócio.'
    },
    {
      prompt: 'Uma boa colaboração entre Quality Assurance e desenvolvimento depende de:',
      options: [
        'Comunicação clara e evidências objetivas',
        'Mensagens vagas sobre o problema',
        'Evitar registrar detalhes do ambiente',
        'Validar apenas no final da sprint'
      ],
      answer: 0,
      explanation: 'Evidência, contexto e comunicação clara aceleram a correção dos problemas.'
    },
    {
      prompt: 'Qual cenário representa um risco não funcional?',
      options: [
        'Campo obrigatório sem validação',
        'Página lenta no horário de pico',
        'Botão com texto incorreto',
        'Link quebrado no rodapé'
      ],
      answer: 1,
      explanation: 'Performance é um atributo não funcional relacionado à experiência e estabilidade do sistema.'
    },
    {
      prompt: 'Qual frase resume melhor a qualidade como responsabilidade compartilhada?',
      options: [
        'Somente Quality Assurance deve garantir qualidade',
        'Qualidade depende da colaboração entre produto, desenvolvimento e Quality Assurance',
        'O cliente identifica todos os problemas importantes',
        'Testes substituem decisões de engenharia'
      ],
      answer: 1,
      explanation: 'Qualidade sustentável depende de colaboração multidisciplinar, não de um único papel.'
    },
    {
      prompt: 'Em um fluxo de checkout, qual item costuma ser mais crítico para priorização de testes?',
      options: [
        'Cor do botão de ajuda',
        'Regra de cálculo do valor final',
        'Posição do logo no topo',
        'Texto do rodapé institucional'
      ],
      answer: 1,
      explanation: 'Cálculo incorreto no checkout afeta diretamente receita, confiança e operação.'
    },
    {
      prompt: 'Um bom registro de defeito deve permitir que outra pessoa:',
      options: [
        'Adivinhe o problema',
        'Reproduza o comportamento com os dados fornecidos',
        'Ignore a severidade do caso',
        'Resolva sem contexto algum'
      ],
      answer: 1,
      explanation: 'Reprodução consistente é base para correção eficiente e priorização adequada.'
    }
  ],
  'module-2': [
    {
      prompt: 'Qual atividade acontece antes da execução de testes no STLC?',
      options: [
        'Análise e desenho de testes',
        'Retrospectiva de release',
        'Descontinuação do produto',
        'Encerramento financeiro'
      ],
      answer: 0,
      explanation: 'Antes de executar, o time precisa analisar requisitos e desenhar os testes necessários.'
    },
    {
      prompt: 'Critérios de entrada ajudam o time a decidir se:',
      options: [
        'Já existe base suficiente para iniciar a etapa de testes',
        'Quality Assurance deve ignorar ambientes instáveis',
        'Todos os defeitos foram corrigidos',
        'O roadmap do semestre foi encerrado'
      ],
      answer: 0,
      explanation: 'Critérios de entrada definem as condições mínimas para começar a testar com segurança.'
    },
    {
      prompt: 'Uma métrica de cobertura de testes ajuda a responder:',
      options: [
        'Quanto do escopo planejado foi validado',
        'Qual é o salário médio em Quality Assurance',
        'Quantas reuniões ocorreram na sprint',
        'Quem aprovou o deploy'
      ],
      answer: 0,
      explanation: 'Cobertura mede quanto do escopo recebeu validação frente ao planejado.'
    },
    {
      prompt: 'Configuração de ambiente no STLC é importante porque:',
      options: [
        'Ambientes inconsistentes geram falsos resultados e retrabalho',
        'Elimina a necessidade de evidência',
        'Substitui planejamento de testes',
        'Torna defeitos impossíveis'
      ],
      answer: 0,
      explanation: 'Ambiente ruim gera falhas artificiais e compromete a confiança nos resultados.'
    },
    {
      prompt: 'Uma boa estratégia de teste deve refletir principalmente:',
      options: [
        'Riscos, prioridades e objetivos do produto',
        'Preferência pessoal de quem testa',
        'Apenas o cronograma de férias do time',
        'Somente a tecnologia do frontend'
      ],
      answer: 0,
      explanation: 'Estratégia de teste deve ser guiada por risco e objetivo de negócio.'
    },
    {
      prompt: 'Qual documento geralmente concentra escopo, abordagem e recursos necessários?',
      options: [
        'Plano de testes',
        'Contrato comercial',
        'Pauta da daily',
        'Manual do usuário final'
      ],
      answer: 0,
      explanation: 'Plano de testes reúne a visão operacional da fase de validação.'
    },
    {
      prompt: 'Quando uma métrica mostra aumento constante de defeitos reabertos, isso sugere:',
      options: [
        'Correções possivelmente incompletas ou validação insuficiente',
        'Maior estabilidade do produto',
        'Redução do risco técnico',
        'Fim da necessidade de regressão'
      ],
      answer: 0,
      explanation: 'Defeitos reabertos em excesso indicam fragilidade na correção ou no reteste.'
    }
  ],
  'module-3': [
    {
      prompt: 'Teste exploratório é especialmente útil quando:',
      options: [
        'O produto precisa de investigação guiada por experiência e observação',
        'Não existe nenhuma interface para validar',
        'Todos os casos já estão automatizados e estáveis',
        'O objetivo é apenas executar scripts fixos'
      ],
      answer: 0,
      explanation: 'Exploratórios ajudam a descobrir comportamentos inesperados e lacunas não previstas.'
    },
    {
      prompt: 'Qual item ajuda a tornar um bug report mais útil para desenvolvimento?',
      options: [
        'Ambiente, passos, evidências e comportamento esperado',
        'Somente severidade',
        'Apenas um print sem contexto',
        'Somente opinião do cliente'
      ],
      answer: 0,
      explanation: 'Relatórios completos aceleram análise, reprodução e correção.'
    },
    {
      prompt: 'Um caso de teste negativo normalmente verifica:',
      options: [
        'Como o sistema reage a entradas inválidas ou exceções',
        'Se o ambiente de produção foi desligado',
        'Apenas fluxos felizes com dados corretos',
        'Somente a performance do banco'
      ],
      answer: 0,
      explanation: 'Testes negativos avaliam resiliência do sistema diante de dados ou ações inválidas.'
    },
    {
      prompt: 'A severidade de um defeito representa:',
      options: [
        'O impacto técnico/funcional do problema',
        'Quem encontrou o erro',
        'A quantidade de prints anexados',
        'O humor do time no dia'
      ],
      answer: 0,
      explanation: 'Severidade mede o impacto do defeito na solução.'
    },
    {
      prompt: 'A prioridade de um defeito normalmente considera:',
      options: [
        'Urgência de negócio para correção',
        'Apenas o nome do módulo afetado',
        'Somente o tamanho do print anexado',
        'A preferência do profissional de Quality Assurance por um tipo de teste'
      ],
      answer: 0,
      explanation: 'Prioridade combina impacto, urgência e contexto de negócio.'
    },
    {
      prompt: 'Uma boa suíte manual de regressão deve focar em:',
      options: [
        'Fluxos críticos e áreas mais suscetíveis a impacto por mudanças',
        'Somente telas raramente usadas',
        'Apenas casos irrelevantes para o cliente',
        'Tudo com a mesma profundidade, sem priorização'
      ],
      answer: 0,
      explanation: 'Regressão eficiente prioriza os cenários mais importantes e mais arriscados.'
    },
    {
      prompt: 'Ao validar um formulário, um cuidado essencial é testar:',
      options: [
        'Campos obrigatórios, formatos inválidos e mensagens de erro',
        'Apenas o botão enviar',
        'Somente a cor do plano de fundo',
        'O nome interno do componente CSS'
      ],
      answer: 0,
      explanation: 'Formulários exigem validação completa de regras, feedback e tratamento de erro.'
    }
  ],
  'module-4': [
    {
      prompt: 'Automação costuma gerar mais valor quando:',
      options: [
        'Reduz esforço repetitivo e aumenta confiança em regressões críticas',
        'É usada em qualquer cenário sem avaliar retorno',
        'Substitui toda análise humana do produto',
        'É criada mesmo sem estabilidade mínima da funcionalidade'
      ],
      answer: 0,
      explanation: 'Retorno da automação cresce em cenários repetitivos, críticos e estáveis.'
    },
    {
      prompt: 'A pirâmide de testes sugere que a maior base deve estar em:',
      options: [
        'Testes unitários',
        'Testes E2E pesados',
        'Testes manuais de aceite',
        'Validação em produção'
      ],
      answer: 0,
      explanation: 'A base ampla em unitários tende a ser mais rápida, barata e estável.'
    },
    {
      prompt: 'Um sinal de automação frágil é quando o teste:',
      options: [
        'Falha com frequência por detalhes visuais ou sincronização mal tratada',
        'Executa rápido e com assertivas claras',
        'Usa dados previsíveis e isolados',
        'Valida uma API estável com bom setup'
      ],
      answer: 0,
      explanation: 'Flakiness costuma indicar problema de sincronização, dependência externa ou seletor ruim.'
    },
    {
      prompt: 'Qual benefício de Page Objects ou abstrações similares?',
      options: [
        'Reduz duplicação e facilita manutenção da suíte',
        'Aumenta acoplamento e dificulta leitura',
        'Elimina a necessidade de asserts',
        'Impede testes de API'
      ],
      answer: 0,
      explanation: 'Abstrações bem feitas ajudam a centralizar interação com elementos e reduzir retrabalho.'
    },
    {
      prompt: 'Testes de API automatizados ajudam porque:',
      options: [
        'Validam regras de negócio com rapidez e menos fragilidade que UI',
        'Dependem sempre de navegador',
        'Nunca precisam de dados controlados',
        'Substituem completamente testes unitários'
      ],
      answer: 0,
      explanation: 'API costuma ser uma camada eficiente para validar regras com bom custo-benefício.'
    },
    {
      prompt: 'Uma boa prática ao automatizar dados de teste é:',
      options: [
        'Criar dados previsíveis e limpar dependências quando necessário',
        'Reutilizar o mesmo cadastro para tudo sem controle',
        'Depender de ambiente manualmente preparado',
        'Ignorar isolamento entre cenários'
      ],
      answer: 0,
      explanation: 'Dados previsíveis deixam os testes mais confiáveis e mais simples de diagnosticar.'
    },
    {
      prompt: 'Quando não automatizar pode ser uma escolha melhor?',
      options: [
        'Quando o cenário é altamente exploratório e muda constantemente',
        'Quando o fluxo é crítico e repetido semanalmente',
        'Quando a regra de negócio é estável',
        'Quando o teste precisa rodar em CI/CD'
      ],
      answer: 0,
      explanation: 'Automatizar cenários muito instáveis ou criativos demais pode trazer baixo retorno.'
    }
  ],
  'module-5': [
    {
      prompt: 'Ferramentas como TestRail e Zephyr são úteis para:',
      options: [
        'Organizar casos, execuções e rastreabilidade de testes',
        'Desenvolver interfaces web do zero',
        'Monitorar uso de CPU do servidor apenas',
        'Substituir pipelines de CI/CD'
      ],
      answer: 0,
      explanation: 'Essas ferramentas ajudam na gestão estruturada da operação de testes.'
    },
    {
      prompt: 'Em um board de defeitos no Jira, um bom workflow ajuda a:',
      options: [
        'Dar visibilidade do status de cada problema e da responsabilidade atual',
        'Remover a necessidade de priorização',
        'Evitar qualquer evidência em tickets',
        'Eliminar comunicação com produto'
      ],
      answer: 0,
      explanation: 'Workflow bem definido melhora acompanhamento e previsibilidade da correção.'
    },
    {
      prompt: 'Qual ferramenta é mais associada a carga e performance entre as citadas?',
      options: [
        'JMeter',
        'Jira',
        'Postman',
        'Miro'
      ],
      answer: 0,
      explanation: 'JMeter é referência tradicional para testes de carga e análise de performance.'
    },
    {
      prompt: 'Collections e environments no Postman ajudam a:',
        options: [
        'Reutilizar requisições e parametrizar diferentes contextos de teste',
        'Apagar automaticamente o banco em produção',
        'Criar interfaces mobile nativas',
        'Substituir toda autenticação da API'
      ],
      answer: 0,
      explanation: 'Esses recursos aceleram testes repetitivos e melhoram organização.'
    },
    {
      prompt: 'Uma integração de Quality Assurance com CI/CD traz como ganho principal:',
      options: [
        'Feedback rápido sobre regressões antes da entrega',
        'Fim da necessidade de análise de logs',
        'Eliminação de todos os testes manuais',
        'Redução total do monitoramento'
      ],
      answer: 0,
      explanation: 'Pipelines ajudam a detectar problemas cedo e evitar falhas chegando ao release.'
    },
    {
      prompt: 'Versionar coleções, scripts e suites de teste no Git é importante porque:',
      options: [
        'Permite rastreabilidade e colaboração segura entre os times',
        'Impede qualquer revisão de código',
        'Substitui a necessidade de branches',
        'Evita usar ambientes separados'
      ],
      answer: 0,
      explanation: 'Versionamento ajuda a controlar mudanças, colaborar e voltar para estados confiáveis.'
    },
    {
      prompt: 'Ao escolher uma ferramenta de Qualidade de Software, um critério relevante é:',
      options: [
        'Adequação ao problema, integração com o time e custo operacional',
        'Apenas a cor da interface',
        'Se o nome parece moderno',
        'Se ninguém do time sabe usar'
      ],
      answer: 0,
      explanation: 'Boa escolha considera contexto, maturidade do time e retorno prático.'
    }
  ],
  'module-6': [
    {
      prompt: 'Em times ágeis, Quality Assurance agrega valor ao participar de refinamentos porque:',
      options: [
        'Ajuda a antecipar critérios, riscos e cenários de teste',
        'Elimina a necessidade de backlog',
        'Substitui o papel do PO',
        'Evita qualquer documentação'
      ],
      answer: 0,
      explanation: 'Refinamentos são ótimos momentos para prevenir ambiguidades e riscos.'
    },
    {
      prompt: 'Uma boa definição de pronto tende a incluir:',
      options: [
        'Critérios claros de qualidade e evidência de validação',
        'Somente desenvolvimento concluído',
        'Apenas merge no repositório',
        'Nenhum teste realizado'
      ],
      answer: 0,
      explanation: 'Done sem critérios de qualidade deixa o conceito incompleto.'
    },
    {
      prompt: 'No contexto de BDD, um cenário Gherkin bem escrito deve ser:',
      options: [
        'Claros, observável e alinhado ao comportamento esperado',
        'Cheio de detalhes técnicos irrelevantes para o negócio',
        'Ambíguo para acomodar qualquer resultado',
        'Usado apenas por Quality Assurance, sem participação do time'
      ],
      answer: 0,
      explanation: 'BDD funciona melhor quando descreve comportamento de forma clara e colaborativa.'
    },
    {
      prompt: 'Em uma retrospectiva, o olhar de Quality Assurance pode contribuir para:',
      options: [
        'Melhorar processo, fluxo de defeitos e qualidade da entrega',
        'Cancelar todo planejamento seguinte',
        'Remover o uso de métricas',
        'Desligar a CI/CD'
      ],
      answer: 0,
      explanation: 'Retrospectiva é espaço para ajustes de processo, comunicação e qualidade.'
    },
    {
      prompt: 'Integração contínua favorece Quality Assurance porque:',
      options: [
        'Entrega feedback frequente sobre quebras logo após mudanças',
        'Reduz a visibilidade sobre defeitos',
        'Torna desnecessária qualquer revisão',
        'Impede testes automatizados'
      ],
      answer: 0,
      explanation: 'CI ajuda a detectar regressões cedo e diminuir o custo da correção.'
    },
    {
      prompt: 'Uma squad ágil madura trata qualidade como:',
      options: [
        'Um objetivo compartilhado ao longo de toda a sprint',
        'Uma etapa isolada no final',
        'Tema exclusivo de reuniões mensais',
        'Responsabilidade do cliente final'
      ],
      answer: 0,
      explanation: 'Em times maduros, qualidade é construída continuamente.'
    },
    {
      prompt: 'DevSecOps amplia a visão de Quality Assurance ao incluir também:',
      options: [
        'Segurança e conformidade no fluxo contínuo de entrega',
        'Somente testes manuais de interface',
        'Apenas documentação estática',
        'Desligamento de logs e alertas'
      ],
      answer: 0,
      explanation: 'DevSecOps incorpora segurança cedo e continuamente no pipeline.'
    }
  ],
  'module-7': [
    {
      prompt: 'Qual prática reduz risco de credenciais expostas em aplicações?',
      options: [
        'Gerenciar segredos de forma segura e evitar hardcode',
        'Salvar senhas em texto puro no repositório',
        'Compartilhar tokens em chats públicos',
        'Desativar autenticação em homologação permanentemente'
      ],
      answer: 0,
      explanation: 'Boa gestão de segredos é fundamental para reduzir exposição e abuso.'
    },
    {
      prompt: 'Uma autenticação forte normalmente combina:',
      options: [
        'Boas políticas de senha, proteção de sessão e controles adicionais quando necessário',
        'Apenas uma senha curta e simples',
        'Ausência de timeout de sessão',
        'Tokens permanentes sem renovação'
      ],
      answer: 0,
      explanation: 'Segurança de autenticação exige múltiplas camadas de proteção.'
    },
    {
      prompt: 'No contexto de segurança, validação de entrada é importante para:',
      options: [
        'Reduzir exploração por injeção e outros abusos',
        'Melhorar apenas o layout da página',
        'Aumentar o número de pop-ups',
        'Substituir logs de auditoria'
      ],
      answer: 0,
      explanation: 'Entrada sem validação é vetor comum para exploração de vulnerabilidades.'
    },
    {
      prompt: 'Qual item ajuda a investigar incidentes e comportamento suspeito?',
      options: [
        'Logs e trilhas de auditoria consistentes',
        'Apagar históricos do sistema',
        'Evitar monitoramento',
        'Desativar alertas'
      ],
      answer: 0,
      explanation: 'Logs estruturados são essenciais para detecção e investigação.'
    },
    {
      prompt: 'Teste de segurança não deve se limitar a:',
      options: [
        'Apenas um scan automático sem análise de contexto',
        'Verificação de autenticação',
        'Validação de headers e exposição de dados',
        'Revisão de fluxos críticos'
      ],
      answer: 0,
      explanation: 'Ferramentas automáticas ajudam, mas não substituem análise contextual.'
    },
    {
      prompt: 'Uma aplicação com dados sensíveis deve ter atenção especial a:',
      options: [
        'Controle de acesso e proteção de dados expostos',
        'Apenas animações da interface',
        'Somente posicionamento do menu',
        'Cor dos badges administrativos'
      ],
      answer: 0,
      explanation: 'Controle de acesso inadequado é um risco alto em aplicações com dados sensíveis.'
    },
    {
      prompt: 'Ao relatar vulnerabilidades, o profissional de Quality Assurance deve priorizar:',
      options: [
        'Impacto, evidências e possibilidade de exploração',
        'Apenas prints sem explicação',
        'Comentários genéricos sem cenário',
        'Somente opinião pessoal sobre o risco'
      ],
      answer: 0,
      explanation: 'Bom relato de vulnerabilidade precisa traduzir risco e modo de exploração.'
    }
  ],
  'module-8': [
    {
      prompt: 'Stress testing busca observar o sistema quando:',
      options: [
        'A carga ultrapassa o limite esperado e pressiona a estabilidade',
        'Tudo está dentro da operação normal',
        'Apenas a interface é redesenhada',
        'Não há usuários simultâneos'
      ],
      answer: 0,
      explanation: 'Stress testa o comportamento acima do esperado e revela limites de recuperação.'
    },
    {
      prompt: 'Latency ou tempo de resposta alto impacta diretamente:',
      options: [
        'Experiência do usuário e percepção de fluidez',
        'Somente a cor da interface',
        'Apenas a documentação do produto',
        'O contrato comercial de fornecedores'
      ],
      answer: 0,
      explanation: 'Tempo de resposta é um dos principais sinais percebidos pelo usuário final.'
    },
    {
      prompt: 'Um teste de spike normalmente avalia:',
      options: [
        'Comportamento diante de aumento brusco de acessos',
        'Apenas carga constante e estável',
        'Somente uso de memória local do navegador',
        'Interface visual do produto'
      ],
      answer: 0,
      explanation: 'Spike verifica reação do sistema a picos repentinos de tráfego.'
    },
    {
      prompt: 'Ao analisar gargalos, uma boa prática é correlacionar:',
      options: [
        'Tempo de resposta, throughput e uso de recursos',
        'Apenas o nome do teste executado',
        'Somente o layout da aplicação',
        'Quantidade de reuniões da sprint'
      ],
      answer: 0,
      explanation: 'Performance precisa ser vista por múltiplos sinais combinados.'
    },
    {
      prompt: 'Um objetivo realista de performance costuma nascer de:',
      options: [
        'SLA, expectativa de usuário e capacidade esperada do sistema',
        'Apenas opinião do time sem referência',
        'Vontade de usar números aleatórios',
        'Quantidade de badges no dashboard'
      ],
      answer: 0,
      explanation: 'Metas de performance precisam ser ligadas a operação real e expectativa de negócio.'
    },
    {
      prompt: 'Ramp-up em um teste de carga representa:',
      options: [
        'O ritmo de entrada gradual de usuários virtuais',
        'A correção de defeitos em produção',
        'A troca de credenciais do admin',
        'A duração da retrospectiva'
      ],
      answer: 0,
      explanation: 'Ramp-up controla como a carga aumenta ao longo do teste.'
    },
    {
      prompt: 'Uma melhoria de performance deve ser validada por:',
      options: [
        'Nova medição comparativa antes e depois da mudança',
        'Apenas percepção informal do time',
        'Somente comentário no ticket',
        'Troca da ferramenta sem reexecutar testes'
      ],
      answer: 0,
      explanation: 'Sem comparação objetiva, não há evidência concreta de ganho.'
    }
  ],
  'module-9': [
    {
      prompt: 'Construir portfólio em Quality Assurance ajuda porque:',
      options: [
        'Demonstra raciocínio, prática e repertório em processos reais',
        'Substitui totalmente entrevistas',
        'Elimina necessidade de estudar fundamentos',
        'Serve apenas para redes sociais'
      ],
      answer: 0,
      explanation: 'Portfólio mostra na prática como a pessoa pensa, executa e comunica Quality Assurance.'
    },
    {
      prompt: 'Em uma entrevista de Quality Assurance, costuma gerar valor explicar:',
      options: [
        'Como você prioriza riscos, registra defeitos e toma decisões de teste',
        'Apenas qual ferramenta você acha bonita',
        'Somente sua opinião sobre salários',
        'Apenas quantidade de cursos feitos'
      ],
      answer: 0,
      explanation: 'Entrevistadores valorizam raciocínio prático e capacidade de decisão.'
    },
    {
      prompt: 'Para crescer em Quality Assurance, é útil combinar habilidades técnicas com:',
      options: [
        'Comunicação, visão de negócio e colaboração',
        'Apenas decorar siglas',
        'Somente consumo passivo de conteúdo',
        'Evitar contato com produto e desenvolvimento'
      ],
      answer: 0,
      explanation: 'Carreira forte em Quality Assurance une técnica com comunicação e contexto de negócio.'
    },
    {
      prompt: 'Aprender SQL é importante em Quality Assurance porque:',
      options: [
        'Ajuda a validar dados e investigar comportamentos no backend',
        'Serve apenas para times de marketing',
        'Impede testes de API',
        'Substitui documentação de requisitos'
      ],
      answer: 0,
      explanation: 'SQL permite validar persistência, integrações e consistência de dados.'
    },
    {
      prompt: 'Uma postura profissional em Quality Assurance inclui:',
      options: [
        'Aprendizado contínuo e melhoria constante do processo',
        'Dependência total de instruções prontas',
        'Evitar feedback técnico',
        'Ignorar métricas e retrospectivas'
      ],
      answer: 0,
      explanation: 'Quality Assurance evolui com estudo contínuo, prática e ajuste constante de processo.'
    },
    {
      prompt: 'Ao montar currículo para Quality Assurance, faz mais sentido destacar:',
      options: [
        'Resultados, ferramentas, contexto e responsabilidades exercidas',
        'Somente cursos sem aplicação',
        'Apenas frase genérica de objetivo',
        'Somente informações pessoais sem contexto técnico'
      ],
      answer: 0,
      explanation: 'Currículo eficaz mostra impacto, contexto e repertório prático.'
    },
    {
      prompt: 'A evolução de carreira em Quality Assurance costuma ser fortalecida por:',
      options: [
        'Especialização progressiva e exposição a diferentes contextos de teste',
        'Repetir sempre o mesmo tipo de atividade sem aprofundamento',
        'Evitar qualquer contato com automação ou dados',
        'Ignorar feedback de entrevistas e líderes'
      ],
      answer: 0,
      explanation: 'Diversidade de contexto e aprofundamento técnico ampliam o potencial de crescimento.'
    }
  ]
};

Object.entries(MODULE_QUIZ_EXPANSIONS).forEach(([moduleId, questions]) => {
  if (MODULE_QUIZZES[moduleId]) {
    MODULE_QUIZZES[moduleId].questions = [
      ...MODULE_QUIZZES[moduleId].questions,
      ...questions,
    ];
  }
});

const MODULE_DETAILED_CONTENT = {
  'module-1': {
    summary: 'Este aprofundamento transforma a introdução em uma base real de curso, conectando o papel de Quality Assurance à operação do dia a dia, ao impacto no negócio e à forma como a qualidade influencia o ciclo inteiro de desenvolvimento.',
    sections: [
      {
        heading: 'Como Quality Assurance gera valor para o negócio',
        paragraphs: [
          'Em um curso profissionalizante de Quality Assurance, é essencial entender que qualidade não é um fim isolado. Quality Assurance protege receita, reputação e experiência do cliente. Um defeito em login, checkout, cálculo de frete ou emissão de nota pode gerar perda de conversão, chamados de suporte, devoluções e desgaste da marca.',
          'Por isso, o profissional de Quality Assurance precisa saber traduzir problemas técnicos em impacto de negócio. Ao priorizar testes, não basta perguntar “o que pode quebrar?”, mas também “o que acontece com cliente, operação, suporte e faturamento se isso falhar?”. Esse raciocínio é o que diferencia um executor de testes de um profissional estratégico.'
        ],
        bullets: [
          'Risco técnico: falha de validação, integração ou regra de negócio.',
          'Risco operacional: suporte sobrecarregado, retrabalho e incidentes.',
          'Risco financeiro: perda de vendas, chargeback, multa ou SLA descumprido.',
          'Risco de imagem: reclamações públicas e perda de confiança do usuário.'
        ]
      },
      {
        heading: 'Mentalidade moderna de Quality Assurance',
        paragraphs: [
          'Quality Assurance moderno participa desde a descoberta do problema até a validação da solução em produção. Isso inclui revisar requisitos, levantar ambiguidades, sugerir critérios de aceitação, definir cenários críticos, validar dados e acompanhar métricas após o release.',
          'Outro ponto central é a comunicação. Um bom profissional de Quality Assurance sabe registrar defeitos com clareza, negociar prioridade, demonstrar risco com evidências e alinhar expectativa com produto e desenvolvimento. Em equipes maduras, qualidade é uma responsabilidade compartilhada, mas Quality Assurance frequentemente atua como facilitador dessa disciplina.'
        ],
        bullets: [
          'Participar da definição de requisitos e critérios de aceite.',
          'Priorizar testes com base em risco e impacto.',
          'Documentar achados com contexto e evidência.',
          'Acompanhar indicadores após entrega em produção.'
        ]
      }
    ],
    exerciseTitle: 'Passo a passo do exercício prático',
    exerciseIntro: 'O objetivo é montar uma visão inicial de Quality Assurance para um fluxo de checkout de e-commerce, conectando responsabilidades, riscos e ações de validação.',
    steps: [
      'Escolha um cenário simples de compra: produto no carrinho, preenchimento de endereço, escolha de frete e pagamento.',
      'Liste 3 responsabilidades de Quality Assurance nesse fluxo, por exemplo: revisar regras de cálculo, validar mensagens de erro e testar integração de pagamento.',
      'Mapeie pelo menos 5 riscos: cupom inválido aceito, valor final incorreto, frete divergente, pagamento duplicado e falha de confirmação.',
      'Transforme os riscos em ações de teste. Para cada risco, escreva o que será validado, em qual etapa e com qual resultado esperado.',
      'Feche o exercício com um mini-plano contendo objetivo, escopo, riscos prioritários e próximos passos de execução.'
    ],
    deliverables: [
      'Lista de responsabilidades de Quality Assurance no fluxo.',
      'Mapa de riscos do checkout.',
      'Mini-plano de validação com prioridade e objetivo.'
    ]
  },
  'module-2': {
    summary: 'Neste aprofundamento, o aluno passa a enxergar o STLC como um sistema de decisões, artefatos e métricas, e não apenas como uma sequência decorada de etapas.',
    sections: [
      {
        heading: 'Planejamento de testes com visão operacional',
        paragraphs: [
          'O planejamento de testes precisa responder perguntas objetivas: o que será testado, o que não será testado, quais ambientes estarão disponíveis, quais dados serão usados, quais riscos exigem maior profundidade e qual o critério mínimo para liberar a entrega.',
          'Na prática, o plano de teste também organiza dependências. Uma equipe pode ter casos excelentes, mas falhar porque o ambiente está instável, os acessos não foram provisionados ou o escopo mudou sem atualização do plano. O documento e os alinhamentos precisam refletir essa realidade.'
        ],
        bullets: [
          'Definir escopo e exclusões com clareza.',
          'Mapear dependências técnicas e operacionais.',
          'Associar casos críticos a riscos de negócio.',
          'Estabelecer critérios de entrada e saída mensuráveis.'
        ]
      },
      {
        heading: 'Métricas que ajudam a decidir',
        paragraphs: [
          'Métricas não devem servir apenas para “encher relatório”. Elas precisam apoiar decisão. Cobertura de testes mostra amplitude. Tempo médio de resolução mostra fluidez do processo. Defeitos por severidade ajudam a entender risco residual. Reabertura de bugs pode sinalizar falha de entendimento ou baixa qualidade na correção.',
          'Um profissional de Quality Assurance mais maduro não apresenta números isolados; ele conta a história por trás deles. Exemplo: “Cobertura subiu, mas os defeitos críticos também cresceram na integração de pagamento. Precisamos revisar critérios de entrada e aumentar testes de contrato”.'
        ],
        bullets: [
          'Cobertura sem criticidade pode gerar falsa segurança.',
          'Tempo de correção impacta lead time e previsibilidade.',
          'Defeitos críticos por área ajudam a redirecionar esforço.',
          'Risco remanescente deve aparecer explicitamente no relatório.'
        ]
      }
    ],
    exerciseTitle: 'Passo a passo do exercício prático',
    exerciseIntro: 'Você vai estruturar um mini-plano de teste para carrinho de compras com foco em objetivo, escopo, critérios e risco.',
    steps: [
      'Defina o objetivo do teste em uma frase clara, por exemplo: validar adição, remoção, cálculo de subtotal e aplicação de cupom no carrinho.',
      'Separe o escopo em itens dentro e fora do teste. Exemplo: dentro do escopo está cupom; fora do escopo está gateway de pagamento.',
      'Crie critérios de entrada, como ambiente disponível, massa de teste pronta e build homologada.',
      'Crie critérios de saída, como zero defeitos blocker, execução de 100% dos cenários críticos e validação dos cálculos principais.',
      'Feche com uma tabela simples de riscos priorizados, classificando impacto e probabilidade.'
    ],
    deliverables: [
      'Objetivo e escopo do plano.',
      'Critérios de entrada e saída.',
      'Tabela de riscos priorizados.'
    ]
  },
  'module-3': {
    summary: 'Aqui o conteúdo evolui de conceitos básicos para execução prática de testes manuais com profundidade profissional, cobrindo estrutura de casos, heurísticas e registro de defeitos.',
    sections: [
      {
        heading: 'Estratégia de cobertura em testes manuais',
        paragraphs: [
          'Testar manualmente não significa clicar aleatoriamente. Uma estratégia de cobertura profissional combina cenários positivos, negativos, alternativos, de borda, de integração e de usabilidade. O profissional de Quality Assurance precisa decidir o que é essencial em função de risco, frequência de uso e criticidade de negócio.',
          'Além disso, bons testes manuais equilibram roteiro e observação. Um caso de teste estruturado garante repetibilidade. Já o olhar exploratório permite identificar mensagens confusas, comportamento inesperado ou lacunas de requisito que um roteiro formal talvez não cubra.'
        ],
        bullets: [
          'Cobrir fluxo principal e fluxos alternativos.',
          'Validar limites e entradas inválidas.',
          'Observar consistência visual e feedback ao usuário.',
          'Registrar evidências sempre que o resultado fugir do esperado.'
        ]
      },
      {
        heading: 'Como escrever defeitos que realmente ajudam o time',
        paragraphs: [
          'Um defeito bem reportado economiza tempo de triagem, acelera a correção e evita retrabalho. O título precisa ser objetivo. Os passos de reprodução devem ser claros. O resultado atual e o resultado esperado precisam ser comparáveis. O ambiente deve estar explícito, especialmente quando o problema depende de navegador, build, usuário ou massa de dados.',
          'O bug report também deve dar contexto. Informar que o problema ocorreu durante cadastro com email já existente, em navegador específico e com resposta 500 no console muda completamente a qualidade da investigação.'
        ],
        bullets: [
          'Use título que identifique contexto e falha.',
          'Separe resultado esperado de resultado atual.',
          'Inclua ambiente, build e dados usados.',
          'Anexe evidência: screenshot, vídeo, log ou payload.'
        ]
      }
    ],
    exerciseTitle: 'Passo a passo do exercício prático',
    exerciseIntro: 'Você vai produzir três casos de teste para cadastro e dois defeitos esperados, como se estivesse preparando a documentação inicial de Quality Assurance.',
    steps: [
      'Escolha o fluxo de cadastro com campos obrigatórios, validação de email e confirmação de senha.',
      'Escreva o primeiro caso de teste para cadastro válido, incluindo pré-condição, passos, dados e resultado esperado.',
      'Escreva o segundo caso para erro de email inválido e o terceiro para senha e confirmação divergentes.',
      'Agora imagine 2 defeitos prováveis, por exemplo: mensagem incorreta para email duplicado e campo senha aceitando menos caracteres do que a regra diz.',
      'Finalize organizando os materiais em uma tabela com ID, objetivo, passos, resultado esperado e observações.'
    ],
    deliverables: [
      'Três casos de teste estruturados.',
      'Dois defeitos esperados com descrição clara.',
      'Tabela final pronta para execução ou revisão.'
    ]
  },
  'module-4': {
    summary: 'O módulo passa a cobrir decisões reais de automação: retorno sobre investimento, desenho da suíte, manutenção e critérios para não automatizar de forma precipitada.',
    sections: [
      {
        heading: 'Como decidir o que automatizar primeiro',
        paragraphs: [
          'Automação madura começa por casos frequentes, estáveis e críticos. Login, jornadas principais de compra, smoke tests de API, validações de contrato e cenários de regressão recorrentes normalmente geram alto retorno. Já fluxos instáveis ou sujeitos a redesenho constante podem consumir mais manutenção do que benefício.',
          'Outro critério relevante é a pirâmide de testes. Nem tudo deve ir para UI. Muitos cenários ficam mais rápidos, baratos e confiáveis em camadas unitária, integração ou API. Uma boa estratégia evita o erro comum de concentrar tudo em testes E2E frágeis.'
        ],
        bullets: [
          'Priorize cenários críticos e repetitivos.',
          'Automatize na camada mais barata possível.',
          'Considere custo de manutenção ao decidir.',
          'Use automação para acelerar feedback e regressão.'
        ]
      },
      {
        heading: 'Sustentação da suíte automatizada',
        paragraphs: [
          'Automação não termina quando o primeiro teste passa. É preciso organizar dados de teste, isolamento entre cenários, convenção de nomenclatura, relatórios e estratégia de execução em CI/CD. Sem isso, a suíte envelhece rápido e perde credibilidade.',
          'Um curso de verdade também precisa reforçar o lado de engenharia: reaproveitamento com Page Object ou Screenplay, factories de dados, redução de flakiness e observabilidade para identificar a causa das falhas.'
        ],
        bullets: [
          'Padronize estrutura e nome dos testes.',
          'Controle dados e dependências externas.',
          'Separe falha de produto de falha de automação.',
          'Gere relatórios claros para decisão rápida.'
        ]
      }
    ],
    exerciseTitle: 'Passo a passo do exercício prático',
    exerciseIntro: 'Você vai escolher dois casos manuais e justificar tecnicamente por que eles devem virar automação.',
    steps: [
      'Volte ao módulo de testes manuais e selecione dois casos recorrentes, por exemplo login válido e criação de usuário via API.',
      'Para cada caso, responda: ele é repetitivo? crítico? estável? executado em toda regressão?',
      'Defina a melhor camada de automação: UI, API, integração ou unitário. Justifique a escolha.',
      'Escreva uma mini-estratégia com ferramenta, dados necessários, frequência de execução e evidência esperada.',
      'Conclua comparando custo inicial da automação com o ganho em tempo e cobertura ao longo do projeto.'
    ],
    deliverables: [
      'Dois cenários candidatos à automação.',
      'Justificativa técnica de priorização.',
      'Estratégia de implementação e execução.'
    ]
  },
  'module-5': {
    summary: 'Este complemento apresenta o ecossistema de ferramentas como um fluxo integrado, mostrando como gestão, execução, rastreabilidade e pipeline se conectam na prática.',
    sections: [
      {
        heading: 'Ferramentas como cadeia de trabalho',
        paragraphs: [
          'Em um ambiente profissional, as ferramentas não vivem isoladas. O caso de teste nasce no gerenciamento, a evidência pode ser anexada no rastreador de defeitos, o build é executado no pipeline e os resultados voltam para dashboards e relatórios. Entender essas conexões é tão importante quanto conhecer o nome de cada ferramenta.',
          'Um profissional de Quality Assurance de maior senioridade sabe escolher o conjunto mais adequado para o contexto do time. Nem sempre a ferramenta “mais famosa” é a melhor. O critério inclui orçamento, curva de aprendizado, integração com stack existente e maturidade da equipe.'
        ],
        bullets: [
          'Ferramentas devem apoiar o processo, não complicá-lo.',
          'Integração reduz retrabalho e duplicidade de informação.',
          'Escolha depende de contexto, orçamento e stack.',
          'Métricas só têm valor se os dados forem consistentes.'
        ]
      },
      {
        heading: 'Boas práticas de uso no dia a dia',
        paragraphs: [
          'Coleções de API precisam ser versionadas. Casos de teste precisam de revisão. Pipelines devem separar feedback rápido de feedback profundo. Dashboards não devem esconder problemas. E o rastreador de defeitos deve refletir o fluxo real do time, com estados úteis e critérios de entrada e saída claros.',
          'Outra prática valiosa é manter um catálogo interno de ferramentas: para que serve, quando usar, quem é responsável, como se integra e quais limitações já foram observadas em projetos anteriores.'
        ],
        bullets: [
          'Versione coleções, scripts e massa de teste.',
          'Evite excesso de estados no fluxo de bugs.',
          'Padronize evidências e nomenclaturas.',
          'Documente limites e acordos de uso das ferramentas.'
        ]
      }
    ],
    exerciseTitle: 'Passo a passo do exercício prático',
    exerciseIntro: 'Você vai montar uma stack mínima de Qualidade de Software para um projeto com testes manuais, automação e gestão de defeitos.',
    steps: [
      'Defina o cenário: por exemplo, uma aplicação web com frontend, API e deploy contínuo.',
      'Escolha uma ferramenta para gestão de testes, uma para bug tracking, uma para API, uma para automação UI e uma para CI/CD.',
      'Para cada ferramenta, escreva por que ela foi escolhida e em que momento do processo será usada.',
      'Desenhe o fluxo: requisito vira caso de teste, execução gera evidência, defeito vai para rastreamento, automação roda no pipeline.',
      'Finalize apontando integrações desejadas entre as ferramentas e quais relatórios você pretende extrair.'
    ],
    deliverables: [
      'Mapa da stack de Qualidade de Software.',
      'Justificativa de escolha por ferramenta.',
      'Fluxo operacional entre requisitos, testes, bugs e pipeline.'
    ]
  },
  'module-6': {
    summary: 'O módulo agora aprofunda a atuação de Quality Assurance em times ágeis, cobrindo colaboração, refinamento, critérios de aceite e o papel da qualidade em ciclos curtos e contínuos.',
    sections: [
      {
        heading: 'Quality Assurance como agente de clareza em times ágeis',
        paragraphs: [
          'Em contextos ágeis, Quality Assurance não entra apenas no fim da sprint. O profissional ajuda a esclarecer histórias, levantar riscos cedo e reduzir retrabalho. Uma boa pergunta no refinement pode evitar dias de desenvolvimento em cima de um requisito ambíguo.',
          'Isso exige participação ativa em ceremonies, leitura crítica de histórias, validação de critérios de aceitação e alinhamento com desenvolvimento e produto. Quanto menor o ciclo de entrega, maior a importância de detectar ruído cedo.'
        ],
        bullets: [
          'Questionar ambiguidades antes do desenvolvimento.',
          'Transformar critérios de aceitação em cenários testáveis.',
          'Antecipar risco técnico e operacional.',
          'Acompanhar qualidade como parte do fluxo, não da etapa final.'
        ]
      },
      {
        heading: 'DevOps, BDD e Definition of Done na prática',
        paragraphs: [
          'BDD e ATDD ajudam a alinhar negócio, desenvolvimento e Quality Assurance em torno do comportamento esperado. Já o DevOps amplia a responsabilidade da qualidade para o pipeline, infraestrutura, monitoramento e feedback contínuo. Quality Assurance deixa de atuar apenas em funcionalidade e passa a influenciar a forma como o software é entregue.',
          'A Definition of Done precisa refletir essa maturidade. Não basta “código pronto”; o item precisa incluir testes, evidências, documentação mínima, validação de ambiente e ausência de riscos críticos remanescentes.'
        ],
        bullets: [
          'BDD aproxima requisito e teste.',
          'DevOps amplia a visão de qualidade para entrega contínua.',
          'DoD bem definida reduz discussão subjetiva sobre “pronto”.',
          'Quality Assurance contribui com prevenção e observabilidade.'
        ]
      }
    ],
    exerciseTitle: 'Passo a passo do exercício prático',
    exerciseIntro: 'Você vai montar um roteiro de daily standup em que o profissional de Quality Assurance comunica progresso, risco e bloqueios com objetividade.',
    steps: [
      'Escolha um contexto simples, como uma sprint que está entregando login, cadastro e recuperação de senha.',
      'Escreva o que o profissional de Quality Assurance fez ontem: por exemplo, revisou critérios, executou casos críticos e abriu dois defeitos major.',
      'Escreva o plano de hoje: criar cenários de regressão, validar correções e preparar smoke test para staging.',
      'Liste um bloqueio realista, como ausência de ambiente, massa de dados incompleta ou endpoint instável.',
      'Finalize com uma frase objetiva de risco, mostrando impacto caso o bloqueio permaneça até o fim da sprint.'
    ],
    deliverables: [
      'Roteiro curto de daily standup.',
      'Bloqueio com impacto descrito.',
      'Plano de ação para o restante do dia.'
    ]
  },
  'module-7': {
    summary: 'O conteúdo de segurança foi aprofundado para aproximar o aluno da lógica de ataque e defesa, com foco em risco real, evidência técnica e documentação responsável.',
    sections: [
      {
        heading: 'Pensamento orientado a risco em segurança',
        paragraphs: [
          'Testar segurança não é sair executando payloads sem contexto. O primeiro passo é entender superfície de ataque, ativos críticos e impacto de exploração. Em muitos casos, o problema mais grave não é a vulnerabilidade em si, mas o dado exposto, a permissão indevida ou a ausência de rastreabilidade do incidente.',
          'Quality Assurance pode contribuir muito ao testar autenticação, autorização, exposição de informações sensíveis, mensagens de erro excessivas, sessão, headers, validação de entrada e componentes desatualizados. Mesmo sem ser um especialista em pentest, o profissional de qualidade pode elevar muito o padrão do produto.'
        ],
        bullets: [
          'Mapear ativos críticos e pontos de entrada.',
          'Testar autenticação, sessão e autorização separadamente.',
          'Avaliar exposição de dados e mensagens sensíveis.',
          'Registrar evidências com responsabilidade e precisão.'
        ]
      },
      {
        heading: 'Como reportar achados de segurança',
        paragraphs: [
          'Defeitos de segurança precisam de severidade bem justificada. Não basta dizer “há falha de segurança”. É preciso informar o vetor, a condição, a evidência, o impacto e uma recomendação inicial. Isso ajuda o time a agir rápido e priorizar corretamente.',
          'Outro ponto fundamental é o cuidado com divulgação interna. Logs, payloads e dados reais devem ser tratados com responsabilidade, especialmente quando envolvem credenciais, PII ou acesso privilegiado.'
        ],
        bullets: [
          'Descreva vetor, pré-condição e impacto.',
          'Classifique severidade com critério.',
          'Anexe prova de conceito mínima e segura.',
          'Evite exposição desnecessária de dados sensíveis.'
        ]
      }
    ],
    exerciseTitle: 'Passo a passo do exercício prático',
    exerciseIntro: 'Você vai escolher dois itens do OWASP Top 10 e descrever como validaria cada um em um fluxo de cadastro.',
    steps: [
      'Escolha dois temas, por exemplo Injection e Broken Authentication.',
      'Descreva onde esses riscos poderiam aparecer no cadastro: campo de nome, email, senha, recuperação de conta, etc.',
      'Monte os testes: entradas maliciosas, tentativas inválidas repetidas, análise de mensagens de erro, checagem de logs e headers.',
      'Escreva o resultado esperado seguro para cada cenário, deixando claro o que a aplicação deveria fazer.',
      'Finalize com um mini-relatório de risco contendo vulnerabilidade, impacto, evidência e recomendação inicial.'
    ],
    deliverables: [
      'Dois cenários de segurança detalhados.',
      'Resultados esperados seguros.',
      'Mini-relatório com impacto e recomendação.'
    ]
  },
  'module-8': {
    summary: 'Este aprofundamento transforma performance em disciplina prática: definição de objetivos, leitura de métricas, investigação de gargalos e comunicação técnica com o time.',
    sections: [
      {
        heading: 'Como pensar um teste de performance de forma profissional',
        paragraphs: [
          'Performance não se resume a “quantos usuários simultâneos o sistema suporta”. Primeiro, defina objetivo: validar tempo de resposta sob carga normal? descobrir ponto de ruptura? medir estabilidade por várias horas? Cada pergunta pede um tipo de teste e métricas diferentes.',
          'Também é necessário estabelecer baseline e threshold. Sem isso, o número isolado perde significado. Uma média de 500 ms pode ser ótima em uma operação pesada e ruim em uma busca simples. O contexto define a leitura.'
        ],
        bullets: [
          'Comece pelo objetivo do teste.',
          'Defina baseline, threshold e volume esperado.',
          'Colete métricas de aplicação, infraestrutura e banco.',
          'Relacione resultado técnico ao impacto no usuário final.'
        ]
      },
      {
        heading: 'Interpretação e comunicação dos resultados',
        paragraphs: [
          'Um bom relatório de performance separa sintoma de causa provável. Exemplo: tempo de resposta cresceu após 150 usuários, CPU subiu pouco, mas memória e conexões com banco saturaram. Isso direciona investigação. Sem essa leitura, o time recebe apenas números sem ação clara.',
          'Em nível profissional, Quality Assurance também precisa recomendar próximos passos: repetir teste com cache aquecido, isolar endpoint, revisar consulta SQL, validar pool de conexões ou medir impacto de compressão e CDN.'
        ],
        bullets: [
          'Cruze métricas para formular hipótese técnica.',
          'Aponte comportamento antes, durante e após carga.',
          'Mostre risco para usuário e operação.',
          'Feche com ações recomendadas e prioridade.'
        ]
      }
    ],
    exerciseTitle: 'Passo a passo do exercício prático',
    exerciseIntro: 'Você vai desenhar um plano de load test para uma API de busca, conectando cenário, métricas e thresholds.',
    steps: [
      'Defina a API alvo, por exemplo uma busca de produtos por palavra-chave.',
      'Escolha o tipo de teste principal: load test com volume esperado de usuários simultâneos.',
      'Liste métricas obrigatórias: tempo médio, P95, throughput, taxa de erro, CPU, memória e conexões de banco.',
      'Defina thresholds, como P95 abaixo de 1 segundo e taxa de erro menor que 1%.',
      'Feche com plano de execução: ferramenta, duração, ramp-up, massa de dados e critério para considerar o resultado aceitável.'
    ],
    deliverables: [
      'Plano de carga com objetivo e cenário.',
      'Lista de métricas e thresholds.',
      'Critério de aceitação do teste.'
    ]
  },
  'module-9': {
    summary: 'O módulo de carreira foi ampliado para orientar o aluno como se posicionar no mercado, montar trilha de estudo e transformar aprendizado técnico em valor percebido por recrutadores e líderes.',
    sections: [
      {
        heading: 'Construção de posicionamento profissional',
        paragraphs: [
          'Crescer em Quality Assurance exige mais do que consumir conteúdo técnico. O profissional precisa construir evidência de capacidade: projetos, testes automatizados, relatórios, estudo de caso, GitHub, participação em comunidades e capacidade de explicar decisões. Recrutadores e líderes avaliam cada vez mais a clareza com que o candidato demonstra raciocínio de qualidade.',
          'Outro ponto importante é escolher um eixo de aprofundamento sem abandonar a base. Um profissional de Quality Assurance pode caminhar para automação, performance, segurança ou liderança, mas continua precisando dominar fundamentos, comunicação e visão de produto.'
        ],
        bullets: [
          'Construa evidências práticas do que sabe fazer.',
          'Mantenha base sólida antes de hiper-especializar.',
          'Aprenda a explicar impacto e decisão técnica.',
          'Atualize portfólio, currículo e presença profissional.'
        ]
      },
      {
        heading: 'Estratégia de evolução contínua',
        paragraphs: [
          'Uma carreira forte é construída por ciclos. Aprender, praticar, consolidar, mostrar resultado e buscar próximo nível. Isso vale para certificações, entrevistas, mudança de senioridade e movimentação salarial. O curso precisa ajudar o aluno a sair com direção, não apenas com inspiração.',
          'Por isso, a recomendação é manter um plano trimestral: fundamentos, projeto prático, automação básica, leitura de mercado, networking e revisão de currículo. Pequenos ciclos consistentes geram avanço real.'
        ],
        bullets: [
          'Planeje metas trimestrais e entregáveis.',
          'Associe estudo a projeto aplicado.',
          'Revise currículo e portfólio regularmente.',
          'Busque feedback técnico e de mercado.'
        ]
      }
    ],
    exerciseTitle: 'Passo a passo do exercício prático',
    exerciseIntro: 'Você vai transformar o conteúdo do módulo em um plano concreto de carreira e em um currículo mais forte para Quality Assurance.',
    steps: [
      'Abra o template de currículo do módulo e substitua as partes genéricas por sua experiência real, mesmo que seja acadêmica ou de projeto próprio.',
      'Liste três competências que você já possui e três lacunas que precisa desenvolver para a vaga que deseja.',
      'Monte um plano de 90 dias com estudo, prática e evidência: por exemplo SQL, API testing e automação básica.',
      'Atualize LinkedIn e GitHub com descrição profissional, tecnologias estudadas e um pequeno projeto de Quality Assurance.',
      'Finalize revisando sua narrativa de entrevista: como você testaria login, como reportaria defeitos e como estruturaria uma regressão.'
    ],
    deliverables: [
      'CV atualizado.',
      'Plano de carreira de 90 dias.',
      'Lista de competências atuais e lacunas prioritárias.'
    ]
  }
};

const MODULE_LEARNING_EXTRAS = {
  'module-1': {
    caseTitle: 'Estudo de caso: checkout com alta taxa de abandono',
    caseScenario: 'Uma loja virtual percebe queda de conversão no checkout após uma atualização. O profissional de Quality Assurance precisa analisar o fluxo, identificar riscos e propor validações prioritárias antes de um novo release.',
    caseTasks: [
      'Levante hipóteses de falha com impacto direto em conversão, como cálculo incorreto, falha no botão de pagamento ou mensagem confusa.',
      'Defina quais cenários devem ser testados primeiro com base em risco de negócio.',
      'Explique como você apresentaria esse risco para produto e desenvolvimento.'
    ],
    checklist: [
      'Consigo explicar o papel de Quality Assurance além de “testar bugs”.',
      'Sei relacionar risco técnico com impacto de negócio.',
      'Entendo o conceito de prevenção versus correção.',
      'Consigo listar responsabilidades centrais de Quality Assurance.',
      'Sei priorizar validações com foco no cliente final.'
    ],
    recap: [
      'Quality Assurance protege valor de negócio, não apenas qualidade técnica isolada.',
      'Prioridade de teste deve considerar impacto, frequência e criticidade.',
      'Comunicação clara é parte essencial do trabalho de Quality Assurance.'
    ]
  },
  'module-2': {
    caseTitle: 'Estudo de caso: release com prazo curto e ambiente instável',
    caseScenario: 'A equipe tem apenas dois dias para validar uma nova versão do carrinho, mas o ambiente de homologação apresenta instabilidade e o escopo mudou na última hora.',
    caseTasks: [
      'Defina o que entra e o que sai do escopo de testes dessa rodada.',
      'Monte critérios mínimos de entrada e saída realistas.',
      'Escolha as métricas que ajudam a comunicar risco remanescente ao time.'
    ],
    checklist: [
      'Entendo as etapas do STLC e o objetivo de cada uma.',
      'Sei definir critérios de entrada e saída.',
      'Consigo montar um mini-plano de teste objetivo.',
      'Sei usar métricas para apoiar decisão.',
      'Consigo comunicar risco residual com clareza.'
    ],
    recap: [
      'Planejamento organiza escopo, dependências e risco.',
      'Métricas devem orientar decisão, não apenas relatório.',
      'Critérios claros reduzem subjetividade na liberação.'
    ]
  },
  'module-3': {
    caseTitle: 'Estudo de caso: cadastro com múltiplas validações quebradas',
    caseScenario: 'Um formulário de cadastro começou a aceitar dados inválidos e a equipe não consegue reproduzir todos os problemas relatados pelo suporte.',
    caseTasks: [
      'Crie três casos de teste cobrindo cenário positivo, negativo e valor limite.',
      'Escreva um bug report com passos de reprodução e evidência esperada.',
      'Defina como você diferenciaria um defeito funcional de um problema de usabilidade.'
    ],
    checklist: [
      'Consigo estruturar um caso de teste completo.',
      'Sei diferenciar testes funcionais, exploratórios e de regressão.',
      'Consigo registrar defeitos com clareza e contexto.',
      'Entendo o valor de evidências e ambiente no bug report.',
      'Sei planejar cobertura de teste manual com critério.'
    ],
    recap: [
      'Teste manual precisa de estratégia, não de cliques aleatórios.',
      'Caso de teste bom é claro, reproduzível e verificável.',
      'Bug report forte acelera triagem e correção.'
    ]
  },
  'module-4': {
    caseTitle: 'Estudo de caso: regressão longa e repetitiva toda sprint',
    caseScenario: 'A equipe perde muitas horas validando os mesmos fluxos em toda sprint e quer decidir o que automatizar primeiro sem desperdiçar esforço.',
    caseTasks: [
      'Escolha dois fluxos com alto retorno para automação e justifique a escolha.',
      'Defina a camada ideal de automação para cada fluxo.',
      'Liste os principais cuidados para manter a suíte confiável ao longo do tempo.'
    ],
    checklist: [
      'Sei avaliar retorno sobre investimento em automação.',
      'Consigo escolher entre UI, API, integração ou unitário.',
      'Entendo o que não vale a pena automatizar.',
      'Conheço riscos de flakiness e manutenção.',
      'Consigo desenhar uma estratégia mínima de suíte.'
    ],
    recap: [
      'Automação deve começar pelo que é crítico e repetitivo.',
      'Nem todo teste precisa ir para UI.',
      'Suíte sustentável depende de dados, padronização e observabilidade.'
    ]
  },
  'module-5': {
    caseTitle: 'Estudo de caso: time com ferramentas desconectadas',
    caseScenario: 'Os casos de teste ficam em um lugar, os bugs em outro, o pipeline não publica resultados e ninguém confia nos relatórios de Quality Assurance.',
    caseTasks: [
      'Desenhe uma stack mínima conectando gestão, execução, bugs e CI/CD.',
      'Explique quais integrações são prioritárias e por quê.',
      'Liste riscos de operar com ferramentas sem padronização.'
    ],
    checklist: [
      'Consigo explicar o papel de cada categoria de ferramenta.',
      'Entendo o valor de integrações entre plataformas.',
      'Sei escolher ferramentas com base em contexto e não só popularidade.',
      'Consigo organizar um fluxo operacional entre requisito e evidência.',
      'Sei identificar excesso de complexidade no ecossistema.'
    ],
    recap: [
      'Ferramenta boa é a que melhora o processo real do time.',
      'Integração reduz retrabalho e aumenta rastreabilidade.',
      'Padronização é essencial para confiança em métricas e evidências.'
    ]
  },
  'module-6': {
    caseTitle: 'Estudo de caso: user story ambígua perto do fim da sprint',
    caseScenario: 'Uma história de login social está quase pronta, mas os critérios de aceitação não deixam claro como lidar com conta já existente e falha do provedor externo.',
    caseTasks: [
      'Escreva perguntas que o profissional de Quality Assurance faria no refinement.',
      'Transforme a história em cenários testáveis.',
      'Defina uma mini Definition of Done para essa entrega.'
    ],
    checklist: [
      'Entendo o papel de Quality Assurance em cerimônias ágeis.',
      'Consigo transformar critérios em cenários de teste.',
      'Sei explicar BDD, TDD e shift left com exemplos.',
      'Entendo o valor de DoD bem definida.',
      'Consigo comunicar risco em ciclos curtos de entrega.'
    ],
    recap: [
      'Quality Assurance em ágil atua cedo para reduzir retrabalho.',
      'BDD ajuda a alinhar requisito e comportamento esperado.',
      'Definition of Done forte melhora previsibilidade e qualidade.'
    ]
  },
  'module-7': {
    caseTitle: 'Estudo de caso: suspeita de falha de autenticação e exposição de dados',
    caseScenario: 'Usuários relatam comportamentos estranhos em recuperação de senha e o time teme vazamento de informações ou exploração do fluxo por atacantes.',
    caseTasks: [
      'Escolha dois riscos do OWASP Top 10 que mais se aplicam ao cenário.',
      'Descreva como testaria autenticação, sessão e mensagens de erro.',
      'Escreva um mini-relatório com impacto e recomendação inicial.'
    ],
    checklist: [
      'Consigo relacionar vulnerabilidade com impacto de negócio.',
      'Sei testar autenticação, autorização e sessão separadamente.',
      'Entendo o básico de ferramentas como ZAP e Burp.',
      'Sei registrar achados com responsabilidade.',
      'Consigo diferenciar risco real de ruído técnico.'
    ],
    recap: [
      'Segurança precisa ser tratada com contexto e risco.',
      'Nem toda vulnerabilidade tem o mesmo impacto.',
      'Relatório técnico bom acelera resposta e correção.'
    ]
  },
  'module-8': {
    caseTitle: 'Estudo de caso: API crítica degradando em horário de pico',
    caseScenario: 'A API de busca apresenta lentidão em campanhas promocionais. O time precisa saber se o problema está em aplicação, banco ou infraestrutura.',
    caseTasks: [
      'Defina o objetivo do teste de performance para esse cenário.',
      'Escolha métricas e thresholds que realmente ajudem a investigar.',
      'Descreva como transformaria os resultados em recomendação prática para o time.'
    ],
    checklist: [
      'Sei diferenciar load, stress, spike e endurance.',
      'Entendo baseline e threshold.',
      'Consigo montar um plano de performance objetivo.',
      'Sei ler resultado além da média de tempo de resposta.',
      'Consigo conectar dado técnico ao impacto no usuário.'
    ],
    recap: [
      'Teste de performance começa pelo objetivo, não pela ferramenta.',
      'Métrica isolada raramente conta a história completa.',
      'Relatório bom precisa apontar hipótese e próximos passos.'
    ]
  },
  'module-9': {
    caseTitle: 'Estudo de caso: preparação para vaga de Quality Assurance pleno',
    caseScenario: 'Um aluno já conhece fundamentos, mas precisa organizar currículo, portfólio e discurso técnico para disputar vagas melhores em Quality Assurance.',
    caseTasks: [
      'Monte três evidências concretas para colocar no currículo ou portfólio.',
      'Defina um plano de 90 dias com foco em evolução técnica.',
      'Escreva uma resposta curta para “como você estruturaria testes para login?”.'
    ],
    checklist: [
      'Consigo explicar minhas habilidades com clareza.',
      'Tenho plano de evolução técnica realista.',
      'Entendo trilhas de carreira em Quality Assurance.',
      'Sei transformar estudo em evidência prática.',
      'Consigo me posicionar melhor em entrevistas.'
    ],
    recap: [
      'Carreira forte exige estudo, prática e evidência.',
      'Base sólida vem antes da especialização profunda.',
      'Currículo e portfólio precisam mostrar resultado, não só intenção.'
    ]
  }
};

const LOGIN_MESSAGE_KEY = 'loginMessage';
let currentCourseProgress = JSON.parse(localStorage.getItem(COURSE_PROGRESS_STORAGE_KEY) || '{}');
let currentUserProfile = null;
let currentChallenges = {};
let currentChallengeHistory = {};

function getQuizRequiredCorrectAnswers(totalQuestions) {
  return Math.ceil(totalQuestions * (QUIZ_PASSING_PERCENT / 100));
}

function getModuleProgressEntry(progress, moduleId) {
  const entry = progress[moduleId];

  if (typeof entry === 'boolean') {
    return {
      completed: entry,
      quizPassed: entry,
      quizScore: entry ? getQuizRequiredCorrectAnswers(MODULE_QUIZZES[moduleId]?.questions.length || 0) : 0,
      quizTotal: MODULE_QUIZZES[moduleId]?.questions.length || 0,
      quizAttempted: entry,
    };
  }

  return {
    completed: Boolean(entry?.completed),
    quizPassed: Boolean(entry?.quizPassed),
    quizScore: Number(entry?.quizScore || 0),
    quizTotal: Number(entry?.quizTotal || MODULE_QUIZZES[moduleId]?.questions.length || 0),
    quizAttempted: Boolean(entry?.quizAttempted),
  };
}

function setModuleProgressEntry(progress, moduleId, updates) {
  const currentEntry = getModuleProgressEntry(progress, moduleId);
  progress[moduleId] = { ...currentEntry, ...updates };
}

function getModuleStatus(entry) {
  if (entry.completed) {
    return 'Concluído';
  }

  if (entry.quizPassed) {
    return 'Quiz aprovado';
  }

  if (entry.quizAttempted) {
    return 'Quiz pendente';
  }

  return 'Não iniciado';
}

function setLoginMessage(message) {
  if (message) {
    localStorage.setItem(LOGIN_MESSAGE_KEY, message);
  }
}

function getAuthToken() {
  return localStorage.getItem('token');
}

function getAuthHeaders(extraHeaders = {}) {
  const token = getAuthToken();
  return token ? { ...extraHeaders, Authorization: token } : extraHeaders;
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getStudentDisplayName() {
  const rawName = String(currentUserProfile?.name || '').trim();
  if (rawName) {
    return rawName;
  }

  return '';
}

function showLoginMessage() {
  const message = localStorage.getItem(LOGIN_MESSAGE_KEY);
  const messageElement = document.getElementById('msg');

  if (!message || !messageElement) {
    return;
  }

  messageElement.innerText = message;
  messageElement.classList.add('error');
  localStorage.removeItem(LOGIN_MESSAGE_KEY);
}

async function hasValidSession() {
  const token = getAuthToken();

  if (!token) {
    return false;
  }

  try {
    const res = await fetch(`${API_ORIGIN}/dashboard`, {
      headers: { Authorization: token }
    });

    if (!res.ok) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}

async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const res = await fetch(`${API_ORIGIN}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.success) {
    localStorage.setItem('token', data.token);
    window.location.href = 'dashboard.html';
  } else {
    document.getElementById('msg').innerText = data.message;
    document.getElementById('msg').classList.add('error');
  }
}

async function verifySession() {
  const token = getAuthToken();
  if (!token) {
    window.location.href = 'login.html';
    return false;
  }

  const res = await fetch(`${API_ORIGIN}/dashboard`, {
    headers: { Authorization: token }
  });

  if (!res.ok) {
    let message = 'Sua sessão expirou. Faça login novamente.';

    try {
      const data = await res.json();
      if (data?.error === 'Sessão encerrada por novo login em outro dispositivo') {
        message = 'Sua conta foi acessada em outro dispositivo. Faça login novamente para continuar.';
      }
    } catch (error) {
      console.error('Erro ao ler resposta de sessão:', error);
    }

    setLoginMessage(message);
    localStorage.removeItem('token');
    window.location.href = 'login.html';
    return false;
  }

  const data = await res.json();
  currentUserProfile = data.user;
  return true;
}

function loadCourseProgress() {
  return currentCourseProgress || {};
}

function saveCourseProgress(progress) {
  currentCourseProgress = progress;
  localStorage.setItem(COURSE_PROGRESS_STORAGE_KEY, JSON.stringify(progress));
}

function saveCurrentChallenges(challenges) {
  currentChallenges = challenges;
}

function getCurrentModuleChallenge(moduleId) {
  return currentChallenges[moduleId] || null;
}

async function persistModuleProgress(moduleId) {
  const progress = loadCourseProgress();
  const entry = getModuleProgressEntry(progress, moduleId);

  await fetch(`${API_ORIGIN}/progress`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify({
      moduleId,
      completed: entry.completed,
      quizPassed: entry.quizPassed,
      quizScore: entry.quizScore,
      quizTotal: entry.quizTotal,
      quizAttempted: entry.quizAttempted,
    })
  });
}

async function syncCourseProgressFromServer() {
  const res = await fetch(`${API_ORIGIN}/progress`, {
    headers: getAuthHeaders()
  });

  if (!res.ok) {
    return loadCourseProgress();
  }

  const data = await res.json();
  const serverProgress = data.progress || {};
  const localProgress = loadCourseProgress();

  if (Object.keys(serverProgress).length === 0 && Object.keys(localProgress).length > 0) {
    for (const moduleId of Object.keys(localProgress)) {
      await persistModuleProgress(moduleId);
    }
    return loadCourseProgress();
  }

  saveCourseProgress(serverProgress);
  return serverProgress;
}

async function syncChallengesFromServer() {
  const res = await fetch(`${API_ORIGIN}/challenges`, {
    headers: getAuthHeaders()
  });

  if (!res.ok) {
    return currentChallenges;
  }

  const data = await res.json();
  const nextChallenges = (data.challenges || []).reduce((acc, challenge) => {
    acc[challenge.moduleId] = challenge;
    return acc;
  }, {});

  saveCurrentChallenges(nextChallenges);
  return nextChallenges;
}

async function fetchChallengeHistory(moduleId) {
  const res = await fetch(`${API_ORIGIN}/challenge-submissions?moduleId=${encodeURIComponent(moduleId)}`, {
    headers: getAuthHeaders()
  });

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  const submissions = data.submissions || [];
  currentChallengeHistory[moduleId] = submissions;
  return submissions;
}

function formatChallengeDate(value) {
  if (!value) {
    return '';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short'
  }).format(date);
}

function buildChallengeCriteriaMarkup(criteria) {
  return (criteria || []).map((criterion) => `
    <li>
      <strong>${escapeHtml(criterion.label)}</strong>
      <span>${criterion.maxScore} pts</span>
    </li>
  `).join('');
}

function buildChallengeCriteriaResultMarkup(criteria) {
  return (criteria || []).map((criterion) => `
    <li>
      <strong>${escapeHtml(criterion.label)}</strong>
      <span>${criterion.score}/${criterion.maxScore}</span>
    </li>
  `).join('');
}

function buildChallengeConversationMarkup(submission, { compact = false } = {}) {
  if (!submission) {
    return '';
  }

  const feedbackMarkup = (submission.feedback || []).map((item) => `<li>${escapeHtml(item)}</li>`).join('');
  const criteriaMarkup = buildChallengeCriteriaResultMarkup(submission.criteria || []);
  const createdAt = submission.createdAt ? escapeHtml(formatChallengeDate(submission.createdAt)) : 'Agora mesmo';

  return `
    <div class="challenge-conversation ${compact ? 'compact' : ''}" data-cy="challenge-conversation-thread">
      <article class="challenge-message challenge-message-student" data-cy="challenge-student-message">
        <div class="challenge-message-meta">
          <span>Você</span>
          <time datetime="${escapeHtml(submission.createdAt || '')}">${createdAt}</time>
        </div>
        <div class="challenge-message-bubble">
          <p>${escapeHtml(submission.content || 'Resposta enviada.')}</p>
        </div>
      </article>
      <article class="challenge-message challenge-message-reviewer" data-cy="challenge-reviewer-message">
        <div class="challenge-message-meta">
          <span>Avaliador automático</span>
          <span class="challenge-score-badge ${submission.passed ? 'passed' : 'needs-work'}">
            ${submission.score}/${submission.maxScore}
          </span>
        </div>
        <div class="challenge-message-bubble">
          <p class="challenge-feedback-summary">
            ${submission.passed ? 'Aprovado no desafio.' : 'Ainda precisa reforçar alguns critérios.'}
          </p>
          <ul class="detail-list challenge-feedback-list">${feedbackMarkup}</ul>
          <ul class="challenge-criteria-result-list">${criteriaMarkup}</ul>
        </div>
      </article>
    </div>
  `;
}

function buildInteractivePanelMarkup({ panelId, title, description, bodyMarkup, dataCy }) {
  return `
    <section class="module-interactive-panel" id="${panelId}" data-cy="${dataCy}">
      <div class="module-interactive-panel-header">
        <button
          type="button"
          class="module-interactive-toggle"
          aria-expanded="false"
          aria-controls="${panelId}-content"
          data-target-panel="${panelId}"
          data-cy="${dataCy}-toggle"
        >
          <span class="module-interactive-toggle-copy">
            <span class="module-interactive-toggle-title">${escapeHtml(title)}</span>
            ${description ? `<span class="module-interactive-toggle-description">${escapeHtml(description)}</span>` : ''}
          </span>
          <span class="module-interactive-toggle-indicator" aria-hidden="true">Expandir</span>
        </button>
      </div>
      <div class="module-interactive-panel-body" id="${panelId}-content" hidden>
        ${bodyMarkup}
      </div>
    </section>
  `;
}

function buildChallengeLatestSubmissionMarkup(latestSubmission) {
  if (!latestSubmission) {
    return `
      <div class="challenge-feedback-panel empty" data-cy="challenge-empty-state">
        <p>Nenhuma submissão enviada ainda. Envie sua resposta para abrir a conversa com a correção automática.</p>
      </div>
    `;
  }

  return `
    <div class="challenge-feedback-panel ${latestSubmission.passed ? 'passed' : 'needs-work'}" data-cy="challenge-latest-result">
      <div class="challenge-feedback-header">
        <h4>Última conversa de avaliação</h4>
      </div>
      <p class="challenge-feedback-meta">
        ${latestSubmission.createdAt ? `Tentativa registrada em ${escapeHtml(formatChallengeDate(latestSubmission.createdAt))}.` : 'Tentativa registrada agora mesmo.'}
      </p>
      ${buildChallengeConversationMarkup(latestSubmission)}
    </div>
  `;
}

function buildChallengeHistoryMarkup(submissions) {
  if (!submissions.length) {
    return '<p class="challenge-history-empty">O histórico das tentativas aparecerá aqui.</p>';
  }

  return `
    <div class="challenge-history-list">
      ${submissions.map((submission) => `
        <section class="challenge-history-entry">
          <div class="challenge-history-entry-header">
            <span>${escapeHtml(formatChallengeDate(submission.createdAt) || 'Tentativa recente')}</span>
            <strong>${submission.score}/${submission.maxScore}</strong>
            <span>${submission.passed ? 'Aprovado' : 'Revisar'}</span>
          </div>
          ${buildChallengeConversationMarkup(submission, { compact: true })}
        </section>
      `).join('')}
    </div>
  `;
}

function buildChallengeMarkup(moduleId) {
  const challenge = getCurrentModuleChallenge(moduleId);
  const content = MODULE_DETAILED_CONTENT[moduleId];
  if (!challenge) {
    return '';
  }

  const history = currentChallengeHistory[moduleId] || [];
  const stepsMarkup = (content?.steps || []).map((step) => `<li>${step}</li>`).join('');
  const deliverablesMarkup = (content?.deliverables || []).map((item) => `<li>${item}</li>`).join('');

  const bodyMarkup = `
    <section class="challenge-card" data-cy="module-challenge-card-content">
      <div class="challenge-header">
        <div>
          <h3>${escapeHtml(challenge.title)}</h3>
          <p>${escapeHtml(challenge.description)}</p>
        </div>
        <span class="challenge-pass-target">Meta mínima: ${challenge.passingScore}/100</span>
      </div>
      ${content ? `
        <div class="resource-card challenge-walkthrough-card">
          <h4>${escapeHtml(content.exerciseTitle)}</h4>
          <p>${escapeHtml(content.exerciseIntro)}</p>
          <ol class="step-list">${stepsMarkup}</ol>
          <h4>Entregáveis esperados</h4>
          <ul class="detail-list">${deliverablesMarkup}</ul>
        </div>
      ` : ''}
      <div class="challenge-layout">
        <div class="challenge-brief resource-card">
          <h4>Rubrica automática</h4>
          <ul class="challenge-criteria-list">
            ${buildChallengeCriteriaMarkup(challenge.criteria)}
          </ul>
          <p class="challenge-guidance">Escreva com clareza, justificativa e termos técnicos do módulo. A avaliação mede cobertura dos critérios e nível de detalhamento.</p>
        </div>
        <form class="challenge-form resource-card" id="module-challenge-form" data-module-id="${escapeHtml(moduleId)}" data-cy="module-challenge-form">
          <label class="challenge-form-label" for="challenge-content">${escapeHtml(challenge.submissionLabel)}</label>
          <textarea id="challenge-content" name="content" rows="10" minlength="80" placeholder="${escapeHtml(challenge.placeholder)}" data-cy="challenge-content"></textarea>
          <div class="challenge-form-actions">
            <span class="challenge-min-length">Recomendado: pelo menos ${challenge.minLength} caracteres.</span>
            <button type="submit" class="primary-button" data-cy="challenge-submit">Enviar para avaliação</button>
          </div>
          <p class="challenge-form-hint">Sua resposta entra na conversa abaixo e recebe devolutiva imediata com nota, critérios e pontos a reforçar.</p>
          <p class="challenge-submit-message" id="challenge-submit-message" aria-live="polite"></p>
        </form>
      </div>
      <div class="challenge-results-grid">
        <div id="challenge-latest-result-container">
          ${buildChallengeLatestSubmissionMarkup(challenge.latestSubmission)}
        </div>
        <div class="challenge-history-panel resource-card" data-cy="challenge-history-panel">
          <div class="challenge-feedback-header">
            <h4>Conversas anteriores</h4>
          </div>
          <div id="challenge-history-container">
            ${buildChallengeHistoryMarkup(history)}
          </div>
        </div>
      </div>
    </section>
  `;

  return buildInteractivePanelMarkup({
    panelId: 'module-challenge',
    title: 'Desafio prático do módulo',
    description: 'Abra este bloco para ver o passo a passo do exercício, enviar sua resposta escrita e receber avaliação automática.',
    bodyMarkup,
    dataCy: 'module-challenge',
  });
}

function setChallengeSubmitMessage(message, tone = 'neutral') {
  const messageElement = document.getElementById('challenge-submit-message');
  if (!messageElement) {
    return;
  }

  messageElement.textContent = message;
  messageElement.className = 'challenge-submit-message';
  if (tone !== 'neutral') {
    messageElement.classList.add(tone);
  }
}

function refreshChallengePanels(moduleId) {
  const challenge = getCurrentModuleChallenge(moduleId);
  if (!challenge) {
    return;
  }

  const latestContainer = document.getElementById('challenge-latest-result-container');
  const historyContainer = document.getElementById('challenge-history-container');

  if (latestContainer) {
    latestContainer.innerHTML = buildChallengeLatestSubmissionMarkup(challenge.latestSubmission);
  }

  if (historyContainer) {
    historyContainer.innerHTML = buildChallengeHistoryMarkup(currentChallengeHistory[moduleId] || []);
  }
}

async function handleChallengeSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const moduleId = form.dataset.moduleId;
  const contentField = form.querySelector('textarea[name="content"]');
  const submitButton = form.querySelector('button[type="submit"]');
  const content = String(contentField?.value || '').trim();

  if (!moduleId || !contentField) {
    return;
  }

  if (content.length < 80) {
    setChallengeSubmitMessage('Escreva uma resposta mais completa antes de enviar.', 'error');
    return;
  }

  setChallengeSubmitMessage('Avaliando sua resposta...');
  if (submitButton) {
    submitButton.disabled = true;
  }

  try {
    const res = await fetch(`${API_ORIGIN}/challenge-submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify({ moduleId, content })
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Não foi possível avaliar o desafio.');
    }

    const challenge = getCurrentModuleChallenge(moduleId);
    if (challenge) {
      challenge.latestSubmission = data.submission;
    }

    currentChallengeHistory[moduleId] = [
      data.submission,
      ...(currentChallengeHistory[moduleId] || [])
    ].slice(0, 10);

    refreshChallengePanels(moduleId);
    setChallengeSubmitMessage('Avaliação concluída. O resultado já foi salvo no seu histórico.', 'success');
  } catch (error) {
    console.error('Erro ao enviar desafio:', error);
    setChallengeSubmitMessage(error.message || 'Erro ao enviar desafio.', 'error');
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
    }
  }
}

async function renderModuleChallenge() {
  const moduleId = document.body.dataset.module;
  const sectionBody = document.querySelector('.section-body');

  if (!moduleId || !sectionBody || document.getElementById('module-challenge')) {
    return;
  }

  const challenge = getCurrentModuleChallenge(moduleId);
  if (!challenge) {
    return;
  }

  if (!currentChallengeHistory[moduleId]) {
    await fetchChallengeHistory(moduleId);
  }

  const markup = buildChallengeMarkup(moduleId);
  if (!markup) {
    return;
  }

  sectionBody.insertAdjacentHTML('beforeend', markup);
  initializeModuleInteractivePanels();
  document.getElementById('module-challenge-form')?.addEventListener('submit', handleChallengeSubmit);
}

function getCompletedCount(progress) {
  return MODULES.filter((moduleId) => getModuleProgressEntry(progress, moduleId).completed).length;
}

function updateDashboardProgress() {
  const progress = loadCourseProgress();
  const completed = getCompletedCount(progress);
  const total = MODULES.length;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  const progressCount = document.getElementById('progress-count');
  const progressFill = document.getElementById('progress-fill');

  if (progressCount) {
    progressCount.textContent = `${completed} de ${total} módulos concluídos (${percent}%)`;
  }
  if (progressFill) {
    progressFill.style.width = `${percent}%`;
  }

  const certificateBadge = document.getElementById('certificate-status');
  if (certificateBadge) {
    certificateBadge.textContent = completed === total
      ? 'Certificado liberado'
      : `Conclua ${total - completed} módulo(s) para liberar o certificado`;
  }

  document.querySelectorAll('.module-card').forEach((card) => {
    const moduleId = card.dataset.module;
    const statusText = card.querySelector('.status-text');
    const entry = getModuleProgressEntry(progress, moduleId);
    const badge = card.querySelector('.module-status-badge');

    card.classList.remove('completed');
    badge?.classList.remove('completed', 'in-progress');

    if (entry.completed) {
      card.classList.add('completed');
      if (statusText) statusText.textContent = 'Concluído';
      badge?.classList.add('completed');
    } else {
      if (statusText) statusText.textContent = getModuleStatus(entry);
      if (entry.quizPassed || entry.quizAttempted) {
        badge?.classList.add('in-progress');
      }
    }
  });
}

function getCourseCompletionDate(progress) {
  const completionDates = MODULES
    .map((moduleId) => getModuleProgressEntry(progress, moduleId).updatedAt)
    .filter(Boolean)
    .sort();

  return completionDates.length ? completionDates[completionDates.length - 1] : new Date().toISOString();
}

function buildCertificateValidationCode(issuedAtIso) {
  const base = [
    CERTIFICATE_ORGANIZATION.slice(0, 4).toUpperCase(),
    String(currentUserProfile?.id || '0000').padStart(4, '0'),
    issuedAtIso.slice(0, 10).replace(/-/g, ''),
  ].join('-');

  return base;
}

function buildCertificateMarkup() {
  const progress = loadCourseProgress();
  const completed = getCompletedCount(progress);
  const total = MODULES.length;

  if (completed < total) {
    return `
      <div class="resource-card certificate-locked-card" data-cy="certificate-locked-card">
        <h3>Certificado de conclusão</h3>
        <p>Finalize todos os ${total} módulos e aprove os quizzes mínimos para liberar seu certificado.</p>
        <p id="certificate-status" class="certificate-status" data-cy="certificate-status">Conclua ${total - completed} módulo(s) para liberar o certificado</p>
      </div>
    `;
  }

  const issuedAt = new Date(getCourseCompletionDate(progress)).toLocaleDateString('pt-BR');
  const issuedAtIso = getCourseCompletionDate(progress);
  const studentName = getStudentDisplayName();
  const validationCode = buildCertificateValidationCode(issuedAtIso);

  if (!studentName) {
    return `
      <div class="certificate-card certificate-card-pending-name" data-cy="certificate-pending-card">
        <div class="certificate-frame certificate-frame-pending">
          <p class="certificate-label">Último passo</p>
          <h3>Emita o certificado com o nome do aluno</h3>
          <p class="certificate-text">Informe o nome completo que deve aparecer no certificado. Esse nome ficará salvo no perfil do aluno.</p>
          <form class="certificate-name-form" onsubmit="handleCertificateNameSubmit(event)" data-cy="certificate-name-form">
            <label for="certificateStudentName">Nome completo no certificado</label>
            <input id="certificateStudentName" name="certificateStudentName" type="text" placeholder="Ex.: Maria Fernanda Souza" minlength="3" required data-cy="certificate-name-input">
            <button type="submit" class="primary-button" data-cy="certificate-name-submit">Salvar nome e emitir certificado</button>
          </form>
          <p id="certificate-name-message" class="certificate-status" data-cy="certificate-name-message"></p>
        </div>
      </div>
    `;
  }

  return `
    <div class="certificate-card" id="certificate-card" data-cy="certificate-card">
      <div class="certificate-frame">
        <div class="certificate-corner certificate-corner-left"></div>
        <div class="certificate-corner certificate-corner-right"></div>
        <div class="certificate-brand">
          <img src="imagens/favicon.png" alt="Logo Qualimentor" class="certificate-logo">
          <div>
            <p class="certificate-org">${CERTIFICATE_ORGANIZATION}</p>
            <p class="certificate-cnpj">CNPJ ${CERTIFICATE_CNPJ}</p>
          </div>
        </div>
        <p class="certificate-label">Certificado de Conclusão</p>
        <h3>Curso Completo de Qualidade de Software</h3>
        <p class="certificate-text">Certificamos que</p>
        <p class="certificate-student">${escapeHtml(studentName)}</p>
        <p class="certificate-text">concluiu com aproveitamento a trilha completa de Qualidade de Software, validando o aprendizado com exercícios e questionários ao longo dos 9 módulos do programa.</p>
        <div class="certificate-seal">Qualimentor</div>
        <div class="certificate-digital-signature">
          <p class="digital-signature-label">Assinado digitalmente por</p>
          <p class="digital-signature-script">Qualimentor</p>
          <p class="digital-signature-meta">Documento validado internamente em ${issuedAt}</p>
        </div>
        <div class="certificate-footer">
          <div>
            <strong>Emitido em</strong>
            <p>${issuedAt}</p>
          </div>
          <div>
            <strong>Instituição</strong>
            <p>${CERTIFICATE_ORGANIZATION}</p>
          </div>
          <div>
            <strong>Validação</strong>
            <p>Exercícios + questionários</p>
          </div>
          <div>
            <strong>ID do certificado</strong>
            <p>${validationCode}</p>
          </div>
        </div>
        <div class="certificate-signature">
          <span></span>
          <p>Diretoria Qualimentor</p>
        </div>
      </div>
      <div class="certificate-actions" data-cy="certificate-actions">
        <button type="button" class="primary-button" onclick="printCertificate()" data-cy="certificate-print-button">Imprimir certificado</button>
        <p id="certificate-status" class="certificate-status" data-cy="certificate-status">Certificado liberado</p>
      </div>
    </div>
  `;
}

function renderCertificateSection() {
  const container = document.getElementById('courseCertificateContainer');
  if (!container) {
    return;
  }

  container.innerHTML = buildCertificateMarkup();
}

async function handleCertificateNameSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const input = form.querySelector('input[name="certificateStudentName"]');
  const message = document.getElementById('certificate-name-message');
  const name = input?.value?.trim() || '';

  if (!name) {
    if (message) {
      message.textContent = 'Informe o nome completo para emitir o certificado.';
    }
    return;
  }

  if (message) {
    message.textContent = 'Salvando nome do aluno...';
  }

  const res = await fetch(`${API_ORIGIN}/profile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ name })
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    if (message) {
      message.textContent = data.message || 'Não foi possível salvar o nome do certificado.';
    }
    return;
  }

  currentUserProfile = data.user;
  renderCertificateSection();
}

function printCertificate() {
  const certificateMarkup = document.getElementById('certificate-card')?.innerHTML;
  if (!certificateMarkup) {
    return;
  }

  const printWindow = window.open('', '_blank', 'width=1100,height=800');
  if (!printWindow) {
    return;
  }

  printWindow.document.write(`
    <html lang="pt-BR">
      <head>
        <title>Certificado Qualimentor</title>
        <style>
          body { font-family: Georgia, serif; margin: 0; padding: 32px; background: linear-gradient(135deg, #e2e8f0, #f8fafc); }
          .certificate-frame { position: relative; border: 14px solid #0f172a; padding: 56px; background: linear-gradient(145deg, #ffffff, #eff6ff); min-height: 80vh; overflow: hidden; }
          .certificate-corner { position: absolute; width: 120px; height: 120px; border: 2px solid #0369a1; opacity: 0.2; }
          .certificate-corner-left { top: 18px; left: 18px; border-right: 0; border-bottom: 0; }
          .certificate-corner-right { top: 18px; right: 18px; border-left: 0; border-bottom: 0; }
          .certificate-brand { display: flex; align-items: center; gap: 18px; margin-bottom: 32px; }
          .certificate-logo { width: 72px; height: 72px; object-fit: contain; }
          .certificate-org { margin: 0; font-size: 1.4rem; font-weight: 700; }
          .certificate-cnpj, .certificate-label, .certificate-text { margin: 0; color: #334155; }
          h3 { font-size: 2.5rem; margin: 24px 0 16px; color: #0f172a; }
          .certificate-student { font-size: 2.3rem; margin: 16px 0; color: #0369a1; font-weight: 700; }
          .certificate-seal { position: absolute; right: 48px; bottom: 148px; width: 110px; height: 110px; border-radius: 50%; border: 3px solid #0369a1; display: grid; place-items: center; color: #0369a1; font-weight: 700; opacity: 0.8; }
          .certificate-digital-signature { margin-top: 26px; padding: 16px 20px; border-radius: 16px; background: rgba(3, 105, 161, 0.08); max-width: 340px; }
          .digital-signature-label, .digital-signature-meta { margin: 0; color: #334155; }
          .digital-signature-script { margin: 8px 0; font-size: 2rem; font-family: "Brush Script MT", "Segoe Script", cursive; color: #075985; }
          .certificate-footer { display: flex; justify-content: space-between; gap: 24px; margin-top: 48px; }
          .certificate-signature { margin-top: 42px; max-width: 240px; }
          .certificate-signature span { display: block; border-top: 1px solid #0f172a; margin-bottom: 10px; }
          .certificate-signature p { margin: 0; font-weight: 700; }
          .certificate-actions, .certificate-status { display: none; }
        </style>
      </head>
      <body>${certificateMarkup}</body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}

function updateModulePageProgress() {
  const moduleId = document.body.dataset.module;
  if (!moduleId) return;

  const progress = loadCourseProgress();
  const entry = getModuleProgressEntry(progress, moduleId);
  const completed = entry.completed;
  const quiz = MODULE_QUIZZES[moduleId];
  const quizTotal = quiz?.questions.length || 0;
  const requiredCorrectAnswers = getQuizRequiredCorrectAnswers(quizTotal);
  const statusText = document.getElementById('module-status-text');
  const percentText = document.getElementById('module-progress-percent');
  const button = document.getElementById('complete-module-button');
  const nextLink = document.getElementById('next-module-link');

  if (statusText) {
    statusText.textContent = getModuleStatus(entry);
  }
  if (percentText) {
    const percent = completed ? 100 : entry.quizPassed ? 85 : entry.quizAttempted ? 55 : 0;
    percentText.textContent = `${percent}%`;
  }
  if (button) {
    button.disabled = !completed && Boolean(quiz) && !entry.quizPassed;
    button.textContent = completed
      ? 'Marcar como não concluído'
      : entry.quizPassed
        ? 'Marcar módulo como concluído'
        : `Concluir após acertar ${requiredCorrectAnswers} de ${quizTotal}`;
  }

  const nextModulePage = {
    'module-1': 'process.html',
    'module-2': 'manual.html',
    'module-3': 'automation.html',
    'module-4': 'tools.html',
    'module-5': 'agile.html',
    'module-6': 'security.html',
    'module-7': 'performance.html',
    'module-8': 'career.html'
  }[moduleId];

  if (nextLink) {
    if (nextModulePage) {
      nextLink.href = nextModulePage;
      nextLink.style.display = 'inline-flex';
    } else {
      nextLink.style.display = 'none';
    }
  }
}

function buildQuizMarkup(moduleId) {
  const quiz = MODULE_QUIZZES[moduleId];
  if (!quiz) return '';

  const requiredCorrectAnswers = getQuizRequiredCorrectAnswers(quiz.questions.length);

  const questionsMarkup = quiz.questions.map((question, index) => {
    const optionsMarkup = question.options.map((option, optionIndex) => `
      <label class="quiz-option" data-cy="quiz-option-label-${index}-${optionIndex}">
        <input type="radio" name="quiz-question-${index}" value="${optionIndex}" data-cy="quiz-option-input-${index}-${optionIndex}">
        <span>${option}</span>
      </label>
    `).join('');

    return `
      <fieldset class="quiz-question" data-question-index="${index}" data-correct-answer="${question.answer}" data-cy="quiz-question-${index}">
        <legend>${index + 1}. ${question.prompt}</legend>
        <div class="quiz-options">${optionsMarkup}</div>
        <p class="quiz-explanation" hidden data-cy="quiz-explanation-${index}">${question.explanation}</p>
      </fieldset>
    `;
  }).join('');

  const bodyMarkup = `
    <div class="quiz-card" data-cy="module-quiz-card-content">
      <div class="quiz-header" data-cy="module-quiz-header">
        <h3>${quiz.title}</h3>
        <p>${quiz.description}</p>
        <p class="quiz-requirement">Aproveitamento mínimo para concluir o módulo: ${requiredCorrectAnswers} de ${quiz.questions.length} acertos.</p>
      </div>
      <form id="module-quiz-form" class="quiz-form" data-cy="module-quiz-form">
        ${questionsMarkup}
        <div class="quiz-actions" data-cy="module-quiz-actions">
          <button type="submit" class="primary-button" data-cy="module-quiz-submit">Enviar respostas</button>
          <button type="button" id="reset-quiz-button" class="secondary-button" data-cy="module-quiz-reset">Refazer questionário</button>
        </div>
        <p id="quiz-result" class="quiz-result" aria-live="polite" data-cy="module-quiz-result"></p>
      </form>
    </div>
  `;

  return buildInteractivePanelMarkup({
    panelId: 'module-quiz',
    title: 'Questionário do módulo',
    description: 'Abra este bloco para responder as questões objetivas do módulo.',
    bodyMarkup,
    dataCy: 'module-quiz-card',
  });
}

function enhanceLogo() {
  document.querySelectorAll('.logo').forEach((logoElement) => {
    if (logoElement.querySelector('.site-logo')) {
      return;
    }

    const logoImage = document.createElement('img');
    logoImage.src = 'imagens/favicon.png';
    logoImage.alt = 'Logo QUALIMENTOR';
    logoImage.className = 'site-logo';
    logoElement.prepend(logoImage);
  });
}

function buildDetailedSectionMarkup(moduleId) {
  const content = MODULE_DETAILED_CONTENT[moduleId];
  if (!content) {
    return '';
  }

  const sectionsMarkup = content.sections.map((section) => {
    const paragraphs = (section.paragraphs || []).map((paragraph) => `<p>${paragraph}</p>`).join('');
    const bullets = (section.bullets || []).length
      ? `<ul class="detail-list">${section.bullets.map((item) => `<li>${item}</li>`).join('')}</ul>`
      : '';

    return `
      <div class="resource-card detailed-card">
        <h4>${section.heading}</h4>
        ${paragraphs}
        ${bullets}
      </div>
    `;
  }).join('');

  const bodyMarkup = `
    <div class="course-deep-dive" data-cy="module-deep-dive-content">
      <div class="resource-card detailed-summary-card">
        <p>${content.summary}</p>
      </div>
      <div class="deep-dive-grid">
        ${sectionsMarkup}
      </div>
    </div>
  `;

  return buildInteractivePanelMarkup({
    panelId: 'module-deep-dive',
    title: 'Conteúdo aprofundado do módulo',
    description: 'Abra este bloco para ver o aprofundamento teórico e os materiais complementares do módulo.',
    bodyMarkup,
    dataCy: 'module-deep-dive',
  });
}

function buildLearningExtrasMarkup(moduleId) {
  const extras = MODULE_LEARNING_EXTRAS[moduleId];
  if (!extras) {
    return '';
  }

  const caseTasksMarkup = extras.caseTasks.map((item) => `<li>${item}</li>`).join('');
  const checklistMarkup = extras.checklist.map((item) => `<li>${item}</li>`).join('');
  const recapMarkup = extras.recap.map((item) => `<li>${item}</li>`).join('');

  return `
    <div class="course-learning-extras" id="module-learning-extras">
      <div class="resource-card case-study-card">
        <h3>Estudo de caso guiado</h3>
        <h4>${extras.caseTitle}</h4>
        <p>${extras.caseScenario}</p>
        <ol class="step-list">${caseTasksMarkup}</ol>
      </div>
      <div class="learning-extras-grid">
        <div class="resource-card checklist-card">
          <h3>Checklist de revisão</h3>
          <ul class="detail-list">${checklistMarkup}</ul>
        </div>
        <div class="resource-card recap-card">
          <h3>Resumo final do módulo</h3>
          <ul class="detail-list">${recapMarkup}</ul>
        </div>
      </div>
    </div>
  `;
}

function renderModuleLearningExtras() {
  const moduleId = document.body.dataset.module;
  const sectionBody = document.querySelector('.section-body');

  if (!moduleId || !sectionBody || document.getElementById('module-learning-extras')) {
    return;
  }

  const markup = buildLearningExtrasMarkup(moduleId);
  if (!markup) {
    return;
  }

  sectionBody.insertAdjacentHTML('beforeend', markup);
}

function renderModuleDetailedContent() {
  const moduleId = document.body.dataset.module;
  const sectionBody = document.querySelector('.section-body');

  if (!moduleId || !sectionBody || document.getElementById('module-deep-dive')) {
    return;
  }

  const markup = buildDetailedSectionMarkup(moduleId);
  if (!markup) {
    return;
  }

  sectionBody.insertAdjacentHTML('beforeend', markup);
}

function renderModuleQuiz() {
  const moduleId = document.body.dataset.module;
  const sectionBody = document.querySelector('.section-body');

  if (!moduleId || !sectionBody || document.getElementById('module-quiz')) {
    return;
  }

  const quizMarkup = buildQuizMarkup(moduleId);
  if (!quizMarkup) {
    return;
  }

  sectionBody.insertAdjacentHTML('beforeend', quizMarkup);
  initializeModuleInteractivePanels();

  document.getElementById('module-quiz-form')?.addEventListener('submit', handleQuizSubmit);
  document.getElementById('reset-quiz-button')?.addEventListener('click', resetQuiz);
  restoreQuizState(moduleId);
}

function setQuizResultMessage(message, tone = 'success') {
  const resultElement = document.getElementById('quiz-result');
  if (!resultElement) {
    return;
  }

  resultElement.textContent = message;
  resultElement.classList.remove('success', 'warning');
  resultElement.classList.add('visible', tone);
}

function restoreQuizState(moduleId) {
  const progress = loadCourseProgress();
  const entry = getModuleProgressEntry(progress, moduleId);
  const quiz = MODULE_QUIZZES[moduleId];
  if (!quiz || !entry.quizAttempted) {
    return;
  }

  const requiredCorrectAnswers = getQuizRequiredCorrectAnswers(quiz.questions.length);
  const message = entry.quizPassed
    ? `Último resultado: ${entry.quizScore} de ${entry.quizTotal}. Você já atingiu a nota mínima de ${requiredCorrectAnswers} acertos.`
    : `Último resultado: ${entry.quizScore} de ${entry.quizTotal}. Você precisa de ${requiredCorrectAnswers} acertos para concluir o módulo.`;

  setQuizResultMessage(message, entry.quizPassed ? 'success' : 'warning');
}

async function handleQuizSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const moduleId = document.body.dataset.module;
  const questionElements = form.querySelectorAll('.quiz-question');
  let correctAnswers = 0;
  let answeredQuestions = 0;

  questionElements.forEach((questionElement, index) => {
    const selectedOption = form.querySelector(`input[name="quiz-question-${index}"]:checked`);
    const explanation = questionElement.querySelector('.quiz-explanation');
    const correctAnswer = Number(questionElement.dataset.correctAnswer);

    questionElement.classList.remove('is-correct', 'is-incorrect', 'is-unanswered');

    if (!selectedOption) {
      questionElement.classList.add('is-unanswered');
      if (explanation) {
        explanation.hidden = false;
      }
      return;
    }

    answeredQuestions += 1;
    const selectedValue = Number(selectedOption.value);

    if (selectedValue === correctAnswer) {
      correctAnswers += 1;
      questionElement.classList.add('is-correct');
    } else {
      questionElement.classList.add('is-incorrect');
    }

    if (explanation) {
      explanation.hidden = false;
    }
  });

  const totalQuestions = questionElements.length;
  const unansweredCount = totalQuestions - answeredQuestions;
  const requiredCorrectAnswers = getQuizRequiredCorrectAnswers(totalQuestions);
  const quizPassed = unansweredCount === 0 && correctAnswers >= requiredCorrectAnswers;

  const progress = loadCourseProgress();
  setModuleProgressEntry(progress, moduleId, {
    quizScore: correctAnswers,
    quizTotal: totalQuestions,
    quizPassed,
    quizAttempted: true,
    completed: quizPassed ? getModuleProgressEntry(progress, moduleId).completed : false,
  });
  saveCourseProgress(progress);
  await persistModuleProgress(moduleId);

  const message = unansweredCount > 0
    ? `Você acertou ${correctAnswers} de ${totalQuestions}. Ainda faltaram ${unansweredCount} pergunta(s) sem resposta.`
    : quizPassed
      ? `Você acertou ${correctAnswers} de ${totalQuestions}. Nota mínima atingida. Agora você pode concluir o módulo.`
      : `Você acertou ${correctAnswers} de ${totalQuestions}. São necessários ${requiredCorrectAnswers} acertos para concluir o módulo.`;

  setQuizResultMessage(message, quizPassed ? 'success' : 'warning');
  updateModulePageProgress();
  updateDashboardProgress();
  renderCertificateSection();
}

function resetQuiz() {
  const form = document.getElementById('module-quiz-form');
  const resultElement = document.getElementById('quiz-result');

  if (!form) {
    return;
  }

  form.reset();

  form.querySelectorAll('.quiz-question').forEach((questionElement) => {
    questionElement.classList.remove('is-correct', 'is-incorrect', 'is-unanswered');
    const explanation = questionElement.querySelector('.quiz-explanation');
    if (explanation) {
      explanation.hidden = true;
    }
  });

  if (resultElement) {
    resultElement.textContent = '';
    resultElement.classList.remove('visible', 'success', 'warning');
  }
}

function initializeModuleTopicAccordions() {
  const sectionBody = document.querySelector('.section-body');
  if (!sectionBody || !document.body.dataset.module) {
    return;
  }

  const children = Array.from(sectionBody.children);
  if (!children.some((child) => child.tagName === 'H3')) {
    return;
  }

  const existingAccordions = sectionBody.querySelectorAll('.module-topic-accordion').length;
  let accordionIndex = existingAccordions;

  for (let index = 0; index < children.length; index += 1) {
    const heading = children[index];

    if (heading.tagName !== 'H3' || heading.parentElement !== sectionBody) {
      continue;
    }

    const topicNodes = [];
    let scanIndex = index + 1;

    while (scanIndex < children.length && children[scanIndex].tagName !== 'H3') {
      topicNodes.push(children[scanIndex]);
      scanIndex += 1;
    }

    if (topicNodes.length === 0) {
      continue;
    }

    const accordionId = `module-topic-panel-${accordionIndex}`;
    const accordion = document.createElement('article');
    accordion.className = 'module-topic-accordion';
    accordion.dataset.cy = `module-topic-${accordionIndex}`;

    const header = document.createElement('div');
    header.className = 'module-topic-header';

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'module-topic-toggle';
    button.setAttribute('aria-controls', accordionId);
    button.setAttribute('data-cy', `module-topic-toggle-${accordionIndex}`);

    const title = document.createElement('span');
    title.className = 'module-topic-title';
    title.textContent = heading.textContent?.trim() || `Tópico ${accordionIndex + 1}`;

    const indicator = document.createElement('span');
    indicator.className = 'module-topic-indicator';
    indicator.setAttribute('aria-hidden', 'true');
    indicator.textContent = 'Expandir';

    button.append(title, indicator);
    header.appendChild(button);

    const panel = document.createElement('div');
    panel.id = accordionId;
    panel.className = 'module-topic-panel';
    panel.setAttribute('data-cy', `module-topic-panel-${accordionIndex}`);

    topicNodes.forEach((node) => {
      panel.appendChild(node);
    });

    const shouldStartOpen = false;
    accordion.classList.toggle('is-open', shouldStartOpen);
    button.setAttribute('aria-expanded', shouldStartOpen ? 'true' : 'false');
    indicator.textContent = shouldStartOpen ? 'Recolher' : 'Expandir';
    panel.hidden = !shouldStartOpen;

    button.addEventListener('click', () => {
      const isOpen = accordion.classList.toggle('is-open');

      sectionBody.querySelectorAll('.module-topic-accordion').forEach((item) => {
        if (item === accordion) {
          return;
        }

        item.classList.remove('is-open');
        const itemButton = item.querySelector('.module-topic-toggle');
        const itemPanel = item.querySelector('.module-topic-panel');
        const itemIndicator = item.querySelector('.module-topic-indicator');

        if (itemButton) {
          itemButton.setAttribute('aria-expanded', 'false');
        }

        if (itemPanel) {
          itemPanel.hidden = true;
        }

        if (itemIndicator) {
          itemIndicator.textContent = 'Expandir';
        }
      });

      button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      indicator.textContent = isOpen ? 'Recolher' : 'Expandir';
      panel.hidden = !isOpen;
    });

    accordion.append(header, panel);
    sectionBody.insertBefore(accordion, heading);
    heading.remove();

    accordionIndex += 1;
    index = scanIndex - 1;
  }
}

function initializeModuleInteractivePanels() {
  document.querySelectorAll('.module-interactive-toggle').forEach((button) => {
    if (button.dataset.boundClick === 'true') {
      return;
    }

    button.addEventListener('click', () => {
      const panelId = button.dataset.targetPanel;
      const panel = panelId ? document.getElementById(panelId) : null;
      const panelBody = panel?.querySelector('.module-interactive-panel-body');
      const indicator = button.querySelector('.module-interactive-toggle-indicator');
      const shouldOpen = panelBody?.hidden !== false;

      if (!panel || !panelBody) {
        return;
      }

      panel.classList.toggle('is-open', shouldOpen);
      panelBody.hidden = !shouldOpen;
      button.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');

      if (indicator) {
        indicator.textContent = shouldOpen ? 'Recolher' : 'Expandir';
      }
    });

    button.dataset.boundClick = 'true';
  });
}

async function toggleModuleCompletion() {
  const moduleId = document.body.dataset.module;
  if (!moduleId) return;

  const progress = loadCourseProgress();
  const entry = getModuleProgressEntry(progress, moduleId);
  const quiz = MODULE_QUIZZES[moduleId];

  if (!entry.completed && quiz && !entry.quizPassed) {
    const requiredCorrectAnswers = getQuizRequiredCorrectAnswers(quiz.questions.length);
    setQuizResultMessage(
      `Antes de concluir o módulo, você precisa acertar pelo menos ${requiredCorrectAnswers} de ${quiz.questions.length} perguntas.`,
      'warning'
    );
    return;
  }

  setModuleProgressEntry(progress, moduleId, {
    completed: !entry.completed,
  });
  saveCourseProgress(progress);
  await persistModuleProgress(moduleId);
  updateModulePageProgress();
  updateDashboardProgress();
  renderCertificateSection();
}

async function initializeAuthenticatedPages() {
  const sessionIsValid = await verifySession();
  if (!sessionIsValid) {
    return;
  }

  await syncCourseProgressFromServer();
  await syncChallengesFromServer();
  updateDashboardProgress();
  updateModulePageProgress();
  initializeModuleTopicAccordions();
  renderModuleDetailedContent();
  renderModuleLearningExtras();
  renderModuleQuiz();
  await renderModuleChallenge();
  renderCertificateSection();

  const completeButton = document.getElementById('complete-module-button');
  if (completeButton && !completeButton.dataset.boundClick) {
    completeButton.addEventListener('click', toggleModuleCompletion);
    completeButton.dataset.boundClick = 'true';
  }
}

async function logout() {
  const token = localStorage.getItem('token');

  try {
    if (token) {
      await fetch(`${API_ORIGIN}/logout`, {
        method: 'POST',
        headers: { Authorization: token }
      });
    }
  } catch (error) {
    console.error('Erro ao encerrar sessão:', error);
  } finally {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  const page = document.body.dataset.page;

  enhanceLogo();

  if (page === 'login') {
    showLoginMessage();

    hasValidSession().then((isValid) => {
      if (isValid) {
        window.location.href = 'dashboard.html';
      } else {
        localStorage.removeItem('token');
      }
    });

    return;
  }

  await initializeAuthenticatedPages();
});