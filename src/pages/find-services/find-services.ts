import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { ViewProfilePage } from '../view-profile/view-profile';
import { ViewLocationPage } from '../view-location/view-location';
import { ViewReviewsPage } from '../view-reviews/view-reviews';

import { Geolocation } from '@ionic-native/geolocation';
import { HTTP } from '@ionic-native/http';
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';

//declare var google;

/**
 * Generated class for the FindServicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-find-services',
  templateUrl: 'find-services.html',
})
export class FindServicesPage {
  obj: testing = new testing();
  services: any;
  test: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, private http: HTTP, private mobile: CallNumber, private emailComposer: EmailComposer, public alertCtrl: AlertController) {
    
    this.geolocation.getCurrentPosition().then((position) => {
      //let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); 
    }, (err) => {
      console.log(err);
    });
  }

  ionViewDidLoad() {
    this.http.setDataSerializer('json');
    this.http.post("http://www.qjskills.com/May29Services/Select.php", {requestType: "get services", ID: this.navParams.get("parentID")}, {})
    .then(data => {
      let responseData = JSON.parse(data.data);
      if(!responseData.error){
        let collection = responseData.services;
        this.services = collection;
        this.test = JSON.stringify(collection);
      }
    })
    .catch(error => {
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
    });
  }
  showCallPrompt(number, name){
    let prompt = this.alertCtrl.create({
      title: 'Calling',
      message: "You want to call "+name,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Nothing Happened');
          }
        },
        {
          text: 'Call',
          handler: () => {
            this.callToAction(number);
          }
        }
      ]
    });
    prompt.present();
  }
  callToAction(number){
    this.mobile.callNumber(number, true)
    .then(() => console.log('launch dialer'))
    .catch(() => console.log('Error launching dialer'));
  }
  emailToAction(email){
    let options = {
      to: email,
      subject: 'May29',
      body: '',
      isHtml: true
    };
    this.emailComposer.open(options);
  }
  ViewProfile(number, id){
    this.navCtrl.push(ViewProfilePage, {number: number, id: id});
  }
  ViewLocation(number, id){
    this.navCtrl.push(ViewLocationPage, {number: number, id: id});
  }
  ViewReviews(id){
    this.navCtrl.push(ViewReviewsPage, {id: id})
  }
  
}
class testing{
  public getlimitedName = (name: String): String => {
    if(name.length > 14){
      name = name.slice(0, 14);
      name = name + "...";
    }
    return name;
  }
}
