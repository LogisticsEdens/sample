import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { HTTP } from '@ionic-native/http';

import { FieldsPage } from './../fields/fields';

declare var google;

/**
 * Generated class for the LocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {
  map:any;
  autocomplete:any;
  autocompleteItems:any;
  GoogleAutocomplete:any;
  geocoder:any;
  marker:any;
  LatLng:any;
  text: string = "Next";
  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, private zone: NgZone) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
    this.geocoder = new google.maps.Geocoder;
    this.marker = null;  
  }
  ionViewDidLoad() {
    this.geolocation.getCurrentPosition().then((position) => {
           let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
           let mapOptions = {
             center: latLng,
             zoom: 15,
             mapTypeId: google.maps.MapTypeId.ROADMAP,
             streetViewControl: false,
             clickableIcons: false
           }
           this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
           this.map.addListener("click",(position)=>{
            this.clearMarkers();
            this.addMarker(position.latLng);
          });
          this.addMarker(latLng);
         }, (err) => {
           console.log(err);
         });
  }
  updateSearchResults(){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input, location: this.LatLng, radius:'500'},
    (predictions, status) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.autocompleteItems.push(prediction);
        });
      });
    });
  }
  selectSearchResult(item){
    this.clearMarkers();
    this.autocomplete.input = item.description;
    this.autocompleteItems = [];
  
    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if(status === 'OK' && results[0]){
        this.addMarker(results[0].geometry.location);
        this.map.setCenter(results[0].geometry.location);
      }
    })
  }
  clearMarkers() {
    this.marker.setMap(null);
    this.marker=null;
  }
  addMarker(_latLng){
    this.LatLng = _latLng;
    let marker = new google.maps.Marker({
      position: _latLng,
      map: this.map,
      animation: google.maps.Animation.DROP,
      draggable: false
    });
    this.marker = marker;
    let infoWindow = new google.maps.InfoWindow({
      content: '<p>Your Selected Location</p>'
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }
  submit(){
    this.navCtrl.push(FieldsPage , { location: this.LatLng, userInfo: this.navParams.get("userInfo")});
  }
}
//Second Component
@Component({
  selector: 'page-update-location',
  templateUrl: 'location.html',
})
export class UpdateLocationPage {
  map:any;
  autocomplete:any;
  autocompleteItems:any;
  GoogleAutocomplete:any;
  geocoder:any;
  marker:any;
  LatLng:any;
  text: string = "Update";
  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, private zone: NgZone, private http: HTTP, public loadingCtrl: LoadingController) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
    this.geocoder = new google.maps.Geocoder;
    this.marker = null;  
  }
  ionViewDidLoad() {
    let body = {
     requestType: "get location",
     number: "User number"
    };
    this.http.setDataSerializer('json');
    this.http.post("http://www.qjskills.com/May29Services/Select.php", body, {})
    .then(data => {
      let responseData = JSON.parse(data.data);
      if(!responseData.error){
        //let loc = JSON.parse(responseData.location);
        let lat = responseData.location[0].latitude;
        let lng = responseData.location[0].longitude;
        this.setInitialMarker(Number(lat), Number(lng));
      }
    })
    .catch(error => {
      this.setInitialMarker(0, 0);
    });
  }
  setInitialMarker(lat, lng){
    let latLng = new google.maps.LatLng(lat, lng);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      streetViewControl: false,
      clickableIcons: false
    }
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    this.map.addListener("click",(position)=>{
     this.clearMarkers();
     this.addMarker(position.latLng);
   });
   this.addMarker(latLng);
  }
  updateSearchResults(){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input, location: this.LatLng, radius:'500'},
    (predictions, status) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.autocompleteItems.push(prediction);
        });
      });
    });
  }
  selectSearchResult(item){
    this.clearMarkers();
    this.autocomplete.input = item.description;
    this.autocompleteItems = [];
  
    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if(status === 'OK' && results[0]){
        this.addMarker(results[0].geometry.location);
        this.map.setCenter(results[0].geometry.location);
      }
    })
  }
  clearMarkers() {
    this.marker.setMap(null);
    this.marker=null;
  }
  addMarker(_latLng){
    this.LatLng = _latLng;
    let marker = new google.maps.Marker({
      position: _latLng,
      map: this.map,
      animation: google.maps.Animation.DROP,
      draggable: false
    });
    this.marker = marker;
    let infoWindow = new google.maps.InfoWindow({
      content: '<p>Your Selected Location</p>'
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }
  submit(){
    let spinner = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Uploading...'
    });
    spinner.present();
    let body = {
      requestType: "update location",
      lat: this.LatLng.lat(),
      lng: this.LatLng.lng()
    };
    this.http.setDataSerializer('json');
    this.http.post("http://www.qjskills.com/May29Services/Update.php", body, {})
    .then(data => {
      let responseData = JSON.parse(data.data);
      if(!responseData.error){
        //data update Succuessfully
        spinner.dismiss();
      }
      else{
        spinner.dismiss();
      }
    })
    .catch(error => {
      spinner.dismiss();
    });
  }
}
