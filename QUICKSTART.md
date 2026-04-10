# 🚀 GUIA RÁPIDO - PORTAL QUALIDADE DE SOFTWARE

## Começar em 3 passos

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar ambiente
```bash
# Windows PowerShell
set ADMIN_SECRET=sua_senha_muito_secreta
set DATABASE_URL=postgresql://usuario:senha@host:5432/database

# (Opcional) Se usar email real:
set ADMIN_EMAIL=voce@email.com
set PAYMENT_CLICK_NOTIFY_EMAIL=voce@email.com
set SMTP_HOST=smtp.gmail.com
set SMTP_PORT=587
set SMTP_USER=seu-email@gmail.com
set SMTP_PASS=sua-senha-app

# (Opcional, recomendado) Automação de pagamento:
set PAYMENT_WEBHOOK_SECRET=sua-chave-webhook
```

### 3. Iniciar servidor
```bash
npm start
```

Servidor rodando em: **http://localhost:3000**

---

## URLs Importantes

| URL | Descrição |
|-----|-----------|
| `http://localhost:3000` | 🌍 Landing page pública |
| `http://localhost:3000/login.html` | 🔐 Login dos alunos |
| `http://localhost:3000/admin.html` | 🔧 Painel administrativo |

---

## Fluxo de Vendas

### 1️⃣ Cliente acessa landing
- Vê descrição da trilha
- Clica em "Começar a estudar Qualidade de Software agora"

### 2️⃣ Cliente preenche cadastro
- Informa nome e email
- É redirecionado ao pagamento

### 3️⃣ Você pela admin
- Acessa `/admin.html` com sua senha
- Confirma no Mercado Pago que o pagamento foi aprovado
- Clica em `Simular webhook`
- Cliente recebe os dados de acesso por email

### 3️⃣ Alternativa automática via webhook
- Seu provedor chama `/payment-webhook`
- Envia `x-payment-secret` e `status=paid`
- O acesso é liberado automaticamente

### Fluxo recomendado agora
- Se você está usando o Mercado Pago, o caminho principal é confirmar o pagamento por lá e depois clicar em `Simular webhook` no admin.

### 4️⃣ Cliente faz login
- Acessa `/login.html`
- Estuda os 9 módulos
- Acompanha progresso

---

## Criar novo usuário (para admin)

Via API:
```bash
curl -X POST http://localhost:3000/create-user \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: SAI_SENHA_ADMIN_AQUI" \
  -d '{
    "email": "aluno@email.com",
    "password": "senha_super_segura",
    "days": 365
  }'
```

---

## Testes Rápidos

### Testar landing
Abrir: `http://localhost:3000`

### Testar formulário de compra
1. Preencher nome e email
2. Ver redirecionamento para o link de pagamento

### Testar admin
1. Acesse: `http://localhost:3000/admin.html`
2. Digite sua ADMIN_SECRET
3. Veja compras pendentes
4. Confira a seção "Status do Ambiente" para validar Render, SMTP e webhook

### Testar login
1. Crie um usuário (veja acima)
2. Acesse: `http://localhost:3000/login.html`
3. Faça login com email/senha

---

## Logs e Debug

### Emails simulados
Se SMTP não estiver configurado, emails aparecem assim:

```
--- EMAIL SIMULADO ---
Para: aluno@email.com
Assunto: Compra da trilha de Quality Assurance aprovada
Seu pagamento foi aprovado...
----------------------
```

### Ver todas as compras (admin)
```bash
curl -X GET http://localhost:3000/purchase-requests \
  -H "x-admin-secret: SUA_SENHA_AQUI"
```

### Simular confirmação automática de pagamento
```bash
curl -X POST http://localhost:3000/payment-webhook \
  -H "Content-Type: application/json" \
  -H "x-payment-secret: SUA_CHAVE_WEBHOOK" \
  -d '{
    "requestId": 1,
    "status": "paid",
    "paymentProvider": "pagseguro",
    "paymentReference": "TX-0001"
  }'
```

---

## Customizações

### Mudar preço da trilha
Editar: `public/index.html`
Procurar por: "R$ 197,00"

### Mudar nome da trilha
Editar: `public/index.html`
Procurar por: "Portal Qualidade de Software"

### Adicionar novo módulo
1. Criar `public/novo-modulo.html`
2. Copiar estrutura de outro módulo
3. Adicionar ao MODULES em `script.js`

---

## Arquivos Importantes

```
mini_saas_qa/
├── server.js              ← Backend (APIs)
├── package.json           ← Dependências
├── README.md              ← Documentação completa
├── .env.example           ← Exemplo config
└── public/
    ├── index.html         ← Landing (pública)
    ├── login.html         ← Login (autenticado)
    ├── admin.html         ← Admin
    └── [modulos].html     ← Conteúdo da trilha
```

---

## Suporte

❓ Dúvidas? Verifique:
1. Se ADMIN_SECRET está definido
2. Se npm install completou
3. Logs no terminal onde rodou `npm start`
4. README.md para documentação completa

---

**Boa sorte! 🎓**
