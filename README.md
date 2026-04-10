# Portal Qualidade de Software - Trilha Completa do Quality Assurance

## Descrição

Portal SaaS com trilha completa de Quality Assurance contendo 9 módulos de aprendizado com exemplos práticos, sistema de vendas com link de pagamento, autenticação segura e painel administrativo.

## Recursos

- **Landing Page Pública**: Apresentação da trilha, módulos e formulário de compra
- **Sistema de Compras**: Cadastro via email, geração de chave PIX, emails de confirmação
- **Autenticação Segura**: Login com email e senha apenas para usuários cadastrados
- **9 Módulos da Trilha**: Integralmente de Qualidade de Software com conteúdo prático
- **Rastreamento de Progresso**: Acompanhe é completamento de cada módulo
- **Painel Admin**: Gerenciamento de compras e aprovação de pagamentos

## Instalação

### 1. Dependências

```bash
npm install
```

Dependências instaladas:
- `express` - Framework web
- `pg` - PostgreSQL
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

#### Banco PostgreSQL (obrigatório)
```bash
set DATABASE_URL=postgresql://usuario:senha@host:5432/database
```

Use aqui a string de conexão do Supabase, Render PostgreSQL ou outro provedor compatível.

#### Email (opcional - simulado no console se não configurado)
```bash
set ADMIN_EMAIL=seu-email@dominio.com
set PAYMENT_CLICK_NOTIFY_EMAIL=seu-email@dominio.com
set SMTP_HOST=smtp.seuservidor.com
set SMTP_PORT=587
set SMTP_USER=seu-usuario@dominio.com
set SMTP_PASS=sua-senha-email
```

`PAYMENT_CLICK_NOTIFY_EMAIL` define quem recebe o aviso assim que o aluno clicar em "Ir para o pagamento". Se não for informado, o sistema usa `ADMIN_EMAIL`.

#### Webhook de pagamento (opcional, recomendado para automação)
```bash
set PAYMENT_WEBHOOK_SECRET=uma_chave_longa_e_unica
```

Com essa chave configurada, o endpoint `POST /payment-webhook` pode confirmar pagamentos automaticamente e liberar acesso sem intervenção manual.

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
3. Clique em "Começar a estudar Qualidade de Software agora"
4. Preencha nome e email
5. Siga para o link de pagamento
6. Após pagamento aprovado, recebe os dados de acesso à trilha

### Para Admin (Gerenciamento)

1. Acesse `http://localhost:3000/admin.html`
2. Digite a `ADMIN_SECRET` (senha admin)
3. Veja lista de solicitações de compra
4. Confirme no Mercado Pago que o pagamento foi aprovado
5. Clique em `Simular webhook` para liberar o acesso automaticamente
6. O sistema enviará os emails e registrará os dados de acesso no admin

### Fluxo Recomendado com Mercado Pago

Se você usa o Mercado Pago para acompanhar os recebimentos, o fluxo recomendado é semi-automático:

1. O aluno preenche nome e email na landing
2. O aluno é redirecionado para o link de pagamento
3. Você confirma no Mercado Pago que o pagamento foi aprovado
4. Você abre `admin.html` e clica em `Simular webhook`
5. O sistema libera acesso, envia email e grava os dados de acesso para consulta futura

### Para Automação de Pagamento

1. Configure `PAYMENT_WEBHOOK_SECRET`
2. No provedor de pagamento ou ferramenta intermediária, envie `POST /payment-webhook`
3. Inclua o header `x-payment-secret` com o mesmo valor configurado
4. Envie `status=paid` ou `approved`
5. O sistema aprova a compra, libera o acesso, envia email e registra a credencial no admin

### Para Usuários (Acesso à Trilha)

1. Acesse `http://localhost:3000/login.html`
2. Faça login com email e senha fornecidos pelo admin
3. Acesse o dashboard da trilha
4. Navegue pelos 9 módulos
5. Marque módulos como concluído para acompanhar progresso

## Endpoints da API

### Públicos

```
POST /purchase-request
  - email: string (obrigatório)
  - name: string (obrigatório)
  
  Resposta: { success: bool, message: string, requestId: number }

  Efeitos colaterais:
  - envia email de confirmação para o aluno
  - envia email administrativo avisando que o aluno clicou em "Ir para o pagamento"

POST /payment-webhook
  Headers: x-payment-secret: sua_chave_webhook
  - requestId: number (opcional se email for informado)
  - email: string (opcional se requestId for informado)
  - status: string (paid|approved|completed|confirmed)
  - paymentProvider: string (opcional)
  - paymentReference: string (opcional)

  Resposta: { success: bool, message: string }

POST /simulate-payment-webhook
  Headers: x-admin-secret: sua_senha_admin
  Body: { requestId: number, paymentProvider?: string, paymentReference?: string }

  Resposta: { success: bool, message: string }
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
├── database.js         # Camada de acesso PostgreSQL
└── public/
    ├── index.html           # Landing page
    ├── landing.js           # JS da landing
    ├── login.html           # Página de login
    ├── dashboard.html       # Dashboard da trilha
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
    ├── script.js            # JS da trilha e autenticação
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
  paymentProvider TEXT,
  paymentReference TEXT,
  approvalSource TEXT,
  lastWebhookAt TEXT,
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
Assunto: Compra aprovada - Acesso à trilha
Corpo: Confirmação e passo próximo
```

### Email quando o aluno vai para o pagamento
```
Para: PAYMENT_CLICK_NOTIFY_EMAIL (ou ADMIN_EMAIL)
Assunto: Aluno clicou em Ir para o pagamento
Corpo: nome, email, data, id da solicitação e link de pagamento
```

### Email de Compra Aprovada (para admin)
```
Para: ADMIN_EMAIL
Assunto: Nova compra aprovada
Corpo: Dados do cliente para enviar acesso
```

## Webhook de Pagamento

Exemplo de chamada:

```bash
curl -X POST http://localhost:3000/payment-webhook \
  -H "Content-Type: application/json" \
  -H "x-payment-secret: SUA_CHAVE_WEBHOOK" \
  -d '{
    "requestId": 12,
    "status": "paid",
    "paymentProvider": "pagseguro",
    "paymentReference": "TXN-2026-0001"
  }'
```

O endpoint também aceita payloads alternativos comuns em gateways, por exemplo `reference_id`, `transactionId`, `customer.email`, `sender.email`, `charges[0].status` e `charges[0].reference_id`.

Se quiser validar sem depender do provedor, o painel admin agora tem o botão `Simular webhook`, e a API também aceita este teste manual:

```bash
curl -X POST http://localhost:3000/simulate-payment-webhook \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: SUA_SENHA_ADMIN" \
  -d '{
    "requestId": 12,
    "paymentProvider": "pagseguro-simulado"
  }'
```

Se o provedor não devolver `requestId`, você pode confirmar pela combinação do email e status:

```bash
curl -X POST http://localhost:3000/payment-webhook \
  -H "Content-Type: application/json" \
  -H "x-payment-secret: SUA_CHAVE_WEBHOOK" \
  -d '{
    "email": "aluno@email.com",
    "status": "approved",
    "paymentProvider": "pagseguro",
    "paymentReference": "TXN-2026-0002"
  }'
```

Se você não tiver webhook no seu fluxo atual do PagBank, use o botão `Simular webhook` no painel admin. Esse é o caminho recomendado até migrar para uma integração via painel developer/API.

## Segurança

- ✅ Senhas com hash bcrypt
- ✅ Tokens JWT com expiração
- ✅ Admin secret para operações administrativas
- ✅ Headers x-admin-secret para proteção
- ✅ Validação de email
- ✅ Verificação de expiração de acesso
- ✅ Sem credenciais expostas no frontend

## Desenvolvimento

### Adicionar novo módulo da trilha

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

**Desenvolvido como SaaS completo com trilha interativa de Qualidade de Software**
