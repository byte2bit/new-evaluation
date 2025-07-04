<template>
    <div class="page w-full pe-6 ps-3">
        <div class="flex justify-between items-center">
            <h2 class="my-5 font-bold text-2xl">Lista de profissionais: </h2>
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

        <div class="bg-zinc-200 p-2 rounded ps-3">
            <span class="me-2"><b>Procurar: </b> </span>
            <input class="w-1/4" type="text" v-model="searchValue">
        </div>

        <EasyDataTable class="my-4" show-index id="tabela" :headers="header" :items="colabStore.colabs"
            v-model:items-selected="itemsSelected" rowsPerPageMessage="linhas por página:"
            rowsOfPageSeparatorMessage="de" emptyMessage="Não há dados disponíveis" :buttons-pagination="true"
            :search-value="searchValue" alternating>
            <template #loading>
                <img src="@/assets/spinner.gif" alt="Carregando..." style="width: 100px; height: 80px;" />
            </template>
            <template #item-operation="colab">
                <div class="operation-wrapper">
                    <img src="@/assets/delete.png" class="operation-icon" @click="openModal(colab)" />
                </div>
            </template>
        </EasyDataTable>

        <!-- MODAL -->
        <teleport to="body">
            <!-- Main modal -->
            <div id="sub-modal-colabs-del" tabindex="-1" aria-hidden="false"
                class="hidden fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div class="relative w-full max-w-xl max-h-full">
                    <!-- Modal content -->
                    <div class="relative bg-white rounded-lg shadow-sm">
                        <!-- Modal header -->
                        <div
                            class="flex items-center justify-start p-4 md:p-5 border-b rounded-t border-gray-200 bg-gray-200">
                            <img id="svg" src="@/assets/triangule.svg" alt="" />

                            <h1 class="font-bold text-xl">Remover profissional</h1>
                        </div>
                        <!-- Modal body -->
                        <div class="p-4 md:p-5 space-y-4">
                            Remover profissional: <b>{{ colabName }}</b> ?
                        </div>
                        <!-- Modal footer -->
                        <div class="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b">

                            <button data-modal-hide="sub-modal-colabs-del" type="button"
                                class="block text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg font-bold text-sm px-5 py-2.5 text-center"
                                @click="deleteItem">Remover</button>
                            <button data-modal-hide="sub-modal-colabs-del" type="button"
                                class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                                @click="closeModal">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </teleport>
        <!-- FINAL MODAL -->
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'
import 'vue3-toastify/dist/index.css'
import { toast } from 'vue3-toastify'
import { Modal } from 'flowbite'

import { useGetColabStore } from '@/stores/getColabStore'
import { useDelColabStore } from '@/stores/delColabStore'
const colabStore = useGetColabStore()
const delColabStore = useDelColabStore()

const colabs = ref([])

//dados do demandante
import { demandantes } from '@/stores/demandantes.js'
const admin = ref(demandantes.admin)

onMounted(async () => {
    await colabStore.getColabs()
    colabs.value = colabStore.colabs.value
})

const searchValue = ref("")
const headersBase = [
    // { text: "Remover", value: "operation" },
    { text: "Profissional", value: "colab", sortable: true, width: 200 },
    { text: "PPU", value: "ppu", sortable: true },
    { text: "Serviço", value: "servico", sortable: true },
    { text: "Função", value: "funcao", sortable: true },
    { text: "Lideranças", value: "liderancas", sortable: true },
    { text: "Gerência", value: "gerencia", sortable: true },
    // { text: "Demandante", value: "demandante", sortable: true },
]

const header = computed(() => {
    return admin.value
        ? [{ text: "Remover", value: "operation" }, ...headersBase, { text: "Demandante", value: "demandante", sortable: true, width: 100 }]
        : headersBase
})

const itemsSelected = ref([])
const colabName = ref("")
const colabId = ref("")

function deleteItem() {
    delColabStore.delColabs(colabId.value)
}

function openModal(colab) {
    const modal = new Modal(document.getElementById("sub-modal-colabs-del"));
    modal.show();
    colabName.value = colab.colab
    colabId.value = colab.id
}

function closeModal() {
    const modal = new Modal(document.getElementById("sub-modal-colabs-del"));
    modal.hide();
}

</script>

<style lang="scss" scoped>
.page {
    min-height: 105%;
}

#svg {
    width: 40px;
    margin-right: 20px;
    color: orange;
}

.operation-wrapper .operation-icon {
    width: 20px;
    cursor: pointer;
}
</style>