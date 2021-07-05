var seartchInput = document.querySelector("input");
var li = [...document.querySelectorAll("li")];
var ul = document.querySelector("ul");
var span = document.querySelector("span");
var PLChars = ["ó","Ó","ą","Ą","ć","Ć","ę","Ę","ł","Ł","ń","Ń","ś","Ś","ź","Ź","ż","Ż"];
var PLCharsFilter = ["o","O","a","A","c","C","e","E","l","L","n","N","s","S","z","Z","z","Z"];
var liIndex = [];
var liIndexFilter = [];
var maxIndexList = 4;

        //pobiera domyślny html dla elementu li i wpisuje go do tablicy
for(var i = 0; i<li.length; i++){
    liIndex.push(li[i].innerHTML);
    liIndexFilter.push(liIndex[i]);
}
        //zamienia polskie znaki na znaki proste np.: ł>l Ą>A
for(var i = 0; i<li.length; i++){
    for(var b = 0; b<PLChars.length; b++){
        liIndexFilter[i] = liIndexFilter[i].replaceAll(PLChars[b], PLCharsFilter[b]);
    }
}
console.log("Przed filtrowaniem specjalnych znaków: "+liIndex);
console.log("Po filtrowaniu specjalnych znaków: "+liIndexFilter);

function clear(){
            //ukrywa liste ul
            ul.style.display = "none";
            //daje dla kazdego elementu li style display none
            for(var i = 0; i<li.length; i++){
                li[i].style = "display: none;";
            }  
}
//czyści liste li i ul
clear();

function seartchWord(e){
            //pobiera wartość wpisywaną za każdym razem do inputa
    var currentWord = e.target.value;
    var f = 0;
    console.log("Wartość w inpucie wynosi: "+currentWord);
    console.log(e.key)
    clear();
    if(currentWord==""){
        ul.style.display = "block";
        //daje dla kazdego elementu li style display none
        for(var i = 0; i<maxIndexList; i++){
            li[i].innerHTML = liIndex[i];
            li[i].style = "display: block";
        }
        return
    }
    ul.style.display = "block";
            //z currentWord zamienia polskie znaki np.: ł>l Ą>A
    for(var i = 0; i<PLChars.length; i++){
        currentWord = currentWord.replaceAll(PLChars[i], PLCharsFilter[i]);
    }
            //zamienia wpisywaną wartość na małe litery
    currentWord = currentWord.toLowerCase();
    console.log("Wartość w inpucie po filtrowaniu: "+currentWord);
            //usuwa z html'a polskie znaki
    for(var i = 0; i<li.length; i++){
        li[i].innerHTML = liIndexFilter[i];
    }
            //zamienia innerHTML na kazdego elementu li na małe litery
    for(var i = 0; i<li.length; i++){
        li[i].innerHTML = li[i].innerHTML.toLowerCase();//mozliwe ze localtolowercase idk
    }
            //sprawdza czy w danym slowie jest litera (currentWord)
    if(currentWord.length == 1){
        for(var i = 0; i<li.length; i++){
            if(li[i].innerHTML.charAt(0)==currentWord){
                if(f==maxIndexList && currentWord!=""){//usuń currentword!="" jeśli chcesz currentword == "" i lista ma mieć max ilość indexów
                    f = 0;
                    return;
                }else{
                    f++;
                    li[i].innerHTML = liIndex[i];
                    li[i].style = "display: block";
                }
            }
        }
        return
    }
    for(var i = 0; i<li.length; i++){
        if(li[i].innerHTML.includes(currentWord)){
            if(f==maxIndexList && currentWord!=""){//usuń currentword!="" jeśli chcesz currentword == "" i lista ma mieć max ilość indexów
                f = 0;
                return;
            }else{
                f++;
                console.log(liIndex)
                li[i].innerHTML = liIndex[i];
                li[i].style = "display: block";
            }
        }       
    }
}

var https1 = "https://www.google.com/search?q=";
//paste word
var https2 = "&oq=";
//paste word
var https3 = "&aqs=chrome.0.69i59j0j0i433j0j46i175i199j46i10j0l2j0i457j46i175i199.2020j0j7&sourceid=chrome&ie=UTF-8";
function searchWithGoogle(e){
    if(e.key=="Enter"){
        // console.log("enter naciśniety")
        var word = seartchInput.value;
        window.open(https1 + word + https2 + word + https3, "_blank");
    }
}
li.forEach(element=>{
    element.addEventListener("click",()=>{
        
    });
});

seartchInput.addEventListener("input", seartchWord);
seartchInput.addEventListener("keydown", searchWithGoogle);
window.addEventListener("click",()=>{
    if(seartchInput.value != ""){
        return;
    }
    if(seartchInput == document.activeElement){
        ul.style.display = "block";
        //daje dla kazdego elementu li style display none
        for(var i = 0; i<maxIndexList; i++){
            li[i].style = "display: block";
        }
    }else{
        ul.style.display = "none";
        //daje dla kazdego elementu li style display none
        for(var i = 0; i<maxIndexList; i++){
            li[i].style = "display: none";
        }
    }
});