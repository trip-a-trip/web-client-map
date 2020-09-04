<script>
  import * as Leaflet from 'leaflet';
  import { MarkerClusterGroup } from 'leaflet.markercluster';
  import { createEventDispatcher } from 'svelte';

  import 'leaflet.markercluster/dist/MarkerCluster.css';

  export let map;
  export let items = [];

  let cluster;

  const dispatch = createEventDispatcher();

  const markers = {};

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
      markers[item.id] = Leaflet.marker(
        [item.coordinates.latitude, item.coordinates.longitude],
        {
          icon: Leaflet.divIcon({ html: `<span class="map-marker"></span>` }),
        },
      )
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
    background-color: var(--purple_300);
    border: white 2px solid;
    border-radius: 20px;
    display: flex;
    width: 20px;
    height: 20px;
    position: relative;
    left: -5px;
    top: -5px;
  }

  :global(.map-cluster) {
    background-color: white;
    border: var(--purple_300) 2px solid;
    border-radius: 32px;
    width: 32px;
    height: 32px;
    position: relative;
    left: -12px;
    top: -12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
