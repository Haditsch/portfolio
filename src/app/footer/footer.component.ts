import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let element = document.querySelector('.navbar');
    let iconElement = document.querySelector('.homeSvg')
    if (!element) return;
    if (!iconElement) return;

    if (window.pageYOffset > element.clientHeight) {
      iconElement.classList.add('iconOpacIn');
    } else if(window.pageYOffset <= element.clientHeight){
      iconElement.classList.remove('iconOpacIn');
      iconElement.classList.add('iconOpacOut');
    }
  }
}
