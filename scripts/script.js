const switchButton = document.querySelector(".switch")
switchButton.onclick = () => toggleMode()
const otherSwitchButton = document.querySelector(".navbar .switch")
otherSwitchButton.onclick = () => toggleMode()

function toggleMode(){
  const html = document.documentElement
  html.classList.toggle("light")
  const image = document.querySelector("#profile img")
  const modals = document.querySelectorAll(".modal-content input")
  const select = document.querySelector("select")
  if(html.classList.contains("light")){
    image.setAttribute("src","./assets/avatar-light.png")
    image.setAttribute("alt", "Foto de João Pedro sorrindo, usando camisa preta e fundo azul.")
    modals.forEach( modal => {
      modal.classList.remove("text-bg-dark")
    })
    select.classList.remove("text-bg-dark")
  }else{
    image.setAttribute("src","./assets/avatar.png")
    image.setAttribute("alt", "Foto de João Pedro sorrindo, usando camisa preta e fundo amarelo.")
    modals.forEach(modal => {
      modal.classList.add("text-bg-dark")
    })
    select.classList.add("text-bg-dark")
  }
}

/* CREATE IMG MODAL START */
const label = document.querySelector(".file-input")

function onEnter(){
  label.classList.add("active")
}

function onLeave(){
  label.classList.remove("active")
}

label.addEventListener("dragenter", onEnter)
label.addEventListener("drop", onLeave)
label.addEventListener("dragend", onLeave)
label.addEventListener("dragleave", onLeave)

const input = document.querySelector(".file-input input")
const dropzone = document.querySelector("#drop-zone")

input.addEventListener("change", () => {
  if(input.files.length > 0){
    const type = input.files[0].type
    const formats = ["image/jpeg", "image/png", "image/jpg"]
    if(!formats.includes(type)){
      alert("Formato não permitido")
      return
    }
    
    if(document.querySelector("#cover")){
      dropzone.removeChild(document.querySelector("#cover"))
    }

    const url = URL.createObjectURL(input.files[0])
    dropzone.appendChild(createIMG(url))  
    
  }  
})

function createIMG(url){
 const card = document.createElement("div")
 card.className = "card-modal"
 card.id = "cover" 
 card.style.backgroundImage = `url('${url}')`
 return card
}

/* CREATE IMG MODAL END */


/* CREATE PROJECT START */
const form = document.querySelector("form")
form.addEventListener("submit", (e) => {
  e.preventDefault()
  if(!validateInputs()) return 
  let skills = document.querySelectorAll('input[type="checkbox"]:checked')
  let technologies = Array.from(skills).map(checkbox => checkbox.value)
  let project = {
    name: document.querySelector("#floatingName").value,
    imgurl: URL.createObjectURL(input.files[0]),
    description: document.querySelector("#floatingDescription").value,
    links: {
      access: document.querySelector("#floatingLinkAccess").value,
      code: document.querySelector("#floatingLinkCode").value,
    },
    technologies
  }
})

let validateInputs = () =>{
  let inputs = document.querySelectorAll(".form-control")
  let inputsArray = Array.from(inputs).find(input => !input.value)
  if(inputsArray || input.files.length === 0){
    const alert = Object.assign(document.createElement("div"),{
      classList: ['alert alert-danger mb-0 mx-3 mt-3'],
      innerHTML: '<p class="m-0">Preencha todos os campos</p>'
    })
    const placeAlert = form.parentElement
    form.insertAdjacentElement("beforebegin", alert)
    setInterval(()=>{
      alert.remove()
    },2000)
    return false
  }
  return true
}
/* CREATE PROJECT END */