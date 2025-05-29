<template>
    <!-- {{ listaColabs }} -->
    <div v-for="colab in colabStore.colabs" :key="colab.colab">
        <div class="flex">
            <Checkbox :label="colab.colab" v-model="chkVModel" :value="colab.colab" @change="updateChkColabs" />

        </div>
    </div>
    <!-- <div>Selecionados: {{ listaColabs }}</div> -->
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import Checkbox from './utils/Checkbox.vue'
import { useColabStore } from '@/stores/colabStore'

const colabStore = useColabStore()
let chkColabs = colabStore.chkColabs
let chkVModel = ref([])

onMounted(() => {
    colabStore.loadColabs()
})

const updateChkColabs = () => {
    chkColabs.value = [...chkVModel.value]
}

const listaColabs = computed(() => chkVModel.value)
</script>

<style></style>