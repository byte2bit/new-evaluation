<template>
    <div class="flex items-center">
        <input 
            name="chk[]" 
            type="checkbox" 
            :value="value" 
            v-model="model" 
            class="chkbox"
            :id="`checkbox-${value}`"
        >
        <label :for="`checkbox-${value}`" class="ms-2 lbl">{{ label }}</label>
    </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    modelValue: { type: [Array, Boolean] },
    value: { type: String },
    label: { type: String },
});

const emit = defineEmits(["update:modelValue"]);

const model = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});
</script>

<style scoped>
.chkbox {
    width: 0.7rem;
    height: 0.7rem;
}
.lbl{
    font-size: 0.6rem;
    font-weight: 500;
    color: #000;
}
</style>