import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { HTTP } from '@ionic-native/http';

declare var google;

/**
 * Generated class for the ViewLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-view-location',
  templateUrl: 'view-location.html',
})
export class ViewLocationPage {
  map:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, private http: HTTP) {
  }

  ionViewDidLoad() {
    this.http.setDataSerializer('json');
    this.http.post("http://www.qjskills.com/May29Services/Select.php", {requestType: "get location to view", id: this.navParams.get("id"), number: this.navParams.get("number")}, {})
    .then(data => {
      let responseData = JSON.parse(data.data);
      if(!responseData.error){
        let loc = responseData.loc;
        let lat = loc.latitude;
        let lng = loc.longitude;
        this.setInitialMarker(lat, lng);
      }
    })
    .catch(error => {
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
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
    this.addMarker(latLng);
  }
  addMarker(_latLng){
    let marker = new google.maps.Marker({
      position: _latLng,
      map: this.map,
      animation: google.maps.Animation.DROP,
      draggable: false
    });
    let infoWindow = new google.maps.InfoWindow({
      content: '<p>Location</p>'
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }
}
