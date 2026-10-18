import { controls } from '@fulldev/controls';
import { createLifecycle, deferred } from '@fulldev/lifecycle';
import { initializeAutoplayVideo, initializeMotionPause } from '@fulldev/motion';

const simple = [
  ['accordion', () => import('@data-slot/accordion'), 'createAccordion'],
  ['tabs', () => import('@data-slot/tabs'), 'createTabs'],
  ['dialog', () => import('@data-slot/dialog'), 'createDialog'],
  ['combobox', () => import('@data-slot/combobox'), 'createCombobox'],
  ['command', () => import('@data-slot/command'), 'createCommand'],
  ['navigation-menu', () => import('@data-slot/navigation-menu'), 'createNavigationMenu'],
];

export const lifecycle = createLifecycle([
  ['[data-motion-pause]', initializeMotionPause],
  ['video[autoplay]', initializeAutoplayVideo],
  ...simple.map(([name, load, factory]) => [
    `[data-slot="${name}"]`,
    deferred(load, (module, root) =>
      module[factory](root, {
        mountStrategy: 'eager',
        ...(name === 'accordion' ? { multiple: root.dataset.multiple !== 'false' } : {}),
      }),
    ),
  ]),
  [
    '[data-slot="carousel"]',
    deferred(
      () => import('@fulldev/carousel'),
      (module, root) => module.initializeCarousel(root),
    ),
  ],
  ...Object.entries(controls).map(([name, [load, start]]) => [
    name === 'toggle' ? 'button[data-slot="toggle"]' : `[data-slot="${name}"]`,
    deferred(load, start),
  ]),
]);
