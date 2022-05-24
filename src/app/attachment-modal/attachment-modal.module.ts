import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttachmentModalPageRoutingModule } from './attachment-modal-routing.module';

import { AttachmentModalPage } from './attachment-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttachmentModalPageRoutingModule
  ],
  declarations: [AttachmentModalPage]
})
export class AttachmentModalPageModule {}
