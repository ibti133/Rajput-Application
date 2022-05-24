import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularCropperjsModule } from 'angular-cropperjs';


const firebaseConfig = {
  apiKey: "AIzaSyCflG9K5o2E77vwJT9ncDLPC8C7QsQjJIQ",
  authDomain: "rajputfoundationstag.firebaseapp.com",
  databaseURL: "https://rajputfoundationstag-default-rtdb.firebaseio.com",
  projectId: "rajputfoundationstag",
  storageBucket: "rajputfoundationstag.appspot.com",
  messagingSenderId: "156538188695",
  appId: "1:156538188695:web:fda779254715ee7a714ad2"
};
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AngularCropperjsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy, }],
  bootstrap: [AppComponent],
})
export class AppModule {}
