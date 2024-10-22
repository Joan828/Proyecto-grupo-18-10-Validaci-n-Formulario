const name = document.querySelector("#inputName")
const email = document.querySelector("#inputEmail")
const pass1 = document.querySelector("#inputPassword1")
const pass2 = document.querySelector("#inputPassword2")
let nombreCorrecto, correoCorrecto, pass1Correcta, pass2Correcta, passCoinciden = true
let usuarioCreado = false
let usuarios = []


function validarDatos(){
  if(name.value.length == 0){
    pintarYBorrarAlerta("nameAlert", "El nombre es obligatorio")
    nombreCorrecto = false
  }else{
      nombreCorrecto = true
  }
  if(email.value.length == 0){
    pintarYBorrarAlerta("emailAlert", "El correo es obligatorio")
    correoCorrecto = false

  }else if (/(\w+?@\w+?\x2E.+)/.test(email.value) !== true){
    pintarYBorrarAlerta("emailAlert", "Debe introducir una dirección de correo válida")
    correoCorrecto = false
    }else{
      correoCorrecto = true
    }

  if(pass1.value.length == 0){
    pintarYBorrarAlerta("pass1Alert", "La contraseña es obligatoria")
    pass1Correcta = false
  }else if(pass1.value.length < 8){
    pintarYBorrarAlerta("pass1Alert", "La contraseña debe tener al menos 8 caracteres")
    pass1Correcta = false
  }else{
    pass1Correcta = true
  }

  if(pass2.value.length == 0){
    pintarYBorrarAlerta("pass2Alert", "Debe repetir la contraseña")
    pass2Correcta = false
  }else{
    pass2Correcta = true
  }

  if(pass1.value !== pass2.value){
    pintarYBorrarAlerta("pass12Alert", "Las contraseñas deben coincidir")
    passCoinciden = false
  }else{
    passCoinciden = true
  }

  if(nombreCorrecto && correoCorrecto && pass1Correcta && pass2Correcta && passCoinciden){
    usuarioCreado = true
  }
}

function guardarDatos(e){
    e.preventDefault()
    validarDatos()
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
        
        window.location.href = "./show.html";
      }else{// Sino entra aquí
        //Se trae lo que haya en el navegador pasandolo de texto a objeto
        const usuariosAntiguos = JSON.parse(localStorage.getItem("user"))
        //Carga el array usuarios con los usuarios antiguos con un for
        for (let i = 0; i < usuariosAntiguos.length; i++) {
          usuarios.push(usuariosAntiguos[i])
          
        }
        //Añade al final el nuevo usuario
        usuarios.push(datosUsuario)
        //Pasamos a cadena nuestro array y lo metemos
        localStorage.setItem('user', JSON.stringify(usuarios))
        document.querySelector("#pass12Alert").className = "alert alert-success"
        document.querySelector("#pass12Alert").innerText = "Usuario creado con éxito"  
        setTimeout(() => {
          window.location.href = "./show.html";
        }, 3000);
        
        
      }

    }

  }

function pintarYBorrarAlerta(divId, mensaje){
  const div = document.getElementById(divId)
  div.className = "alert alert-danger"
  div.innerHTML = mensaje
  setTimeout(() => {
    div.className = ""
    div.innerHTML = ""
  }, 3000);
}

const btn = document.getElementById("btn")
btn.addEventListener("click", guardarDatos)
