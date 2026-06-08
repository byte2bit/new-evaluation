import { ref, reactive, computed } from 'vue'

export function useAvaliacao() {
    const iQualidade = ref('')
    const iDispon = ref('')

    const postData = reactive({
        desconto: "",
        nivel: "",
        avaliacao: "",
        nota_qualidade: 5,
        obs_qualidade: "",
        nota_prazo: 5,
        obs_prazo: "",
        nota_dispon: 5,
        obs_dispon: "",
        nota_respon: 5,
        obs_respon: "",
        colab: '',
        demandante: '',
        itensQualidade: '',
        itensDispon: '',
        liderancas: '',
    })

    const avaliacao = computed(() => {
        return (Number(postData.nota_qualidade) +
            Number(postData.nota_prazo) +
            Number(postData.nota_dispon) +
            Number(postData.nota_respon)) / 4
    })

    const pontos = computed(() => {
        const x = avaliacao.value
        if (x <= 5 && x >= 4.5) return 0
        if (x <= 4.4 && x >= 4) return 1
        if (x <= 3.9 && x >= 3.5) return 5
        if (x <= 3.4 && x >= 2.5) return 7
        if (x <= 2.4 && x >= 1) return 10
        return 0
    })

    const nivel = computed(() => {
        const p = pontos.value
        if (p === 0) return "A"
        if (p === 1) return "B"
        if (p === 5) return "C"
        if (p === 7) return "D"
        if (p === 10) return "E"
        return ""
    })

    const desc = computed(() => {
        const p = pontos.value
        if (p === 0) return "0%"
        if (p === 1) return "1%"
        if (p === 5) return "2%"
        if (p === 7) return "3%"
        if (p === 10) return "5%"
        return ""
    })

    const getOptQualidade = (opt) => {
        iQualidade.value = opt.join(" | ")
    }

    const getOptDispon = (optd) => {
        iDispon.value = optd.join(" | ")
    }

    const iQual = computed(() => {
        return "&bullet; " + iQualidade.value.replaceAll(" | ", "<br>&bullet; ")
    })

    const iDisp = computed(() => {
        return "&bullet; " + iDispon.value.replaceAll(" | ", "<br>&bullet; ")
    })

    function resetAvaliacao() {
        Object.assign(postData, {
            desconto: "",
            nivel: "",
            avaliacao: "",
            nota_qualidade: 5,
            obs_qualidade: "",
            nota_prazo: 5,
            obs_prazo: "",
            nota_dispon: 5,
            obs_dispon: "",
            nota_respon: 5,
            obs_respon: "",
            colab: '',
            demandante: '',
            liderancas: '',
            itensQualidade: '',
            itensDispon: '',
        })
        iQualidade.value = ''
        iDispon.value = ''
    }

    return {
        postData,
        iQualidade,
        iDispon,
        avaliacao,
        nivel,
        desc,
        iQual,
        iDisp,
        getOptQualidade,
        getOptDispon,
        resetAvaliacao
    }
}