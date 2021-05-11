var now = new Date();
var Day = now.getDay();
var Hour = now.getHours();
var Minute = now.getMinutes();

var lessonif = [null,(Hour==8&&Minute>=0)&&(Hour==8&&Minute<=45),(Hour==8&&Minute>=55)||(Hour==9&&Minute<=40),(Hour==9&&Minute>=50)||(Hour==10&&Minute<=35),(Hour==10&&Minute>=45)||(Hour==11&&Minute<=30),(Hour==11&&Minute>=50)||(Hour==12&&Minute<=35),(Hour==12&&Minute>=55)||(Hour==13&&Minute<=40),(Hour==13&&Minute>=50)||(Hour==14&&Minute<=35)];
var breakif = [null,(Hour==8&&Minute>45)&&(Hour==8&&Minute<55),(Hour==9&&Minute>40)&&(Hour==9&&Minute<50),(Hour==10&&Minute>35)&&(Hour==10&&Minute<45),(Hour==11&&Minute>30)&&(Hour==11&&Minute<50),(Hour==12&&Minute>35)&&(Hour==12&&Minute<55),(Hour==13&&Minute>40)&&(Hour==13&&Minute<50)];

var ArrayDays = [null,"poniedzialek","wtorek","sroda","czwartek","piatek"];

var CurrentLesson = 0;
var CurrentBreak = 0;

function update() {
        for(var i=1; i<=7;i++){
            if(lessonif[i]){
                CurrentLesson = i;
            }
        }   
        for(var b=1; b<=6; b++){
            if(breakif[b]){
                CurrentBreak = b;
            }
        }
        if((Day<=5&&Day!=0)&&(CurrentLesson>0&&CurrentBreak==0)) document.querySelector(`.${ArrayDays[Day]}${CurrentLesson}`).classList.add("current-lesson");
        else if((Day<=5&&Day!=0)&&(CurrentBreak>0&&CurrentLesson==0)) document.querySelector(`.${ArrayDays[Day]}${CurrentBreak}`).classList.add("current-break");
}
update();