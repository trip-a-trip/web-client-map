<script>
  import { createEventDispatcher } from 'svelte';
  import TiInfoLargeOutline from 'svelte-icons/ti/TiInfoLargeOutline.svelte';

  import Card from './components/Card.svelte';
  import Link from './components/Link.svelte';
  import RoundButton from './components/RoundButton.svelte';

  export let isOpen = false;

  const dispatch = createEventDispatcher();

  function openInfoCard() {
    dispatch('open');
  }

  function closeInfoCard() {
    dispatch('close');
  }
</script>

{#if isOpen}
  <section class="info">
    <Card closeable on:close={closeInfoCard}>
      <p>Привет. Проект умер, а это просто слепок последнего состояния.</p>
      <p>
        Карта не обновляется и обновляться больше не будет. Вероятно, многие заведения закрылись или стали отстойными.
      </p>

      <p>
        <Link newTab href="https://t.me/igorkamyshev">Пиши мне в телеграм</Link>, если что.
      </p>
    </Card>
  </section>
{/if}

<section class="controls">
  <RoundButton on:click={openInfoCard}><TiInfoLargeOutline /></RoundButton>
</section>

<style>
  .controls {
    position: absolute;
    bottom: var(--space);
    left: var(--space);
    z-index: 2;
  }

  .info {
    position: absolute;
    bottom: var(--space);
    left: var(--space);
    z-index: 3;
    width: 500px;
  }

  @media (max-width: 768px) {
    .info {
      width: calc(100vw - (2 * var(--space)));
    }
  }

  p {
    margin-block-end: 0.5em;
  }

  ul {
    margin-block-start: 0.5em;
    padding-inline-start: 12px;
  }

  li {
    list-style-type: none;
  }
</style>
