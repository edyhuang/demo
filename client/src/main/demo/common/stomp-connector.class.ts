import 'stompjs/stomp';

declare var Stomp: any;
declare var SockJS: any;
 
export class StompConnector
{
    private RECONNECT_ATTEMPT_ELAPSE : number = 1000;    
    
    private listeners : Array<any> = [];
    private websocketEndPoint : string;
    private outboundChannel : string;
    private inboundChannel : string;
    private stompClient : any;
    private subscription : any;
    private parent : any;
    private singleListener : boolean = false;

    constructor(private endPoint : string, private pr : any, private singleListenerMode : boolean)
    {
        const WEBSOCKET_PREFIX : string = '/ws/';
        const INBOUND_PREFIX : string = '/user/queue' + WEBSOCKET_PREFIX;
        const OUTBOUND_PREFIX : string = '/app' + WEBSOCKET_PREFIX;
         
        this.websocketEndPoint = WEBSOCKET_PREFIX + endPoint;
        this.inboundChannel = INBOUND_PREFIX + endPoint;
        this.outboundChannel = OUTBOUND_PREFIX + endPoint;
        this.parent = pr;
        this.singleListener = singleListenerMode;
    }
    
    public connect = () =>  
    {
       var socket = new SockJS(this.websocketEndPoint);
        
        this.stompClient = Stomp.over(socket);
        this.stompClient.debug = false;
        this.stompClient.connect({}, (frame) =>
        {
            this.subscription = this.stompClient.subscribe(this.inboundChannel, (response) =>
            {                
                if (this.listeners == null && this.listeners.length == 0) return;

                let responseBody = JSON.parse(response.body);

                if (responseBody == null || responseBody.payload == null) return;

                this.notifyListener(responseBody.payload);
            });
            this.parent.activate();
        }, (err) =>
        {
            setTimeout(() =>
            {
                this.reconnect();
            }, this.RECONNECT_ATTEMPT_ELAPSE);
        });
    };
    
    public disconnect()
    {
        if (this.stompClient != null)
            this.stompClient.disconnect();
    }

    public reconnect()
    {
        if (this.subscription != null)
            this.subscription.unsubscribe();
        
        this.disconnect();
        this.connect();
    }
    
    public send(data) 
    {
        if (this.stompClient != null)
            this.stompClient.send(this.outboundChannel, {}, data);
    }
        
    public addListener(target : any)
    {
        if (this.listeners==null)
            this.listeners = [];
     
        if (this.singleListener)
            this.listeners[0] = target;        
        else       
            this.listeners.push(target);        
    }
    
    public notifyListener(payload : any)
    {
        for (let i = 0, len = this.listeners.length; i < len; i++)
        {
            this.listeners[i].onReceive(payload);
        }
    }
}