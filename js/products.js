const ORDER_ASC_BY_COST = "$a";
const ORDER_DESC_BY_COST = "$z";
const ORDER_BY_SOLD_COUNT = "Rel.";
var currentCategoriesArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var formulario = undefined;


function sortCategories(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) {
                return -1;
            }
            if (a.cost > b.cost) {
                return 1;
            }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) {
                return -1;
            }
            if (a.cost < b.cost) {
                return 1;
            }
            return 0;
        });
    } else if (criteria === ORDER_BY_SOLD_COUNT) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) {
                return -1;
            }
            if (aCount < bCount) {
                return 1;
            }
            return 0;
        });
    }

    return result;
}


function showCategoriesList() {

    let htmlContentToAppend = "";
    // let idButtonBuy = 1;

    for (let i = 0; i < currentCategoriesArray.length; i++) {
       let category = currentCategoriesArray[i];
       //generndo el id
       let idAddToCart = "add"+i.toString;
       let idButtonBuy = "buy"+i.toString;
       let idImg = "img"+i.toString;
       
       if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))) {

            htmlContentToAppend += `
        
            <div class="row">
                <div class="col-3">
                    <a href="product-info.html" class=" list-group-item-action">
                    <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail" id='`+idImg+`'></a>
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">` + category.name + `</h4>
                        <small class="text-muted">` + category.soldCount + ` artículos</small>
                    </div>
                    <p class="mb-1">` + category.description + `</p><br>
                    
                    <div class="row">
                        <div class="col">
                            <span><b> ` + category.currency + `-` + category.cost + `</b><span>
                        </div>
                      <div class="col">                  
                         <input type="submit" class="addToCart" id='`+idAddToCart+`' value="Agregar al carrito"><br><br>
                         <input type="submit" class="buyButton" id='`+idButtonBuy+`' value="Comprar"><br><br>
                       </div>              
                    </div>
                </div>
            </div>
            <hr> `
           
            
            document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
           
            document.getElementById(idAddToCart).addEventListener("click", function () {
                alert('diste click');
            });
            document.getElementById(idButtonBuy).addEventListener("click", function () {
                alert('diste click');
            });
        }
      
    }

}


// 
const addToShoppingButtons = document.querySelectorAll('.addToCart');
console.log('addToShoppingButtons')

function sortAndShowCategories(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;

    if (categoriesArray != undefined) {
        currentCategoriesArray = categoriesArray;
    }
    // guardar en el orden seleccionado
    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
}

function search() {

    let htmlContentToAppend = "";

    for (let i = 0; i < currentCategoriesArray.length; i++) {
        let category = currentCategoriesArray[i];
        let cadena = category.name.toLowerCase();
        let idAddToCartSearch = "add"+i.toString;
        let idButtonBuySearch = "buy"+i.toString;
        let idImg = "img"+i.toString;
        
        if (cadena.indexOf(formulario) !== -1) {

            htmlContentToAppend += `
            <div class="row">
                <div class="col-3">
                    <a href="product-info.html" class=" list-group-item-action">
                    <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail" id='`+idImg+`'></a>
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">` + category.name + `</h4>
                        <small class="text-muted">` + category.soldCount + ` artículos</small>
                    </div>
                    <p class="mb-1">` + category.description + `</p><br>
                
                    <div class="row">
                        <div class="col">
                            <span><b> ` + category.currency + `-` + category.cost + `</b><span>
                        </div>
                        <div class="col">
                         <input type="submit" class="addToCart" id='`+idAddToCartSearch+`' value="Agregar al carrito"><br><br>
                         <input type="submit" class="buyButton" id='`+idButtonBuySearch+`' value="Comprar"><br><br>
                        </div>              
                    </div>
                </div>
            </div>
         <hr> `
       
            document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
            document.getElementById(idAddToCartSearch).addEventListener("click", function () {
                alert('diste click');
            });
            document.getElementById(idButtonBuySearch).addEventListener("click", function () {
                alert('diste click');
            });

        }

        

    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            categoriesArray = resultObj.data;
            localStorage.setItem("productos", JSON.stringify(categoriesArray));

            //Muestro las categorías ordenadas
            sortAndShowCategories(ORDER_ASC_BY_COST, categoriesArray);
        }
    });
   
    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowCategories(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowCategories(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowCategories(ORDER_BY_SOLD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function () {

        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        } else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        } else {
            maxCount = undefined;
        }
        showCategoriesList();
        console.log("hasta aqui llega")
    });

    document.getElementById("editSearch").addEventListener("keyup", function (e) {
        e.preventDefault();
        formulario = document.getElementById("editSearch").value;

        search();

    });
    document.getElementById("boton").addEventListener("click", function (e) {
        e.preventDefault();
        formulario = document.getElementById("editSearch").value;

        search();

    });

});



getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
        let comentarios = resultObj.data;
        localStorage.setItem("datos", JSON.stringify(comentarios));
        console.log(comentarios)
    }
});

