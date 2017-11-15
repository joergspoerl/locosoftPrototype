import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Contact2Page } from '../pages/contact2/contact2';
import { TestPage } from '../pages/test/test';
import { ListPage } from '../pages/list/list';

import { ToastsManager, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { Contact2PageModule } from '../pages/contact2/contact2.module';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  public viewContainerRef: ViewContainerRef;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public toastr: ToastsManager, 
    vRef: ViewContainerRef ) {


    this.initializeApp(vRef);

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Contact2', component: Contact2Page },
    ];

  }

  initializeApp(vRef) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.toastr.setRootViewContainerRef(vRef);
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      console.log("is_ios", this.platform.is('ios'));
      console.log("is_android", this.platform.is('ios'));
      console.log("is_cordova", this.platform.is('cordova'));
      console.log("is_webapp", this.platform.is('webapp'));
      
      // go for development to test page
      // this.nav.push(Contact2Page);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
