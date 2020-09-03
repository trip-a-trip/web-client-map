import axios from 'redaxios';
import { restore, createEffect, createEvent } from 'effector';

const fetchVenuesFx = createEffect({
  handler: async () => {
    const { data } = await axios.get(
      'https://venues.kamyshev.me/api/venue/list',
    );

    return data;
  },
});

const venueSelected = createEvent();
const venueUnselected = createEvent();

const venues = restore(fetchVenuesFx, []);

const activeVenue = restore(venueSelected, null).reset(venueUnselected);

export { venues, fetchVenuesFx, activeVenue, venueSelected, venueUnselected };
