import { defineStore } from 'pinia';

export const useCurrencyStore = defineStore('currency', {
  state: () => ({
    amount: null,
    currencyCode: '',
    exchangeRate: '',
    currencyList: [],
    updateRateList: []
  }),
  actions: {
    async getRatesValues() {
      this.currencyList = [];
      const url = 'http://www.floatrates.com/daily/gbp.json';
      try {
        let currencyData = await (await fetch(url)).json();
        Object.values(currencyData).forEach((data) => {
          this.currencyList.push({
            currencyCode: data.code,
            currencyName: data.name,
          });
        });
        this.currencyList.unshift({ currencyCode: 'GBP', currencyName: 'U.K. Pound Sterling' });
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
            currencyCode: data.code,
            currencyName: data.name,
            exchangeRate: data.rate
          });
        });
      } catch {
        console.log('error');
      }
    }
  }
});