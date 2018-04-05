import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { HTTP } from '@ionic-native/http';

import { UpdateFieldsPage } from '../fields/fields';
import { UpdateMainCategoryPage } from '../main-category/main-category';
import { UpdateSubCategoryPage } from '../sub-category/sub-category';
/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  fieldLabels: any;
  mainLabels: any;
  subLabels: any;
  num: any = 3;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HTTP, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    let hide = false;
    if(this.navParams.get("type") == "Gold"){
      hide = true;
    }
    this.http.setDataSerializer('json');
    this.http.post("http://www.qjskills.com/May29Services/Select.php", { requestType: "get fields main sub categories", userNumber: 'help to select userID' }, {})
    .then(data => {
      let responseData = JSON.parse(data.data);
      if(!responseData.error){
        let row = responseData.info[0];
        this.fieldLabels = [{
          label: row.field1,
          col: 'SubCategory1',
          hide: false
        },
        {
          label: row.field2,
          col: 'SubCategory2',
          hide: false
        },
        {
          label: row.field3,
          col: 'SubCategory3',
          hide: hide
        },
        {
          label: row.field4,
          col: 'SubCategory4',
          hide: hide
        }];

        this.mainLabels = [{
          parent: row.field1_id,
          label: row.main1,
          col: 'SubCategory1'
        },
        {
          parent: row.field2_id,
          label: row.main2,
          col: 'SubCategory2'
        },
        {
          parent: row.field3_id,
          label: row.main3,
          col: 'SubCategory3'
        },
        {
          parent: row.field4_id,
          label: row.main4,
          col: 'SubCategory4'
        }];

        this.subLabels = [{
          parent: row.main1_id,
          label: row.sub1,
          col: 'SubCategory1'
        },
        {
          parent: row.main2_id,
          label: row.sub2,
          col: 'SubCategory2'
        },
        {
          parent: row.main3_id,
          label: row.sub3,
          col: 'SubCategory3'
        },
        {
          parent: row.main4_id,
          label: row.sub4,
          col: 'SubCategory4'
        }];
      }
    })
    .catch(error => {
      // let alert = this.alertCtrl.create({
      //   title: 'Error!',
      //   subTitle: 'Something Went Wrong',
      //   buttons: ['OK']
      // });
      //alert.present();
    });
  }
  changeField(field){
    this.navCtrl.push(UpdateFieldsPage, {col: field.col, count: 4});
  }
  changeMainCategory(main){
    if(main.label == null){
      this.navCtrl.push(UpdateFieldsPage, {col: main.col, count: 4});
    }else{
      this.navCtrl.push(UpdateMainCategoryPage, {col: main.col, parentID: main.parent, count: 3});
    }
  }
  changeSubCategory(sub){
    if(sub.label == null){
      this.navCtrl.push(UpdateFieldsPage, {col: sub.col, count: 4});
    }else{
      this.navCtrl.push(UpdateSubCategoryPage, {col: sub.col, parentID: sub.parent, count: 2});
    }
  }
}
