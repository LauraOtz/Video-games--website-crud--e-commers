let logUser2 = JSON.parse(localStorage.getItem("userLogin")) || [];
const validarUsuario = () => {
  if (logUser2.rol !== "admin") {
    document.querySelector("main").innerHTML = "";

    let div = document.createElement("div");
    div.classList = "container";
    div.setAttribute("class","containerPermiso")
    let estructura = `<div class="row mt-5">
    <div class="col">
      <div class="alert alert-danger" role="alert">
        No tiene permisos para ver esta página
      </div>
      <div>
      <Button class="btn btn-primary">
      <a href="../index.html" style="text-decoration: none !important;color:white;">Volver</a>
      </Button>
      </div>
    </div>
  </div>`;
    div.innerHTML = estructura;
    document.querySelector("main").appendChild(div);
  } else {
    cargarTabla();
  }
};

let juegos = JSON.parse(localStorage.getItem("juegos")) || [];

//Definir clase Juego
class Juego {
  constructor(
    id,
    title,
    genre,
    description = null,
    developer = null,
    release_date,
    poster,
    banner,
    logo,
    screenshot1,
    screenshot2,
    screenshot3,
    video,
    icon,
    price = 0,
    published = false,
    featured = false
  ) {
    this.id = id;
    this.title = title;
    this.genre = genre;
    this.description = description;
    this.developer = developer;
    this.release_date = release_date;
    this.poster = poster;
    this.banner = banner;
    this.logo = logo;
    this.screenshot1 = screenshot1;
    this.screenshot2 = screenshot2;
    this.screenshot3 = screenshot3;
    this.video = video;
    this.icon = icon;
    this.price = price;
    this.published = published;
    this.featured = featured;
  }
}

//Cargar Tabla
const cargarTabla = () => {
  let trHTML = "";
  juegos.map(function (juego, index) {
    trHTML += "<tr>";
    trHTML += `<td>${juego.id}</td>`;
    trHTML += `<td><a onclick="mostrarDetalles(${index})" href="../pages/gameDetails.html?gameID=${juego.id}"><img width="100px" src="${juego.icon}" class="avatar"></a></td>`;
    trHTML += `<td><a class="gameLink" onclick="mostrarDetalles(${index})" href="../pages/gameDetails.html?gameID=${juego.id}">${juego.title}</a></td>`;
    trHTML += `<td class="d-none d-md-table-cell">${juego.release_date}</td>`;
    trHTML += `<td class="d-none d-md-table-cell">${juego.developer}</td>`;
    trHTML += `<td><button type="button" class="btn btn-outline-secondary" onclick="editGame('${index}')">Edit</button>`;
    trHTML += `<button type="button" class="btn btn-outline-danger" onclick="deleteGame('${index}')">Del</button></td>`;
    trHTML += "</tr>";
    document.getElementById("mytable").innerHTML = trHTML;
    juegos = JSON.parse(localStorage.getItem("juegos")) || [];
  });
};

//Inicializar Modales
let myModalCreate = new bootstrap.Modal(document.getElementById("formCreate"));
let myModalEdit = new bootstrap.Modal(document.getElementById("formEdit"));

//Crear nuevo Juego - Mostar Modal
function createGameModal() {
  myModalCreate.show();
}

//Crear nuevo Juego - Submit
function createGame(e) {
  e.preventDefault();
  let id = juegos[juegos.length - 1].id + 1;
  let title = document.getElementById("gameTitle").value;
  // console.log(generosSelect)
  let genre = generosSelect;
  // console.log(genre)
  let description = document.getElementById("gameDescription").value;
  let developer = document.getElementById("gameDeveloper").value;
  let release_date = document.getElementById("gameReleaseDate").value;

  let monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let t = new Date(release_date);
  release_date = `${t.getDate()} ${
    monthNames[t.getMonth()]
  }, ${t.getFullYear()}`;

  let poster = document.getElementById("gameLinkPoster").value;
  let banner = document.getElementById("gameLinkBanner").value;
  let logo = document.getElementById("gameLogo").value;
  let screenshot1 = document.getElementById("gameScreen1").value;
  let screenshot2 = document.getElementById("gameScreen2").value;
  let screenshot3 = document.getElementById("gameScreen3").value;
  let video = document.getElementById("gameLinkVideo").value;
  let icon = document.getElementById("gameLinkIcon").value;
  let price = document.getElementById("gamePrice").value;
  let published = document.getElementById("published").checked;
  let featured = document.getElementById("featured").checked;

  juegos.push(
    new Juego(
      id,
      title,
      genre,
      description,
      developer,
      release_date,
      poster,
      banner,
      logo,
      screenshot1,
      screenshot2,
      screenshot3,
      video,
      icon,
      price,
      published,
      featured
    )
  );
  localStorage.setItem("juegos", JSON.stringify(juegos));
  document.getElementById("gameForm").reset();
  myModalCreate.hide();
  alert(`Game ${title} has been created sucessfully!`);
  cargarTabla();
}

//Editar Juego - Mostrar Modal

function editGame(index) {
  myModalEdit.show();
  cargarDatosModal(index);
}

//Editar Juego - Cargar Tabla

function cargarDatosModal(index) {
  document
    .getElementById("gameFormEdit")
    .setAttribute("onSubmit", `actualizarJuego(event,${index})`);
  document.getElementById("gameEditTitle").value = juegos[index].title;
  document.getElementById("gameEditGenre").value =
    juegos[index].genre.join(", ");
  document.getElementById("gameEditDescription").value =
    juegos[index].description;
  document.getElementById("gameEditDeveloper").value = juegos[index].developer;
  let releaseDate = new Date(juegos[index].release_date)
    .toISOString()
    .split("T")[0];
  document.getElementById("gameEditReleaseDate").value = releaseDate;
  document.getElementById("gameEditPrice").value = juegos[index].price || 59.99;
  document.getElementById("gameEditLinkPoster").value = juegos[index].poster;
  document.getElementById("gameEditLinkBanner").value = juegos[index].banner;
  document.getElementById("gameEditLogo").value = juegos[index].logo;
  document.getElementById("gameEditScreen1").value = juegos[index].screenshot1;
  document.getElementById("gameEditScreen2").value = juegos[index].screenshot2;
  document.getElementById("gameEditScreen3").value = juegos[index].screenshot3;
  document.getElementById("gameEditLinkVideo").value = juegos[index].video;
  document.getElementById("gameEditLinkIcon").value = juegos[index].icon;
  document.getElementById("editPublished").checked =
    juegos[index].published || false;
  document.getElementById("editFeatured").checked =
    juegos[index].featured || false;
}

//Actualizar el juego--------------------------------
const actualizarJuego = function (e, index) {
  e.preventDefault();
  //tenemos que obtener todos los datos del formulario
  let id = juegos[index].id;
  let title = document.getElementById("gameEditTitle").value;
  let genre = document.getElementById("gameEditGenre").value.split(", ");
  let description = document.getElementById("gameEditDescription").value;
  let developer = document.getElementById("gameEditDeveloper").value;
  let release_date = document.getElementById("gameEditReleaseDate").value;
  let monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let t = new Date(release_date);
  release_date = `${t.getDate()} ${
    monthNames[t.getMonth()]
  }, ${t.getFullYear()}`;
  let poster = document.getElementById("gameEditLinkPoster").value;
  let banner = document.getElementById("gameEditLinkBanner").value;
  let logo = document.getElementById("gameEditLogo").value;
  let screenshot1 = document.getElementById("gameEditScreen1").value;
  let screenshot2 = document.getElementById("gameEditScreen2").value;
  let screenshot3 = document.getElementById("gameEditScreen3").value;
  let video = document.getElementById("gameEditLinkVideo").value;
  let icon = document.getElementById("gameEditLinkIcon").value;
  let price = document.getElementById("gameEditPrice").value;
  let published = document.getElementById("editPublished").checked;
  let featured = document.getElementById("editFeatured").checked;

  const newData = {
    id,
    title,
    genre,
    description,
    developer,
    release_date,
    poster,
    banner,
    logo,
    screenshot1,
    screenshot2,
    screenshot3,
    video,
    icon,
    price,
    published,
    featured,
  };

  juegos.splice(index, 1, newData);
  localStorage.setItem("juegos", JSON.stringify(juegos));
  myModalEdit.hide();
  cargarTabla();
};
//---------------------------------------------------------

//Borrar Juego
const deleteGame = (index) => {
  let validar = confirm(
    `Are you sure you want to delete id: ${juegos[index].id} - ${juegos[index].title}?`
  );

  if (validar) {
    alert(`${juegos[index].title} has been deleted`);
    juegos.splice(index, 1);
    localStorage.setItem("juegos", JSON.stringify(juegos));
    cargarTabla();
  }
};

// cargarTabla();

function mostrarDetalles(e) {
  location.replace = `../pages/gameDetails.html?gameID=${juego.id}`;
}

let generosSelect = [];
function setGenero(e) {
  // console.log(e)
  generosSelect = e;
}

validarUsuario();
