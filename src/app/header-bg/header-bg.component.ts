import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-header-bg',
  templateUrl: './header-bg.component.html',
  styleUrls: ['./header-bg.component.css']
})
export class HeaderBgComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.innerWidth >= 768) {
    let element = document.querySelector('.navbar');
    if (!element) return;
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('navbar-inverse');
    } else if(window.pageYOffset <= element.clientHeight){
      element.classList.remove('navbar-inverse');
      element.classList.add('navbar-fadeOut');
    }
  }
}
}
