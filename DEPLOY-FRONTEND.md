# 🚀 Configuração Final - Deploy Frontend na Vercel

## ✅ Mudanças Realizadas:

1. **`composables/useApi.ts`** - Agora usa `config.public.apiUrl` em vez de localhost fixo
2. **`nuxt.config.ts`** - Adicionado `runtimeConfig` com URL da API
3. **`.gitignore`** - Configurado para ignorar `.env`

---

## 🔧 Configuração na Vercel (Frontend):

### 1. Acesse o projeto na Vercel

Vá em: https://vercel.com/dashboard

### 2. Configure a Variável de Ambiente

1. Clique no seu projeto do frontend
2. Vá em **Settings** → **Environment Variables**
3. Adicione a seguinte variável:

```
Key: NUXT_PUBLIC_API_URL
Value: https://agromaq-back.vercel.app/api
```

4. Selecione os ambientes:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

5. Clique em **Save**

### 3. Redeploy

Após adicionar a variável:

**Opção A - Automático:**
- Faça um novo commit (já feito!) e push
- A Vercel fará redeploy automaticamente

**Opção B - Manual:**
1. Vá em **Deployments**
2. Clique nos três pontos (`...`) do último deploy
3. Clique em **Redeploy**
4. Marque **Use existing Build Cache** (desmarque para rebuild completo)
5. Clique em **Redeploy**

---

## 📋 Checklist de Verificação:

### Backend:
- [x] Deploy no Vercel: https://agromaq-back.vercel.app
- [x] CORS configurado para aceitar requisições do frontend
- [x] Endpoints funcionando (teste: `/api/categorias`)

### Frontend:
- [x] Código atualizado no GitHub
- [ ] Variável `NUXT_PUBLIC_API_URL` configurada na Vercel
- [ ] Redeploy realizado
- [ ] Testar login e funcionalidades

---

## 🧪 Como Testar:

### 1. Testar Backend (deve retornar JSON):
```bash
curl https://agromaq-back.vercel.app/api/categorias
curl https://agromaq-back.vercel.app/api/marcas
```

### 2. Testar Frontend:
1. Acesse sua URL da Vercel (ex: `https://agromaq.vercel.app`)
2. Tente fazer login
3. Navegue pela aplicação
4. Verifique o console do navegador (F12) para erros

### 3. Desenvolvimento Local:
```bash
# Frontend (usa localhost:4000)
npm run dev

# Backend (outro terminal)
cd backend
npm run dev
```

---

## 🔍 Solução de Problemas:

### Erro: "Network Error" ou "Failed to fetch"

**Causa:** Variável de ambiente não configurada na Vercel

**Solução:**
1. Vá em Settings → Environment Variables
2. Adicione `NUXT_PUBLIC_API_URL=https://agromaq-back.vercel.app/api`
3. Faça redeploy

### Erro: "CORS policy"

**Causa:** Backend não está aceitando requisições do frontend

**Solução:**
- Verifique se o backend tem o CORS configurado em `src/main.ts`
- Já está configurado para aceitar `*.vercel.app`

### Frontend continua chamando localhost

**Causa:** Build antigo em cache

**Solução:**
1. Limpe o cache: `rm -rf .nuxt .output`
2. Rebuilde: `npm run build`
3. Na Vercel, faça redeploy sem cache

---

## 📱 URLs Finais:

- **Backend API:** https://agromaq-back.vercel.app/api
- **Frontend:** https://seu-projeto.vercel.app (sua URL da Vercel)

---

## ✅ Tudo Pronto!

O frontend agora:
- ✅ Usa `https://agromaq-back.vercel.app/api` em produção
- ✅ Usa `http://localhost:4000/api` em desenvolvimento local
- ✅ Variável configurável via `NUXT_PUBLIC_API_URL`

**Próximo passo:** Configure a variável na Vercel e faça o redeploy! 🚀
