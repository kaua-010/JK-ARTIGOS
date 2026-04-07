# Script Ultra-Simples de Deploy para Vercel
# JK Store - Bíblias Sagradas

Write-Host "╔═══════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  🚀 DEPLOY VERCEL - JK STORE (2 MINUTOS)       ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

Set-Location "C:\Users\kauav\TRABALHOS\JK-ARTIGOS"

# Instalar dependências
Write-Host "✓ Verificando dependências..." -ForegroundColor Green
npm install --silent

Write-Host ""
Write-Host "╔═══════════════════════════════════════════════════╗" -ForegroundColor Yellow
Write-Host "║        AÇÃO DO USUÁRIO NECESSÁRIA               ║" -ForegroundColor Yellow
Write-Host "║                                                    ║" -ForegroundColor Yellow
Write-Host "║  1. Um navegador vai abrir para você fazer      ║" -ForegroundColor Yellow
Write-Host "║     login no Vercel                              ║" -ForegroundColor Yellow
Write-Host "║                                                    ║" -ForegroundColor Yellow
Write-Host "║  2. Clique em "Authorize Vercel"                 ║" -ForegroundColor Yellow
Write-Host "║                                                    ║" -ForegroundColor Yellow
Write-Host "║  3. Volte aqui quando terminar                   ║" -ForegroundColor Yellow
Write-Host "║                                                    ║" -ForegroundColor Yellow
Write-Host "║  Pronto em 30 segundos! ⏱️                       ║" -ForegroundColor Yellow
Write-Host "╚═══════════════════════════════════════════════════╝" -ForegroundColor Yellow
Write-Host ""

Read-Host "Pressione ENTER para começar o login no Vercel"

Write-Host ""
Write-Host "Abrindo navegador para login..." -ForegroundColor Cyan

# Fazer login
vercel login

Write-Host ""
Write-Host "✅ Login realizado!" -ForegroundColor Green
Write-Host ""
Write-Host "Iniciando deploy..." -ForegroundColor Cyan
Write-Host ""

# Fazer deploy
vercel --prod

Write-Host ""

if ($LASTEXITCODE -eq 0) {
    Write-Host "╔═══════════════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║         ✅ DEPLOY CONCLUÍDO COM SUCESSO!         ║" -ForegroundColor Green
    Write-Host "╚═══════════════════════════════════════════════════╝" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎉 Seu site está ONLINE agora!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📍 Para ver o link:" -ForegroundColor Cyan
    Write-Host "   1. Acesse: https://vercel.com/dashboard" -ForegroundColor Cyan
    Write-Host "   2. Procure por 'jk-store' ou seu projeto" -ForegroundColor Cyan
    Write-Host "   3. Copie o link da 'Production'" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📱 Compartilhe:" -ForegroundColor Yellow
    Write-Host "   ✓ Instagram Bio" -ForegroundColor Yellow
    Write-Host "   ✓ Instagram Stories" -ForegroundColor Yellow
    Write-Host "   ✓ Posts" -ForegroundColor Yellow
    Write-Host "   ✓ WhatsApp Status" -ForegroundColor Yellow
    Write-Host ""
} else {
    Write-Host "❌ Erro no deploy" -ForegroundColor Red
    Write-Host "Tente manualmente: vercel --prod" -ForegroundColor Red
}

Write-Host ""
Read-Host "Pressione ENTER para sair"
