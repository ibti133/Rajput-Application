import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  areaList = [];
  constructor(private database: AngularFireDatabase) {
    // this.database.list("RajputFoundation/areas/").push(
    //   {
    //     areaName: "landhi",
    //   },
    // ).then(data => {
    //    
    // })

    this.database.object('RajputFoundation/areas').valueChanges().subscribe(data => {

      if (data != null) {
        let SubArr = Object.keys(data);
        this.areaList = [];
        for (var loop = 0; loop < SubArr.length; loop++) {
          const object2 = Object.assign({ areaId: SubArr[loop] }, data[SubArr[loop]]);
          this.areaList.push(object2);
        }
      }

    })

  }

}
