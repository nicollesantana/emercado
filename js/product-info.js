var productCategory = {};
var localstoragecomentarios = {};

function showInfoProduct(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        if (i == 0) {
            htmlContentToAppend = ` <div class="carousel-item active">
        <img src="` + imageSrc + `" class="d-block w-100" alt="...">
        </div>`
        } else {
            htmlContentToAppend += ` <div class="carousel-item">
       <img src="` + imageSrc + `" class="d-block w-100" alt="...">
       </div>`

        }

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;


        // htmlContentToAppend += `
        // <div class="col-lg-3 col-md-4 col-6">
        //     <div class="d-block mb-4 h-100">
        //         <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
        //     </div>
        // </div>
        // `

        // document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function cargarcomentarios() {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productCategory = resultObj.data;
            // console.log(productCategory)

            let categoryNameHTML = document.getElementById("categoryName");
            let categoryDescriptionHTML = document.getElementById("categoryDescription");
            let productCountHTML = document.getElementById("productCount");
            let productCriteriaHTML = document.getElementById("productCriteria");
            let productCategoryHTML = document.getElementById("categoria");

            categoryNameHTML.innerHTML = productCategory.name;
            categoryDescriptionHTML.innerHTML = productCategory.description;
            productCountHTML.innerHTML = productCategory.cost;
            productCriteriaHTML.innerHTML = productCategory.soldCount;
            productCategoryHTML.innerHTML = productCategory.category;

            //Muestro las imagenes en forma de galería
            showInfoProduct(productCategory.images);
        }
    });

    // comentarios

    // carga en array los comentarios guardados en localstorage
    localstoragecomentarios = JSON.parse(localStorage.getItem("datos"));
    console.log(localstoragecomentarios);
    let htmlContentToAppend = "";
    for (let i = 0; i < localstoragecomentarios.length; i++) {
        let com = localstoragecomentarios[i];

        htmlContentToAppend += `
                
                <ul id="comments-list" class="comments-list">
                <li>
                  <div class="mail-level">`
        if (i >= 4) {
            htmlContentToAppend += `<div class="avatar"><img src="img/4.PNG" alt=""></div>`;
        } else {
            htmlContentToAppend += `<div class="avatar"><img src="img/` + i + `.PNG" alt=""></div>`;
        }

        htmlContentToAppend += `
                    <div class="box">
                      <div class="head-box">
                       <h6 class="comment-name by-author"><a href="">` + com.user + `</a></h6>
                        <span>` + com.dateTime + `&nbsp; &nbsp;</span>`;

        htmlContentToAppend += `<span><form action="">`;
        for (let j = 5; j >= 1; j--) {
            if (com.score != j)
                htmlContentToAppend += ` <input type="radio"name="` + i + `" class="star star` + j + `" id="star` + j + `"disabled><label for="star` + j + `" class="star star` + j + `"></label>`;
            else
                htmlContentToAppend += `<input type="radio"name="` + i + `" class="star star` + j + `" id="star` + j + `" checked disabled><label for="star` + j + `" class="star star` + j + `"></label>`;
        }
        htmlContentToAppend += `<br></form></span>
                        <i class="fa fa-reply" aria-hidden="true"></i>
                        <i class="fa fa-thumbs-down" aria-hidden="true"></i>
                        <i class="fa fa-thumbs-up" aria-hidden="true"></i>
                        </div>
                      <div class="content">
                        ` + com.description + `
                      </div>
                    </div>
                  </div>
                  </li>
                </ul>
            
                `
        document.getElementById("comentarios").innerHTML = htmlContentToAppend;

    }
}


function cargarcarruselRelatedProducts() {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            infoProduct = resultObj.data; //cargando json 5678
        }
        // console.log(infoProduct.relatedProducts[1]);
        allProducts = JSON.parse(localStorage.getItem("productos")); //carga el json all

        imagen = []; //declaro array para guardar la ruta de las imagenes
      
        for (let i = 0; i < infoProduct.relatedProducts.length; i++) {
            let elementoArray = infoProduct.relatedProducts[i]
            imagen.push(allProducts[elementoArray].imgSrc); //agregando ruta de las imagenes en el array
           
            // console.log(imagen[1])
            if (i == 0) {
                htmlContentToAppend = ` <div class="carousel-item active col">
    <a href="product-info.html" class="list-group-item-action">
    <img src="` + imagen[i] + `" class="d-block w-100" alt="...">
    </a></div>`
            } else {
                htmlContentToAppend += ` <div class="carousel-item col">
   <a href="product-info.html" class="list-group-item-action">
   <img src="` + imagen[i] + `" class="d-block w-100" alt="...">
   </a>
   </div>`

            }
        }
        document.getElementById("imagenes").innerHTML = htmlContentToAppend;


    });

}

document.addEventListener("DOMContentLoaded", function (e) {
    cargarcomentarios();
    // cargarProductoRelacionado();
    cargarcarruselRelatedProducts();

});


document.getElementById("comentar").addEventListener("click", function (e) {
    e.preventDefault();
    let descrip = document.getElementById('Textarea1').value;
    // Agrupando todos los radios en radioGroup
    let radioGroup = document.getElementsByName('star');
    let dataScore = 0;

    let d = new Date();
    let fechaHora = d.toString();
    let formatFecha = fechaHora.replace(fechaHora.substring(fechaHora.lastIndexOf(":") + 3, fechaHora.length), "");

    // recorriendo el radio group para detectar elemento marcado
    for (var i = 0; i < radioGroup.length; i++) {
        if (radioGroup[i].checked) {
            dataScore = radioGroup[i].value;
            // desmarcar el radio button
            radioGroup[i].checked = false;
        }
    }
    // alert(dataScore);
    let newcomentario = {
        "score": dataScore,
        "description": descrip,
        "user": localStorage.getItem('email'),
        "dateTime": formatFecha
    };

    // Agregar nuevo comentario al array localstoragecomentarios
    localstoragecomentarios.push(newcomentario);
    // Actualizar localestarage con nuevo comentario
    localStorage.setItem("datos", JSON.stringify(localstoragecomentarios));
    cargarcomentarios();
    document.getElementById('Textarea1').value = "";


});