import { ref } from 'vue'

export function constants() {

    const optQualidade = ref([
        { name: "Comportamento/Atitude: O profissional não demonstra comportamento adequado ou atitude positiva no atendimento.", id: 1 },
        { name: "Forma de comunicação (Verbal/escrita, cordialidade): Falhas na comunicação, falta de cordialidade ou erros na comunicação escrita. ", id: 2 },
        { name: "Habilidade no uso de sistemas informatizados e soluções tecnológicas no suporte: Dificuldades ou falhas no uso de sistemas e tecnologias. ", id: 3 },
        { name: "Apoio a reuniões e eventos: Falta de suporte adequado ou problemas durante reuniões e eventos. ", id: 4 },
        { name: "Atendimento a demandas: Demora ou falhas no atendimento das solicitações.", id: 5 },
        { name: "Falta de conhecimentos básicos para as tarefas: Falta de domínio sobre as tarefas básicas relacionadas ao posto de serviço.", id: 6 },
        { name: "Insuficiência de conhecimento, especialização ou experiência técnica necessária para o posto de serviço: Falta de conhecimento técnico, especialização ou experiência necessária.", id: 7 },
    ])

    const optDispon = ref([
        { name: "Posto indisponível por um dia ou mais.", id: 1 },
        { name: "Frequência de atraso, indisponível no horário administrativo.", id: 2 },
        { name: "O posto de Serviço estava indisponível em horário previsto para compromisso agendado da gerência.", id: 3 },
    ])

    return {
        optQualidade,
        optDispon
    }

}