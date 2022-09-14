import { defineStore } from 'pinia';

export const useCurrencyStore = defineStore('currency', {
  state: () => ({
    amount: null,
    currencyCode: '',
    currencyName: '',
    toConvertCurrencyCode: '',
    toConvertCurrencyName: '',
    toConvertExchangeRate: null,
    currencyList: [],
    currenciesData: []
  }),
  actions: {
    async getRatesValues(cCode) {
      this.currencyList = [];
      const url = `http://www.floatrates.com/daily/${cCode}.json`;
      try {
        let currencyData = await (await fetch(url)).json();
        Object.values(currencyData).forEach((data) => {
          this.currencyList.push({
            currencyCode: data.code,
            currencyName: data.name,
            toConvertExchangeRate: data.rate
          });
        });
        console.log(this.currencyList);
      } catch {
        console.log('error');
      }
    },
    async updateRatesValues(currCode) {
      console.log('zaa');
      this.currenciesData = [];
      const url = `http://www.floatrates.com/daily/${currCode}.json`;
      console.log(url);
      try {
        let currencyData = await (await fetch(url)).json();
        Object.values(currencyData).forEach((data) => {
          this.currenciesData.push({
            toConvertCurrencyCode: data.code,
            toConvertCurrencyName: data.name,
            toConvertExchangeRate: data.rate
          });
        });
        console.log('this.currenciesData', this.currenciesData);
      } catch {
        console.log('error');
      }
    }
  }
});