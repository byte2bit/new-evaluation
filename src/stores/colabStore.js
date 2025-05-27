import { defineStore } from 'pinia'
import { computed, ref } from "vue"
import axios from 'axios'

export const useColabStore = defineStore('colabs', () => {

    let chkColabs = ref([])
    let colab = ref([])

    let loadColabs = async ()  => {
        try {
            await axios.get("https://api.nucleoengenharia.com.br:8000/colab").then(res => {
                colab.value = res.data
            })
        } catch (e) {
            console.error("Erro ao carregar colaboradores", e);
        }
    }

    return {
        colab,
        loadColabs,
        chkColabs,
    }
})
