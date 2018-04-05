import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import { HTTP } from '@ionic-native/http';

/**
 * Generated class for the BusinessDataOnePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-business-data-one',
  templateUrl: 'business-data-one.html',
})
export class BusinessDataOnePage {
  form: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private http: HTTP, public loadingCtrl: LoadingController) {
    this.form = this.formBuilder.group({
      'CompanyName':['',Validators.pattern('^[a-zA-Z0-9]{3,40}$')],
      'DesignationOne':['',Validators.pattern('^[a-zA-Z]{3,20}$')],
      'DesignationTwo':['',Validators.pattern('^[a-zA-Z]{3,20}$')],
      'Activity':['',Validators.pattern('^[a-zA-Z]{3,20}$')],
      'AddressLineOne':[''],
      'AddressLineTwo':[''],
      'City':['',Validators.pattern('^[a-zA-Z]{3,30}$')],
      'State':['',Validators.pattern('^[a-zA-Z]{3,30}$')],
      'ZipCode':['',Validators.pattern('^[0-9]{5,6}$')],
      'Country':[''],
      'ServiceProvided':['']
    });
  }

  ionViewDidLoad() {
    this.http.setDataSerializer('json');
    this.http.post("http://www.qjskills.com/May29Services/Select.php", { requestType: "get business data 1", userNumber: 'help to select userID' }, {})
    .then(data => {
      let responseData = JSON.parse(data.data);
      if(!responseData.error){
        this.form.controls['CompanyName'].setValue(responseData.info[0].CompanyName);
        this.form.controls['DesignationOne'].setValue(responseData.info[0].Designation1);
        this.form.controls['DesignationTwo'].setValue(responseData.info[0].Designation2);
        this.form.controls['Activity'].setValue(responseData.info[0].Activity);
        this.form.controls['AddressLineOne'].setValue(responseData.info[0].Address1);
        this.form.controls['AddressLineTwo'].setValue(responseData.info[0].Address2);
        this.form.controls['City'].setValue(responseData.info[0].City);
        this.form.controls['State'].setValue(responseData.info[0].State);
        this.form.controls['ZipCode'].setValue(responseData.info[0].Zip);
        this.form.controls['Country'].setValue(responseData.info[0].Country);
        this.form.controls['ServiceProvided'].setValue(responseData.info[0].ServiceProvided);
      }
    })
    .catch(error => {
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
    });
  }
  onSubmit(){
    let spinner = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Updating...'
    });
    spinner.present();
    let body={
      requestType: "update business data one",
      userNumber: "help to select userID",
      CompanyName: this.form.value.CompanyName,
      DesignationOne: this.form.value.DesignationOne,
      DesignationTwo: this.form.value.DesignationTwo,
      Activity: this.form.value.Activity,
      AddressLineOne: this.form.value.AddressLineOne,
      AddressLineTwo: this.form.value.AddressLineTwo,
      City: this.form.value.City,
      State: this.form.value.State,  
      ZipCode: this.form.value.ZipCode      
    };
    this.http.setDataSerializer('json');
    this.http.post("http://www.qjskills.com/May29Services/Update.php", body, {})
    .then(data => {
      let responseData = JSON.parse(data.data);
      if(!responseData.error){
        //data update Succuessfully
        spinner.dismiss();
      }else{
        spinner.dismiss();
      }
    })
    .catch(error => {
      spinner.dismiss();
    });
  }
}
