import * as mouseEffect from "./mouseEffect.js"



const parallaxMain=document.querySelector(".parallax");
const parallax=document.querySelector(".particles-main");
const space=document.querySelector(".space");


const mouseTracker=new mouseEffect.mouseTracker(parallaxMain,parallax);
mouseTracker.percentageScroll=40;//right and left max scroll
let mouseEvent=parallaxMain.addEventListener("pointermove", mouseTracker.getMouseCallback());
parallaxMain.ondragstart=()=>false;



const titleSec=document.querySelector(".title-sec");



const win={

    width:window.innerWidth,
    height:window.innerHeight,
    extraWidthPerc:60,
    perspective:6000

};


const parallaxMouse={

getMiddleScroll(){
   return (parallaxMain.scrollWidth-parallaxMain.clientWidth)/2;
},
getScrollWidth(){
    return parallaxMain.scrollWidth;
},
getClientWidth(){

    return parallaxMain.clientWidth;
},
mouseAnimation(e){




}

};




space.style.width=`${100+win.extraWidthPerc}%`;

//parallax.style.backgroundPosition=`${parallaxMouse.getScrollWidth()}px`

let particlesNumber=20+ Math.floor(window.innerWidth/150)*10;;

function divideAsGrid(particleNumber){


    const grid={
        width: undefined,
        height:undefined
    };

    const ratio=win.height/win.width;
    const extraWidth=win.width* ((100+win.extraWidthPerc)/100);
    const area=extraWidth*win.height / particleNumber;

    grid.width=Math.sqrt((area/ratio));
    grid.height=grid.width*ratio;

    const gridList=[];

    for(let y=0;y<win.height;y+=grid.height){

        for(let x=0;x<extraWidth;x+=grid.width){

            gridList.push([x+(grid.width/2),y+(grid.height/2)]);

        }


    }

    return gridList;
}


function getRandom(min,max){

    const dön= Math.random()*(max-min) + min;

    return Math.round(dön);

}



function createParticles(number){

const grids= divideAsGrid(number);
const colors=["34a0a4","1e6091","b5e48c","99d98c","52b69a"];


for(const grid of grids){

const posX=grid[0];
const posY=grid[1];


const randomColor=colors[getRandom(0,colors.length)];
const particle=document.createElement("div");
particle.classList.add("particle");
particle.style.top=`${posY}px`;
particle.style.left=`${posX}px`;
particle.style.backgroundColor=`black`;
particle.style.boxShadow=`0px 0px 0px 3px #${randomColor}`
particle.style.transform=`translateX(-50%) translateY(-50%) translateZ(${getRandom(-win.perspective,0)}px)`;



parallax.append(particle);
}


parallaxMain.scrollLeft= parallaxMouse.getMiddleScroll();




}




function resetParticles(){

win.width=window.innerWidth;
win.height=window.innerHeight;
    const particlesArr=parallax.querySelectorAll("div");
    particlesArr.forEach(par =>{

        par.remove();
    });

}


window.addEventListener("resize",function(){

particlesNumber=20+ Math.floor(this.window.innerWidth/150)*10;
console.log(particlesNumber);
resetParticles();
createParticles(particlesNumber);

console.log("resize");

});

createParticles(particlesNumber);


