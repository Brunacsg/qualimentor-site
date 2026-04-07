const { Pool } = require('pg');

const DATABASE_URL = String(process.env.DATABASE_URL || '').trim();

if (!DATABASE_URL) {
  console.error('Erro: DATABASE_URL não está definido. Configure a string de conexão do PostgreSQL.');
  process.exit(1);
}

function shouldUseSsl(connectionString) {
  try {
    const parsed = new URL(connectionString);
    const host = String(parsed.hostname || '').toLowerCase();
    return host && host !== 'localhost' && host !== '127.0.0.1';
  } catch (error) {
    return true;
  }
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: shouldUseSsl(DATABASE_URL) ? { rejectUnauthorized: false } : false,
});

function databaseLabel() {
  try {
    const parsed = new URL(DATABASE_URL);
    return `${parsed.hostname}${parsed.pathname}`;
  } catch (error) {
    return 'postgres';
  }
}

function stripTrailingSemicolon(sql) {
  return String(sql).trim().replace(/;$/, '');
}

function translatePlaceholders(sql) {
  let index = 0;
  let result = '';
  let inSingleQuote = false;
  let inDoubleQuote = false;

  for (let position = 0; position < sql.length; position += 1) {
    const char = sql[position];
    const previous = sql[position - 1];

    if (char === "'" && previous !== '\\' && !inDoubleQuote) {
      inSingleQuote = !inSingleQuote;
      result += char;
      continue;
    }

    if (char === '"' && previous !== '\\' && !inSingleQuote) {
      inDoubleQuote = !inDoubleQuote;
      result += char;
      continue;
    }

    if (char === '?' && !inSingleQuote && !inDoubleQuote) {
      index += 1;
      result += `$${index}`;
      continue;
    }

    result += char;
  }

  return result;
}

function prepareSql(sql, options = {}) {
  let prepared = translatePlaceholders(stripTrailingSemicolon(sql));

  if (options.returningId && /^insert\s+/i.test(prepared) && !/\breturning\b/i.test(prepared)) {
    prepared = `${prepared} RETURNING id`;
  }

  return prepared;
}

function query(sql, params = [], options = {}) {
  return pool.query(prepareSql(sql, options), params);
}

const db = {
  serialize(callback) {
    callback();
  },

  run(sql, params, callback) {
    const normalizedParams = typeof params === 'function' || params === undefined ? [] : params;
    const normalizedCallback = typeof params === 'function' ? params : callback;

    query(sql, normalizedParams, { returningId: true })
      .then((result) => {
        const context = {
          lastID: result.rows[0]?.id || null,
          changes: result.rowCount || 0,
        };

        if (normalizedCallback) {
          normalizedCallback.call(context, null);
        }
      })
      .catch((error) => {
        if (normalizedCallback) {
          normalizedCallback.call({ lastID: null, changes: 0 }, error);
          return;
        }

        console.error('Erro ao executar query:', error);
      });
  },

  get(sql, params, callback) {
    const normalizedParams = typeof params === 'function' || params === undefined ? [] : params;
    const normalizedCallback = typeof params === 'function' ? params : callback;

    query(sql, normalizedParams)
      .then((result) => {
        normalizedCallback?.(null, result.rows[0] || undefined);
      })
      .catch((error) => {
        normalizedCallback?.(error);
      });
  },

  all(sql, params, callback) {
    const normalizedParams = typeof params === 'function' || params === undefined ? [] : params;
    const normalizedCallback = typeof params === 'function' ? params : callback;

    query(sql, normalizedParams)
      .then((result) => {
        normalizedCallback?.(null, result.rows);
      })
      .catch((error) => {
        normalizedCallback?.(error);
      });
  },
};

async function initDatabase() {
  await pool.query('SELECT 1');

  await pool.query(`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    expiresAt TEXT,
    activeSessionId TEXT
  )`);

  await pool.query(`CREATE TABLE IF NOT EXISTS purchase_requests (
    id SERIAL PRIMARY KEY,
    email TEXT,
    name TEXT,
    status TEXT,
    pixKey TEXT,
    paymentProvider TEXT,
    paymentReference TEXT,
    approvalSource TEXT,
    lastWebhookAt TEXT,
    createdAt TEXT,
    approvedAt TEXT
  )`);

  await pool.query(`CREATE TABLE IF NOT EXISTS user_progress (
    id SERIAL PRIMARY KEY,
    userId INTEGER NOT NULL,
    moduleId TEXT NOT NULL,
    completed INTEGER DEFAULT 0,
    quizPassed INTEGER DEFAULT 0,
    quizScore INTEGER DEFAULT 0,
    quizTotal INTEGER DEFAULT 0,
    quizAttempted INTEGER DEFAULT 0,
    updatedAt TEXT NOT NULL,
    UNIQUE(userId, moduleId)
  )`);

  await pool.query(`CREATE TABLE IF NOT EXISTS credential_deliveries (
    id SERIAL PRIMARY KEY,
    userId INTEGER,
    name TEXT,
    email TEXT NOT NULL,
    plainPassword TEXT NOT NULL,
    createdAt TEXT NOT NULL
  )`);

  await pool.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS name TEXT');
  await pool.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS activeSessionId TEXT');
  await pool.query('ALTER TABLE purchase_requests ADD COLUMN IF NOT EXISTS paymentProvider TEXT');
  await pool.query('ALTER TABLE purchase_requests ADD COLUMN IF NOT EXISTS paymentReference TEXT');
  await pool.query('ALTER TABLE purchase_requests ADD COLUMN IF NOT EXISTS approvalSource TEXT');
  await pool.query('ALTER TABLE purchase_requests ADD COLUMN IF NOT EXISTS lastWebhookAt TEXT');
}

module.exports = {
  db,
  initDatabase,
  pool,
  databaseLabel: databaseLabel(),
};