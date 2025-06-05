<template>

    <!-- Main modal -->
    <div id="simple-modal" tabindex="-1" aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        :class="{ 'hidden': !simpleModalFlag }">
        <div class="relative w-full max-w-xl max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow-sm">

                <!-- Modal body -->
                <div class="p-4 md:p-5 space-y-4">
                    <slot name="bodyModal">Conteúdo do Modal</slot>
                </div>

                <!-- Modal footer -->
                <div class="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b">
                    <button data-modal-hide="simple-modal" type="button"
                        class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                        @click="closeModal">OK</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
// Use defineModel for v-model binding
const simpleModalFlag = defineModel('simpleModalFlag');

const closeModal = () => {
    // Modifying the defineModel variable automatically emits the update event
    simpleModalFlag.value = false;
};

</script>

<style lang="scss" scoped></style>