<script>
  import { createEventDispatcher } from 'svelte';
  import TiLocationArrow from 'svelte-icons/ti/TiLocationArrow.svelte';
  import TiPlus from 'svelte-icons/ti/TiPlus.svelte';
  import TiMinus from 'svelte-icons/ti/TiMinus.svelte';

  import RoundButton from '../components/RoundButton.svelte';

  const dispatch = createEventDispatcher();

  async function handleNewPositionClick() {
    if (!navigator.geolocation) {
      return;
    }

    const { coords } = await new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject),
    );

    dispatch('newPosition', [coords.latitude, coords.longitude]);
  }
</script>

<style>
  .controls {
    position: absolute;

    right: var(--space);
    bottom: var(--space);
    z-index: 2;

    display: grid;
    grid-template-rows: repeat(3, 1fr);
    gap: 8px;
  }
</style>

<section class="controls">
  <RoundButton on:click={() => dispatch('zoomIn')}>
    <TiPlus />
  </RoundButton>
  <RoundButton on:click={() => dispatch('zoomOut')}>
    <TiMinus />
  </RoundButton>
  <RoundButton on:click={handleNewPositionClick}>
    <TiLocationArrow />
  </RoundButton>
</section>
