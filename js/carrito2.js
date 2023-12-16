window.onload = function (){
    console.log("ONLOAD CARRITO=========>");   
    verCarrito(); 
    //mostrarDetalleCarrito();  
}

function verCarrito(){
    console.log("ver carritojs");    
    var carritoT = JSON.parse(localStorage.getItem("items_carrito")) || [];    
    //mostrar contador carrito en el icono del carrito
    document.getElementById("contador_carrito").innerText = carritoT.length;
    console.log(carritoT);
    //window.open("cart.html", "_self");
}

function det_masCantidad(){ 
    var valor = document.getElementById("cantidad").value;               
    if(valor < 10){
    var suma = parseInt(valor) + parseInt(1);    
    document.getElementById("cantidad").value = suma;            
    } 
}

function det_menosCantidad(){   
    var valor = document.getElementById("cantidad").value;
    if(valor > 1){
    var resta = parseInt(valor) - parseInt(1);      
    document.getElementById("cantidad").value = resta;
    } 
}

function validarRB(){
    //validar tallas seleccionadas para activar el button agregar carrito
    var radiob_tallas = document.getElementsByName('tallas_prod'); 
    var radio_colores = document.getElementsByName("colores_prod"); 
    var tallax = "";
    var colorx = "";
    var rbtalla_chekeado = "no";
    var rcolor_chekeado = "no";
    var contador = 0;
    var subtotal = 0;
    const urlSearchParams = new URLSearchParams(window.location.search);
	var idp = urlSearchParams.get("id");  

    radiob_tallas.forEach((talla) => {
        if (talla.checked) {
            tallax = talla.value;   
            rbtalla_chekeado = "si";
            //console.log("talla"+tallax);     
           
        }
    });

    radio_colores.forEach((color) => {
        if (color.checked) {
            colorx = color.value;   
            rcolor_chekeado = "si";
            //console.log("color"+colorx);     
           
        }
    });    
    
    if(rbtalla_chekeado == "si" && rcolor_chekeado == "si"){
        //console.log("YAAAAAAAAA ENTRO");
        document.getElementById("btn_carrito").disabled = false;
    }
}
function agregarCarrito(){
            //validar tallas seleccionadas para activar el button agregar carrito
    var radiob_tallas = document.getElementsByName('tallas_prod'); 
    var radio_colores = document.getElementsByName("colores_prod"); 
    var tallax = "";
    var colorx = "";
    radiob_tallas.forEach((talla) => {
        if (talla.checked) {
            tallax = talla.value;   
            rbtalla_chekeado = "si";
            //console.log("talla"+tallax);     
           
        }
    });

    radio_colores.forEach((color) => {
        if (color.checked) {
            colorx = color.value;   
            rcolor_chekeado = "si";
            //console.log("color"+colorx);     
           
        }
    });    
        validarRB();
        //valido que el id no se repita
        //var items_carritox = JSON.parse(localStorage.getItem("items_carrito")) || [];
        const carrito = JSON.parse(localStorage.getItem("items_carrito")) || [];
        console.log(carrito);

        const repeat = carrito.some((repeatProduct) => repeatProduct.id === idp & repeatProduct.talla === tallax & repeatProduct.color === colorx);
        var precio = document.getElementById("precio_int").innerText;
        var cantidad = document.getElementById("cantidad").value;
        subtotal = parseFloat(precio) * parseFloat(cantidad);
            
            if(repeat){
                console.log("ID repetido--");
            }else{
                console.log("ENTRO EL ID y agrega a carrito--");
                    carrito.push({
                        id: idp,
                        nombre: document.getElementById("nom_prod").innerText,                        
                        precio: document.getElementById("precio_int").innerText,
                        cantidad: document.getElementById("cantidad").value,
                        talla: tallax,
                        color: colorx,
                        subtotal:subtotal,
                        imagen: document.getElementById("img-active").src
                    });
                    //carritoTotal.push(carrito);
                    localStorage.setItem("items_carrito", JSON.stringify(carrito));
                    console.log(carrito);
            }
      
        
        
        
        
        //mostrar contador carrito en el icono del carrito
        //document.getElementById("contador_carrito").innerText = carrito.length;
        
        
        //mostrar items en el modal
        var chart_modal_carrito = "";
        carrito.forEach((item) => {
            //console.log(item);        
            chart_modal_carrito += `
            <div class="d-inline-block">${item.cantidad}</div>    
            <div class="d-inline-block">${item.nombre}</div>
            <div class="d-inline-block">color: ${item.color}</div>
            <div class="d-inline-block">talla: ${item.talla}</div>
            <div class="d-inline-block" value="${item.precio}">precio: S/ ${item.precio}</div>    
            <div class=""></div>
             `;
            //<div class="d-inline-block">❌</div>      
    
        });
        modal_carrito.innerHTML = chart_modal_carrito;
}

function verCarrito(){
    console.log("ver carrito app");
    //window.open("cart.html", "_self");
    var carritoT = JSON.parse(localStorage.getItem("items_carrito")) || [];    
    //mostrar contador carrito en el icono del carrito
    document.getElementById("contador_carrito").innerText = carritoT.length;
    console.log(carritoT);
}

function irCarrito(){
    window.open("cart.html", "_self");    
}