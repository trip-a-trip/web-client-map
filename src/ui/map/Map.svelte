<script>
  import * as Leaflet from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  import MapControls from './MapControls.svelte';
  import MapMarkers from './MapMarkers.svelte';
  import MapUserLocation from './MapUserLocation.svelte';

  const DEFAULT_COORDINATES = [35, 70];
  const DEFAULT_ZOOM = 3;
  const CLOSE_ZOOM = 14;

  export let items;
  export let userLocation;

  let map;

  function mapAction(container) {
    map = Leaflet.map(container, {
      zoomControl: false,
      attributionControl: false,
    }).setView(DEFAULT_COORDINATES, DEFAULT_ZOOM);

    Leaflet.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    ).addTo(map);

    map.on('click', () => dispatch('click'));

    return {
      destroy: () => {
        map.remove();
      },
    };
  }

  function setPosition(location) {
    map.setView(location, CLOSE_ZOOM);
  }

  function handleUserPosition({ detail }) {
    setPosition(detail, CLOSE_ZOOM);

    dispatch('userPositionChange', detail);
  }
</script>

<svelte:window on:resize={() => map?.invalidateSize()} />

<div class="map" use:mapAction />

<MapControls
  on:zoomIn={() => map.zoomIn()}
  on:zoomOut={() => map.zoomOut()}
  on:userPositionChange={handleUserPosition}
/>

<MapMarkers {items} {map} on:select />

<MapUserLocation
  on:click={() => setPosition(userLocation)}
  location={userLocation}
  {map}
/>

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
