<script>
  export let value = false;
</script>

<style>
  .container {
    position: relative;
    display: flex;
    align-items: flex-start;
    cursor: pointer;
  }

  .label {
    margin-left: 10px;
  }

  /* Hide the browser's default checkbox */
  .container input {
    position: absolute;
    width: 0;
    height: 0;
    cursor: pointer;
    opacity: 0;
  }

  .switch {
    position: relative;
    top: 0;
    left: 0;
    display: block;
    flex-shrink: 0;
    width: 35px;
    height: 20px;
    background: white;
    border-radius: 100px;
    box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.15);

    transition-timing-function: cubic-bezier(0.445, 0.05, 0.55, 0.95);
    transition-duration: 0.2s;
    transition-property: background-color, opacity;
  }

  /* Internal circle */
  .switch:after {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    content: '';
    background: white;
    border-radius: 16px;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.25);

    transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
    transition-duration: 0.32s;
    transition-property: transform;
  }

  /* Unchecked */
  .container input:not(:checked) ~ .switch:after {
    transform: translateX(0px);
  }

  /* Checked */
  .container input:checked ~ .switch:after {
    transform: translateX(15px);
  }
  .container input:checked ~ .switch {
    background: var(--purple_500);
  }

  /* Hover/Active */
  .container:hover input:not(:disabled) ~ .switch,
  .container:active input:not(:disabled) ~ .switch {
    background: var(--purple_300);
  }
</style>

<label class="container">
  <input type="checkbox" bind:checked={value} />

  <span class="switch" />

  <span class="label">
    <slot />
  </span>
</label>
