let container=document.querySelector('body');
let  button=document.getElementById('dNBtn');
let navItem=document.getElementById("navItem");
function dark(){
    container.setAttribute('data-bs-theme','dark');
    button.style.color="white";
}
function light(){
    container.setAttribute('data-bs-theme','light');
    button.style.color="black";
}
button.addEventListener('click',()=>{
    if(!container.hasAttribute('data-bs-theme')){
         dark();
    }else if(container.hasAttribute('data-bs-theme')){
        light();
        container.removeAttribute('data-bs-theme')
    }
});