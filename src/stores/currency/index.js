import { defineStore } from 'pinia';

export const useCurrencyStore = defineStore('currency', {
  state: () => ({
    amount: null,
    currencyCode: '',
    currencyName: '',
    toConvertExchangeRate: null,
    currencyList: [],
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
    }
  }
});