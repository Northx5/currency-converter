<template>
<main>
	<form @submit.prevent>

		<label for="amount">Amount:</label>
		<input v-model="formData.amount" id="amount" type="number" />

		<label for="baseCurrency">Base currency:</label>
		<select 
			name="baseCurrency" 
			id="baseCurrency"
			v-model="formData.currencyCode"
			@change="getCurrencyData(formData.currencyCode)">

			<option value="">Please select</option>
			<option v-for="(option, index) in currencyList" :key="index" :value="option.currencyCode">
				{{ option.currencyName }} - {{ option.currencyCode }}
			</option>
			
		</select>

		<label for="convertToCurrency">Convert to currency:</label>
		<select 
			name="convertToCurrency" 
			id="convertToCurrency" 
			v-model="formData.toConvertCurrencyCode"
			@change="formData.toConvertExchangeRate = $event.target.value; formData.toConvertCurrencyCode = $event.target.options[$event.target.options.selectedIndex].text.split('-').pop(); updateRates($event)">

			<option value="">Please select currency to convert to</option>
			<option v-for="(option, index) in currencyList" :key="index" :value="option.toConvertExchangeRate">
				{{ option.currencyName }} - {{ option.currencyCode }}
			</option>

		</select>

		<button @click="convert">Convert</button>
		<span> {{ result }} </span>
	</form>
</main>
</template>
<script>
import { mapActions, mapState } from 'pinia';

import { useCurrencyStore } from '@/stores/currency';

export default {
	data: () => ({
		result: null,
		formData: {
			amount: null,
			currencyCode: '',
			currencyName: '',
			currencyExchangeRate: null,
			toConvertCurrencyCode: '',
			toConvertCurrencyName:'',
			toConvertExchangeRate: null
		}
	}),
	computed: {
		...mapState(useCurrencyStore, ['currencyList'])
	},
	methods: {
		convert () {
			console.log('this.formData.toConvertExchangeRate', this.formData.toConvertExchangeRate);
			this.result = (this.formData.amount * this.formData.toConvertExchangeRate).toFixed(2);
			const currencyStore = useCurrencyStore();
			currencyStore.$patch({
				...this.formData
			});
		},
		async getCurrencyData (currCode) {
			await this.getRatesValues(currCode);
			console.log('formData.currencyCode is:', this.formData.currencyCode);
			console.log('curr code is', currCode);
		},
		async updateRates (event) {
			await this.updateRatesValues(this.formData.toConvertCurrencyCode.trim().toLowerCase());
			console.log(event.target.options);
		},
		...mapActions(useCurrencyStore, ['getRatesValues', 'updateRatesValues'])
	},
	mounted () {
		this.getCurrencyData('gbp');
	}
};
</script>