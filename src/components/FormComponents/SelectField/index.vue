<template>
<div>
	<label :for="`input-${name}`"> {{ labelText }} </label>
	<select :id="`input-${name}`" :name="name" :value="value">
		<option value="">Please select</option>
		<option v-for="(option, index) in options" :key="index" :value="option.value">
			{{ option.label }}
		</option>
	</select>
</div>
</template>
<script>
export default {
	name:'SelectField',
	props: {
		options: {
			type: Array,
			default () {
				return [];
			} 
		},
		name: {
			type: String,
			default: ''
		},
		labelText: {
			type: String,
			default: ''
		},
		value: {
			type: [String, Number],
			default: ''
		}
	}
};
</script>

<style lang="scss" scoped>
/* import scss only when needed to improve performance */
@import '../../../assets/scss/components/selectField.scss';
</style>
