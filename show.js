let usuariosArray = JSON.parse(localStorage.getItem("user"))
const nombre = JSON.parse(localStorage.getItem("user")).Nombre
const correo = JSON.parse(localStorage.getItem("user")).Correo
const contenedor = document.querySelector("#contCards")

for (let i = 0; i < usuariosArray.length; i++) {
    const usuario = usuariosArray[i];
    const nuevoDiv = document.createElement("div")
    const contenido = `<div class="card w-50 mt-3">
    <div class="card-body">
        <h5 class="card-title">Nombre: ${usuario.Nombre}</h5>
        <p class="card-text">Correo: ${usuario.Correo}</p>
    </div>
    </div>`

nuevoDiv.innerHTML = contenido
contenedor.appendChild(nuevoDiv)
    
}

