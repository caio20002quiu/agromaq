# 🚀 Guia de Configuração - Agromaq

## ✅ Backend deployado na Vercel

**URL do Backend:** https://agromaq-back.vercel.app/api

---

## 📝 Configurações realizadas:

### 1. Backend (CORS configurado)
✅ Arquivo `backend/src/main.ts` atualizado para aceitar requisições do frontend Vercel
✅ Aceita localhost (desenvolvimento) e *.vercel.app (produção)

### 2. Frontend (URL da API configurada)
✅ Arquivo `composables/useApi.ts` atualizado para usar variável de ambiente
✅ Arquivo `nuxt.config.ts` configurado com runtimeConfig
✅ URL padrão: https://agromaq-back.vercel.app/api

---

## 🔄 Próximos passos:

### Para fazer deploy do Frontend na Vercel:

1. **Commit e push das alterações:**
   ```bash
   git add .
   git commit -m "Configurar comunicação frontend-backend"
   git push
   ```

2. **Deploy na Vercel:**
   - Acesse https://vercel.com/
   - New Project
   - Import seu repositório `agromaq`
   - **Root Directory:** deixe em branco (raiz)
   - **Environment Variables:** Adicione:
     ```
     NUXT_PUBLIC_API_URL=https://agromaq-back.vercel.app/api
     ```
   - Deploy!

3. **Após o deploy:**
   - Atualize o CORS no backend se necessário (caso o domínio do frontend seja diferente)
   - Teste a aplicação completa

---

## 🧪 Testar localmente:

```bash
# Backend (terminal 1)
cd backend
npm run dev

# Frontend (terminal 2)
cd ..
npm run dev
```

Acesse: http://localhost:3000

---

## 🌐 URLs em Produção:

- **Backend:** https://agromaq-back.vercel.app/api
- **Frontend:** https://seu-projeto.vercel.app (após deploy)

---

## 🔧 Verificar se o backend está funcionando:

Teste os endpoints:
- https://agromaq-back.vercel.app/api/categorias
- https://agromaq-back.vercel.app/api/marcas

Se retornar JSON, está funcionando! ✅

---

## ⚠️ Importante:

- O backend já está configurado para aceitar requisições do frontend na Vercel
- O frontend está configurado para usar o backend da Vercel em produção
- Em desenvolvimento local, continua usando localhost
- Se mudar o domínio do frontend, atualize o CORS no `backend/src/main.ts`
