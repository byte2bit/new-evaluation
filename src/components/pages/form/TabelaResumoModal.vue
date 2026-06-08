<script setup>
defineProps({
    avaliacao: {
        type: [String, Number],
        required: true
    },
    nivel: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    postData: {
        type: Object,
        required: true
    },
    iQualidade: {
        type: String,
        required: true
    },
    iQual: {
        type: String,
        required: true
    },
    iDispon: {
        type: String,
        required: true
    },
    iDisp: {
        type: String,
        required: true
    }
})
</script>

<template>
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
                        Avaliação Média</td>
                    <td class="px-3 py-1 text-sm">{{ avaliacao }}</td>
                </tr>
                <tr class="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                    <td scope="row" class="px-3 py-1 font-light text-sm text-gray-900">
                        Nível de Serviço</td>
                    <td class="px-3 py-1 text-sm">{{ nivel }}</td>
                </tr>
                <tr class="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                    <td scope="row" class="px-3 py-1 font-light text-sm text-gray-900">
                        Desconto Percentual na Medição</td>
                    <td class="px-3 py-1 text-sm">{{ desc }}</td>
                </tr>
                <!-- Opcionais -->
                <tr class="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                    <td scope="row" class="px-3 py-1 font-light text-sm text-gray-900">
                        Como você avalia a qualidade do Serviço Prestado?</td>
                    <td class="px-3 py-1 text-sm">{{ postData.nota_qualidade }}</td>
                </tr>

                <tr v-if="postData.obs_qualidade" class="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                    <td scope="row" class="px-3 py-1 font-light text-sm text-gray-900">
                        Observações de Qualidade</td>
                    <td class="px-3 py-1 text-sm">{{ postData.obs_qualidade }}</td>
                </tr>

                <tr v-if="iQualidade" class="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                    <td scope="row" class="px-3 py-1 font-light text-sm text-gray-900">
                        Itens de qualidade não atendidos</td>
                    <td class="px-3 py-1">
                        <span class="text-sm" v-html="iQual"></span>
                    </td>
                </tr>

                <tr v-if="postData.obs_prazo" class="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                    <td scope="row" class="px-3 py-1 font-light text-sm text-gray-900">
                        Com relação ao atendimento no prazo das solicitações efetuadas ao Posto de Serviço, qual seu
                        nível de satisfação?</td>
                    <td class="px-3 py-1 text-sm">{{ postData.obs_prazo }}</td>
                </tr>
                <tr class="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                    <td scope="row" class="px-3 py-1 font-light text-sm text-gray-900">
                        Como você avalia a disponibilidade do Posto de Serviço no horário de serviço?</td>
                    <td class="px-3 py-1 text-sm">{{ postData.nota_dispon }}</td>
                </tr>
                <tr v-if="postData.obs_dispon" class="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                    <td scope="row" class="px-3 py-1 font-light text-sm text-gray-900">
                        Observações de Disponibilidade:</td>
                    <td class="px-3 py-1 text-sm">{{ postData.obs_dispon }}</td>
                </tr>

                <tr v-if="iDispon" class="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                    <td scope="row" class="px-3 py-1 font-light text-sm text-gray-900">
                        Itens de disponibilidade não atendidos</td>
                    <td class="px-3 py-1">
                        <span class="text-sm" v-html="iDisp"></span>
                    </td>
                </tr>

                <tr class="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                    <td scope="row" class="px-3 py-1 font-light text-sm text-gray-900">
                        Com relação a responsabilidade de profissionais atendendo ao posto de serviço, qual seu nível de
                        satisfação?</td>
                    <td class="px-3 py-1 text-sm">{{ postData.nota_respon }}</td>
                </tr>
                <tr v-if="postData.obs_respon" class="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                    <td scope="row" class="px-3 py-1 font-light text-sm text-gray-900">
                        Observações de Responsabilidade</td>
                    <td class="px-3 py-1 text-sm">{{ postData.obs_respon }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
#dados p {
    font-size: 1rem;
    background-color: #fff;
}
</style>