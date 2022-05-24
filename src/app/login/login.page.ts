import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginform: FormGroup;
  isBtnDis = false;
  userList = [];
  PasswordType = "password";
  PasswordCheck = false;
  constructor(private router: Router, private database: AngularFireDatabase, public toastCtrl: ToastController) { }

  ShowPassword() {

    if (this.PasswordCheck) {
      this.PasswordType = "password";
      this.PasswordCheck = false;
    } else {
      this.PasswordType = "text";
      this.PasswordCheck = true;
    }
  }

  getAllUsers() {
    this.database.object('RajputFoundation/objRegistration').valueChanges().subscribe(data => {

      if (data != null) {
        let SubArr = Object.keys(data);
        this.userList = [];
        for (var loop = 0; loop < SubArr.length; loop++) {
          const object2 = Object.assign({ userId: SubArr[loop] }, data[SubArr[loop]]);
          this.userList.push(object2);
        }
        debugger;
      }
    })
  }

  async presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    // (await toast).onDidDismiss(() => {
    //   console.log('Dismissed toast');
    // });

    (await toast).present();
  }

  reset() {
    this.loginform.patchValue({
      Email: "",
      Password: ""
    });
  }

  saveStatus(param) {
    this.database.list("RajputFoundation/objRegistration/").update(param, {
      lastOnline: 'Online'
    }
    ).then(data => {
      return true;
    })
  }

  getLogin() {
    const formInfo = this.loginform.value;
    const userInfo = this.userList.find(data => data.Email == formInfo.Email && data.Password == data.Password);
    userInfo.lastOnline = 'Online';
    debugger;
    this.saveStatus(userInfo.userId);

    if (userInfo != null && userInfo != undefined) {
      // toast sucess
      localStorage.removeItem('loggerInfo');
      localStorage.setItem('loggerInfo', JSON.stringify(userInfo)); // save user Info to localStorage
      this.goToDashboard();
    } else {
      this.presentToast("Invalid email or password")
    }
  }

  ngOnInit() {

    this.loginform = new FormGroup({
      Email: new FormControl('', [Validators.required]), //
      Password: new FormControl('', [Validators.required]), //
    });

    this.getAllUsers();

  }

  goToDashboard() {
    this.reset();
    this.router.navigate(["/dashboard"]);
  }

  goToRegister() {
    this.reset();
    this.router.navigate(["/registration"]);
  }

  hasError(form, controlName, error) {
    if (form.controls[controlName].touched && form.controls[controlName].value == '') {
      form.controls[controlName].setErrors({ required: true });
      return form.controls[controlName].hasError(error);
    } else {
      if (this.loginform.valid) {
        this.isBtnDis = true;
      } else {
        this.isBtnDis = false;
      }
    }

    // return form.controls[controlName].hasError(error);
  }

}
