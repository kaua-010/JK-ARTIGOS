#!/bin/bash

# JK Store - Script de Inicialização Rápida
# Use este script para configurar tudo automaticamente (macOS/Linux)

echo "🚀 JK Store - Setup Automático"
echo "==============================="
echo ""

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado!"
    echo "📥 Baixe em: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js v$(node --version) encontrado"

# Instalar dependências
echo ""
echo "📦 Instalando dependências..."
npm install

# Copiar arquivo .env
if [ ! -f .env ]; then
    echo ""
    echo "⚙️  Criando arquivo .env..."
    cp .env.example .env
    echo "⚠️  EDITE o arquivo .env com seus dados!"
    echo "📝 Abra em: .env"
fi

echo ""
echo "✅ Setup concluído!"
echo ""
echo "🚀 Para iniciar o servidor, execute:"
echo "   npm run dev"
echo ""
echo "🌐 Acesse: http://localhost:5000"
echo ""
