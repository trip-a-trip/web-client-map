<script>
  import { onMount } from 'svelte';

  import {
    $venues as venues,
    $selectedVenue as selectedVenue,
    $showOnlyAmazing as showOnlyAmazing,
    $hideExpensive as hideExpensive,
    $infoCardOpen as infoCardOpen,
    $userLocation as userLocation,
    openInfoCard,
    closeInfoCard,
    selectVenue,
    unselectVenue,
    fetchVenuesFx,
    enableAmazingFilter,
    disableAmazingFilter,
    enableHideExpensiveFilter,
    disableHideExpensiveFilter,
    newUserLocation,
  } from './store';
  import Map from './ui/map/Map.svelte';
  import Header from './ui/Header.svelte';
  import Venue from './ui/venue/Venue.svelte';
  import Switch from './ui/components/Switch.svelte';
  import Info from './ui/Info.svelte';

  onMount(fetchVenuesFx);
</script>

<main>
  <Header>
    <Switch
      value={$showOnlyAmazing}
      on:check={enableAmazingFilter}
      on:uncheck={disableAmazingFilter}>Только эмейзинг</Switch
    >
    <Switch
      value={$hideExpensive}
      on:check={enableHideExpensiveFilter}
      on:uncheck={disableHideExpensiveFilter}>Скрыть дорогие</Switch
    >
  </Header>

  <Map
    on:select={({ detail }) => selectVenue(detail)}
    on:userPositionChange={({ detail }) => newUserLocation(detail)}
    userLocation={$userLocation}
    items={$venues}
  />

  <Venue on:close={unselectVenue} item={$selectedVenue} />

  <Info
    isOpen={$infoCardOpen}
    on:open={openInfoCard}
    on:close={closeInfoCard}
  />
</main>

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
