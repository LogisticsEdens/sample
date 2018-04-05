import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HTTP } from '@ionic-native/http';

import { SubCategoryPage, SearchSubCategoryPage, UpdateSubCategoryPage } from '../sub-category/sub-category';

/**
 * Generated class for the MainCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-main-category',
  templateUrl: 'main-category.html',
})
export class MainCategoryPage {
  parentID: any;
  category: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HTTP) {
     this.parentID = this.navParams.get("parentID");
     this.http.setDataSerializer('json');
     this.http.post("http://www.qjskills.com/May29Services/Select.php", { requestType: "get main category", parentID: this.parentID }, {})
     .then(data => {
       let responseData = JSON.parse(data.data);
       if(!responseData.error){
         this.category = responseData.category;
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
    this.navCtrl.push(SubCategoryPage, { parentID: id, location: this.navParams.get("location"), userInfo: this.navParams.get("userInfo") });
  }

}
//second Component
@Component({
  selector: 'page-search-main-category',
  templateUrl: 'main-category.html',
})
export class SearchMainCategoryPage {
  parentID: any;
  category: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HTTP) {
     this.parentID = this.navParams.get("parentID");
     this.http.setDataSerializer('json');
     this.http.post("http://www.qjskills.com/May29Services/Select.php", { requestType: "get main category", parentID: this.parentID }, {})
     .then(data => {
       let responseData = JSON.parse(data.data);
       if(!responseData.error){
         this.category = responseData.category;
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
    this.navCtrl.push(SearchSubCategoryPage, { parentID: id });
  }

}
//Third Component
@Component({
  selector: 'page-update-main-category',
  templateUrl: 'main-category.html',
})
export class UpdateMainCategoryPage {
  parentID: any;
  category: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HTTP) {
     this.parentID = this.navParams.get("parentID");
     this.http.setDataSerializer('json');
     this.http.post("http://www.qjskills.com/May29Services/Select.php", { requestType: "get main category", parentID: this.parentID }, {})
     .then(data => {
       let responseData = JSON.parse(data.data);
       if(!responseData.error){
         this.category = responseData.category;
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
    this.navCtrl.push(UpdateSubCategoryPage, { parentID: id, col: this.navParams.get("col"), count: this.navParams.get("count"), type: this.navParams.get("type") });
  }

}
