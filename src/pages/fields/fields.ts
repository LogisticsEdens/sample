import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HTTP } from '@ionic-native/http';

import { MainCategoryPage, UpdateMainCategoryPage } from '../main-category/main-category';

/**
 * Generated class for the FieldsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-fields',
  templateUrl: 'fields.html',
})
export class FieldsPage {
  fields: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HTTP) {
    this.http.setDataSerializer('json');
    this.http.post("http://www.qjskills.com/May29Services/Select.php", {requestType: "get fields"}, {})
    .then(data => {
      let responseData = JSON.parse(data.data);
      if(!responseData.error){
        this.fields = responseData.fields;
      }
    })
    .catch(error => {
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
    });
  }

  ionViewDidLoad() {
    
  }
  onClickFn(id){
    this.navCtrl.push(MainCategoryPage, { parentID: id, location: this.navParams.get("location"), userInfo: this.navParams.get("userInfo") });
  }
}
//Second Component
@Component({
  selector: 'page-update-fields',
  templateUrl: 'fields.html',
})
export class UpdateFieldsPage {
  fields: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HTTP) {
    this.http.setDataSerializer('json');
    this.http.post("http://www.qjskills.com/May29Services/Select.php", {requestType: "get fields"}, {})
    .then(data => {
      let responseData = JSON.parse(data.data);
      if(!responseData.error){
        this.fields = responseData.fields;
      }
    })
    .catch(error => {
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
    });
  }

  ionViewDidLoad() {
    
  }
  onClickFn(id){
    this.navCtrl.push(UpdateMainCategoryPage, { parentID: id, col: this.navParams.get("col"), count: this.navParams.get("count"), type: this.navParams.get("type") });
  }
}

