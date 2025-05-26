<template>
    <!-- {{ listaColabs }} -->
    <div v-for="(colab) in colabStore.colab" :key="colab">
        <div class="flex">
            <Checkbox :label="colab.colab" v-model="chkVModel" :value="colab.colab" @change="updateChkColabs" />

        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import Checkbox from './utils/Checkbox.vue'
// import { dados } from '@/js/store.js'
import { useColabStore } from '@/stores/colabStore'
const colabStore = useColabStore()

const store = colabStore.loadColabs

let chkColabs = colabStore.chkColabs
let chkVModel = ref([])

/* let loadColabs = () => {
    axios.get("https://api.nucleoengenharia.com.br:8000/colab").then(res => {
        colab.value = res.data

        if (admin) {
            colabcUser.value = colab.value
        } else {
            colabcUser.value = colab.value.filter(colab => colab.demandante === this.userEmail)
        }

    }).catch("Erro")
} */

// Sincroniza o store com os valores selecionados
const updateChkColabs = () => {
    chkColabs.value = [...chkVModel.value]
}

// Computed para exibir a lista selecionada
const listaColabs = computed(() => chkVModel.value)
</script>

<style></style>