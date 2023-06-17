let usuario = JSON.parse(localStorage.getItem("usuarios")) || [];
let logUser = JSON.parse(localStorage.getItem("userLogin"));

function handleSubmit(e) {
  e.preventDefault();
  console.log("funcion start")
  let emailLogin = document.querySelector("#emailLogin").value;
  let pass = document.querySelector("#passLogin").value;
  //buscamos el correo del usuario
  let validacion = usuario.find((user) => {
    return user.email === emailLogin;
    console.log(validacion) 
  });  
  if (validacion) {    
    if (validacion.password === pass) {      
      //guardamos la sesion del usuario
      localStorage.setItem("userLogin", JSON.stringify(validacion));      
      if(window.location.pathname.split("/").pop()=='index.html'){
        location.replace("./index.html");
      }else{
        location.replace("../index.html");
      }
      
    } else {
      alert("El correo o password son incorrectos");
    }
  } else {
    alert("El correo o password son incorrectos");
  }
}

function cerrarSesion() {
  localStorage.removeItem("userLogin");
  if(window.location.pathname.split("/").pop()=='index.html'){
    location.replace("./index.html");
  }else{
    location.replace("../index.html");
  }
}

function recuperarCuenta(){
  let imputCorreo = document.getElementById('emailRecu').value;
  // console.log(imputCorreo)
  

  let email = usuario.find((x) => x.email == imputCorreo).email||[];
  // console.log(email)
  
  if(email){
    if (email===imputCorreo){
      alert('Le enviamos un mail con la informacion necesaria para recuperar su cuenta')
    }  
   else{    
    alert('El correo ingresado no es valido');
  }
}else{    
  alert('El correo ingresado no es valido');
}
}

document.getElementById("form-login").addEventListener("submit", handleSubmit);

function modificarNav() {
  if (logUser) {
    let listContainer = document.getElementById("listaMenu");
    //reemplazar
    let login = document.getElementById("loginNav");
    let registro = document.getElementById("regNav");
    login.style.display = "none";
    registro.style.display = "none";
    // Opciones de Usuario
    let btnUser = document.createElement("li");
    btnUser.classList = "nav-item";
    let optionUser = `<a class="nav-link botones active" href="#" data-bs-toggle="modal" data-bs-target="#cerrarSesion">Hello ${logUser.nombre} ${logUser.apellido}</a>`;
    btnUser.innerHTML = optionUser;
    listContainer.appendChild(btnUser);

    // if(logUser){
    if (logUser.rol === "admin") {
      let btnAdmin = document.createElement("li");
      btnAdmin.classList = "nav-item";
      let opcionAdmin=""
      if(window.location.pathname.split("/").pop()=='index.html'){
        opcionAdmin = `<a class="nav-link botones active"
       href="./pages/admin.html">Admin</a>`;
      }else{
        opcionAdmin = `<a class="nav-link botones active"
       href="../pages/admin.html">Admin</a>`;
      }
      
      btnAdmin.innerHTML = opcionAdmin;
      listContainer.appendChild(btnAdmin);
    }
    // }
  }
}

modificarNav();