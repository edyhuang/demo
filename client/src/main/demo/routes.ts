import {provideRouter, RouterConfig} from '@angular/router';

export const appRoutes: RouterConfig = 
[
    {path: '', component: LodashComponents},
    {path: '', component: FormsComponents}    
]

export const APP_ROUTER_PROVIDER = provideRouter(appRoutes)