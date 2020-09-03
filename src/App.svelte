<script>
  import { onMount } from 'svelte';

  import { fetchVenuesFx, venues } from './venues';
  import Map from './ui/Map.svelte';
  import Header from './ui/Header.svelte';

  onMount(fetchVenuesFx);
</script>

<style>
  * {
    font-family: -apple-system, system-ui, Roboto, 'Open Sans', Helvetica, Arial,
      sans-serif;

    --ink_800: #0c131d;
    --ink_500: #5a6472;
    --ink_400: #9ea9b7;
  }
</style>

<main>
  <Header />

  <Map />

  {#each $venues as venue}
    <li>{venue.name}</li>
  {/each}
</main>
