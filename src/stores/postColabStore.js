import { defineStore } from 'pinia'
import { ref, reactive } from "vue"
import axios from 'axios'
import "@/plugins/axios"
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const usePostColabStore = defineStore('postColabStore', () => {

    const submitState = reactive({
        isLoading: false,
        error: null,
        success: false
    })

    const saveColabs = async (dados) => {
        submitState.isLoading = true
        submitState.error = null

        try {
            // console.log("dados saveColabs: " + JSON.stringify(dados))
            var colab = {
                "colab": dados.colab,
                "matricula": dados.matricula,
                "ppu": dados.ppu,
                "servico": dados.servico,
                "funcao": dados.funcao,
                "liderancas": dados.liderancas,
                "gerencia": dados.gerencia,
                "demandante": dados.demandante,
            }
            axios.post("colab", colab),
                toast.success('Colaborador registrado com sucesso!', {
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                })
            submitState.success = true
            // reset()
        } catch (error) {
            submitState.error = error.message
            toast.error('Desculpe, houve um erro no envio dos dados. \nInforme o administrador do sistema >> ' + error.message, {
                position: 'top-center',
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            })
            console.error('Save error:', error)
        } finally {
            submitState.isLoading = false
        }
    }
    return {
        submitState,
        saveColabs,
    }

})

