import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CarSearchPage } from '../pages/car-search/car-search'
import { AppSettingsPage } from '../pages/app-settings/app-settings'
import { ContactPage } from '../pages/contact/contact'
import { ContactDetailsPage } from '../pages/contact-details/contact-details'

import { GoogleMapsPage } from '../pages/google-maps/google-maps'
import { Geolocation } from '@ionic-native/geolocation';

import { ContactProvider } from '../providers/contact/contact'
import { LoadingProvider } from '../providers/loading/loading'

import { SearchPipe } from '../pipe/searchPipe'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    CarSearchPage,
    AppSettingsPage,
    ContactPage,
    ContactDetailsPage,
    GoogleMapsPage,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    CarSearchPage,
    AppSettingsPage,
    ContactPage,
    ContactDetailsPage,
    GoogleMapsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ContactProvider,
    LoadingProvider,
    Geolocation
  ]
})
export class AppModule {}
