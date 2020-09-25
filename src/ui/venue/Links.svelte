<script>
  import Link from '../components/Link.svelte';

  export let links = [];
</script>

<style>
  p {
    display: inline-grid;
    grid-template-columns: repeat(2, auto);
    gap: 8px;
    margin-bottom: 0;
  }
</style>

{#if links.length > 0}
  <p>
    {#each links as link}
      <Link href={link.url} newTab>{link.title}</Link>
    {/each}
  </p>
{/if}
