<template>
    <header>
        <div class="flex justify-between items-center p-2 bg-white border-gray-200 dark:bg-gray-900">
            <img src="@/assets/logo-horizontal branco.png" class="h-6" alt="Núcleo Logo" />
            <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
                <span class="self-center text-xl font-semibold whitespace-nowrap font-white dark:text-white">Núcleo
                    Avaliação de Nível de Serviço</span>
            </a>
            <div class="text-white me-6">
                <p class="mb-1 demandante">Nome: Nome do Demandante</p>
                <p class="demandante">Email: Email do Demandante</p>
                <!-- <p class="mb-1"><b>Nome: </b>{{ dados.nome }}</p>
                <p><b>Email: </b>{{ dados.email }}</p> -->
            </div>
        </div>
        <nav class="bg-white border-gray-200 dark:bg-gray-300">
            <div class="flex flex-wrap items-center justify-between 2xl:mx-auto px-4 py-2">

                <button data-collapse-toggle="navbar-default" type="button"
                    class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-default" aria-expanded="false">
                    <span class="sr-only">Abrir menu principal</span>
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>

                <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul
                        class="text-sm flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                        <li>
                            <a href="#"
                                class="block py-2 px-3 bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0"
                                aria-current="page">Registros</a>
                        </li>
                        <li>
                            <a href="#"
                                class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  ">Lista
                                de Profissionais</a>
                        </li>
                        <li>
                            <a href="#"
                                class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  ">Inserir
                                Profissional</a>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>

    </header>
</template>

<script setup>
// import { dados } from '../../js/store.js'


</script>

<style lang="scss" scoped>
header {
    // background-color: #fff;

    p {
        margin-bottom: 4px;
        font-size: 0.7rem;
    }
}

#logo img {
    max-width: 120px;
}

@media(max-width: 768px) {
    #logo {
        text-align: center;
        margin-bottom: 25px;
    }

    .head div {
        margin-bottom: 15px;
    }
}
.demandante {
    font-size: 0.6rem;
}
</style>