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

let skills = []

let links = {
  access: "https://example.com",
  code: "https://example.com"
}

const addBtn = document.querySelector(".bi-plus-square")
const newProjectPlace = addBtn.parentElement.parentElement

function createNewProject(name, image, description, links, skills){
  const strutureProject = `
        <div class="col" data-aos="fade-up">
          <div class="shadow-lg rounded-bottom rounded-top">
            <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-1 shadow-sm rounded-top" style="background-image: url('${image}')"></div>
            <div class="card-body text-bg-light p-3 rounded-bottom">
              <h3 class="lh-1 fw-semibold" id="name">${name}</h3>
              <p class="card-text" id="description">
                ${description}
              </p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <a href="${links.access}" target="_blank">
                    <button type="button" class="btn btn-sm btn-outline-secondary"><i class="bi bi-app-indicator"></i> Access</button>
                  </a>
                  <a href="${links.code}" target="_blank">
                    <button type="button" class="btn btn-sm btn-outline-secondary"><i class="bi bi-github"></i> Code</button>
                  </a>
                </div>
                <small class="text-muted" id="skills">
                ${skills.map(skill => ` <i class="${skill}"></i>` ).join('')}
                </small>
              </div>
            </div>
          </div>
        </div>
    `
  newProjectPlace.insertAdjacentHTML("beforebegin", strutureProject)
}

const label = document.querySelector(".header")

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