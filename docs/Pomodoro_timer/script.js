let explainDiv = document.getElementById("explainDiv")
explainDiv.style.visibility = "hidden"
let rest = false;

let intervalo; //how fast time will degree. (normal = 1000 -> 1sec)

var minControl = document.getElementById("min") //detect h1 -> min value
var secControl = document.getElementById("sec") //detect h1 -> sec value

var situationName = document.getElementById("indexName") //rest time or study time

var notificationAudio = new Audio('./sounds/positive_notification.wav')

//a melhor forma encontrda para organizar foi utilizando objeto.
let clock = {
            time: 1000,
            minX: 0,
            secX: 0,
            pomodoroSessions: 0,
            } 

let btnPause = document.getElementById("buttonPause")
btnPause.disabled = true


//função para controle do tempo (será chamada nos botões)
function controlTime(){

        intervalo = setInterval(() => {
        
            //para parar no 00:00
            if(clock.minX == 0 && clock.secX == 0){
                let btn = document.getElementById("buttonBegin")
                btn.disabled = false
        return ;
    }
            //to control second
            if(clock.minX >= 0 && clock.secX > 0){
            
                if(clock.secX <= 60){
                clock.secX--
                //add values of second in HTML and put '0' if is smaller than 10
                secControl.innerHTML = clock.secX;
                if(clock.secX < 10 && clock.secX >= 0){
                    secControl.innerHTML = '0' + clock.secX;
                }
               
            //to control the last minute
            //to control minute in general
                if(clock.minX !== 0){     //control the last second
                    if(clock.secX == 59){
                        clock.minX--
                        minControl.innerHTML = clock.minX;
                    }
                }
                if(clock.minX !== 0){ //control the last second
                    if (clock.secX == 0){
                        clock.secX = 60
                    }
                }
        }
            //add values of minute in HTML and put '0' if is smaller than 10
                    minControl.innerHTML = clock.minX;
                    if(clock.minX < 10 && clock.minX >= 0){
                        minControl.innerHTML = '0' + clock.minX;
                    }
                    
                }else{
                    minControl.innerHTML = clock.minX;
                    minControl.innerHTML = clock.minX;
                    clock.minX = 0
                    clock.secX = 0           
                }
            
               //to control the change of study/rest time
                if ( rest == false && clock.minX == 0 && clock.secX == 0){
                            if(clock.pomodoroSessions == 3){
                                situationName.innerHTML = "Descanso maior 😌";
                                minControl.innerHTML = 20;
                            }else{
                                situationName.innerHTML = "Descanso ☕";
                                minControl.innerHTML = 5;
                            }
                            secControl.innerHTML = '00';
                            btnPause.disabled = true
                                clock.pomodoroSessions++
                                notificationAudio.play();
                    return rest = true;
                }
                if ( rest == true && clock.minX == 0 && clock.secX == 0){
                        situationName.innerHTML = "Estudo 📚";
                            minControl.innerHTML = 25;
                            secControl.innerHTML = '00';
                            btnPause.disabled = true
                                notificationAudio.play();
                    return rest = false;
                }
            },clock.time)          

}

/*-------------------------------------------------------*/

function beginButton(){

    if (rest == false){
        minControl.innerHTML = 24;
        secControl.innerHTML = 59;
        clock.minX = 24;    
        clock.secX = 59;
        clearInterval(intervalo)
        setInterval(controlTime(),clock.time)
    }else{
        if (clock.pomodoroSessions == 4){
            clock.minX = 19;
            clock.secX = 59;
            clearInterval(intervalo)
            setInterval(controlTime(),clock.time)
            clock.pomodoroSessions = 0
            
        }else{
        if (clock.pomodoroSessions !==0){     
            clock.minX = 4;
            clock.secX = 59;
            clearInterval(intervalo)
            setInterval(controlTime(),clock.time)
        }else{    
                clock.minX = 19;
                clock.secX = 59;
                clearInterval(intervalo)
                setInterval(controlTime(),clock.time)
        }
    }
}
    let btn = document.getElementById("buttonBegin")
    btn.disabled = true
    
    let btnPause = document.getElementById("buttonPause")
    btnPause.disabled = false

}
    /*------------------------------------------------------*/
function pauseButton(){
    let buttonPause = document.getElementById("buttonPause")
    console.log(clock.minX, clock.secX)
    if(buttonPause.value == "retomar"){
        setInterval(controlTime(),clock.time)
        buttonPause.value = "pausar"
    }
    else    
    if(buttonPause.value == "pausar"){
        clearInterval(intervalo)

        buttonPause.value = "retomar"
    }
}
/*---------------------------------------------------------*/
function resetButton(){
    clearInterval(intervalo)
    setInterval(controlTime(),clock.time)
    clock.minX = 0;
    clock.secX = 0;

    if(rest == true){
        if(clock.pomodoroSessions == 0){
            minControl.innerHTML = 20;
            secControl.innerHTML = '00';
        }else{
            minControl.innerHTML = 5;
            secControl.innerHTML = '00';
        }
    }else{
        minControl.innerHTML = 25;
        secControl.innerHTML = '00';
    }

    let btn = document.getElementById("buttonBegin")
    btn.disabled = false

    let btnPause = document.getElementById("buttonPause")
    btnPause.disabled = true
    btnPause.value = "pausar"
    clearInterval(intervalo)
    }
function addPomodoroCount(){
    
    pomodoroCount = document.getElementById("pomodoroCount")
    if(rest == false){
    pomodoroCount.innerHTML = clock.pomodoroSessions + 1 + "º ciclo de estudo" 
    }else{
    pomodoroCount.innerHTML = "Descanse :)"
    }
}

function pomodoroExplain(){
    explainDiv.style.visibility = "visible"
}

function pomodoroExplainClose(){
    explainDiv.style.visibility = "hidden"
}