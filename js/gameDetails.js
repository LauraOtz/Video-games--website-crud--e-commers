let juegos = JSON.parse(localStorage.getItem("juegos")) || [];

function rellenarCampos() {
  //Trae el gameID de url
  let url_string = window.location.href;
  let url = new URL(url_string);
  let selectedGame = url.searchParams.get("gameID");

  //Busca el juego por su ID
  let game = juegos.find((x) => x.id == selectedGame);
  // console.log(game)

  document.title = `${game.title} on RollingGames`;
  document.getElementById("game_title").innerText = game.title;
  document.getElementById("game_developer").innerHTML = game.developer;
  document.getElementById("price").innerHTML = `$${game.price || 59.99}`;
  // document.getElementById("game_logo").setAttribute("src", game.logo);
  // document.getElementById("game_logo").setAttribute("alt", game.title);

  document.getElementById("description").innerText = game.description;
  // document.querySelector(".library_poster").setAttribute("src", game.poster);
  document.getElementById("library_hero_img").setAttribute("src", game.banner);
  document.getElementById("video1").setAttribute("src", game.video);
  document.getElementById("screenshot1").setAttribute("href", game.screenshot1);
  document.getElementById("screenshot1").getElementsByTagName("img")[0].setAttribute("src", game.screenshot1);
  document.getElementById("screenshot2").setAttribute("href", game.screenshot2);
  document.getElementById("screenshot2").getElementsByTagName("img")[0].setAttribute("src", game.screenshot2);
  document.getElementById("screenshot3").setAttribute("href", game.screenshot3);
  document.getElementById("screenshot3").getElementsByTagName("img")[0].setAttribute("src", game.screenshot3);
  document.getElementById("thumbnail1").setAttribute("src", game.screenshot1);
  document.getElementById("thumbnail2").setAttribute("src", game.screenshot2);
  document.getElementById("thumbnail3").setAttribute("src", game.screenshot3);
  game.genre.forEach(genero => {
    // console.log(genero)
    let span=document.createElement('span')
    span.setAttribute("class","infoGenre")
    span.innerHTML=genero
    document.getElementById("generos").appendChild(span)
  });
}

//Pop up
$(document).ready( function() {
  $(".popup-open").click( function(e) {
      $("#popup:visible").hide(); //hide popup if it is open
      e.preventDefault(); // don't follow link
      $("#image-placeholder").attr("src", $(this).attr("href")); // replace image src with href from the link that was clicked
      $("#popup").fadeIn("fast"); //show popup
  });
  $("#popup-close").click( function(e) {
      e.preventDefault();
      $("#popup").fadeOut("fast");
  });
});


document.getElementsByClassName("thumbnailCar")
addEventListener('click', function () {
  document.querySelector("#video1").pause()
})

function playVideo(){
  setTimeout(function(){ document.querySelector("#video1").play(); }, 500);  
}

rellenarCampos();
