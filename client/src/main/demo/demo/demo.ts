import {lockDown} from '../util/browser-lock.util';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import { DemoModule } from './demo.module';

enableProdMode();
 
platformBrowserDynamic().bootstrapModule(DemoModule);

lockDown('dashboard.html');