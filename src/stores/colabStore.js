import { defineStore } from 'pinia'
import { computed, reactive, ref } from "vue"
import axios from 'axios'

export const useColabStore = defineStore('colabs', () => {

    let chkColabs = ref([])
    let colab = ref([])

    let loadColabs = computed(() => {
        axios.get("https://api.nucleoengenharia.com.br:8000/colab").then(res => {
            colab.value = res.data

            /*             if (admin) {
                            colabcUser.value = colab.value
                        } else {
                            colabcUser.value = colab.value.filter(colab => colab.demandante === this.userEmail)
                        } */

        }).catch("Erro")
        console.log("store-chkColabs: "+chkColabs.value)
    })

    // const addProduct = () => { } // method = action

    return {
        colab,
        loadColabs,
        chkColabs,
        // colabItems,
        // listagem,
        // addProduct
    }
/**************************************************************** */
    /*     const colabItems = reactive({
        colab: [
            {
                id: 1,
                name: "Colaborador 1",
                email: "colaborador1@email.com",
            }
        ]
    })// ref = state */

    // let lista = ref([])
    // let listaColabs = ref([])

    /*     const listagem = computed(() => {

            lista.value = []
            chkVModel.value.map((store) => {
                lista.value.push(store.label)
            })
            listaColabs.value = lista.value

            return listaColabs.value

        }); // computed = getter */

    // let colabcUser = ref([])
})
