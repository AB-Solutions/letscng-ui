import { Component, OnInit } from '@angular/core';
import { CommonUtilService } from 'src/app/services/common-util.service';

@Component({
  selector: 'app-my-event-rides',
  templateUrl: './my-event-rides.component.html',
  styleUrls: ['./my-event-rides.component.scss']
})
export class MyEventRidesComponent implements OnInit {
  rider: any = {};
  constructor(private commonUtilService: CommonUtilService) { }

  ngOnInit(): void {

    this.commonUtilService.selectedRiderPhone.subscribe((rider: any) => {
      console.log('in app-my-event-ride: ', rider);
      this.rider = rider;
    });
  }

}
