var searchInput = document.querySelector("input");
var li = [...document.querySelectorAll("li")];
var ul = document.querySelector("ul");
var PLChars = ["ó","Ó","ą","Ą","ć","Ć","ę","Ę","ł","Ł","ń","Ń","ś","Ś","ź","Ź","ż","Ż"];
var PLCharsFilter = ["o","O","a","A","c","C","e","E","l","L","n","N","s","S","z","Z","z","Z"];
var resultList = [];
var resultListHTML = [];
var liIndex = [];
var liIndexFilter = [];
var maxIndexList = 4;   
var arrowTab = 0;
var arrowTabSelect = false;

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

for(var i = 0; i<maxIndexList; i++){
    resultList.push(i);
    resultListHTML.push(li[i].innerHTML)
}

function clear(e, op, word , selectLi){
    //ukrywa liste ul
    ul.style.display = "none";
    //daje dla kazdego elementu li style display none
    for(var i = 0; i<li.length; i++){
        li[i].style = "display: none;";
    }  
}
//czyści liste li i ul
clear();

function seartchWord(e, op, word, selectLi){
            //pobiera wartość wpisywaną za każdym razem do inputa
    var currentWord = e.target.value;
    var f = 0;
    arrowTabSelect = false;
    resultList = [];
    resultListHTML = [];
    console.log("Wartość w inpucie wynosi: "+currentWord);
    if(currentWord.charAt(currentWord.length -1) == " "){
        return;
    }else{
        clear();
    }
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
                    resultList.push(i);
                    resultListHTML.push(li[i].innerHTML);
                    arrowTab = 0;
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
                li[i].innerHTML = liIndex[i];
                li[i].style = "display: block";
                resultList.push(i);
                resultListHTML.push(li[i].innerHTML);
                arrowTab = 0;
            }
        }       
    }
}

var GoogleSearchURL = {
    hts1: "https://www.google.com/search?q=",
    hts2: "&oq=",
    hts3: "&aqs=chrome.0.69i59j0j0i433j0j46i175i199j46i10j0l2j0i457j46i175i199.2020j0j7&sourceid=chrome&ie=UTF-8"
};

function searchWithGoogle(e, op, word, selectLi){
    if(op=="li"){
        console.log("from goolge: " + word)
        window.open(GoogleSearchURL.hts1 + word + GoogleSearchURL.hts2 + word + GoogleSearchURL.hts3, "_blank");
    }
    if(e.key=="Enter" && arrowTabSelect == false){
        console.log(word)
        var word = searchInput.value;
        window.open(GoogleSearchURL.hts1 + word + GoogleSearchURL.hts2 + word + GoogleSearchURL.hts3, "_blank");
    }
    if(e.key=="Enter" && arrowTabSelect == true){
        window.open(GoogleSearchURL.hts1 + resultListHTML[arrowTab -1] + GoogleSearchURL.hts2 + resultListHTML[arrowTab -1] + GoogleSearchURL.hts3, "_blank");
    }
}

// UL>LI LIST INDEX ADDEVENTLISTENER

li.forEach(element=>{
    element.addEventListener("click", (e, word)=>{
        var word = element.innerHTML;
        searchWithGoogle(0, "li", word);
    });
});

searchInput.addEventListener("input", seartchWord);
searchInput.addEventListener("keydown", searchWithGoogle);
window.addEventListener("click",()=>{
    if(searchInput == document.activeElement){
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

searchInput.addEventListener("keydown",(e, op, word, selectLi)=>{
    if(e.key == "ArrowDown"){
        for(var i = 0; i<resultList.length; i++){
            li[resultList[i]].innerHTML = liIndex[resultList[i]];
        }
        if(arrowTab == resultList.length +1){
            arrowTab = 0;
        }
        li[resultList[arrowTab]].innerHTML = '<span style="color: red">'+li[resultList[arrowTab]].innerHTML+'</span>';
        arrowTabSelect = true;
        arrowTab++;
        selectLi = resultList[arrowTab];
    }
});




console.log(resultList)




// f++;
// li[i].innerHTML = liIndex[i];
// li[i].style = "display: block";