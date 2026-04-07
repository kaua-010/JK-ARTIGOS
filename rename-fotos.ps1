# Script de Renomeação de Fotos - JK Store
# Use este script para renomear fotos automaticamente

# ╔═════════════════════════════════════════════════════════════════╗
# ║           RENOMEAR FOTOS AUTOMATICAMENTE                       ║
# ║  Este script organiza fotos em: biblia-[cor]-[numero].jpg      ║
# ╚═════════════════════════════════════════════════════════════════╝

# IMPORTANTE: Execute este arquivo assim:
# 1. Abra PowerShell como ADMINISTRADOR
# 2. Navegue para: cd "C:\Users\kauav\TRABALHOS\JK-ARTIGOS\public\images\bibles"
# 3. Execute: powershell -ExecutionPolicy Bypass -File "..\..\..\..\rename-fotos.ps1"
# OU
# 3. Execute: .\rename-fotos.ps1

# ────────────────────────────────────────────────────────────────

Write-Host "╔════════════════════════════════════════════════════╗"
Write-Host "║     🖼️  RENOMEAR FOTOS PRODUTOS JK STORE       ║"
Write-Host "╚════════════════════════════════════════════════════╝" -ForegroundColor Yellow
Write-Host ""

# Verificar se estamos na pasta correta
$bibliosPath = "bibles"
if (-not (Test-Path $bibliosPath)) {
    Write-Host "❌ Pasta 'bibles' não encontrada!" -ForegroundColor Red
    Write-Host "Navegue até: public\images\bibles\\" -ForegroundColor Yellow
    Read-Host "Pressione ENTER para sair"
    exit
}

Set-Location $bibliosPath

Write-Host "📁 Pasta atual: $(Get-Location)" -ForegroundColor Green
Write-Host ""

# Listar arquivos
$arquivos = Get-ChildItem -Filter "*.*" | Where-Object { $_.Extension -in @(".jpg", ".jpeg", ".png") } | Sort-Object Name

if ($arquivos.Count -eq 0) {
    Write-Host "❌ Nenhuma imagem encontrada!" -ForegroundColor Red
    Read-Host "Pressione ENTER para sair"
    exit
}

Write-Host "📸 Encontradas $($arquivos.Count) imagens" -ForegroundColor Cyan
Write-Host ""

# Menu de opções
Write-Host "╔════════════════════════════════════════════════════╗"
Write-Host "║            CHOOSE AN OPTION                       ║"
Write-Host "╠════════════════════════════════════════════════════╣"
Write-Host "║  1. Auto-rename (recomendado para 32 fotos)       ║"
Write-Host "║  2. Manual rename (escolher cada uma)             ║"
Write-Host "║  3. Preview (ver como ficaria)                    ║"
Write-Host "║  0. Cancelar                                      ║"
Write-Host "╚════════════════════════════════════════════════════╝"
Write-Host ""

$opcao = Read-Host "Digite a opção (0-3)"

switch ($opcao) {
    "1" { RenameAuto }
    "2" { RenameManual }
    "3" { Preview }
    "0" { 
        Write-Host "Cancelado." -ForegroundColor Yellow
        exit 
    }
    default { 
        Write-Host "Opção inválida!" -ForegroundColor Red
        exit 
    }
}

# ───────────────────────────────────────────────────────────────
# FUNÇÃO 1: AUTO-RENAME
# ───────────────────────────────────────────────────────────────

function RenameAuto {
    Write-Host ""
    Write-Host "╔════════════════════════════════════════════════════╗"
    Write-Host "║          AUTO-RENAME (Padrão)                     ║"
    Write-Host "╚════════════════════════════════════════════════════╝" -ForegroundColor Cyan
    Write-Host ""

    $produtos = @("preta", "nvi", "rosa", "ara", "gigante", "dourada", "compacta", "lilas")
    
    Write-Host "Padrão de nomes:" -ForegroundColor Yellow
    Write-Host "  Produto 0-3: biblia-preta-[1-4].jpg"
    Write-Host "  Produto 4-7: biblia-nvi-[1-4].jpg"
    Write-Host "  ..."
    Write-Host ""
    
    $confirm = Read-Host "Tem certeza? Digite 'SIM' para continuar"
    if ($confirm -ne "SIM") {
        Write-Host "Cancelado." -ForegroundColor Yellow
        return
    }

    Write-Host ""
    
    $arquivos = Get-ChildItem -Filter "*.*" | Where-Object { $_.Extension -in @(".jpg", ".jpeg", ".png") } | Sort-Object Name
    
    $i = 0
    foreach ($arquivo in $arquivos) {
        if ($i -ge 32) { break }
        
        $produtoIdx = [math]::Floor($i / 4)
        $fotoIdx = ($i % 4) + 1
        
        if ($produtoIdx -ge $produtos.Length) { break }
        
        $produto = $produtos[$produtoIdx]
        $novoNome = "biblia-$produto-$fotoIdx.jpg"
        
        try {
            Rename-Item -Path $arquivo.FullName -NewName $novoNome -ErrorAction Stop
            Write-Host "✓ $($arquivo.Name) → $novoNome" -ForegroundColor Green
        }
        catch {
            Write-Host "✗ Erro ao renomear $($arquivo.Name): $_" -ForegroundColor Red
        }
        
        $i++
    }

    Write-Host ""
    Write-Host "✅ Renomeação concluída!" -ForegroundColor Green
    Read-Host "Pressione ENTER para sair"
}

# ───────────────────────────────────────────────────────────────
# FUNÇÃO 2: MANUAL RENAME
# ───────────────────────────────────────────────────────────────

function RenameManual {
    Write-Host ""
    Write-Host "╔════════════════════════════════════════════════════╗"
    Write-Host "║          RENOMEAR MANUALMENTE                     ║"
    Write-Host "╚════════════════════════════════════════════════════╝" -ForegroundColor Cyan
    Write-Host ""

    $produtos = @("preta", "nvi", "rosa", "ara", "gigante", "dourada", "compacta", "lilas")

    $arquivos = Get-ChildItem -Filter "*.*" | Where-Object { $_.Extension -in @(".jpg", ".jpeg", ".png") } | Sort-Object Name

    Write-Host "Produtos disponíveis:" -ForegroundColor Yellow
    for ($i = 0; $i -lt $produtos.Length; $i++) {
        Write-Host "  $i = biblia-$($produtos[$i])"
    }
    Write-Host ""

    $i = 0
    foreach ($arquivo in $arquivos) {
        Write-Host ""
        Write-Host "Arquivo $($i + 1)/$($arquivos.Count): $($arquivo.Name)" -ForegroundColor Cyan
        Write-Host ""

        # Mostrar preview da imagem (em Windows)
        Write-Host "📷 Preview: " -NoNewline
        $confirma = Read-Host "Ver imagem? (s/n)"
        if ($confirma -eq "s") {
            Invoke-Item $arquivo.FullName
            Read-Host "Pressione ENTER para continuar"
        }

        Write-Host ""
        Write-Host "Escolha a opção:" -ForegroundColor Yellow
        Write-Host "  0-7 = Produto (veja lista acima)"
        Write-Host "  x   = Pular"
        Write-Host "  q   = Sair"

        $produtoIdx = Read-Host "Qual produto?"

        if ($produtoIdx -eq "q") { break }
        if ($produtoIdx -eq "x") { 
            $i++
            continue 
        }

        if ($produtoIdx -lt 0 -or $produtoIdx -gt 7) {
            Write-Host "❌ Opção inválida!" -ForegroundColor Red
            $i++
            continue
        }

        $fotoIdx = Read-Host "Qual número da foto? (1-4)"
        
        if ($fotoIdx -lt 1 -or $fotoIdx -gt 4) {
            Write-Host "❌ Número inválido!" -ForegroundColor Red
            $i++
            continue
        }

        $produto = $produtos[[int]$produtoIdx]
        $novoNome = "biblia-$produto-$fotoIdx.jpg"

        try {
            Rename-Item -Path $arquivo.FullName -NewName $novoNome -ErrorAction Stop
            Write-Host "✓ Renomeado para: $novoNome" -ForegroundColor Green
        }
        catch {
            Write-Host "✗ Erro ao renomear: $_" -ForegroundColor Red
        }

        $i++
    }

    Write-Host ""
    Write-Host "✅ Renomeação concluída!" -ForegroundColor Green
    Read-Host "Pressione ENTER para sair"
}

# ───────────────────────────────────────────────────────────────
# FUNÇÃO 3: PREVIEW
# ───────────────────────────────────────────────────────────────

function Preview {
    Write-Host ""
    Write-Host "╔════════════════════════════════════════════════════╗"
    Write-Host "║              PREVIEW (Padrão Auto)                ║"
    Write-Host "╚════════════════════════════════════════════════════╝" -ForegroundColor Cyan
    Write-Host ""

    $produtos = @("preta", "nvi", "rosa", "ara", "gigante", "dourada", "compacta", "lilas")
    
    $arquivos = Get-ChildItem -Filter "*.*" | Where-Object { $_.Extension -in @(".jpg", ".jpeg", ".png") } | Sort-Object Name

    Write-Host "Como as fotos serão renomeadas:" -ForegroundColor Yellow
    Write-Host ""

    $i = 0
    foreach ($arquivo in $arquivos) {
        if ($i -ge 32) { break }

        $produtoIdx = [math]::Floor($i / 4)
        $fotoIdx = ($i % 4) + 1

        if ($produtoIdx -ge $produtos.Length) { break }

        $produto = $produtos[$produtoIdx]
        $novoNome = "biblia-$produto-$fotoIdx.jpg"

        Write-Host "$($arquivo.Name) → $novoNome" -ForegroundColor Cyan

        $i++
    }

    Write-Host ""
    Write-Host "Total: $i arquivos serão renomeados" -ForegroundColor Green
    Read-Host "Pressione ENTER para voltar"
}

Write-Host ""
Write-Host "Adeus!" -ForegroundColor Yellow
