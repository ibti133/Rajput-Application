import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'newchat',
    loadChildren: () => import('./newchat/newchat.module').then(m => m.NewchatPageModule)
  },
  {
    path: 'chatlist',
    loadChildren: () => import('./chatlist/chatlist.module').then(m => m.ChatlistPageModule)
  },
  {
    path: 'chatdetails/:chatInfo',
    loadChildren: () => import('./chatdetails/chatdetails.module').then(m => m.ChatdetailsPageModule)
  },
  {
    path: 'attachment-modal',
    loadChildren: () => import('./attachment-modal/attachment-modal.module').then(m => m.AttachmentModalPageModule)
  },
  {
    path: 'groupchatdetail/:groupname',
    loadChildren: () => import('./groupchatdetail/groupchatdetail.module').then(m => m.GroupchatdetailPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
