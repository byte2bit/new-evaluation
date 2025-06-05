import { defineStore } from 'pinia'
import { ref } from "vue"
import axios from 'axios'

export const useColabStore = defineStore('colabs', () => {
    const chkColabs = ref([])
    const colabs = ref([])

    const loadColabs = async () => {
        try {
            const res = await axios.get("https://api.nucleoengenharia.com.br:8000/colab")
            colabs.value = res.data
        } catch (e) {
            console.error("Erro ao carregar colaboradores", e)
        }
    }


    return {
        colabs,
        loadColabs,
        chkColabs
    }
})
