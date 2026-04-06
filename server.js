const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const SECRET = 'segredo_super_forte';
const ADMIN_SECRET = process.env.ADMIN_SECRET;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'qualimentor.mentoria@gmail.com';
const PAGSEGURO_LINK = process.env.PAGSEGURO_LINK || 'https://pag.ae/81E_Aa4jo';
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

// =========================
// DATABASE
// =========================
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    expiresAt TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS purchase_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    name TEXT,
    status TEXT,
    pixKey TEXT,
    createdAt TEXT,
    approvedAt TEXT
  )`);

  if (!ADMIN_SECRET) {
    console.warn('Aviso: ADMIN_SECRET não está definido. /create-user e /approve-purchase estarão desabilitados. Defina ADMIN_SECRET para liberar administração.')
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
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
}

// =========================
// LOGIN
// =========================
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
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

    const token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET,
      { expiresIn: '1d' }
    );

    res.json({ success: true, token });
  });
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
  const { email, password, days } = req.body;

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
    'INSERT INTO users (email, password, expiresAt) VALUES (?, ?, ?)',
    [email, hash, expiresAt.toISOString()],
    function (err) {
      if (err) {
        return res.status(500).json({ success: false, message: 'Erro ao criar usuário' });
      }
      res.json({ success: true });
    }
  );
});

app.post('/purchase-request', async (req, res) => {
  const { email, name } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Email inválido' });
  }

  const paymentLink = PAGSEGURO_LINK;
  const createdAt = new Date().toISOString();

  db.run(
    'INSERT INTO purchase_requests (email, name, status, pixKey, createdAt) VALUES (?, ?, ?, ?, ?)',
    [email, name || '', 'pending', paymentLink, createdAt],
    async function (err) {
      if (err) {
        return res.status(500).json({ success: false, message: 'Erro ao registrar solicitação' });
      }

      const message = `Solicitação registrada com sucesso. Em breve você receberá minha confirmação por email e o link PagSeguro será enviado em seguida.`;

      try {
        await sendEmail({
          to: email,
          subject: 'Solicitação recebida - Curso QA',
          text: `Recebemos sua solicitação de compra. Em breve você receberá um email com as instruções de pagamento.`,
        });

        await sendEmail({
          to: ADMIN_EMAIL,
          subject: 'Nova solicitação de compra - Portal QA',
          text: `Nova solicitação de compra recebida:\nEmail: ${email}\nNome: ${name || 'Não informado'}\nData: ${createdAt}`,
        });
      } catch (error) {
        console.error('Erro ao enviar emails de solicitação:', error);
      }

      res.json({ success: true, message, requestId: this.lastID });
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

app.post('/approve-purchase', authAdmin, async (req, res) => {
  const { requestId } = req.body;
  if (!requestId) {
    return res.status(400).json({ success: false, message: 'requestId é obrigatório' });
  }

  db.get('SELECT * FROM purchase_requests WHERE id = ?', [requestId], async (err, request) => {
    if (err || !request) {
      return res.status(404).json({ success: false, message: 'Solicitação não encontrada' });
    }

    if (request.status === 'approved') {
      return res.json({ success: false, message: 'Solicitação já aprovada' });
    }

    const approvedAt = new Date().toISOString();
    db.run(
      'UPDATE purchase_requests SET status = ?, approvedAt = ? WHERE id = ?',
      ['approved', approvedAt, requestId],
      async function (updateErr) {
        if (updateErr) {
          return res.status(500).json({ success: false, message: 'Erro ao aprovar solicitação' });
        }

        const generatedPassword = Math.random().toString(36).slice(2, 10) + Math.floor(Math.random() * 90 + 10);
        const hashedPassword = await bcrypt.hash(generatedPassword, 10);
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 365);

        try {
          db.get('SELECT * FROM users WHERE email = ?', [request.email], async (userErr, existingUser) => {
            if (userErr) {
              console.error('Erro ao buscar usuário existente:', userErr);
              return;
            }

            if (existingUser) {
              db.run(
                'UPDATE users SET password = ?, expiresAt = ? WHERE id = ?',
                [hashedPassword, expiresAt.toISOString(), existingUser.id],
                function (updateUserErr) {
                  if (updateUserErr) {
                    console.error('Erro ao atualizar usuário:', updateUserErr);
                  }
                }
              );
            } else {
              db.run(
                'INSERT INTO users (email, password, expiresAt) VALUES (?, ?, ?)',
                [request.email, hashedPassword, expiresAt.toISOString()],
                function (insertErr) {
                  if (insertErr) {
                    console.error('Erro ao criar usuário:', insertErr);
                  }
                }
              );
            }
          });

          await sendEmail({
            to: request.email,
            subject: 'Seu acesso ao curso QA está pronto',
            text: `Seu pagamento foi confirmado. Seus dados de acesso estão abaixo:\n\nEmail: ${request.email}\nSenha: ${generatedPassword}\n\nAcesse a página de login e entre com esses dados.`,
          });

          await sendEmail({
            to: ADMIN_EMAIL,
            subject: 'Compra QA aprovada',
            text: `A solicitação de compra do email ${request.email} foi aprovada e os dados de acesso foram gerados.\n\nSolicitação aprovada em ${approvedAt}.`,
          });
        } catch (error) {
          console.error('Erro ao enviar emails de aprovação:', error);
        }

        res.json({ success: true, message: 'Solicitação aprovada e emails enviados' });
      }
    );
  });
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
app.listen(3000, () => {
  console.log('🚀 Rodando em http://localhost:3000');
});