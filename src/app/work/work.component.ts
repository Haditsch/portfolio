import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {

  public mobile: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (window.screen.width >= 360 && window.screen.width <= 768) { // 768px portrait
      this.mobile = true;
    }
  }


}
