// Criação de variáveis para pegar info do HTML
let btnNode = document.getElementById('elemBtn')
let dateNode = document.getElementById('elemDate')
const mediaNode = document.querySelector('#media')
const descricaoNode = document.querySelector('#descricao')
const tituloNode = document.querySelector('#titulo')
const copyrightNode = document.querySelector('#copyright')
// Carregar a foto do dia no carregamento da pagina
window.addEventListener('load', function(event){
    event.preventDefault()
    carregaFoto(dateNode.value)
})

// Fazer o pedido da foto do dia escolhido
btnNode.addEventListener('click', function(event){
    event.preventDefault()
    carregaFoto(dateNode.value)
    
})

// request AJAX/FETCH
async function carregaFoto (date){
    const respost = await fetch(`https://api.nasa.gov/planetary/apod?api_key=S71UHmXOlP21f7lRzyTFo1k2VWS42Zq9TlaRnGm8&date=${date}`)
    let respostObj = await respost.json()
    console.log(respostObj)
    mudaInfo(respostObj)
}

// Mudar a informação do Copyright, Title, Url da Imagem/Video, Descrição
function mudaInfo (respostObj) {    
    if (`${respostObj.media_type}` === 'image'){
        mediaNode.innerHTML = `<img src="${respostObj.url}">`
        xpto(respostObj)
    } else if (`${respostObj.media_type}` === 'video'){
        mediaNode.innerHTML = `<iframe src="${respostObj.url}"></iframe>`
        xpto(respostObj)
    } else{
        mediaNode.innerHTML = `<h4>Não temos foto ou video para o dia selecionado</h4>`
        tituloNode.textContent = ""
        descricaoNode.textContent = ""
        copyrightNode.textContent = ""
    }


}

function xpto (respostObj){
    tituloNode.textContent = `${respostObj.title}`
    descricaoNode.textContent = `Descrição: ${respostObj.explanation}`
    copyrightNode.textContent = `Copyright: ${respostObj.copyright}`
}
