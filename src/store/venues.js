import { createStore, combine } from 'effector';

import { $filters } from './filters';
import { allVenues } from './data';

const $allVenues = createStore(allVenues);

const $venues = combine({
  venues: $allVenues,
  filters: $filters,
}).map(({ venues, filters }) =>
  venues
    .filter((item) => !filters.showOnlyAmazing || item.isAmazing)
    .filter((item) => !filters.hideExpensive || !item.isExpensive),
);

export { $venues, $allVenues };
