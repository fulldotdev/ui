// One owner per root, including asynchronous imports and Shopify editor replacements.
export function createLifecycle(factories, scope = document) {
  const components = new Map();
  const events = new AbortController();

  function initialize(parent) {
    for (const [selector, factory] of factories) {
      const roots = [...parent.querySelectorAll(selector)];
      if (parent.matches?.(selector)) roots.unshift(parent);
      for (const root of roots) {
        if (components.has(root) || !root.isConnected) continue;
        try {
          const controller = factory(root);
          components.set(root, controller);
          if (!controller.ready) root.dataset.enhanced = '';
          controller.ready?.then(
            () => {
              if (components.get(root) === controller) root.dataset.enhanced = '';
            },
            (error) => {
              console.error(error);
              if (components.get(root) === controller) components.delete(root);
            },
          );
        } catch (error) {
          console.error(error);
        }
      }
    }
  }

  function destroy(predicate) {
    for (const [root, controller] of components) {
      if (!predicate(root)) continue;
      // Drop ownership before a fallback is restored and the observer sees it.
      components.delete(root);
      controller.destroy?.();
      delete root.dataset.enhanced;
    }
  }

  initialize(scope);
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE && node.isConnected) initialize(node);
      }
    }
    if (mutations.some((mutation) => mutation.removedNodes.length)) destroy((root) => !root.isConnected);
  });
  observer.observe(scope === document ? document.body : scope, { childList: true, subtree: true });
  document.addEventListener('shopify:section:load', (event) => initialize(event.target), { signal: events.signal });
  document.addEventListener('shopify:section:unload', (event) => destroy((root) => event.target.contains(root)), {
    signal: events.signal,
  });
  document.addEventListener(
    'shopify:block:select',
    (event) => {
      const item = event.target.closest('[data-slot="accordion-item"]');
      if (item) components.get(item.closest('[data-slot="accordion"]'))?.expand(item.dataset.value);
      const slide = event.target.closest('[data-slot="carousel-item"]');
      if (slide)
        components.get(slide.closest('[data-slot="carousel"]'))?.goTo([...slide.parentElement.children].indexOf(slide));
    },
    { signal: events.signal },
  );
  return {
    components,
    initialize,
    destroy() {
      observer.disconnect();
      events.abort();
      destroy(() => true);
    },
  };
}

export function deferred(load, start) {
  return (root) => {
    let controller;
    let destroyed = false;
    const ready = load().then((module) => {
      if (!destroyed && root.isConnected) controller = start(module, root);
    });
    return {
      ready,
      destroy() {
        destroyed = true;
        controller?.destroy();
      },
    };
  };
}
