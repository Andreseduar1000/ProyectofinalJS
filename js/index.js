let arreglo_carrito=[];
let carritonuevo=[];

document.addEventListener("DOMContentLoaded",recuperar_datos());

function carrito(e){

    let hijo= e.target;
    let padre = hijo.parentNode;
    let abuelo = padre.parentNode;


    let nombrePaquete= padre.querySelector("h5").innerText;
    let preciopaquete=padre.querySelector("span").innerText;
    let imgpaquete=abuelo.querySelector("img").src;
    let cantidadcordoba=document.getElementById("cantidad-cordoba").value;
    let cantidadcumbrecita=document.getElementById("cantidad-cumbrecita").value;
    let cantidadcerro=document.getElementById("cantidad-cerro").value;
    let cantidadglaciar=document.getElementById("cantidad-glaciar").value;
    let cantidadparque=document.getElementById("cantidad-parque").value;
    let cantidadalbino=document.getElementById("cantidad-albino").value;


    let paquetes={
        nombre:nombrePaquete,
        precio:preciopaquete,
        img:imgpaquete,
        cantidadc:cantidadcordoba,
        cantidadcum:cantidadcumbrecita,
        canticerro:cantidadcerro,
        cantiglaciar:cantidadglaciar,
        cantipaque:cantidadparque,
        cantialbino:cantidadalbino
    }
    // ACA SE ENVIAN LOS DATOS AL ARREGLO
    arreglo_carrito.push(paquetes);
    revisar_carrito();
    json();
}

// ENVIAMOS LOS DATOS A LOCALSTORAGE
function json(){
    let carritoJson=JSON.stringify(arreglo_carrito);
    localStorage.setItem("paquetes",carritoJson);
    
    
}

//RECOLECTA DATOS DEL LOCALSTORAGE Y IMPRIME SI SE RENUEVA LA PAGINA
function recuperar_datos (){
    if (localStorage.getItem("paquetes")){

        let recuperar_paquetes= localStorage.getItem("paquetes");
        let paquete_parseado=JSON.parse(recuperar_paquetes);
        console.log(paquete_parseado);

        let tabla2=document.getElementById("tbody");

        for (let elementos of paquete_parseado){

            let fila2= document.createElement("tr");
            fila2.innerHTML = `<td><img src="${elementos.img}"style="width: 8rem;"></td>
                        <td style="font-size: 15px;"><p>${elementos.nombre}</p></td>
                        <td style="font-size: 15px;">${elementos.cantidad}</td>

                        <td style="font-size: 15px;">${elementos.precio}</td>
                        <td><button class="btn btn-danger btnbtn">Borrar</button></td>`;
        tabla2.append(fila2);

        }
        let borrarboton = document.querySelectorAll(".btnbtn");

        for( let btn of borrarboton){
            btn.addEventListener("click" , borrarpaquete );
        }

        

    }
}



//IMPRESION DE CARRITO
function revisar_carrito(){
    let tabla = document.getElementById("tbody");
    tabla.innerHTML = "";

    for( paquetes of arreglo_carrito){

        let fila = document.createElement("tr");
        fila.innerHTML = `<td><img src="${paquetes.img}"style="width: 8rem;"></td>
                        <td style="font-size: 15px;"><p>${paquetes.nombre}</p></td>
                        <td style="font-size: 15px;">${paquetes.cantidad}</td>
                        <td style="font-size: 15px;">${paquetes.precio}</td>
                        <td><button class="btn btn-danger btnbtn">Borrar</button></td>`;
        tabla.append(fila);
        
    }
    let borrarboton = document.querySelectorAll(".btnbtn");

    for( let btn of borrarboton){
        btn.addEventListener("click" , borrarpaquete );

    }

}




//BORRAR ARTICULOS DEL CARRITO
function borrarpaquete(e){
    //console.log("Se elimino: ", e.target );
    let abuelo = e.target.parentNode.parentNode;
    let eliminar=abuelo.querySelector("p").innerText;
    console.log(eliminar);
    
    abuelo.remove();
    

    function eliminarPaquete(paquetes){
        return paquetes.nombre != eliminar;
    }

    let busquedafilter=arreglo_carrito.filter(eliminarPaquete);
    arreglo_carrito=busquedafilter;
// SE VA ACTUALIZANDO LOCALSTORAGE CADA VEZ QUE SE BORRA ELEMENTO
    json();
    
    
    
}




// EVENTOS GENERALES

let btnCompra = document.getElementsByClassName("boton");

console.log(btnCompra);


for( let botones of btnCompra ){

    botones.addEventListener("click",carrito);
}

//MOSTRAR BOTON
let boton_mostrar=document.getElementById("btnhola");
boton_mostrar.addEventListener("click",mostrar);

function mostrar(){
    document.getElementById('carrito').style.display='block';
}
//OCULTAR BOTON
let boton_ocultar=document.getElementById("btnchao");
boton_ocultar.addEventListener("click",ocultar);

function ocultar(){
    document.getElementById('carrito').style.display='none';
}