import { createEffect, restore, guard, combine } from 'effector';
import axios from 'redaxios';

import { $filters } from './filters';

const REFETCH_THRESHOLD = 5;

const wait = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchVenuesFx = createEffect({
  handler: async ({ attempt = 0 } = {}) => {
    await wait(attempt * 1000);

    const { data } = await axios.get('https://eat.kamyshev.me/v1/venue/list');

    return data;
  },
});

guard({
  source: fetchVenuesFx.fail,
  filter: ({ params }) => params?.attempt <= REFETCH_THRESHOLD,
  target: fetchVenuesFx.prepend(({ params }) => ({
    attempt: (params?.attempt ?? 0) + 1,
  })),
});

const $allVenues = restore(fetchVenuesFx, []);

const $venues = combine({
  venues: $allVenues,
  filters: $filters,
}).map(({ venues, filters }) =>
  venues
    .filter((item) => !filters.showOnlyAmazing || item.isAmazing)
    .filter((item) => !filters.hideExpensive || !item.isExpensive),
);

export { fetchVenuesFx, $venues };
