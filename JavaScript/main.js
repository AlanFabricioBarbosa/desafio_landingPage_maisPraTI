'use strict';

const API_URL = 'https://akabab.github.io/superhero-api/api/all.json';

const DARK_HORSE_HEROES = [
  'Hellboy',
  'Abe Sapien',
  'Alien',
  'Predator',
  'T-1000',
  'Judge Dredd',
];

function sortDarkHorseFirst(heroes) {
  return heroes.sort((a, b) => {
    const aIsDH = DARK_HORSE_HEROES.includes(a.name);
    const bIsDH = DARK_HORSE_HEROES.includes(b.name);

    if (aIsDH && bIsDH) {
      return DARK_HORSE_HEROES.indexOf(a.name) - DARK_HORSE_HEROES.indexOf(b.name);
    }

    if (aIsDH) return -1;
    if (bIsDH) return 1;

    return a.name.localeCompare(b.name);
  });
}

// Estado da aplicacao
const state = {
  allHeroes: [],
  filtered: [],
  currentPage: 1,
  perPage: 8,
};

const grid = document.getElementById('characters-grid');
const statusEl = document.getElementById('api-status');
const searchInput = document.getElementById('busca-personagem');
const paginationEl = document.getElementById('pagination');

// Pegando dados da API

async function fetchHeroes() {
  if (statusEl) statusEl.textContent = 'Carregando heróis da API...';

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status} ${response.statusText}`);
    }

    const heroes = await response.json();

    // Ordena para os personagens Dark Horse aparecerem primeiro(Porque sim)
    const sorted = sortDarkHorseFirst(heroes);

    state.allHeroes = sorted;
    state.filtered = sorted;
    state.currentPage = 1;

    if (statusEl) {
      statusEl.textContent = `${heroes.length} heróis carregados com sucesso!`;
    }
    renderHeroes();

  } catch (error) {
    console.error('Erro ao buscar heróis:', error);

    if (statusEl) {
      statusEl.textContent = `Erro ao carregar heróis: ${error.message}`;
    }
  }
}

// Exibindo os herois na tela
function renderHeroes() {
  if (!grid) return;

  const start = (state.currentPage - 1) * state.perPage;
  const end = start + state.perPage;
  const heroesOnPage = state.filtered.slice(start, end);

  if (heroesOnPage.length === 0) {
    grid.innerHTML = '<p>Nenhum herói encontrado.</p>';
    if (paginationEl) paginationEl.innerHTML = '';
    return;
  }

  // Criando os cards
  grid.innerHTML = heroesOnPage.map(hero => {
    const image = hero.images?.md || hero.images?.lg || '';
    const publisher = hero.biography?.publisher || 'Desconhecido';
    const strength = hero.powerstats?.strength || 0;
    const intelligence = hero.powerstats?.intelligence || 0;

    return `
      <article role="listitem">
        <img
          src="${image}"
          alt="${hero.name}"
          loading="lazy"
          width="220"
          height="320"
          onerror="this.src='https://placehold.co/220x320?text=${encodeURIComponent(hero.name)}'"
        />
        <h3>${hero.name}</h3>
        <p>Editora: ${publisher}</p>
        <p>Força: ${strength} | Inteligência: ${intelligence}</p>
      </article>
    `;
  }).join('');

  // Atualiza a paginação
  renderPagination();
}

function renderPagination() {
  if (!paginationEl) return;

  const totalPages = Math.ceil(state.filtered.length / state.perPage);

  // Nao mostra paginacao com apenas 1 pagina
  if (totalPages <= 1) {
    paginationEl.innerHTML = '';
    return;
  }

  let html = '';

  html += `<button data-page="${state.currentPage - 1}" 
    ${state.currentPage === 1 ? 'disabled' : ''}>← Anterior</button>`;

  const startPage = Math.max(1, state.currentPage - 2);
  const endPage = Math.min(totalPages, startPage + 4);

  for (let i = startPage; i <= endPage; i++) {
    html += `<button data-page="${i}" 
      ${i === state.currentPage ? 'aria-current="page"' : ''}>${i}</button>`;
  }

  html += `<button data-page="${state.currentPage + 1}" 
    ${state.currentPage === totalPages ? 'disabled' : ''}>Próxima →</button>`;

  paginationEl.innerHTML = html;

  paginationEl.querySelectorAll('button:not([disabled])').forEach(btn => {
    btn.addEventListener('click', () => {
      state.currentPage = parseInt(btn.dataset.page, 10);
      renderHeroes();
      document.getElementById('colecao')?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

let debounceTimer;

searchInput?.addEventListener('input', () => {
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    const query = searchInput.value.trim().toLowerCase();

    state.filtered = state.allHeroes.filter(hero =>
      hero.name.toLowerCase().includes(query)
    );

    state.currentPage = 1;
    renderHeroes();
  }, 300);
});

fetchHeroes();
