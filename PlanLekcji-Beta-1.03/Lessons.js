//Prototype style board
// document.querySelector(".poniedzialek1").classList.add("current-lesson");
// document.querySelector(".sroda2").classList.add("current-break");

var now = new Date();
var Day = now.getDay();
var Hour = now.getHours();
var Minute = now.getMinutes();

var CurrentLesson = 0;
var CurrentBreak = 0;

var ArrayDays = [null,"poniedzialek","wtorek","sroda","czwartek","piatek"];

//Lesson Time
if((Hour==8&&Minute>=0)&&(Hour==8&&Minute<=45)){
    CurrentLesson = 1;
}else if((Hour==8&&Minute>=55)||(Hour==9&&Minute<=40)){
    CurrentLesson = 2;
}else if((Hour==9&&Minute>=50)||(Hour==10&&Minute<=35)){
    CurrentLesson = 3;
}else if((Hour==10&&Minute>=45)||(Hour==11&&Minute<=30)){
    CurrentLesson = 4;
}else if((Hour==11&&Minute>=50)||(Hour==12&&Minute<=35)){
    CurrentLesson = 5;
}else if((Hour==12&&Minute>=55)||(Hour==13&&Minute<=40)){
    CurrentLesson = 6;
}else if((Hour==13&&Minute>=50)||(Hour==14&&Minute<=35)){
    CurrentLesson = 7;
}

//before-after lesson
if(Day==6||Day==0){
    document.querySelector(`.poniedzialek1`).classList.add("break-after-lesson");
}
else if(Hour>=0&&Hour<8){
    document.querySelector(`.${ArrayDays[Day]}1`).classList.add("break-after-lesson");
}else if(Hour>=14&&Minute>35){
    document.querySelector(`.${ArrayDays[Day]}7`).classList.add("current-break");
}


//break time
if((Hour==8&&Minute>45)&&(Hour==8&&Minute<55)){
    CurrentBreak = 1;
}else if((Hour==9&&Minute>40)&&(Hour==9&&Minute<50)){
    CurrentBreak = 2;
}else if((Hour==10&&Minute>35)&&(Hour==10&&Minute<45)){
    CurrentBreak = 3;
}else if((Hour==11&&Minute>30)&&(Hour==11&&Minute<50)){
    CurrentBreak = 4;
}else if((Hour==12&&Minute>35)&&(Hour==12&&Minute<55)){
    CurrentBreak = 5;
}else if((Hour==13&&Minute>40)&&(Hour==13&&Minute<50)){
    CurrentBreak = 6;
}

//update
if(Day>=1&&Day<=5 && CurrentLesson!=0 || CurrentBreak!=0) {
    if(CurrentBreak!=0){
        document.querySelector(`.${ArrayDays[Day]}${CurrentBreak}`).classList.add("current-break");
    }else if(CurrentLesson!=0){
        document.querySelector(`.${ArrayDays[Day]}${CurrentLesson}`).classList.add("current-lesson")
    }
}