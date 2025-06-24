<script setup>
import Respon from './form/Respon.vue'
import Dispon from './form/Dispon.vue'
import Qualidade from './form/Qualidade.vue'
import Prazo from './form/Prazo.vue'

import ChecksModal from '../utils/ChecksModal.vue'
import { ref, reactive, computed, onMounted } from 'vue'

import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import "vue3-select-component/dist/style.css"

// import { dados } from '@/js/store.js'

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';


// Importando o store de colaboradores
import { useColabStore } from '@/stores/colabStore'
import { usePostColabStore } from '../../stores/colabStore'
import { storeToRefs } from 'pinia'

const { chkColabs } = storeToRefs(useColabStore)
const colabStore = useColabStore()
const postStore = usePostColabStore()

// const { submitState } = storeToRefs(usePostColabStore)
// const saveColabs = usePostColabStore()

var iQualidade = ref([])
var iDispon = ref([])
var isLoading = ref(false)
var fullPage = ref(true)

const postData = reactive({
    desconto: "",
    nivel: "",
    avaliacao: "",
    nota_qualidade: 5,
    obs_qualidade: "",
    nota_prazo: 5,
    obs_prazo: "",
    nota_dispon: 5,
    obs_dispon: "",
    nota_respon: 5,
    obs_respon: "",
    colab: '',
    demandante: '',
    itensQualidade: '',
    itensDispon: '',
    liderancas: '',
})

const optQualidade = ref([
    { name: "Comportamento/Atitude: O profissional não demonstra comportamento adequado ou atitude positiva no atendimento.", id: 1 },
    { name: "Forma de comunicação (Verbal/escrita, cordialidade): Falhas na comunicação, falta de cordialidade ou erros na comunicação escrita. ", id: 2 },
    { name: "Habilidade no uso de sistemas informatizados e soluções tecnológicas no suporte: Dificuldades ou falhas no uso de sistemas e tecnologias. ", id: 3 },
    { name: "Apoio a reuniões e eventos: Falta de suporte adequado ou problemas durante reuniões e eventos. ", id: 4 },
    { name: "Atendimento a demandas: Demora ou falhas no atendimento das solicitações.", id: 5 },
    { name: "Falta de conhecimentos básicos para as tarefas: Falta de domínio sobre as tarefas básicas relacionadas ao posto de serviço.", id: 6 },
    { name: "Insuficiência de conhecimento, especialização ou experiência técnica necessária para o posto de serviço: Falta de conhecimento técnico, especialização ou experiência necessária.", id: 7 },
])

const optDispon = ref([
    { name: "Posto indisponível por um dia ou mais.", id: 1 },
    { name: "Frequência de atraso, indisponível no horário administrativo.", id: 2 },
    { name: "O posto de Serviço estava indisponível em horário previsto para compromisso agendado da gerência.", id: 3 },
])

function notify() {
    toast.success("Aguarde, enviando dados...", {
        autoClose: 3000,
        theme: 'colored',
    })
}

function notifyProf() {
    toast.warning("Selecione um profissional", {
        autoClose: 1000,
        theme: 'colored',
    })
}

const avaliacao = computed(() => {
    return (Number(postData.nota_qualidade) +
        Number(postData.nota_prazo) +
        Number(postData.nota_dispon) +
        Number(postData.nota_respon)) / 4
})

const pontos = computed(() => {
    const x = avaliacao.value
    if (x <= 5 && x >= 4.5) return 0
    if (x <= 4.4 && x >= 4) return 1
    if (x <= 3.9 && x >= 3.5) return 5
    if (x <= 3.4 && x >= 2.5) return 7
    if (x <= 2.4 && x >= 1) return 10
    return 0
})
const nivel = computed(() => {
    const p = pontos.value
    if (p === 0) return "A"
    if (p === 1) return "B"
    if (p === 5) return "C"
    if (p === 7) return "D"
    if (p === 10) return "E"
    return ""
})

const desc = computed(() => {
    const p = pontos.value

    if (p === 0) return "0%"
    if (p === 1) return "1%"
    if (p === 5) return "2%"
    if (p === 7) return "3%"
    if (p === 10) return "5%"
    return ""
})
/* 
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
} */

const save = () => {
    postStore.saveColabs({
        desconto: desc.value,
        nivel: nivel.value,
        avaliacao: avaliacao.value,
        nota_qualidade: postData.nota_qualidade,
        obs_qualidade: postData.obs_qualidade,
        nota_prazo: postData.nota_prazo,
        obs_prazo: postData.obs_prazo,
        nota_dispon: postData.nota_dispon,
        obs_dispon: postData.obs_dispon,
        nota_respon: postData.nota_respon,
        obs_respon: postData.obs_respon,
        colab: colabStore.chkColabs,
        itensQualidade: iQualidade.value.join(" | "),
        itensDispon: iDispon.value.join(" | "),
    }) 
}

function reset() {
    Object.assign(postData, {
        desconto: "",
        nivel: "",
        avaliacao: "",
        nota_qualidade: 5,
        obs_qualidade: "",
        nota_prazo: 5,
        obs_prazo: "",
        nota_dispon: 5,
        obs_dispon: "",
        nota_respon: 5,
        obs_respon: "",
        colab: '',
        demandante: '',
        iQualidade: [],
        iDispon: [],
        liderancas: '',
    })

    iQualidade.value = []
    iDispon.value = []
    chkColabs.value = []
}
onMounted(async () => {
    await colabStore.loadColabs()
    // initModals()
})

</script>

<template>
    <div class="row p-4">

        <main class="main px-4">
            <div class="flex flex-col" id="inf-importante">
                <h4>Informações importantes:</h4>

                <p>A avaliação resultante influenciará a avaliação geral do desempenho do POSTO DE SERVIÇO, podendo
                    afetar a medição total devido à baixa qualidade, performance, produtividade, atrasos ou falhas nos
                    serviços
                    prestados. Baixo desempenho pode resultará em desconto na medição mensal como penalização pelos
                    serviços insatisfatórios, conforme avaliação das áreas clientes.</p>
            </div>
            <form class="form vl-parent" @submit.prevent="save">
                <!-- <form class="form vl-parent" @submit.prevent="save"> -->

                <loading v-model:active="isLoading" :can-cancel="true" :is-full-page="fullPage" />

                <div class="flex md:justify-evenly md:mt-2 bg-gray-300 rounded-md p-3">
                    <div class="inputs">
                        <label for="media">Avaliação Média:</label>
                        <input type="text" id="media" :value="avaliacao" disabled />
                    </div>
                    <div class="inputs">
                        <label for="nivel">Nível de Serviço:</label>
                        <input type="text" id="nivel" :value="nivel" disabled />
                    </div>
                    <div class="inputs">
                        <label for="desconto">Desconto Percentual na Medição:</label>
                        <input type="text" id="desconto" :value="desc" disabled />
                    </div>
                </div>

                <!-- Perguntas com estrelas -->
                <div class="flex gap-x-4 mt-4 sm:gap-y-3 pb-4">
                    <Qualidade :postData="postData" @iQualidade="iQualidade" :optQualidade="optQualidade" />
                    <Prazo :postData="postData" />
                    <Dispon :postData="postData" :iDispon="iDispon" :optDispon="optDispon" />
                    <Respon :postData="postData" />
                </div>
                <!-- Final Perguntas com estrelas -->

                <div class="border-top mt-auto pb-3 flex justify-between items-center">

                    <!-- Modal toggle -->
                    <button data-modal-target="large-modal" data-modal-toggle="large-modal"
                        class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-light rounded-lg text-sm px-5 py-2.5 text-center "
                        type="button">
                        Resumo
                    </button>

                    <button id="submit" type="submit"
                        class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-light rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Submeter Avaliação
                    </button>
                </div>

                <ChecksModal id="default-modal">
                    <template #bodyModal>
                        <div class="modal-dados flex">

                            <div class="flex flex-col">

                                <h2 class="mb-4 font-bold">Colaborador(es) selecionado(s): </h2>

                                <div class="flex flex-col flex-wrap md:max-h-150 md:max-w-230 overflow-auto me-12">
                                    <ul class="text-sm" v-for="(colabs, index) in colabStore.chkColabs" :key="index">
                                        <li class="me-4">{{ index + 1 + ' - ' + colabs }}</li>
                                    </ul>
                                </div>
                            </div>

                            <div id="dados">
                                <h2 class="mb-4 font-bold">Dados avaliados: </h2>
                                <table class="table-fixed text-sm text-left rtl:text-right text-gray-500">
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th scope="col" class="px-3 py-1">Item</th>
                                            <th scope="col" class="px-3 py-1">Nota / Avaliação</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                                            <td scope="row" class="px-3 py-1 font-light text-sm text-gray-900">
                                                Avaliação
                                                Média</td>
                                            <td class="px-3 py-1">{{ avaliacao }}</td>
                                        </tr>
                                        <tr class="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                                            <td scope="row" class="px-3 py-1 font-light text-sm text-gray-900">
                                                Nível de
                                                Serviço</td>
                                            <td class="px-3 py-1">{{ nivel }}</td>
                                        </tr>
                                        <tr class="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                                            <td scope="row" class="px-3 py-1 font-light text-sm text-gray-900">
                                                Desconto
                                                Percentual na Medição</td>
                                            <td class="px-3 py-1">{{ desc }}</td>
                                        </tr>
                                        <tr class="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                                            <td scope="row" class="px-3 py-1 font-light text-sm text-gray-900">
                                                Como você
                                                avalia a qualidade do Serviço Prestado?</td>
                                            <td class="px-3 py-1">{{ postData.nota_qualidade }}</td>
                                        </tr>
                                        <tr class="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                                            <td scope="row" class="px-3 py-1 font-light text-sm text-gray-900">
                                                Observações de Qualidade</td>
                                            <td class="px-3 py-1">{{ postData.obs_qualidade }}</td>
                                        </tr>
                                        <tr class="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                                            <td scope="row" class="px-3 py-1 font-light text-sm text-gray-900">
                                                Com relação ao atendimento no prazo das solicitações efetuadas ao Posto
                                                de Serviço, qual seu nível de satisfação?</td>
                                            <td class="px-3 py-1">{{ postData.obs_prazo }}</td>
                                        </tr>
                                        <tr class="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                                            <td scope="row" class="px-3 py-1 font-light text-sm text-gray-900">
                                                Como você avalia a disponibilidade do Posto de Serviço no horário de
                                                serviço?</td>
                                            <td class="px-3 py-1">{{ postData.nota_dispon }}</td>
                                        </tr>
                                        <tr class="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                                            <td scope="row" class="px-3 py-1 font-light text-sm text-gray-900">
                                                Observações de Disponibilidade:</td>
                                            <td class="px-3 py-1">{{ postData.obs_dispon }}</td>
                                        </tr>
                                        <tr class="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                                            <td scope="row" class="px-3 py-1 font-light text-sm text-gray-900">
                                                Com relação a responsabilidade de profissionais atendendo ao posto de
                                                serviço, qual seu nível de satisfação?</td>
                                            <td class="px-3 py-1">{{ postData.nota_respon }}</td>
                                        </tr>
                                        <tr class="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                                            <td scope="row" class="px-3 py-1 font-light text-sm text-gray-900">
                                                Observações de Responsabilidade</td>
                                            <td class="px-3 py-1">{{ postData.obs_respon }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p>iQualidade: {{ iQualidade }}</p>
                            </div>
                        </div>
                    </template>
                </ChecksModal>

            </form>
        </main>
    </div>
</template>


<style lang="scss" scoped>
.modal-dados p,
.modal-dados ul li {
    font-size: 12px;
}

#dados p {
    font-size: 1rem;
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