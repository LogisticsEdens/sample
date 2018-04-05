import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import { HTTP } from '@ionic-native/http';

/**
 * Generated class for the PersonalTwoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-personal-two',
  templateUrl: 'personal-two.html',
})
export class PersonalTwoPage {
  form: FormGroup;
  maxDate: any;
  minDate: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private http: HTTP, public loadingCtrl: LoadingController) {
    let today = new Date();
    this.form = this.formBuilder.group({
      'firstName':['',Validators.pattern('^[a-zA-Z]{3,12}(\\s[a-zA-Z]{2,12}){0,3}$')],
      'middleName':['',Validators.pattern('^[a-zA-Z]{3,20}$')],
      'lastName':['',Validators.pattern('^[a-zA-Z]{3,20}$')],
      'gender':['',Validators.required],
      'dateOfBirth':[today.getFullYear() - 20 +'-06-06',Validators.required]
    });
    this.maxDate = today.getFullYear() - 6 + "-12-31";
    this.minDate = today.getFullYear() - 80;
  }

  ionViewDidLoad() {
    this.http.setDataSerializer('json');
    this.http.post("http://www.qjskills.com/May29Services/Select.php", { requestType: "get person two info", userNumber: 'help to select userID' }, {})
    .then(data => {
      let responseData = JSON.parse(data.data);
      if(!responseData.error){
        this.form.controls['firstName'].setValue(responseData.info[0].FirstName);
        this.form.controls['middleName'].setValue(responseData.info[0].MiddleName);
        this.form.controls['lastName'].setValue(responseData.info[0].LastName);
        this.form.controls['gender'].setValue(responseData.info[0].Gender);
        this.form.controls['dateOfBirth'].setValue(responseData.info[0].DateOfBirth);
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
    let body = {
      requestType: "update person two info",
      userNumber: "help to select userID",
      firstName: this.form.value.firstName,
      middelName: this.form.value.middleName,
      lastName: this.form.value.lastName,
      gender: this.form.value.gender,
      dateOfBirth: this.form.value.dateOfBirth
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
