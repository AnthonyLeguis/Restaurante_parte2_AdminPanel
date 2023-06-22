import { obtenerProducto, editarProducto } from "./api.js";
import { mostrarAlerta } from "./alerta.js";

(function(){
    
    const nombreInput = document.querySelector('#nombre');
    const precioInput = document.querySelector('#precio');
    const categoriaInput = document.querySelector('#categoria');
    const idInput = document.querySelector('#id');

    document.addEventListener('DOMContentLoaded',async()=>{
        //verificar que el producto exista
        const parametroURL = new URLSearchParams(window.location.search);
        //console.log(parametroURL);
        const idProducto = parseInt(parametroURL.get('id'));
        //console.log(idProducto);
        const producto = await obtenerProducto(idProducto);
        //console.log(producto);
        mostrarProducto(producto);

        //registrar en el formulario
        const formulario = document.querySelector('#formulario');
        formulario.addEventListener('submit',validarProducto);

    });

    function mostrarProducto(producto){
        //console.log(producto);
        const {nombre,precio,categoria,id} = producto;

        nombreInput.value = nombre;
        precioInput.value = precio;
        categoriaInput.value = categoria;
        idInput.value = id;
    };
    //console.log("Entro a validar producto");

    async function validarProducto(e){
        //console.log("Entro a validar producto")
        e.preventDefault();

        const producto ={
            nombre: nombreInput.value,
            precio: precioInput.value,
            categoria: categoriaInput.value,
            id: parseInt(idInput.value)
        }
        //console.log(producto)
        if(validar(producto)){
            //console.log('Todos los campos son obligatorios');
            mostrarAlerta('Todos los campos son obligatorios');
            return;
        }

        await editarProducto(producto);
        window.location.href = 'index.html';

    }

    function validar(obj){
        return !Object.values(obj).every(element => element !=='')
    }
    
})()