import {
  enableAmazingFilter,
  enableHideExpensiveFilter,
  openInfoCard,
  $selectedVenue,
} from '../store';
import { sendEvent } from './sendEvent';

openInfoCard.watch(() => sendEvent('info-open'));

enableAmazingFilter.watch(() =>
  sendEvent('filter-enable', { filter: 'amazing' }),
);

enableHideExpensiveFilter.watch(() =>
  sendEvent('filter-enable', { filter: 'expensive' }),
);

$selectedVenue.watch((venue) => {
  if (venue) {
    sendEvent('venue-select', { name: venue.name, id: venue.id });
  }
});
