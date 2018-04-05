import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HTTP } from '@ionic-native/http';

import { FindServicesPage } from '../find-services/find-services';
import { CategoryPage } from './../category/category';
import { MyLowProfilePage } from '../my-low-profile/my-low-profile';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';

/**
 * Generated class for the SubCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sub-category',
  templateUrl: 'sub-category.html',
})
export class SubCategoryPage {
  parentID: any;
  category: any;
  msg: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HTTP, private localStorage: LocalStorageProvider) {
    this.parentID = this.navParams.get("parentID");
    this.http.setDataSerializer('json');
    this.http.post("http://www.qjskills.com/May29Services/Select.php", { requestType: "get sub category", parentID: this.parentID }, {})
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
    let userInfo = this.navParams.get("userInfo");
    let loc = this.navParams.get("location");
    if(loc != null && loc != undefined && userInfo != undefined && userInfo != null){
      let data = {
        requestType: "register service provider",
        name: userInfo.name,
        gender: userInfo.gender,
        dateOfBirth: userInfo.dateOfBirth,
        lat: loc.lat().toString(),
        lng: loc.lng().toString(),
        categoryID: id
      }
      this.http.setDataSerializer('json');
      this.http.post("http://www.qjskills.com/May29Services/MobileInsert.php", data, {})
      .then(data => {
        let responseData = JSON.parse(data.data);
        if(!responseData.error){
          this.localStorage.setProperty('isServiceProvider', true);
        }
      })
      .catch(error => {
        this.msg = "Something Went Wrong";
      });
    }
    else{
      this.msg = {};
      this.msg.userInfo = userInfo;
      this.msg.lat = loc.lat().toString();
      this.msg.lng = loc.lng().toString();
      this.msg.categoryID = id;
      this.msg = JSON.stringify(this.msg);
    }

  }

}
//SecondComponent
@Component({
  selector: 'page-search-sub-category',
  templateUrl: 'sub-category.html',
})
export class SearchSubCategoryPage {
  parentID: any;
  category: any;
  msg: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HTTP) {
    this.parentID = this.navParams.get("parentID");
    this.http.setDataSerializer('json');
    this.http.post("http://www.qjskills.com/May29Services/Select.php", { requestType: "get sub category", parentID: this.parentID }, {})
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
    this.navCtrl.push(FindServicesPage, { parentID: id });
  }

}
//Third Component
@Component({
  selector: 'page-update-sub-category',
  templateUrl: 'sub-category.html',
})
export class UpdateSubCategoryPage {
  parentID: any;
  category: any;
  msg: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HTTP) {
    this.parentID = this.navParams.get("parentID");
    this.http.setDataSerializer('json');
    this.http.post("http://www.qjskills.com/May29Services/Select.php", { requestType: "get sub category", parentID: this.parentID }, {})
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
    this.http.setDataSerializer('json');
    this.http.post("http://www.qjskills.com/May29Services/Update.php", { requestType: "update sub category", subCategory: id, colName: this.navParams.get("col") }, {})
    .then(data => {
      let responseData = JSON.parse(data.data);
      if(!responseData.error){
        
        if(this.navParams.get("type") == "low"){
          this.navCtrl.push(MyLowProfilePage)
          .then(()=> {
            let index = this.navCtrl.getActive().index;
            let count = this.navParams.get("count");
            this.navCtrl.remove(index - count, count);
          });
        }else{
          this.navCtrl.push(CategoryPage)
          .then(()=> {
            let index = this.navCtrl.getActive().index;
            let count = this.navParams.get("count");
            this.navCtrl.remove(index - count, count);
          });
        }
      }
    })
    .catch(error => {
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
    });
  }

}
