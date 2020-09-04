import { createStoreon } from 'storeon';
import axios from 'redaxios';

const venuesStore = (store) => {
  store.on('@init', () => ({
    venues: [],
  }));

  store.on('venues/fetched', (_, venues) => ({ venues }));

  store.on('venues/requested', async () => {
    const { data } = await axios.get('/api/venue/list');

    store.dispatch('venues/fetched', data);
  });
};

const activeModule = (store) => {
  store.on('@init', () => ({ active: null }));

  store.on('active/selected', (_, active) => ({ active }));
  store.on('active/unselected', () => ({ active: null }));
};

const store = createStoreon([venuesStore, activeModule]);

export { store };
