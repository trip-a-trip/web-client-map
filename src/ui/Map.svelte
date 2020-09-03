<script>
  import * as Leaflet from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  import { createEventDispatcher } from 'svelte';

  import MapControls from './MapControls.svelte';

  const PHUKET_COORDINATES = [7.9519, 98.3381];
  const DEFAULT_ZOOM = 8;
  const CLOSE_ZOOM = 14;

  const dispatch = createEventDispatcher();

  export let items;

  const markers = {};

  $: {
    // remove old markers
    Object.entries(markers)
      .filter(([markerId]) => items.map((item) => item.id).includes(markerId))
      .forEach(([_, marker]) => {
        marker.remove();
        markers[id] = null;
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

  let map;

  function mapAction(container) {
    map = Leaflet.map(container, {
      zoomControl: false,
      attributionControl: false,
    }).setView(PHUKET_COORDINATES, DEFAULT_ZOOM);

    Leaflet.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    ).addTo(map);

    return {
      destroy: () => {
        map.remove();
      },
    };
  }
</script>

<style>
  .map {
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 1;
    width: 100vw;
    height: 100vh;
  }

  :global(.map-marker) {
    background-color: white;
    border: var(--ink_400) 1px solid;
    border-radius: 10px;
  }
</style>

<svelte:window on:resize={() => map?.invalidateSize()} />

<div class="map" use:mapAction />

<MapControls
  on:zoomIn={() => map.zoomIn()}
  on:zoomOut={() => map.zoomOut()}
  on:newPosition={({ detail }) => map.setView(detail, CLOSE_ZOOM)} />
