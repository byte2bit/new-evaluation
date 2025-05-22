import { defineStore } from 'pinia'
import { computed, ref } from "vue";

export const useColabStore = defineStore('colabs', () => {
    const colabItems = ref([
        {
            label: "Marineusa",
            value: "Marineusa",
            liderancas: "Maria",
            demandante: "João"
        },
        {
            label: "Vladimiro",
            value: "Vladimiro",
            liderancas: "Maria",
            demandante: "João"
        }
    ])// ref = state

    let lista = ref([])
    let listaColabs = ref([])

    const listagem = computed(() => {

        lista.value = []
        chkVModel.value.map((store) => {
            lista.value.push(store.label)
        })
        listaColabs.value = lista.value

        return listaColabs.value

    }); // computed = getter

    // const addProduct = () => { } // method = action

    return {
        colabItems,
        listagem,
        // addProduct
    }
})
