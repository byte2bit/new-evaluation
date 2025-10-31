<template>
    <div class="flex flex-col w-full md:w-1/4 p-4 bg-zinc-200 rounded-md">
        <div class="star-title">
            <p>Como você avalia a <b>qualidade</b> do Serviço
                Prestado?</p>
        </div>
        <div>
            <star-rating v-model:rating="postData.nota_qualidade" :increment="0.5" active-border-color="#1a00ab" active-color="#1a00ab"
                :star-size="25" />
            <div class="my-3 flex flex-col">
                <label for="obs_qualidade">Observações:</label>
                <textarea v-sanitize id="obs_qualidade" rows="3" v-model="postData.obs_qualidade"></textarea>
            </div>
        </div>

        <teleport to="body">
            <!-- Main modal -->
            <div id="sub-modal-qualidade" tabindex="-1" aria-hidden="false"
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
                                <div class="form-check d-flex align-items-start mt-3" v-for="option in optQualidade"
                                    :key="option.id">
                                    <input type="checkbox" :value="option.name" :id="`check-qualid-${option.id}`"
                                        v-model="iQualidade" />
                                    <label :for="`check-qualid-${option.id}`">{{ option.name }}</label>
                                </div>
                            </div>
                        </div>
                        <!-- Modal footer -->
                        <div class="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b">

                            <div v-if="showError" class="text-red-600 font-semibold mt-2 me-20">Por favor, selecione
                                pelo menos um item.</div>
                            <button data-modal-hide="sub-modal-qualidade" type="button"
                                class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                                @click="closeModalQ">OK</button>

                        </div>
                    </div>
                </div>
            </div>
        </teleport>

    </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import StarRating from 'vue-star-rating'
import { Modal } from 'flowbite'

const props = defineProps({
    optQualidade: { type: Array, required: true },
    postData: { type: Object, required: true }
})

const emit = defineEmits(['update:postData', 'iQualidade'])

const iQualidade = ref([])
const showError = ref(false)
let modalInstance = null

// Cria a instância do modal uma única vez quando o componente é montado
onMounted(() => {
    const modalElement = document.getElementById('sub-modal-qualidade')
    if (modalElement) {
        modalInstance = new Modal(modalElement, { backdrop: 'static' })
    }
})

// Garante que a instância do modal seja limpa ao sair do componente
onBeforeUnmount(() => {
    modalInstance?.hide()
    modalInstance = null
})

watch(() => props.postData.nota_qualidade, (newVal) => {
    if (newVal <= 3) {
        // Apenas mostra o modal que já existe
        modalInstance?.show()
    } else {
        // Se a nota for alta, limpa os itens e emite o valor vazio para o pai
        iQualidade.value = []
        emit('iQualidade', [])
        modalInstance?.hide()
    }
})

const closeModalQ = () => {
    // Validação: se a nota for baixa, pelo menos um item deve ser selecionado
    if (props.postData.nota_qualidade <= 3 && iQualidade.value.length === 0) {
        showError.value = true
        return // Impede o fechamento do modal
    }

    showError.value = false
    emit('iQualidade', iQualidade.value)
    modalInstance?.hide()
}
</script>

<style lang="scss" scoped> 

</style>