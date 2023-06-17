let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

class Usuario {
  constructor(nombre, apellido, email, password, rol = "usuario") {
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.password = password;
    this.rol = rol;
  }
}

const guardarUsuario = function (e) {
  e.preventDefault();
  let nombre = document.getElementById("textName").value;
  let apellido = document.getElementById("textSurname").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let password2 = document.getElementById("password2").value;

  //VALIDAR CONTRASEÑAS
  if (password !== password2) {
    return alert("Las contraseñas no coinciden.");
  }

  let validar = usuarios.find((user) => {
    return user.email === email;
  });

  if (validar) {
    return alert(
      "El correo ya esta registrado. Inicie sesion con su email y contraseña."
    );
  }

  usuarios.push(new Usuario(nombre, apellido, email, password));
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  document.getElementById("formRegistro").reset();
  alert("Usuario registrado con éxito.");
  location.replace("../index.html");
};

document.getElementById("formRegistro");
addEventListener("submit", guardarUsuario);
