package huang.edward.ui.server.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class $
{
	final static public long FLUSH_TRIGGER_ITEMS_COUNT = 100; 
	final static public long TIMEOUT_ASYNC_SEND = 10 * 60 * 1000; 
	final static public long TIMEOUT_MAX_SESSION_IDLE = Long.MAX_VALUE;
	
	final static public String FIELD_DELIMITER = ",";    
	final static public String RECORD_DELIMITER = "\n"; 
	final static public String MATCH_ALL = "**";
	final static public String PATH_DELIMITER = "/";
	final static public String PATH_ROOT = PATH_DELIMITER;
	final static public String PATH_JS = PATH_ROOT + "custom_modules";
	final static public String PATH_WS = PATH_ROOT + "ws";
	final static public String PATH_WEBAPP = ""; 
	final static public String PATH_TOPIC = PATH_ROOT + "topic";
	final static public String PATH_QUEUE = PATH_ROOT + "queue";
	final static public String PATH_APP = PATH_ROOT + "app";
	final static public String PATH_USER = PATH_ROOT + "user";
	final static public String PATH_MATCH_ALL_JS = PATH_JS + PATH_DELIMITER + MATCH_ALL;
	final static public String PATH_MATCH_ALL_WS = PATH_WS + PATH_DELIMITER + MATCH_ALL;
	final static public String PATH_MATCH_ALL_WEBAPP = PATH_WEBAPP + PATH_DELIMITER + MATCH_ALL;
	final static public String PATH_MATCH_ALL_APP = PATH_APP + PATH_DELIMITER + MATCH_ALL;
	final static public String PATH_MATCH_ALL_USER = PATH_USER + PATH_DELIMITER + MATCH_ALL;
	
	//sample endpoint
	final static public String ENDPOINT_DEMO = PATH_WS + PATH_DELIMITER + "demoEndPoint";	
	final static public String TOPIC_DEMO_REQUEST = ENDPOINT_DEMO;
	final static public String TOPIC_DEMO_RESPONSE = PATH_ROOT + "queue" + ENDPOINT_DEMO;

	final static public String VIEW_DEFAULT = "index";
	
	static private $ t;
	static public enum ENV{DEV} 
		
	public $() {t = this;}
	
	@Value("${debug}") private boolean debug; public static boolean debug(){return t.debug;}
	@Value("${demo.env:DEV}") private String env; static public ENV env(){return ENV.valueOf(t.env);}
}
