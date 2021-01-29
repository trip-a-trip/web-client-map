import {
  enableAmazingFilter,
  enableHideExpensiveFilter,
  openInfoCard,
  selectVenue,
} from '../store';
import { sendEvent } from './sendEvent';

openInfoCard.watch(() => sendEvent('info-open'));

enableAmazingFilter.watch(() =>
  sendEvent('filter-enable', { filter: 'amazing' }),
);

enableHideExpensiveFilter.watch(() =>
  sendEvent('filter-enable', { filter: 'expensive' }),
);

selectVenue.watch((venue) =>
  sendEvent('venue-select', { name: venue.name, id: venue.id }),
);
