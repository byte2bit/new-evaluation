<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
/* 
import { useGetColabStore } from '@/stores/getColabStore'
const colabStore = useGetColabStore()

const colabs = ref([])
const filteredSuggestions = ref([])
let searchTerm = ref('')

const filterSuggestions = () => {
    filteredSuggestions.value = colabs.value.filter((colab) =>
        colab.colab.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
}

function selectSuggestion(colab) {
    searchTerm.value = colab;
    filteredSuggestions.value = [];
}

onMounted(async () => {
    await colabStore.loadColabs()
    colabs.value = colabStore.colabs
})

console.log("colabStore: ", colabs.value)
 */

const postData = ref({
    matricula: "",
    colab: "",
    ppu: "",
    servico: "",
    funcao: "",
    liderancas: "",
    gerencia: "",
    demandante: "",
})

function notify() {
    toast.success("Dados registrados!", {
        autoClose: 1000,
        theme: 'colored',
    })
}

function save() {
    axios.post("newcolab", postData.value)
        .then(() => {
            reset()
            notify()
        })
        .catch(() => toast.error("Erro ao registrar!"))
}

function reset() {
    postData.value = {
        matricula: "",
        colab: "",
        ppu: "",
        servico: "",
        funcao: "",
        liderancas: "",
        gerencia: "",
        demandante: "",
    }
}
</script>

<template>
    <div class="container">

        <div class="flex justify-between items-center">
            <h2 class="my-5 font-bold text-2xl">Inserir Novo Profissional</h2>
            <router-link to="/" class="h5">
                <div class="flex justify-between items-center gap-2 w-[90px]">
                    <svg class="ms-1 h-5 w-5 fill-black hover:fill-blue-600" viewBox="0 0 576 512" alt="Início">
                        <path
                            d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1v16.2c0 22.1-17.9 40-40 40h-16c-1.1 0-2.2 0-3.3-.1-1.4.1-2.8.1-4.2.1L416 512h-24c-22.1 0-40-17.9-40-40v-88c0-17.7-14.3-32-32-32h-64c-17.7 0-32 14.3-32 32v88c0 22.1-17.9 40-40 40h-55.9c-1.5 0-3-.1-4.5-.2-1.2.1-2.4.2-3.6.2h-16c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9.1-2.8v-69.7h-32c-18 0-32-14-32-32.1 0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7l255.4 224.5c8 7 12 15 11 24z" />
                    </svg>
                    <div class="text-black me-6 hover:text-blue-600">
                        Início
                    </div>
                </div>
            </router-link>
        </div>

        <form class="form" @submit.prevent="save">
            <div class="grid grid-cols-6 grid-rows-4 gap-4">
                <div class="col-span-4 relative">

                    <label for="profissional" class="block text-sm/6 font-medium text-gray-900 mb-1 mt-4">Nome do
                        candidato:</label>
                    <input type="text"
                        class="rounded-md border-zinc-300 bg-white pl-3 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
                        id="profissional" v-model="postData.colab" />
                    <!--  @input="filterSuggestions" -->
                    <!-- <ul class="absolute" v-if="filteredSuggestions.length">
                        <li v-for="(colab, index) in filteredSuggestions" :key="index"
                            @click="selectSuggestion(colab.colab)">
                            {{ colab.colab }}
                        </li>
                    </ul> -->
                </div>
                <div class="col-start-5">
                    <label for="matricula"
                        class="block text-sm/6 font-medium text-gray-900 mb-1 mt-4">Matrícula:</label>
                    <input type="text"
                        class="rounded-md border-zinc-300 bg-white pl-3 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
                        id="matricula" v-model="postData.matricula" />
                </div>
                <div class="col-start-6">
                    <label for="ppu" class="block text-sm/6 font-medium text-gray-900 mb-1 mt-4">PPU:</label>
                    <input type="text"
                        class="rounded-md border-zinc-300 bg-white pl-3 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
                        id="ppu" v-model="postData.ppu" />
                </div>
                <div class="col-span-6 row-start-2">
                    <label for="servico" class="block text-sm/6 font-medium text-gray-900 mb-1 mt-4">Serviço:</label>
                    <input type="text"
                        class="rounded-md border-zinc-300 bg-white pl-3 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
                        id="servico" v-model="postData.servico" />
                </div>
                <div class="col-span-6 row-start-3">
                    <label for="funcao" class="block text-sm/6 font-medium text-gray-900 mb-1 mt-4">Função:</label>
                    <input type="text"
                        class="rounded-md border-zinc-300 bg-white pl-3 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
                        id="funcao" v-model="postData.funcao" />
                </div>
                <div class="col-span-2 row-start-4">
                    <label for="liderancas"
                        class="block text-sm/6 font-medium text-gray-900 mb-1 mt-4">Lideranças:</label>
                    <input type="text"
                        class="rounded-md border-zinc-300 bg-white pl-3 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
                        id="liderancas" v-model="postData.liderancas" />
                </div>
                <div class="col-span-2 col-start-3 row-start-4">
                    <label for="gerencia" class="block text-sm/6 font-medium text-gray-900 mb-1 mt-4">Gerência:</label>
                    <input type="text"
                        class="rounded-md border-zinc-300 bg-white pl-3 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
                        id="gerencia" v-model="postData.gerencia" />
                </div>
                <div class="col-span-2 col-start-5 row-start-4">
                    <label for="demandante" class="block text-sm/6 font-medium text-gray-900 mb-1 mt-4">Email
                        Demandante:</label>
                    <input type="text"
                        class="rounded-md border-zinc-300 bg-white pl-3 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
                        id="demandante" v-model="postData.demandante" />
                </div>
            </div>

            <div class="rounded-md bg-zinc-200 mt-10 p-3 pt-0 flex justify-end items-center">
                <button
                    class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-5 py-2.5 text-center mt-4"
                    type="button">
                    Inserir
                </button>
            </div>
        </form>
    </div>
</template>

<style lang="scss" scoped>
.container {
    max-width: 1000px !important;
    margin: auto;
}

@media(max-width: 768px) {
    .container {
        margin: 0;
    }
}

input {
    width: 100%;
    padding: 5px 10px;
    font-size: 14px;
}

.row div {
    margin: 20px 0;
}

label {
    font-weight: bold;
    font-size: 16px;
}
ul {
    list-style: none;
    padding: 0;
    margin: 0;
    border: 1px solid #ccc;
    max-width: 400px;
    background: #fff;
}

li {
    padding: 4px;
    cursor: pointer;
    font-size: small;
}

li:hover {
    background: #f0f0f0;
}
</style>