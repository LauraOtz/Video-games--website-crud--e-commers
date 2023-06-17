let juegos = JSON.parse(localStorage.getItem("juegos")) || [];
let generos = ["Action","Horror","Fighting","Action RPG","RPG","FPS","Flight","Shooter"]

let gameContainer = document.getElementById("gameContainer")

const loadGames = () => {  
  let url_string = window.location.href;
  let url = new URL(url_string);
  let searchResults = url.searchParams.get("searchResults");
  let juegosFilter = juegos.filter((juego) =>
    juego.title.toLowerCase().includes(searchResults.toLowerCase())
  );
  // console.log(juegosFilter)

  juegosFilter = juegosFilter.filter((juego) => juego.published == true);
  document.getElementById("searchResults").innerHTML=`${juegosFilter.length} results match your search`
  document.getElementById("tituloGenero").innerHTML=`Search Results for: "${searchResults}"`  
  juegosFilter.map(function (juego, index) {
    let generos = juego.genre.join(", ");
    let div = document.createElement("div");
    div.setAttribute("class", "col-6 col-md-3 col-lg-2");
    let cardContent = `<div class="card border-0">
                    <a class="game" onclick="mostrarDetalles(${index})" href="../pages/gameDetails.html?gameID=${
      juego.id
    }">
                    <img src="${juego.poster}" alt="">
                    </a>                    
                    <div class="card-body p-1">
                    <h5 title="${juego.title}" class="card-title">${
      juego.title
    }</h5>
                    <span class="card-text genre">${generos}</p>
                    <span class="card-text">$${juego.price || 59.99}</p>
                    </div>
                    
                </div>`;
    div.innerHTML = cardContent;
    gameContainer.appendChild(div);
  });
};

loadGames();

function mostrarDetalles(e) {
  location.replace = `../pages/gameDetails.html?gameID=${juego.id}`;
}


