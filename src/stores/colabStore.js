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
    ]); // ref = state

    // const totalPrice = computed(); // computed = getter

    // const addProduct = () => { } // method = action

    return {
        colab,
        // totalPrice,
        // addProduct
    }
})
