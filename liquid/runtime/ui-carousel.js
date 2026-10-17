import { createCarousel } from '@data-slot/carousel';

// @data-slot/carousel owns scrolling, snapping, dragging, the arrow keys and the previous and next
// buttons, and keeps every visible card interactive. It writes English ARIA descriptions and slide
// labels, so the translated ones from Liquid are put back after it binds.
export function initializeCarousel(root) {
  const content = root.querySelector('[data-slot="carousel-content"]');
  const items = [...content.children].filter((item) => item.matches('[data-slot="carousel-item"]'));
  const descriptions = [root, ...items].map((element) => [element, element.getAttribute('aria-roledescription')]);
  const carousel = createCarousel(root, { slides: 'multiple', drag: true, loop: false });
  for (const [element, description] of descriptions)
    if (description) element.setAttribute('aria-roledescription', description);
  // Markup without a translated label template keeps the controller's labels.
  const template = root.dataset.slideLabel;
  if (template)
    items.forEach((item, index) => {
      item.setAttribute('aria-label', template.replace('[index]', index + 1).replace('[total]', items.length));
    });
  for (const button of root.querySelectorAll('[data-slot="carousel-previous"], [data-slot="carousel-next"]'))
    button.hidden = false;
  return carousel;
}
