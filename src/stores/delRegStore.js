import { defineStore } from 'pinia'
import { ref } from "vue"
import axios from 'axios'
import "@/plugins/axios"
import { toast } from "vue3-toastify"

export const useDelRegStore = defineStore('delRegStore', () => {
    const regs = ref([])

    function notify() {
        toast.success("Registro removido.", {
            autoClose: 1000,
            theme: "colored",
        });
    }

    const delRegs = async(a) => {
        axios
            .delete(`registros/${a}`)
            .then(() => {
                notify();
            })
            .catch(() => toast.error("Erro ao remover registro"));
    }

    return {
        delRegs,
        regs,
    }
})
