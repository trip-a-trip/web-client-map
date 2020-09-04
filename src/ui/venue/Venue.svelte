<script>
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';

  import Address from './Address.svelte';
  import Kind from './Kind.svelte';
  import Links from './Links.svelte';
  import Close from './Close.svelte';

  export let item;

  const dispatch = createEventDispatcher();
</script>

<style>
  h2 {
    margin: 0;
  }

  article {
    position: absolute;
    top: var(--space);
    left: var(--space);
    z-index: 2;
    width: 320px;
    padding: var(--space);
    background: white;
    border-radius: 4px;
    box-shadow: var(--shadow);
  }

  @media (max-width: 768px) {
    article {
      top: calc(106px + (2 * var(--space)));
      width: calc(100vw - (4 * var(--space)));
    }
  }
</style>

{#if item}
  <article transition:fly>
    <h2>
      {#if item.isExpensive}💸{/if}
      {#if item.isAmazing}😍{/if}
      {item.name}
    </h2>

    <Links links={item.links} />

    {#if item.description}
      <p>{item.description}</p>
    {/if}

    <Kind elements={item.kind} />

    {#if item.address}
      <Address address={item.address} />
    {/if}

    <Close on:click={() => dispatch('close')} />
  </article>
{/if}
