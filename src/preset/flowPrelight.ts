export default ({
  scale = 1,
  radius = 1,
  slope = 1,
}: {
  scale: number
  radius: number
  slope: number
}) => ({
  getCSS: () => `
    :root, .flow, .compact, .small, .medium, .large {
      --gutter: calc(5vw);
      --scale: ${scale};
      --slope: ${slope};
      --vw: max(0px, calc((100vw - 360px) / 700));
      --fluid: calc(var(--slope) * var(--vw));

      --spacing-min: 4px;
      --spacing-x: 2;
      --spacing-1: calc(var(--spacing-min) * var(--scale) + var(--fluid));
      --spacing-2: calc(var(--spacing-1) * var(--spacing-x));
      --spacing-3: calc(var(--spacing-2) * var(--spacing-x));
      --spacing-4: calc(var(--spacing-3) * var(--spacing-x));
      --spacing-5: calc(var(--spacing-4) * var(--spacing-x));
      --spacing-6: calc(var(--spacing-5) * var(--spacing-x));

      --border-radius-min: ${radius * 4}px;
      --border-radius-x: 2;
      --border-radius-1: calc(var(--border-radius-min) * var(--scale) + var(--fluid));
      --border-radius-2: calc(var(--border-radius-1) * var(--border-radius-x));
      --border-radius-3: calc(var(--border-radius-2) * var(--border-radius-x));
      
      --font-size-min: 12px;
      --font-size-x: 1.2;
      --font-size-1: calc(var(--font-size-min) * var(--scale) + calc(var(--fluid) * 1.5));
      --font-size-2: calc(var(--font-size-1) * var(--font-size-x));
      --font-size-3: calc(var(--font-size-2) * var(--font-size-x));
      --font-size-4: calc(var(--font-size-3) * var(--font-size-x));
      --font-size-5: calc(var(--font-size-4) * var(--font-size-x));
      --font-size-6: calc(var(--font-size-5) * var(--font-size-x));
      --font-size-7: calc(var(--font-size-6) * var(--font-size-x));
    }

    .compact {
      --spacing-x: 1.5;
      --border-radius-x: 1.5;
      --font-size-x: 1.05;
    }

    .small {
      --scale: 0.75;
    }

    .large {
      --scale: 1.25;
    }
  `,
})
