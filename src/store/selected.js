import { createEvent, createStore, combine } from 'effector';
import { persist } from 'effector-storage/query/fp';

import { $allVenues } from './venues';

const selectVenue = createEvent();
const unselectVenue = createEvent();

const $selectedId = createStore(null)
  .on(selectVenue, (_, venue) => venue.id)
  .reset(unselectVenue)
  .thru(persist({ key: 'selected' }));

const $selectedVenue = combine([$allVenues, $selectedId]).map(
  ([allVenues, selectedId]) =>
    allVenues.find((venue) => venue.id === selectedId) ?? null,
);

export { $selectedVenue, selectVenue, unselectVenue };
