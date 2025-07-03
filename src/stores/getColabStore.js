import { defineStore } from 'pinia'
import { ref, reactive } from "vue"
import axios from 'axios'
import "@/plugins/axios"
import { demandantes } from '@/stores/demandantes.js'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const useGetColabStore = defineStore('getColabStore', () => {
    const chkColabs = ref([])
    const colabs = ref([])
    const isLoading = ref(false)

    // Carrega colaboradores da API
    const getColabs = async () => {
        isLoading.value = true
        try {
            const res = await axios.get("/colab")
            colabs.value = res.data
        } catch (e) {
            console.error("Erro ao carregar colaboradores", e)
        } finally {
            isLoading.value = false
        }
    }
    return {
        chkColabs,
        getColabs,
        colabs,
        isLoading,
    }
})
