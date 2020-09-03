<script>
  import * as Leaflet from 'leaflet';
  import 'leaflet/dist/leaflet.css';

  import MapControls from './MapControls.svelte';

  const PHUKET_COORDINATES = [7.9519, 98.3381];
  const DEFAULT_ZOOM = 8;

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

  function resizeMap() {
    if (map) {
      map.invalidateSize();
    }
  }

  function handleZoomIn() {
    map.zoomIn();
  }

  function handleZoomOut() {
    map.zoomOut();
  }

  function handleNewPosition({ detail }) {
    map.setView(detail, 14);
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

<svelte:window on:resize={resizeMap} />

<div class="map" use:mapAction />

<MapControls
  on:zoomIn={handleZoomIn}
  on:zoomOut={handleZoomOut}
  on:newPosition={handleNewPosition} />
