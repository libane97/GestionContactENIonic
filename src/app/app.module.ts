import { SqlRepositoryService } from './service/sql-repository.service';
import { LsRepositoryService } from './service/ls-repository.service';
import { Camera } from '@ionic-native/camera/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
     BrowserModule,
     IonicModule.forRoot(),
     IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
     AppRoutingModule,
     HttpClientModule,
     FormsModule,
     ReactiveFormsModule
    ],
  providers: [
    SQLitePorter,
    SQLite,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    { provide: localStorage, useClass:LsRepositoryService },
    { provide: SQLite, useClass:SqlRepositoryService },
    Camera,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
