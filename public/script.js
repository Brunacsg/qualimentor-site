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

const MODULE_QUIZZES = {
  'module-1': {
    title: 'Questionário do módulo',
    description: 'Revise os conceitos centrais sobre o papel do QA e seus princípios de atuação.',
    questions: [
      {
        prompt: 'Qual é um dos principais objetivos do QA em um projeto?',
        options: [
          'Apenas corrigir bugs depois da produção',
          'Garantir qualidade, reduzir riscos e melhorar processos',
          'Substituir o trabalho do desenvolvedor',
          'Escrever apenas documentação técnica'
        ],
        answer: 1,
        explanation: 'QA atua para prevenir defeitos, reduzir riscos e aumentar a confiança no produto.'
      },
      {
        prompt: 'O princípio “prevenção vs correção” significa que:',
        options: [
          'Corrigir defeitos sempre custa menos',
          'Prevenir defeitos tende a ser mais eficiente do que corrigi-los depois',
          'Defeitos só devem ser tratados no fim do projeto',
          'QA não precisa participar do início do projeto'
        ],
        answer: 1,
        explanation: 'O módulo reforça que prevenir problemas cedo reduz retrabalho e custo.'
      },
      {
        prompt: 'Qual das opções abaixo representa uma responsabilidade típica de QA?',
        options: [
          'Ignorar requisitos não-funcionais',
          'Executar testes, registrar defeitos e acompanhar sua resolução',
          'Deployar em produção sem validação',
          'Alterar regras de negócio sem alinhamento'
        ],
        answer: 1,
        explanation: 'QA revisa requisitos, executa testes e acompanha defeitos até a resolução.'
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
          'O salário do QA responsável',
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
    description: 'Revise as ferramentas de QA para gestão, bugs, APIs e CI/CD.',
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
          'Eliminar a participação do QA'
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
    description: 'Confira se você absorveu as principais trilhas, habilidades e próximos passos da carreira em QA.',
    questions: [
      {
        prompt: 'Qual certificação foi apresentada como base internacional para QA?',
        options: [
          'ISTQB Foundation',
          'CCNA',
          'AWS Solutions Architect',
          'PMP'
        ],
        answer: 0,
        explanation: 'ISTQB Foundation foi citada como certificação básica importante para QA.'
      },
      {
        prompt: 'Qual trajetória tem foco forte em automação e desenvolvimento de frameworks de teste?',
        options: [
          'QA Engineer',
          'Product Owner',
          'UX Writer',
          'Scrum Master júnior'
        ],
        answer: 0,
        explanation: 'O módulo destaca QA Engineer como perfil mais técnico com foco em automação.'
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

const LOGIN_MESSAGE_KEY = 'loginMessage';

function setLoginMessage(message) {
  if (message) {
    localStorage.setItem(LOGIN_MESSAGE_KEY, message);
  }
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
  const token = localStorage.getItem('token');

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
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
    return;
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
  }
}

function loadCourseProgress() {
  const data = localStorage.getItem('qaCourseProgress');
  return data ? JSON.parse(data) : {};
}

function saveCourseProgress(progress) {
  localStorage.setItem('qaCourseProgress', JSON.stringify(progress));
}

function getCompletedCount(progress) {
  return MODULES.filter((moduleId) => progress[moduleId]).length;
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

  document.querySelectorAll('.module-card').forEach((card) => {
    const moduleId = card.dataset.module;
    const statusText = card.querySelector('.status-text');
    if (progress[moduleId]) {
      card.classList.add('completed');
      if (statusText) statusText.textContent = 'Concluído';
      card.querySelector('.module-status-badge')?.classList.add('completed');
    } else {
      card.classList.remove('completed');
      if (statusText) statusText.textContent = 'Não iniciado';
      card.querySelector('.module-status-badge')?.classList.remove('completed');
    }
  });
}

function updateModulePageProgress() {
  const moduleId = document.body.dataset.module;
  if (!moduleId) return;

  const progress = loadCourseProgress();
  const completed = progress[moduleId] === true;
  const statusText = document.getElementById('module-status-text');
  const percentText = document.getElementById('module-progress-percent');
  const button = document.getElementById('complete-module-button');
  const nextLink = document.getElementById('next-module-link');

  if (statusText) {
    statusText.textContent = completed ? 'Concluído' : 'Em andamento';
  }
  if (percentText) {
    const percent = completed ? 100 : 0;
    percentText.textContent = `${percent}%`;
  }
  if (button) {
    button.textContent = completed ? 'Marcar como não concluído' : 'Marcar módulo como concluído';
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

  const questionsMarkup = quiz.questions.map((question, index) => {
    const optionsMarkup = question.options.map((option, optionIndex) => `
      <label class="quiz-option">
        <input type="radio" name="quiz-question-${index}" value="${optionIndex}">
        <span>${option}</span>
      </label>
    `).join('');

    return `
      <fieldset class="quiz-question" data-question-index="${index}" data-correct-answer="${question.answer}">
        <legend>${index + 1}. ${question.prompt}</legend>
        <div class="quiz-options">${optionsMarkup}</div>
        <p class="quiz-explanation" hidden>${question.explanation}</p>
      </fieldset>
    `;
  }).join('');

  return `
    <div class="quiz-card" id="module-quiz">
      <div class="quiz-header">
        <h3>${quiz.title}</h3>
        <p>${quiz.description}</p>
      </div>
      <form id="module-quiz-form" class="quiz-form">
        ${questionsMarkup}
        <div class="quiz-actions">
          <button type="submit" class="primary-button">Enviar respostas</button>
          <button type="button" id="reset-quiz-button" class="secondary-button">Refazer questionário</button>
        </div>
        <p id="quiz-result" class="quiz-result" aria-live="polite"></p>
      </form>
    </div>
  `;
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

  document.getElementById('module-quiz-form')?.addEventListener('submit', handleQuizSubmit);
  document.getElementById('reset-quiz-button')?.addEventListener('click', resetQuiz);
}

function handleQuizSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
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

  const resultElement = document.getElementById('quiz-result');
  if (resultElement) {
    const totalQuestions = questionElements.length;
    const unansweredCount = totalQuestions - answeredQuestions;
    resultElement.classList.add('visible');
    resultElement.textContent = unansweredCount > 0
      ? `Você acertou ${correctAnswers} de ${totalQuestions}. Ainda faltaram ${unansweredCount} pergunta(s) sem resposta.`
      : `Você acertou ${correctAnswers} de ${totalQuestions} pergunta(s).`;
  }
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
    resultElement.classList.remove('visible');
  }
}

function toggleModuleCompletion() {
  const moduleId = document.body.dataset.module;
  if (!moduleId) return;

  const progress = loadCourseProgress();
  progress[moduleId] = !progress[moduleId];
  saveCourseProgress(progress);
  updateModulePageProgress();
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

window.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;

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

  verifySession();
  updateDashboardProgress();
  updateModulePageProgress();
  renderModuleQuiz();

  const completeButton = document.getElementById('complete-module-button');
  if (completeButton) {
    completeButton.addEventListener('click', toggleModuleCompletion);
  }
});