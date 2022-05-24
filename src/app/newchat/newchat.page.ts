import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { MESSAGE_STATUS, MESSAGE_TYPE } from './msgType';

@Component({
  selector: 'app-newchat',
  templateUrl: './newchat.page.html',
  styleUrls: ['./newchat.page.scss'],
})
export class NewchatPage implements OnInit {
  userList = [];
  chatList = [];
  userFilterList = [];
  userData;
  constructor(
    private database: AngularFireDatabase,
    private router: Router,
    public toastCtrl: ToastController
  ) {
  }

  getAllChatList() {
    this.database.object('RajputFoundation/objChatList').valueChanges().subscribe(data => {
      if (data != null) {
        let SubArr = Object.keys(data);
        this.chatList = [];
        for (var loop = 0; loop < SubArr.length; loop++) {
          const object2 = Object.assign({ chatId: SubArr[loop] }, data[SubArr[loop]]);
          if (object2.firstUser.id == this.userData.userId || object2.secondUser.id == this.userData.userId) {
            this.chatList.push(object2);
          }
        }
      }
    })
  }

  getAllUsers() {
    this.userData = JSON.parse(localStorage.getItem('loggerInfo'));
    this.database.object('RajputFoundation/objRegistration').valueChanges().subscribe(data => {
      if (data != null) {
        let SubArr = Object.keys(data);
        this.userList = [];
        this.userFilterList = [];
        for (var loop = 0; loop < SubArr.length; loop++) {
          const object2 = Object.assign({ userId: SubArr[loop] }, data[SubArr[loop]]);
          if (this.userData.userId != object2.userId) {
            this.userList.push(object2);
            this.userFilterList.push(object2);
          }
        }
        console.log(this.userFilterList);
        this.getAllChatList();
      }
    })
  }

  searchList(param) {
    const val = param.target.value.toLowerCase();
    if (val == '') {
      this.userFilterList = this.userList;
    } else {
      this.userFilterList = this.userList.filter(data => data.Name.toString().toLowerCase().includes(val) || data.Phone.toString().toLowerCase().includes(val) || data.Email.toString().toLowerCase().includes(val));
    }
    console.log(this.userFilterList);
  }

  ngOnInit() {
    this.getAllUsers();
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

  // Phenomena of creating chat 
  createChat(param) {
    this.chatList;
    const chatArr = this.chatList.find(data => data.firstUser.id == param.userId
      || data.secondUser.id == param.userId);
    if (chatArr != undefined) {
      this.goToChatDetails(chatArr);
      return;
    }

    let sessionData = JSON.parse(localStorage.getItem('loggerInfo'));
    let chatInit: any = {

      firstUser: {
        id: sessionData.userId,
        name: sessionData.Name,
        dp: sessionData.DP,
      },
      secondUser: {
        id: param.userId,
        name: param.Name,
        dp: param.DP,
      },
      lastMsg: "",
      count: 0

    };
    this.database.list("RajputFoundation/objChatList/").push(chatInit).then(data => {

      this.database.list("RajputFoundation/objChatList/").update(data.key, {
        deatailChatID: data.key
      }).then(res => {
        chatInit.deatailChatID = data.key;
      })


      this.database.list("RajputFoundation/objChatDetail/" + data.key)
        .push({
          senderID: sessionData.userId,
          // reciverID: param.userId,
          msg: "Messages are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them. Click to learn more.",
          msgType: MESSAGE_TYPE.TEXT,
          isReply: 0,
          isReplyText: "",
          msgDateTime: JSON.stringify(new Date()),
          msgStatus: MESSAGE_STATUS.SEND
        }).then(info => {
          // goto details
          this.goToChatDetails(chatInit);
        })
    });
  }

  goToChatDetails(param) {
    const json = JSON.stringify(param);
    this.router.navigate(["/chatdetails", json]);
  }

}

