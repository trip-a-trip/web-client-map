import {
  enableAmazingFilter,
  enableHideExpensiveFilter,
  openInfoCard,
  selectVenue,
} from '../store';
import { sendEvent } from './sendEvent';

openInfoCard.watch(() => sendEvent('info-open'));

enableAmazingFilter.watch(() =>
  sendEvent('filter-enable', { props: { filter: 'amazing-filter' } }),
);

enableHideExpensiveFilter.watch(() =>
  sendEvent('filter-enable', { props: { filter: 'expensive' } }),
);

selectVenue.watch((venue) =>
  sendEvent('venue-select', { props: { name: venue.name, id: venue.id } }),
);
