import { createEvent, createStore, combine } from 'effector';

const enableAmazingFilter = createEvent();
const disableAmazingFilter = createEvent();

const $showOnlyAmazing = createStore(false)
  .on(enableAmazingFilter, () => true)
  .reset(disableAmazingFilter);

const enableHideExpensiveFilter = createEvent();
const disableHideExpensiveFilter = createEvent();

const $hideExpensive = createStore(false)
  .on(enableHideExpensiveFilter, () => true)
  .reset(disableHideExpensiveFilter);

const $filters = combine({
  showOnlyAmazing: $showOnlyAmazing,
  hideExpensive: $hideExpensive,
});

export {
  $filters,
  $showOnlyAmazing,
  enableAmazingFilter,
  disableAmazingFilter,
  $hideExpensive,
  enableHideExpensiveFilter,
  disableHideExpensiveFilter,
};
