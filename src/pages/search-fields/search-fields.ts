import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HTTP } from '@ionic-native/http';

import { SearchMainCategoryPage } from '../main-category/main-category';

/**
 * Generated class for the SearchFieldsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-search-fields',
  templateUrl: 'search-fields.html',
})
export class SearchFieldsPage {
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
    this.navCtrl.push(SearchMainCategoryPage, { parentID: id });
  }
}
