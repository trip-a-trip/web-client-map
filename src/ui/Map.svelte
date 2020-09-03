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

  // TODO: rewrite this code
  // handle real select
  $: {
    setTimeout(() => {
      const found = items
        .slice()
        .reverse()
        .find(({ isExpensive, isAmazing }) => isExpensive && isAmazing);

      dispatch('select', found);
    }, 1000);
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
</style>

<svelte:window on:resize={() => map?.invalidateSize()} />

<div class="map" use:mapAction />

<MapControls
  on:zoomIn={() => map.zoomIn()}
  on:zoomOut={() => map.zoomOut()}
  on:newPosition={({ detail }) => map.setView(detail, CLOSE_ZOOM)} />
