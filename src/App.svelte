<script>
  import { onMount } from 'svelte';
  import { provideStoreon, useStoreon } from '@storeon/svelte';

  import { store } from './store';
  import Map from './ui/map/Map.svelte';
  import Header from './ui/Header.svelte';
  import Venue from './ui/venue/Venue.svelte';
  import Switch from './ui/components/Switch.svelte';

  provideStoreon(store);

  let onlyAmazing = false;

  const { venues } = useStoreon('venues');
  const { active } = useStoreon('active');

  onMount(() => store.dispatch('venues/requested'));

  $: items = $venues.filter((item) => !onlyAmazing || item.isAmazing);
</script>

<style>
  * {
    font-family: -apple-system, system-ui, Roboto, 'Open Sans', Helvetica, Arial,
      sans-serif;

    --ink_800: #0c131d;
    --ink_500: #5a6472;
    --ink_400: #9ea9b7;
    --ink_300: #cdd4de;
    --ink_50: #eff1f4;
    --ink_25: #f6f7f9;

    --purple_800: #a266eb;
    --purple_500: #b983f1;
    --purple_300: #cea8f5;
    --purple_50: #f7f0fd;

    --space: 32px;

    --shadow: 0 6px 9px rgba(0, 0, 0, 0.08);
  }
  @media (max-width: 768px) {
    * {
      --space: 16px;
    }
  }
  :global(*) {
    box-sizing: border-box;
  }

  :global(body) {
    touch-action: manipulation;
  }

  :global(h1) {
    font-weight: 600;
  }
</style>

<main>
  <Header>
    <Switch bind:value={onlyAmazing}>Только эмейзинг</Switch>
  </Header>

  <Map
    on:select={({ detail }) => store.dispatch('active/selected', detail)}
    on:click={() => store.dispatch('active/unselected')}
    {items} />

  <Venue on:close={() => store.dispatch('active/unselected')} item={$active} />
</main>
