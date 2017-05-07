import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  firstName: any;
  lastName: any;
  branch: any;
  specialization: any;
  collegeName: any;
  mobileNumber: any;
  constructor(public navCtrl: NavController) {
    this.firstName = localStorage.getItem('firstname');
    this.lastName = localStorage.getItem('lastname');
    this.branch = localStorage.getItem('branch');
    this.specialization = localStorage.getItem('specialization');
    this.collegeName = localStorage.getItem('collegename');
    this.mobileNumber = localStorage.getItem('mobilenumber');
  }

}
