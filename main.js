const name = document.querySelector("#inputName")
const email = document.querySelector("#inputEmail")
const pass1 = document.querySelector("#inputPassword1")
const pass2 = document.querySelector("#inputPassword2")
let nombreCorrecto, correoCorrecto, pass1Correcta, pass2Correcta, passCoinciden = true
let usuarioCreado = false
let usuarios = []


function validarDatos(e){
  e.preventDefault()

  if(name.value.length == 0){
    document.querySelector("#nameAlert").className = "alert alert-danger"
    document.querySelector("#nameAlert").innerText = "El nombre es obligatorio"
    nombreCorrecto = false
  }else{
      document.querySelector("#nameAlert").className = ""
      document.querySelector("#nameAlert").innerText = ""
      nombreCorrecto = true
  }
  if(email.value.length == 0){
    document.querySelector("#emailAlert").className = "alert alert-danger"
    document.querySelector("#emailAlert").innerText = "El correo es obligatorio"
    correoCorrecto = false

  }else if (/(\w+?@\w+?\x2E.+)/.test(email.value) !== true){
    document.querySelector("#emailAlert").className = "alert alert-danger"
    document.querySelector("#emailAlert").innerText = "Debe introducir una dirección de correo válida"
    correoCorrecto = false
    }else{
      document.querySelector("#emailAlert").className = ""
      document.querySelector("#emailAlert").innerText = ""
      correoCorrecto = true
    }

  if(pass1.value.length == 0){
    document.querySelector("#pass1Alert").className = "alert alert-danger"
    document.querySelector("#pass1Alert").innerText = "La contraseña es obligatoria"
    pass1Correcta = false
  }else if(pass1.value.length < 8){
    document.querySelector("#pass1Alert").className = "alert alert-danger"
    document.querySelector("#pass1Alert").innerText = "La contraseña debe tener al menos 8 caracteres"
    pass1Correcta = false
  }else{
    document.querySelector("#pass1Alert").className = ""
    document.querySelector("#pass1Alert").innerText = ""
    pass1Correcta = true
  }

  if(pass2.value.length == 0){
    document.querySelector("#pass2Alert").className = "alert alert-danger"
    document.querySelector("#pass2Alert").innerText = "Debe repetir la contraseña"
    pass2Correcta = false
  }else{
    document.querySelector("#pass2Alert").className = ""
    document.querySelector("#pass2Alert").innerText = ""
    pass2Correcta = true
  }

  if(pass1.value !== pass2.value){
    document.querySelector("#pass12Alert").className = "alert alert-danger"
    document.querySelector("#pass12Alert").innerText = "Las contraseñas deben coincidir"
    passCoinciden = false
  }else{
    document.querySelector("#pass12Alert").className = ""
    document.querySelector("#pass12Alert").innerText = ""
    passCoinciden = true
  }

  if(nombreCorrecto && correoCorrecto && pass1Correcta && pass2Correcta && passCoinciden){
    document.querySelector("#pass12Alert").className = "alert alert-success"
    document.querySelector("#pass12Alert").innerText = "Usuario creado con éxito"
    usuarioCreado = true
  }
}

function guardarDatos(e){
    e.preventDefault()
    let datosUsuario = {
        Nombre: name.value,
        Correo: email.value,
        Contraseña: pass1.value
      }

    if(usuarioCreado){
      //Si el usuario tiene todos los datos correctos entra aquí

      //Si es el primer usuario que se mete, entra aqui
      if(JSON.parse(localStorage.getItem("user")) == null){
        //localStorage.setItem('user', JSON.stringify(datosUsuario))
        //Añadimos el objeto a nuestro array de objetos
        usuarios.push(datosUsuario)
        //Pasamos a cadena nuestro array y lo metemos
        localStorage.setItem('user', JSON.stringify(usuarios))
        console.log(usuarios);
        
        window.location.href = "./show.html";
      }else{// Sino entra aquí
        //Se trae lo que haya en el navegador pasandolo de texto a objeto
        const usuariosAntiguos = JSON.parse(localStorage.getItem("user"))
        //Carga el array usuarios con los usuarios antiguos con un for
        console.log(usuariosAntiguos[0]);
        for (let i = 0; i < usuariosAntiguos.length; i++) {
          usuarios.push(usuariosAntiguos[i])
          
        }
        //Añade al final el nuevo usuario
        usuarios.push(datosUsuario)
        //Pasamos a cadena nuestro array y lo metemos
        localStorage.setItem('user', JSON.stringify(usuarios))
        console.log(usuarios);

        window.location.href = "./show.html";
        
      }

    }

  }

const btn = document.getElementById("btn")
btn.addEventListener("click",validarDatos)
btn.addEventListener("click",guardarDatos)
