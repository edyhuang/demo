import {lockDown} from '../util/browser-lock.util';
import { bootstrap } from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import { DemoComponent } from './demo.component';

enableProdMode();
 
bootstrap(DemoComponent);

lockDown('dashboard.html');