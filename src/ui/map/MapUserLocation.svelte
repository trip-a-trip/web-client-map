<script>
  import * as Leaflet from 'leaflet';
  import { createEventDispatcher } from 'svelte';

  export let map;
  export let location;

  const dispatch = createEventDispatcher();

  let point;

  $: {
    if (point && map) {
      map.removeLayer(point);
    }

    if (location && map) {
      point = Leaflet.marker(location, {
        icon: Leaflet.divIcon({ html: `<span class="map-location">Я</span>` }),
      }).on('click', () => dispatch('click'));

      map.addLayer(point);
    }
  }
</script>

<style>
  :global(.map-location) {
    position: relative;
    top: -5px;
    left: -5px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    color: white;
    background-color: var(--purple_800);
    border: white 3px solid;
    border-radius: 30px;
  }
</style>
