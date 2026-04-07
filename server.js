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
const ADMIN_SECRET = process.env.ADMIN_SECRET;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'qualimentor.mentoria@gmail.com';
const PAGSEGURO_LINK = process.env.PAGSEGURO_LINK || 'https://pag.ae/81E_Aa4jo';
const PAYMENT_WEBHOOK_SECRET = process.env.PAYMENT_WEBHOOK_SECRET;
const DATABASE_URL = String(process.env.DATABASE_URL || '').trim();
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
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

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: false,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
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

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function normalizeName(name) {
  return String(name || '').trim().replace(/\s+/g, ' ');
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

  await sendEmail({
    to: normalizedEmail,
    subject: 'Seu acesso ao curso QA está pronto',
    text: `Seu pagamento foi confirmado. Seus dados de acesso estão abaixo:\n\nLogin: ${normalizedEmail}\nSenha: ${generatedPassword}\n\nAcesse a página de login e entre com esses dados. Guarde esta mensagem para consultas futuras.`,
  });

  await sendEmail({
    to: ADMIN_EMAIL,
    subject: approvalSource === 'webhook' ? 'Compra QA aprovada automaticamente' : 'Compra QA aprovada',
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
      'SELECT id, name, email, expiresAt, activeSessionId FROM users WHERE id = ?',
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

  db.get('SELECT * FROM users WHERE lower(trim(email)) = ?', [email], async (err, user) => {
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

  const secret = req.headers['x-admin-secret'];
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

      const message = 'Cadastro registrado com sucesso. Você será direcionado para o pagamento.';
      const requestId = this.lastID;

      res.json({ success: true, message, requestId, paymentLink });

      setImmediate(async () => {
        try {
          await sendEmail({
            to: email,
            subject: 'Cadastro recebido - Curso QA',
            text: 'Recebemos seu cadastro para compra do curso QA. Após a confirmação do pagamento, enviaremos para este email os dados de acesso.',
          });

          await sendEmail({
            to: ADMIN_EMAIL,
            subject: 'Nova solicitação de compra - Portal QA',
            text: `Nova solicitação de compra recebida:\nEmail: ${email}\nNome: ${name || 'Não informado'}\nData: ${createdAt}`,
          });
        } catch (error) {
          console.error('Erro ao enviar emails de solicitação:', error);
        }
      });
    }
  );
});

app.get('/purchase-requests', authAdmin, (req, res) => {
  db.all('SELECT * FROM purchase_requests ORDER BY createdAt DESC', (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Erro ao buscar solicitações' });
    }
    res.json({ success: true, requests: rows });
  });
});

app.get('/users', authAdmin, (req, res) => {
  db.all(
    `SELECT id, name, email, expiresAt, activeSessionId
     FROM users
     ORDER BY email COLLATE NOCASE ASC`,
    (err, rows) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Erro ao buscar usuários' });
      }

      const users = rows.map((user) => ({
        id: user.id,
        name: user.name || '',
        email: user.email,
        expiresAt: user.expiresAt,
        isActive: Boolean(user.activeSessionId),
      }));

      res.json({ success: true, users });
    }
  );
});

app.get('/users-progress', authAdmin, (req, res) => {
  db.all(
    `SELECT
      u.id,
      u.name,
      u.email,
      u.expiresAt,
      COUNT(up.moduleId) AS touchedModules,
      COALESCE(SUM(CASE WHEN up.completed = 1 THEN 1 ELSE 0 END), 0) AS completedModules,
      COALESCE(SUM(CASE WHEN up.quizPassed = 1 THEN 1 ELSE 0 END), 0) AS passedQuizzes,
      COALESCE(MAX(up.updatedAt), '') AS lastActivity,
      COALESCE(ROUND(AVG(CASE WHEN up.quizTotal > 0 THEN (CAST(up.quizScore AS REAL) / up.quizTotal) * 100 END), 1), 0) AS averageScore
     FROM users u
     LEFT JOIN user_progress up ON up.userId = u.id
    GROUP BY u.id, u.name, u.email, u.expiresAt
     ORDER BY u.email COLLATE NOCASE ASC`,
    (err, rows) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Erro ao buscar progresso dos usuários' });
      }

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

      res.json({ success: true, summaries });
    }
  );
});

app.get('/credential-deliveries', authAdmin, (req, res) => {
  db.all(
    `SELECT id, userId, name, email, plainPassword, createdAt
     FROM credential_deliveries
     ORDER BY createdAt DESC`,
    (err, rows) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Erro ao buscar credenciais geradas' });
      }

      res.json({ success: true, credentials: rows });
    }
  );
});

app.get('/system-status', authAdmin, (req, res) => {
  res.json({ success: true, status: buildSystemStatus() });
});

app.get('/progress', auth, (req, res) => {
  db.all(
    `SELECT moduleId, completed, quizPassed, quizScore, quizTotal, quizAttempted, updatedAt
     FROM user_progress
     WHERE userId = ?`,
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
    app.listen(PORT, () => {
      console.log(`🚀 Rodando em http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao inicializar PostgreSQL:', error);
    process.exit(1);
  });