import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.page.html',
  styleUrls: ['./chatlist.page.scss'],
})


export class ChatlistPage implements OnInit {
  chatList = [];
  filterChatList = [];
  cityList: any;
  showSearchBar: boolean = false;
  showHeading: boolean = true;
  searchButton: boolean = true;
  messageList = [];
  constructor(private router: Router, private database: AngularFireDatabase) { }
  userData;
  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('loggerInfo'));
    this.getAllChatList();

    this.cityList = [
      {
        city: "Karachi",
        lastMessage: "Hello Karachi",
        area: "City",
        image: "../../assets/img/Karachi.jpg"
      },
      {
        city: "Lahore",
        lastMessage: "Hello Lahore",
        area: "City",
        image: "../../assets/img/Lahore.avif"
      },
      {
        city: "Islamabad",
        lastMessage: "Hello Islamabad",
        area: "City",
        image: "../../assets/img/Islamabad.jpg"
      }
    ]
  }

  goToGroupChat(param) {
    this.router.navigate(["/groupchatdetail", param]);
  }

  getAllChatList() {
    this.database.object('RajputFoundation/objChatList').valueChanges().subscribe(data => {
      if (data != null) {
        let SubArr = Object.keys(data);
        this.chatList = [];
        this.filterChatList = [];
        for (var loop = 0; loop < SubArr.length; loop++) {
          const object2 = Object.assign({ chatId: SubArr[loop] }, data[SubArr[loop]]);
          if (object2.firstUser.id == this.userData.userId || object2.secondUser.id == this.userData.userId) {
            this.chatList.push(object2);
            this.filterChatList.push(object2);
            console.log(this.chatList);
          }
        }
      }
    })
  }

  goToChatDetails(param) {
    const json = JSON.stringify(param);
    this.router.navigate(["/chatdetails", json]);
  }

  goToNewChat() {
    this.router.navigate(["/newchat"]);
  }

  showSearch() {
    this.showSearchBar = !this.showSearchBar;
    this.showHeading = false;
    this.searchButton = false;
  }

  searchList(param) {
    const val = param.target.value.toLowerCase();
    if (val == '') {
      this.filterChatList = this.chatList;
      this.showSearchBar = !this.showSearchBar;
      this.showHeading = true;
      this.searchButton = true;
    } else {
      this.filterChatList = this.chatList.filter(data => data.firstUser.name.toString().toLowerCase().includes(val) || data.secondUser.name.toString().toLowerCase().includes(val));
    }
    console.log(this.messageList);
  }
}