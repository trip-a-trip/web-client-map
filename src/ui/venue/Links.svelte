<script>
  import Link from '../components/Link.svelte';

  export let links = [];
</script>

{#if links.length > 0}
  <p>
    {#each links as link}
      <Link href={link.url} newTab>{link.title}</Link>
    {/each}
  </p>
{/if}
