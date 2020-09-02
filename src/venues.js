import axios from 'redaxios';
import { restore, createEffect } from 'effector';

const fetchVenuesFx = createEffect({
  handler: async () => {
    const { data } = await axios.get(
      'https://venues.kamyshev.me/api/venue/list',
    );

    return data;
  },
});

const venues = restore(fetchVenuesFx, []);

export { venues, fetchVenuesFx };
