import { Component, OnInit } from '@angular/core';
import {ChildService} from '../child.service';
@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
text="";
  constructor(public service:ChildService) { }

  ngOnInit() {
    this.service.currentMessage.subscribe(x=>this.transformData(x));
  }

  transformData(val:string){
    this.text=val;
    console.log(val.toUpperCase());
  
  }
}
