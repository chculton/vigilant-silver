import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LogoutDialogComponent } from './logout-dialog/logout-dialog.component';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: any;
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;
  
  constructor(public dialog: MatDialog,
              private router: Router,
              private _formBuilder: FormBuilder) {

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
}
