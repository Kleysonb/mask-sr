import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'register-user',
  templateUrl: `./register-user.component.html`,
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent  {

  constructor(private router: Router){}

  submit(name, tate){
    console.log(name, tate);
    localStorage.setItem("user", JSON.stringify({name, tate}));
    this.router.navigate(['/mask']);
  }
}
