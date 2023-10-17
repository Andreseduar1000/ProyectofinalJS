let arreglo_carrito=[];
let carritonuevo=[];

document.addEventListener("DOMContentLoaded",recuperar_datos());

// API WEATHER y FETCH

navigator.geolocation.getCurrentPosition(posiciones)

function posiciones(posicion){
    let lati=posicion.coords.latitude;
    let longi=posicion.coords.longitude;
    let key="d2327fcdcf0774ac5b3d04dbb6062e18"

fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=${key}&units=metric&lang=es`)
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        document.getElementById("header").innerHTML=`<p>${data.name}</p>
                                                    <p style="text-transform: capitalize;">${data.weather[0].description}</p>
                                                    <p>Temperatura: ${data.main.temp}°C</p>
                                                    <p>Humedad:${data.main.humidity}%</p>
                                                    <p>Pais: ${data.sys.country}</p>
                                                    <p>Viento: ${data.wind.speed}km</p>`
    })

}

//CARRITO
function carrito(e){

    let hijo= e.target;
    let padre = hijo.parentNode;
    let abuelo = padre.parentNode;


    let nombrePaquete= padre.querySelector("h5").innerText;
    
    let imgpaquete=abuelo.querySelector("img")  .src;

    let preciocordoba=document.getElementById("preciocor").innerText;
    let preciocumbre=document.getElementById("precio-cumbre").innerText;
    let preciocerro=document.getElementById("precio-cerro").innerText;
    let precioglaciar=document.getElementById("precio-martial").innerText;
    let precioparque=document.getElementById("precio-parque").innerText;
    let precioalbino=document.getElementById("precio-albino").innerText

    let valorescor=document.getElementById("valor-cor").value;
    let valorescumbre=document.getElementById("valor-cumbre").value;
    let valorescerro=document.getElementById("valor-cerro").value;
    let valoresglaciar=document.getElementById("valor-glaciar").value;
    let valoresparque=document.getElementById("valor-parque").value;
    let valoresalbino=document.getElementById("valor-albino").value;
    

    let paquetes={
        nombre:nombrePaquete,
        img:imgpaquete,
        precicor:preciocordoba,
        precicerro:preciocerro,
        precicumbre:preciocumbre,
        preciglaciar:precioglaciar,
        preciparque:precioparque,
        precialbino:precioalbino,
        cantidadcor:valorescor,
        cantidadcumbre:valorescumbre,
        cantidadcerro:valorescerro,
        cantidadglaciar:valoresglaciar,
        cantidadparque:valoresparque,
        cantidadalbino:valoresalbino
    }
    // ACA SE ENVIAN LOS DATOS AL ARREGLO
    arreglo_carrito.push(paquetes);
    revisar_carrito();
    json();
}
function agregar(acu){
    let btnfinal=document.getElementById("btnfinal");
    btnfinal.addEventListener("click", function() {
        if (acu === 0) {
            Swal.fire({
                position: 'center',   
                icon: 'error',
                title: 'Carrito sin paquetes',
                showConfirmButton: true,
                timer: 1500,
                gravity: "top",
                color:"black",
                background:"white",
            });
        } else {
            Swal.fire({
                position: 'center',   
                icon: 'success',
                title: '¡Compra finalizada!',
                showConfirmButton: true,
                timer: 1500,
                gravity: "top",
                color:"black",
                background:"white",
            });
            arreglo_carrito = [];
            json();
            revisar_carrito();
        }
    });
}


// ENVIAMOS LOS DATOS A LOCALSTORAGE
function json(){
    let carritoJson=JSON.stringify(arreglo_carrito);
    localStorage.setItem("paquetes",carritoJson);
    
    
}
//ANIMACION AL AGREGAR PAQUETE
function animacion(){

    Toastify({
        text: `Paquete Agregado`,
        duration:2000,
        gravity:"top",
        position:"right",
        style:{
            fontSize: "14px",
            fontFamily:"Verdana",
            color:"black",
            background:"white"
        }


        }    
    ).showToast();
};


//RECOLECTA DATOS DEL LOCALSTORAGE Y IMPRIME SI SE RENUEVA LA PAGINA
function recuperar_datos (){
    if (localStorage.getItem("paquetes")){

        let recuperar_paquetes= localStorage.getItem("paquetes");
        let paquete_parseado=JSON.parse(recuperar_paquetes);
        console.log(paquete_parseado);
        let acu=0;
        let acualbino=0;
        let acucerro=0;
        let acucord=0;
        let acucumbre=0;
        let acuglaciar=0;
        let acuparque=0;

        let tabla2=document.getElementById("tbody");

        for (let elementos of paquete_parseado){

        if (elementos.nombre=="Tour Ciudad de Cordoba"){
            let preciocord=parseInt(elementos.precicor);
            let cantidadcord=parseInt(elementos.cantidadcor);
            let totalcord=preciocord*cantidadcord;
            let fila2 = document.createElement("tr");
            
            fila2.innerHTML = `<td><img src="${elementos.img}"style="width: 8rem;"></td>
                        <td style="font-size: 15px;"><p>${elementos.nombre}</p></td>
                        <td style="font-size: 15px;">${elementos.cantidadcor}</td>
                        <td style="font-size: 15px;">$${totalcord}</td>
                        <td><button class="btn btn-danger btnbtn">Borrar</button></td>`;
        tabla2.appendChild(fila2);
        acucord=acucord+totalcord;

        }
        else if (elementos.nombre=="Tour Cumbrecita y Villa General Belgrano"){
            let precio=parseInt(elementos.precicumbre);
            let cantidad=parseInt(elementos.cantidadcumbre);
            let totalcumbre=precio*cantidad;

            let fila2 = document.createElement("tr");
            fila2.innerHTML = `<td><img src="${elementos.img}"style="width: 8rem;"></td>
                        <td style="font-size: 15px;"><p>${elementos.nombre}</p></td>
                        <td style="font-size: 15px;">${elementos.cantidadcumbre}</td>
                        <td style="font-size: 15px;">$${totalcumbre}</td>
                        <td><button class="btn btn-danger btnbtn">Borrar</button></td>`;
        tabla2.append(fila2);
        acucumbre=acucumbre+totalcumbre;
        }
        else if (elementos.nombre=="Tour Cerro Champaqui"){
            let precio=parseInt(elementos.precicerro);
            let cantidad=parseInt(elementos.cantidadcerro);
            let totalcerro=precio*cantidad;

            let fila2 = document.createElement("tr");
            fila2.innerHTML = `<td><img src="${elementos.img}"style="width: 8rem;"></td>
                        <td style="font-size: 15px;"><p>${elementos.nombre}</p></td>
                        <td style="font-size: 15px;">${elementos.cantidadcerro}</td>
                        <td style="font-size: 15px;">$${totalcerro}</td>
                        <td><button class="btn btn-danger btnbtn">Borrar</button></td>`;
        tabla2.append(fila2);
        acucerro=acucerro+totalcerro;
        }
        else if (elementos.nombre=="Aventura Glaciar Martial"){
            let precio=parseInt(elementos.preciglaciar);
            let cantidad=parseInt(elementos.cantidadglaciar);
            let totalglaciar=precio*cantidad;

            let fila2 = document.createElement("tr");
            fila2.innerHTML = `<td><img src="${elementos.img}"style="width: 8rem;"></td>
                        <td style="font-size: 15px;"><p>${elementos.nombre}</p></td>
                        <td style="font-size: 15px;">${elementos.cantidadglaciar}</td>
                        <td style="font-size: 15px;">$${totalglaciar}</td>
                        <td><button class="btn btn-danger btnbtn">Borrar</button></td>`;
        tabla2.append(fila2);
        acuglaciar=acuglaciar+totalglaciar;
        }
        else if (elementos.nombre=="Aventura Parque Nacional"){
            let precio=parseInt(elementos.preciparque);
            let cantidad=parseInt(elementos.cantidadparque);
            let totalparque=precio*cantidad;
            let fila2 = document.createElement("tr");
            fila2.innerHTML = `<td><img src="${elementos.img}"style="width: 8rem;"></td>
                        <td style="font-size: 15px;"><p>${elementos.nombre}</p></td>
                        <td style="font-size: 15px;">${elementos.cantidadparque}</td>
                        <td style="font-size: 15px;">$${totalparque}</td>
                        <td><button class="btn btn-danger btnbtn">Borrar</button></td>`;
        tabla2.append(fila2);
        acuparque=acuparque+totalparque;
        }
        else if (elementos.nombre=="Ice Trekking Glaciar Ojo de Albino"){
            let precio=parseInt(elementos.precialbino);
            let cantidad=parseInt(elementos.cantidadalbino);
            let totalalbino=precio*cantidad;

            let fila2 = document.createElement("tr");
            fila2.innerHTML = `<td><img src="${elementos.img}"style="width: 8rem;"></td>
                        <td style="font-size: 15px;"><p>${elementos.nombre}</p></td>
                        <td style="font-size: 15px;">${elementos.cantidadalbino}</td>
                        <td style="font-size: 15px;"$${totalalbino}</td>
                        <td><button class="btn btn-danger btnbtn">Borrar</button></td>`;
        tabla2.append(fila2);
        acualbino=acualbino+totalalbino;
        }
        acu=acualbino+acucerro+acucord+acucumbre+acuglaciar+acuparque;
        console.log(acu);
        
    }
    let mostrar=document.createElement("tr")
    mostrar.innerHTML = `<td style="font-size: 16px; color:white; ">Total: $${acu}</td>`

    tabla2.append(mostrar);  


        let borrarboton = document.querySelectorAll(".btnbtn");

        for( let btn of borrarboton){
            btn.addEventListener("click" , borrarpaquete );
        }
        agregar(acu);
    }
}


//IMPRESION DE CARRITO
function revisar_carrito(){
    let tabla = document.getElementById("tbody");
    tabla.innerHTML = "";
    
let acu=0;
let acualbino=0;
let acucerro=0;
let acucord=0;
let acucumbre=0;
let acuglaciar=0;
let acuparque=0;
    for( paquetes of arreglo_carrito){
        
        if (paquetes.nombre=="Tour Ciudad de Cordoba"){
            let preciocord=parseInt(paquetes.precicor);
            let cantidadcord=parseInt(paquetes.cantidadcor);
            let totalcord=preciocord*cantidadcord;
            let fila = document.createElement("tr");
            
            fila.innerHTML = `<td><img src="${paquetes.img}"style="width: 8rem;"></td>
                        <td style="font-size: 15px;"><p>${paquetes.nombre}</p></td>
                        <td style="font-size: 15px;">${paquetes.cantidadcor}</td>
                        <td style="font-size: 15px;">$${totalcord}</td>
                        <td><button class="btn btn-danger btnbtn">Borrar</button></td>`;
        tabla.appendChild(fila);
        acucord=acucord+totalcord;

        }
        else if (paquetes.nombre=="Tour Cumbrecita y Villa General Belgrano"){
            let precio=parseInt(paquetes.precicumbre);
            let cantidad=parseInt(paquetes.cantidadcumbre);
            let totalcumbre=precio*cantidad;

            let fila = document.createElement("tr");
            fila.innerHTML = `<td><img src="${paquetes.img}"style="width: 8rem;"></td>
                        <td style="font-size: 15px;"><p>${paquetes.nombre}</p></td>
                        <td style="font-size: 15px;">${paquetes.cantidadcumbre}</td>
                        <td style="font-size: 15px;">$${totalcumbre}</td>
                        <td><button class="btn btn-danger btnbtn">Borrar</button></td>`;
        tabla.append(fila);
        acucumbre=acucumbre+totalcumbre;
        }
        else if (paquetes.nombre=="Tour Cerro Champaqui"){
            let precio=parseInt(paquetes.precicerro);
            let cantidad=parseInt(paquetes.cantidadcerro);
            let totalcerro=precio*cantidad;

            let fila = document.createElement("tr");
            fila.innerHTML = `<td><img src="${paquetes.img}"style="width: 8rem;"></td>
                        <td style="font-size: 15px;"><p>${paquetes.nombre}</p></td>
                        <td style="font-size: 15px;">${paquetes.cantidadcerro}</td>
                        <td style="font-size: 15px;">$${totalcerro}</td>
                        <td><button class="btn btn-danger btnbtn">Borrar</button></td>`;
        tabla.append(fila);
        acucerro=acucerro+totalcerro;
        }
        else if (paquetes.nombre=="Aventura Glaciar Martial"){
            let precio=parseInt(paquetes.preciglaciar);
            let cantidad=parseInt(paquetes.cantidadglaciar);
            let totalglaciar=precio*cantidad;

            let fila = document.createElement("tr");
            fila.innerHTML = `<td><img src="${paquetes.img}"style="width: 8rem;"></td>
                        <td style="font-size: 15px;"><p>${paquetes.nombre}</p></td>
                        <td style="font-size: 15px;">${paquetes.cantidadglaciar}</td>
                        <td style="font-size: 15px;">$${totalglaciar}</td>
                        <td><button class="btn btn-danger btnbtn">Borrar</button></td>`;
        tabla.append(fila);
        acuglaciar=acuglaciar+totalglaciar;
        }
        else if (paquetes.nombre=="Aventura Parque Nacional"){
            let precio=parseInt(paquetes.preciparque);
            let cantidad=parseInt(paquetes.cantidadparque);
            let totalparque=precio*cantidad;
            let fila = document.createElement("tr");
            fila.innerHTML = `<td><img src="${paquetes.img}"style="width: 8rem;"></td>
                        <td style="font-size: 15px;"><p>${paquetes.nombre}</p></td>
                        <td style="font-size: 15px;">${paquetes.cantidadparque}</td>
                        <td style="font-size: 15px;">$${totalparque}</td>
                        <td><button class="btn btn-danger btnbtn">Borrar</button></td>`;
        tabla.append(fila);
        acuparque=acuparque+totalparque;
        }
        else if (paquetes.nombre=="Ice Trekking Glaciar Ojo de Albino"){
            let precio=parseInt(paquetes.precialbino);
            let cantidad=parseInt(paquetes.cantidadalbino);
            let totalalbino=precio*cantidad;

            let fila = document.createElement("tr");
            fila.innerHTML = `<td><img src="${paquetes.img}"style="width: 8rem;"></td>
                        <td style="font-size: 15px;"><p>${paquetes.nombre}</p></td>
                        <td style="font-size: 15px;">${paquetes.cantidadalbino}</td>
                        <td style="font-size: 15px;">$${totalalbino}</td>

                        <td><button class="btn btn-danger btnbtn">Borrar</button></td>`;
        tabla.append(fila);
        acualbino=acualbino+totalalbino;
        }
        acu=acualbino+acucerro+acucord+acucumbre+acuglaciar+acuparque;
        
    }
    let mostrar=document.createElement("tr")
    mostrar.innerHTML = `<td style="font-size: 16px; color:white; ">Total: $${acu}</td>`
    
    tabla.append(mostrar);  
    let borrarboton = document.querySelectorAll(".btnbtn");

    for( let btn of borrarboton){
        btn.addEventListener("click" , borrarpaquete );


    }
    agregar(acu);

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
    revisar_carrito();
    
}




// EVENTOS GENERALES

let btnCompra = document.getElementsByClassName("boton");


console.log(btnCompra);


for( let botones of btnCompra ){

    botones.addEventListener("click",carrito);
    botones.addEventListener("click",animacion);
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


let boton=document.getElementById("btncompra");

