var datos = [];
var chart = "";
var chart_detalle_prod = "";
var char_tallas = "";
var char_colores = "";
var chart_detalle_prod_Final = "";
window.onload = function (){
    console.log("ONLOAD APP=========>");
    cargar_datos();
    verCarrito();
    
    
    };
function cargar_datos() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "js/productos.json");
    xhr.send();
    xhr.responseType = "json";
    xhr.onload = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var data = xhr.response;
        console.log(data);
        localStorage.setItem("bd-productos", JSON.stringify(data));                  
      } else {
        console.log(`Error: ${xhr.status}`);
      }
    };

}

//elegir categoria
function elegirCategoria(){
    var allcategories = document.querySelector('.allcategories');
    allcategories.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.classList.contains('pasarcategoria')) {
            //n: c1,c2,c3
            var n = e.target.id;
            //const selectProduct = e.target.parentElement; 
            //readTheContent(selectProduct);
            console.log("entro categorias----------->");
            console.log(n);
            window.open("detail.html?id="+n, "_self");
        }  
    });
}

function elegirProducto(){
    var elegirProducto = document.querySelector('.elegirProducto');
    elegirProducto.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.classList.contains('pasarProducto')) {
            //n: c1,c2,c3
            var n = e.target.id;
            //const selectProduct = e.target.parentElement; 
            //readTheContent(selectProduct);
            console.log("entro producto----------->");
            console.log(n);
            window.open("detail.html?id="+n, "_self");
        }  
    });
}

function validarCategoria(c){
    //console.log("entro la categoria"+c);
    let bdprod = JSON.parse(localStorage.getItem("bd-productos")) || [];
    const categorias = bdprod.categorias;
    const productos = bdprod.productos;
    var titulo_categoria = "";
    var url_cat = "";    
    categorias.forEach((cat) => {
       //console.log(cat.id);
       if(cat.id === c){
        //console.log(cat.id);
        //console.log(cat.url_img);
        url_cat = cat.url_img;
        titulo_categoria = cat.nomcategoria;
       }       
    });   
    //console.log(url_cat);
    //document.getElementById("titulo_categoria").innerHTML = titulo_categoria;  
    //mostrargaleria_porcategoria(url_cat,c);
  }

  function validarDetalleProd(idp){
    var imagen_prod = "";
    var nomproducto = "";
    var prod_idcat = "";
    var nombre_talla = "";
    var nombre_color = "";
    var precio_internet = "";
    var cantidad_max = "";
    var id_talla = "";
    var id_color = "";
    var conta = 0;
    //console.log("entro al app"+id);
    let bdprod = JSON.parse(localStorage.getItem("bd-productos")) || [];   
    const productos = bdprod.productos;
    const categorias = bdprod.categorias;
    const tallas = bdprod.tallas;
    const colores = bdprod.colores;
    console.log(colores);
    productos.forEach((prod) => {
        if(prod.id === idp){
            prod_idcat = prod.categoria
            nomproducto = prod.nomproducto;
            precio_internet =prod.preciofer;
            cantidad_max = prod.cantidad;
            //console.log(nomproducto);
            tallas.forEach((talla) => {
                if(prod_idcat === talla.id_cat){
                    nombre_talla = talla.nom_talla;
                    id_talla = talla.id_talla;           
                    //console.log(nombre_talla);
                    char_tallas += `
                    <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="size-${id_talla}" name="tallas_prod" value="${nombre_talla}" onclick="validarRB()">
                            <label class="custom-control-label" for="size-${id_talla}">${nombre_talla}</label>
                        </div>
                        `;
                }        
            });
            colores.forEach((color) => {
                if(prod_idcat === color.id_cat){
                    nombre_color = color.nom_color;   
                    id_color = color.id_color;         
                    //console.log(nombre_color);
                    char_colores += `
                    <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="color-${id_color}" name="colores_prod" value="${nombre_color}" onclick="validarRB()">
                            <label class="custom-control-label" for="color-${id_color}">${nombre_color}</label>
                        </div>
                        `;
                }        
            });

            //mostrar detalle producto
            chart_detalle_prod += `            
                <h3 id="nom_prod" class="font-weight-semi-bold">${nomproducto}</h3>
                <div class="d-flex mb-3">
                    <div class="text-primary mr-2">
                        <small class="fas fa-star"></small>
                        <small class="fas fa-star"></small>
                        <small class="fas fa-star"></small>
                        <small class="fas fa-star-half-alt"></small>
                        <small class="far fa-star"></small>
                    </div>
                    <small class="pt-1">(50 Reviews)</small>
                </div>
                <div class="form-inline">    
                                <h6 class="font-weight-bold">S/</h6>
                <h5 id="precio_int" class="font-weight-bold">${precio_internet}</h3>
                </div>
                <p class="mb-4"></p>
                <div class="d-flex mb-3">
                    <p class="text-dark font-weight-medium mb-0 mr-3">Tallas:</p>
                    <form name="f_tallas">`+char_tallas+
                    
                    `</form>
                </div>
                <div class="d-flex mb-4">
                    <p class="text-dark font-weight-medium mb-0 mr-3">Colors:</p>
                    <form name="f_colores">`+char_colores+
                        
                    `</form>
                </div>
                <div class="d-flex align-items-center mb-4 pt-2">
                    <div class="input-group quantity mr-3" style="width: 130px;">
                        <div class="input-group-btn">
                            <button class="btn btn-primary btn-minus" id="menos" onclick="det_menosCantidad()">
                            <i class="fa fa-minus restar"></i>
                            </button>
                        </div>
                        <input type="text" class="form-control bg-secondary text-center" id="cantidad" value="1" min="1" max="" readonly="readonly">
                        <div class="input-group-btn">
                            <button class="btn btn-primary btn-plus" id="mas" onclick="det_masCantidad()">
                                <i class="fa fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <button id="btn_carrito" class="btn btn-primary px-3" data-toggle="modal" data-target="#exampleModalCenter" onclick="agregarCarrito()" disabled><i class="fa fa-shopping-cart mr-1"></i>Agregar Carrito</button>
                    
                </div>
                <div class="">
                <button id="btn_vercarrito" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" onclick="irCarrito()"><i class="fa fa-shopping-cart mr-1"></i>Ver Carrito</button>
                </div>
           
            `;

            chart_detalle_prod_Final += chart_detalle_prod;            
            conta++;
        }        
    });
    
    show_detail_prod.innerHTML = chart_detalle_prod_Final;   
    
}

function verCarrito(){
    console.log("ver carrito app");
    //window.open("cart.html", "_self");
    var carritoT = JSON.parse(localStorage.getItem("items_carrito")) || [];    
    //mostrar contador carrito en el icono del carrito
    document.getElementById("contador_carrito").innerText = carritoT.length;
    console.log(carritoT);
}