<template>
<div>
	<label :for="`input-${name}`"> {{ labelText }} </label>
	<select :id="`input-${name}`" :name="name" @change="$emit('change', $event)">
		<option value="">Please select</option>
		<option v-for="(option, index) in options" :key="index" :value="option.value">
			{{ option.currencyCode }}
		</option>
	</select>
</div>
</template>
<script>
/* have a separate file for props as mixin when app potentially grows */
import { formFieldProps }  from '@/mixins/formFieldProps';
export default {
	name:'SelectField',
	mixins: [formFieldProps],
	props: {
		options: {
			type: Array,
			default () {
				return [];
			} 
		}
	},
	emits: ['change']
};
</script>

<style lang="scss" scoped>
/* import scss only when needed to improve performance */
@import '../../../assets/scss/components/selectField.scss';
</style>
