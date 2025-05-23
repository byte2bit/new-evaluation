<template>
    <!-- {{ listagem() }} -->
      <!-- {{ store.colab }} -->
<!--     <div v-for="(colab, index) in colabStore.colab" :key="index">
        <span class="ms-2">{{ ++index }} -</span>
        {{ colab.colab }}
    </div> -->
    <div v-for="(colab) in colabStore.colab" :key="colab">
        <div class="flex">
            <Checkbox :label="colab.colab" v-model="chkVModel" :value="colab.colab" />

        </div>
    </div>
</template>

<script setup>
// import axios from 'axios'
import { onMounted, ref } from 'vue';
import Checkbox from './utils/Checkbox.vue'
import { dados } from '@/js/store.js'
import { useColabStore } from '@/stores/colabStore'
const colabStore = useColabStore()

const store = colabStore.loadColabs
const chkColabs = colabStore.chkColabs

console.log(JSON.stringify(colabStore.colab))
// console.log(JSON.stringify(colabStore.colab))

// let dados = ref({})
let admin = dados.admin
// let userEmail = dados.email
let colabcUser = ref([])
let chkVModel = ref([])
let colab = ref([])
let lista = ref([])
let listaColabs = ref([])

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

const listagem = () => {

    lista.value = []
    chkVModel.value.map((store) => {
        lista.value.push(store.label)
    })
    listaColabs.value = lista.value
    chkColabs.value = "Teste testando"
    return listaColabs.value
}

onMounted(() => {
    // loadColabs()
    listagem()
})

</script>

<style></style>