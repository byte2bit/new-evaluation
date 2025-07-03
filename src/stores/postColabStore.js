import { defineStore } from 'pinia'
import { ref, reactive } from "vue"
import axios from 'axios'
import "@/plugins/axios"
import { demandantes } from '@/stores/demandantes.js'
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

            var regMail = {}
            var c = []
            dados.colab.forEach(colab => {
                c.push(colab.colab)
                regMail = {
                    "colab": c,
                    "desconto": dados.desconto,
                    "nivel": dados.nivel,
                    "avaliacao": dados.avaliacao,
                    "nota_qualidade": dados.nota_qualidade,
                    "obs_qualidade": dados.obs_qualidade,
                    "nota_prazo": dados.nota_prazo,
                    "obs_prazo": dados.obs_prazo,
                    "nota_dispon": dados.nota_dispon,
                    "obs_dispon": dados.obs_dispon,
                    "nota_respon": dados.nota_respon,
                    "obs_respon": dados.obs_respon,
                    "demandante": demandantes.nome,
                    "itensQualidade": dados.itensQualidade,
                    "itensDispon": dados.itensDispon
                }
            })
             await axios.all([
                 axios.post("mail2", regMail),
                 dados.colab.forEach(colab => {
                     var reg = {
                         "colab": colab.colab,
                         "desconto": dados.desconto,
                         "nivel": dados.nivel,
                         "avaliacao": dados.avaliacao,
                         "nota_qualidade": dados.nota_qualidade,
                         "obs_qualidade": dados.obs_qualidade,
                         "nota_prazo": dados.nota_prazo,
                         "obs_prazo": dados.obs_prazo,
                         "nota_dispon": dados.nota_dispon,
                         "obs_dispon": dados.obs_dispon,
                         "nota_respon": dados.nota_respon,
                         "obs_respon": dados.obs_respon,
                         "demandante": demandantes.nome,
                         "liderancas": colab.liderancas,
                         "itensQualidade": dados.itensQualidade,
                         "itensDispon": dados.itensDispon
                     }
                     axios.post("registros", reg)
                    //  console.log(reg)
                 })
             ])
            // console.log("regMail: ", regMail)

            toast.success('Avaliação realizada com sucesso!', {
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

