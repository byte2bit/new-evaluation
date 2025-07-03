import { defineStore } from 'pinia'
import { ref, reactive } from "vue"
import axios from 'axios'
import "@/plugins/axios"

import { demandantes } from '@/stores/demandantes.js'
const admin = ref(demandantes.admin)
const email = ref(demandantes.email)

// import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const useGetCheckStore = defineStore('getCheckStore', () => {
    const chkColabs = ref([])
    const colabs = ref([])
    const isLoading = ref(false)

    // Carrega colaboradores da API
    const getColabs = async () => {
        isLoading.value = true
        try {
            const res = await axios.get("/colab")
                if (admin.value) {
                    colabs.value = res.data
                } else {
                    colabs.value = res.data.filter(
                        (registro) => registro.demandante === email.value
                    )
                }
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
