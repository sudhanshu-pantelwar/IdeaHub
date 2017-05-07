import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController, LoadingController } from 'ionic-angular';
/*
  Generated class for the Backend provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Backend {
  ip_address: any='edu.ideahub.online/api/Edu';
  loading: any;
  constructor(public http: Http, public alertCtrl: AlertController, public loadCtrl: LoadingController) {
    console.log('Hello Backend Provider');
  }

 login(email, password, longitude, latitude){
  let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  let options = new RequestOptions({ headers: headers });
  //let ip_address = '192.168.1.79';
  let deviceId = localStorage.getItem('deviceId');
  let url = 'http://'+this.ip_address+'/Login';
  let body = 'ClientId='+'0'+'&DeviceId='+deviceId+'&Email='+email+'&Latitude='+latitude+'&Longitude='+longitude+'&Password='+password;
  console.log(body);
  return this.http.post(url, body, options)
    .map(res => res);
  }

  colleges(){
  let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  let options = new RequestOptions({ headers: headers });
  //let ip_address = '192.168.1.79';
  // let deviceId = localStorage.getItem('deviceId');
  let url = 'http://'+this.ip_address+'/Colleges';
  // let body = 'ClientId='+'0'+'&DeviceId='+deviceId+'&Email='+email+'&Latitude='+latitude+'&Longitude='+longitude+'&Password='+password;
  // console.log(body);
  let body = '';
  return this.http.post(url, body, options)
    .map(res => res);
  }

  branches(){
  let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  let options = new RequestOptions({ headers: headers });
  //let ip_address = '192.168.1.79';
  // let deviceId = localStorage.getItem('deviceId');
  let url = 'http://'+this.ip_address+'/Branch';
  // let body = 'ClientId='+'0'+'&DeviceId='+deviceId+'&Email='+email+'&Latitude='+latitude+'&Longitude='+longitude+'&Password='+password;
  // console.log(body);
  let body = '';
  return this.http.post(url, body, options)
    .map(res => res);
  }

  specializations(){
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  let options = new RequestOptions({ headers: headers });
  //let ip_address = '192.168.1.79';
  // let deviceId = localStorage.getItem('deviceId');
  let url = 'http://'+this.ip_address+'/Specialization';
  // let body = 'ClientId='+'0'+'&DeviceId='+deviceId+'&Email='+email+'&Latitude='+latitude+'&Longitude='+longitude+'&Password='+password;
  // console.log(body);
  let body = '';
  return this.http.post(url, body, options)
    .map(res => res);
  }

  register(branch, college, email, firstname, lastname, latitude, longitude, mobilenumber, password, specialization){
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    //let ip_address = '192.168.1.79';
    // let deviceId = localStorage.getItem('deviceId');
    let url = 'http://'+this.ip_address+'/Register';
    // let body = 'ClientId='+'0'+'&DeviceId='+deviceId+'&Email='+email+'&Latitude='+latitude+'&Longitude='+longitude+'&Password='+password;
    // console.log(body);
    let clientId = localStorage.getItem('clientId');
    let body = 'Branch='+branch+'&ClientId='+clientId+'&College='+college+'&DeviceId='+'0'+'&Email='+email+'&FirstName='+firstname+'&LastName='+lastname+'&Latitude='+latitude+'&Longitude='+longitude+'&MobileNo='+mobilenumber+'&Password='+password+'&Specialization='+specialization+'&userType='+'1';
    console.log(body);
    return this.http.post(url, body, options)
      .map(res => res);
    }

  already(email){
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    //let ip_address = '192.168.1.79';
    // let deviceId = localStorage.getItem('deviceId');
    let url = 'http://'+this.ip_address+'/IsEmailAvailable?email='+email;
    // let body = 'ClientId='+'0'+'&DeviceId='+deviceId+'&Email='+email+'&Latitude='+latitude+'&Longitude='+longitude+'&Password='+password;
    // console.log(body);
    // let clientId = localStorage.getItem('clientId');
    // let body = 'Branch='+branch+'&ClientId='+clientId+'&College='+college+'&DeviceId='+'0'+'&Email='+email+'&FirstName='+firstname+'&LastName='+lastname+'&Latitude='+latitude+'&Longitude='+longitude+'&MobileNo='+mobilenumber+'&Password='+password+'&Specialization='+specialization+'&userType='+'1';
    let body='';
    // console.log(body);
    return this.http.post(url,body)
      .map(res => res);
    // edu.ideahub.online/api/Edu/IsEmailAvailable?email=chaitanya@challido.com
  }

  socialRegister(email){
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    //let ip_address = '192.168.1.79';
    // let deviceId = localStorage.getItem('deviceId');
    let url = 'http://'+this.ip_address+'/SocialRegister';
    // let body = 'ClientId='+'0'+'&DeviceId='+deviceId+'&Email='+email+'&Latitude='+latitude+'&Longitude='+longitude+'&Password='+password;
    // console.log(body);
    // let clientId = localStorage.getItem('clientId');
    let body = 'Email='+email;
    console.log(body);
    return this.http.post(url, body, options)
      .map(res => res);
  }

  /**
 *  Loading snipper display.
 */
  loadingSnipper(contentText: string){
    this.loading = this.loadCtrl.create({
      content: contentText
    });
    
    this.loading.present();
  }

/**
 *  Close the loading snipper.
 */
  closeLoading(){
    this.loading.dismiss();
  }
}
