var showgalery_bycat = document.getElementById("showgalery_bycat");
const titulo_categoria = document.getElementById("titulo_categoria");
var show_detail_prod = document.getElementById("show_detail_prod");
const show_menu_navegacion = document.getElementById("show_menu_navegacion");
const show_footer = document.getElementById("show_footer");
const show_navegacion_responsiva = document.getElementById("show_navegacion_responsiva");
const show_imagenes_detalleproducto = document.getElementById("show_imagenes_detalleproducto");   


var datos = [];
var chart = "";
var chart_detalle_prod = "";
var char_tallas = "";
var char_colores = "";
var chart_detalle_prod_Final = "";
var chart_navegacion = "";
var chart_footer = "";
var chart_navegacion_responsiva = "";
var chart_galeria_img_detalleproducto  = "";

window.onload = function (){
console.log("ONLOAD APP=========>");
menu_navegacion();
cargar_datos();
mostrarcategorias();
elegirCategoria();
verCarrito2();
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

function menu_navegacion(){
      
    chart_navegacion += `
    <div class="row align-items-center py-3 px-xl-5">
            <div class="col-lg-3 d-none d-lg-block">
                <a href="" class="text-decoration-none">
                    <h1 class="m-0 display-5 font-weight-semi-bold"><span class="text-primary font-weight-bold border px-3 mr-1">TV</span>40días</h1>
                </a>
            </div>
            <div class="col-lg-6 col-6 text-left">
                <form action="">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search for products">
                        <div class="input-group-append">
                            <span class="input-group-text bg-transparent text-primary">
                                <i class="fa fa-search"></i>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-lg-3 col-6 text-right">
                <a href="" class="btn border">
                    <i class="fas fa-heart text-primary"></i>
                    <span class="badge">0</span>
                </a>
                <a href="" class="btn border">
                    <i class="fas fa-shopping-cart text-primary"></i>
                    <span class="badge" id="contador_carrito">0</span>
                </a>
            </div>
    </div>
    `;
    show_menu_navegacion.innerHTML = chart_navegacion;

    chart_footer += `
<div class="row px-xl-5 pt-5">
    <div class="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
        <a href="" class="text-decoration-none">
            <h1 class="mb-4 display-5 font-weight-semi-bold"><span class="text-primary font-weight-bold border border-white px-3 mr-1">TV</span>40días</h1>
        </a>
        <p>TV 40días es una tienda virtual con un propósito definido que es entregar productos de calidad para nuestros clientes.</p>                
        <p class="mb-2"><i class="fa fa-envelope text-primary mr-3"></i>mbolivar.ing@gmail.com</p>
        <p class="mb-0"><i class="fa fa-phone-alt text-primary mr-3"></i>+51999781083</p>
    </div>
    <div class="col-lg-8 col-md-12">
        <div class="row">
            <div class="col-md-4 mb-5">
                <h5 class="font-weight-bold text-dark mb-4">Links</h5>
                <div class="d-flex flex-column justify-content-start">
                    <a class="text-dark mb-2" href="index.html"><i class="fa fa-angle-right mr-2"></i>Inicio</a>
                    
                </div>
            </div>
            
        </div>
    </div>
</div>
<div class="row border-top border-light mx-xl-5 py-4">
    <div class="col-md-6 px-xl-0">
        <p class="mb-md-0 text-center text-md-left text-dark">
            &copy; <a class="text-dark font-weight-semi-bold" href="#">TV 40días</a>. All Rights Reserved. Designed
            by
            <a class="text-dark font-weight-semi-bold" href="#">Raiko Consulting</a>
        </p>
    </div>
    <div class="col-md-6 px-xl-0 text-center text-md-right">
        <img class="img-fluid" src="img/payments.png" alt="">
    </div>
</div>
    `;
    show_footer.innerHTML = chart_footer;

    chart_navegacion_responsiva += `    
    <a href="" class="text-decoration-none d-block d-lg-none">
        <h1 class="m-0 display-5 font-weight-semi-bold"><span class="text-primary font-weight-bold border px-3 mr-1">TV</span>40días</h1>
    </a>
    <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
        <div class="navbar-nav mr-auto py-0">
            <a href="index.html" class="nav-item nav-link active">Inicio</a>
            <a href="cart.html" class="nav-item nav-link">Ver Carrito</a>
            
        </div>
        <div class="navbar-nav ml-auto py-0">
            <a href="" class="nav-item nav-link">Login</a>
            <a href="" class="nav-item nav-link">Register</a>
        </div>
    </div>
    `;
    show_navegacion_responsiva.innerHTML = chart_navegacion_responsiva;
}

//mostrar categorias
function mostrarcategorias(){
    const show_allcategories = document.getElementById("show_allcategories");
    const show_allcategories_banner = document.getElementById("show_allcategories_banner"); 
    const show_menucategorias = document.getElementById("show_menucategorias");   
     
    //console.log("categorias");
    var bdprod = JSON.parse(localStorage.getItem("bd-productos")) || [];   
    var categorias = bdprod.categorias;
    var imagen_prod = "";
    var nomproducto = "";
    var conta=0;
    var carritoContent3 = "";
    categorias.forEach((cat) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "col-lg-4 col-md-6 pb-1";
        carritoContent.innerHTML = `
                <div class="cat-item d-flex flex-column border mb-4" style="padding: 30px;">
                    <p class="text-right"></p>
                    <a href="" class="cat-img position-relative overflow-hidden mb-3" onclick="elegirCategoria()">
                        <img class="img-fluid" src="${cat.default_img_cat}" alt="${cat.nomcategoria}" id="${cat.id}">
                    </a>
                    <h5 class="font-weight-semi-bold m-0">${cat.nomcategoria}</h5>
                </div>
        `;
        show_allcategories.append(carritoContent);

        //menu categorias             
        carritoContent3 += `
                <a href="" class="nav-item nav-link pasarcategoria" id="${cat.id}" onclick="elegirCategoriaMenu()">${cat.nomcategoria}</a>
        `;
        show_menucategorias.innerHTML = carritoContent3;

        //categoria_banner
        if(conta === 0){
        let carritoContent2 = document.createElement("div");
        carritoContent2.className = "carousel-item active";   
        carritoContent2.style = "height: 410px;";     
        carritoContent2.innerHTML = `
        <img class="img-fluid" src="${cat.default_img_cat}" alt="${cat.nomcategoria}">
                            <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <div class="p-3" style="max-width: 700px;">
                                    <h4 class="text-light text-uppercase font-weight-medium mb-3"></h4>
                                    <h3 class="display-4 text-white font-weight-semi-bold mb-4">${cat.nomcategoria}</h3>
                                    
                                    <a href="" class="btn btn-light py-2 px-3 pasarProducto" id="${cat.id}" onclick="elegirProducto()">Comprar</a>
                                   
                                    
                                </div>
                            </div>
        `;
        show_allcategories_banner.append(carritoContent2);
        }else{
        let carritoContent2 = document.createElement("div");
        carritoContent2.className = "carousel-item elegirProducto2";   
        carritoContent2.style = "height: 410px;";     
        carritoContent2.innerHTML = `
        <img class="img-fluid" src="${cat.default_img_cat}" alt="${cat.nomcategoria}">
                            <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <div class="p-3" style="max-width: 700px;">
                                    <h4 class="text-light text-uppercase font-weight-medium mb-3"></h4>
                                    <h3 class="display-4 text-white font-weight-semi-bold mb-4">${cat.nomcategoria}</h3>
                                    
                                    <a href="" class="btn btn-light py-2 px-3 pasarProducto" id="${cat.id}" onclick="elegirProducto()">Comprar</a>
                                   
                                    
                                </div>
                            </div>
        `;
        show_allcategories_banner.append(carritoContent2);
        }

        conta++;
        
    });       
}

//elegir categoria
function elegirCategoria(){
    var allcategories = document.querySelector('.allcategories');
    allcategories.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.classList.contains('img-fluid')) {
            //n: c1,c2,c3
            var n = e.target.id;
            //const selectProduct = e.target.parentElement; 
            //readTheContent(selectProduct);
            //console.log(n);
            window.open("shop.html?id="+n, "_self");
        }  
    });
}

//elegir categoria del menu
function elegirCategoriaMenu(){
    var allcategories = document.querySelector('.allcategoriesMenu');
    allcategories.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.classList.contains('pasarcategoria')) {
            //n: c1,c2,c3
            var n = e.target.id;
            //const selectProduct = e.target.parentElement; 
            //readTheContent(selectProduct);
            console.log("entro categorias----------->");
            console.log(n);
            window.open("shop.html?id="+n, "_self");
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
            window.open("shop.html?id="+n, "_self");
        }  
    });
}

function elegirProducto2(){
    var elegirProducto = document.querySelector('.elegirProducto2');
    elegirProducto.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.classList.contains('pasarProducto2')) {
            //n: c1,c2,c3
            var n = e.target.id;
            //const selectProduct = e.target.parentElement; 
            //readTheContent(selectProduct);
            console.log("entro producto----------->");
            console.log(n);
            window.open("shop.html?id="+n, "_self");
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
    document.getElementById("titulo_categoria").innerHTML = titulo_categoria;  
    mostrargaleria_porcategoria(url_cat,c);
  }

function mostrargaleria_porcategoria(url_cat,c){
    let bdprod = JSON.parse(localStorage.getItem("bd-productos")) || [];   
    const productos = bdprod.productos;
    var imagen_prod = "";
    var nomproducto = "";
    productos.forEach((prod) => {
        //console.log(cat.id);
        if(prod.categoria === c){
         //console.log(prod.categoria);
         //console.log(prod.imagen);
         imagen_prod = prod.imagen;
         nomproducto = prod.nomproducto;

        //let content = document.createElement("div");
        chart += `
        <div class="col-lg-4 col-md-6 col-sm-12 pb-1">
            <div class="card product-item border-0 mb-4">
                <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                <a href="#">
                    <img class="img-fluid" src="${url_cat+prod.imagen}" alt="" id="${prod.id}">
                </a>
                </div>
                <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 class="text-truncate mb-3">${prod.nomproducto}</h6>
                    <div class="d-flex justify-content-center">
                        <h6>${prod.preciofer}</h6><h6 class="text-muted ml-2"><del>${prod.preciocat}</del></h6>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-between bg-light border">
                    <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View Detail</a>
                    <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</a>
                </div>
            </div>
        </div>
        `;
        //showgalery_bycat.append(content);

        }
        
     });

     //console.log(url_cat+imagen_prod);
     //console.log(nomproducto);
    
     showgalery_bycat.innerHTML = chart;
      
     
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
    var categoria_prod= "";
    var url_cat_img = "";
    //console.log("entro al app"+id);
    let bdprod = JSON.parse(localStorage.getItem("bd-productos")) || [];   
    const productos = bdprod.productos;
    const categorias = bdprod.categorias;
    var tallas = bdprod.tallas;
    var colores = bdprod.colores;
    productos.forEach((prod) => {
        if(prod.id === idp){
            prod_idcat = prod.categoria
            nomproducto = prod.nomproducto;
            precio_internet =prod.preciofer;
            cantidad_max = prod.cantidad;
            categoria_prod = prod.categoria;
            
            //cargamos los atributos para un producto de acuerdo a su categoria
            
            categorias.forEach((cat) => {
                if(categoria_prod === cat.id){
                    //c6 = c6
                    url_cat_img = cat.url_img;
                    
        
                }
            });           
        
            if(categoria_prod === "c6"){
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

                <p class="mb-4">
                El mejor regalo que podemos dar a nuestros hijos siempre será nuestra “Presencia”
Presente con sus emociones, presente en su autoestima, presente en su vida.<br>
En esta Navidad es una buena oportunidad para regalarle PRESENCIA a nuestros hijos, a través de este E-book “Las Siete raíces de los hijos exitosos” donde fortalecerás inteligencia emocional, dialogo reflexivo entre padres e hijos e ideas prácticas para fortalecer la presencia con ellos.
                </p>
                
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
                    <button id="btn_carrito" class="btn btn-primary px-3" data-toggle="modal" data-target="#exampleModalCenter" onclick="agregarCarrito()"><i class="fa fa-shopping-cart mr-1"></i>Agregar Carrito</button>
                </div>
                <div class="d-flex pt-2">
                    <p class="text-dark font-weight-medium mb-0 mr-2">Share on:</p>
                    <div class="d-inline-flex">
                        <a class="text-dark px-2" href="">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a class="text-dark px-2" href="">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a class="text-dark px-2" href="">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                        <a class="text-dark px-2" href="">
                            <i class="fab fa-pinterest"></i>
                        </a>
                    </div>
                </div>
           
            `;

            chart_detalle_prod_Final += chart_detalle_prod;
            
            conta++;


            
            //cargamos galeria_img_detalleproducto
            chart_galeria_img_detalleproducto += `
                <div class="carousel-item active">
                <img class="w-100 h-100" src="${url_cat_img}${prod.imagen}" id="img-active" alt="${prod.nomproducto}">        
                </div>
                `;
            show_imagenes_detalleproducto.innerHTML = chart_galeria_img_detalleproducto;

            
        }else{
            //cargo las tallas
            //metodo find: encuentra algo dentro del array, genera un nuevo array con el valor que le estoy pasando como parametro
var encuentraTalla = tallas.find(function(talla){
    return talla.id_cat === prod_idcat
});
//metodo filter: va generar un nuevo array y no modifica al anterior
var filtraTalla = tallas.filter(function(talla){
    return talla.id_cat === prod_idcat
});
//console.log(encuentraTalla);
//console.log(filtraTalla);

//chekeamos por default el 1er valor del arrary de tallas
             for (var t = 0; t < filtraTalla.length; t++) {
                //console.log(t);
                id_talla = filtraTalla[t].id_talla;
                nombre_talla = filtraTalla[t].nom_talla;
                if(t===0){
                    char_tallas += `
                            <div class="custom-control custom-radio custom-control-inline">
                                    <input type="radio" class="custom-control-input" checked id="size-${t}" name="tallas_prod" value="${nombre_talla}" onclick="validarRB()">
                                    <label class="custom-control-label" for="size-${t}">${nombre_talla}</label>
                                </div>
                    `;
                }else{
                    char_tallas += `
                    <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="size-${t}" name="tallas_prod" value="${nombre_talla}" onclick="validarRB()">
                            <label class="custom-control-label" for="size-${t}">${nombre_talla}</label>
                        </div>
                    `; 
                }
             }

            // 
            var filtrarColores = colores.filter(function(color){
                return color.id_cat === prod_idcat
            });
         

            //cargo los colores
            for (var j = 0; j < filtrarColores.length; j++) {               
                    nombre_color = filtrarColores[j].nom_color;   
                    id_color = filtrarColores[j].id_color;
                    if(j === 0){
                    char_colores += `
                    <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" checked id="color-${j}" name="colores_prod" value="${nombre_color}" onclick="validarRB()">
                            <label class="custom-control-label" for="color-${j}">${nombre_color}</label>
                        </div>
                    `;
                    }else{
                    char_colores += `
                    <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="color-${id_color}" name="colores_prod" value="${nombre_color}" onclick="validarRB()">
                            <label class="custom-control-label" for="color-${id_color}">${nombre_color}</label>
                        </div>
                    `;
                    }
                    
                 
                
            }
          

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

                <p class="mb-4">Seleccione una Talla y Color para activar el botón Agregar Carrito.</p>
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
                    <button id="btn_carrito" class="btn btn-primary px-3" data-toggle="modal" data-target="#exampleModalCenter" onclick="agregarCarrito()"><i class="fa fa-shopping-cart mr-1"></i>Agregar Carrito</button>
                </div>
                <div class="d-flex pt-2">
                    <p class="text-dark font-weight-medium mb-0 mr-2">Share on:</p>
                    <div class="d-inline-flex">
                        <a class="text-dark px-2" href="">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a class="text-dark px-2" href="">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a class="text-dark px-2" href="">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                        <a class="text-dark px-2" href="">
                            <i class="fab fa-pinterest"></i>
                        </a>
                    </div>
                </div>
           
            `;

            chart_detalle_prod_Final += chart_detalle_prod;
            
            conta++;


            
            //cargamos galeria_img_detalleproducto
            chart_galeria_img_detalleproducto += `
                <div class="carousel-item active">
                <img class="w-100 h-100" src="${url_cat_img}${prod.imagen}" id="img-active" alt="${prod.nomproducto}">        
                </div>
                `;
            show_imagenes_detalleproducto.innerHTML = chart_galeria_img_detalleproducto;
            



            }//cierro else

            

            

        }//cierro prod.id === idp

    });
    
    show_detail_prod.innerHTML = chart_detalle_prod_Final; 
    

    

    
}

function verCarrito2(){
    console.log("ver carrito app");
    //window.open("cart.html", "_self");
    var carritoT = JSON.parse(localStorage.getItem("items_carrito")) || [];    
    //mostrar contador carrito en el icono del carrito
    document.getElementById("contador_carrito").innerText = carritoT.length;
    console.log(carritoT);
}

