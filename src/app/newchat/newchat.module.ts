import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewchatPageRoutingModule } from './newchat-routing.module';

import { NewchatPage } from './newchat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewchatPageRoutingModule
  ],
  declarations: [NewchatPage]
})
export class NewchatPageModule {}
