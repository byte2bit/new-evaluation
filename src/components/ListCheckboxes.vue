<template>
    <div>
        <div v-if="colabStore.isLoading" class="flex justify-center items-center py-8">
            <span>Carregando lista de colaboradores...</span>
        </div>
        <template v-else>
            <!-- Seleciona todos -->
            <input type="checkbox" @click="toggleAllSelection" :checked="allSelected"
                class="w-3 h-3 accent-pink-500">
            <label class="ms-2 font-bold">Todos</label>

            <!-- Lista de checkboxes -->
            <div v-for="(colab, index) in colabStore.colabs" :key="index" class="line-colabs">
                <input type="checkbox" :id="`checkbox-${colab.colab}`" class="w-3 h-3 accent-pink-500" :value="colab.colab"
                    v-model="colabStore.chkColabs">
                <label :for="`checkbox-${colab.colab}`" class="ms-2">{{ ++index + ' - ' + colab.colab }}</label>
            </div>  
        </template>
    </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useGetCheckStore } from '@/stores/getCheckboxesStore'
const colabStore = useGetCheckStore()

onMounted(async () => {
    await colabStore.getColabs()
})

const allSelected = computed(() =>
    colabStore.colabs.length > 0 && colabStore.chkColabs.length === colabStore.colabs.length
)

function toggleAllSelection() {
    if (allSelected.value) {
        colabStore.chkColabs = []
    } else {
        colabStore.chkColabs = colabStore.colabs.map(c => c.colab)
    }
}

</script>


<style scoped>
label {
    font-size: 10px;
    font-weight: normal;
}
.line-colabs{
    line-height: 1;
}
</style>