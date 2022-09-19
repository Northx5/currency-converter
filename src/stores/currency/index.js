import { defineStore } from 'pinia';

export const useCurrencyStore = defineStore('currency', {
  state: () => ({
    amount: null,
    currencyList: [],
    updateRateList: []
  }),
  actions: {
    /* Pull currency names and codes */
    async getRatesValues() {
      this.currencyList = [];
      const url = 'http://www.floatrates.com/daily/gbp.json';
      try {
        let currencyData = await (await fetch(url)).json();
        Object.values(currencyData).forEach((data) => {
          this.currencyList.push({
            label: data.code + ' - ' + data.name,
            value: data.code,
          });
        });
        /* Add GBP to the list because we are not pulling it from the API */
        this.currencyList.unshift({ label: 'GBP - U.K. Pound Sterling', value: 'GBP' });
      } catch {
        console.log('error');
      }
    },
    async updateRatesValues(currency) {
      this.updateRateList = [];
      const url = `http://www.floatrates.com/daily/${currency}.json`;
      try {
        let currencyData = await (await fetch(url)).json();
        Object.values(currencyData).forEach((data) => {
          this.updateRateList.push({
            label: data.code + ' - ' + data.name,
            value: data.rate
          });
        });
      } catch {
        console.log('error');
      }
    }
  }
});