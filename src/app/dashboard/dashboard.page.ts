import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { CameraOptions, CameraResultType, ImageOptions } from '@capacitor/camera';
import { Plugins } from '@capacitor/core';

const { Camera } = Plugins;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  // private camera: Camera
  constructor(private router: Router, private database: AngularFireDatabase) { }

  ngOnInit() {
    let data = JSON.parse(localStorage.getItem('loggerInfo'));
    if (data != undefined && data != null) {
      this.database.list("RajputFoundation/objRegistration/").update(data.userId, {
        lastOnline: "Online"
      }
      ).then(data => {
        return true;
      })
    }
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64
    });
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    // var imageUrl = image.webPath;
    // Can be set to the src of an image now
    alert(image.base64String);
    debugger;
  }

  logout() {
    let data = JSON.parse(localStorage.getItem('loggerInfo'));
    if (data != undefined && data != null) {
      this.database.list("RajputFoundation/objRegistration/").update(data.userId, {
        lastOnline: JSON.stringify(new Date())
      }
      ).then(data => {
        localStorage.removeItem('loggerInfo');
        this.router.navigate(["/login"]);
        return true;
      })
    }

  }

  goToNewChat() {
    this.router.navigate(["/chatlist"]);
    // this.router.navigate(["/groupchatdetail", "village"]);

  }

  goToNewChatDetails() {
    this.router.navigate(["/chatdetails"]);
  }

}
