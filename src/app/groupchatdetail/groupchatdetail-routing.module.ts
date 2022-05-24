import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupchatdetailPage } from './groupchatdetail.page';

const routes: Routes = [
  {
    path: '',
    component: GroupchatdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupchatdetailPageRoutingModule {}
