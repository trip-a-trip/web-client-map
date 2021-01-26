import { createEvent, createStore } from 'effector';

const selectVenue = createEvent();
const unselectVenue = createEvent();

const $selectedVenue = createStore(null)
  .on(selectVenue, (_, venue) => venue)
  .reset(unselectVenue);

export { $selectedVenue, selectVenue, unselectVenue };
