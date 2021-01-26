import { createEffect, restore, guard, combine } from 'effector';
import axios from 'redaxios';

import { $showOnlyAmazing } from './filters';

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
  onlyAmazing: $showOnlyAmazing,
}).map(({ venues, onlyAmazing }) =>
  venues.filter((item) => !onlyAmazing || item.isAmazing),
);

export { fetchVenuesFx, $venues };
