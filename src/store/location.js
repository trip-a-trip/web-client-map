import { restore, createEvent } from 'effector';

const newUserLocation = createEvent();

const $userLocation = restore(newUserLocation, null);

export { newUserLocation, $userLocation };
