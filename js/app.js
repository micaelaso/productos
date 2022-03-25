const carrito = document.getElementById('carrito');
const catalogos = document.getElementById('lista-catalogo');
const listaCatalogos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

cargarEventListeners();

function cargarEventListeners() {
     catalogos.addEventListener('click', comprarCatalogo);
     carrito.addEventListener('click', eliminarCatalogo);
     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
     document.addEventListener('DOMContentLoaded', leerLocalStorage);
}


function comprarCatalogo(e) {
     e.preventDefault();

     if(e.target.classList.contains('agregar-carrito')){
          const catalogo = e.target.parentElement.parentElement;
          leerDatosCatalogo(catalogo);
     }
}


function leerDatosCatalogo(catalogo) {
     const infoCatalogo = {
          imagen: catalogo.querySelector('img').src,
          titulo: catalogo.querySelector('h3').textContent,
          precio: catalogo.querySelector('.precio span').textContent,
          id: catalogo.querySelector('button').getAttribute('data-id')
     }
     insertarCarrito(infoCatalogo);
}

function insertarCarrito(catalogo) {
     const row = document.createElement('tr');
     row.innerHTML = `
          <td>
               <img src="${catalogo.imagen}" width=100>
          </td>
          <td>${catalogo.titulo}</td>
          <td>${catalogo.precio}</td>
          <td>
               <button href="#" class="borrar-catalogo" data-id="${catalogo.id}">X</a>
          </td>
     `; 
     listaCatalogos.appendChild(row);
     guardarCatalogoLocalStorage(catalogo);
}

function eliminarCatalogo(e) {
     e.preventDefault();

     let catalogo,
          catalogoId;

     if(e.target.classList.contains('borrar-catalogo')){
          e.target.parentElement.parentElement.remove();
          catalogo = e.target.parentElement.parentElement;
          catalogoId = catalogo.querySelector('button').getAttribute('data-id');
     }

     eliminarCatalogoLocalStorage(catalogoId);
}


function vaciarCarrito() {
     while(listaCatalogos.firstChild) {
          listaCatalogos.removeChild(listaCatalogos.firstChild);
     }

     vaciarLocalStorage();

     return false;
}


function guardarCatalogoLocalStorage(catalogo) {
     let catalogos;

     catalogos = obtenerCatalogosLocalStorage();

     catalogos.push(catalogo);

     localStorage.setItem('catalogos', JSON.stringify(catalogos));
}




function leerLocalStorage() {
     let catalogosLS;

     catalogosLS = obtenerCatalogosLocalStorage();

     catalogosLS.forEach(function(catalogo){

          const row = document.createElement('tr');
          row.innerHTML = `
               <td>
                    <img src="${catalogo.imagen}" width=100>
               </td>
               <td>${catalogo.titulo}</td>
               <td>${catalogo.precio}</td>
               <td>
                    <button href="#" class="borrar-catalogo" data-id="${catalogo.id}">X</a>
               </td>
          `;
          listaCatalogos.appendChild(row);

     });
}


function vaciarLocalStorage() {
     localStorage.clear();
}