import { defineStore } from 'pinia'
import { ref } from "vue"
import axios from 'axios'
import "@/plugins/axios"
import { toast } from "vue3-toastify"

export const useDelColabStore = defineStore('delColabStore', () => {
    const colabs = ref([])

    function notify() {
        toast.success("Colaborador removido.", {
            autoClose: 1000,
            theme: "colored",
        });
    }

    const delColabs = async(a) => {
        axios
            .delete(`colab/${a}`)
            .then(() => {
                notify();
            })
            .catch(() => toast.error("Erro ao remover colaborador"));
    }

    return {
        delColabs,
        colabs,
    }
})
