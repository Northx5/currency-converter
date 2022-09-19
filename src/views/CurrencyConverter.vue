<template>
<Form @submit="convert" class="flex flex-column" ref="form" v-slot="{ errors }">
	<span class="error">{{ errors.field }}</span>
	<div>
		<label for="amount" data-cy="amount-label">Amount:</label>
		<Field name="field" :rules="isRequired" v-model="formData.amount" id="amount" type="number" data-cy="amount-input"/>		
	</div>

	<SelectField 
		data-cy="base-currency"
		name="baseCurrency" 
		label-text="Base Currency:"
		:options="currencyList"
		:value="formData.currencyCode" 
		@change="formData.currencyCode = $event.target.options[$event.target.options.selectedIndex].text.split('-')[0].trim(); getRateData(formData.currencyCode)" />

	<SelectField 
		data-cy="convert-to-currency"
		name="convertToCurrency" 
		label-text="Convert to currency:"
		:options="updateRateList"
		:value="formData.toConvertExchangeRate"
		@change="formData.toConvertExchangeRate = $event.target.value; formData.toConvertCurrencyCode = $event.target.options[$event.target.options.selectedIndex].text.split('-')[0].trim();" />

	<button data-cy="submit-button" class="align-self-end">Convert</button>
  
	<div>
		<span>Conversion Result:</span>
		<span class="font-16"> {{ result || '0' }} </span>
	</div>
</Form>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useCurrencyStore } from '@/stores/currency';

import { Field, Form } from 'vee-validate';

import SelectField from '@/components/FormComponents/SelectField/index.vue';

export default {
	components: {
		SelectField,
		Field,
		// eslint-disable-next-line vue/no-reserved-component-names
		Form
	},
	data: () => ({
		result: null,
		formData: {
			amount: null,
			currencyCode: '',
			toConvertCurrencyCode: '',
			toConvertExchangeRate: null,			
		}
	}),
	computed: {
		...mapState(useCurrencyStore, ['currencyList', 'updateRateList'])
	},
	methods: {
		isRequired(value) {
			return value ? true : 'This field is required';
		},
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
