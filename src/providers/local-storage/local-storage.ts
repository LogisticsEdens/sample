import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
/*
  Generated class for the LocalStorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocalStorageProvider {

  constructor(private nativeStorage: NativeStorage) {
  }

  isSet(propertyName: string): boolean{
    let result: boolean;
    this.nativeStorage.getItem(propertyName)
    .then(data => {
      result = true;
    },error => {
      result = false;
    });
    return result;
  }

  setProperty(propertyName: string, propertyValue: any): boolean{
    let result: boolean;
    this.nativeStorage.setItem(propertyName, propertyValue)
    .then(() => {
      result = true;
    },error => {
      result = false;
    });
    return result;
  }

  getProperty(propertyName): any{
    let value: any = null;
    if(this.isSet(propertyName)){
      this.nativeStorage.getItem(propertyName)
      .then(data => {
        value = data;
      });
    }
    return value;
  }

  removeProperty(propertyName): boolean{
    let result: boolean;
    this.nativeStorage.remove(propertyName)
    .then(() => {
      result = true;
    },error => {
      result = false;
    })
    return result;
  }
}
