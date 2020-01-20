import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// libs
import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS
} from "@angular/common/http";

// Config
import { APP_CONFIG, BaseAppConfig } from "./app.config";

// Providers
import { SocketServiceProvider } from '../providers/socket-service/socket-service';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { StorageServiceProvider } from '../providers/storage-service/storage-service';

const config: SocketIoConfig = {url:"http://localhost:3000"}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    SocketIoModule.forRoot(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SocketServiceProvider,
    UserServiceProvider,
    { provide: APP_CONFIG, useValue: BaseAppConfig },
    StorageServiceProvider,
  ]
})
export class AppModule {}
