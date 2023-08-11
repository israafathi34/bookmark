
let siteName = document.querySelector("#siteName");
let siteUrl = document.querySelector("#siteUrl");


let submitBtn = document.querySelector("#submitBtn");
let visitBtn = document.querySelector("#visitBtn");
let deleteBtn = document.querySelector("#deleteBtn");


let rules_url = document.querySelector("#urlValidation");

if (localStorage.getItem('sitesList') == null) {
    sitesList = []

}else{
    sitesList = JSON.parse(localStorage.getItem('sitesList'));
    DisplaySites(sitesList);
}


submitBtn.addEventListener("click", function(){

    if(siteUrl.classList.contains('is-invalid')){
        rules_url.classList.remove("d-none");
        return;
    }

    
    if(!siteUrl.classList.contains('is-invalid')&& siteUrl.value.length !="" && siteName.value.length !="" && !siteName.classList.contains('is-invalid')){
        
        let site ={
            name: siteName.value,
            url:siteUrl.value,
        }    
    
        sitesList.push(site);
        localStorage.setItem('sitesList', JSON.stringify(sitesList));
        DisplaySites(sitesList);
        clear();
    }    

});



function DisplaySites (sitesList){
    let res="" ;
    for (const [index,site] of sitesList.entries()){

        res += `
            <tr>
            <th scope="row">${index+1}</th>
            <td>${site.name}</td>
            <td>
                <button  onclick="window.open('${site.url}')" class="btn btn-warning">
                    Visit
                </Button>
            </td>
            <td> <button id="deleteBtn" onclick="deleteSite(${index})" class="btn btn-danger">
                delete
            </Button>
        </td>
            </tr>`
    }

let container = document.querySelector("#cont") 
    container.innerHTML = res;
};



let clear = function () {
    siteName.value = ""
    siteUrl.value = ""
}

function deleteSite(i){
    sitesList.splice(i,1);
    localStorage.setItem('sitesList', JSON.stringify(sitesList));
    DisplaySites(sitesList);

}


let names = sitesList.map(check);
function check(site) {
    return  site.name
}


let checkName = function(key){
    let c = (names.indexOf(key) > -1 );
    if(!c){
        siteName.classList.add("is-valid");
        siteName.classList.remove("is-invalid");

    }else{
        siteName.classList.add("is-invalid");
    }

}


function checkUrl(url) {
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[^\s]*)?$/;
    if (!urlRegex.test(url)) {
    return false;
}

const protocolRegex = /^https?:\/\//;
if (!protocolRegex.test(url)) {
    return false;
}

const domainRegex = /^https?:\/\/([^\s.]+\.[^\s]{2,}|localhost)(\/[^\s]*)?$/;
if (!domainRegex.test(url)) {
    return false;
}

const pathRegex = /^https?:\/\/([^\s.]+\.[^\s]{2,}|localhost)(\/[^\s]*)$/;
if (url.includes("/") && !pathRegex.test(url)) {
    return false;
}

return true;
}

function urlValidation(url){

    if(checkUrl(url)) {
        siteUrl.classList.add("is-valid");
        siteUrl.classList.remove("is-invalid");
    } else {
        siteUrl.classList.add("is-invalid");
    }
}

rules_url.addEventListener('click',function(){
    rules_url.classList.add("d-none");
});
