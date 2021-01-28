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
      <p>Привет. Я — Игорь, и я очень люблю еду.</p>
      <p>
        Все заведения, где хорошо — на этой карте. У заведений нет рейтинга, но
        некоторые из них помечены эмодзи:
      </p>

      <ul>
        <li>😍 — эмейзинг место</li>
        <li>💸 — дороговато, но без жести</li>
      </ul>

      <p>
        Ещё, этим сервисом можно пользоваться через
        <Link newTab href="https://t.me/trip_trip_robot">телеграм-бота</Link>.
      </p>

      <p>
        <Link newTab href="https://t.me/igorkamyshev">Пиши фидбеки</Link>,
        рассказывай друзьям, ешь вкусно.
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
