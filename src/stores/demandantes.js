var currentUser = ""
var demandantes = {}

let parentUrl = document.referrer
let cUser = parentUrl.split("=")
// currentUser = cUser[1]
currentUser = "mayconlacorte"

switch (currentUser) {
    case "silvio.avaliacao":
        demandantes = {
            nome: "Silvio Ribeiro",
            email: "silvio.ribeiro@gmail.com",
            admin: true
        }
        break;
    case "bernardo.avaliacao":
        demandantes = {
            nome: "Bernardo Santos",
            email: "bernardo.santos@nucleoengenharia.com.br",
            admin: true
        }
        break;
    case "levy.rodrigues":
        demandantes = {
            nome: "Levy Farias Rodrigues",
            email: "levy.rodrigues@nucleoengenharia.com.br",
            admin: true
        }
        break;
    case "mayconlacorte":
        demandantes = {
            nome: "Maycon Lacorte",
            email: "mayconlacorte@petrobras.com.br",
            admin: false
        }
        break;
    case "pedro.kronemberger":
        demandantes = {
            nome: "Pedro Roberto Monken Kronemberger",
            email: "pedro.kronemberger@petrobras.com.br",
            admin: false
        }
        break;
/*     case "thiago.ramalho":
        demandantes = {
            nome: "Thiago Ramalho",
            email: "thiago.ramalho@petrobras.com.br",
            admin: false
        }
        break; */
    case "elisangela.valdo":
        demandantes = {
            nome: "Elisangela Valdo",
            email: "elisangela.valdo@petrobras.com.br",
            admin: false
        }
        break;
    case "rodrigomrebello":
        demandantes = {
            nome: "Rodrigo Rebello",
            email: "rodrigomrebello@petrobras.com.br",
            admin: false
        }
        break;
    case "estevao.domingues":
        demandantes = {
            nome: "Estevão Domingues Costa",
            email: "estevao.domingues@petrobras.com.br",
            admin: false
        }
        break;
    default:
        demandantes = {
            nome: "Não localizado",
            email: "Não localizado",
        }
        break;
}

export { currentUser, demandantes }