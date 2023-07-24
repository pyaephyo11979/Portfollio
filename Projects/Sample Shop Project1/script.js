let cartbadge=document.getElementById("cart_item")
let btn=document.getElementById("btn");
let badge=0;
let menClothings=document.getElementById("men's clothing");
let womenClothings=document.getElementById("women's clothng");
let usualProducts=document.getElementById("aPProducts")
let products=document.querySelector('#productDisplay');
product.forEach((val)=>{
    console.log(val)
    console.log(products)
    products.innerHTML +=`
    <div class="col mt-2 mb-2"  id="${val.category}">
    <div class="card" style="width:300px; height:420px;">
        <div class="card-body">
            <div class="card-title">${val.title}</div>
            <div class="card-img"><img src="${val.image}" class="img-fluid" style="width:50%" alt="AirJordan"></div>
            <p class="mt-auto"><b>$ ${val.price}</b></p>
        </div>
        <div class="card-footer">
            <button  type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#productinfo">BuyNow <i class="fas fa-credit-card"></i> </button>
            <button type="button" id="btn" onclick="addtocart()" class="btn btn-secondary">AddToCart <i class="fas fa-shopping-cart"></i></button>
        </div>
    </div>
</div>
    ` 
    console.log(val.category);
})
function men(){
    usualProducts.style.display="none";
    womenClothings.style.display="none";
    menClothings.style.display="block";
}
function woman(){
    usualProducts.style.display="none";
    womenClothings.style.display="block";
    menClothings.style.display="none";
}
function showAll(){
    usualProducts.style.display="block";
    womenClothings.style.display="block";
    menClothings.style.display="block";
}
function addtocart(){
    badge+=1;
    cartbadge.innerHTML=`${badge}`
    cartbadge.style.display="block"
}
function removefromcart(){
    badge-=1;
    cartbadge.innerHTML=`${badge}`
    if(badge<=0){
        cartbadge.style.display="none"
    }else{
        cartbadge.style.display="block"
    }
}