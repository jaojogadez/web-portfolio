const switchButton = document.querySelector(".switch")
switchButton.onclick = () => toggleMode()
const otherSwitchButton = document.querySelector(".navbar .switch")
otherSwitchButton.onclick = () => toggleMode()

function toggleMode(){
    const html = document.documentElement
    html.classList.toggle("light")
    const image = document.querySelector("#profile img")
    if(html.classList.contains("light")){
        image.setAttribute("src","./assets/avatar-light.png")
        image.setAttribute("alt", "Foto de João Pedro sorrindo, usando camisa preta e fundo azul.")
    }else{
        image.setAttribute("src","./assets/avatar.png")
        image.setAttribute("alt", "Foto de João Pedro sorrindo, usando camisa preta e fundo amarelo.")
    }
}