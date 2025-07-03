<script setup>
import Header from './components/Header.vue'
</script>

<template>
  <div class="content">
    <header>
      <nav>
        <Header />
      </nav>
    </header>
    <div class="mt-20" id="main">
      <router-view></router-view>
      <footer id="footer" class="bg-gray-800 text-center text-white text-sm m-0 p-1">&copy; Núcleo Engenharia </footer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  width: 100vw;
  max-width: 100vw;
  display: grid;
  grid-template-columns: 1fr;
}

header {
  grid-column: 1 / -1;
}

#footer {
  // border: 1px solid black;
  grid-column: 1 / -1;
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
