import { Injectable } from '@angular/core';
import {StompConnector} from '../common/stomp-connector.class';

@Injectable()
export class DemoService
{
    private stompConnector : StompConnector;
    
    constructor()
    {
        this.stompConnector = new StompConnector("demoEndPoint", this, false);
        this.stompConnector.connect();
    }

    public connect()
    {
        this.stompConnector.connect();
    }
    
    public disconnect()
    {
        this.stompConnector.disconnect();
    }
    
    public reconnect() 
    {
        this.stompConnector.reconnect();
    }
    
    public activate()
    {
        let filter = '{"activate":"true"}';
        this.stompConnector.send(filter);
    }
    
    public send(filter : string)
    {
        this.stompConnector.send(filter);
    }
    
    public addListener(target : any)
    {
        this.stompConnector.addListener(target);
    }      
}
