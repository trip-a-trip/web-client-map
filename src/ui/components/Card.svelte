<script>
  import { fly } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';

  import Close from './Close.svelte';
  import { clickOutside } from '../utils/click_outside';

  const dispatch = createEventDispatcher();

  export let closeable = false;

  function handleClose() {
    dispatch('close');
  }
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

<div
  class="card"
  transition:fly
  use:clickOutside
  on:clickOutside={handleClose}>

  {#if closeable}
    <Close on:click={handleClose} />
  {/if}

  <slot />

</div>
