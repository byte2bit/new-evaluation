import { defineStore } from 'pinia'
import { ref } from "vue"
import axios from 'axios'
import "@/plugins/axios"

import { demandantes } from '@/stores/demandantes.js'
const admin = ref(demandantes.admin)
const email = ref(demandantes.email)

export const useGetRegStore = defineStore('getRegStore', () => {
    const regs = ref([])
    const limit = ref(25)
    const page = ref(1)
    const total = ref(0)

    // Carrega registros da API com paginação
 /*    const getRegs = async (newPage = 1, newLimit = limit.value) => {
        try {
            const res = await axios.get(`/registros2`)
            let items = admin.value ? res.data : res.data.filter(
                (registro) => registro.demandante === email.value
            )
            regs.value = items
            // regs.value = items.slice((newPage - 1) * newLimit, newPage * newLimit)
            total.value = res.data.total
            page.value = newPage
            limit.value = newLimit

            regs.value.forEach((registro) => {
                let a = registro.created_at.split("T")[0];
                let d = a.split("-");
                let dat = d[2] + "/" + d[1] + "/" + d[0];
                registro.created_at = dat;
            })
        } catch (e) {
            console.error("Erro ao carregar os registros", e)
        }
    } */
    const getRegs = async () => {
        try {
            const res = await axios.get(`/registros2/?page=3&limit=2`)
            let items = admin.value ? res.data : res.data.filter(
                (registro) => registro.demandante === email.value
            )
            regs.value = items
            // regs.value = items.slice((newPage - 1) * newLimit, newPage * newLimit)
            total.value = res.data.total
            // page.value = newPage
            // limit.value = newLimit

            regs.value.forEach((registro) => {
                let a = registro.created_at.split("T")[0];
                let d = a.split("-");
                let dat = d[2] + "/" + d[1] + "/" + d[0];
                registro.created_at = dat;
            })
            console.log("regs.value: " + JSON.stringify(regs.value))
        } catch (e) {
            console.error("Erro ao carregar os registros", e)
        }
    }

    // Troca de página: chama getRegs com a nova página.
    function setPage(newPage) {
        getRegs(Number(newPage), limit.value)
    }

    return {
        getRegs,
        setPage,
        regs,
        limit,
        page,
        total,
    }
})
