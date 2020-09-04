<script>
  import * as Leaflet from 'leaflet';
  import { MarkerClusterGroup } from 'leaflet.markercluster';
  import { createEventDispatcher } from 'svelte';

  import 'leaflet.markercluster/dist/MarkerCluster.css';

  export let map;
  export let items = [];

  let cluster;

  const dispatch = createEventDispatcher();

  $: {
    // remove old markers
    if (map) {
      map.removeLayer(cluster);
    }

    // add new markers
    cluster = new MarkerClusterGroup({
      showCoverageOnHover: false,
      iconCreateFunction: (info) =>
        L.divIcon({
          html: `<span class="map-cluster">${info.getChildCount()}</span>`,
        }),
    });

    items.forEach((item) => {
      Leaflet.marker([item.coordinates.latitude, item.coordinates.longitude], {
        icon: Leaflet.divIcon({ html: `<span class="map-marker"></span>` }),
      })
        .addTo(cluster)
        .on('click', () => dispatch('select', item));
    });

    if (map) {
      map.addLayer(cluster);
    }
  }
</script>

<style>
  :global(.map-marker) {
    position: relative;
    top: -5px;
    left: -5px;
    display: flex;
    width: 20px;
    height: 20px;
    background-color: var(--purple_300);
    border: white 2px solid;
    border-radius: 20px;
  }

  :global(.map-cluster) {
    position: relative;
    top: -12px;
    left: -12px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background-color: white;
    border: var(--purple_300) 2px solid;
    border-radius: 32px;
  }
</style>
