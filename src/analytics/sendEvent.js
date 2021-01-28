function sendEvent(name, props) {
  const plausible =
    window.plausible ||
    ((...args) => {
      (window.plausible.q = window.plausible.q || []).push(args);
    });

  return new Promise((resolve) =>
    plausible(name, { callback: resolve, props }),
  );
}

export { sendEvent };
