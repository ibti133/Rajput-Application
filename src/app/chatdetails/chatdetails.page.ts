import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, ModalController } from '@ionic/angular';
import { AttachmentModalPage } from '../attachment-modal/attachment-modal.page';
import { MESSAGE_STATUS, MESSAGE_TYPE } from '../newchat/msgType';

@Component({
  selector: 'app-chatdetails',
  templateUrl: './chatdetails.page.html',
  styleUrls: ['./chatdetails.page.scss'],
})
export class ChatdetailsPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;
  chatInfo;
  userData;
  userStatus = "Offline";
  chatList: any = [];
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
      this.chatInfo = JSON.parse(params.chatInfo);
    });

    await this.getChats(this.chatInfo.deatailChatID);
    if (this.chatInfo.firstUser.id == this.userData.userId) {
      this.getStatus(this.chatInfo.secondUser.id);

    } else {
      this.getStatus(this.chatInfo.firstUser.id);
    }
  }


  getChats(chatID) {
    this.database.object('RajputFoundation/objChatDetail/' + chatID).valueChanges().subscribe(data => {
      if (data != null) {
        let SubArr = Object.keys(data);
        this.chatList = [];
        for (var loop = 0; loop < SubArr.length; loop++) {
          const object2 = Object.assign({ chatId: SubArr[loop] }, data[SubArr[loop]]);
          object2.msgDateTime = JSON.parse(object2.msgDateTime);
          this.chatList.push(object2);
        }
      }
    })
  }

  messages = [
    {
      user: 'Zohir Ahmed',
      createdAt: 123456789,
      msg: 'Hey there i am using this app'
    },
    {
      user: 'Ibtesam Ahmed',
      createdAt: 123456789,
      msg: 'Hey there i am using this app'
    },
    {
      user: 'Usama Ahmed',
      createdAt: 123456789,
      msg: 'Hey there i am using this app'
    },
    {
      user: 'Zohir Ahmed',
      createdAt: 123456789,
      msg: 'Hey there i am using this app'
    },
    {
      user: 'Ahmed Raza',
      createdAt: 123456789,
      msg: 'Hey there i am using this app'
    },
    {
      user: 'Zohir Ahmed',
      createdAt: 123456789,
      msg: 'Hey there i am using this app'
    },
  ];

  currentUser = "Zohir Ahmed";
  newMsg = "";

  sendMessage() {
    this.messages.push({
      user: 'Zohir Ahmed',
      createdAt: new Date().getTime(),
      msg: this.newMsg
    });
    this.newMsg = "";

    setTimeout(() => {
      this.content.scrollToBottom(200);
    });
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
    this.database.list("RajputFoundation/objChatDetail/" + this.chatInfo.deatailChatID)
      .push({
        senderID: this.userData.userId,
        // reciverID: param.userId,
        msg: this.newMsg,
        msgType: MESSAGE_TYPE.TEXT,
        isReply: 0,
        isReplyText: "",
        msgDateTime: JSON.stringify(new Date()),
        msgStatus: MESSAGE_STATUS.SEND
      }).then(info => {
        this.database.list("RajputFoundation/objChatList/").update(this.chatInfo.deatailChatID, {
          lastMsg: this.newMsg
        }).then(res => {
          this.newMsg = '';
        });
        // goto details
        // this.goToChatDetails(chatInit);
      })
  }

  // UserObject
  // this.database.object('RajputFoundation/Users/abc123').set({
  //   name: 'Ibtesam',
  //   profilePic: "https://i.pinimg.com/236x/f0/31/42/f0314276f9f8205e2fa55563bd21cf64.jpg",
  //   id: 'abc123',
  // });


  // Creating Groups
  // this.database.list('RajputFoundation/Groups').push({
  //   groupName: 'Test Group',
  //   groupIcon: 'https://i.pinimg.com/236x/f0/31/42/f0314276f9f8205e2fa55563bd21cf64.jpg',
  //   groupAdminID: 'abc123',
  //   groupAdminName: "Ibtesam Ahmed",
  //   groupRecentMsg: "Group first mesage",
  //   members: [
  //     {
  //       id: 'abc123',
  //       name: "Ibetsam Ahmed",
  //       dp: 'https://i.pinimg.com/236x/f0/31/42/f0314276f9f8205e2fa55563bd21cf64.jpg'
  //     },
  //     {
  //       id: 'xyz123',
  //       name: "Zohir Ahmed",
  //       dp: 'https://i.pinimg.com/236x/f0/31/42/f0314276f9f8205e2fa55563bd21cf64.jpg'
  //     }
  //   ]
  // }).then(data => {
  //   this.database.object('RajputFoundation/Users/abc123').set({
  //     name: 'Ibtesam',
  //     profilePic: "https://i.pinimg.com/236x/f0/31/42/f0314276f9f8205e2fa55563bd21cf64.jpg",
  //     id: 'abc123',
  //     groups: [
  //       data.key
  //     ]
  //   });
  // });

  // Add message to Groups 
  // this.database.list('RajputFoundation/GroupsDetails/' + '-N2Np0ERLEdz7Nsgjq-Y').push({
  //   chatMessageType: "",
  //   chatType: "group",
  //   content_type: "text",
  //   message: "Hy! to every one in group",
  //   dateTime: JSON.stringify(new Date()),
  //   senderID: 'abc123',
  //   senderName: 'Ibetsam Ahmed',
  //   status: '1'
  // }).then(data => {
  //   this.database.list("RajputFoundation/Groups/").update("-N2Np0ERLEdz7Nsgjq-Y", {
  //     groupRecentMsg: 'Hy! to every one in group'
  //   })
  // });

  gotToChatList() {
    this.router.navigate(["/chatlist"]);
  }


}
