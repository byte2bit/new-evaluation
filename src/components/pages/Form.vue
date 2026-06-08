<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

import ListCheckboxes from '../ListCheckboxes.vue'
import Respon from './form/Respon.vue'
import Dispon from './form/Dispon.vue'
import Qualidade from './form/Qualidade.vue'
import Prazo from './form/Prazo.vue'
import TabelaResumoModal from './form/TabelaResumoModal.vue'
import ChecksModal from '@/components/utils/ChecksModal.vue'
import { useAvaliacao } from '@/composables/useAvaliacao'
import { constants } from '@/utils/constants'

import { Modal } from 'flowbite'


import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import "vue3-select-component/dist/style.css"


import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

// Stores
import { useGetCheckStore } from '@/stores/getCheckboxesStore'
import { usePostRegStore } from '@/stores/postRegStore'
import { storeToRefs } from 'pinia'

const colabStore = useGetColabStore()
const postStore = usePostColabStore()
const { chkColabs } = storeToRefs(colabStore)

const isLoading = ref(false)
const fullPage = ref(true)
// const modalRef = ref(null)

let checksModalInstance = null

function openChecksModal() {
    if (colabStore.chkColabs.length === 0) {
        toast.error("Selecione pelo menos um colaborador!", {
            position: 'bottom-left',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        })
        if (checksModalInstance) checksModalInstance.hide()
    } else {
        if (checksModalInstance) checksModalInstance.show()
    }
}

function closeChecksModal() {
    if (checksModalInstance) checksModalInstance.hide()
}

const {
    postData, iQualidade, iDispon, avaliacao, nivel, desc, iQual, iDisp,
    getOptQualidade, getOptDispon, resetAvaliacao
} = useAvaliacao()

const { optQualidade, optDispon } = constants()


const save = async () => {
    isLoading.value = true
    //junta demandantes e liderancas pra enviar pro BD
    const regCompletoLocal = colabStore.colabs.filter(item => colabStore.chkColabs.includes(item.colab));
    const reg = regCompletoLocal.map(item => {
        return {
            colab: item.colab,
            demandante: item.demandante,
            liderancas: item.liderancas
        }
    })

    try {
        await postStore.saveColabs({
            desconto: desc.value?.toString() || "",
            nivel: nivel.value?.toString() || "",
            avaliacao: avaliacao.value?.toString() || "",
            nota_qualidade: postData.nota_qualidade?.toString() || "",
            obs_qualidade: postData.obs_qualidade || "",
            nota_prazo: postData.nota_prazo?.toString() || "",
            obs_prazo: postData.obs_prazo || "",
            nota_dispon: postData.nota_dispon?.toString() || "",
            obs_dispon: postData.obs_dispon || "",
            nota_respon: postData.nota_respon?.toString() || "",
            obs_respon: postData.obs_respon || "",
            colab: reg,
            itensQualidade: iQualidade.value,
            itensDispon: iDispon.value,
        })
        toast.success("Avaliação salva com sucesso!")
    } catch (error) {
        toast.error("Erro ao salvar avaliação.")
    } finally {
        closeChecksModal()
        isLoading.value = false
    }
}

onMounted(async () => {
    checksModalInstance = new Modal(document.getElementById('large-modal'))
    // checksModalInstance = new Modal(modalRef.value.$el.querySelector('#large-modal'))
    await colabStore.getColabs()
})

onUnmounted(() => {
    if (checksModalInstance) {
        checksModalInstance.hide()
        checksModalInstance = null
    }
})

</script>

<template>
    <div class="content">
        <aside class="bg-zinc-200 p-4">
            <h4 class="mb-3">Selecione o(s) colaborador(es) para avaliar:</h4>
            <div id="checks" class="ps-1">
                <ListCheckboxes />
            </div>
        </aside>

        <article>
            <div class="p-4">
                <main class="main px-4">
                    <div class="flex flex-col" id="inf-importante">
                        <h4>Informações importantes:</h4>

                        <p>A avaliação resultante influenciará a avaliação geral do desempenho do POSTO DE SERVIÇO,
                            podendo
                            afetar a medição total devido à baixa qualidade, performance, produtividade, atrasos ou
                            falhas
                            nos
                            serviços
                            prestados. Baixo desempenho pode resultará em desconto na medição mensal como penalização
                            pelos
                            serviços insatisfatórios, conforme avaliação das áreas clientes.</p>
                    </div>

                    <form class="form vl-parent" @submit.prevent="save">
                        <!-- <form class="form vl-parent" @submit.prevent="save"> -->

                        <loading v-model:active="isLoading" :can-cancel="true" :is-full-page="fullPage" />

                        <div class="flex md:justify-evenly md:mt-2 bg-gray-300 rounded-md p-3">
                            <div class="inputs">
                                <div class="flex flex-row items-start gap-2">
                                    <svg class="ms-1 h-4 w-4 fill-black" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512">
                                        <path
                                            d="M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32l288 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-288 0c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                                    </svg>
                                    <label for="media">Avaliação Média:</label>
                                </div>
                                <input type="text" id="media" :value="avaliacao" disabled />
                            </div>
                            <div class="inputs">
                                <div class="flex flex-row items-start gap-2">
                                    <svg class="ms-1 h-4 w-4 fill-black" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 576 512">
                                        <path
                                            d="M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2zM476.9 209.6l53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 277.8C37.4 273.8 32 265.3 32 256s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0l152-70.2zm-152 198.2l152-70.2 53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 405.8C37.4 401.8 32 393.3 32 384s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0z" />
                                    </svg>
                                    <label for="nivel">Nível de Serviço:</label>
                                </div>
                                <input type="text" id="nivel" :value="nivel" disabled />
                            </div>
                            <div class="inputs">
                                <div class="flex flex-row items-start gap-2">
                                    <svg class="ms-1 h-4 w-4 fill-black" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512">
                                        <path
                                            d="M256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM244.7 395.3l-112-112c-4.6-4.6-5.9-11.5-3.5-17.4s8.3-9.9 14.8-9.9l64 0 0-96c0-17.7 14.3-32 32-32l32 0c17.7 0 32 14.3 32 32l0 96 64 0c6.5 0 12.3 3.9 14.8 9.9s1.1 12.9-3.5 17.4l-112 112c-6.2 6.2-16.4 6.2-22.6 0z" />
                                    </svg>
                                    <label for="desconto">Desconto Percentual na Medição:</label>
                                </div>

                                <input type="text" id="desconto" :value="desc" disabled />
                            </div>
                        </div>

                        <!-- Perguntas com estrelas -->
                        <div class="flex gap-x-4 mt-4 sm:gap-y-3 pb-4">
                            <Qualidade :postData="postData" @iQualidade="getOptQualidade"
                                :optQualidade="optQualidade" />
                            <Prazo :postData="postData" />
                            <Dispon :postData="postData" @iDispon="getOptDispon" :optDispon="optDispon" />
                            <Respon :postData="postData" />
                        </div>
                        <!-- Final Perguntas com estrelas -->

                        <div class="border-top mt-auto pb-3 flex justify-end items-center">

                            <!-- Modal toggle -->
                            <button @click="openChecksModal"
                                class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-light rounded-lg text-sm px-5 py-2.5 text-center "
                                type="button">
                                Resumo
                            </button>
                        </div>

                        <ChecksModal @enviar="save" @fechar="closeChecksModal">
                        <!-- <ChecksModal ref="modalRef" @enviar="save" @fechar="closeChecksModal"> -->
                            <template #bodyModal>
                                <div class="modal-dados flex">

                                    <div class="flex flex-col">

                                        <h2 class="mb-4 font-bold">Colaborador(es) selecionado(s): </h2>

                                        <div
                                            class="flex flex-col flex-wrap md:max-h-150 md:max-w-230 overflow-auto me-12">
                                            <ul class="text-sm" v-for="(colabs, index) in colabStore.chkColabs"
                                                :key="index">
                                                <li class="me-4">{{ index + 1 + ' - ' + colabs }}</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <TabelaResumoModal :avaliacao="avaliacao" :nivel="nivel" :desc="desc"
                                        :postData="postData" :iQualidade="iQualidade" :iQual="iQual" :iDispon="iDispon"
                                        :iDisp="iDisp" />
                                </div>
                            </template>
                        </ChecksModal>

                    </form>
                </main>
            </div>
        </article>
    </div>
</template>


<style lang="scss" scoped>
.content {
    min-width: 100vw;
    display: grid;
    grid-template-columns: 300px 1fr;
}

#checks {
    height: calc(100vh - 170px);
    overflow: auto;
}

aside {
    height: calc(100vh - 110px);
}

.modal-dados p,
.modal-dados ul li {
    font-size: 12px;
}

.main {
    background-color: #fff;
}

h5 {
    font-size: 12px;
    text-align: center;
}

.form {
    height: calc(100vh - 260px);
}


.inputs {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    label {
        margin-bottom: 5px;
    }
}
</style>