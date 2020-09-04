<script>

</script>

<style>
  h1 {
    margin: 0;
    color: var(--ink_800);
  }

  header {
    position: absolute;
    top: 32px;
    right: 32px;
    z-index: 2;
    display: grid;
    grid-template-rows: repeat(2, auto);
    gap: 16px;
    justify-content: start;
    min-width: 300px;
    padding: 32px;
    background-color: white;
    border-radius: 4px;
    box-shadow: var(--shadow);
  }

  @media (max-width: 768px) {
    header {
      justify-content: center;
      width: calc(100vw - 128px);
    }
  }
</style>

<header>
  <h1>Где поесть?</h1>
  <slot />
</header>
