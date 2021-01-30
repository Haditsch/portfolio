import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hire',
  templateUrl: './hire.component.html',
  styleUrls: ['./hire.component.css']
})
export class HireComponent implements OnInit {
  constructor() { 

  }

  ngOnInit(): void {
  }

  // public noWhiteSpaceValidator(control: FormControl) {
  //   const isWhitespace = (control.value || '').trim().length === 0;
  //   const isValid = !isWhitespace;
  //   return isValid ? null : { 'whitespace': true };
  // }

  // contact = new FormGroup({
    
  //   email: new FormControl('', this.noWhiteSpaceValidator),
  //   subject: new FormControl(''),
  //   message: new FormControl('')
  // });
}