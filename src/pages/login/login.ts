import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Register } from '../register/register';
import { Backend } from '../../providers/backend';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Geolocation } from '@ionic-native/geolocation';
import { LinkedIn } from '@ionic-native/linkedin';
/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var cordova:any;
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  email: any;
  password: any;
  response: any;
  latitude: any;
  longitude: any;
  constructor(private linkedin: LinkedIn, private geolocation: Geolocation, public fb: Facebook, public backend: Backend, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

    login(){
    console.log(this.email);
    console.log(this.password);
    this.backend.loadingSnipper("Please wait...");
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.backend.login(this.email, this.password, this.latitude, this.longitude).subscribe(
      data => { console.log("loginData", data);
                this.response = data;
                this.response = this.response._body;
                this.response = JSON.parse(this.response);
                if(this.response.RtnCode == -1){
                  alert("Please enter valid credentials");
                }
                if(this.response.RtnCode == 0){
                  localStorage.setItem('email', this.response.ReturnData.Email);
                  localStorage.setItem('password', this.response.ReturnData.Password);
                  localStorage.setItem('firstname', this.response.ReturnData.FirstName);
                  localStorage.setItem('lastname', this.response.ReturnData.LastName);
                  localStorage.setItem('branch', this.response.ReturnData.Branch);
                  localStorage.setItem('specialization', this.response.ReturnData.Specialization);
                  localStorage.setItem('collegename', this.response.ReturnData.CollegeName);
                  localStorage.setItem('mobilenumber', this.response.ReturnData.MobileNumber);
                  this.navCtrl.setRoot(HomePage);
                }
          
          }) 
      }).catch((error) => {
        alert('Error getting location '+error);
      });
      this.backend.closeLoading();
    } 

  facebook(){
    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse) => {
      console.log('Logged into Facebook!', res);
      this.fb.api('/me/?fields=id,email,first_name,last_name', ["email"]).then((value)=>{
        console.log(JSON.stringify(value));
        console.log("name", value.email);
        let email = value.email;
        let firstname = value.first_name;
        let lastname = value.last_name;
        this.backend.already(email).subscribe(
      data => { console.log("loginData", data);
                this.response = data;
                this.response = this.response._body;
                this.response = JSON.parse(this.response);
                if(this.response.RtnCode == 0){
                  
                  this.navCtrl.setRoot(Register, {"email" : email, "firstname": firstname, "lastname": lastname});
                }
                if(this.response.RtnCode == -1){
                  alert("Already registered");
                  let password = localStorage.getItem('password');
                  this.geolocation.getCurrentPosition().then((resp) => {
                      this.latitude = resp.coords.latitude;
                      this.longitude = resp.coords.longitude;
                      this.backend.loadingSnipper('Please wait...');
                      this.backend.socialRegister(email).subscribe(
                      data => { console.log("loginData", data);
                                this.response = data;
                                this.response = this.response._body;
                                this.response = JSON.parse(this.response);
                                if(this.response.Message == "An error has occurred."){
                                  alert("error occured");
                                }
                                else{
                                  // alert(this.response);
                                  localStorage.setItem('email', this.response.ReturnData.Email);
                                  localStorage.setItem('password', this.response.ReturnData.Password);
                                  localStorage.setItem('firstname', this.response.ReturnData.FirstName);
                                  localStorage.setItem('lastname', this.response.ReturnData.LastName);
                                  localStorage.setItem('branch', this.response.ReturnData.Branch);
                                  localStorage.setItem('specialization', this.response.ReturnData.Specialization);
                                  localStorage.setItem('collegename', this.response.ReturnData.CollegeName);
                                  localStorage.setItem('mobilenumber', this.response.ReturnData.MobileNumber);
                                  this.navCtrl.setRoot(HomePage);
                                }
                                this.backend.closeLoading();
                          }) 
                      }).catch((error) => {
                        alert('Error getting location '+error);
                      });
                }
      })
        // localStorage.setItem('address', 'NA');
        
      })
      // this.fb.api('/me/picture', ["public_profile"]).then((value)=>{
      //   console.log(JSON.stringify(value));
      //   this.navCtrl.setRoot(Register);
      // })
  })
}

linkedinCall(){
  // generic callback functions to make this example simpler
var onError = function(e) { console.error('LinkedIn Error: ', e); }
var onSuccess = function(r) { console.log('LinkedIn Response: ', r); }

// logging in with all scopes
// you should just ask for what you need


// login before doing anything
// this is needed, unless if we just logged in recently



// check for existing session
// cordova.plugins.LinkedIn.getActiveSession(function(session) {
//   if (session) {
//     console.log('We have an active session');
//     console.log('Access token is: ', session.accessToken);
//     console.log('Expires on: ', session.expiresOn);
//   } else {
//     console.log('There is no active session, we need to call the login method');
    
//   }
// });

var scopes = ['r_basicprofile', 'r_emailaddress', 'rw_company_admin', 'w_share'];
    cordova.plugins.LinkedIn.login(scopes, true, function() {

  // get connections
  cordova.plugins.LinkedIn.getRequest('people/~', onSuccess, onError);
  
  // share something on profile
  // see more info at https://developer.linkedin.com/docs/share-on-linkedin
  var payload = {
    comment: 'Hello world!',
    visibility: {
      code: 'anyone'
    }
  };
  cordova.plugins.LinkedIn.postRequest('~/shares', payload, onSuccess, onError);

}, onError);
  //  this.linkedin.hasActiveSession().then((active) => {;
  
  //   if(active){
  //     console.log('has active session?', active)
  //   }
  //   else{
  //     this.linkedin.login(['r_basicprofile', 'r_emailaddress', 'rw_company_admin', 'w_share'], true)
  //     .then(() => console.log('Logged in!'))
  //     .catch(e => console.log('Error logging in', e));
  //   }
  //   }).catch(e => console.log("error active session", e));

    // login
    // const scopes = ['r_basicprofile', 'r_emailaddress', 'rw_company_admin', 'w_share'];
    
      
    }

register(){
  this.navCtrl.push(Register);
}
}
