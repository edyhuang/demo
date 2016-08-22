import {Component, Input, Output, EventEmitter, OnChanges, SimpleChange, ViewEncapsulation} from '@angular/core';
import {Asterpie} from '../common/asterpie.directive';
import {DemoService} from './demo.service';
import '/_/lib/semantic.min.js';

@Component({
    moduleId: module.id,
    selector: 'demo',
    templateUrl:'demo.template.html',
    styleUrls: ['demo.template.css'],
    encapsulation: ViewEncapsulation.Emulated,
    directives: [Asterpie],
    providers: [DemoService]  
})
export class DemoComponent {
    private filter:any; 
    
    constructor(private demoService : DemoService){  
        this.filter = {
            emit:true,
            pieCount:4,
            sliceCount:14
        };
        
        demoService.addListener(this);
    };
    
    onReceive = (payload : any) => {
        this.items = payload;
    };
    
    start = () => {
        this.filter.emit = true;
        this.demoService.send(JSON.stringify(this.filter));
    };
    
    stop = () => {
        this.filter.emit = false;
        this.demoService.send(JSON.stringify(this.filter));

        //this is to show dynamic library loading
        System.import('./dynamic-library-loading').then(dlib => dlib.load());
    };
    
    addPie = () => {
        this.filter.pieCount = this.filter.pieCount+1;
        
        if (this.filter.pieCount>12) this.filter.pieCount = 12;
                
        this.demoService.send(JSON.stringify(this.filter));
    };

    removePie = () => {
        this.filter.pieCount = this.filter.pieCount-1;
        
        if (this.filter.pieCount<1) this.filter.pieCount = 1;
                
        this.demoService.send(JSON.stringify(this.filter));
    };
    
    addSlice = () => {
        this.filter.sliceCount = this.filter.sliceCount+1;
        
        if (this.filter.sliceCount>14) this.filter.sliceCount = 14;
                
        this.demoService.send(JSON.stringify(this.filter));
    };

    removeSlice = () => {
        this.filter.sliceCount = this.filter.sliceCount-1;
        
        if (this.filter.sliceCount<1) this.filter.sliceCount = 1;
                
        this.demoService.send(JSON.stringify(this.filter));
    };
}