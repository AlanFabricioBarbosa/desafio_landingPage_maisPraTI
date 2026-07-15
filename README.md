# HQ Universe — Landing Page

Projeto de landing page desenvolvido como desafio para o programa **+PraTI**. A aplicação apresenta uma plataforma ficticia de leitura de historias em quadrinhos reunindo personagens de multiplas editoras — Dark Horse, Marvel, DC e Image Comics — com dados consumidos em tempo real de uma API publica de super-herois.

---

## Indice

- [Visao Geral](#visao-geral)
- [Estrutura de Arquivos](#estrutura-de-arquivos)
- [Stack e Tecnologias](#stack-e-tecnologias)
- [Design System](#design-system)
- [Arquitetura Sass](#arquitetura-sass)
- [Componentes de Estilo](#componentes-de-estilo)
- [JavaScript](#javascript)
- [Paginas](#paginas)
- [View Transitions](#view-transitions)
- [Acessibilidade](#acessibilidade)
- [SEO](#seo)
- [Como Rodar Localmente](#como-rodar-localmente)
- [Scripts NPM](#scripts-npm)
- [Compatibilidade de Navegadores](#compatibilidade-de-navegadores)

---

## Visao Geral

| Atributo | Valor |
|---|---|
| Tipo | Multi-Page Application (MPA) |
| Paginas | `index.html` (home) e `HTML/contato.html` |
| API | [Superhero API](https://akabab.github.io/superhero-api/api/all.json) |
| Linguagem de estilo | Sass (SCSS) compilado para CSS |
| JavaScript | Vanilla JS (ES2022, `'use strict'`) |
| Servidor local | `live-server` na porta `3000` |

---

## Estrutura de Arquivos

```
projeto_ladingPage_+praTI/
│
├── index.html                    # Pagina principal
│
├── HTML/
│   └── contato.html              # Pagina de contato com formulario
│
├── CSS/
│   ├── main.css                  # CSS compilado (nao editar manualmente)
│   └── main.css.map              # Source map para debugging
│
├── Sass/
│   ├── main.scss                 # Ponto de entrada — importa todos os partials
│   │
│   ├── abstracts/
│   │   ├── _variables.scss       # Tokens de design (cores, espacamentos, etc.)
│   │   ├── _mixins.scss          # Mixins reutilizaveis
│   │   └── _functions.scss       # Funcoes Sass utilitarias
│   │
│   ├── base/
│   │   ├── _reset.scss           # Reset global + CSS custom properties
│   │   ├── _typography.scss      # Estilos tipograficos globais
│   │   └── _view-transitions.scss # Animacoes de troca de pagina
│   │
│   └── components/
│       ├── _header.scss          # Cabecalho fixo e menu hamburguer
│       ├── _hero.scss            # Secao hero com imagem de fundo
│       ├── _about.scss           # Secao "Sobre Nos"
│       ├── _collection.scss      # Grid de personagens e paginacao
│       ├── _footer.scss          # Rodape com links e redes sociais
│       └── _contact.scss         # Formulario de contato e modal
│
├── JavaScript/
│   ├── main.js                   # Logica principal da aplicacao
│   └── view-transitions.js       # Deteccao de direcao de navegacao
│
├── IMG/
│   └── hero-banner.png           # Imagem principal do hero
│
├── package.json
└── package-lock.json
```

---

## Stack e Tecnologias

| Camada | Tecnologia | Versao |
|---|---|---|
| Marcacao | HTML5 semantico | — |
| Estilo | Sass (SCSS) | ^1.77.8 |
| Scripts | Vanilla JavaScript (ES2022) | — |
| Fontes | Google Fonts (Bangers + Outfit) | — |
| API | Superhero API (publica, sem autenticacao) | — |
| Servidor local | live-server | ^1.2.2 |

Nenhum framework de JavaScript (React, Vue, Angular) foi utilizado. Todo o comportamento interativo e implementado com JavaScript nativo do navegador.

---

## Design System

O sistema de design e definido integralmente em [`_variables.scss`](./Sass/abstracts/_variables.scss) e exposto ao JavaScript via **CSS Custom Properties** no `:root` (definidas em `_reset.scss`).

### Paleta de Cores

| Token | Valor | Uso |
|---|---|---|
| `$color-primary` | `#f5c518` | Amarelo dourado — acoes principais, destaques |
| `$color-primary-light` | `#ffd740` | Variante clara do primario |
| `$color-primary-dark` | `#c49b10` | Variante escura do primario |
| `$color-secondary` | `#7c3aed` | Roxo — elementos de apoio, gradientes |
| `$color-secondary-light` | `#9d5cff` | Variante clara do secundario |
| `$color-accent` | `#ef4444` | Vermelho — erro, alerta, destaque |
| `$color-bg-base` | `#0a0a0f` | Fundo principal da pagina |
| `$color-bg-surface` | `#111118` | Superficies de cards |
| `$color-bg-elevated` | `#1a1a28` | Elementos elevados (modal, dropdowns) |
| `$color-text-primary` | `#f0f0fa` | Texto principal |
| `$color-text-secondary` | `#a8a8c0` | Texto de suporte |
| `$color-text-muted` | `#6b6b85` | Texto desativado ou placeholder |
| `$color-success` | `#22c55e` | Validacao positiva |
| `$color-error` | `#ef4444` | Validacao negativa |

> **Nota sobre os canais RGB:** Cada cor principal possui variaveis de canal separadas (ex: `$color-primary-r`, `$color-primary-g`, `$color-primary-b`) para permitir composicao de `rgba()` dinamica dentro dos mixins e componentes sem depender de funcoes de manipulacao de cor do Sass.

### Tipografia

Duas familias de fonte sao carregadas via Google Fonts com `rel="preconnect"` para otimizacao de LCP.

| Token | Familia | Uso |
|---|---|---|
| `$font-display` | Bangers, Arial Black, sans-serif | Titulos (`h1`–`h6`) |
| `$font-body` | Outfit, Segoe UI, system-ui, sans-serif | Todo o restante |

### Escala de Espacamento

Base em `rem`, com unidade base de `0.25rem` (4px):

```
$space-1 = 0.25rem    $space-6  = 1.5rem
$space-2 = 0.5rem     $space-8  = 2rem
$space-3 = 0.75rem    $space-10 = 2.5rem
$space-4 = 1rem       $space-12 = 3rem
$space-5 = 1.25rem    $space-16 = 4rem
                      $space-20 = 5rem
                      $space-24 = 6rem
                      $space-32 = 8rem
```

### Breakpoints (Mobile-first)

| Token | Valor |
|---|---|
| `$bp-xs` | 375px |
| `$bp-sm` | 576px |
| `$bp-md` | 768px |
| `$bp-lg` | 992px |
| `$bp-xl` | 1200px |
| `$bp-2xl` | 1400px |

### Sombras e Glow

```scss
$shadow-sm  : 0 1px 3px rgba(0, 0, 0, 0.4);
$shadow-md  : 0 4px 12px rgba(0, 0, 0, 0.5);
$shadow-lg  : 0 8px 32px rgba(0, 0, 0, 0.6);
$shadow-xl  : 0 16px 48px rgba(0, 0, 0, 0.7);

$shadow-glow-primary   : 0 0 24px rgba(245, 197, 24, 0.35);
$shadow-glow-secondary : 0 0 24px rgba(124, 58, 237, 0.35);
$shadow-glow-accent    : 0 0 24px rgba(239, 68, 68, 0.35);
```

### Transicoes

| Token | Valor | Uso |
|---|---|---|
| `$transition-fast` | `150ms ease` | Hover simples |
| `$transition-base` | `250ms ease` | Padrao |
| `$transition-slow` | `400ms ease` | Abertura de paineis, modais |
| `$transition-spring` | `350ms cubic-bezier(0.34, 1.56, 0.64, 1)` | Animacoes com "mola" |

### Z-index

| Token | Valor | Contexto |
|---|---|---|
| `$z-base` | 0 | Elementos normais |
| `$z-raised` | 10 | Cards sobrepostos |
| `$z-dropdown` | 100 | Menus |
| `$z-sticky` | 200 | Header fixo |
| `$z-overlay` | 300 | Overlays |
| `$z-modal` | 400 | Modais |
| `$z-toast` | 500 | Notificacoes |
| `$z-tooltip` | 600 | Tooltips |

---

## Arquitetura Sass

O projeto segue uma variacao do padrao **7-1** simplificado, com tres camadas:

```
abstracts/   →  sem saida CSS propria; apenas variaveis, mixins e funcoes
base/        →  estilos globais: reset, tipografia, view transitions
components/  →  estilos por componente de UI
```

O arquivo de entrada [`main.scss`](./Sass/main.scss) importa todos os partials na ordem correta usando `@use` (modulo Sass moderno, sem `@import`):

```scss
@use 'abstracts/variables' as *;
@use 'abstracts/functions' as *;
@use 'abstracts/mixins' as *;

@use 'base/reset';
@use 'base/typography';
@use 'base/view-transitions';

@use 'components/header';
@use 'components/hero';
@use 'components/about';
@use 'components/collection';
@use 'components/footer';
@use 'components/contact';
```

### Mixins Disponiveis

Todos definidos em [`_mixins.scss`](./Sass/abstracts/_mixins.scss).

| Mixin | Parametros | Descricao |
|---|---|---|
| `respond-to($bp)` | `xs` `sm` `md` `lg` `xl` `2xl` | Media query `min-width` (mobile-first) |
| `respond-max($bp)` | `xs` `sm` `md` `lg` `xl` | Media query `max-width` |
| `flex(...)` | direction, align, justify, wrap | Flexbox com parametros |
| `flex-center` | — | `display:flex` centralizado |
| `flex-between` | — | `display:flex` com `space-between` |
| `grid($cols, $gap)` | numero de colunas, gap | CSS Grid de colunas iguais |
| `font-display($size, $spacing)` | tamanho, letter-spacing | Bangers com configuracao padrao |
| `font-body($size, $weight)` | tamanho, peso | Outfit com configuracao padrao |
| `line-clamp($lines)` | numero de linhas | Truncamento de texto multilinhas |
| `visually-hidden` | — | Esconde visualmente mas mantem acessivel |
| `focus-ring($color, $offset)` | cor, offset | Anel de foco padronizado |
| `glass($bg, $blur, $border)` | cor de fundo, blur, cor de borda | Efeito glassmorphism |
| `text-gradient($gradient)` | gradiente | Texto com preenchimento em gradiente |
| `truncate` | — | Texto com reticencias em uma linha |
| `aspect-ratio($w, $h)` | largura, altura | Proporcao de aspecto via CSS |
| `transition($props, $duration)` | propriedades, duracao | Atalho para `transition` |
| `transition-spring($props)` | propriedades | Transicao com curva de mola |
| `container` | — | Container centralizado com max-width |
| `btn-base` | — | Base para todos os botoes |
| `custom-scrollbar($track, $thumb)` | cor de trilho, cor do indicador | Scrollbar estilizada |

### Funcoes Disponiveis

Definidas em [`_functions.scss`](./Sass/abstracts/_functions.scss).

| Funcao | Uso |
|---|---|
| `color($name, $alpha)` | Retorna `rgba()` de uma cor nomeada |
| `rem($px, $base)` | Converte px para rem |
| `fluid-type($min, $max, $minW, $maxW)` | Tipografia fluida com `clamp()` |
| `min-val($a, $b)` | Retorna o menor valor entre dois |
| `max-val($a, $b)` | Retorna o maior valor entre dois |
| `clamp-val($min, $val, $max)` | Limita um valor entre min e max |

---

## Componentes de Estilo

### Header (`_header.scss`)

O header tem comportamento fixo (`position: sticky`, z-index `$z-sticky`). Ao ultrapassar 30px de scroll, recebe a classe `.is-scrolled` via JavaScript, reduzindo sua altura de `72px` para `60px` com transicao suave.

O menu mobile e controlado pela classe `.nav-open` no elemento `.site-header`, que exibe a navegacao e bloqueia o scroll do `body`.

### Hero (`_hero.scss`)

Secao de tela cheia com imagem de fundo posicionada em `position: absolute`. A imagem usa `fetchpriority="high"` para ser carregada com prioridade maxima, otimizando o LCP (Largest Contentful Paint).

Um overlay via `linear-gradient` garante contraste do texto sobre a imagem.

### Colecao (`_collection.scss`)

Grid responsivo de cards de personagens gerados dinamicamente pelo JavaScript. A paginacao e renderizada com `aria-current="page"` para o numero ativo.

O campo de busca usa debounce de 300ms para filtrar os herois sem sobrecarga.

### Formulario de Contato (`_contact.scss`)

O componente mais elaborado em termos de CSS. Destaques:

**Card glassmorphism** — o `.contact-form-wrapper` usa o mixin `glass()` com `backdrop-filter: blur(16px)`. Uma linha de gradiente dourado e posicionada no topo via `::before`.

**Validacao sem JavaScript** — os estados de campo sao controlados exclusivamente por CSS usando as pseudo-classes modernas `:user-valid` e `:user-invalid`, que so disparam apos o usuario ter interagido com o campo (sem erros prematuros ao carregar a pagina).

**Propagacao do estado com `:has()`** — a label do grupo muda de cor baseado no estado do input filho:

```scss
.form-group:has(.form-input:user-invalid) .form-label {
  color: $color-error;
}
```

**Icones de validacao via CSS** — o `.form-input-wrapper` usa `::after` com SVG inline em `background-image` para exibir um indicador visual de validade sem qualquer elemento HTML adicional.

**Select customizado** — a seta padrao do `<select>` e substituida por um SVG inline que muda de cor conforme o estado de validacao.

**Modal de confirmacao** — usa o elemento nativo `<dialog>` com `backdrop-filter: blur(4px)` no `::backdrop`. A abertura e animada com `@keyframes modal-in` (scale + translateY). O autofocus e aplicado ao botao de fechar.

---

## JavaScript

### `main.js`

O script principal e estruturado em modulos de funcao imediatamente invocados (IIFE) para cada funcionalidade, evitando poluicao do escopo global.

**Busca de dados:**

```
fetchHeroes()
  -> fetch(API_URL)
  -> sortDarkHorseFirst(heroes)  // Personagens Dark Horse primeiro
  -> state.allHeroes = sorted
  -> renderHeroes()
```

**Estado global:**

```javascript
const state = {
  allHeroes: [],    // Todos os herois carregados
  filtered: [],     // Herois apos filtro de busca
  currentPage: 1,   // Pagina atual da paginacao
  perPage: 8,       // Itens por pagina
};
```

**Busca com debounce:** O campo de busca aguarda 300ms apos a ultima tecla antes de filtrar, evitando chamadas excessivas de `renderHeroes()`.

**Header:** Observa o scroll com `{ passive: true }` para performance. Usa `IntersectionObserver` para destacar o link de navegacao correspondente a secao visivel.

**Back to Top:** Botao aparece apos 300px de scroll e usa `window.scrollTo({ behavior: 'smooth' })`.

**Paginacao:** Mostra no maximo 5 paginas por vez (janela deslizante). O botao da pagina ativa recebe `aria-current="page"`.

### `view-transitions.js`

Script carregado com `async blocking="render"` para garantir que os event listeners sejam registrados antes do primeiro paint. E uma IIFE sem dependencias externas.

Define a hierarquia de paginas em `PAGE_ORDER` e determina a direcao da navegacao comparando os indices:

```javascript
const PAGE_ORDER = ['index.html', '', 'HTML/contato.html', 'contato.html'];

function getTransitionType(fromUrl, toUrl) {
  // Indice maior = forward; indice menor = backward
}
```

Registra dois event listeners:
- `pageswap` — dispara na pagina que esta saindo
- `pagereveal` — dispara na pagina que esta entrando

Ambos adicionam o tipo (`'forward'` ou `'backward'`) ao `viewTransition.types`, que e usado pelo CSS para selecionar a animacao correta.

---

## Paginas

### `index.html`

| Secao | ID | Descricao |
|---|---|---|
| Header | `.site-header` | Navegacao fixa |
| Hero | `#hero` | Banner principal com CTA |
| Sobre | `#sobre` | Descricao da plataforma + cards de funcionalidades |
| Colecao | `#colecao` | Grid de personagens da API com busca e paginacao |
| Footer | `.site-footer` | Links, redes sociais, creditos |

### `HTML/contato.html`

| Secao | ID | Descricao |
|---|---|---|
| Header | `.site-header` | Identico ao da home |
| Contato | `#contato` | Informacoes de contato + formulario |
| Footer | `.site-footer` | Identico ao da home |

**Campos do formulario:**

| Campo | Tipo | Validacao |
|---|---|---|
| Nome completo | `text` | Obrigatorio, `minlength="2"` |
| E-mail | `email` | Obrigatorio, formato de e-mail |
| Assunto | `select` | Obrigatorio, nao pode ser o placeholder |
| Mensagem | `textarea` | Obrigatorio, `minlength="10"` |

---

## View Transitions

O projeto usa a API de **Cross-document View Transitions** para animar a navegacao entre `index.html` e `contato.html`.

> **Requisito critico:** esta API so funciona em navegacoes `same-origin` via protocolo `http://` ou `https://`. Abrir os arquivos diretamente pelo sistema de arquivos (`file://`) desativa o recurso.

### Como funciona

```
Clique em um link
    |
    +-- pageswap (pagina velha)
    |       Adiciona tipo 'forward' ou 'backward'
    |
    +-- Navegacao do navegador
    |
    +-- pagereveal (pagina nova)
            Adiciona tipo 'forward' ou 'backward'
            CSS aplica a animacao correspondente
```

### Animacoes

**Navegacao forward** (index -> contato):
- Pagina saindo: desliza 30% para a esquerda + scale(0.9) + blur(6px)
- Pagina entrando: desliza da direita (40%) + scale(0.95) + blur(4px)
- Duracao: 380ms saida, 480ms entrada

**Navegacao backward** (contato -> index):
- Pagina saindo: desliza 30% para a direita + scale(0.9) + blur(6px)
- Pagina entrando: desliza da esquerda (40%) + scale(0.95) + blur(4px)
- Duracao: 380ms saida, 480ms entrada

### Elementos persistentes

Header, logo e footer possuem `view-transition-name` proprios, fazendo com que permanecam estaticos enquanto apenas o `#main-content` desliza. Isso cria a sensacao de um aplicativo nativo.

| Elemento | `view-transition-name` |
|---|---|
| `.logo` | `site-logo` |
| `.site-header` | `site-header` |
| `.site-footer` | `site-footer` |
| `#main-content` | `page-main` |

### Render blocking

Ambas as paginas incluem no `<head>`:

```html
<link rel="expect" href="#main-content" blocking="render" />
<script src="[...]/view-transitions.js" async blocking="render"></script>
```

O `<link rel="expect">` bloqueia a renderizacao ate que o elemento `#main-content` seja parseado, evitando que a transicao anime para uma pagina em branco. O script recebe `blocking="render"` para garantir que os listeners de `pageswap`/`pagereveal` sejam registrados antes do primeiro frame.

### Reducao de movimento

```css
@media (prefers-reduced-motion: reduce) {
  @view-transition {
    navigation: none;
  }
}
```

Usuarios que configuraram preferencia por menos movimento no sistema operacional nao recebem nenhuma transicao.

---

## Acessibilidade

O projeto segue as diretrizes WCAG 2.1 nas seguintes areas:

**Semantica HTML:**
- Landmark roles (`banner`, `main`, `contentinfo`, `navigation`)
- Titulos em hierarquia correta (`h1` unico por pagina)
- Listas com `role="list"` para compatibilidade com Safari/VoiceOver
- `aria-labelledby` associando secoes aos seus titulos

**Formulario:**
- Todos os campos possuem `<label>` associado via `for`/`id`
- Campos invalidos possuem `aria-describedby` apontando para o elemento de erro
- Erros usam `role="alert"` e `aria-live="polite"`
- O modal de confirmacao usa `<dialog>` nativo com `aria-labelledby` e `aria-describedby`
- `autofocus` aplicado ao botao de fechar do modal

**Foco e teclado:**
- Anel de foco customizado visivel em todos os elementos interativos (mixin `focus-ring`)
- Tecla `Escape` fecha o menu mobile
- Menu mobile bloqueado em `overflow: hidden` no `body` para evitar scroll fantasma

**Imagens:**
- Imagem hero com `alt` descritivo
- Icones SVG decorativos com `aria-hidden="true"`
- Cards de personagens com `aria-label` contendo nome e editora
- `loading="lazy"` nas imagens dos cards, `fetchpriority="high"` na imagem hero

**Texto oculto:**
- Classe `.visually-hidden` disponivel via mixin para conteudo acessivel mas invisivel

**Movimento:**
- `prefers-reduced-motion` respeita a preferencia do usuario em todos os contextos: animacoes CSS, view transitions e scroll behavior

---

## SEO

Cada pagina implementa:

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="[descricao especifica da pagina]" />
<meta name="author" content="HQ Universe" />
<title>[Titulo da pagina] — HQ Universe</title>
```

Boas praticas adicionais:
- `lang="pt-BR"` no elemento `<html>`
- `h1` unico por pagina
- HTML semantico com `<main>`, `<header>`, `<footer>`, `<nav>`, `<section>`, `<article>`
- URLs com hash para secoes (`#sobre`, `#colecao`)

---

## Como Rodar Localmente

> As view transitions exigem um servidor HTTP. Nao abra os arquivos HTML diretamente pelo explorador de arquivos.

**1. Instalar dependencias:**

```bash
npm install
```

**2. Iniciar o servidor de desenvolvimento (em um terminal):**

```bash
npm run dev
```

O site estara disponivel em `http://localhost:3000`.

**3. Compilar o Sass em modo watch (em outro terminal, opcional durante o desenvolvimento):**

```bash
npm run sass:watch
```

---

## Scripts NPM

| Script | Comando | Descricao |
|---|---|---|
| `npm run dev` | `live-server --port=3000 --host=localhost` | Inicia servidor HTTP local com live reload |
| `npm run sass:watch` | `sass --watch Sass/main.scss:CSS/main.css --style=expanded --source-map` | Recompila o CSS a cada mudanca no Sass |
| `npm run sass:dev` | `sass Sass/main.scss:CSS/main.css --style=expanded --source-map` | Compilacao unica em modo desenvolvimento |
| `npm run sass:build` | `sass Sass/main.scss:CSS/main.css --style=compressed --no-source-map` | Compilacao para producao (minificado) |

---

## Compatibilidade de Navegadores

| Recurso | Chrome | Edge | Firefox | Safari |
|---|---|---|---|---|
| Sass compilado (CSS puro) | Todos | Todos | Todos | Todos |
| `:user-valid` / `:user-invalid` | 119+ | 119+ | 88+ | 16.5+ |
| `:has()` | 105+ | 105+ | 121+ | 15.4+ |
| `<dialog>` nativo | 37+ | 79+ | 98+ | 15.4+ |
| `backdrop-filter` | 76+ | 17+ | 103+ | 9+ |
| Cross-document View Transitions | 126+ | 126+ | Nao suportado | 18.2+ |
| Navigation API | 102+ | 102+ | 147+ | 26.2+ |

**Comportamento em navegadores sem suporte a View Transitions (Firefox):** a navegacao ocorre normalmente, sem qualquer transicao e sem erros. O recurso e implementado como progressive enhancement.

---

*Desenvolvido para o desafio +PraTI — 2026.*
