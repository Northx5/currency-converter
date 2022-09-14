<template>
<select v-model="inputValue" :id="`input-${name}`" :name="name" @change="optionChanged($event);">
	<option value="">Please select</option>
	<option v-for="option in options" :key="option.value" :value="option.value">
		{{ option.label }}
	</option>
</select>
</template>
<script>
export default {
	data: () => ({
    
	})
};
</script>