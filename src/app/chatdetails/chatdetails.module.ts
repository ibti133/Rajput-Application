import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatdetailsPageRoutingModule } from './chatdetails-routing.module';

import { ChatdetailsPage } from './chatdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatdetailsPageRoutingModule
  ],
  declarations: [ChatdetailsPage]
})
export class ChatdetailsPageModule {}
