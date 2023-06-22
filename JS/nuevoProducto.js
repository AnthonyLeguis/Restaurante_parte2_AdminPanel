import { nuevoProducto } from './api.js';
import { mostrarAlerta } from './alerta.js';

(function(){
    const formulario = document.querySelector('#formulario');
    console.log(formulario);
    formulario.addEventListener('submit', validarProducto);

    async function validarProducto(e){
        e.preventDefault();
        //console.log(e.target);
        const nombre = document.querySelector('#nombre').value;
        const precio = document.querySelector('#precio').value;
        const categoria = document.querySelector('#categoria').value;

        //crear estructura para guardar los datos del nuevo producto
        const producto = {
            nombre,
            precio,
            categoria
        }

        if(validar(producto)){
            //caso de que algun campo este vacio
            //console.log('todos los campos deben ser obligatorios');
            mostrarAlerta('mostrarAlerta');
            return;
        }
        await nuevoProducto(producto);//campos llenos
        window.location.href = 'index.html';
    }

    function validar(obj){
        return !Object.values(obj).every(element => element !=='')
    }
})();