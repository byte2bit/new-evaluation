import axios from 'axios'
var reg = []

const loadRegs = async () => {
    try {
        const res = await axios.get("https://api.nucleoengenharia.com.br:8000/registros")
        console.log(res)
        console.log(res.data)
        reg = res.data
        return reg
    } catch (e) {
        console.error("Erro ao carregar os registros", e)
    }
}

export {
    reg,
    loadRegs
}