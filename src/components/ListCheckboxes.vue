<template>
    <div>
        <div v-if="colabStore.isLoading" class="flex justify-center items-center py-8">
            <span>Carregando colaboradores...</span>
        </div>
        <template v-else>
            <!-- Seleciona todos -->
            <input type="checkbox" @click="toggleAllSelection" :checked="allCheckBoxesSelected"
                class="w-3 h-3 accent-pink-500">
            <label class="ms-2 font-bold">Todos</label>

            <!-- Lista de checkboxes -->
            <div v-for="(colab, index) in colabStore.colabs" :key="index" class="line-colabs">
                <input type="checkbox" :id="`checkbox-${colab.colab}`" class="w-3 h-3 accent-pink-500"
                    :checked="selectedColabs.includes(colab.colab)" 
                    @change="toggleColabSelection(colab.colab)">

                <label v-memo="colab.colab" :for="`checkbox-${colab.colab}`" class="ms-2">
                    {{ colab.colab }}
                </label>
            </div>  
        </template>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useColabStore } from '@/stores/colabStore'

const colabStore = useColabStore()
const selectedColabs = ref([])

const allCheckBoxesSelected = computed(() =>
    selectedColabs.value.length === colabStore.colabs.length && colabStore.colabs.length > 0
)

function toggleAllSelection() {
    if (allCheckBoxesSelected.value) {
        selectedColabs.value = []
    } else {
        selectedColabs.value = colabStore.colabs.map(colab => colab.colab)
    }
    updateStore()
}

function toggleColabSelection(colabId) {
    const index = selectedColabs.value.indexOf(colabId)
    if (index > -1) {
        selectedColabs.value.splice(index, 1)
    } else {
        selectedColabs.value.push(colabId)
    }
    updateStore()
}

function updateStore() {
    colabStore.chkColabs = [...selectedColabs.value]
}

onMounted(() => {
    colabStore.loadColabs()
})
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