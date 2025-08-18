<template>
  <div class="w-full pe-6 ps-3 page">
    <div class="flex justify-between items-center">
      <h2 class="my-5 font-bold text-2xl">Registros de avaliação:</h2>
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

    <div class="bg-zinc-200 p-2 rounded ps-3 sm:block md:flex justify-between items-center">
      <div class="md:flex items-center w-full">
        <div class="md:w-1/4">
          <span class="md:me-2 sm:mb-2">
            <b>Filtrar: </b>
          </span>
          <input class="md:w-3/4" type="text" v-model="searchValue" />
        </div>

        <p class="flex items-center justify-start gap-1.5 sm:m-3 md:m-auto md:mx-3 font-bold text-2xl">
          <svg class="ms-1 h-4 w-4 fill-green-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
          </svg>
          <span>
            &nbsp;É possível filtrar por qualquer item ou palavra que esteja na tabela, inteira ou parte. Exemplo:
            nome do colaborador, demandante, data, notas, etc.
          </span>
        </p>

      </div>
      <Excel />
    </div>

    <EasyDataTable 
      show-index 
      id="tabela" 
      :fixed-header="true" 
      :headers="header" 
      :items="getRegStore.regs"
      :buttons-pagination="true" 
      :hide-rows-per-page="true" 
      :search-value="searchValue"
      :current-page="getRegStore.page"
      :server-items-length="getRegStore.total"
      rowsPerPageMessage="linhas por página:" 
      rowsOfPageSeparatorMessage="de"
      emptyMessage="Aguarde..." 
      @update-page-items:current-page="getRegStore.setPage"
      alternating>
      <!--
        :pagination-options="paginationOptions"
        @page-change="fetchData"
      :header-item-class-name="headerItemClassNameFunction"
      :body-row-class-name="bodyRowClassNameFunction"
      :rows-per-page="getRegStore.limit"
      -->
      <template #loading>
        <img src="@/assets/spinner.gif" alt="Carregando..." style="width: 100px; height: 80px;" />
      </template>
      <template #item-operation="registro">
        <div class="operation-wrapper">
          <img src="@/assets/delete.png" class="operation-icon" @click="openModal(registro)" />
        </div>
      </template>
    </EasyDataTable>

    <!-- MODAL -->
    <teleport to="body">
      <!-- Main modal -->
      <div id="sub-modal-reg-del" tabindex="-1" aria-hidden="false"
        class="hidden fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative w-full max-w-xl max-h-full">
          <!-- Modal content -->
          <div class="relative bg-white rounded-lg shadow-sm">
            <!-- Modal header -->
            <div class="flex items-center justify-start p-4 md:p-5 border-b rounded-t border-gray-200 bg-gray-200">
              <img id="svg" src="@/assets/triangule.svg" alt="" />

              <h1 class="font-bold text-xl">Remover Avaliação</h1>
            </div>
            <!-- Modal body -->
            <div class="p-4 md:p-5 space-y-4">
              Remover avaliação de: <b>{{ registro }}</b> ?
            </div>
            <!-- Modal footer -->
            <div class="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b">

              <button data-modal-hide="sub-modal-reg-del" type="button"
                class="block text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg font-bold text-sm px-5 py-2.5 text-center"
                @click="deleteItem">Remover</button>
              <button data-modal-hide="sub-modal-reg-del" type="button"
                class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                @click="closeModal">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </teleport>
    <!-- FINAL MODAL -->
     <p>Total registros: {{ getRegStore.total }}</p>
     
  </div>
</template>
 
<script setup>
import { ref, onMounted, computed } from 'vue';
import EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
import "vue3-toastify/dist/index.css";
import { Modal } from 'flowbite'
import Excel from "./Excel.vue"

//stores
import { storeToRefs } from 'pinia'
import { useGetRegStore } from '@/stores/getRegStore.js'
import { useDelRegStore } from '@/stores/delRegStore.js'
const getRegStore = useGetRegStore()
const delRegStore = useDelRegStore()

//dados do demandante
import { demandantes } from '@/stores/demandantes.js'
const admin = ref(demandantes.admin)

onMounted(async () => {
  await getRegStore.getRegs(getRegStore.page, getRegStore.limit)
})

/* let paginationOptions = {
  currentPage: 1,
  rowsPerPage: 10,
  totalRows: 0,
} */

/* const bodyRowClassNameFunction = (item) => {
  if (item.score < 60) return 'fail-row';
  return 'pass-row';
};

const headerItemClassNameFunction = (header) => {
  if (header.value === 'score') return 'score-column';
  return '';
}; */

const searchValue = ref("");
const colabcUser = ref([]);
const registro = ref("");
const lReg = ref({});
const regId = ref("");
const headersBase = [
  { text: "Remover", value: "operation" },
  { text: "Profissional", value: "colab", sortable: true, width: 200 },
  { text: "Data Aval.", value: "created_at", sortable: true },
  { text: "Avaliação", value: "avaliacao", sortable: true },
  { text: "Nível", value: "nivel", sortable: true },
  { text: "Desc (%)", value: "desconto", sortable: true },
  { text: "Nota Qld", value: "nota_qualidade", sortable: true },
  { text: "Obs Qld", value: "obs_qualidade", sortable: true },
  { text: "Nota Prazo", value: "nota_prazo", sortable: true },
  { text: "Obs. Prazo", value: "obs_prazo", sortable: true },
  { text: "Nota Disp.", value: "nota_dispon", sortable: true },
  { text: "Obs. Disp.", value: "obs_dispon", sortable: true },
  { text: "Nota Rsp.", value: "nota_respon", sortable: true },
  { text: "Obs. Rsp.", value: "obs_respon", sortable: true },
  { text: "Itens Qld", value: "itensQualidade", sortable: true },
  { text: "Itens Disp.", value: "itensDispon", sortable: true },
  // { text: "Liderança", value: "liderancas", sortable: true },
  // { text: "Demandante", value: "demandante", sortable: true, width: 100 },
]

const header = computed(() => {
  return admin.value
    ? [...headersBase, { text: "Liderança", value: "liderancas", sortable: true }, { text: "Demandante", value: "demandante", sortable: true, width: 100 }]
    : headersBase
})

function openModal(registroItem) {
  const modal = new Modal(document.getElementById("sub-modal-reg-del"));
  modal.show();
  lReg.value = { ...registroItem };
  registro.value = lReg.value.colab;
  regId.value = lReg.value.id;
}

function closeModal() {
  const modal = new Modal(document.getElementById("sub-modal-reg-del"));
  modal.hide();
}

onMounted(() => {
  colabcUser.value = getRegStore.regs
})

function deleteItem() {
  delRegStore.delRegs(regId.value)
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

.operation-icon {
  width: 20px;
  cursor: pointer;
}

p {
  color: green;
}
</style>
