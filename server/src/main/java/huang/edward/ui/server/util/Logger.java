package huang.edward.ui.server.util;

import org.slf4j.LoggerFactory;

abstract public class Logger 
{
	protected org.slf4j.Logger log;
	
	protected Logger()
	{
		log = LoggerFactory.getLogger(getClass());
	}
	
	@SuppressWarnings("rawtypes")
	static public org.slf4j.Logger getLogger(Class cls)
	{
		return LoggerFactory.getLogger(cls);
	}
}
