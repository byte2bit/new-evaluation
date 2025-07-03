import { defineStore } from 'pinia'
import { ref, computed } from "vue"
import axios from 'axios'
import "@/plugins/axios"

import { demandantes } from '@/stores/demandantes.js'
const admin = ref(demandantes.admin)
const email = ref(demandantes.email)

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
            if (admin.value) {
                regs.value = res.data
            } else {
                regs.value = res.data.filter(
                    (registro) => registro.demandante === email.value
                )
            }

        } catch (e) {
            console.error("Erro ao carregar os registros", e)
        }
        // converte data
        regs.value.forEach((registro) => {
            let a = registro.created_at.split("T")[0];
            let d = a.split("-");
            let dat = d[2] + "/" + d[1] + "/" + d[0];
            registro.created_at = dat;
        })
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
        setPage,
        regs,
        pagedRegs,
        limit,
        page,
        totalRegs,
    }
})
