import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import { HTTP } from '@ionic-native/http';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

import { UpdateLocationPage } from '../location/location';

/**
 * Generated class for the BusinessDataTwoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-business-data-two',
  templateUrl: 'business-data-two.html',
})
export class BusinessDataTwoPage {
  form: FormGroup;
  public imageSrc: string = "assets/imgs/empty.jpg";
  isChange: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private http: HTTP, private camera: Camera, private transfer: FileTransfer, public loadingCtrl: LoadingController) {
    this.form = this.formBuilder.group({
      'Website':[''],
      'CompanyLicense':[''],
      'Facebook':['',Validators.pattern('^(https?:\/\/)?((w{3}\.)?)facebook.com\/[a-z0-9_]+$')],
      'Pinterest':['',Validators.pattern('^(https?:\/\/)?((w{3}\.)?)pinterest.com\/[a-z0-9_]+$')],
      'Twitter':['',Validators.pattern('^(https?:\/\/)?((w{3}\.)?)twitter\.com\/(#!\/)?[a-z0-9_]+$')],
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
  ionViewDidLoad() {
    this.http.setDataSerializer('json');
    this.http.post("http://www.qjskills.com/May29Services/Select.php", { requestType: "get business data 2", userNumber: 'help to select userID' }, {})
    .then(data => {
      let responseData = JSON.parse(data.data);
      if(!responseData.error){
        this.form.controls['Website'].setValue(responseData.info[0].WebsiteUrl);
        this.form.controls['CompanyLicense'].setValue(responseData.info[0].CompanyLicense);
        this.form.controls['Facebook'].setValue(responseData.info[0].FacebookUrl);
        this.form.controls['Pinterest'].setValue(responseData.info[0].PinterestUrl);
        this.form.controls['Twitter'].setValue(responseData.info[0].TwitterUrl);
        let src = responseData.info[0].CompanyLogoUrl;
        if(src != "" && src != null && src != undefined){
          this.imageSrc = 'http://www.qjskills.com/May29Services/'+src;
        }
      }
    })
    .catch(error => {
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
    });
  }
  UpdateLocation(){
    this.navCtrl.push(UpdateLocationPage);
  }
  onSubmit(){
    let spinner = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Uploading...'
    });
    spinner.present();
    let body = {
      requestType: "update business data two",
      userNumber: "help to select userID",
      Website: this.form.value.Website,
      CompanyLicense: this.form.value.CompanyLicense,
      Facebook: this.form.value.Facebook,
      Pinterest: this.form.value.Pinterest,
      Twitter: this.form.value.Twitter
    };
    this.http.setDataSerializer('json');
    this.http.post("http://www.qjskills.com/May29Services/Update.php", body, {})
    .then(data => {
      let responseData = JSON.parse(data.data);
      if(!responseData.error){
        //data update Succuessfully
        if(this.isChange){
          this.upload(spinner);
        }else{
          spinner.dismiss();
        }
      }else{
        spinner.dismiss();
      }
    })
    .catch(error => {
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
    });
  }
  upload(spinner){
    let filename = 'image.jpg';//use in server
    let options: FileUploadOptions = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : { 
        colName: 'CompanyLogoUrl',
        tableName: 'Services',
        targetPath: 'Logo/',
        userNumber: 'User Number here'
      }
    }
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.upload(this.imageSrc, 'http://www.qjskills.com/May29Services/Upload.php', options)
    .then( data => {
      let response = JSON.parse(data.response);
      if(!response.error){
        spinner.dismiss();
      }else{
        spinner.dismiss();
        //show error
      }
    }, err => {
      //Error while uploading file
      spinner.dismiss();
      //show error
    });
  }
}
