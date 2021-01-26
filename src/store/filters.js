import { createEvent, createStore } from 'effector';

const enableAmazingFilter = createEvent();
const disableAmazingFilter = createEvent();

const $showOnlyAmazing = createStore(false)
  .on(enableAmazingFilter, () => true)
  .reset(disableAmazingFilter);

export { $showOnlyAmazing, enableAmazingFilter, disableAmazingFilter };
