var ProductName = document.getElementById("ProductName");
var ProductPrice = document.getElementById("ProductPrice");
var ProductCatougry = document.getElementById("ProductCatougry");
var upProductDesc = document.getElementById("ProductDesc");
var upProductName = document.getElementById("upProductName");
var upProductPrice = document.getElementById("upProductPrice");
var upProductCatougry = document.getElementById("upProductCatougry");
var upProductDesc = document.getElementById("upProductDesc");


var productContainer ;

if(localStorage.getItem("products") == null){
    productContainer = [];
}
else{
    productContainer = JSON.parse(localStorage.getItem("products"));
    displayProduct();
}

function addproduct() {
    if (checkInputs() == true) {
        var product = {
            name: ProductName.value,
            price: ProductPrice.value,
            cate: ProductCatougry.value,
            desc: ProductDesc.value
        }
        productContainer.push(product);
        localStorage.setItem("products" , JSON.stringify(productContainer));
        clearInput();
        displayProduct();

    }
    else {
        alert("Please check the input");
    }


}

function checkInputs() {
    if (ProductName.value == "" || ProductPrice.value == "" || ProductCatougry.value == "" || ProductDesc.value == "") {
        return false;
    }
    else {
        return true;
    }
}

/**----------------------------display-------------------- */

function displayProduct() {
    var content = '';
    for (var i = 0; i < productContainer.length; i++) {
        content += `<tr>
        <td>`+ i + `</td>
        <td>`+ productContainer[i].name + `</td>
        <td>`+ productContainer[i].price + `</td>
        <td>`+ productContainer[i].cate + `</td>
        <td>`+ productContainer[i].desc + `</td>
        <td><button class="btn btn-outline-warning" onclick="updateProduct(`+i+`)">Update</button>
        </td><td><button class="btn btn-outline-danger" onclick="deleteProduct(`+i+`)" >delete</button></td>
        </tr>`;
    }
    document.getElementById("mybody").innerHTML = content;
}
function clearInput() {
    ProductName.value = '';
    ProductPrice.value = '';
    ProductCatougry.value = '';
    ProductDesc.value = '';
}

/**-----------------delete----------------- */

function deleteProduct(index){
    productContainer.splice(index,1);
    localStorage.setItem("products" , JSON.stringify(productContainer));
    displayProduct();
}

/**------------------search-------------------- */

function searchProduct(word){
    var content = "";
    for(var i = 0 ; i < productContainer.length ; i++){
        if(productContainer[i].name.toLowerCase().includes(word.toLowerCase())
         || productContainer[i].cate.toLowerCase().includes(word.toLowerCase())){
            content += `<tr>
        <td>`+ i + `</td>
        <td>`+ productContainer[i].name + `</td>
        <td>`+ productContainer[i].price + `</td>
        <td>`+ productContainer[i].cate + `</td>
        <td>`+ productContainer[i].desc + `</td>
        <td><button class="btn btn-outline-warning" onclick="updateProduct(`+i+`)">Update</button>
        </td><td><button class="btn btn-outline-danger" onclick="deleteProduct(`+i+`)" >delete</button></td>
        </tr>`;
        }

    }
    if(content == ""){
        content = "<tr><td>NOt Found</td></tr>"
    }

    document.getElementById("mybody").innerHTML = content;

}

/**------------------UPDATE ------------------- */
var newEnter = 0 ;
function updateProduct(index){
    document.getElementById("update").style.display = "block";
    upProductName.value = productContainer[index].name;
    upProductPrice.value = productContainer[index].price;
    upProductCatougry.value = productContainer[index].cate;
    upProductDesc.value = productContainer[index].desc;
    newEnter = index;
}

 
function addItem(){

    for (var i = 0; i < productContainer.length; i++) {
        
        if(i == newEnter){
            var product = {
                name: upProductName.value,
                price: upProductPrice.value,
                cate: upProductCatougry.value,
                desc: upProductDesc.value
            }

            productContainer[i].name = product.name;
            productContainer[i].price = product.price;
            productContainer[i].cate = product.cate;
            productContainer[i].desc = product.desc;
        }
    }
    localStorage.setItem("products" , JSON.stringify(productContainer));
    displayProduct();
    document.getElementById("update").style.display = "none";

    /**if (useer Eneter any value in searchInpute) and do update after that */
    
    document.getElementById("search").value ="";
}