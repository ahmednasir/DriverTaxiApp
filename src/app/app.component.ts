import { Component, ViewChild } from "@angular/core";
import { Nav, Platform , Events} from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { HomePage } from "../pages/home/home";
import { ListPage } from "../pages/list/list";

import { Socket } from "ngx-socket-io";
import { StorageServiceProvider } from "../providers/storage-service/storage-service";

@Component({
  templateUrl: "app.html",
  providers:[
    StorageServiceProvider
  ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  bookingRequest:boolean = false
  pages: Array<{ title: string; component: any }>;

  constructor(
    private events: Events,
    private socket: Socket,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private storageService: StorageServiceProvider,
  ) {
    this.initializeApp();
    let user = this.storageService.getKey("user");
    this.socket.connect();
    console.log(user)
    // navigator.geolocation.getCurrentPosition(p => {
      setInterval(() => {
        if (user) {
          let obj = {
            // lat: p.coords.latitude,
            // lng: p.coords.longitude,
            lat:  12.922486099999999 ,
            lng:  77.63604099999999,
            user: JSON.parse(user)
          };
          
          this.socket.emit("coordinates", obj);
          console.log(1)
        }
      }, 1000);
    // });
    this.socket.on("booking-request", request => {
      this.events.publish('bookingRequest',request)
    });

    // accept booking
    events.subscribe('booking-accepted', request=>{
      request.user = user;
      socket.emit('booking-accepted', request)
    })

    // used for an example of ngFor and navigation
    this.pages = [
      { title: "Home", component: HomePage },
      { title: "List", component: ListPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
