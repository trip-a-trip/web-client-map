<script>
  import { createEventDispatcher } from 'svelte';

  export let item;

  const dispatch = createEventDispatcher();
</script>

<style>
  h2 {
    margin: 0;
  }

  article {
    position: absolute;
    top: 32px;
    left: 32px;
    z-index: 2;
    width: 360px;
    padding: 32px;
    background: white;
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    article {
      top: 151px;
      width: calc(100vw - 128px);
    }
  }
</style>

{#if item}
  <article>
    <h2>
      {#if item.isExpensive}💸{/if}
      {#if item.isAmazing}😍{/if}
      {item.name}
    </h2>
    {#if item.description}
      <p>{item.description}</p>
    {/if}
    <button on:click={() => dispatch('close')}>Close</button>
  </article>
{/if}
