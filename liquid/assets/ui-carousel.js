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
  const carousel = createCarousel(root, { slides: 'multiple', drag: true, loop: false });
  translate();
  for (const button of root.querySelectorAll('[data-slot="carousel-previous"], [data-slot="carousel-next"]'))
    button.hidden = false;
  const destroy = carousel.destroy.bind(carousel);
  carousel.destroy = () => {
    destroyed = true;
    observer.disconnect();
    destroy();
  };
  return carousel;
}
