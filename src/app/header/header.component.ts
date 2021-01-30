import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { HostBinding } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  public iid: any;
  classApplied = false;

  toggleClass() {
    this.classApplied = !this.classApplied;
  }

 
  @HostBinding('style.--randNum1')
  public randNum1: number = 0;

  @HostBinding('style.--randNum2')
  public randNum2: number = 0;

  @HostBinding('style.--randNum3')
  public randNum3: number = 0;

  @HostBinding('style.--randNum4')
  public randNum4: number = 0;

  public mouseOverState: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }


  mouseLeaveEvent(){
    // if(this.iid){ ----------------> drunter shorthand dafür
    //   clearInterval(this.iid);
    // }

    this.iid && clearInterval(this.iid);
    this.mouseOverState = false;
    console.log("leave works");
  }

  mouseEnterEvent(){
    this.iid = setInterval(() => {
      this.randNum1 = Math.random() * 4;
      this.randNum2 = Math.random() * 4;
      this.randNum3 = Math.random() * 4;
      this.randNum4 = Math.random() * 4;
      console.log(this.randNum1);
      console.log(this.randNum2);
      console.log(this.randNum3);
      console.log(this.randNum4);
      console.log("enter works");    
   }, 2000);
  }
}

window.addEventListener('touchstart', function() {

  let navLinks = document.getElementsByClassName('nav-link');
  for(let i = 0; i < 5; i++){
  navLinks[i].classList.remove("crtTextStart");
  navLinks[i].classList.remove("crtTextRand");
}

});