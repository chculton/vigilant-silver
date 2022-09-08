import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LogoutDialogComponent } from './logout-dialog/logout-dialog.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: any;
  homeSwitch = 0;
  informationChange: FormGroup;
  isLinear = false;
  
  constructor(public dialog: MatDialog,
              private router: Router,
              private _formBuilder: FormBuilder) {

    this.informationChange = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('')
    })
  }

  ngOnInit(): void {
    let tempUser = localStorage.getItem("user")

    if(tempUser) {
      this.user = JSON.parse(tempUser)
    }
    else {
      console.error("Failed to read user from local storage")
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(LogoutDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // Remove user details from local storage
        localStorage.removeItem("user")

        // TODO: destroy cookie

        // Return user to login
        this.navigateTo('login')
      }
    });
  }

  navigateTo(page: string) {
    this.router.navigate([page])
  }

  updateHomeSwitch(newNum: number) {
    this.homeSwitch = newNum;
  }
}
