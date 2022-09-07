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
    this.user = localStorage.getItem("user")
    console.log(this.user)
  }

  openDialog() {
    console.log("Opening")
    const dialogRef = this.dialog.open(LogoutDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result === true) {
        // TODO: destroy cookie
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
