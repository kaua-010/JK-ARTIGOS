# 📷 Como Adicionar Fotos dos Produtos

## 📂 Estrutura de Pastas

```
public/images/bibles/
├── biblia-preta-1.jpg          ← Frente / Vista principal
├── biblia-preta-2.jpg          ← Lateral direita
├── biblia-preta-3.jpg          ← Aberta / Interior
├── biblia-preta-4.jpg          ← Detalhe (capa, fecho, etc)
│
├── biblia-nvi-1.jpg            ← Próximo produto...
├── biblia-nvi-2.jpg
├── biblia-nvi-3.jpg
├── biblia-nvi-4.jpg
│
├── biblia-rosa-1.jpg
├── biblia-rosa-2.jpg
├── biblia-rosa-3.jpg
├── biblia-rosa-4.jpg
│
└── ... (mais produtos)
```

## 🎯 Padrão de Nomes

**Cada produto** tem **4 fotos** (ou mais):

```
biblia-[COLOR]-[NUMBER].jpg

Exemplo:
├── biblia-preta-1.jpg      (Produto 1 - Foto 1)
├── biblia-preta-2.jpg      (Produto 1 - Foto 2)
├── biblia-preta-3.jpg      (Produto 1 - Foto 3)
├── biblia-preta-4.jpg      (Produto 1 - Foto 4)
│
├── biblia-nvi-1.jpg        (Produto 2 - Foto 1)
├── biblia-nvi-2.jpg        (Produto 2 - Foto 2)
├── biblia-nvi-3.jpg        (Produto 2 - Foto 3)
├── biblia-nvi-4.jpg        (Produto 2 - Foto 4)
```

## ✅ Checklist de Fotos por Produto

Para cada Bíblia, você precisa de **4 ângulos diferentes**:

1. **Foto 1 - Frente** 📷
   - Vista principal da capa
   - Produto centralizado
   - Boa iluminação

2. **Foto 2 - Lateral** 🧭
   - Vista de lado
   - Mostra a espessura
   - Mostra o design lateral

3. **Foto 3 - Aberta** 📖
   - Bíblia aberta
   - Mostra as páginas
   - Qualidade de impressão visível

4. **Foto 4 - Detalhe** ✨
   - Close no detalhe especial
   - Fecho, correntes, borda dourada, etc
   - Mostra qualidade/acabamento

## 📝 Produtos e Nomes de Arquivo

| ID | Produto | Arquivo | Fotos |
|----|---------|---------|-------|
| 1 | Bíblia Preta Clássica | biblia-preta | 4 |
| 2 | Bíblia NVI Estudo | biblia-nvi | 4 |
| 3 | Bíblia Feminina Rosa | biblia-rosa | 4 |
| 4 | Bíblia ARA Clássica | biblia-ara | 4 |
| 5 | Bíblia Letra Gigante | biblia-gigante | 4 |
| 6 | Bíblia KJF Dourada | biblia-dourada | 4 |
| 7 | Bíblia NVI Compacta | biblia-compacta | 4 |
| 8 | Bíblia Feminina Lilás | biblia-lilas | 4 |

## 🚀 Passo a Passo para Adicionar Fotos

### 1️⃣ Extraia o Arquivo ZIP

```bash
# Windows (PowerShell)
Expand-Archive "fotos JK.zip" -DestinationPath "public/images/bibles/"

# Mac/Linux
unzip "fotos JK.zip" -d "public/images/bibles/"
```

### 2️⃣ Renomeie as Fotos

Organize as fotos seguindo o padrão:

**Para cada Produto:**
- Agrupue as fotos do mesmo produto
- Renomeie em ordem de ângulo
- Use o padrão: `biblia-[cor]-[numero].jpg`

**Exemplo - Se tem fotos assim:**
```
WhatsApp Image 2026-04-07 at 17.30.42.jpeg
WhatsApp Image 2026-04-07 at 17.30.45.jpeg (mesmo ângulo diferente)
WhatsApp Image 2026-04-07 at 17.31.02.jpeg (outro ângulo)
...
```

**Renomeie para:**
```
biblia-preta-1.jpg
biblia-preta-2.jpg
biblia-preta-3.jpg
biblia-preta-4.jpg
```

### 3️⃣ Coloque na Pasta Correta

```
public/images/bibles/
├── biblia-preta-1.jpg
├── biblia-preta-2.jpg
├── biblia-preta-3.jpg
├── biblia-preta-4.jpg
└── ... (outros produtos)
```

### 4️⃣ Teste seu Site

1. Abra: `http://localhost:5000`
2. Clique em uma produto
3. Veja a galeria de fotos funcionando! 🖼️
4. Navegue com setas esquerda/direita
5. Clique nas miniaturas para pular inagem

## 🎨 Dicas de Fotografia

✅ **BOM:**
- Fundo limpo (branco ou neutro)
- Boa iluminação
- Produto centralizado
- Fotos nítidas (não borradas)
- Cores reais

❌ **EVITE:**
- Fundos confusos
- Má iluminação
- Produto de lado na foto
- Fotos borradas ou desfocadas
- Cores alteradas

## 🔄 Se Adicionar Mais de 4 Fotos

Se quiser adicionar 5, 6 ou mais fotos:

```
biblia-preta-1.jpg
biblia-preta-2.jpg
biblia-preta-3.jpg
biblia-preta-4.jpg
biblia-preta-5.jpg  ← Foto extra
biblia-preta-6.jpg  ← Foto extra
```

O site vai mostrar todas as fotos na galeria automaticamente! 🎉

## 📱 Versão Mobile

No celular, as fotos aparecem:
- Tela inteira
- Setas para navegar
- Miniaturas em baixo
- Swipe para cima/baixo (no futuro)

## ❓ Dúvidas Frequentes

**P: Quantas fotos preciso?**
R: Mínimo 1, recomendado 4+

**P: Qual formato de imagem?**
R: JPG, PNG, WEBP (JPG é mais leve)

**P: Qual tamanho de imagem?**
R: 1200x1500px é ideal (não muito grande)

**P: As fotos aparecem em preto/cinza?**
R: Use `onerror` handler - já configurado para mostrar emoji se falhar

## 🎯 Resumo

1. ✅ Extraia o ZIP
2. ✅ Identifique produtos iguais
3. ✅ Renomeie com padrão `biblia-[nome]-[numero].jpg`
4. ✅ Coloque em `public/images/bibles/`
5. ✅ Teste no site!

---

**Resultado Final:**
Um site profissional com galeria de fotos como Amazon/Shopee! 🚀

