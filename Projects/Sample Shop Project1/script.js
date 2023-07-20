let cartbadge=document.getElementById("cart_item")
let btn=document.getElementById("btn");
let badge=0;
let menClothings=document.getElementById("mencl");
let womenClothings=document.getElementById("womcl");
let usualProducts=document.getElementById("aPProducts")

// fetch('https://fakestoreapi.com/products')
// .then(res=>{
//    return res.json();
// })
// .then(data =>{
//     conaole.log(data);
// })
// btn.addEventListener('click',function(){ 
   
//     badge+=1;
//     cartbadge.innerHTML=`${badge}`
// })
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