import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';

import { HTTP } from '@ionic-native/http';
import { Contacts, ContactFieldType, ContactFindOptions } from '@ionic-native/contacts';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  contactsfound = [];
  search = false;
  msg:any;
  persons: any = [];
  constructor(public navCtrl: NavController,private contacts: Contacts, private http: HTTP, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
      this.findContact({ target: { value: ""}});
  }
  findContact(ev:any) {
    this.persons = [];
    let fields:ContactFieldType[] = ['displayName'];
    const options = new ContactFindOptions();
    options.filter = ev.target.value;
    options.multiple = true;
    options.hasPhoneNumber = true;
        this.contacts.find(fields, options).then((contacts) => {
            this.contactsfound = contacts;
            this.contactsfound.sort(function(a, b){
                let nameA = a.displayName.toLowerCase();
                let nameB = b.displayName.toLowerCase();
                if (nameA < nameB) //sort string ascending
                    return -1 
                if (nameA > nameB)
                    return 1
                return 0
            });
            this.msg = JSON.stringify(this.contactsfound[0]);
        });
        if(this.contactsfound.length == 0){
            this.contactsfound.push({displayName: 'No Contacts found'});  
        }
        this.search = true;
    }
    toggleContacts(ev, person){
        if(ev.checked){
            this.persons.push(person);
        }else{
            this.persons.splice(this.persons.indexOf(person), 1);
        }
    }
    sendInvitation(){
        if(this.persons.length > 0){
            let spinner = this.loadingCtrl.create({
                spinner: 'bubbles',
                content: 'Updating...'
            });
            spinner.present();
            let numbers = [];
            this.persons.forEach(x => {
                x.phoneNumbers.forEach(y => {
                    let val = y.value;
                    let chars = ['(', ')', '-', ' ', '\r', '\r\n', '\n'];
                    chars.forEach(z=>{
                        while(val.indexOf(z)!=-1){
                            val = val.replace(z, "");
                        }
                    }); 
                    numbers.push(val);
                });
            });
            numbers = this.removeDuplicates(numbers);
            this.http.setDataSerializer('json');
            this.http.post("http://www.qjskills.com/May29Services/May29_SMS/TwilioSMS.php", { requestType: "send invitation", "numbers": numbers }, {})
            .then(data => {
              let responseData = JSON.parse(data.data);
              if(!responseData.error){
                  spinner.dismiss();
                  let alert = this.alertCtrl.create({
                      title: 'Success',
                      message: 'Invitations Send',
                      buttons: ['Dismiss']
                  });
                  alert.present();
              }else{
                spinner.dismiss();
                let alert = this.alertCtrl.create({
                    title: 'Problem',
                    message: 'Problem Occur',
                    buttons: ['Dismiss']
                });
                alert.present();
              }
            })
            .catch(error => {
              spinner.dismiss();
              let alert = this.alertCtrl.create({
                title: 'Error',
                message: 'Connection Problem',
                buttons: ['Dismiss']
              });
              alert.present();
            });
        }
    }
    removeDuplicates(arr){
        let unique_array = []
        for(let i = 0;i < arr.length; i++){
            if(unique_array.indexOf(arr[i]) == -1){
                unique_array.push(arr[i])
            }
        }
        return unique_array
    }
}
