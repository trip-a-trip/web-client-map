<script>
  import * as Leaflet from "leaflet";
  import "leaflet/dist/leaflet.css";

  const PHUKET_COORDINATES = [7.9519, 98.3381];
  const DEFAULT_ZOOM = 8;

  let map;

  function mapAction(container) {
    map = Leaflet.map(container, {
      zoomControl: false,
      attributionControl: false,
    }).setView(PHUKET_COORDINATES, DEFAULT_ZOOM);

    Leaflet.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
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

  function handleZoomInClick() {
    map.zoomIn()
  }

  function handleZoomOutClick() {
    map.zoomOut()
  }
</script>

<style>
  .map {
    z-index: 1;
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0px;
    left: 0px;
  }

  .controls {
    position: absolute;
    z-index: 2;

    right: 32px;
    bottom: 32px;

    display: grid;
    grid-template-rows: repeat(3, 1fr);

    gap: 8px;
  }
  
  .controls > * {
    background-color: white;

    width: 32px;
    height: 32px;
    border-radius: 32px;
    border: none;
  }
</style>

<svelte:window on:resize={resizeMap} />

<div class="map" use:mapAction />

<div class="controls">
  <button on:click={handleZoomInClick}>+</button>
  <button on:click={handleZoomOutClick}>-</button>
</div>
