<script setup>
import Modal from '../utils/Modal.vue'
import { initModals } from 'flowbite'
import { ref, reactive, computed, onMounted, watch, watchEffect } from 'vue'
import axios from 'axios'
import StarRating from 'vue-star-rating'

import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import "vue3-select-component/dist/style.css"

// import { dados } from '@/js/store.js'

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

// Importando o store de colaboradores
import { useColabStore } from '@/stores/colabStore'
const colabStore = useColabStore()

//colabs selecionados, vindo do store
const chkColabs = colabStore.chkColabs

const iQualidade = ref([])
const iDispon = ref([])
const isLoading = ref(false)
const fullPage = ref(true)

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
    itensQualidade: [],
    itensDispon: [],
    liderancas: '',
})

const options1 = [
    { name: "Comportamento/Atitude: O profissional não demonstra comportamento adequado ou atitude positiva no atendimento.", id: 1 },
    { name: "Forma de comunicação (Verbal/escrita, cordialidade): Falhas na comunicação, falta de cordialidade ou erros na comunicação escrita. ", id: 2 },
    { name: "Habilidade no uso de sistemas informatizados e soluções tecnológicas no suporte: Dificuldades ou falhas no uso de sistemas e tecnologias. ", id: 3 },
    { name: "Apoio a reuniões e eventos: Falta de suporte adequado ou problemas durante reuniões e eventos. ", id: 4 },
    { name: "Atendimento a demandas: Demora ou falhas no atendimento das solicitações.", id: 5 },
    { name: "Falta de conhecimentos básicos para as tarefas: Falta de domínio sobre as tarefas básicas relacionadas ao posto de serviço.", id: 6 },
    { name: "Insuficiência de conhecimento, especialização ou experiência técnica necessária para o posto de serviço: Falta de conhecimento técnico, especialização ou experiência necessária.", id: 7 },
]

const options2 = [
    { name: "Posto indisponível por um dia ou mais.", id: 1 },
    { name: "Frequência de atraso, indisponível no horário administrativo.", id: 2 },
    { name: "O posto de Serviço estava indisponível em horário previsto para compromisso agendado da gerência.", id: 3 },
]

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

const save = async () => {
    submitState.isLoading = true
    submitState.error = null

    try {
        const validationErrors = validatePostData()
        if (validationErrors.length > 0) {
            throw new Error(validationErrors.join(', '))
        }

        await axios.all([
            axios.post("registros", postData),
            axios.post("mail", postData)
        ])

        submitState.success = true
        reset()
    } catch (error) {
        submitState.error = error.message
        console.error('Save error:', error)
    } finally {
        submitState.isLoading = false
    }
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
        itensQualidade: [],
        itensDispon: [],
        liderancas: '',
    })

    iQualidade.value = []
    iDispon.value = []
    chkColabs.value = []
}
onMounted(async () => {
    await colabStore.loadColabs()
    initModals()
})
</script>

<template>
    <div class="row p-4">

        <main class="main px-4">
            <div class="flex flex-col" id="inf-importante">
                <h4>Informações importantes:</h4>
                <!-- <div>{{ store[0].label }}</div> -->
                <p>A avaliação resultante influenciará a avaliação geral do desempenho do POSTO DE SERVIÇO, podendo
                    afetar a medição total devido à baixa qualidade, performance, produtividade, atrasos ou falhas nos
                    serviços
                    prestados. Baixo desempenho pode resultará em desconto na medição mensal como penalização pelos
                    serviços insatisfatórios, conforme avaliação das áreas clientes.</p>
            </div>
            <form class="form vl-parent" @submit.prevent="">
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
                    <div class="flex flex-col w-1/4 p-4 bg-zinc-200 rounded-md">
                        <div class="star-title">
                            <p>Como você avalia a qualidade do Serviço
                                Prestado?</p>
                        </div>
                        <div>
                            <star-rating v-model:rating="postData.nota_qualidade" :increment="0.5"
                                active-border-color="#1a00ab" active-color="#1a00ab" :star-size="25" />
                            <div class="my-3 flex flex-col">
                                <label for="obs_qualidade">Observações:</label>
                                <textarea id="obs_qualidade" rows="3" v-model="postData.obs_qualidade"></textarea>
                            </div>
                        </div>

                        <div class="mt-1 md:me-3 rounded-md border-2 border-zinc-300 shadow-xl p-5"
                            v-if="postData.nota_qualidade <= 3">
                            <h5 class="px-3 px-sm-5">Qualidade de serviço:<br>
                                Marque os itens que não foram atendidos (obrigatório caso a nota seja menor ou igual
                                a 3)
                            </h5>

                            <div class="flex flex-col">
                                <div class="form-check d-flex align-items-start mt-3" v-for="(option, id) in options1"
                                    :key="id">
                                    <input type="checkbox" :value="option.name" :id="'check' + id"
                                        v-model="iQualidade" />
                                    <label :for="'check' + id">{{ option.name }}</label>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="flex flex-col w-1/4 p-4 bg-zinc-200 rounded-md">
                        <div class="star-title">
                            <p>Com relação ao atendimento no prazo das solicitações
                                efetuadas ao Posto de Serviço, qual seu nível de satisfação?</p>
                        </div>
                        <div>
                            <star-rating v-model:rating="postData.nota_prazo" :increment="0.5"
                                active-border-color="#1a00ab" active-color="#1a00ab" :star-size="25" />
                            <div class="my-3 flex flex-col">
                                <label for="obs_prazo">Observações:</label>
                                <textarea id="obs_prazo" rows="3" v-model="postData.obs_prazo"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col w-1/4 p-4 bg-zinc-200 rounded-md">
                        <div class="star-title">
                            <p>Como você avalia a disponibilidade do Posto de
                                Serviço no horário de serviço?</p>
                        </div>
                        <div>
                            <star-rating v-model:rating="postData.nota_dispon" :increment="0.5"
                                active-border-color="#1a00ab" active-color="#1a00ab" :star-size="25" />
                            <div class="my-3 flex flex-col">
                                <label for="obs_dispon">Observações:</label>
                                <textarea id="obs_dispon" rows="3" v-model="postData.obs_dispon"></textarea>
                            </div>
                        </div>

                        <div class="mt-1 md:me-3 rounded-md border-2 border-zinc-300 shadow-xl p-5"
                            v-if="postData.nota_dispon <= 3">
                            <h5 class="px-3 px-sm-5">Disponibilidade: <br>
                                Marque os itens que não foram atendidos (obrigatório caso a nota seja menor ou igual
                                a 3)
                            </h5>
                            <div class="d-flex flex-column">
                                <div class="form-check d-flex align-items-start mt-3" v-for="(option, id) in options2"
                                    :key="id">

                                    <input type="checkbox" :value="option.name" :id="'check' + id" v-model="iDispon" />
                                    <label :for="'check' + id">{{ option.name }}</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col w-1/4 p-4 bg-zinc-200 rounded-md">
                        <div class="star-title">
                            <p>Com relação a responsabilidade de profissionais atendendo
                                ao posto de serviço, qual seu nível de satisfação?</p>
                        </div>
                        <div>
                            <star-rating v-model:rating="postData.nota_respon" :increment="0.5"
                                active-border-color="#1a00ab" active-color="#1a00ab" :star-size="25" />

                            <div class="my-3 flex flex-col">
                                <label for="obs_respon">Observações:</label>
                                <textarea id="obs_respon" rows="3" v-model="postData.obs_respon"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Final Perguntas com estrelas -->

                <div class="border-top mt-auto pb-3 flex justify-between items-center">

                    <!-- Modal toggle -->
                    <button data-modal-target="large-modal" data-modal-toggle="large-modal"
                        class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                        type="button">
                        Resumo
                    </button>

                    <button id="submit" type="submit"
                        class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Submeter Avaliação
                    </button>
                </div>

                <Modal id="default-modal">
                    <template #bodyModal>
                        <div class="modal-dados flex justify-evenly *:max-h-80 overflow-y-auto">
                            <div>
                                <p>Colaborador(es) selecionado(s): </p>
                                <ul class="text-sm" v-for="chkColabs in chkColabs.value">
                                    <li>{{ chkColabs }}</li>
                                </ul>
                            </div>
                            <div>
                                <p>Colaborador: {{ chkColabs.join(', ') }}</p>
                                <p>Avaliação Média: {{ avaliacao }}</p>
                                <p>Nível de Serviço: {{ nivel }}</p>
                                <p>Desconto Percentual na Medição: {{ desc }}</p>
                                <p>Observações de Qualidade: {{ postData.obs_qualidade }}</p>
                                <p>Observações de Prazo: {{ postData.obs_prazo }}</p>
                                <p>Observações de Disponibilidade: {{ postData.obs_dispon }}</p>
                                <p>Observações de Responsabilidade: {{ postData.obs_respon }}</p>
                            </div>
                        </div>
                    </template>
                </Modal>

            </form>
        </main>
    </div>
</template>


<style lang="scss" scoped>
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

.form-check input {
    margin-right: 10px;
}

.form-check label {
    line-height: 0.8 !important;
    font-weight: normal;
}

.vue-star-rating-rating-text {
    font-weight: bold !important;
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

@media(min-width: 768px) {
    .star-title {
        min-height: 60px;
    }
}

@media(max-width: 768px) {
    .star-title {
        margin-top: 50px;
    }

    .inputs {
        margin-top: 20px;

        input {
            width: 100%;
        }

    }
}
</style>