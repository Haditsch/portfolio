import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';
import { TimelineLite, Back, Power1} from 'gsap';
import { HostBinding } from '@angular/core';

@Component({
  selector: 'app-sun',
  templateUrl: './sun.component.html',
  styleUrls: ['./sun.component.css']
})
export class SunComponent implements OnInit {

  public blurAmt: string = "blur(0)";

  public opacAmt: number = 1;

  public sun = document.getElementsByClassName("sunItem") as HTMLCollectionOf<HTMLElement>;
 
  public sunOverlay = document.getElementsByClassName("hoverCircle") as HTMLCollectionOf<HTMLElement>;

  public timerId: any;

  public timerId2: any;
  
  public scaleIncrement: number = 8;
  public scaleIncrementString: string;

  public blurIncrement: number = 5;
  public blurIncrementString: string;

  public scaleState: boolean = false;
  public scaleState2: boolean = false;
  
  public enterArray: Array<any> = [];
  public leaveArray: Array<any> = [];

  public mobile: boolean = false;

  public getBrowserName() {
    const agent = window.navigator.userAgent.toLowerCase()
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
}

// sun Turbulence Animation ---------

  constructor() { 
    this.mouseHandlers();
  }

  ngOnInit(): void {



    if (window.screen.width >= 320 && window.screen.width  <= 768) { // 768px portrait
      this.mobile = true;
    } else {
    let timeline = new TimelineMax({
      repeat: -1,
      yoyo: true
    }),
    feTurb = document.querySelector('#feturbulence');
  
    timeline.add(
      TweenMax.to(feTurb, 15, {
        onUpdate: function() {
          let bfX = this.progress() * 0.05 + 0.015, //base frequency x
          bfY = this.progress() * 0.05 + 0.1; //base frequency y
          if(!feTurb) return;
          feTurb.setAttribute('baseFrequency', `${bfX} ${bfY}`);
        }
      }), 0
    );
  }
  }


// sun Cursor Follow Function ----------

  public mouseHandlers() {
    document.addEventListener('mousemove', this.onMouseMove);
      }



  public onMouseMove: { (event: MouseEvent): void } = (event: MouseEvent) => {

    if(!this.mobile){
      var x = event.clientX * 1.15 / (window.innerWidth) + "%"; //get horizontal coordinate of the mouse
      var y = event.clientY * 1.15 / (window.innerHeight) + "%"; //get vertical coordinate of the mouse
      // //window.inner... -> get browser width/height

      for (var i = 0; i < 2; i++) {
        if(this.sun[i]?.style){ /*this.sun[i] && this.sun[i].style*/
          this.sun[i].style.left = x;
          this.sun[i].style.top = y;
          this.sun[i].style.transform = "translate(+" + x + ",+" + y + ")";
          this.sunOverlay[i].style.left = x;
          this.sunOverlay[i].style.top = y;
          this.sunOverlay[i].style.transform = "translate(+" + x + ",+" + y + ")";
        }
      }
    }
  }

  // sun Hover functions

  @ViewChild('hoverCircle')
  sunHover: ElementRef;

  ngAfterViewInit() {
    this.sunHover.nativeElement.addEventListener('mouseenter', this.onMouseOver);
    this.sunHover.nativeElement.addEventListener('mouseleave', this.onMouseLeave);

    if (this.getBrowserName()==="firefox"){
      let feDisMap = document.querySelector('#fedisplacementmap');
      if (!feDisMap) return;
      feDisMap.setAttribute("scale","20");
      let sunBlur = document.querySelector('#sunImg');
      if(!sunBlur) return;
      sunBlur.setAttribute("style", "filter: blur(10px)");
    } else if (this.mobile){
      let sunBlur = document.querySelector('#sunImg');
      if(!sunBlur) return;
      sunBlur.setAttribute("style", "filter: blur(3px)");
    }
  } 

  onMouseOver: {(event: MouseEvent): void} = (event: MouseEvent) => {

    if(this.getBrowserName()!=="firefox"){
      if(this.scaleState === false){

        this.enterArray.push(setInterval(() => {
            this.scaleIncrement += 1.2;
            this.scaleIncrementString = ""+ this.scaleIncrement;
            this.blurIncrement += 0.5;
            this.blurIncrementString = ""+ this.blurIncrement;

            let feDisMap = document.querySelector('#fedisplacementmap');
            if (!feDisMap) return;
            feDisMap.setAttribute("scale", this.scaleIncrementString);
            let sunBlur = document.querySelector('#sunImg');
            if(!sunBlur) return;
            sunBlur.setAttribute("style", "filter: blur("+this.blurIncrementString+"px)");
        }, 25));
        console.table(this.enterArray);
      
          setTimeout(() => {
            for(let i = 0; i < this.enterArray.length; i++){
              clearInterval(this.enterArray[i]);

            }
            this.enterArray = [];
            this.scaleState = true;}, 250 );

      } else {
          return;
        }
    } 
  }

  onMouseLeave: {(event: MouseEvent): void} = (event: MouseEvent) => {
    
    if(this.scaleState === true) {
      this.leaveArray.push(setInterval(() => {
        this.scaleIncrement -= 1.2;
        this.scaleIncrementString = ""+ this.scaleIncrement;
        this.blurIncrement -= 0.5;
        this.blurIncrementString = ""+ this.blurIncrement;

        let feDisMap = document.querySelector('#fedisplacementmap');
        if (!feDisMap) return;
        feDisMap.setAttribute("scale", this.scaleIncrementString);
        let sunBlur = document.querySelector('#sunImg');
        if(!sunBlur) return;
        sunBlur.setAttribute("style", "filter: blur("+this.blurIncrementString+"px)");


   }, 25));
   console.table(this.leaveArray);

   setTimeout(() => {
    for(let j = 0; j < this.leaveArray.length; j++){
      clearInterval(this.leaveArray[j]);

    }
    this.leaveArray = [];
    this.scaleState = false}, 250 );

} else {
      return;
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let blurAmtCalc = window.pageYOffset/50;
    this.blurAmt = "blur("+blurAmtCalc+"px)";

    let opacAmtCalc = 1-((window.pageYOffset/1000)*1.9);
    this.opacAmt = opacAmtCalc;
  }

  sunBlur(){
    return this.blurAmt;
  }

  sunOpac(){
    return this.opacAmt;
  }
}





