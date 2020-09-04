<script>
  import { createEventDispatcher } from 'svelte';
  import TiLocationArrow from 'svelte-icons/ti/TiLocationArrow.svelte';
  import TiPlus from 'svelte-icons/ti/TiPlus.svelte';
  import TiMinus from 'svelte-icons/ti/TiMinus.svelte';

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

    right: 28px;
    bottom: 28px;
    z-index: 2;

    display: grid;
    grid-template-rows: repeat(3, 1fr);
  }

  .controls > button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin: 4px;

    color: var(--ink_400);
    cursor: pointer;
    background-color: white;
    border: none;
    border-radius: 40px;
  }

  .controls > button:hover {
    color: var(--ink_500);
  }

  .controls > button:active {
    color: var(--ink_800);
  }
</style>

<section class="controls">
  <button on:click={() => dispatch('zoomIn')}>
    <TiPlus />
  </button>
  <button on:click={() => dispatch('zoomOut')}>
    <TiMinus />
  </button>
  <button on:click={handleNewPositionClick}>
    <TiLocationArrow />
  </button>
</section>
