import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { ComponentsModule } from '../components/components.module'

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

import { ToastMessageProvider } from '../providers/toastMessage/toastMessage'
import { CustomOption } from '../providers/toastMessage/custom-options'
import { ToastOptions } from 'ng2-toastr'

import { SearchPipe } from '../pipe/searchPipe'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoggingProvider } from '../providers/logging/logging';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

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
    SearchPipe,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    ComponentsModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
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
    {provide: ToastOptions, useClass: CustomOption},
    ToastMessageProvider,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ContactProvider,
    Geolocation,
    LoggingProvider
  ]
})
export class AppModule {}
