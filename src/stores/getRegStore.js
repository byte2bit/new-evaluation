import { defineStore } from 'pinia'
import { ref, computed } from "vue"
import axios from 'axios'
import "@/plugins/axios"

export const useGetRegStore = defineStore('getRegStore', () => {
    const regs = ref([])
    const limit = ref(25)
    const page = ref(1)
    const totalPages = computed(() => Math.ceil(regs.value.length / limit.value))
    const totalRegs = computed(() => regs.value.length)

    // Carrega todos os registros da API
    const getRegs = async () => {
        try {
            const res = await axios.get("/registros")
            regs.value = res.data
        } catch (e) {
            console.error("Erro ao carregar os registros", e)
        }
    }

    // Computed para os registros da página atual
    const pagedRegs = computed(() => {
        const start = (page.value - 1) * limit.value
        const end = start + limit.value
        return regs.value.slice(start, end)
    })

    // Troca de página
    function setPage(newPage) {
        page.value = newPage
    }

    return {
        getRegs,
        regs,
        pagedRegs,
        limit,
        page,
        setPage,
        totalRegs,
    }
})
