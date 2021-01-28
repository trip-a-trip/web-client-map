import { createStore, createEvent } from 'effector';

const openInfoCard = createEvent();
const closeInfoCard = createEvent();

const $infoCardOpen = createStore(false)
  .on(openInfoCard, () => true)
  .reset(closeInfoCard);

export { openInfoCard, closeInfoCard, $infoCardOpen };
