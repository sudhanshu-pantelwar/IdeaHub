import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Backend } from '../../providers/backend';
import { Geolocation } from '@ionic-native/geolocation';
import { Login } from '../../pages/login/login';

/**
 * Generated class for the Register page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class Register {
  response: any;
  branch: any;
  branches: any;
  colleges: any;
  firstname: any;
  lastname: any;
  email: any;
  longitude: any;
  latitude: any;
  mobilenumber: any;
  password: any;
  college: any;
  specialization: any;
  specializations: any;
  constructor(private geolocation: Geolocation, public backend: Backend, public navCtrl: NavController, public navParams: NavParams) {
  this.firstname = this.navParams.get('firstname');
  this.lastname = this.navParams.get('lastname');
  this.email = this.navParams.get('email');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Register');
    this.backend.colleges().subscribe(
      data => { console.log("college", data);
                this.response = data;
                this.response = this.response._body;
                this.response = JSON.parse(this.response);
                if(this.response.RtnCode == -1){
                  alert(this.response);
                }
                if(this.response.RtnCode == 0){
                  this.college = this.response.ReturnData;
                }
    })

    this.backend.branches().subscribe(
      data => { console.log("college", data);
                this.response = data;
                this.response = this.response._body;
                this.response = JSON.parse(this.response);
                if(this.response.RtnCode == -1){
                  alert(this.response);
                }
                if(this.response.RtnCode == 0){
                  this.branch = this.response.ReturnData;
                }
    })

    this.backend.specializations().subscribe(
      data => { console.log("college", data);
                this.response = data;
                this.response = this.response._body;
                this.response = JSON.parse(this.response);
                if(this.response.RtnCode == -1){
                  alert(this.response);
                }
                if(this.response.RtnCode == 0){
                  this.specialization = this.response.ReturnData;
                }
    })
  }

  register(){
     this.backend.loadingSnipper('Please wait...');
     this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
    console.log(this.colleges, this.branches, this.specializations, this.firstname, this.lastname, this.latitude, this.longitude, this.mobilenumber, this.password);
     this.backend.register(this.branches, this.colleges, this.email, this.firstname, this.lastname, this.latitude, this.longitude, this.mobilenumber, this.password, this.specializations).subscribe(
       data => { console.log("register", data);
                this.response = data;
                this.response = this.response._body;
                this.response = JSON.parse(this.response);
                if(this.response.RtnCode == -1){
                  alert("error occurred");
                }
                if(this.response.RtnCode == 0){
                  localStorage.setItem('password', this.password);
                  this.navCtrl.setRoot(Login);
                  alert("Successfully Registered");
                }
                this.backend.closeLoading();
            })
        }
  )}

  


}
