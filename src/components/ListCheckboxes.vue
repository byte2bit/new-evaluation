<template>
    <!-- {{ listagem() }} -->
    <div v-for="(colab, index) in listaColabs" :key="index">
        <span class="ms-2">{{ ++index }} -</span>
        {{ colab }}
    </div>
    <div v-for="(colab, index) in colabcUser" :key="index">
        <div class="d-flex">
            <Checkbox :label="colab.colab" v-model="chkVModel" :value="colab" />
        </div>
    </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue';
import Checkbox from './utils/Checkbox.vue'
import { dados } from '@/js/store.js'

// let dados = ref({})
let admin = dados.admin
// let userEmail = dados.email
let colabcUser = ref([])
let chkVModel = ref([])
let colab = ref([])
let lista = ref([])
let listaColabs = ref([])

let loadColabs = () => {
    axios.get("colab").then(res => {
        colab.value = res.data

        if (admin) {
            colabcUser.value = colab.value
        } else {
            colabcUser.value = colab.value.filter(colab => colab.demandante === this.userEmail)
        }

    }).catch("Erro")
}

const listagem = () => {

    lista.value = []
    chkVModel.value.map((colab) => {
        lista.value.push(colab.colab)
    })
    listaColabs.value = lista.value
    
    return listaColabs.value
}

onMounted(() => {
    loadColabs()
    listagem()
})

</script>

<style></style>