<template>
        <div class="flex items-center">
            <input 
            name="chk[]" 
            type="checkbox" 
            :value="value" 
            v-model="model" 
            class="chkbox"
            @click="seleciona"
            :id="`checkbox-${value}`"
            >
            <label :for="`checkbox-${value}`" class="ms-2 lbl">{{ label }}</label>
        </div>

    </template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useColabStore } from '@/stores/colabStore'
const colabStore = useColabStore()
let chkColabs = colabStore.chkColabs

const props = defineProps({
    modelValue: { type: [Array, Boolean] },
    value: { type: String },
    label: { type: String },
});

let seleciona = (event) => {
    chkColabs.value = event.target.value
    console.log("check-chkColabs: "+chkColabs.value);
}

const emit = defineEmits(["update:modelValue"]);

const model = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});

// let { chkText, chkVModel } = toRefs(props)
// var { chkText, chkVModel } = props

//desabilita clicar fora do checkbox
// refazer com evento ou binding
// https://stackoverflow.com/questions/70688501/how-to-disable-clicking-on-label-in-vue-js-checkbox-component
var notChk = () => {
    var lbls = window.document.querySelectorAll('label')
    lbls.forEach(lbl => {
        lbl.onclick = function () {
            model.value = ''
        }
    })
}

onMounted(() => {
    notChk()
})

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