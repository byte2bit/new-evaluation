<script setup>
import ListCheckboxes from './components/ListCheckboxes.vue'
import Form from './components/pages/Form.vue'
import Header from './template/Header.vue'
// import Teste from './components/Teste.vue'
</script>
  
<template>
  <div class="content">
    <header>
      <nav>
        <Header />
      </nav>
    </header>
    <aside class="bg-zinc-200 p-4">
      <h4 class="mb-3">Selecione o(s) colaborador(es) para avaliar:</h4>  
      <div id="checks">
        <ListCheckboxes />
      </div>
    </aside>
    <article>
      <Form />
    </article>
    <footer class="bg-gray-800 text-center text-white text-sm m-0 p-1">&copy; Núcleo Engenharia </footer>
  </div>
</template>

<style lang="scss" scoped>
.content {
  min-width: 100vw;
  display: grid;
  grid-template-columns: 300px 1fr;
}

header {
  // border: 1px solid black;
  grid-column: 1 / -1;
}

aside {
  height: calc(100vh - 140px);
  // overflow-y: auto;
}
#checks {
  height: calc(100vh - 140px);
  overflow: auto;
}
/* 
article {
  border: 1px solid black;
}

aside {
  border: 1px solid black;
} */

footer {
  // border: 1px solid black;
  grid-column: 1 / -1;
}
</style>
