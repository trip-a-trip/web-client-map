<script>
  import { onMount } from "svelte";

  import { fetchVenuesFx, venues } from "./venues";
  import Map from "./ui/Map.svelte";
  import Header from "./ui/Header.svelte";

  onMount(fetchVenuesFx);
</script>

<style>
  * {
    font-family: -apple-system, system-ui, Roboto, "Open Sans", Helvetica, Arial,
      sans-serif;

    --black: #0c131d;
  }
</style>

<main>
  <Header />

  <Map />

  {#each $venues as venue}
    <li>{venue.name}</li>
  {/each}
</main>
