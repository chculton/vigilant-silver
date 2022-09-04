import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portal';

  loginForm: FormGroup;
  hidePassword = true;
  incorrectLogin = false;

  constructor(private appservice: AppService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]) 
    });
  }
  
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit(): void {
    this.appservice.login(this.loginForm.value).subscribe((response: any) => {
      console.log(response)
      if(response.status === 200){
        console.log("Success")
      }
      else {
        this.incorrectLogin = true;
      }
    });
  }
}
