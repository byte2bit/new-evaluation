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
    <aside class="col-md-3 col-sm-12 bg-secondary-subtle">
      <div id="checks" class="mt-3">
        <h4>Selecione o(s) colaborador(es) para avaliar:</h4>
        <ListCheckboxes />
      </div>
    </aside>
    <article>
      <Form />
    </article>
    <footer>Footer</footer>
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
