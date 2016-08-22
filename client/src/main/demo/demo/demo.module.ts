import { BrowserModule }                from '@angular/platform-browser';
import { NgModule }                     from '@angular/core';
import { DemoComponent }                from './demo.component';
import { DemoService }                  from './demo.service';
//TODO need to move all component level directives here

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ DemoComponent ],
  providers:  [DemoService],
  bootstrap: [ DemoComponent ]
})
export class DemoModule {
  constructor() {
  }
}