import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(platform: Platform, private database: AngularFireDatabase, private router: Router) {

    let data = JSON.parse(localStorage.getItem('loggerInfo'));

    if (data != undefined && data != null) {
      this.router.navigate(["/dashboard"]);
    } else {
      this.router.navigate(["/login"]);
    }
    platform.pause.subscribe(e => {
      let data = JSON.parse(localStorage.getItem('loggerInfo'));
      if (data != undefined && data != null) {
        this.database.list("RajputFoundation/objRegistration/").update(data.userId, {
          lastOnline: JSON.stringify(new Date())
        }
        ).then(data => {
          return true;
        })
      }
    })

    platform.resume.subscribe(e => {
      let data = JSON.parse(localStorage.getItem('loggerInfo'));
      if (data != undefined && data != null) {
        this.database.list("RajputFoundation/objRegistration/").update(data.userId, {
          lastOnline: "Online"
        }
        ).then(data => {
          return true;
        })
      }
    })

  }
}
