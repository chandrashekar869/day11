import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChildService {
  sharedData:any;
  private msg=new BehaviorSubject("init");
  currentMessage=this.msg.asObservable();
  constructor() { }
  changeMessage(val){
    this.msg.next(val);
  }
}
