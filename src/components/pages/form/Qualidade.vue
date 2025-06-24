<template>
    <div class="flex flex-col w-full md:w-1/4 p-4 bg-zinc-200 rounded-md">
        <div class="star-title">
            <p>Como você avalia a qualidade do Serviço
                Prestado?</p>
        </div>
        <div>
            <star-rating 
            v-model:rating="chkQualidade" 
            :increment="0.5" 
            active-border-color="#1a00ab"
            active-color="#1a00ab" 
            :star-size="25" 
            data-modal-show="sub-modal" 
            data-modal-target="sub-modal" 
            />
            <div class="my-3 flex flex-col">
                <label for="obs_qualidade">Observações:</label>
                <textarea v-sanitize="text" id="obs_qualidade" rows="3" v-model="obsQualidade"></textarea>
            </div>
        </div>

        <teleport to="body">
            <!-- Main modal -->
            <div id="sub-modal" tabindex="-1"
                class="hidden fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div class="relative w-full max-w-xl max-h-full">
                    <!-- Modal content -->
                    <div class="relative bg-white rounded-lg shadow-sm">
                        <!-- Modal header -->
                        <div
                            class="flex items-center justify-center p-4 md:p-5 border-b rounded-t border-gray-200 bg-gray-300">
                            <h3 class="text-xl font-semibold text-gray-900">
                                <div class="px-3 px-sm-5 text-center">
                                    <h3 class="font-bold mb-2">Qualidade de serviço:</h3>
                                    <h4 class="font-bold">Marque os itens que não foram atendidos</h4>
                                    <p>(obrigatório caso a nota seja menor ou igual 3)</p>
                                </div>
                            </h3>
                        </div>
                        <!-- Modal body -->
                        <div class="p-4 md:p-5 space-y-4">
                            <div class="flex flex-col">
                                <div class="form-check d-flex align-items-start mt-3" 
                                v-for="option in optQualidade"
                                    :key="option.id">
                                    <input type="checkbox" :value="option.name" :id="`check-dispon-${option.id}`"
                                        v-model="iQualidade" />
                                    <label :for="`check-dispon-${option.id}`">{{ option.name }}</label>
                                </div>
                            </div>
                        </div>

                        <!-- Modal footer -->
                        <div class="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b">
                            <button data-modal-hide="sub-modal" type="button"
                                class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                                @click="tryCloseModal"
                                >OK</button>
                            <div v-if="showError" class="text-red-600 mt-2">Selecione pelo menos um item!</div>
                        </div>
                    </div>
                </div>
            </div>
        </teleport>

    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import StarRating from 'vue-star-rating'
import { Modal } from 'flowbite'


const optQualidade = defineModel('optQualidade')
const chkQualidade = defineModel('chkQualidade')
const obsQualidade = defineModel('obsQualidade')
const iQualidade = defineModel('iQualidade')
const text = ref("")
var showError = ref(false)
// const showSubModal = ref(false)

// Abre ou fecha o modal automaticamente ao mudar a nota
/* watch(() => chkQualidade.nota_qualidade, (newVal) => {
    if (newVal <= 3) {
        var modal = new Modal(document.getElementById('sub-modal'))
        modal.show()
    } else {
        // modal.hide()
        iQualidade.value = []
        return
    }
}) */

var nota = ref(0)

/* const showSubModal = computed ((e) => {
    nota.value = e.target.value
}) */

watch(() => chkQualidade.value, (newVal) => {
    if (newVal <= 3) {
        var modalsub = new Modal(document.getElementById('sub-modal'))
        modalsub.show()
    } else {
        iQualidade.value = []
        return
    }
})

const hideSubModal = () => {
    var modal = new Modal(document.getElementById('sub-modal'))
    modal.hide()
}

// console.log("chkQualidade Qualidade: " + JSON.stringify(chkQualidade.value))

const tryCloseModal = computed(() => {
    if (chkQualidade.value <= 3 && iQualidade.value.length === 0) {
        showError.value = true
    } else {
        showError.value = false
        var modal = new Modal(document.getElementById('sub-modal'))
        modal.hide()
    }
})

</script>

<style lang="scss" scoped>

</style>