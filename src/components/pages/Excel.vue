<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
// import exportFromJSON from "export-from-json"
import { excelParser } from "../utils/excel-parser"
import { demandantes } from '@/stores/demandantes.js'

const admin = demandantes.admin
const colabcUser = ref([])
const listData = ref([])

function loadRegs() {
    axios.get("registros")
        .then(res => {
            listData.value = res.data

            colabcUser.value = listData.value.filter(registro => registro.demandante === demandantes.email)

            // Formata a data
            listData.value.forEach(registro => {
                let a = registro.created_at.split("T")[0]
                let d = a.split("-")
                let dat = d[2] + "/" + d[1] + "/" + d[0]
                registro.created_at = dat
            })
        })
        .catch(() => console.error("Erro"))
}

function exportData() {
    excelParser().exportDataFromJSON(listData.value, null, null)
}

onMounted(() => {
    loadRegs()
})
</script>

<template>
    <div v-if="admin" id="exportar">
        <button
            class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm p-2 text-center cursor-pointer"
            @click="exportData">Exportar XLS</button>
    </div>
</template>

<style lang="scss" scoped>
button {
    width: 100px;
}
</style>