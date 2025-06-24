import { defineStore } from 'pinia'
import { ref, reactive } from "vue"
import axios from 'axios'

import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const useColabStore = defineStore('colabs', () => {
    const chkColabs = ref([])
    const colabs = ref([])
    const isLoading = ref(false)

    // Carrega colaboradores da API
    const loadColabs = async () => {
        isLoading.value = true
        try {
            const res = await axios.get("https://api.nucleoengenharia.com.br:8000/colab")
            colabs.value = res.data
        } catch (e) {
            console.error("Erro ao carregar colaboradores", e)
        } finally {
            isLoading.value = false
        }
    }

    // Envia dados


    return {
        chkColabs,
        loadColabs,
        colabs,
        isLoading,
    }
})

export const usePostColabStore = defineStore('postColab', () => {

    const submitState = reactive({
        isLoading: false,
        error: null,
        success: false
    })

    function validatePostData() {
        const errors = []

        if (!chkColabs.value || chkColabs.value.length === 0) {
            errors.push('Selecione pelo menos um colaborador')
        }

        if (postData.nota_qualidade <= 3 && iQualidade.value.length === 0) {
            errors.push('Marque os itens de qualidade não atendidos')
        }

        if (postData.nota_dispon <= 3 && iDispon.value.length === 0) {
            errors.push('Marque os itens de disponibilidade não atendidos')
        }

        return errors
    }

    const saveColabs = async (dados) => {
        console.log("dados saveColabs: "+JSON.stringify(dados))
 /*        submitState.isLoading = true
        submitState.error = null

        try {
            const validationErrors = validatePostData()
            if (validationErrors.length > 0) {
                throw new Error(validationErrors.join(', '))
            }

            await axios.all([
                axios.post("registros", dados),
                axios.post("mail", dados)
            ])

            submitState.success = true
            reset()
        } catch (error) {
            submitState.error = error.message
            toast.error(error.message, { theme: 'colored' })
            console.error('Save error:', error)
        } finally {
            submitState.isLoading = false
        } */
    }
    return {
        submitState,
        saveColabs,
    }

})
