import { createCarousel } from '@data-slot/carousel';

// @data-slot/carousel owns scrolling, snapping, dragging, the arrow keys and the previous and next
// buttons, and keeps every visible card interactive. It writes English ARIA descriptions and slide
// labels, so the translated ones from Liquid are put back after binding and slide updates.
export function initializeCarousel(root) {
  const content = root.querySelector('[data-slot="carousel-content"]');
  const items = () => [...content.children].filter((item) => item.matches('[data-slot="carousel-item"]'));
  const rootDescription = root.getAttribute('aria-roledescription');
  const descriptions = new WeakMap(items().map((item) => [item, item.getAttribute('aria-roledescription')]));
  let destroyed = false;
  const translate = () => {
    if (destroyed) return;
    if (rootDescription) root.setAttribute('aria-roledescription', rootDescription);
    const slides = items();
    const template = root.dataset.slideLabel;
    slides.forEach((item, index) => {
      const description = descriptions.get(item);
      if (description) item.setAttribute('aria-roledescription', description);
      if (template)
        item.setAttribute('aria-label', template.replace('[index]', index + 1).replace('[total]', slides.length));
    });
  };
  // Observe first to capture authored descriptions before data-slot rewrites them.
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations)
      for (const node of mutation.addedNodes)
        if (node instanceof Element && node.matches('[data-slot="carousel-item"]'))
          descriptions.set(node, node.getAttribute('aria-roledescription'));
    queueMicrotask(translate);
  });
  observer.observe(content, { childList: true });
  // A thumbnail can link to its slide's id, which works without JavaScript. Once the controller runs,
  // a plain click only scrolls the carousel, so the page does not jump to the slide.
  const onClick = (event) => {
    const link = event.target instanceof Element ? event.target.closest('a[data-slot="carousel-indicator"]') : null;
    if (!link || link.closest('[data-slot="carousel"]') !== root) return;
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
  };
  // A link to a slide or to something in it, such as a thumbnail followed before this module loaded,
  // keeps that slide.
  let hash = location.hash.slice(1);
  try {
    hash = decodeURIComponent(hash);
  } catch {
    // Keep a malformed hash as it is.
  }
  const target = hash ? document.getElementById(hash) : null;
  const linked = target ? items().findIndex((item) => item.contains(target)) : -1;
  // A row of cards exposes every card that is in view. A gallery that shows one slide at a time sets
  // data-slides='single', so only the shown slide is exposed, also when a fractional width leaves a
  // sliver of the next one in view.
  const carousel = createCarousel(root, {
    slides: root.dataset.slides === 'single' ? 'single' : 'multiple',
    drag: true,
    loop: false,
    ...(linked >= 0 ? { defaultIndex: linked } : {}),
  });
  root.addEventListener('click', onClick);
  translate();
  for (const button of root.querySelectorAll('[data-slot="carousel-previous"], [data-slot="carousel-next"]'))
    button.hidden = false;
  const destroy = carousel.destroy.bind(carousel);
  carousel.destroy = () => {
    destroyed = true;
    observer.disconnect();
    root.removeEventListener('click', onClick);
    destroy();
  };
  return carousel;
}
