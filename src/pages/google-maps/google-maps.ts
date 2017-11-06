import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ToastMessageProvider } from '../../providers/toastMessage/toastMessage'

import { Geolocation } from '@ionic-native/geolocation';
declare var google;
declare var GeolocationMarker;

/**
 * Generated class for the GoogleMapsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-google-maps',
  templateUrl: 'google-maps.html',
})
export class GoogleMapsPage {


  showFooter: string = null;

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  currentPosition: LatLng;
  latLngArray: LatLng[];
  bounds: any;

  currentPositionImageUrl = 'http://www.robotwoods.com/dev/misc/bluecircle.png';
  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingProvider: ToastMessageProvider,
    public geolocation: Geolocation) {

    //this.latLng = navParams.get('latLng');
    this.latLngArray = navParams.get('latLngArray');
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoogleMapsPage');

    this.loadMap();
    this.getCurrentPosition();

    this.setMarkerArray(this.latLngArray);

    this.autoCenterMap();
    this.autoZoomMap();

  }

  getCurrentPosition() {
    this.showFooter = "Get your position, please wait...";
    console.log("getCurrentPosition()");
    this.geolocation.getCurrentPosition()

      .then((position) => {
        this.showFooter = null;
        // use current geoposition
        this.currentPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        console.log("use current geoposition", this.currentPosition)
        this.setMarkerWithImgUrl(this.currentPosition,this.currentPositionImageUrl);

        this.activateGeolocationMarker();
        this.autoCenterMap();
        this.autoZoomMap();
    
      })

      .catch((error) => {
        this.showFooter = null;
        // default position, if no geolocation
        this.currentPosition = new google.maps.LatLng(51.0504088, 13.7372621); // dresden
        console.log("default position, if no geolocation", this.currentPosition)
        this.setMarkerWithImgUrl(this.currentPosition,this.currentPositionImageUrl);

        this.activateGeolocationMarker();
        this.autoCenterMap();
        this.autoZoomMap();
    
      })
  }

  loadMap() {

    var defaultPosition = new google.maps.LatLng(51.0504088, 13.7372621);
    let mapOptions = {
      center: defaultPosition,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.bounds  = new google.maps.LatLngBounds();
    //this.setMarkerWithImgUrl(latLng, this.currentPositionImageUrl);
  }

  activateGeolocationMarker() {
    var GeoMarker = new GeolocationMarker(this.map);
  }

  setMarkerArray(latLngArray) {
    if (Array.isArray(latLngArray))
      for (let entry of latLngArray) {
        this.setMarker(entry);
      }
  }

  setMarker(latLng) {
    //console.log("createMarker", latLng)
    var marker = new google.maps.Marker({
      position: latLng,
      map: this.map
    });
    var loc = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
    this.bounds.extend(loc);
  }

  setMarkerWithImgUrl(latLng, imgUrl) {
    //console.log("createMarker", latLng)
    var marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      icon: imgUrl
    });
    var loc = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
    this.bounds.extend(loc);
  }

  autoCenterMap () {
    this.map.panToBounds(this.bounds);     // auto-center
  }

  autoZoomMap () {
    this.map.fitBounds(this.bounds);       // auto-zoom
  }


}


export interface LatLng {
  lat: number,
  lng: number
};