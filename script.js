let container=document.querySelector('body');
let  button=document.getElementById('dNBtn');
let navItem=document.getElementById("navItem");
let navBar=document.getElementById("navBar");
let profileImg=document.getElementById("introImg");
function dark(){
    container.setAttribute('data-bs-theme','dark');
    navBar.classList.remove('bg-white');
    navBar.classList.remove('bg-light');
    navBar.classList.add('bg-dark');
    profileImg.classList.remove('w3-light-blue');
    profileImg.classList.add('w3-amber');
    button.style.color="white";
    
}
function light(){
    container.setAttribute('data-bs-theme','light');
    navBar.classList.remove('bg-dark');
    navBar.classList.add('bg-light');
    profileImg.classList.remove('w3-amber');
    profileImg.classList.add('w3-light-blue');
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