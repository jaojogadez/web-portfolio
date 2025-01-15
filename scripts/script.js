const switchButton = document.querySelector(".switch");
switchButton.onclick = () => toggleMode();
const otherSwitchButton = document.querySelector(".navbar .switch");
otherSwitchButton.onclick = () => toggleMode();

function toggleMode() {
  const html = document.documentElement;
  html.classList.toggle("light");
  const image = document.querySelector("#profile img");
  const modals = document.querySelectorAll(".modal-content input");
  const select = document.querySelector("select");
  if (html.classList.contains("light")) {
    image.setAttribute("src", "./assets/avatar-light.png");
    image.setAttribute(
      "alt",
      "Foto de João Pedro sorrindo, usando camisa preta e fundo azul."
    );
    modals.forEach((modal) => {
      modal.classList.remove("text-bg-dark");
    });
    select.classList.remove("text-bg-dark");
  } else {
    image.setAttribute("src", "./assets/avatar.png");
    image.setAttribute(
      "alt",
      "Foto de João Pedro sorrindo, usando camisa preta e fundo amarelo."
    );
    modals.forEach((modal) => {
      modal.classList.add("text-bg-dark");
    });
    select.classList.add("text-bg-dark");
  }
}

/* CREATE IMG MODAL START */
const label = document.querySelector(".file-input");

function onEnter() {
  label.classList.add("active");
}

function onLeave() {
  label.classList.remove("active");
}

label.addEventListener("dragenter", onEnter);
label.addEventListener("drop", onLeave);
label.addEventListener("dragend", onLeave);
label.addEventListener("dragleave", onLeave);

const input = document.querySelector(".file-input input");
const dropzone = document.querySelector("#drop-zone");

input.addEventListener("change", () => {
  if (input.files.length > 0) {
    const type = input.files[0].type;
    const formats = ["image/jpeg", "image/png", "image/jpg"];
    if (!formats.includes(type)) {
      alert("Formato não permitido");
      return;
    }
    if (document.querySelector("#cover")) {
      dropzone.removeChild(document.querySelector("#cover"));
    }
    const url = URL.createObjectURL(input.files[0]);
    dropzone.appendChild(createIMG(url));
  }
});

const card = document.createElement("div");
function createIMG(url) {
  card.className = "card-modal";
  card.id = "cover";
  card.style.backgroundImage = `url('${url}')`;
  return card;
}

/* CREATE IMG MODAL END */

/* CREATE PROJECT START */
const form = document.querySelector("form");
let projects = document.querySelector("#projects");
const $btnCreate = document.querySelector(".modal-footer input")

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validateInputs()) {
    return;
  } else {
    accepData();
  }
});

let inputs = document.querySelectorAll(".form-control");
let validateInputs = () => {
  let inputsArray = Array.from(inputs).find((input) => !input.value);
  if (inputsArray || input.files.length === 0) {
    const alert = Object.assign(document.createElement("div"), {
      classList: ["alert alert-danger mb-0 mx-3 mt-3"],
      innerHTML: '<p class="m-0">Preencha todos os campos</p>',
    });
    form.insertAdjacentElement("beforebegin", alert);
    setInterval(() => {
      alert.remove();
    }, 2000);
    return false;
  }
  return true;
};

let project = {}
const addBtn = document.querySelector(".bi-plus-square")
const newProjectPlace = addBtn.parentElement.parentElement
const modal = document.querySelector(".modal")

let accepData = () => {
  let skills = document.querySelectorAll('input[type="checkbox"]:checked');
  let technologies = Array.from(skills).map((checkbox) => checkbox.value);
  project = {
    name: document.querySelector("#floatingName").value,
    imgurl: URL.createObjectURL(input.files[0]),
    description: document.querySelector("#floatingDescription").value,
    links: {
      access: document.querySelector("#floatingLinkAccess").value,
      code: document.querySelector("#floatingLinkCode").value,
    },
    technologies,
  };
  createProject();
  hiddenModal();
};

let createProject = () => {
  const skills = project.technologies.map(technology => `<i class="devicon-${technology}-plain colored fs-4"></i>`).join(' ')
  let strutureProject = `
    <div class="col" data-aos="fade-up">
      <div class="shadow-lg rounded-bottom rounded-top">
        <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-1 shadow-sm rounded-top d-flex align-items-center justify-content-center" style="background-image: url('${project.imgurl}');">
          <div class="dropdown position-absolute">
            <button class="btn btn-dark btn-sm rounded-circle dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-three-dots-vertical"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-dark">
              <li><a class="dropdown-item" onClick="editPost(this)"><i class="bi bi-pencil-square"></i> Edit</a></li>
              <li><a class="dropdown-item text-bg-danger" onClick="deletePost(this)"><i class="bi bi-trash3"></i> Delete</a></li>
            </ul>
          </div>
        </div>
          <div class="card-body text-bg-light p-3 rounded-bottom">
            <h3 class="lh-1 fw-semibold" id="name">${project.name}</h3>
            <p class="card-text" id="description">
              ${project.description}
            </p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <a href="${project.links.access}" target="_blank">
                  <button type="button" class="btn btn-sm btn-outline-secondary">
                    <i class="bi bi-app-indicator"></i> Access
                  </button>
                </a>
                <a href="${project.links.code}" target="_blank">
                  <button type="button" class="btn btn-sm btn-outline-secondary">
                    <i class="bi bi-github"></i> Code
                  </button>
                </a>
              </div>
              <small class="text-muted d-flex flex-row-reverse gap-1" id="skills">      
                ${skills}
              </small>
            </div>
          </div>
      </div>
    </div>
    `;
  newProjectPlace.insertAdjacentHTML("beforebegin", strutureProject) 
}
/* CREATE PROJECT END */

let deletePost = (e) => {
  e.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove()
}

let editPost = (e) =>{
  const bootstrapModal = bootstrap.Modal.getInstance(modal)
  
  const projectCard = e.closest(".col")
  const projectName = projectCard.querySelector("#name").textContent.trim()
  const projectDescription = projectCard.querySelector("#description").textContent.trim()
  const projectAccessLink = projectCard.querySelector("a[href]").href
  const projectCodeLink = projectCard.querySelectorAll("a[href]")[1].href
  const projectImage = projectCard.querySelector(".card-cover").style.backgroundImage
  const url = projectImage.slice(5, -2)

  const skills = projectCard.querySelector("#skills").innerHTML
  const checkboxs = document.querySelectorAll(".ui-checkbox")
  checkboxs.forEach(checkbox => {
    checkbox.checked = skills.includes(checkbox.value)
  })

  document.querySelector("#floatingName").value = projectName
  document.querySelector("#floatingDescription").value = projectDescription
  document.querySelector("#floatingLinkAccess").value = projectAccessLink
  document.querySelector("#floatingLinkCode").value = projectCodeLink
  // document.querySelector("#cover").style.backgroundImage = `url('${url}')`

  e.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove()

  bootstrapModal.show() 
}

let hiddenModal = () => { 
  const bootstrapModal = bootstrap.Modal.getInstance(modal)
  Array.from(inputs).forEach(input => {input.value = ""})
  form.reset()
  card.style.backgroundImage = `url('')`;
  bootstrapModal.hide()
}


