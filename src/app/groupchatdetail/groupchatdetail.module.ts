import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupchatdetailPageRoutingModule } from './groupchatdetail-routing.module';

import { GroupchatdetailPage } from './groupchatdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupchatdetailPageRoutingModule
  ],
  declarations: [GroupchatdetailPage]
})
export class GroupchatdetailPageModule {}
