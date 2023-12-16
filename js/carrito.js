var menos = document.getElementById("menos");
var mas = document.getElementById("mas");
//var valor_max = document.getElementById("cantidad").max;
var show_modal_container = document.getElementById("show_modal_container");
var btn_vercarrito = document.getElementById("btn_vercarrito");
var modal_carrito = document.getElementById("modal_carrito");
var detalle_carrito = document.getElementById("show_detalle_carrito");
var chart_det_carrito = "";

window.onload = function (){
    console.log("ONLOAD CARRITO=========>");   
    verCarrito(); 
    mostrarDetalleCarrito();      
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
function masCantidad(conta,precio,idp){     
    var valorx = 0;
    var colorx,tallax = "";
    var vcantidad = document.getElementsByName("vcantidad");
    var vsubtotal = document.getElementsByName("vsubtotal");

    var vcolor = document.getElementsByName("vcolor");
    var vtalla = document.getElementsByName("vtalla");
    //var carritoCantidad = JSON.parse(localStorage.getItem("items_carrito")) || [];
    console.log("conta: "+conta);   
    console.log("MAS CARRITOOOOO");  
    console.log(carrito);
    
    //capturamos el color
    for(var i=0;i<vcolor.length;i++){        
        var colorx = vcolor[conta].value;        
    }
    //capturamos el talla
    for(var i=0;i<vtalla.length;i++){        
        var tallax = vtalla[conta].value;        
    }

    for(var i=0;i<vcantidad.length;i++){
        //console.log(vcantidad[conta]);
        console.log(vcantidad[conta].value);
        var valorx = vcantidad[conta].value;        
    }
    if(valorx < 10){
            var suma = parseInt(valorx) + parseInt(1); 
            vcantidad[conta].value = suma;
            console.log("suma: "+suma);
            var subtotalx = precio*suma;
            vsubtotal[conta].innerText = subtotalx; 
            var subtotal = 0;
            for(var i=0;i<vsubtotal.length;i++){
                //console.log(vcantidad[conta]);
                console.log(vsubtotal[i].innerText);
                subtotal = subtotal + parseInt(vsubtotal[i].innerText);                              
                      
            }
            console.log(subtotal); 
            document.getElementById("idsubtotal").innerHTML = subtotal; 
            //actualizo cantidad total del carrito
            const repeat = carrito.some((repeatProduct) => repeatProduct.id === idp & repeatProduct.talla === tallax & repeatProduct.color === colorx);
            if(repeat){
                console.log("PRODUCTO REPETIDO--CANTIDAD(+)");                
            }else{  
                console.log("PRODUCTO NO REPETIDO--CANTIDAD(+)");
                carrito[conta].cantidad = suma;
                carrito[conta].subtotal = subtotalx;
                console.log("SE ACTUALIZO CANTIDAD EN CARRITOOOOO");  
                console.log(carrito);
                localStorage.setItem("items_carrito", JSON.stringify(carrito));
            }                   
    }         
}
function menosCantidad(conta,precio,idp){   
    var valory = 0;
    var colorx,tallax = "";
    var vcantidad = document.getElementsByName("vcantidad");  
    var vsubtotal = document.getElementsByName("vsubtotal"); 
    var vcolor = document.getElementsByName("vcolor");
    var vtalla = document.getElementsByName("vtalla");
    //var carritoCantidad = JSON.parse(localStorage.getItem("items_carrito")) || []; 
    console.log("conta: "+conta);
    console.log("MENOS CARRITO(-)------");   
    console.log(carrito);  
    //capturamos el color
    for(var i=0;i<vcolor.length;i++){        
        var colorx = vcolor[conta].value;        
    }
    //capturamos el talla
    for(var i=0;i<vtalla.length;i++){        
        var tallax = vtalla[conta].value;        
    }

    for(var i=0;i<vcantidad.length;i++){
        //console.log(vcantidad[i]);
        console.log(vcantidad[conta].value);
        var valory = vcantidad[conta].value;        
    }
    if(valory > 1){
            var resta = parseInt(valory) - parseInt(1); 
            vcantidad[conta].value = resta;
            console.log("resta: "+resta); 
            var subtotalx = precio*resta;
            vsubtotal[conta].innerText = subtotalx;
            var subtotal = 0;
            for(var i=0;i<vsubtotal.length;i++){
                //console.log(vcantidad[conta]);
                console.log(vsubtotal[i].innerText);
                subtotal = subtotal + parseInt(vsubtotal[i].innerText);              
                      
            }
            console.log(subtotal);
            document.getElementById("idsubtotal").innerHTML = subtotal; 
            //actualizo cantidad total del carrito
            const repeat = carrito.some((repeatProduct) => repeatProduct.id === idp & repeatProduct.talla === tallax & repeatProduct.color === colorx);
            if(repeat){
                console.log("PRODUCTO REPETIDO--CANTIDAD(-)");                
            }else{  
                console.log("PRODUCTO NO REPETIDO--CANTIDAD(-)");
                carrito[conta].cantidad = resta;
                carrito[conta].subtotal = subtotalx;
                console.log("SE ACTUALIZO CANTIDAD EN CARRITOOOOO");  
                console.log(carrito);
                localStorage.setItem("items_carrito", JSON.stringify(carrito));
            }          
            
                 
    }         
}

//agregamos al carrito
var btn_carrito = document.getElementById("btn_carrito");
var show_carrito = document.getElementById("show_carrito");



function validarRB(){
    var rbtalla_chekeado = "no";
    var rcolor_chekeado = "no";
    //console.log(document.f_tallas.tallas_prod.length);     
    //console.log(document.f_tallas.tallas_prod);
    //capturo valores del input  
    var tallas = document.f_tallas.tallas_prod;
    tallas.forEach((talla) => {
        if(talla.checked){
            rbtalla_chekeado = "si";
            //console.log(rbtalla_chekeado);
        }
    });    

    var colores = document.f_colores.colores_prod;
    colores.forEach((color) => {
        if(color.checked){
            rcolor_chekeado = "si";
            //console.log(rcolor_chekeado);
        }
    });
    
    if(rbtalla_chekeado == "si" && rcolor_chekeado == "si"){
        //console.log("YAAAAAAAAA ENTRO");
        document.getElementById("btn_carrito").disabled = false;
    }
}

const carritoTotal = [];
const carrito = JSON.parse(localStorage.getItem("items_carrito")) || [];

function agregarCarrito(){
        console.log("AGREGAR CARRITO--Xd");  
        //e.preventDefault(e);
        //validar tallas seleccionadas para activar el button agregar carrito
        var radiob_tallas = document.getElementsByName('tallas_prod'); 
        var radio_colores = document.getElementsByName("colores_prod"); 
        var tallax = "";
        var colorx = "";
        var contador = 0;
        var subtotal = 0;
        const urlSearchParams = new URLSearchParams(window.location.search);
		var idp = urlSearchParams.get("id");  
           
        //console.log(radios);   
            
            radiob_tallas.forEach((talla) => {
                if (talla.checked) {
                    tallax = talla.value;   
                    //console.log("talla"+tallax);     
                   
                }
            });
        
            radio_colores.forEach((color) => {
                if (color.checked) {
                    colorx = color.value;   
                    //console.log("color"+colorx);     
                   
                }
            });    
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


//agrego al carrito total
function verCarritoTotal(){    
    var carritoT = JSON.parse(localStorage.getItem("items_carrito")) || [];
    console.log(carritoT);
}

function verCarrito(){
    console.log("ver carritojs");    
    var carritoT = JSON.parse(localStorage.getItem("items_carrito")) || [];    
    //mostrar contador carrito en el icono del carrito
    document.getElementById("contador_carrito").innerText = carritoT.length;
    console.log(carritoT);
    //window.open("cart.html", "_self");
}

function irCarrito(){
    window.open("cart.html", "_self");    
}

function cambio(){
    console.log("cambio");
}

function mostrarDetalleCarrito(){
console.log("DETALLE CARRITO======");
var items_carrito = JSON.parse(localStorage.getItem("items_carrito")) || [];   
console.log("items_carrito==============");
console.log(items_carrito);
var conta = 0;
var subtotalT = 0;
var subtotal = 0;
items_carrito.forEach((item) => {
    var idp = item.id;
    var precio = item.precio;
    subtotal = parseFloat(item.precio)*parseInt(item.cantidad);
    
    chart_det_carrito += `    
    <tr name="vitem">
         <td class="align-middle"><img src="img/bolsos/bolso_drill.jpeg" alt="" style="width: 50px;">${item.nombre}</td>
         <td class="align-middle" name="vcolor" value="${item.color}">${item.color}</td>
         <td class="align-middle" name="vtalla" value="${item.talla}">${item.talla}</td>
         <td class="align-middle">${item.precio}</td>
         <td class="align-middle">
            
             <div class="input-group quantity mx-auto" style="width: 100px;" name="f_items">
                 <div class="input-group-btn">
                     <button class="btn btn-sm btn-primary btn-minus" id="menos" onclick="menosCantidad(${conta},${precio},${idp})">                     
                     <i class="fa fa-minus"></i>
                     </button>
                 </div>                 
                 <input type="text" class="form-control form-control-sm bg-secondary text-center" id="cantidad" name="vcantidad" value="${item.cantidad}" min="" max="" readonly="readonly">               
                 <div class="input-group-btn">
                     <button class="btn btn-sm btn-primary btn-plus" id="mas" onclick="masCantidad(${conta},${precio},${idp})">
                         <i class="fa fa-plus"></i>
                     </button>
                 </div>
             </div>
            
         </td>
         <td class="align-middle subTotalx" id="subTotal" name="vsubtotal" value="">${subtotal}</td>
         <td class="align-middle"><button class="btn btn-sm btn-primary" onclick="eliminarProducto(${item.id},${conta})"><i class="fa fa-times"></i></button></td>
    </tr>
    `;
    conta++;
    subtotalT = subtotalT + subtotal;
    
});

//mostramos la tabla con los items de los productos agregados al carrito
detalle_carrito.innerHTML = chart_det_carrito;

//mostrar subtotal de todos los items
document.getElementById("idsubtotal").innerHTML = subtotalT;
}

function mostrar(){
    console.log("MOSTRAR------------");
}

function eliminarProducto(idp,conta){
    console.log("BORRAR------------"+idp);
    var valorx = "";
    valorx = idp;
    // var colorx,tallax = "";
    // var vcolor = document.getElementsByName("vcolor");
    // var vtalla = document.getElementsByName("vtalla");
    //capturamos el color
    // for(var i=0;i<vcolor.length;i++){        
    //     var colorx = vcolor[conta].value;        
    // }
    // //capturamos el talla
    // for(var i=0;i<vtalla.length;i++){        
    //     var tallax = vtalla[conta].value;        
    // }
    //const repeat = carrito.some((repeatProduct) => repeatProduct.id === idp & repeatProduct.talla === tallax & repeatProduct.color === colorx);
    

    var items_carritox = JSON.parse(localStorage.getItem("items_carrito")) || [];    

    var foundId = items_carritox.find(function(item){
        return item.id === idp.toString()
        //return item.id === idp.toString() & item.talla === tallax & item.color === colorx
    });
    console.log(foundId);
    items_carritox = items_carritox.filter(function(itemid){
        return itemid !== foundId;
    });    
    //items_carritox = localStorage.setItem("items_carrito", JSON.stringify(items_carritox));
    localStorage.setItem("items_carrito", JSON.stringify(items_carritox));
    verCarrito();
    document.getElementsByName("vitem")[conta].innerText = "";

}

function tipo_envio(){    
    var radiob_shipping = document.getElementsByName('shipping'); 
    //console.log(radiob_shipping);
    var total_envio = "";
    var op_envio = "";
    radiob_shipping.forEach((itemshipping) => {
        if (itemshipping.checked) {
            op_envio = itemshipping.value;
            //console.log(op_envio);
            if(op_envio === "delivery"){ 
            //console.log(op_envio);           
            document.getElementById("id_delivery").innerText = 10; 
            total_envio = parseInt(document.getElementById("idsubtotal").innerText) + parseInt(document.getElementById("id_delivery").innerText);
            document.getElementById("idtotal").innerHTML = total_envio;
            
            //pasar_tipoenvio(total_envio,op_envio);
            }else{
                //console.log(op_envio);
                document.getElementById("id_delivery").innerText = 0;
                total_envio = parseInt(document.getElementById("idsubtotal").innerText) + parseInt(document.getElementById("id_delivery").innerText);
                document.getElementById("idtotal").innerHTML = total_envio;
                
                //pasar_tipoenvio(total_envio,op_envio);
            }
            //return op_envio;
        }
    });
    return op_envio;
    
}

function medioPago(){
    var radiob_payment = document.getElementsByName('payment'); 
    //console.log(radiob_payment);
    var op_pago = "";
    radiob_payment.forEach((itempago) => {
        if (itempago.checked) {
            op_pago = itempago.value;
        }
    });
    return op_pago;
    //console.log(op_pago);

}



function enviarPedido(){
    console.log("wasapppp");
    console.log(carrito);
    var filas = "";
    var op_pago = medioPago();
    var op_envio = tipo_envio(); 
    var carritoF = JSON.parse(localStorage.getItem("items_carrito")) || [];
    carritoF.forEach((item) => {
        //filas += item.cantidad+" "+item.nombre+" "+item.color+" "+item.talla+" "+"S/"+item.subtotal+"\n";
        filas += item.cantidad+" "+item.nombre+" "+item.color+" "+item.talla+" "+"S/"+item.subtotal+"%0D%0A";
    });
    console.log(filas);
    //filas += valory+" "+item.nombre+" "+item.color+" "+item.talla+" "+"S/"+item.precio+"\n";
    //console.log(filas);
    var url = document.getElementById('enlace');
    //var datos = "Pedido: "+listadoProductoCantidad+"[Total: S/ "+sub+"] [Medio Pago: "+mpseleccionado+"]";
    var cabecera = "DATOS DEL PEDIDO:"
    var mediopago = "Medio pago: "+op_pago; 
    var envio = "Envío: "+op_envio;       
    var totalpagar = "Pago total:"+"%0D%0A"+"S/"+document.getElementById("idtotal").innerHTML;
    
    var cabecera_detalleprod =  "Detalle de Productos:";
    var cabecera_detallepagoyenvio =  "DETALLE DE PAGO Y ENVÍO";
    var cab = "|cantidad|producto|color|talla|precio|";   
        
    var baseUrl = "https://api.whatsapp.com/send?phone=51999781083&text="+cabecera+"%0D%0A"+cabecera_detalleprod+"%0D%0A"+
    filas+"%0D%0A"+cabecera_detallepagoyenvio+"%0D%0A"+mediopago+"%0D%0A"+envio+"%0D%0A"+totalpagar;

        //console.log(url);
    url.setAttribute('href',baseUrl);
}
