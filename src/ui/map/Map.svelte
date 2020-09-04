<script>
  import * as Leaflet from 'leaflet';
  import 'leaflet/dist/leaflet.css';

  import MapControls from './MapControls.svelte';
  import MapMarkers from './MapMarkers.svelte';

  const DEFAULT_COORDINATES = [35, 70];
  const DEFAULT_ZOOM = 3;
  const CLOSE_ZOOM = 14;

  export let items;

  let map;

  function mapAction(container) {
    map = Leaflet.map(container, {
      zoomControl: false,
      attributionControl: false,
    }).setView(DEFAULT_COORDINATES, DEFAULT_ZOOM);

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

<MapMarkers {items} {map} on:select />
