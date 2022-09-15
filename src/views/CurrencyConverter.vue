<template>
<form @submit.prevent="convert" class="flex flex-column" ref="form">

	<div>
		<label for="amount" data-cy="amount-label">Amount:</label>
		<input v-model="formData.amount" id="amount" type="number" data-cy="amount-input"/>
	</div>

	<SelectField 
		data-cy="base-currency"
		name="baseCurrency" 
		label-text="Base Currency:"
		:options="currencyList"
		:value="formData.currencyCode" 
		@change="formData.toConvertExchangeRate = $event.target.value; formData.toConvertCurrencyCode = $event.target.options[$event.target.options.selectedIndex].text.split('-').pop(); getRateData(formData.toConvertCurrencyCode)" />
     
	<div>
		<label for="convertToCurrency">Convert to currency:</label>
		<select 
			data-cy="convert-to-currency"
			name="convertToCurrency" 
			id="convertToCurrency"
			@change="formData.toConvertExchangeRate = $event.target.value; formData.toConvertCurrencyCode = $event.target.options[$event.target.options.selectedIndex].text.split('-').pop(); getRateData(formData.toConvertCurrencyCode)">

			<option value="">Please select currency to convert to</option>
			<option v-for="(option, index) in updateRateList" :key="index" :value="option.exchangeRate" >
				{{ option.currencyName }} - {{ option.currencyCode }}
			</option>
		</select>
	</div>

	<button data-cy="submit-button" class="align-self-end">Convert</button>
  
	<div>
		<span>Conversion Result:</span>
		<span class="font-16"> {{ result || '0' }} </span>
	</div>
</form>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useCurrencyStore } from '@/stores/currency';

import SelectField from '@/components/FormComponents/SelectField/index.vue';

export default {
	components: {
		SelectField
	},
	data: () => ({
		result: null,
		formData: {
			amount: null,
			currencyCode: '',
			currencyName: '',
			toConvertCurrencyCode: '',
			toConvertExchangeRate: null,			
		}
	}),
	computed: {
		...mapState(useCurrencyStore, ['currencyList', 'updateRateList'])
	},
	methods: {
		convert () {
			this.result = (this.formData.amount * this.formData.toConvertExchangeRate).toFixed(2);
			const currencyStore = useCurrencyStore();
			currencyStore.$patch({
				amount: 'amount',
			});
		},
		getCurrencyData () {
			this.getRatesValues();
		},
		getRateData (currCode) {
			this.updateRatesValues(currCode);
		},
		...mapActions(useCurrencyStore, ['getRatesValues', 'updateRatesValues'])
	},
	mounted () {
		this.getCurrencyData();
	}
};
</script>
