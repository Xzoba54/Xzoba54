const btstop = document.querySelector(".stop");
const btstart = document.querySelector(".start");
const btreset = document.querySelector(".reset");

let interval;

let hour = "0" + 0;
let minute = "0" + 0;
let second = "0" + 0;
let milisecond = "0" + 0;

function timer(reset){

    if(reset){
        milisecond = "0" + 0;
        second = "0" + 0;
        minute = "0" + 0;
        hour = "0" + 0;
        clearInterval(interval);
    }else if(!reset){
        milisecond++;
        if(milisecond<10){
            milisecond = "0" + milisecond;
        }
    }
    
    if(milisecond>=100){
        milisecond = 0;
        second++;
        if(second<10){
            second = "0" + second;
        }

        if(second>=60){
            second = "0" + 0;
            minute++;
            if(minute<10){
                minute = "0" + minute;
            }
        }
        if(minute>=2){
            minute = "0" + 0;
            hour++;
            if(hour<10){
                hour = "0" + hour
            }
        }
    }
    document.querySelector(".milisecond").innerHTML = milisecond;
    document.querySelector(".second").innerHTML = second;
    document.querySelector(".minute").innerHTML = minute;
    document.querySelector(".hour").innerHTML = hour;
}

btreset.addEventListener("click",()=>{
    timer(true);
});
btstart.addEventListener("click",()=>{
    interval = setInterval(timer,10);
});
btstop.addEventListener("click",()=>{
    clearInterval(interval);
});
