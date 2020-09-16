<script>
  import { fly } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';

  import Close from './Close.svelte';

  const dispatch = createEventDispatcher();

  export let closable = false;
</script>

<style>
  .card {
    position: relative;
    width: 100%;
    padding: var(--space);
    background: white;
    border-radius: 4px;
    box-shadow: var(--shadow);
  }
</style>

<div class="card" transition:fly>
  <slot />

  {#if closable}
    <Close on:click={() => dispatch('close')} />
  {/if}
</div>
