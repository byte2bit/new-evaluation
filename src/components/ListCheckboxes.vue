<template>
    <input type="checkbox" @click="toggleSelection" :checked="allCheckBoxesSelected" class="w-3 h-3 accent-pink-500">
    <label class="ms-2">Todos</label>
    <!-- {{ listaColabs }} -->

    <div v-for="colab in colabStore.colabs" :key="colab.colab">
        <!--         <div class="flex">
            <Checkbox :label="colab.colab" v-model="chkVModel" :value="colab.colab" @change="updateChkColabs" />

        </div> -->
        <input type="checkbox" class="w-6 h-6 accent-pink-500" :checked="checkBoxSelection.selectedCheckBox.has(checkBox)"
            @click="checkBoxSelection.toggle(checkBox)">

        <label :for="`checkbox-${value}`" class="ms-2 lbl">{{ label }}</label>
    </div>
    <!-- <div>Selecionados: {{ listaColabs }}</div> -->
</template>

<script setup>
// import Checkbox from './utils/Checkbox.vue'
import { onMounted, ref, computed } from 'vue'
import { useColabStore } from '@/stores/colabStore'

const colabStore = useColabStore()
const emailSelection = useColabStore()
let chkColabs = colabStore.chkColabs
let chkVModel = ref([])

const allCheckBoxesSelected = computed(() => 
    chkVModel.value.length === colabStore.colabs.length && colabStore.colabs.length > 0
)


let numberSelected = computed(() => emailSelection.selectedEmails.size)
let allEmailsSelected = computed(() => numberSelected.value == props.emails.length) /

function toggleSelection() {
    if (allCheckBoxesSelected.value) {
        chkVModel.value = []
    } else {
        chkVModel.value = colabStore.colabs.map(c => c.colab)
    }
    updateChkColabs()
}

onMounted(() => {
    colabStore.loadColabs()
})

const updateChkColabs = () => {
    chkColabs.value = [...chkVModel.value]
}

const listaColabs = computed(() => chkVModel.value)
</script>

<style></style>