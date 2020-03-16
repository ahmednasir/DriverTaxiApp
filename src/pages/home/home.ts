import { Component } from "@angular/core";
import { NavController, Events } from "ionic-angular";

// libs
import { Socket } from "ngx-socket-io";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";

@Component({
  selector: "page-home",
  templateUrl: "home.html",
  providers: [UserServiceProvider, StorageServiceProvider]
})
export class HomePage {
  bookingRequestFlag:boolean = false;
  bookingRequest:any;
  countdownTime: number = 30
  constructor(
    public socket: Socket,
    private events: Events,
    public navCtrl: NavController,    
    private userService: UserServiceProvider,
    private storageService: StorageServiceProvider
  ) {}

  ionViewDidLoad() {
    this.events.subscribe('bookingRequest',(request)=>{
      this.bookingRequestFlag = true
      console.log(request)
      this.bookingRequest = request;
      setInterval(()=>{
        this.countdownTime--;
      },1000)
      setTimeout(()=>{        
        this.bookingRequestFlag= false    
      },30000)
      
    })
    this.countdownTime=30;
    
  }
  register() {
    let body = {
      Phone: 7002411667,
      CountryCode: "IN",
      Email: "nasirA@gmail.com",
      Name: "Risan2",
      LicenseNumber: "TESTLICENSE3",
      UserType: "Driver",
      Vehicle: {
        LicenseNumber: "TESTNUM3",
        Make: "Bajaj",
        VehicleType: "Car",
        FuelType: "Petrol"
      }
    };
    this.userService.signIn(body).subscribe(
      resp => {
        console.log(resp.body);
        if (resp.body.StatusCode == 200) {
          alert("Registered");
          this.storageService.setKey("user", JSON.stringify(body));
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  bookingAccepted(){
    this.bookingRequestFlag = false;
    alert('Booking accepted')
    this.events.publish('booking-accepted',this.bookingRequest)
  }
}
