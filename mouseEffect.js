
const animation_={


    //horizontal
    scrollElement:null,
    begin:null,
    end:null,

    //vertical
    translateElement:null,
    currentTranslate:0,
    endTranslate:null,

    draw:function(){
    
        //horizontal - scrollleft assosiciated
      let changeX=(this.end- this.scrollElement.scrollLeft)/15;
      this.scrollElement.scrollLeft+= changeX;

      //vertical - translateY associated
      let changeY = (this.endTranslate-this.currentTranslate)/15;
      this.currentTranslate+=changeY;
      this.translateElement.style.transform=`translateY(${this.currentTranslate}px)`;
     
    }
};


class mouseTracker{

scrollElement;
parallaxContainer;
percentageScroll;


currentAnimation;
createAnimation(){


    const start=performance.now();
   
    const _anim=function(currentTime){

        let timePass=currentTime-start;
        if(timePass>=animation_.duration){
            timePass=animation_.duration;
        }

        

        animation_.draw();

        this.currentAnimation=requestAnimationFrame(_anim.bind(this));

    }

   
    this.currentAnimation=requestAnimationFrame(_anim.bind(this));


}


constructor(scrollEl,parallaxContainer){

this.scrollElement=scrollEl;
animation_.scrollElement=scrollEl;

this.parallaxContainer=parallaxContainer;
animation_.translateElement=parallaxContainer;



}



getMouseCallback(){

   
    this.createAnimation();

    const callback=function(event){

        const winWidth=window.innerWidth;
        const winHeight=window.innerHeight;

        //Horizontal animation
        const scrollMiddle=(this.scrollElement.scrollWidth-this.scrollElement.clientWidth)/2;
        const scrollRange=scrollMiddle*this.percentageScroll/100;
        const mouseX=event.clientX;
        const x_Normalized=(mouseX-(winWidth/2)) / (winWidth/2) ;
        animation_.begin=this.scrollElement.scrollLeft;
        animation_.end= scrollMiddle + (scrollRange * x_Normalized);


        //Vertical animation
        const translateRange=100;
        const mouseY=event.clientY;
        const y_Normalized= -((mouseY - winHeight/2)/ (winHeight/2));
        animation_.endTranslate= y_Normalized * translateRange;

    }


    return callback.bind(this);

}


}





export {mouseTracker};