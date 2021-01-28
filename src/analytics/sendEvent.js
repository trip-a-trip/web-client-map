function sendEvent(name) {
  const plausible =
    window.plausible ||
    ((...args) => {
      (window.plausible.q = window.plausible.q || []).push(args);
    });

  plausible(name);
}

export { sendEvent };
