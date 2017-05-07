import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Login } from '../pages/login/login';
import { Logout } from '../pages/logout/logout';
import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  email: any;
  password: any;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Logout', component: Logout}

    ];

  }

  initializeApp() {
    

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (this.platform.is('ios')) {
      // This will only print when on iOS
        localStorage.setItem('clientId', '0');
        alert("I'm an iOS device!");
      }
      else{
        localStorage.setItem('clientId', '1');
      }
      this.email = localStorage.getItem('email');
      this.password = localStorage.getItem('password');
      if(!(this.email == null || this.password == null)){
                console.log('please enter something');
                // localStorage.getItem('userdata');
                this.rootPage = HomePage;
                
            }
            else{ 
                  this.rootPage = Login;
                  
                }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
