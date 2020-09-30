var dataProduct = {};


document.addEventListener("DOMContentLoaded", function (e) {
  
  function showSelectProduct(){
    getJSONData(CART_INFO_URL).then(function (resultObj) {
      if (resultObj.status === "ok") {
        dataProduct = resultObj.data;
          // console.log(dataProduct)
          
          let htmlContentToAppend = "";
         
          // let nameHTML = document.getElementById("name");
          // let unitCost = document.getElementById("unitCost");
          // let count = document.getElementById("count");
          // let total = document.getElementById("total");
          // let currency = document.getElementById("currency");
    
          // nameHTML.innerHTML = dataProduct.name;
          // unitCost.innerHTML = dataProduct.uniCost;
          // count.innerHTML = dataProduct.count;
          // total.innerHTML = dataProduct.total;
          // currency.innerHTML = dataProduct.currency;
    
          
  
          htmlContentToAppend += `
          <div class="row">
            <div class="col">`+dataProduct.src+`</div>
            <div class="col">`+dataProduct.name+`</div>
            <div class="col">`+dataProduct.uniCost+`</div>
            <div class="col">`+dataProduct.total+``+dataProduct.count+`</div>
          </div>`
  
          document.getElementById("selectProduct").innerHTML = htmlContentToAppend;
      }
    });
  }
  
  
  showSelectProduct();
 
});



// document.addEventListener("DOMContentLoaded", function(e){
   
   
//    function selectShipping(){
//     let htmlContentToAppend = "";

   
//             htmlContentToAppend = `
//             <div class="modal-dialog modal-dialog-centered">
//               ...
//             </div>`
            
            
        

//         document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;


    

//    }
   
   
//     document.getElementById(btnSelectShipping).addEventListener("click", function () {
//         selectShipping();

//     });
    
// });






// class cart{
//     //añadir productos al carrito
//     buyProduct(e){
//         e.preventDefault();
//         if(e.target.classList.contains('buyButton')){
//             const producto = e.target.parentElement.parentElement;
//             this.readDataProduct(producto);
//         }
//     }
// }