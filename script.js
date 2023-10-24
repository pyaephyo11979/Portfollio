let container=document.querySelector('body');
let  button=document.getElementById('dNBtn');
let navItem=document.getElementById("navItem");
let profileImg=document.getElementById("introImg");
let pBar1=document.getElementById('progressBar1');
let pBar2=document.getElementById('progressBar2');
let pBar3=document.getElementById('progressBar3');
let pBar4=document.getElementById('progressBar4');
let pBars=document.querySelectorAll('.pBar');
let projectBtns=document.querySelectorAll('.projBtn');
let experiBtns=document.querySelectorAll('.experiBtn');
let darkThemeDetector=window.matchMedia("(prefers-color-scheme:dark)");
let themeMatch=darkThemeDetector.matches
function dark(){
    container.setAttribute('data-bs-theme','dark');
    profileImg.classList.remove('w3-light-blue');
    profileImg.classList.add('w3-amber');
    pBars.forEach((bar)=>{
        bar.classList.add('w3-amber');
        bar.classList.remove('w3-blue');
    })
    projectBtns.forEach((btn)=>{
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-warning');
    })
    experiBtns.forEach((btn)=>{
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-warning');
    })
    button.style.color="white";
    
}
function light(){
    container.setAttribute('data-bs-theme','light');
    profileImg.classList.remove('w3-amber');
    profileImg.classList.add('w3-light-blue');
    pBars.forEach((bar)=>{
        bar.classList.remove('w3-amber');
        bar.classList.add('w3-blue');
    })
    projectBtns.forEach((btn)=>{
        btn.classList.remove('btn-warning');
        btn.classList.add('btn-primary');
    })
    experiBtns.forEach((btn)=>{
        btn.classList.remove('btn-warning');
        btn.classList.add('btn-primary');
    })
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