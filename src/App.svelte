<script>
  import { onMount } from 'svelte';
  import { provideStoreon, useStoreon } from '@storeon/svelte';

  import { store } from './store';
  import Map from './ui/Map.svelte';
  import Header from './ui/Header.svelte';
  import Venue from './ui/Venue.svelte';

  provideStoreon(store);

  const { venues } = useStoreon('venues');
  const { active } = useStoreon('active');

  onMount(() => store.dispatch('venues/requested'));
</script>

<style>
  * {
    font-family: -apple-system, system-ui, Roboto, 'Open Sans', Helvetica, Arial,
      sans-serif;

    --ink_800: #0c131d;
    --ink_500: #5a6472;
    --ink_400: #9ea9b7;
  }

  :global(body) {
    touch-action: manipulation;
  }
</style>

<main>
  <Header />

  <Map
    on:select={({ detail }) => store.dispatch('active/selected', detail)}
    items={$venues} />

  <Venue on:close={() => store.dispatch('active/unselected')} item={$active} />
</main>
