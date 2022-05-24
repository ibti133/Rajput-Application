import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatdetailsPage } from './chatdetails.page';

const routes: Routes = [
  {
    path: '',
    component: ChatdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatdetailsPageRoutingModule {}
