@echo off
REM Deploy automático para Vercel - JK Store

echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║     🚀 DEPLOY AUTOMÁTICO - JK STORE PARA VERCEL       ║
echo ╚════════════════════════════════════════════════════════╝
echo.

cd /d "C:\Users\kauav\TRABALHOS\JK-ARTIGOS"

echo 1️⃣ Verificando dependências...
call npm install

echo.
echo 2️⃣ Preparando para deploy...
echo Você será redirecionado para fazer login no Vercel.
echo.
echo Passo 1: Clique no navegador quando aparecer
echo Passo 2: Faça login com sua conta do GitHub (recomendado)
echo Passo 3: Autorize o Vercel
echo Passo 4: Volte para o terminal
echo.
pause

echo.
echo 3️⃣ Iniciando deploy...
call vercel

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ DEPLOY CONCLUÍDO COM SUCESSO!
    echo.
    echo Seu site está no ar! 🎉
    echo.
    echo Para acessar e obter o link:
    echo 1. Acesse: https://vercel.com/dashboard
    echo 2. Clique em "Deployments"
    echo 3. Veja o link do seu projeto
    echo.
) else (
    echo.
    echo ❌ Erro no deploy. Tente novamente.
    echo.
)

pause
