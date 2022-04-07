import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommonUtilService } from 'src/app/services/common-util.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-my-event-rides',
  templateUrl: './my-event-rides.component.html',
  styleUrls: ['./my-event-rides.component.scss']
})
export class MyEventRidesComponent implements OnInit {
  rider: any = {};
  constructor(
    private commonUtilService: CommonUtilService,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {

    this.commonUtilService.selectedRiderPhone.subscribe((rider: any) => {
      console.log('in app-my-event-ride: ', rider);
      this.rider = rider;
    });
  }

}
