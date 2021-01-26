import { createEvent, createStore } from 'effector';

const selectVenue = createEvent();
const unselectVenue = createEvent();

const $selectedVenue = createStore(null)
  .on(selectVenue, (venue) => venue)
  .reset(unselectVenue);

export { $selectedVenue, selectVenue, unselectVenue };
