// The data-slot controllers that few pages use, imported when theme.js finds their markup. Each
// entry starts one root and returns its controller with destroy(). Behavior is the vendored
// controller's; the adapters here only connect it to native forms and theme state.

// A composite input renders hidden after its native fallback, such as a select or radio inputs,
// which the form submits until the controller runs. Then the fallback leaves the document, so
// labels and the form see only the field the controller generates, and the fallback's id moves to
// the labelled element, so a label[for] still reaches the control. start() creates the controller
// with the fallback's reset default and the value a shopper chose while it loaded; its destroy()
// writes the current value back, and the fallback returns with its own reset default.
function replaceFallback(root, labelled, start) {
  const fallback = root.previousElementSibling?.matches('[data-fallback]') ? root.previousElementSibling : null;
  const attributes = ['id', 'aria-labelledby'].map((name) => [name, labelled.getAttribute(name)]);
  const restore = () => {
    root.hidden = true;
    for (const [name, value] of attributes) {
      if (value === null) labelled.removeAttribute(name);
      else labelled.setAttribute(name, value);
    }
    if (fallback) root.before(fallback);
  };
  fallback?.remove();
  if (fallback?.id) labelled.id = fallback.id;
  root.hidden = false;
  let controller;
  try {
    controller = start(fallback);
  } catch (error) {
    restore();
    throw error;
  }
  return {
    destroy() {
      controller.destroy();
      restore();
    },
  };
}

function initializeSelect({ createSelect }, root) {
  return replaceFallback(root, root.querySelector('[data-slot="select-trigger"]'), (select) => {
    const options = [...(select?.options ?? [])];
    const initial = options.find((option) => option.defaultSelected) ?? options.find((option) => !option.disabled);
    const controller = createSelect(root, { mountStrategy: 'eager', defaultValue: initial?.value || undefined });
    const value = select?.value || null;
    if (select && value !== controller.value) root.dispatchEvent(new CustomEvent('select:set', { detail: { value } }));
    return {
      destroy() {
        if (select) select.value = controller.value ?? '';
        controller.destroy();
      },
    };
  });
}

function initializeRadioGroup({ createRadioGroup }, root) {
  return replaceFallback(root, root, (fallback) => {
    const inputs = [...(fallback?.querySelectorAll('input[type="radio"]') ?? [])];
    const initial = inputs.find((input) => input.defaultChecked)?.value ?? '';
    const controller = createRadioGroup(root, fallback ? { defaultValue: initial } : {});
    const value = inputs.find((input) => input.checked)?.value ?? null;
    if (fallback && value !== controller.value) {
      if (value === null) controller.clear();
      else controller.select(value);
    }
    return {
      destroy() {
        for (const input of inputs) input.checked = input.value === controller.value;
        controller.destroy();
      },
    };
  });
}

function initializeSwitch({ createSwitch }, root) {
  return replaceFallback(root, root, (checkbox) => {
    const controller = createSwitch(root, checkbox ? { defaultChecked: checkbox.defaultChecked } : {});
    if (checkbox) controller.setChecked(checkbox.checked);
    return {
      destroy() {
        if (checkbox) checkbox.checked = controller.checked;
        controller.destroy();
      },
    };
  });
}

// The slider has no form field of its own, so its native range inputs stay in the form, hidden,
// and follow its value. A form reset moves the slider back to the inputs' reset values.
function initializeSlider({ createSlider }, root) {
  const fallback = root.previousElementSibling?.matches('[data-fallback]') ? root.previousElementSibling : null;
  const inputs = fallback ? [...fallback.querySelectorAll('input[type="range"]')] : [];
  const read = () => (inputs.length > 1 ? inputs.map((input) => Number(input.value)) : Number(inputs[0]?.value));
  const write = (value) => {
    [value].flat().forEach((number, index) => {
      if (!inputs[index] || inputs[index].value === String(number)) return;
      inputs[index].value = String(number);
      inputs[index].dispatchEvent(new Event('input', { bubbles: true }));
    });
  };
  const slider = createSlider(root, {
    ...(inputs.length ? { defaultValue: read() } : {}),
    onValueChange: write,
    onValueCommit: () => inputs.forEach((input) => input.dispatchEvent(new Event('change', { bubbles: true }))),
  });
  const events = new AbortController();
  inputs[0]?.form?.addEventListener('reset', () => setTimeout(() => slider.setValue(read())), {
    signal: events.signal,
  });
  if (fallback) fallback.hidden = true;
  root.hidden = false;
  return {
    destroy() {
      events.abort();
      slider.destroy();
      root.hidden = true;
      if (fallback) fallback.hidden = false;
    },
  };
}

// The action of an alert dialog is a native link or submit or reset button, and the controller
// leaves closing to the caller. A link closes the dialog on click; a submit or reset button once its
// form submits or resets, so an invalid form keeps its native validation and the dialog stays open.
function initializeAlertDialog({ createAlertDialog }, root) {
  const dialog = createAlertDialog(root);
  const events = new AbortController();
  for (const action of root.querySelectorAll('[data-slot="alert-dialog-action"]')) {
    action.addEventListener(
      'click',
      () => {
        const form = ['submit', 'reset'].includes(action.type) ? action.form : null;
        if (form) form.addEventListener(action.type, () => dialog.close(), { once: true, signal: events.signal });
        else dialog.close();
      },
      { signal: events.signal },
    );
  }
  return {
    destroy() {
      events.abort();
      dialog.destroy();
    },
  };
}

// Buttons inside a toaster show a toast with their translated title and description. Like other
// triggers that only open a popup, they show once the component has started (data-enhanced).
function initializeToaster({ createToast }, root) {
  const toaster = createToast(root);
  const events = new AbortController();
  for (const button of root.querySelectorAll('[data-toast-title]')) {
    button.addEventListener(
      'click',
      () => toaster.show({ title: button.dataset.toastTitle, description: button.dataset.toastDescription }),
      { signal: events.signal },
    );
  }
  return {
    destroy() {
      events.abort();
      toaster.destroy();
    },
  };
}

// A number field's buttons step its native input, as its arrow keys do, and fire the input and change
// events that typing fires, so a form or cart script sees one kind of change. As in Base UI, the
// runtime disables them when a step would not change the value: at a bound, or while the input is
// disabled or read-only. They follow new attributes, such as a variant's bounds, and markup a cart
// refresh replaces; a script that sets the value property fires input or change. Disable the input
// to disable the field. Without JavaScript the input still works on its own.
function initializeNumberField(_, root) {
  const events = new AbortController();
  const options = { signal: events.signal };
  const buttons = () =>
    root.querySelectorAll('[data-slot="number-field-decrement"], [data-slot="number-field-increment"]');
  // Steps a detached copy, so min, max and step apply as the browser applies them.
  const canStep = (input, decrement) => {
    if (input.disabled || input.readOnly) return false;
    const probe = input.cloneNode();
    probe.value = input.value;
    try {
      if (decrement) probe.stepDown();
      else probe.stepUp();
    } catch {
      return false;
    }
    return probe.value !== input.value;
  };
  // data-disabled marks a disabled field, as in Astro and React.
  const sync = () => {
    const input = root.querySelector('input');
    if (!input) return;
    if (input.disabled) root.setAttribute('data-disabled', 'true');
    else root.removeAttribute('data-disabled');
    for (const button of buttons()) {
      // A step button never submits its form, also when the markup leaves out type='button'.
      if (button.type !== 'button') button.type = 'button';
      const disabled = !canStep(input, button.dataset.slot === 'number-field-decrement');
      if (button.disabled !== disabled) button.disabled = disabled;
    }
  };
  root.addEventListener(
    'click',
    (event) => {
      const button =
        event.target instanceof Element
          ? event.target.closest('[data-slot="number-field-decrement"], [data-slot="number-field-increment"]')
          : null;
      const input = root.querySelector('input');
      if (!button || button.closest('[data-slot="number-field"]') !== root || button.disabled) return;
      if (!input || input.disabled || input.readOnly) return;
      const value = input.value;
      try {
        if (button.dataset.slot === 'number-field-decrement') input.stepDown();
        else input.stepUp();
      } catch {
        return;
      }
      if (input.value !== value) {
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
      sync();
    },
    options,
  );
  // Pressing a button keeps the focus on this field's input, so its typed value is not committed by a
  // blur, and a cart that refreshes on change, before the click steps it. Another field still blurs.
  root.addEventListener(
    'mousedown',
    (event) => {
      if (
        event.target instanceof Element &&
        event.target.closest('[data-slot="number-field-decrement"], [data-slot="number-field-increment"]') &&
        root.querySelector('input') === document.activeElement
      )
        event.preventDefault();
    },
    options,
  );
  // A pointer or focus that reaches the field first also syncs it, for a value a script set without an event.
  for (const type of ['input', 'change', 'pointerover', 'focusin']) root.addEventListener(type, sync, options);
  // A form reset restores the input after the event, also for an input in a form elsewhere.
  document.addEventListener(
    'reset',
    (event) => {
      if (root.querySelector('input')?.form === event.target)
        setTimeout(() => {
          if (!events.signal.aborted) sync();
        });
    },
    options,
  );
  const observer = new MutationObserver((mutations) => {
    if (mutations.some((mutation) => mutation.type === 'childList' || mutation.target instanceof HTMLInputElement))
      sync();
  });
  observer.observe(root, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['min', 'max', 'step', 'value', 'disabled', 'readonly'],
  });
  sync();
  return {
    destroy() {
      events.abort();
      observer.disconnect();
      for (const button of buttons()) button.disabled = false;
      root.removeAttribute('data-disabled');
    },
  };
}

// Each entry loads its data-slot package, then starts one root with it and returns a controller
// with destroy(). theme.js starts the root only if it is still current once the package has
// loaded. Select, tooltip and hover card keep their closed content connected (eager), so nested
// components and the lifecycle in theme.js never see it leave the document.
export const controls = {
  select: [() => import('@data-slot/select'), initializeSelect],
  'radio-group': [() => import('@data-slot/radio-group'), initializeRadioGroup],
  switch: [() => import('@data-slot/switch'), initializeSwitch],
  slider: [() => import('@data-slot/slider'), initializeSlider],
  toggle: [() => import('@data-slot/toggle'), ({ createToggle }, root) => createToggle(root)],
  'toggle-group': [() => import('@data-slot/toggle-group'), ({ createToggleGroup }, root) => createToggleGroup(root)],
  collapsible: [() => import('@data-slot/collapsible'), ({ createCollapsible }, root) => createCollapsible(root)],
  popover: [() => import('@data-slot/popover'), ({ createPopover }, root) => createPopover(root)],
  'hover-card': [
    () => import('@data-slot/hover-card'),
    ({ createHoverCard }, root) => createHoverCard(root, { mountStrategy: 'eager' }),
  ],
  tooltip: [
    () => import('@data-slot/tooltip'),
    ({ createTooltip }, root) => createTooltip(root, { mountStrategy: 'eager' }),
  ],
  'dropdown-menu': [
    () => import('@data-slot/dropdown-menu'),
    ({ createDropdownMenu }, root) => createDropdownMenu(root),
  ],
  'alert-dialog': [() => import('@data-slot/alert-dialog'), initializeAlertDialog],
  drawer: [() => import('@data-slot/drawer'), ({ createDrawer }, root) => createDrawer(root)],
  toast: [() => import('@data-slot/toast'), initializeToaster],
  // data-slot leaves a number field to the native input, so this entry loads no package.
  'number-field': [async () => ({}), initializeNumberField],
};
