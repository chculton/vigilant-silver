import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  hidePassword = true;
  incorrectLogin = false;

  constructor(private appservice: AppService,
              private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]) 
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit(): void {
    this.appservice.login(this.loginForm.value).subscribe((response: any) => {
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.body.user));
        this.incorrectLogin = false;
        this.navigateTo('home')
      }
      else {
        this.incorrectLogin = true;
      }
    });
  }

  navigateTo(page: string) {
    this.router.navigate([page])
  }
}
