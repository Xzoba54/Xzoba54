/*ArrayLekcje index list
0=historia
1=dz
2=biologia
3=matma
4=chemia
5=geografia
6=muzyka
7=fizyka
8=wf
9=niemiecki
10=plastyka
11=religia
12=angielski
13=informatyka
14=polski
15(wyhcowawcza) = 14(polski)
0-15 array
*/
var lekcje = document.querySelectorAll(".lekcja")

var control = {
    ctrl: false
};

var ArrayClassroomURL = ["https://classroom.google.com/c/MTY0MzU2OTc4MjM4","https://classroom.google.com/c/MjYxOTg3NDE1Nzk5","https://classroom.google.com/c/MTU2ODE1NDA5OTY3","https://classroom.google.com/c/Nzc2MzIwOTQxMjla","https://classroom.google.com/c/MTY0MzYyMDQzODE1","https://classroom.google.com/c/OTI0ODYzMjg5NDla","https://classroom.google.com/c/MTIzNzM0Njk2MDgy","https://classroom.google.com/c/MTY0MzE5OTk5MzQ1","https://classroom.google.com/c/MTY0MjAzMzgwMzQ4","https://classroom.google.com/c/MTY0MjA5ODE0ODk2","https://classroom.google.com/c/OTI2NDcyODY4MjJa","https://classroom.google.com/c/OTY0NjQwMDA1NDda","https://classroom.google.com/c/MTY0MjEyNDMwMzkx","https://classroom.google.com/c/Nzc2NDQ2NzY5OTFa","https://classroom.google.com/c/OTI5MjY1OTMzNDJa",""];
var ArrayLekcjeURL = ["https://meet.google.com/lookup/gfgseq3f6r","https://meet.google.com/lookup/b577ptvpq3z","https://meet.google.com/lookup/a2artmkadn","https://meet.google.com/lookup/gyz6jbrn7s","https://meet.google.com/lookup/f76yufpkwk","https://meet.google.com/lookup/haagr24cs3","https://meet.google.com/lookup/awv45ued3m","https://meet.google.com/lookup/f6q5ihbdcf","https://meet.google.com/lookup/f3fnmdtvpf","https://meet.google.com/lookup/anfwiabpnl","https://meet.google.com/lookup/cdihgokiah","https://meet.google.com/lookup/djoabouf5t","https://meet.google.com/lookup/ccsbmlual4","https://meet.google.com/lookup/au6qok3og3","https://meet.google.com/lookup/fdemslitoq"];

lekcje.forEach(number =>{
    number.addEventListener("click",()=>{
        console.log(number.id)
        if(control.ctrl == true){
            chrome.tabs.create({url: ArrayClassroomURL[number.id]});
        }else {
            chrome.tabs.create({url: ArrayLekcjeURL[number.id]});
        }
    });
});
window.addEventListener("keydown",(e)=>{
    if(e.keyCode ==17) control.ctrl = true;
});
window.addEventListener("keyup",(e)=>{
    if(e.keyCode == 17) control.ctrl = false;
});