import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.scss']
})
export class MilestoneComponent implements OnInit {
  @Input() position: any;
  @Input() distance: any;
  constructor() { }

  ngOnInit(): void {
  }

}
