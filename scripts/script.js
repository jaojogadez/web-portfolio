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

let links = {
    access: "https://example.com",
    code: "https://example.com"
}

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
                  <a href="${links.access}">
                    <button type="button" class="btn btn-sm btn-outline-secondary"><i class="bi bi-app-indicator"></i> Access</button>
                  </a>
                  <a href="${links.code}">
                    <button type="button" class="btn btn-sm btn-outline-secondary"><i class="bi bi-github"></i> Code</button>
                  </a>
                </div>
                <small class="text-muted" id="skills">      
                  
                </small>
              </div>
            </div>
          </div>
        </div>
    `
}