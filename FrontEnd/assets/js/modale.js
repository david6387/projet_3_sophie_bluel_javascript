const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");
const galleryScreen = document.querySelector(".modal");
const uploadScreen = document.querySelector(".modal-two");
const btnCloseModal = document.querySelector(".close-modal");
const btnCloseModalTwo = uploadScreen.querySelector(".close-modal");
const secondModalTrigger = document.querySelector(".add-photo-btn");
const overlay = document.querySelector(".overlay");
const previousModalTrigger = document.querySelector(".previous-modal");
const deleteGallery = document.querySelector(".supprimer");
const validationButton = document.querySelector(".validation-btn");

modalTriggers.forEach((trigger) =>
  trigger.addEventListener("click", toggleModal)
);
btnCloseModal.addEventListener("click", function (event) {
  modalContainer.classList.remove("display-block");
  modalContainer.classList.add("hidden");
});
btnCloseModalTwo.addEventListener("click", function (event) {
  modalContainer.classList.remove("display-block");
  modalContainer.classList.add("hidden");
});
overlay.addEventListener("click", function (event) {
  modalContainer.classList.remove("display-block");
  modalContainer.classList.add("hidden");
});
secondModalTrigger.addEventListener("click", function (event) {
  galleryScreen.classList.add("hidden");
  galleryScreen.classList.remove("display-flex");
  uploadScreen.classList.add("display-flex");
  uploadScreen.classList.remove("hidden");
});
previousModalTrigger.addEventListener("click", function (event) {
  galleryScreen.classList.add("display-flex");
  galleryScreen.classList.remove("hidden");
  uploadScreen.classList.remove("display-flex");
  uploadScreen.classList.add("hidden");
});

function toggleModal() {
  modalContainer.classList.add("display-block");
  modalContainer.classList.remove("hidden");
}

//--------------------------------------/

// let works = [];

const galleryModal = document.querySelector(".gallery-modal");

// const apiWorks = async () => {
//   await fetch("http://localhost:5678/api/works")
//     .then((response) => response.json())
//     .then((worksResponse) => {
//       works = worksResponse;
//     });
// };

const displayWorksOnModal = async () => {
  await apiWorks();

  for (let work of works) {
    let figure = document.createElement("figure");
    figure.setAttribute("data-categoryid", work.categoryId);
    figure.setAttribute("class", "figure-modale");
    let img = document.createElement("img");
    let txt = document.createElement("p");
    txt.innerText = "éditer";
    let icone = document.createElement("i");
    icone.setAttribute("class", "fa-solid fa-trash-can");
    icone.addEventListener("click", () => {
      fetch(`http://localhost:5678/api/works/${work.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        console.log(response.status);
        displayWorks();
        displayWorksOnModal();
      });
    });

    img.setAttribute("src", work.imageUrl);
    img.setAttribute("alt", work.title);

    figure.appendChild(img);
    figure.appendChild(txt);

    figure.appendChild(icone);
    galleryModal.appendChild(figure);
    addMoveCursorToImages(figure);
  }
};
displayWorksOnModal();

// Formulaire ---------------------------------------

const selectCategory = document.querySelector("#project-category");

async function showCategory() {
  await apiCategories();
  for (let category of categories) {
    let option = document.createElement("option");
    option.value = category.id;
    option.innerText = category.name;
    selectCategory.appendChild(option);
  }
}

showCategory();

function previewImage() {
  const file = document.getElementById("img-input");
  const labelAddPhoto = document.querySelector(".add-picture");

  if (!file?.files) {
    return;
  }

  const fileReader = new FileReader();

  fileReader.onload = function (event) {
    document.getElementById("preview").setAttribute("src", event.target.result);
    labelAddPhoto.classList.add("hidden");
    preview.classList.remove("hidden");
    labelAddPhoto.classList.remove("display-flex");
  };
  fileReader.readAsDataURL(file?.files[0]);
}

const formModal = document.querySelector(".form-modal");
const projectImage = document.querySelector("#img-input");
const projectTitle = document.querySelector("#project-title");
const projectCategory = document.querySelector("#project-category");
const titleError = document.querySelector("#project-title-error");
const categoryError = document.querySelector("#project-category-error");
const imageError = document.querySelector("#image-error");

formModal.addEventListener("submit", function (event) {
  event.preventDefault();

  if (projectTitle.value === "") {
    projectTitle.style.border = "2px solid red";
    titleError.innerText = "Ce champ ne doit pas être vide";
  }
});

// validationButton.style.background = "#1D6154";

function addMoveCursorToImages(figure) {
  if (!figure) {
    return;
  }

  let iconeCroix = document.createElement("i");

  figure.addEventListener("mouseover", (e) => {
    iconeCroix.setAttribute("class", "fa-solid fa-arrows-up-down-left-right");
    figure.appendChild(iconeCroix);
  });
  figure.addEventListener("mouseout", (e) => {
    figure.removeChild(iconeCroix);
  });
}
