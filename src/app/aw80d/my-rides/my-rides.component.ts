import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-my-rides',
  templateUrl: './my-rides.component.html',
  styleUrls: ['./my-rides.component.scss']
})
export class MyRidesComponent implements OnInit {
  @Input() activities: any[] = [];
  @Output() refresh: EventEmitter<boolean> = new EventEmitter();
  limit = 10;
  limitExceeded = false;
  constructor() { }

  ngOnInit(): void {
  }

  syncData() {
    this.refresh.emit(true);
  }

  getDate(dateStr: any) {
    const d = new Date(dateStr);
    let date: any = d.getDate();
    if (date < 10) {
      date = `0${date}`;
    }
    let month: any = d.getMonth();
    if (month < 10) {
      month = `0${month}`;
    }
    const year = d.getFullYear();
    let hour: any = d.getHours();
    if (hour < 10) {
      hour = `0${hour}`;
    }
    let minute: any = d.getMinutes();
    if (minute < 10) {
      minute = `0${minute}`;
    }
    return `${date}/${month}/${year} ${hour}:${minute}`;
  }

  getDistance(distance: number) {
    return (distance/1000).toFixed(2);
  }

  loadMore() {
    if (this.limit < this.activities.length) {
      this.limit += 10;
    } else {
      this.limitExceeded = true;
    }
  }
}
