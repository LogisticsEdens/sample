import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import { HTTP } from '@ionic-native/http';

/**
 * Generated class for the ContactDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-contact-data',
  templateUrl: 'contact-data.html',
})
export class ContactDataPage {
  form: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private http: HTTP, public loadingCtrl: LoadingController) {
    this.form = this.formBuilder.group({
      'Phone1':['',Validators.pattern('\\+[0-9]{10,15}')],
      'Phone2':['',Validators.pattern('\\+[0-9]{10,15}')],
      'OfficePhone':['',Validators.pattern('\\+[0-9]{10,15}')],
      'Email1':['',Validators.pattern('^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$')],
      'Email2':['',Validators.pattern('^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$')],
      'Skype':['',Validators.pattern('[a-z0-9\._]+')],
    });
  }

  ionViewDidLoad() {
    this.http.setDataSerializer('json');
    this.http.post("http://www.qjskills.com/May29Services/Select.php", { requestType: "get contact data", userNumber: 'help to select userID' }, {})
    .then(data => {
      let responseData = JSON.parse(data.data);
      if(!responseData.error){
        this.form.controls['Phone1'].setValue(responseData.info[0].Phone1);
        this.form.controls['Phone2'].setValue(responseData.info[0].Phone2);
        this.form.controls['OfficePhone'].setValue(responseData.info[0].OfficePhone);
        this.form.controls['Email1'].setValue(responseData.info[0].Email1);
        this.form.controls['Email2'].setValue(responseData.info[0].Email2);
        this.form.controls['Skype'].setValue(responseData.info[0].Skype);
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
      content: 'Uploading...'
    });
    spinner.present();
    let body={
      requestType: "update contact data",
      userNumber: "help to select userID",
      Phone2: this.form.value.Phone2,
      OfficePhone: this.form.value.OfficePhone,
      Email1: this.form.value.EmailOne,
      Email2: this.form.value.EmailTwo,
      Skype: this.form.value.Skype
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
