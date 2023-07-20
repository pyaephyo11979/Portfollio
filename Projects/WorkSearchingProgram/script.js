
var sam_job_panel=document.getElementById('sam');
var rpda_job_panel=document.getElementById('rpda');
var job_panel_sample=document.getElementById('panel');
var lupyan_job_panel=document.getElementById('lupyan');
var search_loading=document.getElementById("search_loading");
var search_sam=document.getElementById("Samsung");
var search_rpda=document.getElementById("RPDA");
var search_lup=document.getElementById("LuPyan");
var search_items=document.querySelector('input');
var search_btn=document.getElementById("search-btn");
var search_result_panel=document.getElementById("search_result_panel");
var Samsung="Samsung"
var RPDA="RPDA"
var Lupyan="Lupyan"
search_result_panel.style.display="none"
search_sam.style.display="none"
search_rpda.style.display="none"
search_lup.style.display="none"
lupyan_job_panel.style.display="none"
rpda_job_panel.style.display='none'
sam_job_panel.style.display="none"
function sam(){
    job_panel_sample.style.display="none"
    sam_job_panel.style.display="block"
    rpda_job_panel.style.display="none"
    lupyan_job_panel.style.display="none"
    search_result_panel.style.display="none"
}

function rpda(){
    job_panel_sample.style.display="none"
    sam_job_panel.style.display="none"
    rpda_job_panel.style.display="block"
    lupyan_job_panel.style.display="none"
    search_result_panel.style.display="none"
}
function lupyan(){
    job_panel_sample.style.display="none"
    sam_job_panel.style.display="none"
    rpda_job_panel.style.display="none"
    lupyan_job_panel.style.display="block"
    search_result_panel.style.display="none"
}
search_btn.addEventListener('click',function(e){
    var searchTerm=search_items.value;
    if(searchTerm===Samsung){
        search_result_panel.style.display="block"
        search_sam.style.display="block"
        search_rpda.style.display="none"
        search_lup.style.display="none"
        search_loading.style.display="none"
    } else if (searchTerm===RPDA){
        search_result_panel.style.display="block"
        search_sam.style.display="none"
search_rpda.style.display="block"
search_loading.style.display="none"
search_lup.style.display="none"
    } else if(searchTerm===Lupyan){
        search_result_panel.style.display="block"
        search_sam.style.display="none"
search_rpda.style.display="none"
search_lup.style.display="block"
search_loading.style.display="none"
    } else{
        search_sam.style.display="none"
        search_rpda.style.display="none"
        search_lup.style.display="none"
        search_loading.style.display="block"
        search_result_panel.style.display="block"
        // job_panel_sample.style.display="block"
        // sam_job_panel.style.display="none"
        // rpda_job_panel.style.display="none"
        // lupyan_job_panel.style.display="none"
    }
})
