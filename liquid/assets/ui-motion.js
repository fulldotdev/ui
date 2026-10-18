const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

// A pause button for a CSS animation that runs on its own, such as a marquee. Its label stays Pause
// and aria-pressed carries the state: pressed while the animation is paused.
export function initializeMotionPause(button) {
  const root = button.closest('[data-motion]');
  const events = new AbortController();
  // CSS animates the root only from here on, so it never moves without a working pause button.
  root.dataset.motionReady = '';
  const sync = () => {
    button.hidden = reducedMotion.matches;
  };
  button.addEventListener(
    'click',
    () => {
      const paused = button.getAttribute('aria-pressed') !== 'true';
      button.setAttribute('aria-pressed', String(paused));
      root.toggleAttribute('data-paused', paused);
    },
    { signal: events.signal },
  );
  reducedMotion.addEventListener('change', sync, { signal: events.signal });
  sync();
  return {
    destroy() {
      events.abort();
      delete root.dataset.motionReady;
    },
  };
}

// Muted autoplay videos stay still for visitors who prefer reduced motion; they keep their controls.
export function initializeAutoplayVideo(video) {
  const events = new AbortController();
  const sync = () => {
    if (reducedMotion.matches) video.pause();
  };
  reducedMotion.addEventListener('change', sync, { signal: events.signal });
  sync();
  return {
    destroy() {
      events.abort();
    },
  };
}
