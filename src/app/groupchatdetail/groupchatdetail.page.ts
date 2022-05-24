import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, ModalController } from '@ionic/angular';
import { AttachmentModalPage } from '../attachment-modal/attachment-modal.page';
import { MESSAGE_TYPE, MESSAGE_STATUS } from '../newchat/msgType';

@Component({
  selector: 'app-groupchatdetail',
  templateUrl: './groupchatdetail.page.html',
  styleUrls: ['./groupchatdetail.page.scss'],
})
export class GroupchatdetailPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;
  groupName;
  userData;
  userStatus = "Offline";
  chatList: any = [];
  newMsg = "";
  image = '';
  constructor(
    public modalController: ModalController,
    private route: ActivatedRoute,
    private database: AngularFireDatabase,
    private router: Router
  ) {

  }

  getStatus(id) {
    this.database.object('RajputFoundation/objRegistration/' + id).valueChanges().subscribe((data: any) => {
      if (data != null) {
        if (data.lastOnline == 'Online') {
          this.userStatus = 'Online';
        } else {
          this.userStatus = 'Offline';
        }
      }
    })
  }

  async ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('loggerInfo'));

    this.route.params.subscribe(params => {
      this.groupName = params.groupname;
    });
    if (this.groupName === 'city') {
      this.image = "../../assets/img/city.png";
    } else if (this.groupName === 'area') {
      this.image = "../../assets/img/area.png";
    } else if (this.groupName === 'village') {
      this.image = "../../assets/img/village.png";
    }

    await this.getChats();

    // if (this.groupName.firstUser.id == this.userData.userId) {
    //   this.getStatus(this.groupName.secondUser.id);

    // } else {
    //   this.getStatus(this.groupName.firstUser.id);
    // }
  }

  getChats() {
    this.database.object("RajputFoundation/" + this.groupName + "GroupChatDetail/").valueChanges().subscribe(data => {
      if (data != null) {
        let SubArr = Object.keys(data);
        this.chatList = [];
        for (var loop = 0; loop < SubArr.length; loop++) {
          const object2 = Object.assign({ chatId: SubArr[loop] }, data[SubArr[loop]]);
          object2.msgDateTime = JSON.parse(object2.msgDateTime);
          if (this.groupName == 'city') {
            if (object2.filterName.toLowerCase() == this.userData.City.toLowerCase()) {
              this.chatList.push(object2);
            }
          } else if (this.groupName == 'area') {
            if (object2.filterName.toLowerCase() == this.userData.Area.toLowerCase()) {
              this.chatList.push(object2);
            }
          } else {
            if (object2.filterName.toLowerCase() == this.userData.Village.toLowerCase()) {
              this.chatList.push(object2);
            }
          }
        }
        debugger;
      }
    })
  }

  async attachmentModal() {
    const modal = await this.modalController.create({
      component: AttachmentModalPage,
      initialBreakpoint: 0.2,
      // breakpoints: [0,0.6],
      cssClass: 'attachmentModal'
    });
    return await modal.present();
  }

  sendMessagesFromSK() {
    this.database.list("RajputFoundation/" + this.groupName + "GroupChatDetail/")
      .push({
        senderID: this.userData.userId,
        filterName:
          this.groupName == 'city' ? this.userData.City : this.groupName == 'area' ? this.userData.Area
            : this.groupName == 'village' ? this.userData.Village : "",
        msg: this.newMsg,
        msgType: MESSAGE_TYPE.TEXT,
        isReply: 0,
        isReplyText: "",
        msgDateTime: JSON.stringify(new Date()),
        msgStatus: MESSAGE_STATUS.SEND
      }).then(info => {
        this.newMsg = '';
      })
  }

  gotToChatList() {
    this.router.navigate(["/chatlist"]);
  }


}
