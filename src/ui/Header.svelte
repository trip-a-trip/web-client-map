<script>
  import Card from './components/Card.svelte';
</script>

<style>
  h1 {
    margin: 0;
    color: var(--ink_800);
  }

  header {
    position: absolute;
    top: var(--space);
    right: var(--space);
    z-index: 2;
    min-width: 240px;
  }

  .content {
    display: grid;
    grid-template-rows: repeat(2, auto);
    gap: 16px;
    justify-content: start;
  }

  @media (max-width: 768px) {
    header {
      width: calc(100vw - (2 * var(--space)));
      min-width: 100px;
    }
    .content {
      justify-content: center;
    }
  }
</style>

<header>
  <Card>
    <div class="content">
      <h1>Где поесть?</h1>
      <slot />
    </div>
  </Card>
</header>
