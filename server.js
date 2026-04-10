const crypto = require('crypto');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { db, initDatabase, databaseLabel } = require('./database');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const SECRET = 'segredo_super_forte';
const ADMIN_SECRET = String(process.env.ADMIN_SECRET || '').trim();
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'qualimentor.mentoria@gmail.com';
const PAYMENT_CLICK_NOTIFY_EMAIL = String(process.env.PAYMENT_CLICK_NOTIFY_EMAIL || '').trim() || ADMIN_EMAIL;
const PAGSEGURO_LINK = process.env.PAGSEGURO_LINK || 'https://pag.ae/81E_Aa4jo';
const PAYMENT_WEBHOOK_SECRET = String(process.env.PAYMENT_WEBHOOK_SECRET || '').trim();
const DATABASE_URL = String(process.env.DATABASE_URL || '').trim();
const SMTP_HOST = String(process.env.SMTP_HOST || '').trim();
const SMTP_PORT = String(process.env.SMTP_PORT || '').trim();
const SMTP_USER = String(process.env.SMTP_USER || '').trim();
const SMTP_PASS = String(process.env.SMTP_PASS || '').trim();
const COURSE_MODULE_IDS = [
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
const MODULE_CHALLENGES = {
  'module-1': {
    challengeId: 'foundations-risk-brief',
    title: 'Desafio prático do módulo',
    description: 'Escreva uma análise curta explicando como Quality Assurance atuaria em um checkout com alta taxa de abandono, priorizando risco e impacto no negócio.',
    submissionLabel: 'Sua análise',
    placeholder: 'Explique o cenário, os riscos mais críticos, as validações prioritárias e como você comunicaria isso ao time.',
    minLength: 320,
    passingScore: 70,
    criteria: [
      { id: 'risk', label: 'Risco e impacto', weight: 35, keywords: ['risco', 'impacto', 'cliente', 'negocio'], minCoverage: 0.5 },
      { id: 'priority', label: 'Priorização das validações', weight: 35, keywords: ['prioridade', 'checkout', 'pagamento', 'validacao'], minCoverage: 0.5 },
      { id: 'depth', label: 'Detalhamento suficiente', weight: 30, minLength: 320 }
    ]
  },
  'module-2': {
    challengeId: 'test-plan-mini-strategy',
    title: 'Desafio prático do módulo',
    description: 'Monte um mini plano de testes para um release curto com ambiente instável, definindo escopo, critérios e métricas mínimas.',
    submissionLabel: 'Seu mini plano',
    placeholder: 'Descreva o escopo, critérios de entrada e saída, riscos e métricas que orientariam a decisão do release.',
    minLength: 320,
    passingScore: 70,
    criteria: [
      { id: 'scope', label: 'Escopo e estratégia', weight: 35, keywords: ['escopo', 'estrategia', 'risco', 'release'], minCoverage: 0.5 },
      { id: 'criteria', label: 'Critérios e métricas', weight: 35, keywords: ['criterio', 'entrada', 'saida', 'metrica'], minCoverage: 0.5 },
      { id: 'depth', label: 'Detalhamento suficiente', weight: 30, minLength: 320 }
    ]
  },
  'module-3': {
    challengeId: 'manual-test-and-bug-report',
    title: 'Desafio prático do módulo',
    description: 'Escreva três casos de teste manuais resumidos para cadastro e descreva um bug report com resultado esperado e atual.',
    submissionLabel: 'Seus casos e bug report',
    placeholder: 'Inclua cenário positivo, negativo, valor limite e um defeito com passos, resultado esperado e resultado atual.',
    minLength: 360,
    passingScore: 70,
    criteria: [
      { id: 'coverage', label: 'Cobertura de cenários', weight: 35, keywords: ['positivo', 'negativo', 'limite', 'cadastro'], minCoverage: 0.5 },
      { id: 'bug-report', label: 'Registro do defeito', weight: 35, keywords: ['passos', 'resultado esperado', 'resultado atual', 'evidencia'], minCoverage: 0.5 },
      { id: 'depth', label: 'Detalhamento suficiente', weight: 30, minLength: 360 }
    ]
  },
  'module-4': {
    challengeId: 'automation-roi-outline',
    title: 'Desafio prático do módulo',
    description: 'Proponha uma automação inicial com Cypress ou JavaScript, justificando ROI, camada de teste e sustentabilidade da suíte.',
    submissionLabel: 'Sua proposta de automação',
    placeholder: 'Explique o cenário escolhido, a camada ideal, a justificativa de ROI e os cuidados de manutenção. Pode incluir pseudocódigo ou exemplo em JavaScript.',
    minLength: 340,
    passingScore: 70,
    criteria: [
      { id: 'roi', label: 'Justificativa de priorização', weight: 35, keywords: ['roi', 'critico', 'regressao', 'repetitivo'], minCoverage: 0.5 },
      { id: 'technical', label: 'Decisão técnica', weight: 35, keywords: ['cypress', 'javascript', 'api', 'ui'], minCoverage: 0.5 },
      { id: 'depth', label: 'Detalhamento suficiente', weight: 30, minLength: 340 }
    ]
  },
  'module-5': {
    challengeId: 'qa-stack-map',
    title: 'Desafio prático do módulo',
    description: 'Desenhe uma stack mínima da Biblioteca do QA conectando gestão, bugs, automação, API e CI/CD.',
    submissionLabel: 'Seu mapa de stack',
    placeholder: 'Liste as ferramentas escolhidas, a função de cada uma, integrações e o fluxo operacional entre requisito, teste, bug e pipeline.',
    minLength: 340,
    passingScore: 70,
    criteria: [
      { id: 'tooling', label: 'Escolha de ferramentas', weight: 35, keywords: ['gestao', 'bug', 'api', 'pipeline'], minCoverage: 0.5 },
      { id: 'integration', label: 'Integração do fluxo', weight: 35, keywords: ['integracao', 'evidencia', 'relatorio', 'rastreamento'], minCoverage: 0.5 },
      { id: 'depth', label: 'Detalhamento suficiente', weight: 30, minLength: 340 }
    ]
  },
  'module-6': {
    challengeId: 'agile-qa-alignment',
    title: 'Desafio prático do módulo',
    description: 'Transforme uma user story ambígua em perguntas de refinement, cenários testáveis e uma mini Definition of Done.',
    submissionLabel: 'Seu alinhamento ágil',
    placeholder: 'Inclua perguntas de refinamento, critérios de aceitação ou cenários e uma DoD enxuta.',
    minLength: 320,
    passingScore: 70,
    criteria: [
      { id: 'refinement', label: 'Clareza de refinamento', weight: 35, keywords: ['refinement', 'pergunta', 'criterio', 'aceitacao'], minCoverage: 0.5 },
      { id: 'delivery', label: 'Fluxo de entrega', weight: 35, keywords: ['definition of done', 'cenario', 'risco', 'sprint'], minCoverage: 0.5 },
      { id: 'depth', label: 'Detalhamento suficiente', weight: 30, minLength: 320 }
    ]
  },
  'module-7': {
    challengeId: 'security-risk-note',
    title: 'Desafio prático do módulo',
    description: 'Descreva como você validaria dois riscos de segurança em autenticação e registre impacto, evidência e recomendação inicial.',
    submissionLabel: 'Seu relatório de segurança',
    placeholder: 'Escolha dois riscos, explique a validação, o impacto potencial, a evidência e a recomendação.',
    minLength: 340,
    passingScore: 70,
    criteria: [
      { id: 'risk', label: 'Risco e vetor', weight: 35, keywords: ['owasp', 'autenticacao', 'sessao', 'impacto'], minCoverage: 0.5 },
      { id: 'report', label: 'Registro do achado', weight: 35, keywords: ['evidencia', 'recomendacao', 'severidade', 'vulnerabilidade'], minCoverage: 0.5 },
      { id: 'depth', label: 'Detalhamento suficiente', weight: 30, minLength: 340 }
    ]
  },
  'module-8': {
    challengeId: 'performance-test-plan',
    title: 'Desafio prático do módulo',
    description: 'Monte um plano de teste de performance para uma API crítica, com objetivo, métricas, thresholds e hipótese inicial.',
    submissionLabel: 'Seu plano de performance',
    placeholder: 'Defina o tipo de teste, métricas como P95/throughput/taxa de erro, thresholds e a leitura esperada dos resultados.',
    minLength: 340,
    passingScore: 70,
    criteria: [
      { id: 'goal', label: 'Objetivo e cenário', weight: 35, keywords: ['objetivo', 'carga', 'api', 'cenario'], minCoverage: 0.5 },
      { id: 'metrics', label: 'Métricas e thresholds', weight: 35, keywords: ['p95', 'throughput', 'threshold', 'taxa de erro'], minCoverage: 0.5 },
      { id: 'depth', label: 'Detalhamento suficiente', weight: 30, minLength: 340 }
    ]
  },
  'module-9': {
    challengeId: 'career-90-day-plan',
    title: 'Desafio prático do módulo',
    description: 'Estruture um plano de 90 dias para evoluir em Quality Assurance, conectando estudo, prática, portfólio e narrativa de entrevista.',
    submissionLabel: 'Seu plano de carreira',
    placeholder: 'Liste competências atuais, lacunas, um plano de 90 dias e as evidências que você produzirá.',
    minLength: 320,
    passingScore: 70,
    criteria: [
      { id: 'plan', label: 'Plano e metas', weight: 35, keywords: ['90 dias', 'plano', 'meta', 'evolucao'], minCoverage: 0.5 },
      { id: 'evidence', label: 'Evidências e posicionamento', weight: 35, keywords: ['portfolio', 'curriculo', 'github', 'entrevista'], minCoverage: 0.5 },
      { id: 'depth', label: 'Detalhamento suficiente', weight: 30, minLength: 320 }
    ]
  }
};

process.on('uncaughtException', (error) => {
  console.error('Erro não tratado no processo:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('Promise rejeitada sem tratamento:', reason);
  process.exit(1);
});

db.serialize(() => {
  if (!ADMIN_SECRET) {
    console.warn('Aviso: ADMIN_SECRET não está definido. /create-user e /approve-purchase estarão desabilitados. Defina ADMIN_SECRET para liberar administração.')
  }
  if (!DATABASE_URL) {
    console.warn('Aviso: DATABASE_URL não está definido. Configure a string de conexão do PostgreSQL para liberar o banco.');
  }
  if (!PAYMENT_WEBHOOK_SECRET) {
    console.warn('Aviso: PAYMENT_WEBHOOK_SECRET não está definido. /payment-webhook ficará desabilitado. Defina PAYMENT_WEBHOOK_SECRET para liberar automação de confirmação de pagamento.');
  }
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn('Aviso: SMTP não está configurado. Emails serão apenas simulados no console. Defina SMTP_HOST, SMTP_PORT, SMTP_USER e SMTP_PASS para envio real.');
  }
});

function getMailer() {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  const isGmail = SMTP_HOST.toLowerCase() === 'smtp.gmail.com';
  const smtpPassword = isGmail ? SMTP_PASS.replace(/\s+/g, '') : SMTP_PASS;
  const smtpPort = Number(SMTP_PORT || 587);

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: SMTP_USER,
      pass: smtpPassword,
    },
  });
}

async function sendEmail({ to, subject, text, html }) {
  const transporter = getMailer();
  if (!transporter) {
    console.log('--- EMAIL SIMULADO ---');
    console.log(`Para: ${to}`);
    console.log(`Assunto: ${subject}`);
    console.log(text || html);
    console.log('----------------------');
    return;
  }

  await transporter.sendMail({
    from: SMTP_USER,
    to,
    subject,
    text,
    html,
  });
}

async function verifyMailerConfiguration() {
  const transporter = getMailer();
  if (!transporter) {
    return;
  }

  try {
    await transporter.verify();
    console.log(`SMTP verificado com sucesso para ${SMTP_USER} via ${SMTP_HOST}:${SMTP_PORT || '587'}.`);
  } catch (error) {
    console.error('Falha ao validar SMTP. Verifique SMTP_USER, SMTP_PASS (senha de app do Gmail), SMTP_HOST e SMTP_PORT.', error);
  }
}

async function notifyPaymentClick({ requestId, email, name, createdAt, paymentLink }) {
  await sendEmail({
    to: PAYMENT_CLICK_NOTIFY_EMAIL,
    subject: 'Aluno clicou em Ir para o pagamento',
    text: `Um aluno acabou de seguir para o checkout do curso de Qualidade de Software.\n\nSolicitação: ${requestId}\nNome: ${name || 'Não informado'}\nEmail: ${email}\nData: ${createdAt}\nLink de pagamento: ${paymentLink}`,
  });
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function normalizeName(name) {
  return String(name || '').trim().replace(/\s+/g, ' ');
}

function normalizeForEvaluation(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

function mapProgressRows(rows) {
  return rows.reduce((acc, row) => {
    acc[row.moduleId] = {
      completed: Boolean(row.completed),
      quizPassed: Boolean(row.quizPassed),
      quizScore: Number(row.quizScore || 0),
      quizTotal: Number(row.quizTotal || 0),
      quizAttempted: Boolean(row.quizAttempted),
      updatedAt: row.updatedAt,
    };
    return acc;
  }, {});
}

function getChallengeDefinition(moduleId) {
  return MODULE_CHALLENGES[moduleId] || null;
}

function evaluateLengthCriterion(content, criterion) {
  const minLength = Number(criterion.minLength || 0);
  const currentLength = content.trim().length;
  const ratio = minLength > 0 ? Math.min(currentLength / minLength, 1) : 1;
  const passed = currentLength >= minLength;

  return {
    id: criterion.id,
    label: criterion.label,
    score: Math.round(criterion.weight * ratio),
    maxScore: criterion.weight,
    passed,
    feedback: passed
      ? 'O nível de detalhamento ficou adequado para avaliação automática.'
      : `A resposta ainda está curta. Expanda pelo menos mais ${Math.max(minLength - currentLength, 0)} caracteres com mais contexto e justificativa.`
  };
}

function evaluateKeywordCriterion(normalizedContent, criterion) {
  const expectedKeywords = Array.isArray(criterion.keywords) ? criterion.keywords : [];
  const matchedKeywords = expectedKeywords.filter((keyword) => normalizedContent.includes(normalizeForEvaluation(keyword)));
  const coverage = expectedKeywords.length ? matchedKeywords.length / expectedKeywords.length : 1;
  const minimumCoverage = Number(criterion.minCoverage || 0.5);
  const ratio = minimumCoverage > 0 ? Math.min(coverage / minimumCoverage, 1) : 1;
  const passed = coverage >= minimumCoverage;
  const missingKeywords = expectedKeywords.filter((keyword) => !matchedKeywords.includes(keyword));

  return {
    id: criterion.id,
    label: criterion.label,
    score: Math.round(criterion.weight * ratio),
    maxScore: criterion.weight,
    passed,
    feedback: passed
      ? `Boa cobertura dos pontos esperados: ${matchedKeywords.join(', ')}.`
      : `Faltou reforçar pontos como ${missingKeywords.slice(0, 3).join(', ')}.`
  };
}

function evaluateChallengeSubmission(moduleId, rawContent) {
  const definition = getChallengeDefinition(moduleId);
  if (!definition) {
    return null;
  }

  const content = String(rawContent || '').trim();
  const normalizedContent = normalizeForEvaluation(content);
  const criteriaResults = definition.criteria.map((criterion) => (
    criterion.minLength
      ? evaluateLengthCriterion(content, criterion)
      : evaluateKeywordCriterion(normalizedContent, criterion)
  ));
  const score = criteriaResults.reduce((total, criterion) => total + criterion.score, 0);
  const maxScore = criteriaResults.reduce((total, criterion) => total + criterion.maxScore, 0);
  const passed = score >= definition.passingScore;

  const feedback = [
    passed
      ? 'Sua submissão atingiu o nível mínimo esperado para este desafio.'
      : 'Sua submissão ainda precisa de mais consistência para atingir o nível mínimo esperado.',
    ...criteriaResults.map((criterion) => `${criterion.label}: ${criterion.feedback}`)
  ];

  return {
    challengeId: definition.challengeId,
    submissionType: 'text',
    score,
    maxScore,
    passed,
    feedback,
    criteria: criteriaResults,
  };
}

function parseJsonArray(value) {
  try {
    const parsed = JSON.parse(String(value || '[]'));
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function mapChallengeSubmissionRow(row) {
  return {
    id: row.id,
    moduleId: row.moduleId,
    challengeId: row.challengeId,
    submissionType: row.submissionType,
    score: Number(row.score || 0),
    maxScore: Number(row.maxScore || 0),
    passed: Boolean(row.passed),
    feedback: parseJsonArray(row.feedbackJson),
    criteria: parseJsonArray(row.criteriaJson),
    createdAt: row.createdAt,
  };
}

function buildPublicChallengeDefinition(moduleId) {
  const definition = getChallengeDefinition(moduleId);
  if (!definition) {
    return null;
  }

  return {
    moduleId,
    challengeId: definition.challengeId,
    title: definition.title,
    description: definition.description,
    submissionLabel: definition.submissionLabel,
    placeholder: definition.placeholder,
    minLength: definition.minLength,
    passingScore: definition.passingScore,
    criteria: definition.criteria.map((criterion) => ({
      id: criterion.id,
      label: criterion.label,
      maxScore: criterion.weight,
    })),
  };
}

function logGeneratedCredential({ userId, name, email, plainPassword }) {
  db.run(
    'INSERT INTO credential_deliveries (userId, name, email, plainPassword, createdAt) VALUES (?, ?, ?, ?, ?)',
    [userId || null, normalizeName(name), normalizeEmail(email), plainPassword, new Date().toISOString()],
    (err) => {
      if (err) {
        console.error('Erro ao registrar credencial gerada:', err);
      }
    }
  );
}

function dbGet(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(row);
    });
  });
}

function dbRun(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function onRun(err) {
      if (err) {
        reject(err);
        return;
      }

      resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
}

function dbAll(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(rows || []);
    });
  });
}

function parsePositiveInteger(value, fallback, max = Number.MAX_SAFE_INTEGER) {
  const parsed = Number.parseInt(value, 10);

  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback;
  }

  return Math.min(parsed, max);
}

function getListParams(req, defaults = {}) {
  const page = parsePositiveInteger(req.query.page, defaults.page || 1);
  const pageSize = parsePositiveInteger(req.query.pageSize, defaults.pageSize || 20, defaults.maxPageSize || 100);
  const search = String(req.query.search || '').trim();

  return {
    page,
    pageSize,
    search,
    offset: (page - 1) * pageSize,
  };
}

function buildPagination(page, pageSize, total) {
  const safeTotal = Number(total || 0);
  const totalPages = Math.max(1, Math.ceil(safeTotal / pageSize));

  return {
    page,
    pageSize,
    total: safeTotal,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}

const ADMIN_CACHE_TTL_MS = 15000;
const adminCache = new Map();

function getAdminCacheKey(label, req) {
  return `${label}:${req.originalUrl}`;
}

function getAdminCachedValue(key) {
  const entry = adminCache.get(key);
  if (!entry) {
    return null;
  }

  if ((Date.now() - entry.createdAt) > ADMIN_CACHE_TTL_MS) {
    adminCache.delete(key);
    return null;
  }

  return entry.payload;
}

function setAdminCachedValue(key, payload) {
  adminCache.set(key, {
    payload,
    createdAt: Date.now(),
  });
}

function invalidateAdminCache() {
  adminCache.clear();
}

async function respondWithAdminCache(req, res, label, loader, errorMessage) {
  const cacheKey = getAdminCacheKey(label, req);
  const cachedPayload = getAdminCachedValue(cacheKey);

  if (cachedPayload) {
    res.json(cachedPayload);
    return;
  }

  try {
    const payload = await loader();
    setAdminCachedValue(cacheKey, payload);
    res.json(payload);
  } catch (error) {
    res.status(500).json({ success: false, message: errorMessage });
  }
}

function generateTemporaryPassword() {
  return `${crypto.randomBytes(4).toString('hex')}${Math.floor(Math.random() * 90 + 10)}`;
}

function isPaidStatus(status) {
  return ['paid', 'approved', 'completed', 'confirmed'].includes(String(status || '').trim().toLowerCase());
}

function pickFirstString(...values) {
  for (const value of values) {
    if (value === undefined || value === null) {
      continue;
    }

    const normalized = String(value).trim();
    if (normalized) {
      return normalized;
    }
  }

  return '';
}

function extractWebhookPayload(body = {}) {
  const charge = Array.isArray(body.charges) ? body.charges[0] || {} : {};
  const transaction = body.transaction && typeof body.transaction === 'object' ? body.transaction : {};
  const customer = body.customer && typeof body.customer === 'object' ? body.customer : {};
  const sender = body.sender && typeof body.sender === 'object' ? body.sender : {};
  const payment = body.payment && typeof body.payment === 'object' ? body.payment : {};

  const requestId = Number(
    body.requestId
    || body.referenceId
    || body.reference_id
    || charge.requestId
    || charge.referenceId
    || 0
  );

  const status = pickFirstString(
    body.status,
    body.paymentStatus,
    body.payment_status,
    body.current_status,
    payment.status,
    transaction.status,
    charge.status,
    charge.current_status
  ).toLowerCase();

  const email = normalizeEmail(pickFirstString(
    body.email,
    customer.email,
    sender.email,
    payment.email,
    transaction.email,
    charge.email
  ));

  const paymentReference = pickFirstString(
    body.paymentReference,
    body.reference,
    body.reference_id,
    body.referenceId,
    body.transactionId,
    body.transaction_id,
    body.notificationCode,
    transaction.reference,
    transaction.id,
    charge.reference,
    charge.reference_id,
    charge.id
  );

  const paymentProvider = pickFirstString(
    body.paymentProvider,
    body.provider,
    body.gateway,
    payment.provider,
    transaction.provider,
    'webhook'
  );

  return {
    requestId,
    status,
    email,
    paymentReference,
    paymentProvider,
  };
}

function buildSystemStatus() {
  const smtpConfigured = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS);
  const webhookConfigured = Boolean(PAYMENT_WEBHOOK_SECRET);
  const adminConfigured = Boolean(ADMIN_SECRET);
  const databaseConfigured = Boolean(DATABASE_URL);

  return {
    environment: process.env.RENDER ? 'render' : process.env.NODE_ENV || 'development',
    databasePath: databaseLabel,
    usingRenderDisk: false,
    checks: [
      {
        key: 'adminSecret',
        label: 'ADMIN_SECRET configurado',
        ok: adminConfigured,
        detail: adminConfigured ? 'Admin liberado.' : 'Defina ADMIN_SECRET no ambiente.',
      },
      {
        key: 'smtp',
        label: 'SMTP configurado',
        ok: smtpConfigured,
        detail: smtpConfigured ? `Envio real via ${SMTP_HOST}:${SMTP_PORT || 587}.` : 'Defina SMTP_HOST, SMTP_PORT, SMTP_USER e SMTP_PASS.',
      },
      {
        key: 'database',
        label: 'PostgreSQL configurado',
        ok: databaseConfigured,
        detail: databaseConfigured ? `Conectado via DATABASE_URL em ${databaseLabel}.` : 'Defina DATABASE_URL com a conexão do PostgreSQL.',
      },
      {
        key: 'paymentWebhook',
        label: 'Webhook de pagamento configurado',
        ok: webhookConfigured,
        detail: webhookConfigured ? 'Endpoint /payment-webhook protegido por segredo.' : 'Defina PAYMENT_WEBHOOK_SECRET no ambiente.',
      },
      {
        key: 'paymentLink',
        label: 'Link de pagamento configurado',
        ok: Boolean(PAGSEGURO_LINK),
        detail: PAGSEGURO_LINK || 'Defina PAGSEGURO_LINK no ambiente.',
      },
      {
        key: 'databasePersistence',
        label: 'Persistência do banco',
        ok: databaseConfigured,
        detail: databaseConfigured
          ? 'Persistência garantida pelo PostgreSQL configurado externamente.'
          : 'Configure DATABASE_URL para usar um banco persistente.',
      },
    ],
  };
}

async function approvePurchaseRequest(request, options = {}) {
  const normalizedEmail = normalizeEmail(request.email);
  const normalizedName = normalizeName(request.name);
  const approvedAt = options.approvedAt || new Date().toISOString();
  const approvalSource = options.approvalSource || 'manual';
  const paymentProvider = String(options.paymentProvider || '').trim();
  const paymentReference = String(options.paymentReference || '').trim();
  const webhookTimestamp = options.lastWebhookAt || null;

  await dbRun(
    `UPDATE purchase_requests
     SET status = ?, approvedAt = ?, approvalSource = ?, paymentProvider = ?, paymentReference = ?, lastWebhookAt = ?
     WHERE id = ?`,
    [
      'approved',
      approvedAt,
      approvalSource,
      paymentProvider,
      paymentReference,
      webhookTimestamp,
      request.id,
    ]
  );

  const generatedPassword = generateTemporaryPassword();
  const hashedPassword = await bcrypt.hash(generatedPassword, 10);
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 365);

  const existingUser = await dbGet('SELECT * FROM users WHERE lower(trim(email)) = ?', [normalizedEmail]);
  let userId = existingUser?.id || null;

  if (existingUser) {
    await dbRun(
      "UPDATE users SET name = COALESCE(NULLIF(?, ''), name), password = ?, expiresAt = ?, activeSessionId = NULL WHERE id = ?",
      [normalizedName, hashedPassword, expiresAt.toISOString(), existingUser.id]
    );
  } else {
    const insertResult = await dbRun(
      'INSERT INTO users (name, email, password, expiresAt, activeSessionId) VALUES (?, ?, ?, ?, NULL)',
      [normalizedName, normalizedEmail, hashedPassword, expiresAt.toISOString()]
    );
    userId = insertResult.lastID;
  }

  logGeneratedCredential({
    userId,
    name: normalizedName,
    email: normalizedEmail,
    plainPassword: generatedPassword,
  });

  invalidateAdminCache();

  await sendEmail({
    to: normalizedEmail,
    subject: 'Seu acesso ao curso de Qualidade de Software está pronto',
    text: `Seu pagamento foi confirmado. Seus dados de acesso estão abaixo:\n\nLogin: ${normalizedEmail}\nSenha: ${generatedPassword}\n\nAcesse a página de login e entre com esses dados. Guarde esta mensagem para consultas futuras.`,
  });

  await sendEmail({
    to: ADMIN_EMAIL,
    subject: approvalSource === 'webhook' ? 'Compra de curso de Qualidade de Software aprovada automaticamente' : 'Compra de curso de Qualidade de Software aprovada',
    text: `A solicitação de compra do email ${normalizedEmail} foi aprovada e os dados de acesso foram gerados.\n\nNome: ${normalizedName || 'Não informado'}\nLogin: ${normalizedEmail}\nSenha gerada: ${generatedPassword}\nOrigem da aprovação: ${approvalSource}\nProvedor: ${paymentProvider || 'Não informado'}\nReferência: ${paymentReference || 'Não informada'}\nAprovado em: ${approvedAt}.`,
  });

  return {
    approvedAt,
    approvalSource,
    paymentProvider,
    paymentReference,
    generatedPassword,
    normalizedEmail,
    normalizedName,
  };
}

// =========================
// MIDDLEWARE AUTH
// =========================
function auth(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'Sem token' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);

    db.get(
      'SELECT id, name, email, expiresat AS "expiresAt", activesessionid AS "activeSessionId" FROM users WHERE id = ?',
      [decoded.id],
      (err, user) => {
        if (err) {
          return res.status(500).json({ error: 'Erro ao validar sessão' });
        }

        if (!user) {
          return res.status(401).json({ error: 'Usuário não encontrado' });
        }

        if (!decoded.sessionId || !user.activeSessionId || user.activeSessionId !== decoded.sessionId) {
          return res.status(401).json({ error: 'Sessão encerrada por novo login em outro dispositivo' });
        }

        if (new Date() > new Date(user.expiresAt)) {
          return res.status(401).json({ error: 'Acesso expirado' });
        }

        req.user = {
          id: user.id,
          name: user.name || '',
          email: user.email,
          sessionId: user.activeSessionId,
        };
        next();
      }
    );
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
}

// =========================
// LOGIN
// =========================
app.post('/login', (req, res) => {
  const email = normalizeEmail(req.body.email);
  const { password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: 'Email e senha são obrigatórios' });
  }

  db.get('SELECT id, name, email, password, expiresat AS "expiresAt", activesessionid AS "activeSessionId" FROM users WHERE lower(trim(email)) = ?', [email], async (err, user) => {
    if (err) {
      return res.json({ success: false, message: 'Erro no servidor' });
    }

    if (!user) return res.json({ success: false, message: 'Usuário não encontrado' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.json({ success: false, message: 'Senha inválida' });

    const now = new Date();
    const exp = new Date(user.expiresAt);

    if (now > exp) {
      return res.json({ success: false, message: 'Acesso expirado' });
    }

    const sessionId = crypto.randomBytes(32).toString('hex');

    db.run(
      'UPDATE users SET activeSessionId = ? WHERE id = ?',
      [sessionId, user.id],
      (updateErr) => {
        if (updateErr) {
          return res.json({ success: false, message: 'Erro ao iniciar sessão' });
        }

        const token = jwt.sign(
          { id: user.id, email: user.email, sessionId },
          SECRET,
          { expiresIn: '1d' }
        );

        res.json({ success: true, token });
      }
    );
  });
});

app.post('/logout', auth, (req, res) => {
  db.run(
    'UPDATE users SET activeSessionId = NULL WHERE id = ? AND activeSessionId = ?',
    [req.user.id, req.user.sessionId],
    (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Erro ao encerrar sessão' });
      }

      res.json({ success: true });
    }
  );
});

// =========================
// CRIAR USUÁRIO (administrador)
// =========================
function authAdmin(req, res, next) {
  if (!ADMIN_SECRET) {
    return res.status(503).json({ success: false, message: 'Admin secret não configurado' });
  }

  const secret = String(req.headers['x-admin-secret'] || '').trim();
  if (!secret || secret !== ADMIN_SECRET) {
    return res.status(403).json({ success: false, message: 'Acesso negado' });
  }

  next();
}

app.post('/create-user', authAdmin, async (req, res) => {
  const email = normalizeEmail(req.body.email);
  const name = normalizeName(req.body.name);
  const { password, days } = req.body;

  if (!email || !password || !days) {
    return res.json({ success: false, message: 'Todos os campos são obrigatórios' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.json({ success: false, message: 'Email inválido' });
  }

  if (password.length < 6) {
    return res.json({ success: false, message: 'Senha deve ter pelo menos 6 caracteres' });
  }

  if (days < 1 || days > 365) {
    return res.json({ success: false, message: 'Dias deve ser entre 1 e 365' });
  }

  const hash = await bcrypt.hash(password, 10);
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + days);

  db.run(
    'INSERT INTO users (name, email, password, expiresAt, activeSessionId) VALUES (?, ?, ?, ?, NULL)',
    [name, email, hash, expiresAt.toISOString()],
    function (err) {
      if (err) {
        return res.status(500).json({ success: false, message: 'Erro ao criar usuário' });
      }
      invalidateAdminCache();
      res.json({ success: true });
    }
  );
});

app.post('/purchase-request', async (req, res) => {
  const email = normalizeEmail(req.body.email);
  const name = normalizeName(req.body.name);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || name.length < 3) {
    return res.status(400).json({ success: false, message: 'Informe seu nome completo.' });
  }

  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Email inválido' });
  }

  const paymentLink = PAGSEGURO_LINK;
  const createdAt = new Date().toISOString();

  db.run(
    `INSERT INTO purchase_requests (
      email, name, status, pixKey, paymentProvider, paymentReference, approvalSource, lastWebhookAt, createdAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [email, name, 'pending', paymentLink, '', '', '', null, createdAt],
    async function (err) {
      if (err) {
        return res.status(500).json({ success: false, message: 'Erro ao registrar solicitação' });
      }

      invalidateAdminCache();

      const message = 'Cadastro registrado com sucesso. Você será direcionado para o pagamento.';
      const requestId = this.lastID;

      res.json({ success: true, message, requestId, paymentLink });

      setImmediate(async () => {
        try {
          await sendEmail({
            to: email,
            subject: 'Cadastro recebido - Curso de Qualidade de Software',
            text: 'Recebemos seu cadastro para compra do curso de Qualidade de Software. Após a confirmação do pagamento, enviaremos para este email os dados de acesso.',
          });

          await notifyPaymentClick({
            requestId,
            email,
            name,
            createdAt,
            paymentLink,
          });
        } catch (error) {
          console.error('Erro ao enviar emails de solicitação:', error);
        }
      });
    }
  );
});

app.get('/purchase-requests', authAdmin, async (req, res) => {
  const { page, pageSize, search, offset } = getListParams(req, { pageSize: 20, maxPageSize: 100 });
  const searchTerm = search ? `%${search.toLowerCase()}%` : '';
  const whereClause = search
    ? `WHERE lower(email) LIKE ? OR lower(COALESCE(name, '')) LIKE ? OR lower(COALESCE(status, '')) LIKE ? OR lower(COALESCE(paymentprovider, '')) LIKE ? OR lower(COALESCE(paymentreference, '')) LIKE ?`
    : '';
  const params = search ? [searchTerm, searchTerm, searchTerm, searchTerm, searchTerm] : [];

  await respondWithAdminCache(req, res, 'purchase-requests', async () => {
    const totalRow = await dbGet(
      `SELECT COUNT(*) AS total
       FROM purchase_requests
       ${whereClause}`,
      params
    );

    const requests = await dbAll(
      `SELECT
        id,
        email,
        name,
        status,
        pixkey AS "pixKey",
        paymentprovider AS "paymentProvider",
        paymentreference AS "paymentReference",
        approvalsource AS "approvalSource",
        lastwebhookat AS "lastWebhookAt",
        createdat AS "createdAt",
        approvedat AS "approvedAt"
       FROM purchase_requests
       ${whereClause}
       ORDER BY createdat DESC
       LIMIT ? OFFSET ?`,
      [...params, pageSize, offset]
    );

    return {
      success: true,
      requests,
      pagination: buildPagination(page, pageSize, Number(totalRow?.total || 0)),
      search,
    };
  }, 'Erro ao buscar solicitações');
});

app.get('/users', authAdmin, async (req, res) => {
  const { page, pageSize, search, offset } = getListParams(req, { pageSize: 20, maxPageSize: 100 });
  const searchTerm = search ? `%${search.toLowerCase()}%` : '';
  const whereClause = search
    ? `WHERE lower(email) LIKE ? OR lower(COALESCE(name, '')) LIKE ?`
    : '';
  const params = search ? [searchTerm, searchTerm] : [];

  await respondWithAdminCache(req, res, 'users', async () => {
    const totalRow = await dbGet(
      `SELECT COUNT(*) AS total
       FROM users
       ${whereClause}`,
      params
    );

    const rows = await dbAll(
      `SELECT id, name, email, expiresat AS "expiresAt", activesessionid AS "activeSessionId"
       FROM users
       ${whereClause}
       ORDER BY lower(email) ASC
       LIMIT ? OFFSET ?`,
      [...params, pageSize, offset]
    );

    const users = rows.map((user) => ({
      id: user.id,
      name: user.name || '',
      email: user.email,
      expiresAt: user.expiresAt,
      isActive: Boolean(user.activeSessionId),
    }));

    return {
      success: true,
      users,
      pagination: buildPagination(page, pageSize, Number(totalRow?.total || 0)),
      search,
    };
  }, 'Erro ao buscar usuários');
});

app.get('/users-progress', authAdmin, async (req, res) => {
  const { page, pageSize, search, offset } = getListParams(req, { pageSize: 20, maxPageSize: 100 });
  const searchTerm = search ? `%${search.toLowerCase()}%` : '';
  const whereClause = search
    ? `WHERE lower(u.email) LIKE ? OR lower(COALESCE(u.name, '')) LIKE ?`
    : '';
  const params = search ? [searchTerm, searchTerm] : [];

  await respondWithAdminCache(req, res, 'users-progress', async () => {
    const totalRow = await dbGet(
      `SELECT COUNT(*) AS total
       FROM users u
       ${whereClause}`,
      params
    );

    const rows = await dbAll(
      `SELECT
        u.id,
        u.name,
        u.email,
        u.expiresat AS "expiresAt",
        COUNT(up.moduleid) AS "touchedModules",
        COALESCE(SUM(CASE WHEN up.completed = 1 THEN 1 ELSE 0 END), 0) AS "completedModules",
        COALESCE(SUM(CASE WHEN up.quizpassed = 1 THEN 1 ELSE 0 END), 0) AS "passedQuizzes",
        COALESCE(MAX(up.updatedat), '') AS "lastActivity",
        COALESCE(ROUND(AVG(CASE WHEN up.quiztotal > 0 THEN (CAST(up.quizscore AS NUMERIC) / up.quiztotal) * 100 END), 1), 0) AS "averageScore"
       FROM users u
       LEFT JOIN user_progress up ON up.userid = u.id
       ${whereClause}
       GROUP BY u.id, u.name, u.email, u.expiresat
       ORDER BY lower(u.email) ASC
       LIMIT ? OFFSET ?`,
      [...params, pageSize, offset]
    );

    const summaries = rows.map((row) => ({
      id: row.id,
      name: row.name || '',
      email: row.email,
      expiresAt: row.expiresAt,
      touchedModules: Number(row.touchedModules || 0),
      completedModules: Number(row.completedModules || 0),
      passedQuizzes: Number(row.passedQuizzes || 0),
      totalModules: COURSE_MODULE_IDS.length,
      quizAverage: Number(row.averageScore || 0),
      certificateEligible: Number(row.completedModules || 0) >= COURSE_MODULE_IDS.length,
      lastUpdatedAt: row.lastActivity || null,
    }));

    return {
      success: true,
      summaries,
      pagination: buildPagination(page, pageSize, Number(totalRow?.total || 0)),
      search,
    };
  }, 'Erro ao buscar progresso dos usuários');
});

app.get('/credential-deliveries', authAdmin, async (req, res) => {
  const { page, pageSize, search, offset } = getListParams(req, { pageSize: 20, maxPageSize: 100 });
  const searchTerm = search ? `%${search.toLowerCase()}%` : '';
  const whereClause = search
    ? `WHERE lower(email) LIKE ? OR lower(COALESCE(name, '')) LIKE ?`
    : '';
  const params = search ? [searchTerm, searchTerm] : [];

  await respondWithAdminCache(req, res, 'credential-deliveries', async () => {
    const totalRow = await dbGet(
      `SELECT COUNT(*) AS total
       FROM credential_deliveries
       ${whereClause}`,
      params
    );

    const credentials = await dbAll(
      `SELECT id, userid AS "userId", name, email, plainpassword AS "plainPassword", createdat AS "createdAt"
       FROM credential_deliveries
       ${whereClause}
       ORDER BY createdat DESC
       LIMIT ? OFFSET ?`,
      [...params, pageSize, offset]
    );

    return {
      success: true,
      credentials,
      pagination: buildPagination(page, pageSize, Number(totalRow?.total || 0)),
      search,
    };
  }, 'Erro ao buscar credenciais geradas');
});

app.get('/system-status', authAdmin, async (req, res) => {
  await respondWithAdminCache(req, res, 'system-status', async () => ({ success: true, status: buildSystemStatus() }), 'Erro ao carregar diagnóstico');
});

app.get('/progress', auth, (req, res) => {
  db.all(
    `SELECT moduleid AS "moduleId", completed, quizpassed AS "quizPassed", quizscore AS "quizScore", quiztotal AS "quizTotal", quizattempted AS "quizAttempted", updatedat AS "updatedAt"
     FROM user_progress
     WHERE userid = ?`,
    [req.user.id],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Erro ao buscar progresso' });
      }

      res.json({ success: true, progress: mapProgressRows(rows) });
    }
  );
});

app.post('/progress', auth, (req, res) => {
  const moduleId = String(req.body.moduleId || '').trim();

  if (!COURSE_MODULE_IDS.includes(moduleId)) {
    return res.status(400).json({ success: false, message: 'Módulo inválido' });
  }

  const progressEntry = {
    completed: req.body.completed ? 1 : 0,
    quizPassed: req.body.quizPassed ? 1 : 0,
    quizScore: Number(req.body.quizScore || 0),
    quizTotal: Number(req.body.quizTotal || 0),
    quizAttempted: req.body.quizAttempted ? 1 : 0,
    updatedAt: new Date().toISOString(),
  };

  db.run(
    `INSERT INTO user_progress (userId, moduleId, completed, quizPassed, quizScore, quizTotal, quizAttempted, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(userId, moduleId)
     DO UPDATE SET
       completed = excluded.completed,
       quizPassed = excluded.quizPassed,
       quizScore = excluded.quizScore,
       quizTotal = excluded.quizTotal,
       quizAttempted = excluded.quizAttempted,
       updatedAt = excluded.updatedAt`,
    [
      req.user.id,
      moduleId,
      progressEntry.completed,
      progressEntry.quizPassed,
      progressEntry.quizScore,
      progressEntry.quizTotal,
      progressEntry.quizAttempted,
      progressEntry.updatedAt,
    ],
    (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Erro ao salvar progresso' });
      }

      invalidateAdminCache();

      res.json({
        success: true,
        progress: {
          completed: Boolean(progressEntry.completed),
          quizPassed: Boolean(progressEntry.quizPassed),
          quizScore: progressEntry.quizScore,
          quizTotal: progressEntry.quizTotal,
          quizAttempted: Boolean(progressEntry.quizAttempted),
          updatedAt: progressEntry.updatedAt,
        },
      });
    }
  );
});

app.get('/challenges', auth, async (req, res) => {
  try {
    const rows = await dbAll(
      `SELECT DISTINCT ON (moduleId)
         id,
         moduleId,
         challengeId,
         submissionType,
         score,
         maxScore,
         passed,
         feedbackJson,
         criteriaJson,
         createdAt
       FROM challenge_submissions
       WHERE userId = ?
       ORDER BY moduleId, createdAt DESC`,
      [req.user.id]
    );

    const latestByModule = rows.reduce((acc, row) => {
      acc[row.moduleId] = mapChallengeSubmissionRow(row);
      return acc;
    }, {});

    const challenges = COURSE_MODULE_IDS
      .map((moduleId) => {
        const challenge = buildPublicChallengeDefinition(moduleId);
        if (!challenge) {
          return null;
        }

        return {
          ...challenge,
          latestSubmission: latestByModule[moduleId] || null,
        };
      })
      .filter(Boolean);

    res.json({ success: true, challenges });
  } catch (error) {
    console.error('Erro ao carregar desafios:', error);
    res.status(500).json({ success: false, message: 'Erro ao carregar desafios do aluno.' });
  }
});

app.get('/challenge-submissions', auth, async (req, res) => {
  const moduleId = String(req.query.moduleId || '').trim();
  const params = [req.user.id];
  let whereClause = 'WHERE userId = ?';

  if (moduleId) {
    if (!COURSE_MODULE_IDS.includes(moduleId)) {
      return res.status(400).json({ success: false, message: 'Módulo inválido' });
    }

    whereClause += ' AND moduleId = ?';
    params.push(moduleId);
  }

  try {
    const rows = await dbAll(
      `SELECT id, moduleId, challengeId, submissionType, score, maxScore, passed, feedbackJson, criteriaJson, createdAt
       FROM challenge_submissions
       ${whereClause}
       ORDER BY createdAt DESC
       LIMIT 10`,
      params
    );

    res.json({ success: true, submissions: rows.map(mapChallengeSubmissionRow) });
  } catch (error) {
    console.error('Erro ao carregar histórico de desafios:', error);
    res.status(500).json({ success: false, message: 'Erro ao carregar histórico de desafios.' });
  }
});

app.post('/challenge-submissions', auth, async (req, res) => {
  const moduleId = String(req.body.moduleId || '').trim();
  const content = String(req.body.content || '').trim();
  const challenge = getChallengeDefinition(moduleId);

  if (!challenge) {
    return res.status(400).json({ success: false, message: 'Módulo inválido' });
  }

  if (content.length < 80) {
    return res.status(400).json({ success: false, message: 'Envie uma resposta mais completa para avaliar o desafio.' });
  }

  const evaluation = evaluateChallengeSubmission(moduleId, content);
  const createdAt = new Date().toISOString();

  try {
    const result = await dbRun(
      `INSERT INTO challenge_submissions (
         userId,
         moduleId,
         challengeId,
         submissionType,
         content,
         score,
         maxScore,
         passed,
         feedbackJson,
         criteriaJson,
         createdAt
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        req.user.id,
        moduleId,
        evaluation.challengeId,
        evaluation.submissionType,
        content,
        evaluation.score,
        evaluation.maxScore,
        evaluation.passed ? 1 : 0,
        JSON.stringify(evaluation.feedback),
        JSON.stringify(evaluation.criteria),
        createdAt,
      ]
    );

    invalidateAdminCache();

    res.json({
      success: true,
      submission: {
        id: result.lastID,
        moduleId,
        challengeId: evaluation.challengeId,
        submissionType: evaluation.submissionType,
        score: evaluation.score,
        maxScore: evaluation.maxScore,
        passed: evaluation.passed,
        feedback: evaluation.feedback,
        criteria: evaluation.criteria,
        createdAt,
      },
    });
  } catch (error) {
    console.error('Erro ao salvar submissão do desafio:', error);
    res.status(500).json({ success: false, message: 'Erro ao avaliar e salvar o desafio.' });
  }
});

app.post('/approve-purchase', authAdmin, async (req, res) => {
  const { requestId } = req.body;
  if (!requestId) {
    return res.status(400).json({ success: false, message: 'requestId é obrigatório' });
  }

  try {
    const request = await dbGet('SELECT * FROM purchase_requests WHERE id = ?', [requestId]);

    if (!request) {
      return res.status(404).json({ success: false, message: 'Solicitação não encontrada' });
    }

    if (request.status === 'approved') {
      return res.json({ success: false, message: 'Solicitação já aprovada' });
    }

    await approvePurchaseRequest(request, { approvalSource: 'manual' });

    res.json({ success: true, message: 'Solicitação aprovada e emails enviados' });
  } catch (error) {
    console.error('Erro ao aprovar compra manualmente:', error);
    res.status(500).json({ success: false, message: 'Erro ao aprovar solicitação' });
  }
});

app.post('/simulate-payment-webhook', authAdmin, async (req, res) => {
  const requestId = Number(req.body.requestId || 0);
  const paymentProvider = pickFirstString(req.body.paymentProvider, 'admin-simulation');
  const paymentReference = pickFirstString(req.body.paymentReference, `SIM-${Date.now()}`);
  const approvedAt = new Date().toISOString();

  if (!requestId) {
    return res.status(400).json({ success: false, message: 'requestId é obrigatório' });
  }

  try {
    const request = await dbGet('SELECT * FROM purchase_requests WHERE id = ?', [requestId]);

    if (!request) {
      return res.status(404).json({ success: false, message: 'Solicitação não encontrada' });
    }

    if (request.status === 'approved') {
      return res.json({ success: false, message: 'Solicitação já aprovada' });
    }

    await approvePurchaseRequest(request, {
      approvalSource: 'admin-simulation',
      paymentProvider,
      paymentReference,
      lastWebhookAt: approvedAt,
      approvedAt,
    });

    res.json({ success: true, message: 'Simulação executada e acesso liberado automaticamente.' });
  } catch (error) {
    console.error('Erro ao simular webhook de pagamento:', error);
    res.status(500).json({ success: false, message: 'Erro ao simular confirmação de pagamento' });
  }
});

app.post('/payment-webhook', async (req, res) => {
  if (!PAYMENT_WEBHOOK_SECRET) {
    return res.status(503).json({ success: false, message: 'Webhook secret não configurado' });
  }

  const receivedSecret = String(req.headers['x-payment-secret'] || '').trim();
  if (!receivedSecret || receivedSecret !== PAYMENT_WEBHOOK_SECRET) {
    return res.status(403).json({ success: false, message: 'Acesso negado' });
  }

  const payload = extractWebhookPayload(req.body);
  const { requestId, status, email, paymentReference, paymentProvider } = payload;

  if (!isPaidStatus(status)) {
    return res.json({ success: true, ignored: true, message: 'Status recebido não libera acesso' });
  }

  const webhookTimestamp = new Date().toISOString();

  if (!requestId && !email) {
    return res.status(400).json({ success: false, message: 'Informe requestId ou email para localizar a compra.' });
  }

  try {
    const request = requestId
      ? await dbGet('SELECT * FROM purchase_requests WHERE id = ?', [requestId])
      : await dbGet(
        `SELECT * FROM purchase_requests
         WHERE lower(trim(email)) = ?
         ORDER BY createdAt DESC
         LIMIT 1`,
        [email]
      );

    if (!request) {
      return res.status(404).json({ success: false, message: 'Solicitação de compra não encontrada' });
    }

    if (request.status === 'approved') {
      await dbRun(
        `UPDATE purchase_requests
         SET paymentProvider = ?, paymentReference = ?, lastWebhookAt = ?, approvalSource = COALESCE(NULLIF(approvalSource, ''), ?)
         WHERE id = ?`,
        [paymentProvider, paymentReference, webhookTimestamp, 'webhook', request.id]
      );

      return res.json({
        success: true,
        alreadyProcessed: true,
        message: 'Pagamento já havia sido confirmado anteriormente.',
      });
    }

    await approvePurchaseRequest(request, {
      approvalSource: 'webhook',
      paymentProvider,
      paymentReference,
      lastWebhookAt: webhookTimestamp,
    });

    res.json({ success: true, message: 'Pagamento confirmado e acesso liberado automaticamente.' });
  } catch (error) {
    console.error('Erro ao processar webhook de pagamento:', error);
    res.status(500).json({ success: false, message: 'Erro ao processar confirmação de pagamento' });
  }
});

app.post('/profile', auth, (req, res) => {
  const name = normalizeName(req.body.name);

  if (!name || name.length < 3) {
    return res.status(400).json({ success: false, message: 'Informe o nome completo para o certificado.' });
  }

  db.run(
    'UPDATE users SET name = ? WHERE id = ?',
    [name, req.user.id],
    (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Erro ao salvar nome do aluno.' });
      }

      res.json({ success: true, user: { ...req.user, name } });
    }
  );
});

app.get('/checkout', (req, res) => {
  res.redirect(PAGSEGURO_LINK);
});

// =========================
// DASHBOARD PROTEGIDO
// =========================
app.get('/dashboard', auth, (req, res) => {
  res.json({ message: 'Acesso autorizado', user: req.user });
});

// =========================
// START SERVER
// =========================
const PORT = process.env.PORT || 3000;
initDatabase()
  .then(() => {
    console.log(`PostgreSQL em ${databaseLabel}`);
    verifyMailerConfiguration().catch((error) => {
      console.error('Erro inesperado ao validar configuração SMTP:', error);
    });

    app.listen(PORT, () => {
      console.log(`🚀 Rodando em http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao inicializar PostgreSQL:', error);
    process.exit(1);
  });