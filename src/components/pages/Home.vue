<script setup>
import Form from '../template/Form.vue'
// import Main from '../template/Main.vue'
// import Header from '../template/Header.vue'
</script>

<template>
    <div class="container-xxl g-0" id="container">
        <Form />
    </div>

</template>

<style lang="scss" scoped>
.header-wrapper{
    background-color: #e0f1f5;
    border-bottom: 2px solid rgba(0,0,0,0.2);
}
/* #container{
    min-height: 100%;
    display: flex;
    flex-direction: column;
        display: grid;
        grid-template-rows: auto 1fr auto;
} */
@media(min-width: 1600px) {
    #container {
        max-width: 1500px !important;
    }
}
</style>