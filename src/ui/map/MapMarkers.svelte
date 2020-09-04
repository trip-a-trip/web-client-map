<script>
  import * as Leaflet from 'leaflet';
  import { createEventDispatcher } from 'svelte';

  export let map;
  export let items = [];

  const dispatch = createEventDispatcher();

  const markers = {};

  $: {
    // remove old markers
    Object.entries(markers)
      .forEach(([markerId, marker]) => {
        marker?.remove();
        markers[markerId] = null;
      });

    // add new markers
    items.forEach((item) => {
      markers[item.id] = Leaflet.marker(
        [item.coordinates.latitude, item.coordinates.longitude],
        {
          icon: Leaflet.divIcon({ className: 'map-marker' }),
        },
      )
        .addTo(map)
        .on('click', () => dispatch('select', item));
    });
  }
</script>

<style>
  :global(.map-marker) {
    background-color: white;
    border: var(--ink_400) 1px solid;
    border-radius: 10px;
  }
</style>
