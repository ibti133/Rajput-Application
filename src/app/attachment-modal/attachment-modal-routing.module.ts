import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttachmentModalPage } from './attachment-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AttachmentModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttachmentModalPageRoutingModule {}
