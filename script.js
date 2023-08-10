let container=document.querySelector('body');
let  button=document.getElementById('dNBtn');
let navItem=document.getElementById("navItem");
let navBar=document.getElementById("navBar");
let profileImg=document.getElementById("introImg");
let pBar1=document.getElementById('progressBar1');
let pBar2=document.getElementById('progressBar2');
let pBar3=document.getElementById('progressBar3');
let pBar4=document.getElementById('progressBar4');
let projectBtn1=document.getElementById('projBtn1');
let projectBtn2=document.getElementById('projBtn2');
let projectBtn3=document.getElementById('projBtn3');
let experiBtn1=document.getElementById('htmlCSSbtn');
let experiBtn2=document.getElementById('jSbtn');
let experiBtn3=document.getElementById('j2EEbtn');
let experiBtn4=document.getElementById('figmabtn');
let darkThemeDetector=window.matchMedia("(prefers-color-scheme:dark)");
let themeMatch=darkThemeDetector.matches
function dark(){
    container.setAttribute('data-bs-theme','dark');
    navBar.classList.remove('bg-white');
    navBar.classList.remove('bg-light');
    navBar.classList.add('bg-dark');
    profileImg.classList.remove('w3-light-blue');
    profileImg.classList.add('w3-amber');
    pBar1.classList.remove('w3-blue');
    pBar1.classList.add('w3-amber');
    pBar2.classList.remove('w3-blue');
    pBar2.classList.add('w3-amber');
    pBar3.classList.remove('w3-blue');
    pBar3.classList.add('w3-amber');
    pBar4.classList.remove('w3-blue');
    pBar4.classList.add('w3-amber');
    projectBtn1.classList.remove('btn-primary');
    projectBtn1.classList.add('btn-warning');
    projectBtn2.classList.remove('btn-primary');
    projectBtn2.classList.add('btn-warning');
    projectBtn3.classList.remove('btn-primary');
    projectBtn3.classList.add('btn-warning');
    experiBtn1.classList.remove('btn-primary');
    experiBtn1.classList.add('btn-warning');
    experiBtn2.classList.remove('btn-primary');
    experiBtn2.classList.add('btn-warning');
    experiBtn3.classList.remove('btn-primary');
    experiBtn3.classList.add('btn-warning');
    experiBtn4.classList.remove('btn-primary');
    experiBtn4.classList.add('btn-warning');
    button.style.color="white";
    
}
function light(){
    container.setAttribute('data-bs-theme','light');
    navBar.classList.remove('bg-dark');
    navBar.classList.add('bg-light');
    profileImg.classList.remove('w3-amber');
    profileImg.classList.add('w3-light-blue');
    pBar1.classList.remove('w3-amber');
    pBar1.classList.add('w3-blue');
    pBar2.classList.remove('w3-amber');
    pBar2.classList.add('w3-blue');
    pBar3.classList.remove('w3-amber');
    pBar3.classList.add('w3-blue');
    pBar4.classList.remove('w3-amber');
    pBar4.classList.add('w3-blue');
    projectBtn1.classList.remove('btn-warning');
    projectBtn1.classList.add('btn-primary');
    projectBtn2.classList.remove('btn-warning');
    projectBtn2.classList.add('btn-primary');
    projectBtn3.classList.remove('btn-warning');
    projectBtn3.classList.add('btn-primary');
    experiBtn1.classList.remove('btn-warning');
    experiBtn1.classList.add('btn-primary');
    experiBtn2.classList.remove('btn-warning');
    experiBtn2.classList.add('btn-primary');
    experiBtn3.classList.remove('btn-warning');
    experiBtn3.classList.add('btn-primary');
    experiBtn4.classList.remove('btn-warning');
    experiBtn4.classList.add('btn-primary');
    button.style.color="black";
}
if(themeMatch){
    dark();
}else{
    light();
}
button.addEventListener('click',()=>{
    if(!container.hasAttribute('data-bs-theme') ){
         dark();
    }else if(container.hasAttribute('data-bs-theme') ){
        light();
        container.removeAttribute('data-bs-theme')
    }
});
AOS.init();