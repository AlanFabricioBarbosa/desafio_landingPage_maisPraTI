(() => {

  const PAGE_ORDER = ['index.html', '', 'HTML/contato.html', 'contato.html'];

  function pageIndex(url) {
    try {
      const path = new URL(url).pathname;
      const basename = path.replace(/^\//, '').toLowerCase();
      const idx = PAGE_ORDER.findIndex((p) => basename.endsWith(p));
      return idx === -1 ? 0 : idx;
    } catch {
      return 0;
    }
  }

  function getTransitionType(fromUrl, toUrl) {
    const fromIdx = pageIndex(fromUrl);
    const toIdx = pageIndex(toUrl);
    if (toIdx > fromIdx) return 'forward';
    if (toIdx < fromIdx) return 'backward';
    return 'forward';
  }

  window.addEventListener('pageswap', (e) => {
    if (!e.viewTransition) return;
    if (!window.navigation?.activation) return;

    const fromUrl = window.navigation.activation.from?.url;
    const toUrl = window.navigation.activation.entry?.url;

    if (!fromUrl || !toUrl) return;

    const type = getTransitionType(fromUrl, toUrl);
    e.viewTransition.types.add(type);
  });

  window.addEventListener('pagereveal', (e) => {
    if (!e.viewTransition) return;
    if (!window.navigation?.activation) return;

    const fromUrl = window.navigation.activation.from?.url;
    const toUrl = window.navigation.activation.entry?.url;

    if (!fromUrl || !toUrl) return;

    const type = getTransitionType(fromUrl, toUrl);
    e.viewTransition.types.add(type);
  });
})();
