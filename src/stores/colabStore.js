import { defineStore } from 'pinia'
import { ref, reactive } from "vue"
import axios from 'axios'

let selectedCheckBoxes = reactive(new Set())

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

    /* Composable CheckBoxes Selecionados */
    let selectAll = (allCheckBoxes) => {
        allCheckBoxes.forEach(checkBox => {
            selectedCheckBoxes.add(checkBox)
        })
    }

    let clear = () => {
        selectedCheckBoxes.clear()
    }

    let toggle = function (checkBox) {
        if (selectedCheckBoxes.has(checkBox)) {
            selectedCheckBoxes.delete(checkBox)
        } else {
            selectedCheckBoxes.add(checkBox)
        }
    }

    return {
        colabs,
        loadColabs,
        chkColabs,
        selectedCheckBoxes,
        selectAll,
        clear,
        toggle
    }
})
