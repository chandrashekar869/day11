import { Component,ViewChild,ElementRef,AfterViewInit } from '@angular/core';
import {switchMap,map,filter,debounceTime,zip,mergeMap,distinctUntilChanged, retryWhen} from 'rxjs/operators';
import { Observable,of, timer, interval,pipe, fromEvent, range } from 'rxjs';
import {ajax} from 'rxjs/ajax';
import {ChildService} from './child.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('input') inputElement:ElementRef;
  typeAhead:Observable<any>;
  stringEntered:string="";
  arr:any;
  selected:string;
  ngAfterViewInit(){
    this.typeAhead=fromEvent(this.inputElement.nativeElement,'input').pipe(
      map((x:KeyboardEvent)=>this.storeEntered(x.target["value"])),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(()=>ajax("http://dataservce.accuweather.com/locations/v1/cities/autocomplete?apikey=xE8pozJ0orRi3hLDDdswqJmGxYoTwGfn&q="+this.stringEntered+"&language=en-Us").pipe(backoff(3,1000)))
    );
    this.typeAhead.subscribe(x=>this.arr=x.response,err=>console.log(err));

  }
  storeEntered(val:string):string{
    this.stringEntered=val;
    return val;
  }
  constructor(public service:ChildService){
    
  }

}

function backoff(maxTries, ms) {
  return pipe(
    retryWhen(attempts => range(1, maxTries)
      .pipe(
        zip(attempts, (i) => i),
        map(i => i * i),
        mergeMap(i =>  timer(i * ms))
      )
    )
  );
 }