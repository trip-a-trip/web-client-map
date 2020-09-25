import { createStoreon } from 'storeon';
import axios from 'redaxios';

const REFETCH_THRESHOLD = 5;

const wait = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchVenues = async ({ attempt = 0 } = {}) => {
  try {
    const { data } = await axios.get('/v1/venue/list');

    return data;
  } catch (error) {
    if (attempt >= REFETCH_THRESHOLD) {
      throw error;
    }

    await wait(attempt * 1000);

    return fetchVenues({ attempt: attempt + 1 });
  }
};

const venuesStore = (store) => {
  store.on('@init', () => ({
    venues: [],
  }));

  store.on('venues/fetched', (_, venues) => ({ venues }));

  store.on('venues/requested', async () => {
    const venues = await fetchVenues();

    store.dispatch('venues/fetched', venues);
  });
};

const activeModule = (store) => {
  store.on('@init', () => ({ active: null }));

  store.on('active/selected', (_, active) => ({ active }));
  store.on('active/unselected', () => ({ active: null }));
};

const store = createStoreon([venuesStore, activeModule]);

export { store };
