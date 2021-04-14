import { by, element } from 'detox';

import actions from '../../actions';
import { TransactionStatus } from '../../helpers/types';
import Header from '../common/Header';

const FiltersScreen = () => ({
  header: Header(),

  filterByReceivedOption: element(by.id('filter-by-received-option')),
  filterBySentOption: element(by.id('filter-by-sent-option')),

  filterByFromSenderInput: element(by.id('filter-by-from-sender-input')),

  filterByFromDateInput: element(by.id('filter-by-from-date-input')),
  filterByToDateInput: element(by.id('filter-by-to-date-input')),

  filterByFromAmountInput: element(by.id('filter-by-from-amount-input')),
  filterByToAmountInput: element(by.id('filter-by-to-amount-input')),

  filterByStatusOption: (status: TransactionStatus) => element(by.id(`filter-by-${status}-option`)),

  applyFiltersButton: element(by.id('apply-filters-button')),
  clearAllFiltersButton: element(by.id('clear-filters-button')),

  async tapOnReceivedFilterOption() {
    await actions.tap(this.filterByReceivedOption);
  },

  async tapOnSentFilterOption() {
    await actions.tap(this.filterBySentOption);
  },

  async chooseContactToFilterBy(contactName: string) {
    await actions.tap(this.filterByFromSenderInput);
  },

  async selectFromDateFilter() {
    // No idea how to implement this with the current date picker component. Probably it's not possible
    throw new Error('Not implemented');
  },

  async selectToDateFilter() {
    // No idea how to implement this with the current date picker component. Probably it's not possible
    throw new Error('Not implemented');
  },

  async typeFromAmount(amount: string) {
    await actions.typeText(this.filterByFromAmountInput, amount);
  },

  async typeToAmount(amount: string) {
    await actions.typeText(this.filterByToAmountInput, amount);
  },

  async tapOnStatusOption(status: TransactionStatus) {
    const statusOption = this.filterByStatusOption(status);

    await actions.tap(statusOption);
  },

  async tapOnApplyFiltersButton() {
    await actions.tap(this.applyFiltersButton);
  },

  async tapOnClearAllButton() {
    await actions.tap(this.clearAllFiltersButton);
  },
});

export default FiltersScreen;
