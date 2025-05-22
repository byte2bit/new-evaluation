<!-- <script>
import ListCheckboxes from '@/components/ListCheckboxes.vue'
import axios from 'axios'
import StarRating from 'vue-star-rating'
import VueSelect from "vue3-select-component"

import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import "vue3-select-component/dist/style.css"

import { dados } from '@/js/store.js'

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

export default {
    data() {
        return {
            dados: {},
            admin: dados.admin,
            userEmail: dados.email,
            colabcUser: [],
            colabs: [],
            pontos: "",
            iQualidade: [],
            iDispon: [],
            postData: {
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
            },
            options1: [
                { name: "Comportamento/Atitude: O profissional não demonstra comportamento adequado ou atitude positiva no atendimento.", id: 1 },
                { name: "Forma de comunicação (Verbal/escrita, cordialidade): Falhas na comunicação, falta de cordialidade ou erros na comunicação escrita. ", id: 2 },
                { name: "Habilidade no uso de sistemas informatizados e soluções tecnológicas no suporte: Dificuldades ou falhas no uso de sistemas e tecnologias. ", id: 3 },
                { name: "Apoio a reuniões e eventos: Falta de suporte adequado ou problemas durante reuniões e eventos. ", id: 4 },
                { name: "Atendimento a demandas: Demora ou falhas no atendimento das solicitações.", id: 5 },
                { name: "Falta de conhecimentos básicos para as tarefas: Falta de domínio sobre as tarefas básicas relacionadas ao posto de serviço.", id: 6 },
                { name: "Insuficiência de conhecimento, especialização ou experiência técnica necessária para o posto de serviço: Falta de conhecimento técnico, especialização ou experiência necessária.", id: 7 },
            ],
            options2: [
                { name: "Posto indisponível por um dia ou mais.", id: 1 },
                { name: "Frequência de atraso, indisponível no horário administrativo.", id: 2 },
                { name: "O posto de Serviço estava indisponível em horário previsto para compromisso agendado da gerência.", id: 3 },
            ],
            isLoading: false,
            fullPage: true,
        }
    },

    components: {
        VueSelect,
        StarRating,
        toast,
        dados,
        Loading, ListCheckboxes, ListCheckboxes
    },
    methods: {
        notify() {
            toast.success("Aguarde, enviando dados...", {
                autoClose: 3000,
                theme: 'colored',
            })
        },
        notifyProf() {
            toast.warning("Selecione um profissional", {
                autoClose: 1000,
                theme: 'colored',
            })
        },
        setRating(rating) {
            this.rating = rating;
        },
        setSoma() {
            this.postData.avaliacao = (this.postData.nota_qualidade + this.postData.nota_prazo + this.postData.nota_dispon + this.postData.nota_respon) / 4
            return this.postData.avaliacao
        },
        setPontos() {
            let x = this.postData.avaliacao

            if (x <= 5 && x >= 4.5) {
                this.pontos = 0
            } else if (x <= 4.4 && x >= 4) {
                this.pontos = 1
            } else if (x <= 3.9 && x >= 3.5) {
                this.pontos = 5
            } else if (x <= 3.4 && x >= 2.5) {
                this.pontos = 7
            } else if (x <= 2.4 && x >= 1) {
                this.pontos = 10
            }

            return this.pontos
        },
        setNivel() {
            let pontos = this.setPontos()

            if (pontos === 0) {
                this.postData.nivel = "A";
            } else if (pontos === 1) {
                this.postData.nivel = "B";
            } else if (pontos === 5) {
                this.postData.nivel = "C";
            } else if (pontos === 7) {
                this.postData.nivel = "D";
            } else if (pontos === 10) {
                this.postData.nivel = "E";
            }

            return this.postData.nivel
        },
        setDesc() {
            let pontos = this.setPontos()

            if (pontos === 0) {
                this.postData.desconto = 0;
            } else if (pontos === 1) {
                this.postData.desconto = 1;
            } else if (pontos === 5) {
                this.postData.desconto = 2;
            } else if (pontos === 7) {
                this.postData.desconto = 3;
            } else if (pontos === 10) {
                this.postData.desconto = 5;
            }

            return this.postData.desconto + "%"
        },
        loadColabs() {
            axios.get("https://api.nucleoengenharia.com.br:8000/colab").then(res => {
                // console.log("loadColabs1: "+JSON.stringify(res.data))
                this.colab = res.data
                    .map(colab => {
                        return ({
                            label: colab.colab,
                            value: colab.colab,
                            liderancas: colab.liderancas,
                            demandante: colab.demandante
                        })
                    })

                if (this.admin) {
                    this.colabcUser = this.colab
                } else {
                    this.colabcUser = this.colab.filter(colab => colab.demandante === this.userEmail)
                }

            }).catch("Erro")

        },
        save() {
            this.isLoading = true
            setTimeout(() => {
                this.isLoading = false
            }, 3500)

            if (this.postData.colab === "") {
                this.notifyProf()
            } else {
                this.postData.itensQualidade = this.iQualidade.join(" | ")
                this.postData.itensDispon = this.iDispon.join(" | ")
                this.postData.demandante = dados.email
                this.postData.desconto = this.postData.desconto + "%"

                axios.all([
                    axios.post("registros", this.postData),
                    axios.post("mail", this.postData)
                ]).then(() => {

                    this.reset()
                }).catch(
                    this.notify()
                )


                console.log("this.postData: " + JSON.stringify(this.postData))
            }
        },
        reset() {
            this.$forceUpdate()
        },
    },
    mounted() {
        this.loadColabs()
    }
}
</script> -->

<script setup>
import { ref, reactive, onMounted, getCurrentInstance } from 'vue'
import ListCheckboxes from '@/components/ListCheckboxes.vue'
import axios from 'axios'
import StarRating from 'vue-star-rating'
import VueSelect from "vue3-select-component"

import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import "vue3-select-component/dist/style.css"

import { dados } from '@/js/store.js'


import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import { useColabStore } from '@/stores/colabStore'
/* const colabStore = useColabStore()

const store = colabStore.colabItems */
const instance = getCurrentInstance()

const dadosLocal = reactive({})
const admin = ref(dados.admin)
const userEmail = ref(dados.email)
const colabcUser = ref([])
const colabs = ref([])
const pontos = ref("")
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

function setRating(rating) {
    // O componente StarRating já está vinculado via v-model, então não é necessário atualizar manualmente
}

function setSoma() {
    postData.avaliacao = (Number(postData.nota_qualidade) + Number(postData.nota_prazo) + Number(postData.nota_dispon) + Number(postData.nota_respon)) / 4
    return postData.avaliacao
}

function setPontos() {
    let x = postData.avaliacao

    if (x <= 5 && x >= 4.5) {
        pontos.value = 0
    } else if (x <= 4.4 && x >= 4) {
        pontos.value = 1
    } else if (x <= 3.9 && x >= 3.5) {
        pontos.value = 5
    } else if (x <= 3.4 && x >= 2.5) {
        pontos.value = 7
    } else if (x <= 2.4 && x >= 1) {
        pontos.value = 10
    }

    return pontos.value
}

function setNivel() {
    let p = setPontos()

    if (p === 0) {
        postData.nivel = "A";
    } else if (p === 1) {
        postData.nivel = "B";
    } else if (p === 5) {
        postData.nivel = "C";
    } else if (p === 7) {
        postData.nivel = "D";
    } else if (p === 10) {
        postData.nivel = "E";
    }

    return postData.nivel
}

function setDesc() {
    let p = setPontos()

    if (p === 0) {
        postData.desconto = 0;
    } else if (p === 1) {
        postData.desconto = 1;
    } else if (p === 5) {
        postData.desconto = 2;
    } else if (p === 7) {
        postData.desconto = 3;
    } else if (p === 10) {
        postData.desconto = 5;
    }

    return postData.desconto + "%"
}

function loadColabs() {
    axios.get("https://api.nucleoengenharia.com.br:8000/colab").then(res => {
        const colabList = res.data
            .map(colab => ({
                label: colab.colab,
                value: colab.colab,
                liderancas: colab.liderancas,
                demandante: colab.demandante
            }))

        if (admin.value) {
            colabcUser.value = colabList
        } else {
            colabcUser.value = colabList.filter(colab => colab.demandante === userEmail.value)
        }
    }).catch(() => {
        // Tratar erro se necessário
    })
}

function save() {
    isLoading.value = true
    setTimeout(() => {
        isLoading.value = false
    }, 3500)

    if (postData.colab === "") {
        notifyProf()
    } else {
        postData.itensQualidade = iQualidade.value.join(" | ")
        postData.itensDispon = iDispon.value.join(" | ")
        postData.demandante = dados.email
        postData.desconto = postData.desconto + "%"

        axios.all([
            axios.post("registros", postData),
            axios.post("mail", postData)
        ]).then(() => {
            reset()
        }).catch(() => {
            notify()
        })

        console.log("this.postData: " + JSON.stringify(postData))
    }
}

function reset() {
    // Força atualização do componente
    if (instance && instance.proxy && instance.proxy.$forceUpdate) {
        instance.proxy.$forceUpdate()
    }
}

onMounted(() => {
    loadColabs()
})
</script>

<template>
    <div class="row p-4">

        <main class="main px-4">
            <div class="flex flex-col" id="inf-importante">
                <h4>Informações importantes:</h4>
                <!-- <div>{{ store[0].label }}</div> -->
                <p>A avaliação resultante influenciará a avaliação geral do desempenho do POSTO DE SERVIÇO, podendo
                    afetar a
                    medição
                    total devido à baixa qualidade, performance, produtividade, atrasos ou falhas nos serviços
                    prestados.
                    Baixo desempenho
                    pode resultará em desconto na medição mensal como penalização pelos serviços insatisfatórios,
                    conforme
                    avaliação das
                    áreas clientes.</p>
            </div>
            <form class="form vl-parent" @submit.prevent="save">

                <loading v-model:active="isLoading" :can-cancel="true" :is-full-page="fullPage" />

                <div class="flex md:justify-evenly md:mt-2 bg-gray-300 rounded-md p-3">
                    <div class="inputs">
                        <label for="media">Avaliação Média:</label>
                        <input type="text" id="media" :value="setSoma()" disabled />
                    </div>
                    <div class="inputs">
                        <label for="nivel">Nível de Serviço:</label>
                        <input type="text" id="nivel" :value="setNivel()" disabled />
                    </div>
                    <div class="inputs">
                        <label for="desconto">Desconto Percentual na Medição:</label>
                        <input type="text" id="desconto" :value="setDesc()" disabled />
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
                            <star-rating @update:rating="setRating" v-model:rating="postData.nota_qualidade"
                                :increment="0.5" active-border-color="#1a00ab" active-color="#1a00ab" :star-size="25" />
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
                            <star-rating @update:rating="setRating" v-model:rating="postData.nota_prazo"
                                :increment="0.5" active-border-color="#1a00ab" active-color="#1a00ab" :star-size="25" />
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
                            <star-rating @update:rating="setRating" v-model:rating="postData.nota_dispon"
                                :increment="0.5" active-border-color="#1a00ab" active-color="#1a00ab" :star-size="25" />
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
                            <star-rating @update:rating="setRating" v-model:rating="postData.nota_respon"
                                :increment="0.5" active-border-color="#1a00ab" active-color="#1a00ab" :star-size="25" />

                            <div class="my-3 flex flex-col">
                                <label for="obs_respon">Observações:</label>
                                <textarea id="obs_respon" rows="3" v-model="postData.obs_respon"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Final Perguntas com estrelas -->

                <div class="border-top mt-auto pb-3 d-flex justify-content-between align-items-center">
                    <button id="submit" type="submit"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 float-end">
                        Submeter Avaliação
                    </button>
                </div>
            </form>
        </main>
    </div>
</template>


<style lang="scss" scoped>
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
    label{
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