//CATEGORIAS

let juegos = JSON.parse(localStorage.getItem("juegos")) || [];
let generos = [
  "Action",
  "Adventure",
  "FPS",
  "Fighting",
  "RPG",
  "Shooter",  
];

let categoryContainer=document.getElementById("categoriesContainer")

let cargarGames = () => {
  generos.forEach((genero, index) => {
    let h1=document.createElement('h1')
    h1.setAttribute("class","title justify-content-between")
    let categoryContent=document.createElement('div')
    categoryContent.setAttribute("id",`category${genero}`)
    categoryContent.setAttribute("class","row g-3")
    
    h1.innerHTML=`${genero}<button type="button" onclick="mostrarGenero(${index})" class="btn btn-danger">See more</button>`
    categoryContainer.appendChild(h1)
    categoryContainer.appendChild(categoryContent)

    //Filtrar el array de juegos para cada genero
    let gameGrid = juegos.filter((juego) => juego.published == true);
    gameGrid = gameGrid.filter((juego) => juego.genre.includes(genero));
    gameGrid = gameGrid.sort(() => Math.random() - 0.5).slice(0, 12);

    //Generar la grilla para cada genero    
    gameGrid.forEach((juego, index) => {      
        let generosComa = juego.genre.join(", ");
      let div=document.createElement('div')
      div.setAttribute("class","col-6 col-md-3 col-lg-2")  
      let cardContent=`<div class="card">
                         <a class="game" onclick="mostrarDetalles(${index})" href="./pages/gameDetails.html?gameID=${juego.id}">
                         <img src="${juego.poster}" alt="">
                         </a>                    
                         <div class="card-body p-1">
                         <h5 title="${juego.title}" class="card-title">${juego.title}</h5>
                         <span class="card-text genre">${generosComa}</p>
                         <span class="card-text">$${juego.price||59.99}</p>
                         </div>                        
                     </div>`
     div.innerHTML=cardContent
     let categoryContent2=document.getElementById(`category${genero}`)
     categoryContent2.appendChild(div)          
    });
  });
};

//Generar Carousel
function cargarCarrusel(){
  let juegosDestacados=juegos.filter((juego)=>juego.featured==true)
  juegosDestacados = juegosDestacados.filter((juego) => juego.published == true);
  // console.log(juegosDestacados)
  juegosDestacados.sort(function(b, a) { 
    return a.id - b.id;
  });
  juegosDestacados.forEach((juego, index) => {
    
    let div=document.createElement('div')
    div.setAttribute("class","carousel-item") 
    div.innerHTML=`
    <a class="game gamePoster" onclick="mostrarDetalles(${index})" href="./pages/gameDetails.html?gameID=${juego.id}">
    <img src="${juego.poster}" class="d-block w-100 carouselBanner" alt="${juego.title}" />
    </a>
    <a class="game gameLogo" onclick="mostrarDetalles(${index})" href="./pages/gameDetails.html?gameID=${juego.id}">
    <img src="${juego.logo}" class="carouselLogo" alt="" srcset="">
    </a>
    <a class="game gameBanner" onclick="mostrarDetalles(${index})" href="./pages/gameDetails.html?gameID=${juego.id}">
    <img src="${juego.banner}" class="d-block w-100 carouselBanner" alt="${juego.title}" />
    </a>  
    
    <div class="carousel-caption">
       
      <!-- <h1>Titulo</h1>-->
      <p class="text-center">${juego.description}</p>
      <button type="button" class="btn btn-danger btn-sm" onclick="mostrarDetalles(${juego.id})" href="./pages/gameDetails.html?gameID=${juego.id}">See More</button>
    </div>`
    // <div class="d-block d-md-none">
    // <button type="button" class="btn btn-danger btn-sm" onclick="mostrarDetalles(${index})" href="./pages/gameDetails.html?gameID=${juego.id}">See More</button>
    // </div>`
    document.getElementsByClassName("carousel-inner")[0].appendChild(div)
    document.getElementsByClassName("carousel-item")[0].setAttribute("class","carousel-item active")

    let button=document.createElement('button')
    button.setAttribute("type","button")
    button.setAttribute("class","botonCarousel")
    button.setAttribute("data-bs-target","#carouselExampleCaptions")
    button.setAttribute("data-bs-slide-to",`${index}`)
    button.setAttribute("aria-current","true")
    button.setAttribute("aria-label",`Slide ${index+1}`)
    document.getElementsByClassName("carousel-indicators")[0].appendChild(button)
    document.getElementsByClassName("botonCarousel")[0].setAttribute("class","botonCarousel active")
  
  });
}

function mostrarDetalles(e) {
  window.location.href = `./pages/gameDetails.html?gameID=${e}`;
}

function mostrarGenero(e) {  
  console.log(e)
  window.location.href = `./pages/genre.html?genre=${generos[e]}`;
}

cargarCarrusel()
cargarGames();
