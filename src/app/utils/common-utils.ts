import { Injectable } from '@angular/core';

@Injectable()
export class CommonUtils {

  constructor() {}

  readSessionField(key) {
    return sessionStorage.getItem(key);
  }

  setSessionField(key, value) {
    try {
      if (value) {
        sessionStorage.setItem(key, value);
      }
    } catch (err) {
      console.log('CommonUtils: Error setting session storage field: ' + err);
    }
  }

  setFormFieldValue(form, key, value) {
    try {
      form.controls[key].setValue(value);
    } catch (err) {
      console.log('CommonUtils: Error setting form field value: ' + err);
    }
  }


}









