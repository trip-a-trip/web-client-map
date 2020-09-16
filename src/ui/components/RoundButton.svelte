<script>
</script>

<style>
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;

    color: var(--ink_400);
    cursor: pointer;
    background-color: white;
    border: none;
    border-radius: 40px;
    box-shadow: var(--shadow);
  }

  button:hover {
    color: var(--ink_500);
  }

  button:active {
    color: var(--ink_800);
  }
</style>

<button on:click>
  <slot />
</button>
