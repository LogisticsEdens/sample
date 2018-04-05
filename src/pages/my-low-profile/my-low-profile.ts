import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import { HTTP } from '@ionic-native/http';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

import { UpdateLocationPage } from '../location/location';
import { UpdateFieldsPage } from '../fields/fields';
import { UpdateMainCategoryPage } from '../main-category/main-category';
import { UpdateSubCategoryPage } from '../sub-category/sub-category';

/**
 * Generated class for the MyLowProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-low-profile',
  templateUrl: 'my-low-profile.html',
})
export class MyLowProfilePage {
  form: FormGroup;
  field: any;
  main: any;
  sub: any;
  public imageSrc: string = "assets/imgs/empty.jpg";
  public imageSrc2: string = "assets/imgs/empty.jpg";
  isChange: boolean = false;
  isChange2: boolean = false;
  hide: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private http: HTTP, public loadingCtrl: LoadingController, private camera: Camera, private transfer: FileTransfer, private alertCtrl: AlertController) {
    let today = new Date();
    this.form = this.formBuilder.group({
      'firstName':['',Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z]{3,12}(\\s[a-zA-Z]{2,12}){0,3}$')])],
      'middleName':['',Validators.pattern('^[a-zA-Z]{3,20}$')],
      'lastName':['',Validators.pattern('^[a-zA-Z]{3,20}$')],
      'gender':['',Validators.required],
      'dateOfBirth':[today.getFullYear() - 20 +'-06-06',Validators.required],
      'CompanyName':['',Validators.pattern('^[a-zA-Z0-9]{3,40}$')],
      'DesignationOne':['',Validators.pattern('^[a-zA-Z]{3,20}$')],
      'Website':[''],
      'Phone':[''],
      'Country':[''],
      'Email':['',Validators.pattern('^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$')],
      'Qualifications':['',Validators.pattern('^[a-zA-Z]{3,20}$')]
    });
    this.field = {
      label: null,
      col: 'SubCategory1'
    };
    this.main = {
      parent: null,
      label: null,
      col: 'SubCategory1'
    };
    this.sub = {
      parent: null,
      label: null,
      col: 'SubCategory1'
    };
  }

  ionViewDidLoad() {
    this.http.setDataSerializer('json');
    this.http.post("http://www.qjskills.com/May29Services/Select.php", { requestType: "get low profile", userNumber: 'help to select userID' }, {})
    .then(data => {
      let responseData = JSON.parse(data.data);
      if(!responseData.error){
        let row = responseData.info[0];
        this.form.controls['firstName'].setValue(row.FirstName);
        this.form.controls['middleName'].setValue(row.MiddleName);
        this.form.controls['lastName'].setValue(row.LastName);
        this.form.controls['gender'].setValue(row.Gender);
        this.form.controls['dateOfBirth'].setValue(row.DateOfBirth);
        this.form.controls['CompanyName'].setValue(row.CompanyName);
        this.form.controls['DesignationOne'].setValue(row.Designation);
        this.form.controls['Website'].setValue(row.WebsiteUrl);
        this.form.controls['Phone'].setValue(row.number);
        this.form.controls['Email'].setValue(row.Email);
        this.form.controls['Country'].setValue(row.Country);
        this.form.controls['Qualifications'].setValue(row.Qualifications);
        this.field = {
          label: row.field,
          col: 'SubCategory1'
        };
        this.main = {
          parent: row.field_id,
          label: row.main,
          col: 'SubCategory1'
        };
        this.sub = {
          parent: row.main_id,
          label: row.sub,
          col: 'SubCategory1'
        };
        let src = row.CompanyLogoUrl;
        if(src != "" && src != null && src != undefined){
          this.imageSrc = 'http://www.qjskills.com/May29Services/'+src;
        }
        src = row.CertificateUrl1;
        if(src != "" && src != null && src != undefined){
          this.imageSrc2 = 'http://www.qjskills.com/May29Services/'+src;
        }
        if(this.navParams.get("type")== "Free"){
          this.hide = true;
        }
      }
    })
    .catch(error => {
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
    });
  }
  openGallery(){
    let cameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,      
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,
      encodingType: this.camera.EncodingType.JPEG,      
      correctOrientation: true
    }
  
    this.camera.getPicture(cameraOptions)
      .then(file_uri => {
        this.imageSrc = file_uri
        this.isChange = true;
      }, 
      err => {
        console.log('error');
      });
  }
  openGallery2(){
    let cameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,      
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,
      encodingType: this.camera.EncodingType.JPEG,      
      correctOrientation: true
    }
  
    this.camera.getPicture(cameraOptions)
      .then(file_uri => {
        this.imageSrc2 = file_uri
        this.isChange2 = true;
      }, 
      err => {
        console.log('error');
      });
  }
  onSubmit(){
    let spinner = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Updating...'
    });
    spinner.present();
    let body = {
      requestType: "update low profile",
      userNumber: "help to select userID",
      firstName: this.form.value.firstName,
      middelName: this.form.value.middleName,
      lastName: this.form.value.lastName,
      gender: this.form.value.gender,
      CompanyName: this.form.value.CompanyName,
      Designation: this.form.value.DesignationOne,
      Website: this.form.value.Website,
      Email: this.form.value.Email,
      Qualifications: this.form.value.Qualifications
    };
    this.http.setDataSerializer('json');
    this.http.post("http://www.qjskills.com/May29Services/Update.php", body, {})
    .then(data => {
      let responseData = JSON.parse(data.data);
      if(!responseData.error){
        //data update Succuessfully
        if(this.isChange){
          this.upload(spinner, this.imageSrc, 'CompanyLogoUrl', 'Services', 'Logo/');
        }
        if(this.isChange2){
          this.upload(spinner, this.imageSrc2, 'CertificateUrl1', 'ServiceCertificate', 'Certificate/');
        }else{
          spinner.dismiss();
        }
      }else{
        spinner.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Not Updated',
          buttons: ['Ok']
        });
        alert.present();
      }
    })
    .catch(error => {
      spinner.dismiss();
    });
  }
  UpdateLocation(){
    this.navCtrl.push(UpdateLocationPage);
  }
  upload(spinner, imageSrc, col, table, target){
    let filename = 'image.jpg';//use in server
    let options: FileUploadOptions = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : { 
        colName: col,
        tableName: table,
        targetPath: target,
        userNumber: 'User Number here'
      }
    }
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.upload(imageSrc, 'http://www.qjskills.com/May29Services/Upload.php', options)
    .then( data => {
      let response = JSON.parse(data.response);
      if(!response.error){
        spinner.dismiss();
      }else{
        spinner.dismiss();
        spinner.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Not Updated',
          buttons: ['Ok']
        });
        alert.present();
      }
    }, err => {
      //Error while uploading file
      spinner.dismiss();
      //show error
    });
  }
  changeField(){
    this.navCtrl.push(UpdateFieldsPage, {col: this.field.col, count: 4, type: "low"});
  }
  changeMainCategory(){
    if(this.main.label == null){
      this.navCtrl.push(UpdateFieldsPage, {col: this.main.col, count: 4, type: "low"});
    }else{
      this.navCtrl.push(UpdateMainCategoryPage, {col: this.main.col, parentID: this.main.parent, count: 3, type: "low"});
    }
  }
  changeSubCategory(){
    if(this.sub.label == null){
      this.navCtrl.push(UpdateFieldsPage, {col: this.sub.col, count: 4, type: "low"});
    }else{
      this.navCtrl.push(UpdateSubCategoryPage, {col: this.sub.col, parentID: this.sub.parent, count: 2, type: "low"});
    }
  }

}
