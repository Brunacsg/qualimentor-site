# Portal QA - Curso Completo de Qualidade de Software

## Descrição

Portal SaaS com curso completo de QA contendo 9 módulos de aprendizado com exemplos práticos, sistema de vendas com PIX, autenticação segura e painel administrativo.

## Recursos

- **Landing Page Pública**: Apresentação do curso, módulos e formulário de compra
- **Sistema de Compras**: Cadastro via email, geração de chave PIX, emails de confirmação
- **Autenticação Segura**: Login com email e senha apenas para usuários cadastrados
- **9 Módulos de Curso**: Integralmente do QA com conteúdo prático
- **Rastreamento de Progresso**: Acompanhe é completamento de cada módulo
- **Painel Admin**: Gerenciamento de compras e aprovação de pagamentos

## Instalação

### 1. Dependências

```bash
npm install
```

Dependências instaladas:
- `express` - Framework web
- `sqlite3` - Banco de dados
- `bcryptjs` - Hash de senhas
- `jsonwebtoken` - Autenticação JWT
- `nodemailer` - Envio de emails
- `cors` - Compartilhamento de recursos
- `body-parser` - Parsing de JSON

### 2. Configuração de Variáveis de Ambiente

Defina as seguintes variáveis de ambiente:

#### Segurança (obrigatório para admin)
```bash
set ADMIN_SECRET=sua_senha_admin_super_secreta
```

#### Banco SQLite (opcional)
```bash
set DB_PATH=caminho/para/database.db
```

No Render, sem `DB_PATH`, a aplicação usará `RENDER_DISK_PATH` quando existir. Se não houver disco persistente configurado, ela usará `/tmp/database.db` para garantir que o serviço consiga iniciar.

#### Email (opcional - simulado no console se não configurado)
```bash
set ADMIN_EMAIL=seu-email@dominio.com
set SMTP_HOST=smtp.seuservidor.com
set SMTP_PORT=587
set SMTP_USER=seu-usuario@dominio.com
set SMTP_PASS=sua-senha-email
```

**Exemplos de provedores SMTP:**
- Gmail: `smtp.gmail.com` (use senha de app específica)
- Outlook: `smtp-mail.outlook.com`
- SendGrid: `smtp.sendgrid.net`
- Mailgun: `smtp.mailgun.org`

### 3. Iniciar o Servidor

```bash
npm start
```

Servidor rodará em: `http://localhost:3000`

## Fluxo de Uso

### Para Clientes (Landing + Compra)

1. Acesse `http://localhost:3000` (página pública)
2. Veja os módulos disponíveis
3. Clique em "Compre o Curso Agora"
4. Preencha email e nome (opcional)
5. Receberá em breve a chave PIX
6. Após pagamento aprovado, recebe acesso ao curso

### Para Admin (Gerenciamento)

1. Acesse `http://localhost:3000/admin.html`
2. Digite a `ADMIN_SECRET` (senha admin)
3. Veja lista de solicitações de compra
4. Clique em "Aprovar" para cada venda autorizada
5. Sistema enviará emails de confirmação aos clientes

### Para Usuários (Acesso ao Curso)

1. Acesse `http://localhost:3000/login.html`
2. Faça login com email e senha fornecidos pelo admin
3. Acesse o dashboard do curso
4. Navegue pelos 9 módulos
5. Marque módulos como concluído para acompanhar progresso

## Endpoints da API

### Públicos

```
POST /purchase-request
  - email: string (obrigatório)
  - name: string (opcional)
  
  Resposta: { success: bool, message: string, requestId: number }
```

### Autenticados (Cliente)

```
POST /login
  - email: string
  - password: string
  
  Resposta: { success: bool, token: string }

GET /dashboard
  Headers: Authorization: token
  
  Resposta: { message: string, user: object }
```

### Admin (x-admin-secret header)

```
GET /purchase-requests
  Headers: x-admin-secret: sua_senha
  
  Resposta: { success: bool, requests: array }

POST /approve-purchase
  Headers: x-admin-secret: sua_senha
  Body: { requestId: number }
  
  Resposta: { success: bool, message: string }

POST /create-user
  Headers: x-admin-secret: sua_senha
  Body: { email: string, password: string, days: number }
  
  Resposta: { success: bool }
```

## Estrutura de Diretórios

```
mini_saas_qa/
├── server.js           # Backend Express
├── package.json        # Dependências
├── database.db         # SQLite (criado automaticamente)
└── public/
    ├── index.html           # Landing page
    ├── landing.js           # JS da landing
    ├── login.html           # Página de login
    ├── dashboard.html       # Dashboard do curso
    ├── intro.html           # Módulo 01-09 (páginas de conteúdo)
    ├── process.html
    ├── manual.html
    ├── automation.html
    ├── tools.html
    ├── agile.html
    ├── security.html
    ├── performance.html
    ├── career.html
    ├── admin.html           # Painel administrativo
    ├── script.js            # JS do curso e autenticação
    └── style.css            # Estilos globais

```

## Tabelas do Banco de Dados

### users
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  email TEXT UNIQUE,
  password TEXT (hash bcrypt),
  expiresAt TEXT (ISO date)
);
```

### purchase_requests
```sql
CREATE TABLE purchase_requests (
  id INTEGER PRIMARY KEY,
  email TEXT,
  name TEXT,
  status TEXT (pending|approved),
  pixKey TEXT,
  createdAt TEXT (ISO date),
  approvedAt TEXT (ISO date)
);
```

## Fluxo de Email

### Email de Compra Pendente (para cliente)
```
Para: email@cliente.com
Assunto: Solicitar compra recebida
Corpo: Instrução com chave PIX e passo a passo
```

### Email de Compra Aprovada (para cliente)
```
Para: email@cliente.com
Assunto: Compra aprovada - Acesso ao curso
Corpo: Confirmação e passo próximo
```

### Email de Compra Aprovada (para admin)
```
Para: ADMIN_EMAIL
Assunto: Nova compra aprovada
Corpo: Dados do cliente para enviar acesso
```

## Segurança

- ✅ Senhas com hash bcrypt
- ✅ Tokens JWT com expiração
- ✅ Admin secret para operações administrativas
- ✅ Headers x-admin-secret para proteção
- ✅ Validação de email
- ✅ Verificação de expiração de acesso
- ✅ Sem credenciais expostas no frontend

## Desenvolvimento

### Adicionar novo módulo de curso

1. Criar nova página `public/novo-modulo.html`
2. Adicionar `data-module="module-X"` ao body
3. Incluir painel de progresso (copiar de outro módulo)
4. Atualizar `script.js` - MODULES array com novo módulo
5. Adicionar link no dashboard

### Customizar preço

Editar `public/index.html` - seção de preço

### Customizar email

Editar funções `sendEmail()` em `server.js`

## Exemplos de Uso

### Criar usuário (admin)

```bash
curl -X POST http://localhost:3000/create-user \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: sua_senha_admin" \
  -d '{
    "email": "usuario@email.com",
    "password": "senha123456",
    "days": 365
  }'
```

### Listar compras (admin)

```bash
curl -X GET http://localhost:3000/purchase-requests \
  -H "x-admin-secret: sua_senha_admin"
```

### Aprovar compra (admin)

```bash
curl -X POST http://localhost:3000/approve-purchase \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: sua_senha_admin" \
  -d '{"requestId": 1}'
```

### Login

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@email.com",
    "password": "senha123456"
  }'
```

## Troubleshooting

### Emails não estão sendo enviados
- Verifique se `SMTP_HOST`, `SMTP_USER` e `SMTP_PASS` estão definidos
- Confira credenciais SMTP do seu provedor
- Veja logs no console para mensagens de email simulado

### Erro "ADMIN_SECRET não está definido"
- Defina `set ADMIN_SECRET=sua_senha` antes de iniciar

### "Usuário não encontrado" no login
- Verifique se o email foi criado com `/create-user`
- Confirme se a data de expiração não passou

### PIX key não está sendo gerada
- Confira se `/purchase-request` retorna sucesso
- Verifique logs do servidor

## Suporte

Para dúvidas sobre configuração ou uso, verifique os logs do terminal onde o servidor está rodando.

---

**Desenvolvido como SaaS completo com curso interativo de QA**
