let container=document.querySelector('body');
let  button=document.getElementById('dNBtn')
function dark(){
    container.setAttribute('data-bs-theme','dark');
    button.style.backgroundColor="white";
    button.style.color="black";
}
function light(){
    container.setAttribute('data-bs-theme','light');
    button.style.backgroundColor="black";
    button.style.color="white";
}
button.addEventListener('click',()=>{
    if(!container.hasAttribute('data-bs-theme')){
         dark();
    }else if(container.hasAttribute('data-bs-theme')){
        light();
        container.removeAttribute('data-bs-theme')
    }
});